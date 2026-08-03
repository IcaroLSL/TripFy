package com.tripfy.tripfy.auth.usecase;

import com.tripfy.tripfy.auth.dto.LoginResponse;
import com.tripfy.tripfy.auth.dto.OAuthLoginRequest;
import com.tripfy.tripfy.auth.gateway.OAuthProviderRepository;
import com.tripfy.tripfy.auth.gateway.OAuthTokenValidator;
import com.tripfy.tripfy.auth.gateway.TokenGenerator;
import com.tripfy.tripfy.auth.gateway.UserRepository;
import com.tripfy.tripfy.auth.model.AuthProvider;
import com.tripfy.tripfy.auth.model.OAuthUserInfo;
import com.tripfy.tripfy.auth.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class OAuthLoginUseCase {

    private final Map<AuthProvider, OAuthTokenValidator> validators;
    private final UserRepository userRepository;
    private final OAuthProviderRepository oAuthProviderRepository;
    private final TokenGenerator tokenGenerator;

    public OAuthLoginUseCase(List<OAuthTokenValidator> validators,
                              UserRepository userRepository,
                              OAuthProviderRepository oAuthProviderRepository,
                              TokenGenerator tokenGenerator) {
        this.validators = validators.stream()
                .collect(Collectors.toMap(OAuthTokenValidator::getProvider, v -> v));
        this.userRepository = userRepository;
        this.oAuthProviderRepository = oAuthProviderRepository;
        this.tokenGenerator = tokenGenerator;
    }

    public LoginResponse execute(OAuthLoginRequest request) {
        OAuthTokenValidator validator = validators.get(request.provider());
        if (validator == null) {
            throw new IllegalArgumentException("Provedor OAuth não suportado: " + request.provider());
        }

        OAuthUserInfo info = validator.validate(request.token());
        User user = resolveUser(info);

        String accessToken = tokenGenerator.generateAccessToken(user);
        String refreshToken = tokenGenerator.generateRefreshToken(user);

        return new LoginResponse(user.id(), user.name(), accessToken, refreshToken);
    }

    private User resolveUser(OAuthUserInfo info) {
        Optional<String> linkedUserId =
                oAuthProviderRepository.findUserIdByProvider(info.provider(), info.providerId());

        if (linkedUserId.isPresent()) {
            return userRepository.findById(linkedUserId.get())
                    .orElseThrow(() -> new IllegalStateException(
                            "Usuário vinculado não encontrado: " + linkedUserId.get()));
        }

        User user = findByEmail(info.email()).orElseGet(() -> createUser(info));

        // Primeiro login desse provedor pra esse usuário: cria o vínculo.
        oAuthProviderRepository.linkProvider(user.id(), info.provider(), info.providerId());

        return user;
    }

    private Optional<User> findByEmail(String email) {
        return email != null ? userRepository.findByEmail(email) : Optional.empty();
    }

    private User createUser(OAuthUserInfo info) {
        String username = generateUniqueUsername(info.email(), info.name());
        User newUser = new User(null, username, null, info.name(), info.email());
        return userRepository.insertUser(newUser);
    }

    private String generateUniqueUsername(String email, String name) {
        String base = (email != null ? email.split("@")[0] : name)
                .toLowerCase()
                .replaceAll("[^a-z0-9._-]", "");

        if (base.isBlank()) {
            base = "user";
        }

        String candidate = base;
        int suffix = 1;
        while (userRepository.existsByUsername(candidate)) {
            candidate = base + suffix;
            suffix++;
        }
        return candidate;
    }
}
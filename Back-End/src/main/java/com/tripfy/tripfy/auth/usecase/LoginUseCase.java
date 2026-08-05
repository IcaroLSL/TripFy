package com.tripfy.tripfy.auth.usecase;

import com.tripfy.tripfy.auth.dto.LoginRequest;
import com.tripfy.tripfy.auth.dto.LoginResponse;
import com.tripfy.tripfy.auth.gateway.TokenGenerator;
import com.tripfy.tripfy.auth.gateway.UserRepository;
import com.tripfy.tripfy.auth.model.User;
import com.tripfy.tripfy.auth.gateway.PasswordEncoder;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service
public class LoginUseCase {

    private final UserRepository userRepository;
    private final TokenGenerator tokenGenerator;
    private final PasswordEncoder passwordEncoder;

    public LoginUseCase(UserRepository userRepository,
                         TokenGenerator tokenGenerator,
                         PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenGenerator = tokenGenerator;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse execute(LoginRequest request) {
        User user = userRepository.findByUsername(request.username())
            .orElseThrow(() -> new BadCredentialsException("Usuário ou senha inválidos"));

        if (!passwordEncoder.matches(request.password(), user.password())) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }

        String accessToken = tokenGenerator.generateAccessToken(user);
        String refreshToken = tokenGenerator.generateRefreshToken(user);

        return new LoginResponse(user.id(), user.name(), accessToken, refreshToken);
    }
}

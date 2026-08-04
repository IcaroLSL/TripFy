package com.tripfy.tripfy.infra.oauth.apple;

import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.jwk.source.RemoteJWKSet;
import com.nimbusds.jose.proc.SecurityContext;
import com.nimbusds.jwt.SignedJWT;
import com.nimbusds.jwt.proc.DefaultJWTProcessor;
import com.nimbusds.jwt.proc.JWTClaimsSetVerifier;
import com.nimbusds.jose.proc.JWSVerificationKeySelector;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jwt.JWTClaimsSet;
import com.tripfy.tripfy.auth.gateway.OAuthTokenValidator;
import com.tripfy.tripfy.auth.model.AuthProvider;
import com.tripfy.tripfy.auth.model.OAuthUserInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URL;

@Component
public class AppleOAuthTokenValidator implements OAuthTokenValidator {

    private final DefaultJWTProcessor<SecurityContext> jwtProcessor = new DefaultJWTProcessor<>();
    private final String bundleId;

    public AppleOAuthTokenValidator(@Value("${oauth.apple.bundle-id}") String bundleId) throws Exception {
        this.bundleId = bundleId;
        JWKSource<SecurityContext> jwkSource = new RemoteJWKSet<>(new URL("https://appleid.apple.com/auth/keys"));
        jwtProcessor.setJWSKeySelector(new JWSVerificationKeySelector<>(JWSAlgorithm.RS256, jwkSource));
    }

    @Override
    public AuthProvider getProvider() {
        return AuthProvider.APPLE;
    }

    @Override
    public OAuthUserInfo validate(String token) {
        try {
            JWTClaimsSet claims = jwtProcessor.process(SignedJWT.parse(token), null);

            if (!claims.getAudience().contains(bundleId)) {
                throw new IllegalArgumentException("Audience inválida no token Apple");
            }

            return new OAuthUserInfo(
                    AuthProvider.APPLE,
                    claims.getSubject(),
                    claims.getStringClaim("email"),
                    null // Apple só manda nome na PRIMEIRA autenticação, no corpo da resposta do app — precisa capturar no front e mandar separado se quiser
            );
        } catch (Exception e) {
            throw new IllegalArgumentException("Falha ao validar token da Apple", e);
        }
    }
}
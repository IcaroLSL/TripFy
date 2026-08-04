package com.tripfy.tripfy.infra.oauth.google;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.tripfy.tripfy.auth.gateway.OAuthTokenValidator;
import com.tripfy.tripfy.auth.model.AuthProvider;
import com.tripfy.tripfy.auth.model.OAuthUserInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class GoogleOAuthTokenValidator implements OAuthTokenValidator {

    private final GoogleIdTokenVerifier verifier;

    public GoogleOAuthTokenValidator(@Value("${oauth.google.client-id}") String clientId) {
        this.verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    @Override
    public AuthProvider getProvider() {
        return AuthProvider.GOOGLE;
    }

    @Override
    public OAuthUserInfo validate(String token) {
        try {
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken == null) {
                throw new IllegalArgumentException("Token Google inválido");
            }
            GoogleIdToken.Payload payload = idToken.getPayload();
            return new OAuthUserInfo(
                    AuthProvider.GOOGLE,
                    payload.getSubject(),
                    payload.getEmail(),
                    (String) payload.get("name")
            );
        } catch (Exception e) {
            throw new IllegalArgumentException("Falha ao validar token do Google", e);
        }
    }
}
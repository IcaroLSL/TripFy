package com.tripfy.tripfy.infra.oauth.facebook;

import com.tripfy.tripfy.auth.gateway.OAuthTokenValidator;
import com.tripfy.tripfy.auth.model.AuthProvider;
import com.tripfy.tripfy.auth.model.OAuthUserInfo;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class FacebookOAuthTokenValidator implements OAuthTokenValidator {

    private final RestClient restClient = RestClient.create("https://graph.facebook.com");

    @Override
    public AuthProvider getProvider() {
        return AuthProvider.FACEBOOK;
    }

    @Override
    public OAuthUserInfo validate(String token) {
        FacebookUserResponse response = restClient.get()
                .uri("/me?fields=id,name,email&access_token={token}", token)
                .retrieve()
                .body(FacebookUserResponse.class);

        if (response == null || response.id() == null) {
            throw new IllegalArgumentException("Token Facebook inválido");
        }

        return new OAuthUserInfo(AuthProvider.FACEBOOK, response.id(), response.email(), response.name());
    }

    private record FacebookUserResponse(String id, String name, String email) {}
}

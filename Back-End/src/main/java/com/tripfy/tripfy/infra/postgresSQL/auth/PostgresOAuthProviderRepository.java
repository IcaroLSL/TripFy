package com.tripfy.tripfy.infra.postgresSQL.auth;

import com.tripfy.tripfy.auth.gateway.OAuthProviderRepository;
import com.tripfy.tripfy.auth.model.AuthProvider;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PostgresOAuthProviderRepository implements OAuthProviderRepository {

    private final OAuthProviderLinkJpaRepository jpaRepository;

    public PostgresOAuthProviderRepository(OAuthProviderLinkJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<String> findUserIdByProvider(AuthProvider provider, String providerId) {
        return jpaRepository.findByProviderAndProviderId(provider, providerId)
                .map(link -> link.getUserId().toString());
    }

    @Override
    public void linkProvider(String userId, AuthProvider provider, String providerId) {
        jpaRepository.save(new OAuthProviderLinkEntity(Long.valueOf(userId), provider, providerId));
    }
}
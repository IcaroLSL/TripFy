package com.tripfy.tripfy.infra.postgresSQL.auth;

import com.tripfy.tripfy.auth.model.AuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface OAuthProviderLinkJpaRepository extends JpaRepository<OAuthProviderLinkEntity, Long> {
    Optional<OAuthProviderLinkEntity> findByProviderAndProviderId(AuthProvider provider, String providerId);
}

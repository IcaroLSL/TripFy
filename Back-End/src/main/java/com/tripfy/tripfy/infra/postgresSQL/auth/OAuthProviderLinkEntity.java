package com.tripfy.tripfy.infra.postgresSQL.auth;

import com.tripfy.tripfy.auth.model.AuthProvider;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "user_oauth_providers")
public class OAuthProviderLinkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider provider;

    @Column(name = "provider_id", nullable = false)
    private String providerId;

    @Column(name = "date_created", insertable = false, updatable = false)
    private OffsetDateTime dateCreated;

    protected OAuthProviderLinkEntity() {}

    public OAuthProviderLinkEntity(Long userId, AuthProvider provider, String providerId) {
        this.userId = userId;
        this.provider = provider;
        this.providerId = providerId;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public AuthProvider getProvider() { return provider; }
    public String getProviderId() { return providerId; }
    public OffsetDateTime getDateCreated() { return dateCreated; }
}
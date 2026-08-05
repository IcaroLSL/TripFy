package com.tripfy.tripfy.auth.dto;

import com.tripfy.tripfy.auth.model.AuthProvider;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OAuthLoginRequest(
        @NotNull AuthProvider provider,
        @NotBlank String token // id_token (Google/Apple) ou access_token (Facebook)
) {}
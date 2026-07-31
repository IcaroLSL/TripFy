package com.tripfy.tripfy.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(

    @NotBlank(message = "Name is mandatory")
    @Size(max = 100, message = "Name must have a maximum of 100 characters")
    @Pattern(
            regexp = "^(?!.*(--|/\\*|\\*/)).*$",
            message = "Name contains disallowed characters"
    )
    String name,
    
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 150, message = "Username must be between 3 and 150 characters")
    @Pattern(
            regexp = "^(?!.*(--|/\\*|\\*/)).*$",
            message = "Username contains disallowed characters"
    )
    String username,
    
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).*$",
            message = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    )
    @Pattern(
            regexp = "^(?!.*(--|/\\*|\\*/)).*$",
            message = "Password contains disallowed characters"
    )
    String password

) {}

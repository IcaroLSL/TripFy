package com.tripfy.tripfy.auth.endpoint;

import com.tripfy.tripfy.auth.usecase.LoginUseCase;
import com.tripfy.tripfy.auth.dto.LoginRequest;
import com.tripfy.tripfy.auth.dto.LoginResponse;
import com.tripfy.tripfy.auth.usecase.CreateUserUseCase;
import com.tripfy.tripfy.auth.dto.CreateUserRequest;
import com.tripfy.tripfy.auth.dto.CreateUserResponse;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final LoginUseCase loginUseCase;
    private final CreateUserUseCase createUserUseCase;

    public AuthController(LoginUseCase loginUseCase, CreateUserUseCase createUserUseCase) {
        this.loginUseCase = loginUseCase;
        this.createUserUseCase = createUserUseCase;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(loginUseCase.execute(request));
    }

    @PostMapping("/register")
    public ResponseEntity<CreateUserResponse> register(@Valid @RequestBody CreateUserRequest request) {
        CreateUserResponse response = createUserUseCase.execute(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

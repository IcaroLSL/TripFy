package com.tripfy.tripfy.infrastructure.adapter.input.rest;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/login")
@RequiredArgsConstructor
public class LoginController {

    @PostMapping
    public ResponseEntity<LoginResponseDTO> login(
        @RequestBody LoginRequest request
    ) {
        
    }
}
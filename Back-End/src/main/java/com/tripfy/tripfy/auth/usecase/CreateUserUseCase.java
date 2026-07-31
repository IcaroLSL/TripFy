package com.tripfy.tripfy.auth.usecase;

import com.tripfy.tripfy.auth.dto.CreateUserRequest;
import com.tripfy.tripfy.auth.dto.CreateUserResponse;
import com.tripfy.tripfy.auth.gateway.PasswordEncoder;
import com.tripfy.tripfy.auth.gateway.UserRepository;
import com.tripfy.tripfy.auth.model.User;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class CreateUserUseCase {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CreateUserUseCase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public CreateUserResponse execute(CreateUserRequest request) {
        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username is already in use");
        }

        String hashedPassword = passwordEncoder.encode(request.password());

        User user = new User(null, request.username(), hashedPassword, request.name());

        try {
            User created = userRepository.insertUser(user);
            
            System.out.println("hashedPassword: " + hashedPassword);
            return new CreateUserResponse(created.id());
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username is already in use");
        }
    }
}
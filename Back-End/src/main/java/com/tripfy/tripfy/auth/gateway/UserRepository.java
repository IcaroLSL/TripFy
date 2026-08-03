package com.tripfy.tripfy.auth.gateway;

import com.tripfy.tripfy.auth.model.User;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findById(String id);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    
    boolean existsByUsername(String username);

    User insertUser(User user);
}

package com.tripfy.tripfy.auth.gateway;

import com.tripfy.tripfy.auth.model.User;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findByUsername(String username);
    User insertUser(User user);
}

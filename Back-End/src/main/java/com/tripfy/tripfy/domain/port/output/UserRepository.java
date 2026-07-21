package com.tripfy.tripfy.domain.port.output;

import com.tripfy.tripfy.domain.model.User;

public interface UserRepository {
    User findByUsername(String username);
}
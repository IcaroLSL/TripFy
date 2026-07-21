package com.tripfy.tripfy.domain.port.input;

import com.tripfy.tripfy.domain.model.User;

public interface CheckPasswordUseCase {
    boolean execute(User user, String password);
}
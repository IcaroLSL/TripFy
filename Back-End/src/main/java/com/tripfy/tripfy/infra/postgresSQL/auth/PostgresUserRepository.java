package com.tripfy.tripfy.infra.postgresSQL.auth;

import com.tripfy.tripfy.auth.gateway.UserRepository;
import com.tripfy.tripfy.auth.model.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class PostgresUserRepository implements UserRepository {

    private final UserJpaRepository jpaRepository;

    public PostgresUserRepository(UserJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return jpaRepository.findByUsername(username)
                .map(e -> new User(e.getId().toString(), e.getUsername(), e.getPassword(), e.getName()));
    }
}

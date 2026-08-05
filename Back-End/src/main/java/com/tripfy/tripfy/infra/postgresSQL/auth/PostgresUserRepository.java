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
    public Optional<User> findById(String id) {
        return jpaRepository.findById(Long.valueOf(id)).map(this::toDomain);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return jpaRepository.findByUsername(username).map(this::toDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaRepository.findByEmail(email).map(this::toDomain);
    }

    @Override
    public boolean existsByUsername(String username) {
        return jpaRepository.existsByUsername(username);
    }

    @Override
    public User insertUser(User user) {
        UserEntity entity = new UserEntity(user.username(), user.password(), user.name(), user.email());
        return toDomain(jpaRepository.save(entity));
    }

    private User toDomain(UserEntity e) {
        return new User(e.getId().toString(), e.getUsername(), e.getPassword(), e.getName(), e.getEmail());
    }
}

package com.tripfy.tripfy.infra.postgresSQL.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

interface UserJpaRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUsername(String username);
}

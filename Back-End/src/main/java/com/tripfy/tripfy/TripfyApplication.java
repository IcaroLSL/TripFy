package com.tripfy.tripfy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.tripfy.tripfy.infra.database.postgresSQL")
@EnableRedisRepositories(basePackages = "com.tripfy.tripfy.infra.database.redis")
@EnableMongoRepositories(basePackages = "com.tripfy.tripfy.infra.database.mongodb")
public class TripfyApplication {

    public static void main(String[] args) {
        SpringApplication.run(TripfyApplication.class, args);
    }
}
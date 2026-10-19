package com.tripfy.tripfy.infra.mongodb.datasource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class MongoRoutingConfig {

    @Bean
    public MongoDatabaseFactory selectMongoFactory(@Value("${db.mongo.select.uri}") String uri) {
        return new SimpleMongoClientDatabaseFactory(uri);
    }

    @Bean
    public MongoDatabaseFactory insertMongoFactory(@Value("${db.mongo.insert.uri}") String uri) {
        return new SimpleMongoClientDatabaseFactory(uri);
    }

    @Bean
    public MongoDatabaseFactory updateMongoFactory(@Value("${db.mongo.update.uri}") String uri) {
        return new SimpleMongoClientDatabaseFactory(uri);
    }

    @Bean
    public MongoDatabaseFactory deleteMongoFactory(@Value("${db.mongo.delete.uri}") String uri) {
        return new SimpleMongoClientDatabaseFactory(uri);
    }

    @Bean
    @Primary
    public MongoDatabaseFactory routingMongoDatabaseFactory(
            MongoDatabaseFactory selectMongoFactory,
            MongoDatabaseFactory insertMongoFactory,
            MongoDatabaseFactory updateMongoFactory,
            MongoDatabaseFactory deleteMongoFactory) {

        Map<DbOperation, MongoDatabaseFactory> targets = new HashMap<>();
        targets.put(DbOperation.SELECT, selectMongoFactory);
        targets.put(DbOperation.INSERT, insertMongoFactory);
        targets.put(DbOperation.UPDATE, updateMongoFactory);
        targets.put(DbOperation.DELETE, deleteMongoFactory);

        return new RoutingMongoDatabaseFactory(targets, selectMongoFactory);
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoDatabaseFactory routingMongoDatabaseFactory) {
        return new MongoTemplate(routingMongoDatabaseFactory);
    }
}
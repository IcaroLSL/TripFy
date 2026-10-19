package com.tripfy.tripfy.infra.mongodb.datasource;

import com.mongodb.ClientSessionOptions;
import com.mongodb.client.ClientSession;
import com.mongodb.client.MongoDatabase;
import org.springframework.dao.support.PersistenceExceptionTranslator;
import org.springframework.data.mongodb.MongoDatabaseFactory;

import java.util.Map;

public class RoutingMongoDatabaseFactory implements MongoDatabaseFactory {

    private final Map<DbOperation, MongoDatabaseFactory> targets;
    private final MongoDatabaseFactory defaultFactory;

    public RoutingMongoDatabaseFactory(Map<DbOperation, MongoDatabaseFactory> targets,
                                        MongoDatabaseFactory defaultFactory) {
        this.targets = targets;
        this.defaultFactory = defaultFactory;
    }

    private MongoDatabaseFactory resolve() {
        DbOperation operation = MongoDataSourceContextHolder.get();
        return targets.getOrDefault(operation, defaultFactory);
    }

    @Override
    public MongoDatabase getMongoDatabase() {
        return resolve().getMongoDatabase();
    }

    @Override
    public MongoDatabase getMongoDatabase(String dbName) {
        return resolve().getMongoDatabase(dbName);
    }

    @Override
    public PersistenceExceptionTranslator getExceptionTranslator() {
        return resolve().getExceptionTranslator();
    }

    @Override
    public ClientSession getSession(ClientSessionOptions options) {
        return resolve().getSession(options);
    }

    @Override
    public MongoDatabaseFactory withSession(ClientSession session) {
        return resolve().withSession(session);
    }

    @Override
    public boolean isTransactionActive() {
        return resolve().isTransactionActive();
    }
}
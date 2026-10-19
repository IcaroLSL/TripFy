package com.tripfy.tripfy.infra.mongodb.migration;

import liquibase.Liquibase;
import liquibase.changelog.ChangeLogParameters;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.resource.ClassLoaderResourceAccessor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class MongoLiquibaseRunner implements CommandLineRunner {

    private final String migrationUri;
    private final String changelogPath;

    private final String mongoSelectUser;
    private final String mongoSelectPassword;
    private final String mongoInsertUser;
    private final String mongoInsertPassword;
    private final String mongoUpdateUser;
    private final String mongoUpdatePassword;
    private final String mongoDeleteUser;
    private final String mongoDeletePassword;

    public MongoLiquibaseRunner(
            @Value("${db.mongo.migration.uri}") String migrationUri,
            @Value("${db.mongo.migration.changelog}") String changelogPath,
            @Value("${MONGO_SELECT_USERNAME}") String mongoSelectUser,
            @Value("${MONGO_SELECT_PASSWORD}") String mongoSelectPassword,
            @Value("${MONGO_INSERT_USERNAME}") String mongoInsertUser,
            @Value("${MONGO_INSERT_PASSWORD}") String mongoInsertPassword,
            @Value("${MONGO_UPDATE_USERNAME}") String mongoUpdateUser,
            @Value("${MONGO_UPDATE_PASSWORD}") String mongoUpdatePassword,
            @Value("${MONGO_DELETE_USERNAME}") String mongoDeleteUser,
            @Value("${MONGO_DELETE_PASSWORD}") String mongoDeletePassword) {
        this.migrationUri = migrationUri;
        this.changelogPath = changelogPath;
        this.mongoSelectUser = mongoSelectUser;
        this.mongoSelectPassword = mongoSelectPassword;
        this.mongoInsertUser = mongoInsertUser;
        this.mongoInsertPassword = mongoInsertPassword;
        this.mongoUpdateUser = mongoUpdateUser;
        this.mongoUpdatePassword = mongoUpdatePassword;
        this.mongoDeleteUser = mongoDeleteUser;
        this.mongoDeletePassword = mongoDeletePassword;
    }

    @Override
    public void run(String... args) throws Exception {
        Database database = DatabaseFactory.getInstance()
                .openDatabase(migrationUri, null, null, null, new ClassLoaderResourceAccessor());

        Liquibase liquibase = new Liquibase(changelogPath, new ClassLoaderResourceAccessor(), database);

        ChangeLogParameters params = liquibase.getChangeLogParameters();
        params.set("mongoSelectUser", mongoSelectUser);
        params.set("mongoSelectPassword", mongoSelectPassword);
        params.set("mongoInsertUser", mongoInsertUser);
        params.set("mongoInsertPassword", mongoInsertPassword);
        params.set("mongoUpdateUser", mongoUpdateUser);
        params.set("mongoUpdatePassword", mongoUpdatePassword);
        params.set("mongoDeleteUser", mongoDeleteUser);
        params.set("mongoDeletePassword", mongoDeletePassword);

        liquibase.update();
    }
}
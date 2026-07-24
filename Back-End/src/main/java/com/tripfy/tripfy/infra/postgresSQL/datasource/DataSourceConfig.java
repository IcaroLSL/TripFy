package com.tripfy.tripfy.infra.postgresSQL.datasource;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource selectDataSource(
            @Value("${db.select.url}") String url,
            @Value("${db.select.username}") String username,
            @Value("${db.select.password}") String password) {
        return build(url, username, password);
    }

    @Bean
    public DataSource insertDataSource(
            @Value("${db.insert.url}") String url,
            @Value("${db.insert.username}") String username,
            @Value("${db.insert.password}") String password) {
        return build(url, username, password);
    }

    @Bean
    public DataSource updateDataSource(
            @Value("${db.update.url}") String url,
            @Value("${db.update.username}") String username,
            @Value("${db.update.password}") String password) {
        return build(url, username, password);
    }

    @Bean
    public DataSource deleteDataSource(
            @Value("${db.delete.url}") String url,
            @Value("${db.delete.username}") String username,
            @Value("${db.delete.password}") String password) {
        return build(url, username, password);
    }

    @Bean
    @Primary
    public DataSource routingDataSource(DataSource selectDataSource,
                                         DataSource insertDataSource,
                                         DataSource updateDataSource,
                                         DataSource deleteDataSource) {

        Map<Object, Object> targets = new HashMap<>();
        targets.put(DbOperation.SELECT, selectDataSource);
        targets.put(DbOperation.INSERT, insertDataSource);
        targets.put(DbOperation.UPDATE, updateDataSource);
        targets.put(DbOperation.DELETE, deleteDataSource);

        RoutingDataSource routingDataSource = new RoutingDataSource();
        routingDataSource.setTargetDataSources(targets);
        routingDataSource.setDefaultTargetDataSource(selectDataSource);
        routingDataSource.afterPropertiesSet();

        return routingDataSource;
    }

    private DataSource build(String url, String username, String password) {
        return DataSourceBuilder.create()
                .type(HikariDataSource.class)
                .url(url)
                .username(username)
                .password(password)
                .build();
    }
}

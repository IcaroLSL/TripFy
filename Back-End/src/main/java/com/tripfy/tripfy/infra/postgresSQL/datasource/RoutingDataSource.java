package com.tripfy.tripfy.infra.postgresSQL.datasource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class RoutingDataSource extends AbstractRoutingDataSource {

    private static final Logger log = LoggerFactory.getLogger(RoutingDataSource.class);

    @Override
    protected Object determineCurrentLookupKey() {
        DbOperation operation = DataSourceContextHolder.get();
        DbOperation resolved = operation != null ? operation : DbOperation.SELECT;
        System.out.println(" ");
        System.out.println(" ");
        System.out.println(" ");
        log.info("Roteando para datasource: {}", resolved);
        System.out.println(" ");
        System.out.println(" ");
        System.out.println(" ");
        return resolved;
    }
}
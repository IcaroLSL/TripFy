package com.tripfy.tripfy.infra.postgresSQL.datasource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class RoutingDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
        DbOperation operation = DataSourceContextHolder.get();
        return operation != null ? operation : DbOperation.SELECT;
    }
}

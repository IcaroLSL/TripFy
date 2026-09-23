package com.tripfy.tripfy.infra.mongodb.datasource;

public class MongoDataSourceContextHolder {
    private static final ThreadLocal<DbOperation> CONTEXT = new ThreadLocal<>();

    public static void set(DbOperation operation) {
        CONTEXT.set(operation);
    }

    public static DbOperation get() {
        return CONTEXT.get();
    }

    public static void clear() {
        CONTEXT.remove();
    }
}
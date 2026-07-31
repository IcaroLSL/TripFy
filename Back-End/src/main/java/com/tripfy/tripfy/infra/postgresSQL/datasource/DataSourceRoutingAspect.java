package com.tripfy.tripfy.infra.postgresSQL.datasource;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(0)
public class DataSourceRoutingAspect {

    @Around("execution(* com.tripfy.tripfy.infra.postgresSQL..*Repository.*(..)) " +
        "&& !execution(* com.tripfy.tripfy.infra.postgresSQL..*JpaRepository.*(..))")
    public Object route(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        DbOperation operation = resolveOperation(methodName);

        try {
            DataSourceContextHolder.set(operation);
            return joinPoint.proceed();
        } finally {
            DataSourceContextHolder.clear();
        }
    }

    private DbOperation resolveOperation(String methodName) {
        String name = methodName.toLowerCase();

        if (name.startsWith("insert") || name.startsWith("create")) {
            return DbOperation.INSERT;
        }
        if (name.startsWith("update")) {
            return DbOperation.UPDATE;
        }
        if (name.startsWith("delete") || name.startsWith("remove")) {
            return DbOperation.DELETE;
        }
        // find, select, get, exists, count...
        return DbOperation.SELECT;
    }
}

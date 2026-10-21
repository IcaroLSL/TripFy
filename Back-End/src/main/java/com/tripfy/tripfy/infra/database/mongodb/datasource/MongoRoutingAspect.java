package com.tripfy.tripfy.infra.database.mongodb.datasource;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(0)
public class MongoRoutingAspect {

    @Around("execution(* com.tripfy.tripfy.infra.database.mongodb..*Repository.*(..)) " +
            "&& !execution(* org.springframework.data.mongodb.repository.MongoRepository.*(..))")
    public Object route(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        DbOperation operation = resolveOperation(methodName);

        try {
            MongoDataSourceContextHolder.set(operation);
            return joinPoint.proceed();
        } finally {
            MongoDataSourceContextHolder.clear();
        }
    }

    private DbOperation resolveOperation(String methodName) {
        String name = methodName.toLowerCase();

        if (name.startsWith("insert") || name.startsWith("create") || name.startsWith("link")) {
            return DbOperation.INSERT;
        }
        if (name.startsWith("update")) {
            return DbOperation.UPDATE;
        }
        if (name.startsWith("delete") || name.startsWith("remove") || name.startsWith("unlink")) {
            return DbOperation.DELETE;
        }
        return DbOperation.SELECT;
    }
}
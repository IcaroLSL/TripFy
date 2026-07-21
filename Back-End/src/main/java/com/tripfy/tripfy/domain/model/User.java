package com.tripfy.tripfy.domain.model;

import java.time.ZonedDateTime;

public record User(
    String        id,
    String        name,
    String        username,
    String        password,
    ZonedDateTime creationDate,
    Boolean       active
) {}

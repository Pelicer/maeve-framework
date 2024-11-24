package com.maeve.normalizer.application.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * RuntimeException implementation to specify failures caused by Jackson when trying to
 * serialize/deserialize malformed JSON logs in the database.
 *
 * @author Pelicer
 */
@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class JsonProcessingException extends RuntimeException {

    private static final String ERROR_MESSAGE = "The log entry %s could not be normalized due to JSON serialization issues. Fields to normalize: %s";

    public JsonProcessingException(final Long logId, final String fields) {
        super(String.format(ERROR_MESSAGE, logId, fields));
    }
}

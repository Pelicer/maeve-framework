package com.maeve.normalizer.domain.exceptions;

/**
 * RuntimeException implementation to specify requests to normalize logs that do not exist
 *
 * @author Pelicer
 */
public class MaeveLogNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE_PREFIX = "Could not find a log that matches id ";

    public MaeveLogNotFoundException(final Long id) {
        super(ERROR_MESSAGE_PREFIX.concat(id.toString()));
    }
}

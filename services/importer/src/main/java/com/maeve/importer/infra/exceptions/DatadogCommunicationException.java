package com.maeve.importer.infra.exceptions;

/**
 * RuntimeException implementation to specify failed communications with Datadog's API.
 *
 * @author Pelicer
 */
public class DatadogCommunicationException extends RuntimeException {

    private static final String ERROR_MESSAGE_PREFIX = "An error occurred while fetching logs from data dog. Detailed message is: ";

    public DatadogCommunicationException(final String errorMessage) {
        super(ERROR_MESSAGE_PREFIX.concat(errorMessage));
    }
}

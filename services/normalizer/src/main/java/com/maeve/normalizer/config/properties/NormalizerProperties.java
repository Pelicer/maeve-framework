package com.maeve.normalizer.config.properties;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

/**
 * Properties configuration class for the application business logic
 * specific parameters
 *
 * @author Pelicer
 */
@Configuration
@ConfigurationProperties(prefix = "normalizer")
@Getter
@Setter
public class NormalizerProperties {

    /**
     * Map of fields to be normalized, where the key is the field name
     * and the value contains properties such as the source.
     */
    private Map<String, FieldProperties> fields;

    @Getter
    @Setter
    public static class FieldProperties {
        private String source;
    }
}

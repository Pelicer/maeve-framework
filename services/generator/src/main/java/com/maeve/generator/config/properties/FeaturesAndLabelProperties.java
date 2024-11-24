package com.maeve.generator.config.properties;

import java.util.List;

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
@ConfigurationProperties(prefix = "features-and-label")
@Getter
@Setter
public class FeaturesAndLabelProperties {

    /**
     * List of fields that will become features in the dataset
     */
    private List<String> features;

    /**
     * Dataset label
     */
    private String label;
}

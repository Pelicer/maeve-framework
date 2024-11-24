package com.maeve.importer.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

/**
 * Properties configuration class for the Datadog API,
 * containing all necessary client configuration, e.g.
 * pagination rules, etc.
 *
 * @author Pelicer
 */
@Configuration
@ConfigurationProperties(prefix = "datadog.client")
@Getter
@Setter
public class DatadogClientProperties {

    /**
     * Number of logs that will be requested per page
     */
    private Integer logsPerRequest;
}
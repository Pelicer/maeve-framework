package com.maeve.importer.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

/**
 * Properties configuration class for the Datadog API,
 * containing all necessary authorization information.
 *
 * @author Pelicer
 */
@Configuration
@ConfigurationProperties(prefix = "datadog.auth")
@Getter
@Setter
public class DatadogAuthProperties {

    /**
     * See detailed information at <a href="https://docs.datadoghq.com/account_management/api-app-keys/"> the official documentation</a>
     */
    private String apiKey;
    /**
     * See detailed information at <a href="https://docs.datadoghq.com/account_management/api-app-keys/"> the official documentation</a>
     */
    private String appKey;
    /**
     * Datadog's API host, e.g. api.datadoghq.eu, api.datadoghq.com, etc.
     */
    private String host;
}
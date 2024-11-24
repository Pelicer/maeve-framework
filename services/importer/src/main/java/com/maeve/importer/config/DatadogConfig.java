package com.maeve.importer.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.datadog.api.client.ApiClient;
import com.datadog.api.client.v2.api.LogsApi;
import com.maeve.importer.config.properties.DatadogAuthProperties;

import lombok.AllArgsConstructor;

/**
 * Configuration class for the Datadog communication. This class defines
 * a bean of {@link com.datadog.api.client.v2.api.LogsApi} that will be used
 * to retrieve logs from Datadog. All configuration used to connect to
 * Datadog are coming from the application properties file.
 *
 * @author Pelicer
 */
@Configuration
@AllArgsConstructor
public class DatadogConfig {

    private final DatadogAuthProperties datadogAuthProperties;

    @Bean
    public LogsApi logsApiInstance() {
        return new LogsApi(this.apiClient(datadogAuthProperties.getApiKey(), datadogAuthProperties.getAppKey(), datadogAuthProperties.getHost()));
    }

    private ApiClient apiClient(final String apiKey, final String appKey, final String host) {
        final ApiClient defaultApiClient = ApiClient.getDefaultApiClient();
        defaultApiClient.setBasePath(host);
        defaultApiClient.configureApiKeys(buildSecrets(apiKey, appKey));
        return defaultApiClient;
    }

    private Map<String, String> buildSecrets(final String apiKey, final String appKey) {
        final Map<String, String> secrets = new HashMap<>();
        secrets.put("apiKeyAuth", apiKey);
        secrets.put("appKeyAuth", appKey);
        return secrets;

    }
}

package com.maeve.importer.infra.integration.datadog;

import com.datadog.api.client.v2.model.*;
import com.datadog.api.client.v2.api.LogsApi;
import com.maeve.importer.config.properties.DatadogClientProperties;
import com.maeve.importer.infra.exceptions.DatadogCommunicationException;

import java.util.Collections;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;

/**
 * Integrates the application directly to the Datadog API.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
public class DatadogClient {

    /**
     * Spring IOC will populate this field from {@link com.maeve.importer.config.MongoConfig} with a configured {@link com.datadog.api.client.v2.api.LogsApi} instance
     */
    private final LogsApi apiInstance;

    private final DatadogClientProperties datadogClientProperties;

    /**
     * Requests Datadog for logs for the given time range.
     *
     * @param from the {@link java.time.LocalDateTime} starting date and time
     * @param to the{@link java.time.LocalDateTime} end date and time
     * @param cursor Pagination data that tells Datadog which page the method is requesting
     * See more at <a href="https://docs.datadoghq.com/api/latest/logs/?code-lang=java">the official documentation</a>
     * @author Pelicer
     */
    @SneakyThrows
    public LogsListResponse fetchLogs(final String from, final String to, final String cursor) {
        final LogsListRequest requestBody = new LogsListRequest().filter(
                        new LogsQueryFilter()
                                .indexes(Collections.singletonList("main"))
                                .from(from)
                                .to(to)
                )
                /*
                 * This next line should handle timezone automatically. However,
                 * this is not working properly, and the from and to dates are being received in this method with a +4 hours offset
                 * https://docs.datadoghq.com/api/latest/logs/#search-logs
                 */
                .options(new LogsQueryOptions().timezone("America/Sao_Paulo"))
                .page(new LogsListRequestPage().limit(datadogClientProperties.getLogsPerRequest()).cursor(cursor))
                .sort(LogsSort.TIMESTAMP_DESCENDING);
        try {
            return apiInstance.listLogs(new LogsApi.ListLogsOptionalParameters().body(requestBody));
        }
        catch(final Exception e) {
            throw new DatadogCommunicationException(e.getCause().getLocalizedMessage());
        }
    }
}

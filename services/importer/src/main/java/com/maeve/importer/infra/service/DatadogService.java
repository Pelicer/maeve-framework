package com.maeve.importer.infra.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.datadog.api.client.v2.model.LogsListResponse;
import com.datadog.api.client.v2.model.LogsResponseMetadataPage;
import com.maeve.importer.infra.integration.datadog.DatadogClient;
import com.datadog.api.client.v2.model.Log;
import com.maeve.importer.utils.DateUtils;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Provides Datadog communication to the application.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
@Slf4j
public class DatadogService {

    private final DatadogClient datadogClient;

    /**
     * Retrieves logs from Datadog, through API communication, for the given date range.
     * <p><b color="yellow">Datadog API for searching logs is not handling timezones properly. Due to this, to comply with
     * São Paulo's timezone, all from and to fields are being summed +4 hours.</p>
     *
     * @param from the {@link java.time.LocalDateTime} starting date and time
     * @param to the {@link java.time.LocalDateTime} end date and time
     * @return List of {@link com.datadog.api.client.v2.model.Log}
     * @author Pelicer
     */
    public List<Log> retrieveLogsFromDatadog(final LocalDateTime from, final LocalDateTime to) {
        final List<Log> logs = new ArrayList<>();
        LogsListResponse datadogResponse = datadogClient.fetchLogs(
                DateUtils.addHoursAndSetFormatToISO8601(from, 4L), DateUtils.addHoursAndSetFormatToISO8601(to, 4L), null);
        logs.addAll(datadogResponse.getData());
        LogsResponseMetadataPage page = datadogResponse.getMeta().getPage();
        log.debug("First page of the request was retrieved");

        while (page != null) {
            log.debug("Retrieving next page");
            datadogResponse = datadogClient.fetchLogs(DateUtils.addHoursAndSetFormatToISO8601(from, 4L), DateUtils.addHoursAndSetFormatToISO8601(to, 4L),
                    page.getAfter());
            logs.addAll(datadogResponse.getData());
            page = datadogResponse.getMeta().getPage();
        }
        return logs;
    }
}

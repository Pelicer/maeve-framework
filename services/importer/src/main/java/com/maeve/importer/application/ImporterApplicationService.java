package com.maeve.importer.application;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.datadog.api.client.v2.model.Log;
import com.maeve.importer.domain.MaeveLogService;
import com.maeve.importer.domain.logs.MaeveLog;
import com.maeve.importer.infra.mappers.LogMapper;
import com.maeve.importer.infra.service.DatadogService;
import com.maeve.importer.infra.service.RabbitMQService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Application service class, to connect infrastructure and domain.
 *
 * @author Pelicer
 */
@Service
@Slf4j
@AllArgsConstructor
public class ImporterApplicationService {

    private DatadogService datadogService;
    private MaeveLogService maeveLogService;
    private RabbitMQService rabbitMQService;
    private LogMapper logMapper;

    /**
     * Imports logs from Datadog for a given date range, saves them in MongoDB as {@link com.maeve.importer.domain.logs.MaeveLog} and publishes an event
     * to RabbitMQ
     *
     * @param from the {@link java.time.LocalDateTime} starting date and time
     * @param to the{@link java.time.LocalDateTime} end date and time
     * @author Pelicer
     */
    public void importDatadogLogs(final LocalDateTime from, final LocalDateTime to) {
        log.info("Importing logs from {} to {}", from, to);
        final List<Log> logs = datadogService.retrieveLogsFromDatadog(from, to);
        log.info("{} log entries to save", logs.size());

        final List<MaeveLog> domainLogs = logs.stream().map(log -> logMapper.toDomain(log.getAttributes())).toList();
        maeveLogService.saveMaeveLogs(domainLogs);
        log.info("Sending all entries to RabbitMQ for normalization");
        rabbitMQService.publishMaeveLogs(domainLogs);
    }
}

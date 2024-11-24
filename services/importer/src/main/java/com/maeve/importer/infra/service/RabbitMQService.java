package com.maeve.importer.infra.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.maeve.importer.domain.logs.MaeveLog;
import com.maeve.importer.infra.integration.rabbitmq.RabbitMQPublisher;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Provides RabbitMQ communication to the application.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
@Slf4j
public class RabbitMQService {

    private final RabbitMQPublisher rabbitMQPublisher;

    /**
     * Publishes messages to RabbitMQ containing the ID of the given logs.
     *
     * @param logs the list of {@link com.maeve.importer.domain.logs.MaeveLog} to publish the ID as a message to RabbitMQ
     * @author Pelicer
     */
    public void publishMaeveLogs(final List<MaeveLog> logs) {
        for(final MaeveLog entry : logs) {
            rabbitMQPublisher.publishMessage(entry.getId().toString());
            log.debug("Entry ID {} was published to RabbitMQ", entry.getId());
        }
    }
}

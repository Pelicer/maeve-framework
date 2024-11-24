package com.maeve.normalizer.infra.integration.rabbitmq;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;

/**
 * Triggers the initialization of the RabbitMQ consumer upon application start up
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
public class RabbitMQConsumerInitializer {

    private final RabbitMQConsumer rabbitMQConsumer;

    @PostConstruct
    private void initializeConsumer() {
        rabbitMQConsumer.startConsuming();
    }
}

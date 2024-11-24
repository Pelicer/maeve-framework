package com.maeve.importer.infra.integration.rabbitmq;

import org.springframework.stereotype.Component;

import com.maeve.importer.config.properties.RabbitMQProperties;
import com.rabbitmq.client.Channel;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;

/**
 * Integrates the application directly to the RabbitMQ broker.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
public class RabbitMQPublisher {

    /**
     * Spring IOC will populate this field from {@link com.maeve.importer.config.RabbitMQConfig} with a configured {@link com.rabbitmq.client.Channel} instance
     */
    private Channel channel;
    private final RabbitMQProperties rabbitMQProperties;

    /**
     * Publishes a message to RabbitMQ.
     *
     * @param message String content to be published as a message to RabbitMQ
     * @author Pelicer
     */
    @SneakyThrows
    public void publishMessage(final String message) {
        channel.basicPublish(rabbitMQProperties.getExchangeName(), "", null, message.getBytes("UTF-8"));

    }
}

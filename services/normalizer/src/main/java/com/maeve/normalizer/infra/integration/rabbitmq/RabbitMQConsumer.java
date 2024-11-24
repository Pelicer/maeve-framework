package com.maeve.normalizer.infra.integration.rabbitmq;

import org.springframework.stereotype.Component;

import com.maeve.normalizer.application.NormalizerApplicationService;
import com.maeve.normalizer.config.properties.RabbitMQProperties;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DeliverCallback;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

/**
 * Integrates the application directly to the RabbitMQ broker.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
@Slf4j
public class RabbitMQConsumer {

    private final RabbitMQProperties rabbitMQProperties;
    private NormalizerApplicationService normalizerApplicationService;
    /**
     * Spring IOC will populate this field from {@link com.maeve.normalizer.config.RabbitMQConfig} with a configured {@link com.rabbitmq.client.Channel} instance
     */
    private Channel channel;

    /**
     * Listener that consumes messages from a RabbitMQ exchange.
     *
     * @author Pelicer
     */
    @SneakyThrows
    public void startConsuming() {
        final String queueName = channel.queueDeclare().getQueue();
        channel.queueBind(queueName, rabbitMQProperties.getExchangeName(), "");

        final DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            final String message = new String(delivery.getBody(), "UTF-8");
            log.info("New message consumed from RabbitMQ, ID {} will be normalized ", message);
            normalizerApplicationService.normalizeEntry(Long.valueOf(message));
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
        });
    }
}

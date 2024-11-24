package com.maeve.normalizer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.maeve.normalizer.config.properties.RabbitMQProperties;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;

/**
 * Configuration class for the RabbitMQ connection. This class defines
 * a bean of {@link com.rabbitmq.client.Channel} connected to the configured {@link com.maeve.normalizer.config.properties.RabbitMQProperties}.
 *
 * @author Pelicer
 */
@Configuration
@AllArgsConstructor
public class RabbitMQConfig {

    private final RabbitMQProperties rabbitMQProperties;

    /**
     * Configuration bean for the RabbitMQ connection. This method provides
     * a {@link com.rabbitmq.client.Channel}, connected to the configured {@link com.maeve.normalizer.config.properties.RabbitMQProperties}.
     *
     * @author Pelicer
     */
    @Bean
    @SneakyThrows
    public Channel buildRabbitMQConnectionFactory() {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(rabbitMQProperties.getHost());
        factory.setUsername(rabbitMQProperties.getUsername());
        factory.setPassword(rabbitMQProperties.getPassword());
        final Connection connection = factory.newConnection();

        final Channel channel = connection.createChannel();
        channel.exchangeDeclare(rabbitMQProperties.getExchangeName(), "fanout");
        return channel;
    }
}
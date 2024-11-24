package com.maeve.importer.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

/**
 * Properties configuration class for the RabbitMQ broker,
 * that holds the necessary information for the system to properly
 * publish messages.
 *
 * @author Pelicer
 */
@Configuration
@ConfigurationProperties(prefix = "rabbitmq")
@Getter
@Setter
public class RabbitMQProperties {

    /**
     * See <a href="https://rabbitmq.com/tutorials/tutorial-three-python.html"> the official RabbitMQ documentation </a> for more information.
     * The exchange that will be used to send messages to queues
     */
    private String exchangeName;
    /**
     * Please refer to the docker compose file of the project to configure this field
     */
    private String host;
    /**
     * Please refer to the docker compose file of the project to configure this field
     */
    private String username;
    /**
     * Please refer to the docker compose file of the project to configure this field
     */
    private String password;
    /**
     * The exchangeType property defines how the messages will be sent to queues.
     * See <a href="https://rabbitmq.com/tutorials/tutorial-three-python.html"> the official RabbitMQ documentation </a> for more information
     */
    private String exchangeType;
}
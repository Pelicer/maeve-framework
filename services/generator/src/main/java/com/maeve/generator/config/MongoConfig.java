package com.maeve.generator.config;

import org.bson.UuidRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;

import lombok.SneakyThrows;

/**
 * Configuration class for the MongoDB connection. This class defines
 * a bean of {@link com.mongodb.MongoClientSettings} that will connect the application to the database
 * specified in the <b>${spring.data.mongodb.uri}</b> application property.
 *
 * @author Pelicer
 */
@Configuration
public class MongoConfig {

    @Bean
    @SneakyThrows
    public MongoClientSettings mongoClientSettings(@Value("${spring.data.mongodb.uri}") final String uri) {
        return MongoClientSettings.builder()
                .uuidRepresentation(UuidRepresentation.STANDARD)
                .applyConnectionString(new ConnectionString(uri))
                .build();
    }
}

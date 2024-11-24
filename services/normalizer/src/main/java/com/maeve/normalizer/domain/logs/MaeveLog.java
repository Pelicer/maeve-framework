package com.maeve.normalizer.domain.logs;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Domain POJO for the logs from Datadog that will be stored as a MongoDB collection.
 *
 * @author Pelicer
 */
@AllArgsConstructor
@Document(collection = "maeveLogEntries")
@Getter
@Setter
public class MaeveLog {

    @Id final Long id;
    final Map<String, Object> attributes;
    final String host;
    final String message;
    final String service;
    final String status;
    final List<String> tags;
    final LocalDateTime timestamp;
}

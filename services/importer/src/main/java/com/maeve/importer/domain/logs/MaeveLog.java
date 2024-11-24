package com.maeve.importer.domain.logs;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Domain POJO for the logs from Datadog that will be stored as a MongoDB collection.
 *
 * @author Pelicer
 */
@Getter
@Setter
@Document(collection = "maeveLogEntries")
@RequiredArgsConstructor
public class MaeveLog {

    @Transient
    public static final String SEQUENCE_NAME = "maeveLog_sequence";

    @Id
    private Long id;
    private final Map<String, Object> attributes;
    private final String host;
    private final String message;
    private final String service;
    private final String status;
    private final List<String> tags;
    private final LocalDateTime timestamp;

}

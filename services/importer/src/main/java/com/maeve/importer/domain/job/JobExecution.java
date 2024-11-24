package com.maeve.importer.domain.job;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Domain POJO for the MongoDB collection that will store this application's job execution history.
 *
 * @author Pelicer
 */
@Getter
@Setter
@RequiredArgsConstructor
@Document(collection = "jobExecutions")
public class JobExecution {
    private final LocalDateTime timestamp;
}

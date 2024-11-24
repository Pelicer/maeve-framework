package com.maeve.generator.domain.dataset;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

/**
 * Domain POJO for the MongoDB collection that will store this application's dataset generation history.
 *
 * @author Pelicer
 */
@Getter
@Setter
@RequiredArgsConstructor
@Document(collection = "datasetGeneration")
public class DatasetGeneration {
    private final LocalDateTime timestamp;
}

package com.maeve.normalizer.domain.logs;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;

/**
 * Domain POJO for the logs that were normalized by the application
 *
 * @author Pelicer
 */
@AllArgsConstructor
@Document(collection = "normalizedEntry")
public class NormalizedEntry {
    final Long id;
    final String jsonNormalizedData;
    final LocalDateTime normalizationTimestamp;
}


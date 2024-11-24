package com.maeve.generator.domain.logs;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Domain POJO for the logs that were normalized by the application
 *
 * @author Pelicer
 */
@AllArgsConstructor
@Document(collection = "normalizedEntry")
@Getter
@Setter
public class NormalizedEntry {
    final Long id;
    final String jsonNormalizedData;
    final LocalDateTime normalizationTimestamp;
}

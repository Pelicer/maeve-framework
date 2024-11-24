package com.maeve.generator.domain.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Component;

import com.maeve.generator.domain.logs.NormalizedEntry;
import com.maeve.generator.domain.repository.NormalizedEntryRepository;

import lombok.AllArgsConstructor;

/**
 * Provides methods for the application to handle {@link com.maeve.generator.domain.logs.NormalizedEntry}
 * class business logic.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
public class NormalizedEntryService {

    private final NormalizedEntryRepository normalizedEntryRepository;

    public List<NormalizedEntry> findByNormalizationTimestampBetween(final LocalDateTime from, final LocalDateTime to) {
        return normalizedEntryRepository.findByNormalizationTimestampBetween(from, to);
    }
}

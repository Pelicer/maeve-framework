package com.maeve.normalizer.application;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.maeve.normalizer.config.properties.NormalizerProperties;
import com.maeve.normalizer.domain.logs.MaeveLog;
import com.maeve.normalizer.domain.logs.NormalizedEntry;
import com.maeve.normalizer.domain.normalization.factory.NormalizerFactory;
import com.maeve.normalizer.domain.service.MaeveLogService;
import com.maeve.normalizer.domain.service.NormalizedEntryService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Application service class, to connect infrastructure and domain.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
@Slf4j
public class NormalizerApplicationService {

    private MaeveLogService maeveLogService;
    private NormalizedEntryService normalizedEntryService;
    private NormalizerProperties normalizerProperties;
    private NormalizerFactory normalizerFactory;

    /**
     * Normalizes the log matches by the provided ID and saves a {@link com.maeve.normalizer.domain.logs.NormalizedEntry} in the database
     *
     * @param id the {@link java.lang.Long} id of the log to be normalized
     * @author Pelicer
     */
    public void normalizeEntry(final long id) {
        final MaeveLog maeveLog = maeveLogService.findEntryById(id);
        log.info("Entry found", id);
        final Map<String, NormalizerProperties.FieldProperties> fields = normalizerProperties.getFields();
        log.debug("Fields to extract for log entry {}: {}", maeveLog.getId(), fields.toString());

        final String extractedFields = normalizedEntryService.extractFields(fields, maeveLog);
        final String normalizedFields = normalizedEntryService.applyNormalizations(normalizerFactory, extractedFields);
        final NormalizedEntry entry = new NormalizedEntry(maeveLog.getId(), normalizedFields, LocalDateTime.now());
        normalizedEntryService.saveNormalizedEntry(entry);
    }

}

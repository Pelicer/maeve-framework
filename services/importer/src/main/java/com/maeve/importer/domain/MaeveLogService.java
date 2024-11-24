package com.maeve.importer.domain;

import java.util.List;

import org.springframework.stereotype.Service;

import com.maeve.importer.domain.logs.MaeveLog;
import com.maeve.importer.domain.repository.MaeveRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Provides methods for the application to handle {@link com.maeve.importer.domain.logs.MaeveLog}
 * class business logic.
 *
 * @author Pelicer
 */
@Service
@AllArgsConstructor
@Slf4j
public class MaeveLogService {

    private MaeveRepository repository;

    public void saveMaeveLogs(final List<MaeveLog> logs) {
        log.info("Saving {} logs", logs.size());
        repository.saveAll(logs);
    }
}

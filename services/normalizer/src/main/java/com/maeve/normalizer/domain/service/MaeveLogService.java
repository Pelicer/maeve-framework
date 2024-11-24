package com.maeve.normalizer.domain.service;

import org.springframework.stereotype.Component;

import com.maeve.normalizer.domain.exceptions.MaeveLogNotFoundException;
import com.maeve.normalizer.domain.logs.MaeveLog;
import com.maeve.normalizer.domain.respository.MaeveLogRepository;

import lombok.AllArgsConstructor;

/**
 * Provides methods for the application to handle {@link com.maeve.normalizer.domain.logs.MaeveLog}
 * class business logic.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
public class MaeveLogService {

    private MaeveLogRepository maeveLogRepository;

    public MaeveLog findEntryById(final Long id) {
        return maeveLogRepository.findById(id).orElseThrow(() -> new MaeveLogNotFoundException(id));
    }

}

package com.maeve.generator.domain.service;

import org.springframework.stereotype.Service;

import com.maeve.generator.domain.dataset.DatasetGeneration;
import com.maeve.generator.domain.repository.DatasetGenerationRepository;

import lombok.AllArgsConstructor;

/**
 * Provides methods for the application to handle {@link com.maeve.generator.domain.dataset.DatasetGeneration}
 * class business logic.
 *
 * @author Pelicer
 */
@Service
@AllArgsConstructor
public class DatasetGenerationService {

    private DatasetGenerationRepository datasetGenerationRepository;

    public void saveDatasetGeneration(final DatasetGeneration datasetGeneration) {
        datasetGenerationRepository.save(datasetGeneration);
    }
}

package com.maeve.importer.domain;

import org.springframework.stereotype.Service;

import com.maeve.importer.domain.job.JobExecution;
import com.maeve.importer.domain.repository.JobRepository;

import lombok.AllArgsConstructor;

/**
 * Provides methods for the application to handle {@link com.maeve.importer.domain.job.JobExecution}
 * class business logic.
 *
 * @author Pelicer
 */
@Service
@AllArgsConstructor
public class JobService {

    private JobRepository jobRepository;

    public JobExecution getLastJobExecution() {
        return jobRepository.findTop1ByOrderByTimestampDesc();
    }

    public void saveJobExecution(final JobExecution job) {
        jobRepository.save(job);
    }
}

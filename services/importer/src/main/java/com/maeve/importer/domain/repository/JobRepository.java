package com.maeve.importer.domain.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.maeve.importer.domain.job.JobExecution;

@Repository
public interface JobRepository extends MongoRepository<JobExecution, Long> {

    /**
     * Gets last job execution recorded.
     *
     * @return {@link com.maeve.importer.domain.job.JobExecution}
     * @author Pelicer
     */
    JobExecution findTop1ByOrderByTimestampDesc();
}

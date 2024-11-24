package com.maeve.generator.domain.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.maeve.generator.domain.dataset.DatasetGeneration;

@Repository
public interface DatasetGenerationRepository extends MongoRepository<DatasetGeneration, Long> {
}

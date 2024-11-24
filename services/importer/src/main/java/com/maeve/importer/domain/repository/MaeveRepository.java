package com.maeve.importer.domain.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.maeve.importer.domain.logs.MaeveLog;

@Repository
public interface MaeveRepository extends MongoRepository<MaeveLog, Long> {
}

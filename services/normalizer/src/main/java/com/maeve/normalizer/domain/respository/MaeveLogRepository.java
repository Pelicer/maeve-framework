package com.maeve.normalizer.domain.respository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.maeve.normalizer.domain.logs.MaeveLog;

@Repository
public interface MaeveLogRepository extends MongoRepository<MaeveLog, Long> {
}

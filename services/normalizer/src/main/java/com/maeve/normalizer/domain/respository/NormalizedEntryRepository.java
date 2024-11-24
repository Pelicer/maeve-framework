package com.maeve.normalizer.domain.respository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.maeve.normalizer.domain.logs.NormalizedEntry;

@Repository
public interface NormalizedEntryRepository extends MongoRepository<NormalizedEntry, Long> {
}

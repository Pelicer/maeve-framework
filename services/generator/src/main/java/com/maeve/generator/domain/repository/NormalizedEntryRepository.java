package com.maeve.generator.domain.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.maeve.generator.domain.logs.NormalizedEntry;

@Repository
public interface NormalizedEntryRepository extends MongoRepository<NormalizedEntry, Long> {

    List<NormalizedEntry> findByNormalizationTimestampBetween(final LocalDateTime from, final LocalDateTime to);
}

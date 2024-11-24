package com.maeve.importer.infra.service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Objects;

import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.maeve.importer.infra.integration.mongodb.DatabaseSequence;

import lombok.AllArgsConstructor;

/**
 * Provides methods to surpass MongoDB's shortcomings.
 *
 * @author Pelicer
 */
@Service
@AllArgsConstructor
public class MongoDBService {

    private final MongoOperations mongoOperations;

    /**
     * Creates a Long ID for a given sequence.
     *
     * @param seqName name of the sequence to create the new ID into
     * @return new Long ID
     * @author Pelicer
     */
    public Long generateSequence(final String seqName) {
        final DatabaseSequence counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq", 1), options().returnNew(true).upsert(true),
                DatabaseSequence.class);
        return Objects.nonNull(counter) ? counter.getSeq() : 1L;
    }
}

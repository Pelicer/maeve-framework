package com.maeve.importer.domain.logs;

import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

import com.maeve.importer.infra.service.MongoDBService;

import lombok.AllArgsConstructor;

/**
 * Listener for the {@link com.maeve.importer.domain.logs.MaeveLog} to create a Long ID for each object, since MongoDB does not out-of-the-box has auto-generation
 * of unique Integer sequential IDs.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
public class MaeveLogModelListener extends AbstractMongoEventListener<MaeveLog> {

    private final MongoDBService mongoDBService;

    /**
     * Before converting a domain POJO to a document collection entry, this method will generate and set Integer sequential ID
     * for the {@link com.maeve.importer.domain.logs.MaeveLog}.
     *
     * @param event MongoDB save event for a {@link com.maeve.importer.domain.logs.MaeveLog} object
     * @author Pelicer
     */
    @Override
    public void onBeforeConvert(final BeforeConvertEvent<MaeveLog> event) {
        if(event.getSource().getId() == null || event.getSource().getId().compareTo(1L) < 0) {
            event.getSource().setId(mongoDBService.generateSequence(MaeveLog.SEQUENCE_NAME));
        }
    }
}

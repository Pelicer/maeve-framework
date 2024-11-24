package com.maeve.importer.infra.integration.mongodb;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

/**
 * Class that serves MongoDB as a collection that will store IDs for all other collections.
 *
 * @author Pelicer
 */
@Document(collection = "database_sequence")
@Getter
@Setter
public class DatabaseSequence {
    @Id
    private String id;
    private Integer seq;
}

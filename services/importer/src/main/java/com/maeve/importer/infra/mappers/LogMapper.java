package com.maeve.importer.infra.mappers;

import org.springframework.stereotype.Component;

import com.datadog.api.client.v2.model.LogAttributes;
import com.maeve.importer.domain.logs.MaeveLog;

/**
 * Provides methods to map {@link com.datadog.api.client.v2.model.Log} and {@link com.maeve.importer.domain.logs.MaeveLog}.
 *
 * @author Pelicer
 */
@Component
public class LogMapper {

    public MaeveLog toDomain(final LogAttributes attributes) {
        return new MaeveLog(attributes.getAttributes(), attributes.getHost(), attributes.getMessage(), attributes.getService(),
                attributes.getStatus(), attributes.getTags(), attributes.getTimestamp().toLocalDateTime());
    }

}

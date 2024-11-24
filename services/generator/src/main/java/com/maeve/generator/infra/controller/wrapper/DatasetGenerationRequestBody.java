package com.maeve.generator.infra.controller.wrapper;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * Communication POJO containing the fields necessary
 * to generate datasets from an incoming REST API request
 *
 * @author Pelicer
 */
@AllArgsConstructor
@Getter
@Setter
public class DatasetGenerationRequestBody {

    private LocalDateTime from;
    private LocalDateTime to;
}

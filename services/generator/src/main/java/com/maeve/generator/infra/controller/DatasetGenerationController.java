package com.maeve.generator.infra.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.maeve.generator.application.DatasetGenerationApplicationServices;
import com.maeve.generator.infra.controller.wrapper.DatasetGenerationRequestBody;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * REST Controller for the normalizer API, providing every endpoint
 * necessary to handle dataset generations.
 *
 * @author Pelicer
 */
@RestController
@RequestMapping("dataset/generation")
@AllArgsConstructor
@Slf4j
public class DatasetGenerationController {

    private DatasetGenerationApplicationServices datasetGenerationApplicationServices;

    /**
     * Triggers the creation of a dataset for the given date range
     *
     * @param requestBody the {@link com.maeve.generator.infra.controller.wrapper.DatasetGenerationRequestBody} to provide date range values
     * @return 201 HTTP status
     * @author Pelicer
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void generateDataset(@RequestBody DatasetGenerationRequestBody requestBody) {
        log.info("Dataset generation for {} to {} requested", requestBody.getFrom(), requestBody.getTo());
        datasetGenerationApplicationServices.generateDataset(requestBody);
    }
}

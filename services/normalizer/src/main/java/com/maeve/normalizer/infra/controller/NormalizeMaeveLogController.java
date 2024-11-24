package com.maeve.normalizer.infra.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.maeve.normalizer.application.NormalizerApplicationService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * REST Controller for the normalizer API, providing every endpoint
 * necessary to handle normalizations.
 *
 * @author Pelicer
 */
@RestController
@RequestMapping("normalize")
@AllArgsConstructor
@Slf4j
public class NormalizeMaeveLogController {

    private NormalizerApplicationService normalizerApplicationService;

    /**
     * Triggers normalization of the entry with the given ID and saves the normalized entry in the database.
     *
     * @param id the {@link java.lang.Long} id of the log to be normalized
     * @return 201 HTTP status
     * @author Pelicer
     */
    @PostMapping("/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public void normalizeMaeveLog(@PathVariable long id) {
        log.info("Normalization of log {} requested", id);
        normalizerApplicationService.normalizeEntry(id);
    }
}

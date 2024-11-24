package com.maeve.generator.application;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.maeve.generator.config.properties.FeaturesAndLabelProperties;
import com.maeve.generator.domain.dataset.DatasetGeneration;
import com.maeve.generator.domain.logs.NormalizedEntry;
import com.maeve.generator.domain.service.DatasetGenerationService;
import com.maeve.generator.domain.service.NormalizedEntryService;
import com.maeve.generator.infra.controller.wrapper.DatasetGenerationRequestBody;
import com.maeve.generator.infra.service.CsvWriterService;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

/**
 * Application service class, to connect infrastructure and domain.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
@Slf4j
public class DatasetGenerationApplicationServices {

    private final NormalizedEntryService normalizedEntryService;
    private final DatasetGenerationService datasetGenerationService;
    private ObjectMapper objectMapper;
    private FeaturesAndLabelProperties properties;

    /**
     * Given a request body, generates a dataset for the given date range, and
     * saves it into a CSV file. The dataset will contain the features and label
     * configured in its properties.
     *
     * @param requestBody the {@link com.maeve.generator.infra.controller.wrapper.DatasetGenerationRequestBody} to provide date range values
     * @author Pelicer
     */
    @SneakyThrows
    public void generateDataset(final DatasetGenerationRequestBody requestBody) {
        final List<NormalizedEntry> entries = normalizedEntryService.findByNormalizationTimestampBetween(requestBody.getFrom(), requestBody.getTo());
        log.info("Found {} entries for the given range", entries.size());
        final List<String> headers = new ArrayList<>(new HashSet<>(entries.stream().map(this::extractHeaders).flatMap(Collection::stream)
                .collect(Collectors.toList())));
        final List<String[]> lines = entries.stream().map(e -> extractLines(e, headers)).collect(Collectors.toList());
        lines.add(0, headers.stream().toArray(String[]::new));
        log.info("The CSV will contain {} lines of data", lines.size());
        CsvWriterService.writeAllLines(lines);
        datasetGenerationService.saveDatasetGeneration(new DatasetGeneration(LocalDateTime.now()));
        log.info("Dataset successfully generated");
    }

    /**
     * Will extract the field names of the normalized logs, for them to be later used as the headers
     * of the CSV file
     *
     * @param entry the {@link com.maeve.generator.domain.logs.NormalizedEntry} from which the headers will be extracted
     * @return A list of strings containing all headers
     * @author Pelicer
     */
    @SneakyThrows
    private List<String> extractHeaders(final NormalizedEntry entry) {
        log.info("Collecting headers");
        final List<String> keys = new ArrayList<>();
        final JsonNode node = objectMapper.readTree(entry.getJsonNormalizedData());
        node.fieldNames().forEachRemaining(e -> {
            if(properties.getFeatures().contains(e) || properties.getLabel() == e) {
                keys.add(e);
            }
        });
        return keys;
    }

    /**
     * Will extract the field names of the normalized logs, for them to be later used as the headers
     * of the CSV file
     *
     * @param entry the {@link com.maeve.generator.domain.logs.NormalizedEntry} from which the lines will be extracted
     * @param headers a list of string that will be the headers of the file, and also the key to extract the values from the {@link com.maeve.generator.domain.logs.NormalizedEntry}
     * @return A list of strings containing all headers
     * @author Pelicer
     */
    @SneakyThrows
    private String[] extractLines(final NormalizedEntry entry, final List<String> headers) {
        log.info("Collecting lines");
        final JsonNode node = objectMapper.readTree(entry.getJsonNormalizedData());
        return headers.stream().filter(h -> properties.getFeatures().contains(h) || h.equals(properties.getLabel())).map(h -> node.get(h).asText())
                .toArray(String[]::new);
    }
}

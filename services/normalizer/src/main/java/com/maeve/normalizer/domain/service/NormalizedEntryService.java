package com.maeve.normalizer.domain.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.NullNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.maeve.normalizer.config.properties.NormalizerProperties;
import com.maeve.normalizer.domain.logs.MaeveLog;
import com.maeve.normalizer.domain.logs.NormalizedEntry;
import com.maeve.normalizer.domain.normalization.factory.NormalizerFactory;
import com.maeve.normalizer.domain.normalization.normalizers.INormalizer;
import com.maeve.normalizer.domain.respository.NormalizedEntryRepository;

import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

/**
 * Provides methods for the application to handle {@link com.maeve.normalizer.domain.logs.NormalizedEntry}
 * class business logic.
 *
 * @author Pelicer
 */
@Component
@AllArgsConstructor
@Slf4j
public class NormalizedEntryService {

    private NormalizedEntryRepository normalizedEntryRepository;
    private ObjectMapper objectMapper;

    public void saveNormalizedEntry(final NormalizedEntry normalizedEntry) {
        normalizedEntryRepository.save(normalizedEntry);
    }

    /**
     * Extract fields from the log matched by the provided ID and saves a {@link com.maeve.normalizer.domain.logs.NormalizedEntry} in the database
     *
     * @param fields the fields that need to be extracted from the original log
     * @param maeveLog the original log from which the fields will be extracted
     * @return String value of the fields after field extraction
     * @author Pelicer
     */
    public String extractFields(final Map<String, NormalizerProperties.FieldProperties> fields, final MaeveLog maeveLog) {
        try {
            final String jsonMaeveLog = objectMapper.writeValueAsString(maeveLog);
            final JsonNode node = objectMapper.readTree(jsonMaeveLog);
            final Map<String, JsonNode> fieldsNodes = new HashMap<>();

            log.info("Initializing field extraction");
            final List<Map.Entry<String, NormalizerProperties.FieldProperties>> flatFields = fields.entrySet().stream()
                    .filter(e -> e.getValue().getSource().indexOf(".") == -1)
                    .collect(Collectors.toList());

            final List<Map.Entry<String, NormalizerProperties.FieldProperties>> nestedFields = fields.entrySet().stream()
                    .filter(e -> e.getValue().getSource().indexOf(".") != -1)
                    .collect(Collectors.toList());

            fieldsNodes.putAll(extractFlatFields(flatFields, node));
            fieldsNodes.putAll(extractNestedFields(nestedFields, node));

            log.info("Normalization finished");
            return objectMapper.writeValueAsString(fieldsNodes);
        }
        catch(final JsonProcessingException e) {
            throw new com.maeve.normalizer.application.exceptions.JsonProcessingException(maeveLog.getId(), fields.toString());
        }
    }

    /**
     * Extract "flat fields", e.g., not nested values from the JsonNode
     *
     * @param flatFields the list of map entries containing the desired output field name and the source field path
     * @param maeveLogNode the original log (in JsonNode format) from which the fields will be extracted
     * @return Map of the extracted fields with the desired output field names
     * @author Pelicer
     */
    private Map<String, JsonNode> extractFlatFields(
            final List<Map.Entry<String, NormalizerProperties.FieldProperties>> flatFields,
            final JsonNode maeveLogNode) {
        log.info("Extracting flat fields");
        final Map<String, JsonNode> flatNodes = new HashMap<>();
        for(final Map.Entry<String, NormalizerProperties.FieldProperties> entry : flatFields) {
            final String outputFieldName = entry.getKey();
            final String sourceField = entry.getValue().getSource();
            log.debug("Extracting flat field '{}' from source '{}'", outputFieldName, sourceField);
            JsonNode valueNode = maeveLogNode.get(sourceField);
            if(valueNode != null) {
                flatNodes.put(outputFieldName, valueNode);
            }
            else {
                log.warn("Source field '{}' not found in the log", sourceField);
                flatNodes.put(outputFieldName, NullNode.instance);
            }
        }
        return flatNodes;
    }

    /**
     * Extract nested fields from the JsonNode
     *
     * @param nestedFields the list of map entries containing the desired output field name and the source nested field path
     * @param maeveLogNode the original log (in JsonNode format) from which the fields will be extracted
     * @return Map of the extracted nested fields with the desired output field names
     * @author Pelicer
     */
    private Map<String, JsonNode> extractNestedFields(
            final List<Map.Entry<String, NormalizerProperties.FieldProperties>> nestedFields,
            final JsonNode maeveLogNode) {
        log.info("Extracting nested fields");
        final Map<String, JsonNode> nestedNodes = new HashMap<>();
        for(final Map.Entry<String, NormalizerProperties.FieldProperties> entry : nestedFields) {
            final String outputFieldName = entry.getKey();
            final String sourceFieldPath = entry.getValue().getSource();
            log.debug("Beginning recursive extraction of nested field '{}' from source '{}'", outputFieldName, sourceFieldPath);
            final JsonNode extractedNode = extractNestedField(sourceFieldPath, maeveLogNode);
            if(extractedNode != null) {
                nestedNodes.put(outputFieldName, extractedNode);
            }
            else {
                log.warn("Source nested field '{}' not found in the log", sourceFieldPath);
                nestedNodes.put(outputFieldName, NullNode.instance);
            }
        }
        return nestedNodes;
    }

    /**
     * Recursively finds the value of the nested field
     *
     * @param fieldPath nested field path whose value needs to be found and extracted
     * @param node node in which the method will search for the nested value
     * @return JsonNode of the nested field, or null if not found
     * @author Pelicer
     */
    private JsonNode extractNestedField(final String fieldPath, final JsonNode node) {
        final String[] splitNestedFields = fieldPath.split("\\.");
        log.debug("Extracting nested field path: {}", (Object)splitNestedFields);
        JsonNode currentNode = node;
        for(String field : splitNestedFields) {
            if(currentNode == null) {
                return null;
            }
            currentNode = currentNode.get(field);
        }
        return currentNode;
    }

    /**
     * Applies the normalization rules for each of the fields
     *
     * @param factory the factory responsible for creating the normalization rules
     * @param jsonString text to be normalized
     * @return String normalized input value
     * @author Pelicer
     */
    @SneakyThrows
    public String applyNormalizations(final NormalizerFactory factory, String jsonString) {
        final ObjectMapper objectMapper = new ObjectMapper();
        final List<INormalizer> normalizers = factory.getNormalizers();
        final JsonNode rootNode = objectMapper.readTree(jsonString);

        if(rootNode.isObject()) {
            final ObjectNode objectNode = (ObjectNode)rootNode;
            final Iterator<Map.Entry<String, JsonNode>> fields = objectNode.fields();

            while (fields.hasNext()) {
                final Map.Entry<String, JsonNode> field = fields.next();
                String value = field.getValue().asText();

                for(INormalizer normalizer : normalizers) {
                    value = normalizer.normalize(value);
                }
                objectNode.put(field.getKey(), value);
            }

            return objectMapper.writeValueAsString(objectNode);
        }
        else {
            return jsonString;
        }
    }
}

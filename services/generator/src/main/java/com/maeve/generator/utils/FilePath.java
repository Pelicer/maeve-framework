package com.maeve.generator.utils;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import lombok.extern.slf4j.Slf4j;

/**
 * Provides useful methods for handling system paths.
 *
 * @author Pelicer
 */
@Slf4j
public class FilePath {

    /**
     * Retrieves a String containing a path for the local resources folder, a unique
     * name and extension for saving CSV files
     *
     * @return String of the path to save the CSV file
     * @author Pelicer
     */
    public static String generateFilePath() {
        final Path resourceDirectory = Paths.get("src", "main", "resources");
        final String absolutePath = resourceDirectory.toFile().getAbsolutePath();
        final String filePath = absolutePath.concat("/datasets/" + UUID.randomUUID() + ".csv");
        log.info("Dataset will be saved to {}", filePath);
        return filePath;
    }

}

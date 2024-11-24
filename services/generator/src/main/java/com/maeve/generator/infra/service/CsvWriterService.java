package com.maeve.generator.infra.service;

import java.io.FileWriter;
import java.util.List;

import com.maeve.generator.utils.FilePath;
import com.opencsv.CSVWriter;

import lombok.SneakyThrows;

/**
 * Provides CSV handling capabilities to the application.
 *
 * @author Pelicer
 */
public class CsvWriterService {

    /**
     * Writes the given lines of String into a CSV file
     *
     * @param lines the list of Strings to be written and saved into a CSV file
     * @author Pelicer
     */
    @SneakyThrows
    public static void writeAllLines(final List<String[]> lines) {
        try(final CSVWriter writer = new CSVWriter(new FileWriter(FilePath.generateFilePath()))) {
            writer.writeAll(lines);
        }
    }
}

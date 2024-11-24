package com.maeve.normalizer.domain.normalization.normalizers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import lombok.extern.slf4j.Slf4j;

/**
 * Implementation of the {@link com.maeve.normalizer.domain.normalization.normalizers.INormalizer} that
 * normalizes date times.
 *
 * @author Pelicer
 */
@Slf4j
public class DateTimeNormalizer implements INormalizer {

    /**
     * Normalizes the input string date into the format "MM/dd/yyyy h:mm:ss a".
     *
     * @param input the string representing a date
     * @return the normalized date string in "MM/dd/yyyy h:mm:ss a" format,
     * or null if the input is null or invalid
     */
    @Override
    public String normalize(final String input) {
        if(input == null || input.isEmpty()) {
            return null;
        }
        final SimpleDateFormat targetFormat = new SimpleDateFormat("MM/dd/yyyy h:mm:ss a");

        try {
            final SimpleDateFormat sourceFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            final Date date = sourceFormat.parse(input);
            return targetFormat.format(date);
        }
        catch(ParseException e) {
            log.info("Date time normalization rule failed for input {}. The string is not in a parsable format, and therefore will remain the same", input);
            return input;
        }
    }
}
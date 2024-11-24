package com.maeve.importer.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Provides useful methods for handling Date and Time data.
 *
 * @author Pelicer
 */
public class DateUtils {

    /**
     * Adds the provided amount of time to a LocalDateTime value and returns the outcome formatted in a String ISO8601 format.
     *
     * @param dateTime the {@link java.time.LocalDateTime} to be formatted
     * @param hoursToAdd the amount of hours ({@link java.lang.Long}) to be added to the provided {@link java.time.LocalDateTime} to be formatted
     * @return string of the given {@link java.time.LocalDateTime}, plus the added hours, in ISO8601 format
     * @author Pelicer
     */
    public static String addHoursAndSetFormatToISO8601(final LocalDateTime dateTime, final Long hoursToAdd) {
        // This methods is adding 4 hours to handle the timezone different between São Paulo and datadog.eu
        return dateTime.plusHours(hoursToAdd).format(DateTimeFormatter.ISO_DATE_TIME).concat("+01:00");
    }
}

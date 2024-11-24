package com.maeve.normalizer.domain.normalization.normalizers;

/**
 * Implementation of the {@link com.maeve.normalizer.domain.normalization.normalizers.INormalizer} that
 * normalizes spaces in strings by trimming leading and trailing spaces.
 *
 * @author Pelicer
 */
public class TrimNormalizer implements INormalizer {

    /**
     * Normalizes the input string by trimming leading and trailing spaces.
     *
     * @param input the string to normalize
     * @return the trimmed string, or null if the input is null
     */
    @Override
    public String normalize(final String input) {
        if(input == null) {
            return null;
        }
        return input.trim();
    }
}
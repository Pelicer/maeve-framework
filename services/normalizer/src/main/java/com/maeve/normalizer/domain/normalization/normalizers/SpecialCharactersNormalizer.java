package com.maeve.normalizer.domain.normalization.normalizers;


/**
 * Implementation of the {@link com.maeve.normalizer.domain.normalization.normalizers.INormalizer} that
 * normalizes the string by getting rid of special characters.
 *
 * @author Pelicer
 */
public class SpecialCharactersNormalizer implements INormalizer {

    /**
     * Normalizes the input string by removing all special characters.
     *
     * @param input the string to normalize
     * @return the string with special characters removed, or null if the input is null
     */
    @Override
    public String normalize(final String input) {
        if (input == null) {
            return null;
        }
        return input.replaceAll("[^a-zA-Z0-9\\s]", "");
    }
}
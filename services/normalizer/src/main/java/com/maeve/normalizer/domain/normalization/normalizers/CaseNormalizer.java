package com.maeve.normalizer.domain.normalization.normalizers;

/**
 * Implementation of the {@link com.maeve.normalizer.domain.normalization.normalizers.INormalizer} that
 * normalizes string cases (e.g. lower case, upper case, snake case, etc.)
 *
 * @author Pelicer
 */
public class CaseNormalizer implements INormalizer {

    /**
     * Normalizes the input string by converting it to lowercase.
     *
     * @param input the string to normalize
     * @return the input string in lowercase, or null if the input is null
     */
    @Override
    public String normalize(final String input) {
        if(input == null) {
            return null;
        }
        return input.toLowerCase();
    }
}

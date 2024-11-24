package com.maeve.normalizer.domain.normalization.normalizers;


/**
 * Interface of a normalization rule, which contains a single method that will run
 * a String treatment and return the original value, treated.
 *
 * @author Pelicer
 */
public interface INormalizer {
    String normalize(final String input);
}

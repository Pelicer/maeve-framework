package com.maeve.normalizer.domain.normalization.factory;

import java.util.List;

import com.maeve.normalizer.domain.normalization.normalizers.INormalizer;

/**
 * Interface for the abstract factory pattern that allows multiple normalization rules.
 *
 * @author Pelicer
 */
public interface INormalizerFactory {

    List<INormalizer> getNormalizers();
}

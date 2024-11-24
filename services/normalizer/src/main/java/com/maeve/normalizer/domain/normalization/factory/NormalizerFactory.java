package com.maeve.normalizer.domain.normalization.factory;

import java.util.ArrayList;
import java.util.List;

import com.maeve.normalizer.domain.normalization.normalizers.CaseNormalizer;
import com.maeve.normalizer.domain.normalization.normalizers.INormalizer;
import com.maeve.normalizer.domain.normalization.normalizers.SpecialCharactersNormalizer;
import com.maeve.normalizer.domain.normalization.normalizers.TrimNormalizer;

/**
 * Implementation of the {@link com.maeve.normalizer.domain.normalization.factory.INormalizerFactory} that
 * retrieves list of concrete normalizers.
 *
 * @author Pelicer
 */
public class NormalizerFactory implements INormalizerFactory {
    @Override public List<INormalizer> getNormalizers() {
        final List<INormalizer> normalizers = new ArrayList<>();
        normalizers.add(new TrimNormalizer());
        normalizers.add(new CaseNormalizer());
        normalizers.add(new SpecialCharactersNormalizer());
        return normalizers;
    }
}

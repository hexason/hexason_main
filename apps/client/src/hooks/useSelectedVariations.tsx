import { useState } from "react";

type Variation = {
  configId: string;
  valueId: string;
};

export const useSelectedVariations = (initialSelect?: Variation[]) => {
  const [selectedVariations, setSelectedVariations] = useState<Variation[]>(initialSelect || []);

  const handleVariationSelect = (variation: Variation) => {
    setSelectedVariations(prevVariations => {
      const filteredVariations = prevVariations.filter(v => v.configId !== variation.configId);
      return [...filteredVariations, variation];
    });
  };

  return { selectedVariations, handleVariationSelect };
};
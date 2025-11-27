import type { ProductCard } from '@/types/ProductCard';
import type { ProductFilters } from '@/types/ProductFilters';
import { extractMatrixType } from './filterUtils';

export const getAvailableFilterOptions = (
  allProducts: ProductCard[],
  category: string,
  currentFilters: ProductFilters,
): {
  availableRam: string[];
  availableCapacity: string[];
  availableColor: string[];
  availableSize: string[];
  availableMatrixType: string[];
} => {
  const filteredProducts = allProducts.filter((p) => p.category === category);

  const availableRam = new Set<string>();
  const availableCapacity = new Set<string>();
  const availableColor = new Set<string>();
  const availableSize = new Set<string>();
  const availableMatrixType = new Set<string>();

  filteredProducts.forEach((product) => {
    let matches = true;

    if (currentFilters.capacity.length > 0) {
      if (!currentFilters.capacity.includes(product.capacity)) {
        matches = false;
      }
    }

    if (currentFilters.ram.length > 0) {
      if (!currentFilters.ram.includes(product.ram)) {
        matches = false;
      }
    }

    if (currentFilters.matrixType.length > 0) {
      const productMatrixType = extractMatrixType(product.screen);
      if (!currentFilters.matrixType.includes(productMatrixType)) {
        matches = false;
      }
    }

    if (currentFilters.size.length > 0 && product.category === 'accessories') {
      if (!currentFilters.size.includes(product.capacity)) {
        matches = false;
      }
    }

    if (currentFilters.priceRange) {
      const price = product.price || product.fullPrice;
      if (
        price < currentFilters.priceRange[0] ||
        price > currentFilters.priceRange[1]
      ) {
        matches = false;
      }
    }

    if (matches) {
      if (product.ram) availableRam.add(product.ram);
      if (product.capacity) {
        if (product.category === 'accessories') {
          availableSize.add(product.capacity);
        } else {
          availableCapacity.add(product.capacity);
        }
      }
      if (product.color) availableColor.add(product.color);
      const matrixType = extractMatrixType(product.screen);
      if (matrixType) availableMatrixType.add(matrixType);
    }
  });

  return {
    availableRam: Array.from(availableRam).sort(),
    availableCapacity: Array.from(availableCapacity).sort(),
    availableColor: Array.from(availableColor).sort(),
    availableSize: Array.from(availableSize).sort(),
    availableMatrixType: Array.from(availableMatrixType).sort(),
  };
};

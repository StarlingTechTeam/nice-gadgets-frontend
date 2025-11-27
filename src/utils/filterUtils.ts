import type { ProductCard } from '@/types/ProductCard';
import type { FilterOptions } from '@/types/ProductFilters';

export const extractMatrixType = (screen: string): string => {
  const match = screen.match(/(LTPO OLED|Liquid Retina|Retina|OLED|IPS|LCD)/i);
  return match ? match[1] : '';
};

export const getFilterOptions = (
  products: ProductCard[],
  category?: string,
): FilterOptions => {
  const filteredProducts =
    category ? products.filter((p) => p.category === category) : products;

  const rams = new Set<string>();
  const capacities = new Set<string>();
  const colors = new Set<string>();
  const sizes = new Set<string>();
  const matrixTypes = new Set<string>();
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  filteredProducts.forEach((product) => {
    if (product.ram) rams.add(product.ram);
    if (product.capacity) capacities.add(product.capacity);
    if (product.color) colors.add(product.color);

    if (product.category === 'accessories' && product.capacity) {
      sizes.add(product.capacity);
    }

    const matrixType = extractMatrixType(product.screen);
    if (matrixType) {
      matrixTypes.add(matrixType);
    }

    const price = product.price || product.fullPrice;
    if (price < minPrice) minPrice = price;
    if (price > maxPrice) maxPrice = price;
  });

  // Sort capacity numerically in ascending order
  // Convert all to GB for proper comparison (1TB = 1024GB)
  const sortedCapacities = Array.from(capacities).sort((a, b) => {
    const convertToGB = (capacity: string): number => {
      const num = parseInt(capacity.replace(/\D/g, ''), 10) || 0;
      const unit = capacity.toUpperCase();
      if (unit.includes('TB')) {
        return num * 1024; // Convert TB to GB
      }
      return num; // Already in GB
    };

    const gbA = convertToGB(a);
    const gbB = convertToGB(b);
    return gbA - gbB;
  });

  return {
    ram: Array.from(rams).sort(),
    capacity: sortedCapacities,
    color: Array.from(colors).sort(),
    size: Array.from(sizes).sort(),
    matrixType: Array.from(matrixTypes).sort(),
    priceRange: [
      minPrice === Infinity ? 0 : minPrice,
      maxPrice === -Infinity ? 0 : maxPrice,
    ],
  };
};

export const applyFilters = (
  products: ProductCard[],
  filters: {
    ram?: string[];
    capacity?: string[];
    color?: string[];
    size?: string[];
    matrixType?: string[];
    priceRange?: [number, number];
  },
): ProductCard[] => {
  return products.filter((product) => {
    if (filters.ram && filters.ram.length > 0) {
      if (!filters.ram.includes(product.ram)) return false;
    }

    if (filters.capacity && filters.capacity.length > 0) {
      if (!filters.capacity.includes(product.capacity)) return false;
    }

    if (filters.color && filters.color.length > 0) {
      if (!filters.color.includes(product.color)) return false;
    }

    if (filters.size && filters.size.length > 0) {
      if (product.category === 'accessories') {
        if (!filters.size.includes(product.capacity)) return false;
      }
    }

    if (filters.matrixType && filters.matrixType.length > 0) {
      const productMatrixType = extractMatrixType(product.screen);
      if (!filters.matrixType.includes(productMatrixType)) return false;
    }

    if (filters.priceRange) {
      const price = product.price || product.fullPrice;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }
    }

    return true;
  });
};

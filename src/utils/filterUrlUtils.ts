import type { ProductFilters } from '@/types/ProductFilters';

const RAM_KEY = 'ram';
const CAPACITY_KEY = 'capacity';
const COLOR_KEY = 'color';
const SIZE_KEY = 'size';
const MATRIX_TYPE_KEY = 'matrixType';
const PRICE_MIN_KEY = 'priceMin';
const PRICE_MAX_KEY = 'priceMax';

export const filtersToUrlParams = (
  filters: ProductFilters,
  defaultPriceRange: [number, number],
): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.ram.length > 0) {
    params.set(RAM_KEY, filters.ram.join(','));
  }
  if (filters.capacity.length > 0) {
    params.set(CAPACITY_KEY, filters.capacity.join(','));
  }
  if (filters.color.length > 0) {
    params.set(COLOR_KEY, filters.color.join(','));
  }
  if (filters.size.length > 0) {
    params.set(SIZE_KEY, filters.size.join(','));
  }
  if (filters.matrixType.length > 0) {
    params.set(MATRIX_TYPE_KEY, filters.matrixType.join(','));
  }

  if (
    filters.priceRange[0] !== defaultPriceRange[0] ||
    filters.priceRange[1] !== defaultPriceRange[1]
  ) {
    params.set(PRICE_MIN_KEY, filters.priceRange[0].toString());
    params.set(PRICE_MAX_KEY, filters.priceRange[1].toString());
  }

  return params;
};

export const urlParamsToFilters = (
  searchParams: URLSearchParams,
  defaultPriceRange: [number, number],
): ProductFilters => {
  const ram = searchParams.get(RAM_KEY)?.split(',').filter(Boolean) || [];
  const capacity =
    searchParams.get(CAPACITY_KEY)?.split(',').filter(Boolean) || [];
  const color = searchParams.get(COLOR_KEY)?.split(',').filter(Boolean) || [];
  const size = searchParams.get(SIZE_KEY)?.split(',').filter(Boolean) || [];
  const matrixType =
    searchParams.get(MATRIX_TYPE_KEY)?.split(',').filter(Boolean) || [];

  const priceMin = searchParams.get(PRICE_MIN_KEY);
  const priceMax = searchParams.get(PRICE_MAX_KEY);
  const priceRange: [number, number] =
    priceMin && priceMax ?
      [Number(priceMin), Number(priceMax)]
    : defaultPriceRange;

  return {
    ram,
    capacity,
    color,
    size,
    matrixType,
    priceRange,
  };
};

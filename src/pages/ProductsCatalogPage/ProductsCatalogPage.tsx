import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductsCatalogTemplate from '@templates/ProductsCatalogTemplate';
import { products } from '@/shared/api/products';
import { DEFAULT_SORT, type SortOption } from '@molecules/SortingBar';
import type { ProductCard } from '@/types/ProductCard';
import type { ProductFilters, FilterOptions } from '@/types/ProductFilters';
import { getFilterOptions } from '@/utils/filterUtils';
import { urlParamsToFilters, filtersToUrlParams } from '@/utils/filterUrlUtils';

const SORT_QUERY_KEY = 'sort';
const PAGE_QUERY_KEY = 'page';
const ITEMS_PER_PAGE = 24;

const SORT_PARAM_BY_OPTION: Record<SortOption, string> = {
  'Newest': 'newest',
  'Oldest': 'oldest',
  'Price low to high': 'price-low',
  'Price high to low': 'price-high',
};

const getSortFromParam = (param: string | null): SortOption => {
  const match = (Object.keys(SORT_PARAM_BY_OPTION) as SortOption[]).find(
    (option) => SORT_PARAM_BY_OPTION[option] === param,
  );
  return match ?? DEFAULT_SORT;
};

const getParamFromSort = (option: SortOption) => SORT_PARAM_BY_OPTION[option];

const getSortHandler = (sort: SortOption) => {
  switch (sort) {
    case 'Newest':
      return (a: ProductCard, b: ProductCard) => b.year - a.year;
    case 'Oldest':
      return (a: ProductCard, b: ProductCard) => a.year - b.year;
    case 'Price low to high':
      return (a: ProductCard, b: ProductCard) => a.price - b.price;
    case 'Price high to low':
      return (a: ProductCard, b: ProductCard) => b.price - a.price;
    default:
      return undefined;
  }
};

const ProductsCatalogPage = () => {
  const { categoryType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get(PAGE_QUERY_KEY)) || 1;
  const sortParam = searchParams.get(SORT_QUERY_KEY);
  const sortValue = getSortFromParam(sortParam);

  const [list, setList] = useState<ProductCard[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductCard[]>([]);

  useEffect(() => {
    products.getAll().then(setAllProducts);
  }, []);

  const filterOptions = useMemo<FilterOptions>(() => {
    if (allProducts.length === 0) {
      return {
        ram: [],
        capacity: [],
        color: [],
        size: [],
        matrixType: [],
        priceRange: [0, 0],
      };
    }
    return getFilterOptions(allProducts, categoryType);
  }, [allProducts, categoryType]);

  const filters = useMemo<ProductFilters>(() => {
    const defaultPriceRange: [number, number] =
      filterOptions.priceRange[0] !== 0 && filterOptions.priceRange[1] !== 0 ?
        filterOptions.priceRange
      : [0, 0];
    return urlParamsToFilters(searchParams, defaultPriceRange);
  }, [searchParams, filterOptions.priceRange]);

  useEffect(() => {
    if (!sortParam) {
      const next = new URLSearchParams(searchParams);
      next.set(SORT_QUERY_KEY, getParamFromSort(sortValue));
      setSearchParams(next, { replace: true });
    }
  }, [sortParam, sortValue, searchParams, setSearchParams]);

  useEffect(() => {
    if (!categoryType) return;

    setLoading(true);

    products
      .getByQuantity(
        currentPage,
        ITEMS_PER_PAGE,
        categoryType,
        getSortHandler(sortValue),
        filters,
      )
      .then(({ items, total }) => {
        setList(items);
        setTotalCount(total);
      })
      .finally(() => setLoading(false));
  }, [categoryType, currentPage, sortValue, filters]);

  const handleSortChange = (value: SortOption) => {
    const next = new URLSearchParams(searchParams);
    next.set(SORT_QUERY_KEY, getParamFromSort(value));
    next.set(PAGE_QUERY_KEY, '1');
    setSearchParams(next);
  };

  const handlePageChange = (page: number) => {
    const next = new URLSearchParams(searchParams);
    next.set(PAGE_QUERY_KEY, page.toString());
    setSearchParams(next);
  };

  const handleFiltersChange = (newFilters: ProductFilters) => {
    const next = new URLSearchParams(searchParams);
    next.set(PAGE_QUERY_KEY, '1');

    next.delete('ram');
    next.delete('capacity');
    next.delete('color');
    next.delete('size');
    next.delete('matrixType');
    next.delete('priceMin');
    next.delete('priceMax');

    const filterParams = filtersToUrlParams(
      newFilters,
      filterOptions.priceRange,
    );
    filterParams.forEach((value, key) => {
      next.set(key, value);
    });

    setSearchParams(next);
  };

  return (
    <ProductsCatalogTemplate
      products={list}
      totalCount={totalCount}
      category={categoryType!}
      sortValue={sortValue}
      onSortChange={handleSortChange}
      loading={loading}
      currentPage={currentPage}
      totalPages={Math.ceil(totalCount / ITEMS_PER_PAGE)}
      onPageChange={handlePageChange}
      filters={filters}
      filterOptions={filterOptions}
      onFiltersChange={handleFiltersChange}
      allProducts={allProducts}
    />
  );
};

export default ProductsCatalogPage;

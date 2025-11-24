import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import ProductsCatalogTemplate from '@templates/ProductsCatalogTemplate';
import { products } from '@/shared/api/products';
import { DEFAULT_SORT, type SortOption } from '@molecules/FiltersBar';
import type { ProductCard } from '@/types/ProductCard ';

const sortProducts = (list: ProductCard[], sortOrder: SortOption) => {
  const sorted = [...list];

  switch (sortOrder) {
    case 'Newest':
      return sorted.sort((a, b) => b.year - a.year);
    case 'Oldest':
      return sorted.sort((a, b) => a.year - b.year);
    case 'Price low to high':
      return sorted.sort((a, b) => a.price - b.price);
    case 'Price high to low':
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
};

const SORT_QUERY_KEY = 'sort';

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

const ProductsCatalogPage = () => {
  const { categoryType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryType) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    products
      .getAll()
      .then((data) => {
        const filtered = data.filter((item) => item.category === categoryType);

        setItems(filtered);
      })
      .finally(() => setLoading(false));
  }, [categoryType]);

  const sortParam = searchParams.get(SORT_QUERY_KEY);
  const sortValue = getSortFromParam(sortParam);

  useEffect(() => {
    if (sortParam && sortParam === getParamFromSort(sortValue)) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set(SORT_QUERY_KEY, getParamFromSort(sortValue));
    setSearchParams(nextParams, { replace: !sortParam });
  }, [searchParams, setSearchParams, sortParam, sortValue]);

  const handleSortChange = (value: SortOption) => {
    if (value === sortValue) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set(SORT_QUERY_KEY, getParamFromSort(value));
    setSearchParams(nextParams);
  };

  const sortedItems = useMemo(
    () => sortProducts(items, sortValue),
    [items, sortValue],
  );

  if (!items.length && !loading) {
    return <h1>Not Found</h1>;
  }

  return (
    <ProductsCatalogTemplate
      products={sortedItems}
      category={categoryType!}
      sortValue={sortValue}
      onSortChange={handleSortChange}
      loading={loading}
    />
  );
};

export default ProductsCatalogPage;

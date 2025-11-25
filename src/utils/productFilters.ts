import type { ProductCard as ProductCardType } from '@/types/ProductCard ';

export const selectHotPriceProducts = (products: ProductCardType[]) => {
  return products
    .filter((product) => product.fullPrice > product.price)
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    });
};

export const selectNewModels = (products: ProductCardType[]) => {
  return products
    .filter((product) => product.year >= 2022)
    .sort((a, b) => b.price - a.price);
};

export const selectRecommendedProducts = (
  allProducts: ProductCardType[],
  currentCategory: string,
  currentId: string,
) => {
  return allProducts.filter((product) => {
    return product.category === currentCategory && product.itemId !== currentId;
  });
};

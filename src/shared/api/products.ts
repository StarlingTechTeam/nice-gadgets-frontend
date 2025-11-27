import productsData from '@/shared/api/data/products.json';
import type { ProductCard } from '@/types/ProductCard';
import { applyFilters } from '@/utils/filterUtils';
import type { ProductFilters } from '@/types/ProductFilters';

const getModelBaseId = (itemId: string): string => {
  return itemId
    .replace(/-\d+(gb|tb)/i, '')
    .replace(/-\d+mm/i, '')
    .replace(/-[a-z]+(-[a-z]+)?$/, '');
};

const normalizeProduct = (product: ProductCard): ProductCard => ({
  ...product,
  id: Number(product.id),
});

export const products = {
  getAll: async (): Promise<ProductCard[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          productsData.map((item) => ({
            ...item,
            image: import.meta.env.BASE_URL + item.image,
          })) as ProductCard[],
        );
      }, 300);
    });
  },

  getByQuantity: async (
    page: number,
    limit: number,
    category?: string,
    sort?: (a: ProductCard, b: ProductCard) => number,
    filters?: Partial<ProductFilters>,
  ): Promise<{ items: ProductCard[]; total: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = (productsData as ProductCard[]).map(normalizeProduct);

        if (category) {
          list = list.filter((item) => item.category === category);
        }

        if (filters) {
          list = applyFilters(list, filters);
        }

        if (sort) {
          list.sort(sort);
        }

        const total = list.length;
        const start = (page - 1) * limit;
        const items = list.slice(start, start + limit);

        resolve({ items, total });
      }, 300);
    });
  },

  getLimitedData: (quantity: number): Promise<ProductCard[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          productsData.slice(0, quantity).map((item) => ({
            ...item,
            image: import.meta.env.BASE_URL + item.image,
          })) as ProductCard[],
        );
      }, 300);
    });
  },

  getHotDeals: async (limit: number = 12): Promise<ProductCard[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hotDeals = (productsData as ProductCard[])
          .map(normalizeProduct)
          .filter((product) => product.fullPrice > product.price)
          .sort((a, b) => {
            const discountA = a.fullPrice - a.price;
            const discountB = b.fullPrice - b.price;
            return discountB - discountA;
          });

        resolve(
          hotDeals.slice(0, limit).map((item) => ({
            ...item,
            image: import.meta.env.BASE_URL + item.image,
          })) as ProductCard[],
        );
      }, 300);
    });
  },

  getNewArrivals: async (limit: number = 12): Promise<ProductCard[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const selectUniqueByCategory = (category: string, count: number) => {
          const candidates = (productsData as ProductCard[])
            .map(normalizeProduct)
            .filter((p) => p.category === category)
            .sort((a, b) => b.year - a.year || b.price - a.price);

          const uniqueItems: ProductCard[] = [];
          const seenModels = new Set<string>();

          for (const item of candidates) {
            const baseModelId = getModelBaseId(item.itemId);
            if (!seenModels.has(baseModelId)) {
              uniqueItems.push(item);
              seenModels.add(baseModelId);
            }
            if (uniqueItems.length === count) break;
          }

          return uniqueItems;
        };

        const perCategory = Math.ceil(limit / 3);

        const uniquePhones = selectUniqueByCategory('phones', perCategory);
        const uniqueTablets = selectUniqueByCategory('tablets', perCategory);
        const uniqueAccessories = selectUniqueByCategory(
          'accessories',
          perCategory,
        );

        const result = [
          ...uniquePhones,
          ...uniqueTablets,
          ...uniqueAccessories,
        ];
        result.sort(() => Math.random() - 0.5);

        resolve(
          result.map((item) => ({
            ...item,
            image: import.meta.env.BASE_URL + item.image,
          })) as ProductCard[],
        );
      }, 300);
    });
  },
};

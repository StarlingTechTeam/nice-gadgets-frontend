import productsData from '@/shared/api/data/products.json';
import type { ProductCard } from '@/types/ProductCard ';

export const products = {
  getByQuantity: async (
    page: number,
    limit: number,
    category?: string,
    sort?: (a: ProductCard, b: ProductCard) => number,
  ): Promise<{ items: ProductCard[]; total: number }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [...productsData];

        if (category) {
          list = list.filter((item) => item.category === category);
        }

        if (sort) {
          list.sort(sort);
        }

        const total = list.length;
        const start = (page - 1) * limit;
        const items = list.slice(start, start + limit);

        resolve({ items, total });
      }, 1000);
    });
  },
};

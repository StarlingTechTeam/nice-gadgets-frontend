import phonesData from '@/shared/api/data/phones.json';
import tabletsData from '@/shared/api/data/tablets.json';
import accessoriesData from '@/shared/api/data/accessories.json';
import type { ProductDetails } from '@/types/ProductDetails';

const allDetailedProducts = [
  ...(phonesData as ProductDetails[]),
  ...(tabletsData as ProductDetails[]),
  ...(accessoriesData as ProductDetails[]),
];

export const productDetailsApi = {
  getAll: async (): Promise<ProductDetails[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(allDetailedProducts);
      }, 2000);
    });
  },

  getById: async (id: string): Promise<ProductDetails | undefined> => {
    const data = await productDetailsApi.getAll();
    return data.find((p) => p.id === id);
  },

  getByNamespace: async (namespaceId: string): Promise<ProductDetails[]> => {
    const data = await productDetailsApi.getAll();
    return data.filter((p) => p.namespaceId === namespaceId);
  },

  getByCategory: async (
    category: 'phones' | 'tablets' | 'accessories',
  ): Promise<ProductDetails[]> => {
    const data = await productDetailsApi.getAll();
    return data.filter((p) => p.category === category);
  },
};

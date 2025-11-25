import phonesData from '@/shared/api/data/phones.json';
import tabletsData from '@/shared/api/data/tablets.json';
import accessoriesData from '@/shared/api/data/accessories.json';
import type { ProductDetails } from '@/types/ProductDetails';
import phones from '@/shared/api/data/phones.json';
import tablets from '@/shared/api/data/tablets.json';
import accessories from '@/shared/api/data/accessories.json';

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
      }, 500);
    });
  },

  getByLength: () => {
    const filteredData = {
      phones: phones.length,
      tablets: tablets.length,
      accessories: accessories.length,
    };

    return filteredData;
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

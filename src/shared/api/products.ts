import productsData from '@/shared/api/data/products.json';

export type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  image: string;
};

export const products = {
  getAll: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productsData as Product[]);
      }, 2000);
    });
  },
};

export default products;

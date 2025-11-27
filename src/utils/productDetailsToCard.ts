import type { ProductCard } from '@/types/ProductCard';
import type { ProductDetails } from '@/types/ProductDetails';

export const productDetailsToCard = (product: ProductDetails): ProductCard => ({
  id: product.id,
  category: product.category,
  itemId: product.id,
  name: product.name,
  fullPrice: product.priceRegular,
  price: product.priceDiscount,
  screen: product.screen,
  capacity: product.capacity,
  color: product.color,
  ram: product.ram,
  year: new Date().getFullYear(),
  image: product.images?.[0] || '',
});

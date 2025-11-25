import { type FC } from 'react';
import ProductsSlider from '@templates/ProductSliderTemplate'; // Твій універсальний слайдер
import type { ProductCard as ProductCardType } from '@/types/ProductCard';

type Props = {
  products: ProductCardType[];
  sliderId: string;
};

const HotPricesSlider: FC<Props> = ({ products, sliderId }) => {
  if (products.length === 0) return null;

  return (
    <ProductsSlider
      title="Hot prices"
      products={products}
      sliderId={sliderId}
    />
  );
};

export default HotPricesSlider;

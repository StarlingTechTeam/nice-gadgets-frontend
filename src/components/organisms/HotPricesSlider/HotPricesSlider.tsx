import { type FC } from 'react';
import ProductsSlider from '@templates/ProductSliderTemplate';
import type { ProductCard as ProductCardType } from '@/types/ProductCard';

type Props = {
  products: ProductCardType[];
  sliderId: string;
  title: string;
};

const HotPricesSlider: FC<Props> = ({ products, sliderId, title }) => {
  if (products.length === 0) return null;

  return (
    <ProductsSlider
      title={title}
      products={products}
      sliderId={sliderId}
    />
  );
};

export default HotPricesSlider;

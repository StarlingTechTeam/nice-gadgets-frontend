import { type FC } from 'react';
import ProductsSlider from '@templates/ProductSliderTemplate'; // Твій універсальний слайдер
import { selectHotPriceProducts } from '@utils/productFilters';
import type { ProductCard as ProductCardType } from '@/types/ProductCard';

type Props = {
  products: ProductCardType[];
};

const HotPricesSlider: FC<Props> = ({ products }) => {
  const hotProducts = selectHotPriceProducts(products);

  if (hotProducts.length === 0) return null;

  return (
    <ProductsSlider
      title="Hot prices"
      products={hotProducts}
    />
  );
};

export default HotPricesSlider;

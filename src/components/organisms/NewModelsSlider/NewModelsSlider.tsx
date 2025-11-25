import { type FC } from 'react';
import ProductsSlider from '@templates/ProductSliderTemplate';
import type { ProductCard as ProductCardType } from '@/types/ProductCard';

type Props = {
  products: ProductCardType[];
  sliderId: string;
};

const NewModelsSlider: FC<Props> = ({ products, sliderId }) => {
  if (products.length === 0) return null;

  return (
    <ProductsSlider
      title="Brand new models"
      products={products}
      sliderId={sliderId}
    />
  );
};

export default NewModelsSlider;

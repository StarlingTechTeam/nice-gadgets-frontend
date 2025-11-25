import { type FC } from 'react';
import ProductsSlider from '@templates/ProductSliderTemplate';
import { selectNewModels } from '@utils/productFilters';
import type { ProductCard as ProductCardType } from '@/types/ProductCard';

type Props = {
  products: ProductCardType[];
};

const NewModelsSlider: FC<Props> = ({ products }) => {
  const newModels = selectNewModels(products);

  if (newModels.length === 0) return null;

  return (
    <ProductsSlider
      title="Brand new models"
      products={newModels}
    />
  );
};

export default NewModelsSlider;

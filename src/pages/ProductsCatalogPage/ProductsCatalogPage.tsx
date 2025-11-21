import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductsCatalogTemplate from '@/components/templates/ProductsCatalogTemplate/ProductsCatalogTemplate';
import { products, type Product } from '@/shared/api/products';

const ProductsCatalogPage = () => {
  const { categoryType } = useParams();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    products
      .getAll()
      .then((data) => {
        if (!categoryType) return setItems([]);

        const filtered = data.filter((item) => item.category === categoryType);

        setItems(filtered);
      })
      .finally(() => setLoading(false));
  }, [categoryType]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!items.length) {
    return <h1>Not Found</h1>;
  }

  return (
    <ProductsCatalogTemplate
      products={items}
      category={categoryType!}
    />
  );
};

export default ProductsCatalogPage;

import { useParams } from 'react-router-dom';
import type { Product } from '@/shared/api/products';
import ProductCard from '@organisms/ProductCard';
import './ProductsList.scss';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  const { categoryType } = useParams();

  if (!categoryType) {
    return null;
  }

  return (
    <div className="products-grid">
      {products.map((product) => {
        const image_url = `./src/assets/${product.image}`;

        let screen = '';
        {
          let result = '';
          let replaced = false;

          for (const char of product.screen) {
            if (char === "'" && !replaced) {
              result += "''";
              replaced = true;
            } else {
              result += char;
            }
          }

          screen = result;
        }

        const splitDigitsAndLetters = (value: string) => {
          let digits = '';
          let letters = '';

          for (const c of value) {
            const isDigit = c >= '0' && c <= '9';
            if (isDigit) digits += c;
            else letters += c;
          }

          return digits && letters ? `${digits} ${letters}` : value;
        };

        const formattedCapacity = splitDigitsAndLetters(product.capacity);
        const capacityLabel =
          categoryType === 'accessories' ? 'Size' : 'Capacity';

        const ram = splitDigitsAndLetters(product.ram);

        return (
          <ProductCard
            key={product.id}
            productName={product.name}
            price={product.price}
            fullPrice={product.fullPrice}
            screen={screen}
            capacity={formattedCapacity}
            capacityLabel={capacityLabel}
            ram={ram}
            image={image_url}
            categoryType={categoryType}
            itemId={product.itemId}
          />
        );
      })}
    </div>
  );
};

export default ProductList;

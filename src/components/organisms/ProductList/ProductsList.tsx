import { useParams } from 'react-router-dom';
import ProductCard from '@organisms/ProductCard';
import './ProductsList.scss';
import type { ProductCard as ProductCardType } from '@/types/ProductCard ';
import ProductCardSkeleton from '@organisms/ProductCardSkeleton';

type ProductListProps = {
  products: ProductCardType[];
  loading?: boolean;
};

const ProductList = ({ products, loading = false }: ProductListProps) => {
  const { categoryType } = useParams();

  if (!categoryType) return null;

  if (loading) {
    return (
      <div className="products-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
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

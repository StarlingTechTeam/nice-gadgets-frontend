import ProductCard from '@organisms/ProductCard';
import './ProductsList.scss';
import type { ProductCard as ProductCardType } from '@/types/ProductCard';
import ProductCardSkeleton from '@organisms/ProductCardSkeleton';

type ProductListProps = {
  products: ProductCardType[];
  loading?: boolean;
};

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

const formatScreen = (value: string) => {
  let result = '';
  let replaced = false;

  for (const char of value) {
    if (char === "'" && !replaced) {
      result += "''";
      replaced = true;
    } else {
      result += char;
    }
  }

  return result;
};

const ProductList = ({ products, loading = false }: ProductListProps) => {
  if (loading) {
    return (
      <div className="products-grid">
        {Array.from({ length: 24 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => {
        const image = `./src/assets/${product.image}`;
        const screen = formatScreen(product.screen);
        const capacity = splitDigitsAndLetters(product.capacity);
        const ram = splitDigitsAndLetters(product.ram);
        const categoryType = product.category;
        const capacityLabel =
          categoryType === 'accessories' ? 'Size' : 'Capacity';

        return (
          <ProductCard
            key={product.id}
            productName={product.name}
            price={product.price}
            fullPrice={product.fullPrice}
            screen={screen}
            capacity={capacity}
            capacityLabel={capacityLabel}
            ram={ram}
            image={image}
            categoryType={categoryType}
            itemId={product.itemId}
            productData={product}
          />
        );
      })}
    </div>
  );
};

export default ProductList;

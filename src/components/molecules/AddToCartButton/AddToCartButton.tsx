import { useState, type MouseEvent } from 'react';
import Button from '@atoms/Button';
import type { ProductCard } from '@/types/ProductCard';
import type { ProductDetails } from '@/types/ProductDetails';
import { useProductsSelection } from '@context/ProductsSelectionContext';

type AddToCartButtonProps = {
  product?: ProductCard | ProductDetails;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { isInCart, toggleCart } = useProductsSelection();
  const [localActive, setLocalActive] = useState(false);

  const productCard = product as ProductCard | undefined;

  const isActive = productCard ? isInCart(productCard.itemId) : localActive;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productCard) {
      setLocalActive((prev) => !prev);
      return;
    }

    toggleCart(productCard);
  };

  return (
    <Button
      variant="primary"
      isActive={isActive}
      onClick={handleClick}
    >
      {isActive ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};

export default AddToCartButton;

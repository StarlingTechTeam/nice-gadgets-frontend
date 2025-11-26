import Button from '@atoms/Button';
import { useProductsSelection } from '@context/ProductsSelectionContext';
import { useState, type MouseEvent, useMemo } from 'react';
import type { ProductCard } from '@/types/ProductCard';
import type { ProductDetails } from '@/types/ProductDetails';
import './AddToFavButton.scss';

type AddToFavButtonProps = {
  product?: ProductCard | ProductDetails;
};

const AddToFavButton = ({ product }: AddToFavButtonProps) => {
  const { isFavorite, toggleFavorite } = useProductsSelection();
  const [localActive, setLocalActive] = useState(false);

  const productCard = useMemo(() => {
    if (!product) return undefined;
    return product as ProductCard;
  }, [product]);

  const active = productCard ? isFavorite(productCard.itemId) : localActive;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productCard) {
      setLocalActive((prev) => !prev);
      return;
    }

    toggleFavorite(productCard);
  };

  return (
    <div>
      <div
        className={`fav-button ${active ? 'is-active' : ''}`}
        onClick={handleClick}
      >
        <Button
          variant="icon"
          icon={
            <div className="heart-icon-wrapper">
              <span className="heart-icon--outline"></span>
              <span className="heart-icon--filled"></span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default AddToFavButton;

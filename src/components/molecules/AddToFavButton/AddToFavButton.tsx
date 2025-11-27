import Button from '@atoms/Button';
import { useProductsSelection } from '@context/ProductsSelectionContext';
import { useState, type MouseEvent } from 'react';
import type { ProductCard } from '@/types/ProductCard';
import type { ProductDetails } from '@/types/ProductDetails';
import './AddToFavButton.scss';
import { useToast } from '@hooks/useToast';

type AddToFavButtonProps = {
  product?: ProductCard | ProductDetails;
};

const AddToFavButton = ({ product }: AddToFavButtonProps) => {
  const { isFavorite, toggleFavorite } = useProductsSelection();
  const [localActive, setLocalActive] = useState(false);
  const { showToast } = useToast();

  const productCard = product as ProductCard | undefined;

  const active = productCard ? isFavorite(productCard.itemId) : localActive;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productCard) {
      setLocalActive((prev) => !prev);
      return;
    }

    try {
      if (active) {
        showToast({
          type: 'success',
          message: 'Removed from favorites',
        });
      } else {
        showToast({
          type: 'success',
          message: 'Added to favorites',
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Something went wrong' + error,
      });
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

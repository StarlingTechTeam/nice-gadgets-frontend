import Button from '@atoms/Button';
import { useFavorites } from '@context/FavoritesContext';
import { useState, type MouseEvent } from 'react';
import type { ProductCard } from '@/types/ProductCard ';
import './AddToFavButton.scss';

type AddToFavButtonProps = {
  product?: ProductCard;
};

const AddToFavButton = ({ product }: AddToFavButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [localActive, setLocalActive] = useState(false);

  const active = product ? isFavorite(product.itemId) : localActive;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!product) {
      setLocalActive((prev) => !prev);
      return;
    }

    toggleFavorite(product);
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

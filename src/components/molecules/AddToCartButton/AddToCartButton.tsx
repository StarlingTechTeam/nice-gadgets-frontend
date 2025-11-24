import { useState } from 'react';
import Button from '@atoms/Button';

const AddToCartButton = () => {
  const [added, setAdded] = useState(false);

  return (
    <Button
      variant="primary"
      isActive={added}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setAdded((prev) => !prev);
      }}
    >
      {added ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
};

export default AddToCartButton;

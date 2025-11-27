import { type MouseEvent } from 'react';
import Button from '@atoms/Button';
import { useCart } from '@hooks/useCart';
import type { ProductCard } from '@/types/ProductCard';
import type { ProductDetails } from '@/types/ProductDetails';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';

type AddToCartButtonProps = {
  product?: ProductCard | ProductDetails;
  quantity?: number;
};

const AddToCartButton = ({ product, quantity = 1 }: AddToCartButtonProps) => {
  const { addItem, removeItem, items, isLoading } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const productCard = convertToProductCard(product);
  const cartItem =
    productCard ?
      items.find(
        (item) =>
          item.product.itemId === productCard.itemId &&
          item.product.color === productCard.color &&
          item.product.capacity === productCard.capacity,
      )
    : null;

  const isActive = !!cartItem;

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productCard) return;

    try {
      if (isActive && cartItem) {
        await removeItem(cartItem.id);
        showToast({
          type: 'success',
          message: 'Removed from cart',
        });
      } else {
        await addItem(productCard, quantity);
        showToast({
          type: 'success',
          message: 'Added to cart',
          action: {
            label: 'View Cart',
            onClick: () => navigate('/cart'),
          },
        });
      }
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Something went wrong' + error,
      });
    }
  };

  return (
    <Button
      variant="primary"
      isActive={isActive}
      onClick={handleClick}
      disabled={isLoading || !productCard}
    >
      {isLoading ?
        'Loading...'
      : isActive ?
        `In cart`
      : 'Add to cart'}
    </Button>
  );
};

export default AddToCartButton;

function convertToProductCard(
  product?: ProductCard | ProductDetails,
): ProductCard | undefined {
  if (!product) return undefined;

  if ('itemId' in product) {
    return product as ProductCard;
  }

  const details = product as ProductDetails;

  return {
    id: parseInt(details.id) || 0,
    category: details.category,
    itemId: details.namespaceId,
    name: details.name,
    fullPrice: details.priceRegular,
    price: details.priceDiscount,
    screen: details.screen,
    capacity: details.capacity,
    color: details.color,
    ram: details.ram,
    year: new Date().getFullYear(),
    image: details.images[0] || '',
  };
}

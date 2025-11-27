import React from 'react';
import CartItemComponent from '@organisms/CartItemComponent';
import type { CartItem } from '@/types/CartItem';

interface CartListProps {
  items: CartItem[];
  onQuantityChange: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({
  items,
  onQuantityChange,
  onRemoveItem,
}) => {
  if (items.length === 0) {
    return (
      <div className="py-12">
        <p className="text-center text-secondary">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <CartItemComponent
          key={item.id}
          item={item}
          updateQuantity={(id: string, qty: number) =>
            onQuantityChange(id, qty)
          }
          onRemove={() => onRemoveItem(item.id)}
        />
      ))}
    </div>
  );
};
export default CartList;

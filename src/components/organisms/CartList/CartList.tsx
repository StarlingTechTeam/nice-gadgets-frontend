import React from 'react';
import CartItemComponent from '@organisms/CartItemComponent';
import type { CartItem } from '@/types/CartItem';
import './CartList.scss';

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
  return (
    <div className="cart-list">
      {items.map((item) => (
        <CartItemComponent
          key={item.id}
          item={item}
          updateQuantity={onQuantityChange}
          onRemove={() => onRemoveItem(item.id)}
        />
      ))}
    </div>
  );
};

export default CartList;

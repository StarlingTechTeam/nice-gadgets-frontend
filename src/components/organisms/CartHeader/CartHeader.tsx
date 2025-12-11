import './CartHeader.scss';
import cn from 'classnames';
import Breadcrumbs from '@/components/molecules/Breadcrumbs';

interface CartHeaderProps {
  itemCount: number;
  className?: string;
}

const CartHeader = ({ itemCount, className }: CartHeaderProps) => {
  const itemText =
    itemCount === 0 ? '(empty)' : (
      `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`
    );

  return (
    <header className={cn('cart-header', className)}>
      <Breadcrumbs />

      <h1 className="cart-header__title">Cart</h1>
      <p className="cart-header__count">{itemText}</p>
    </header>
  );
};

export default CartHeader;

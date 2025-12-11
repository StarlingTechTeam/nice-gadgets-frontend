import BackButton from '@atoms/BackButton';
import './CartHeader.scss';
import cn from 'classnames';

interface CartHeaderProps {
  itemCount: number;
  className?: string;
  onBack?: () => void;
}

const CartHeader = ({ itemCount, className, onBack }: CartHeaderProps) => {
  const itemText =
    itemCount === 0 ? '(empty)' : (
      `${itemCount} ${itemCount === 1 ? 'item' : 'items'}`
    );

  return (
    <header className={cn('cart-header', className)}>
      <BackButton onClick={onBack} />

      <div className="cart-header__title-section">
        <h1 className="cart-header__title">Cart</h1>
        <span className="cart-header__count">{itemText}</span>
      </div>
    </header>
  );
};

export default CartHeader;

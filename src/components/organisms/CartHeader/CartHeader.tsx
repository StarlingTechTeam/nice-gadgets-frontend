import Icon from '@atoms/Icon/Icon';
import './CartHeader.scss';
import arrowLeftIcon from '@assets/icons/arrow-left.svg';

interface CartHeaderProps {
  itemCount: number;
}

const CartHeader = ({ itemCount }: CartHeaderProps) => {
  return (
    <header className="cart-header mb-10">
      <button
        className="back-btn flex items-center"
        onClick={() => window.history.back()}
        aria-label="Go back"
      >
        <Icon
          src={arrowLeftIcon}
          size={20}
        />
        <span
          className="text-secondary"
          style={{ paddingBottom: '1px' }}
        >
          Back
        </span>
      </button>

      <div>
        <h1 className="text-primary">Cart</h1>
        {itemCount > 0 ?
          <span className="cart-header__count">{`${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}</span>
        : <span className="cart-header__count">(empty)</span>}
      </div>
    </header>
  );
};

export default CartHeader;

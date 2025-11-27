import { useNavigate } from 'react-router-dom';
import './EmptyCart.scss';
import Button from '@atoms/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="empty-cart ">
      <div className="empty-cart__icon">🛒</div>
      <h2 className="empty-cart__title text-primary">Your cart is empty</h2>
      <p className="empty-cart__description">
        Looks like you haven&apos;t added anything to your cart yet
      </p>
      <div className="w-[200px] h-[40px]">
        <Button onClick={() => navigate('/')}>Continue Shopping</Button>
      </div>
    </div>
  );
};

export default EmptyCart;

import QuantityControl from '@molecules/QuantityControl';
import PriceDisplay from '@molecules/PriceDisplay';
import Button from '@atoms/Button';
import type { CartItem } from '@/types/CartItem';
import { Link } from 'react-router-dom';
import './CartItemComponent.scss';

type CartItemProps = {
  item: CartItem;
  updateQuantity: (id: string, newQty: number) => void;
  onRemove: () => void;
};

const CartItemComponent = ({
  item,
  updateQuantity,
  onRemove,
}: CartItemProps) => {
  const product = item.product;
  const price = product.price ? product.price : product.fullPrice;

  return (
    <div className="flex gap-4 py-6 border-b border-border items-start">
      <Link to={`/product/${product.itemId}`}>
        <div className="cart-item__image w-24 p-2 h-24 bg-background-secondary rounded-md overflow-hidden flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between h-24">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.itemId}`}>
            <h2 className="mb-1 mt-3 text-primary cart-item__name">
              {product.name}
            </h2>
          </Link>
          <Button
            variant="icon"
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500"
          >
            <span className="text-gray-400 hover:text-red-500">X</span>
          </Button>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <QuantityControl
            value={item.quantity}
            min={1}
            max={99}
            onChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
          />
          <div className="flex gap-2">
            <span className="text-red-300">
              {(
                ((product.fullPrice - price) / product.fullPrice) *
                100
              ).toFixed(2)}
              %
            </span>
            <div className="relative">
              {product.price && (
                <>
                  <PriceDisplay
                    className="cart-summary__total-price"
                    price={product.fullPrice * item.quantity}
                  />
                  <PriceDisplay price={price * item.quantity} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;

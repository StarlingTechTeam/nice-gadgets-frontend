import CartList from '@organisms/CartList';
import CartSummary from '@organisms/CartSummary';
import CartHeader from '@organisms/CartHeader';
import EmptyCart from '@molecules/EmptyCart';
import type {
  CartItem,
  DiscountCode,
  ShippingAddress,
  ShippingMethod,
} from '@/types/CartItem';
import './CartTemplate.scss';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';

interface CartTemplateProps {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  totalPriceWithoutDiscounts: number;
  appliedCoupon: DiscountCode | null;
  shippingMethod: ShippingMethod | null;
  shippingAddress: ShippingAddress | null;

  isLoading: boolean;
  error: string | null;

  onQuantityChange: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

const CartTemplate = ({
  items,
  itemCount,
  subtotal,
  shippingCost,
  discountAmount,
  total,
  totalPriceWithoutDiscounts,
  appliedCoupon,
  shippingMethod,
  shippingAddress,
  isLoading,
  error,
  onQuantityChange,
  onRemoveItem,
  onApplyCoupon,
  onRemoveCoupon,
}: CartTemplateProps) => {
  return (
    <div className="cart-template bg-background">
      <div className="inline-wrapper ">
        <div
          className={cn('flex cart-template__content', {
            hidden: items.length === 0,
          })}
        >
          <div className="cart-template__items">
            <div className="cart-template__header">
              <CartHeader itemCount={itemCount} />
            </div>
            {items.length === 0 ?
              <EmptyCart />
            : <div className="cart-template__items">
                <CartList
                  items={items}
                  onQuantityChange={onQuantityChange}
                  onRemoveItem={onRemoveItem}
                />
              </div>
            }
          </div>

          {items.length > 0 && (
            <div className="cart-template-summary flex flex-col">
              <div className="cart-template__header-summary">
                <CartHeader itemCount={itemCount} />
              </div>
              <aside className="cart-template__summary">
                <CartSummary
                  subtotal={subtotal}
                  shippingCost={shippingCost}
                  discountAmount={discountAmount}
                  total={total}
                  totalPriceWithoutDiscounts={totalPriceWithoutDiscounts}
                  appliedCoupon={appliedCoupon}
                  itemCount={itemCount}
                  shippingMethod={shippingMethod}
                  shippingAddress={shippingAddress}
                  onApplyCoupon={onApplyCoupon}
                  onRemoveCoupon={onRemoveCoupon}
                  isLoading={isLoading}
                  error={error}
                />
              </aside>
            </div>
          )}
        </div>

        {error && (
          <div className="cart-template__error">
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <Skeleton
            height={200}
            width={200}
          />
        )}
      </div>
    </div>
  );
};

export default CartTemplate;

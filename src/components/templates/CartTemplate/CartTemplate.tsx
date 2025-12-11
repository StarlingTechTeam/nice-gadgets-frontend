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
  const isEmpty = items.length === 0;

  if (isLoading) {
    return (
      <div className="cart-template bg-background">
        <div className="inline-wrapper">
          <Skeleton
            height={200}
            width="100%"
          />
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="cart-template bg-background">
        <div className="inline-wrapper">
          <CartHeader
            itemCount={0}
            onBack={() => window.history.back()}
          />
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="cart-template bg-background">
      <div className="inline-wrapper">
        {error && (
          <div
            className="cart-template__error"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        <div className="cart-template__content">
          <div className="cart-template__items">
            <CartHeader
              itemCount={itemCount}
              className="cart-template__header"
              onBack={() => window.history.back()}
            />
            <CartList
              items={items}
              onQuantityChange={onQuantityChange}
              onRemoveItem={onRemoveItem}
            />
          </div>

          <div className="cart-template-summary">
            <CartHeader
              itemCount={itemCount}
              className="cart-template__header-summary"
              onBack={() => window.history.back()}
            />
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
        </div>
      </div>
    </div>
  );
};

export default CartTemplate;

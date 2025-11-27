import DiscountCode from '@organisms/DiscountCode';
import ShippingSelector from '@organisms/ShippingSelector';
import './CartSummary.scss';
import type {
  DiscountCode as DiscountCodeType,
  ShippingAddress,
  ShippingMethod,
} from '@/types/CartItem';

type CartSummaryProps = {
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  appliedCoupon: DiscountCodeType | null;
  itemCount: number;
  shippingMethod: ShippingMethod | null;
  shippingAddress: ShippingAddress | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onCheckout: () => void;
  isLoading: boolean;
  error: string | null;
  totalPriceWithoutDiscounts: number;
};

const CartSummary = ({
  subtotal,
  shippingCost,
  discountAmount,
  total,
  totalPriceWithoutDiscounts,
  appliedCoupon,
  itemCount,
  shippingMethod,
  shippingAddress,
  onApplyCoupon,
  onRemoveCoupon,
  onCheckout,
  isLoading,
  error,
}: CartSummaryProps) => {
  const isCheckoutDisabled =
    itemCount === 0 || !shippingMethod || !shippingAddress || isLoading;

  const handleCheckout = () => {
    if (isCheckoutDisabled) return;
    onCheckout();
  };

  return (
    <div className="cart-summary text-primary">
      <h2 className="cart-summary__title">Order Summary</h2>

      <div className="cart-summary__breakdown flex flex-col gap-4">
        <div className="cart-summary__row">
          <span className="cart-summary__label">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="cart-summary__value">{subtotal.toFixed(2)} $</span>
        </div>

        {shippingCost > 0 && (
          <div className="cart-summary__row">
            <span className="cart-summary__label">
              Shipping
              {shippingMethod && (
                <span className="cart-summary__shipping-method">
                  {' '}
                  via {shippingMethod.name}
                </span>
              )}
            </span>
            <span className="cart-summary__value">
              {shippingCost.toFixed(2)} $
            </span>
          </div>
        )}

        {discountAmount > 0 && (
          <div className="cart-summary__row cart-summary__row--discount">
            <span className="cart-summary__label">
              Discount
              {appliedCoupon && (
                <span className="cart-summary__discount-code">
                  {' '}
                  ({appliedCoupon.code})
                </span>
              )}
            </span>
            <span className="cart-summary__value cart-summary__value--discount">
              -{discountAmount.toFixed(2)} $
            </span>
          </div>
        )}
      </div>

      <DiscountCode
        onApplyCoupon={onApplyCoupon}
        onRemoveCoupon={onRemoveCoupon}
      />

      <ShippingSelector />

      <div className="cart-summary__total">
        <span className="cart-summary__total-label">Total</span>
        <div className="relative">
          {totalPriceWithoutDiscounts && (
            <span className="cart-summary__total-price">
              {totalPriceWithoutDiscounts.toFixed(2)} $
            </span>
          )}
          <span className="cart-summary__total-value">
            {total.toFixed(2)} $
          </span>
        </div>
      </div>

      <button
        className="cart-summary__checkout"
        onClick={handleCheckout}
        disabled={isCheckoutDisabled}
      >
        {isLoading ?
          'Processing...'
        : isCheckoutDisabled ?
          'Complete Shipping Information'
        : 'Proceed to Checkout'}
      </button>

      {error && <p className="cart-summary__error">{error}</p>}

      {!shippingMethod && itemCount > 0 && (
        <p className="cart-summary__notice">
          Please select shipping method to continue
        </p>
      )}

      <div className="cart-summary__trust">
        <div className="cart-summary__trust-item">
          <span className="cart-summary__trust-icon">🔒</span>
          <span className="cart-summary__trust-text">Secure Checkout</span>
        </div>
        <div className="cart-summary__trust-item">
          <span className="cart-summary__trust-icon">🚚</span>
          <span className="cart-summary__trust-text">Fast Delivery</span>
        </div>
        <div className="cart-summary__trust-item">
          <span className="cart-summary__trust-icon">↩️</span>
          <span className="cart-summary__trust-text">Easy Returns</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

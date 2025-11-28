import React, { useEffect, useRef, useState } from 'react';
import DiscountCode from '@organisms/DiscountCode';
import ShippingSelector from '@organisms/ShippingSelector';
import './CartSummary.scss';
import type {
  DiscountCode as DiscountCodeType,
  ShippingAddress,
  ShippingMethod,
} from '@/types/CartItem';
import CreditCardForm from '../CreditCardForm';

type PaymentInfo = {
  cardNumber: string; // digits only
  cardHolder: string;
  expiryMonth: string; // "MM"
  expiryYear: string; // "YY" or "YYYY"
  cvv: string;
};

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
  isLoading: boolean;
  error: string | null;
  totalPriceWithoutDiscounts: number;
  onProcessPayment?: (paymentInfo: PaymentInfo) => Promise<void>;
};

const CartSummary: React.FC<CartSummaryProps> = ({
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
  isLoading,
  error,
}) => {
  const [isPaymentStep, setIsPaymentStep] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardNumberInputRef = useRef<HTMLInputElement | null>(null);

  const isCheckoutDisabled =
    itemCount === 0 || !shippingMethod || !shippingAddress || isLoading;

  useEffect(() => {
    if (isPaymentStep) {
      setTimeout(() => cardNumberInputRef.current?.focus(), 260);
    }
  }, [isPaymentStep]);

  const handleCheckoutClick = () => {
    if (isCheckoutDisabled) return;
    setIsPaymentStep(true);
  };

  const goBackToSummary = () => {
    setIsPaymentStep(false);
  };

  return (
    <div
      className={`cart-summary-outer text-primary ${isPaymentStep ? 'is-flipped' : ''}`}
      ref={containerRef}
      aria-live="polite"
    >
      <div className="cart-summary-card">
        {/* FRONT */}
        <section
          className="cart-summary__face cart-summary__face--front"
          aria-hidden={isPaymentStep}
        >
          <h2 className="cart-summary__title">Order Summary</h2>

          <div className="cart-summary__breakdown">
            <div className="cart-summary__row">
              <span className="cart-summary__label">
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
              </span>
              <span className="cart-summary__value">
                {subtotal.toFixed(2)} $
              </span>
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
            <div className="cart-summary__total-amounts">
              {totalPriceWithoutDiscounts !== total && (
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
            onClick={handleCheckoutClick}
            disabled={isCheckoutDisabled}
            aria-disabled={isCheckoutDisabled}
          >
            {isLoading ?
              'Processing...'
            : isCheckoutDisabled ?
              'Complete Shipping Information'
            : 'Proceed to Checkout'}
          </button>

          {error && (
            <p
              className="cart-summary__error"
              role="alert"
            >
              {error}
            </p>
          )}
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
        </section>

        {/* BACK */}
        <section
          className="cart-summary__face cart-summary__face--back"
          aria-hidden={!isPaymentStep}
        >
          <button
            className="cart-summary__back-button justify-self-end"
            onClick={goBackToSummary}
          >
            Back to Summary
          </button>
          <CreditCardForm total={total.toFixed(2)} />
        </section>
      </div>
    </div>
  );
};

export default CartSummary;

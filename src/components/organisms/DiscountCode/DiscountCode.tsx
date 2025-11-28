import { useState } from 'react';
import { useCart } from '@hooks/useCart';
import './DiscountCode.scss';

type DiscountCodeProps = {
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
};

const DiscountCode = ({ onApplyCoupon, onRemoveCoupon }: DiscountCodeProps) => {
  const [code, setCode] = useState('');
  const { discountCode, isLoading } = useCart();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onApplyCoupon(code);
    }
  };

  const handleDivClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const codeFromDiv = e.currentTarget.textContent?.trim();
    setCode(codeFromDiv || '');

    setTimeout(() => {
      onApplyCoupon(codeFromDiv || '');
    }, 100);
  };

  const removeCoupon = () => {
    onRemoveCoupon();
    setCode('');
  };

  return (
    <div className="discount-code">
      <h4 className="discount-code__title">Enter Discount Code</h4>

      {discountCode?.isValid ?
        <div className="discount-code__applied">
          <div className="discount-code__content">
            <div className="discount-code__badge">
              <svg
                className="discount-code__icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6667 5L7.50004 14.1667L3.33337 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="discount-code__label">Applied</span>
            </div>

            <div className="discount-code__details">
              <span className="discount-code__code">{discountCode.code}</span>
              <span className="discount-code__value">
                {discountCode.type === 'percentage' ?
                  `-${discountCode.value}%`
                : `-₴${discountCode.value}`}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="discount-code__remove"
            onClick={removeCoupon}
            aria-label="Remove discount code"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      : <div className="discount-code__input-group">
          <div className="discount-code__input-wrapper">
            <svg
              className="discount-code__input-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 7.5L10 2.5L17.5 7.5V12.5L10 17.5L2.5 12.5V7.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 10C10.8284 10 11.5 9.32843 11.5 8.5C11.5 7.67157 10.8284 7 10 7C9.17157 7 8.5 7.67157 8.5 8.5C8.5 9.32843 9.17157 10 10 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7 13L13 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              className="discount-code__input"
              placeholder="Enter code (e.g., SAVE10)"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              maxLength={20}
              autoComplete="off"
            />
          </div>

          <button
            type="button"
            className="discount-code__apply"
            onClick={() => onApplyCoupon(code)}
            disabled={isLoading || !code.trim()}
            aria-label="Apply discount code"
          >
            {isLoading ?
              <>
                <span className="discount-code__spinner" />
                <span>Applying...</span>
              </>
            : 'Apply'}
          </button>
        </div>
      }

      {discountCode && !discountCode.isValid && (
        <div className="discount-code__error">
          <svg
            className="discount-code__error-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 4.5V8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle
              cx="8"
              cy="11"
              r="0.5"
              fill="currentColor"
            />
          </svg>
          <p className="discount-code__error-message">
            {discountCode.errorMessage}
          </p>
        </div>
      )}

      {!discountCode && (
        <div className="discount-code__hint">
          <p className="discount-code__hint-text">
            💡 Try: <span onClick={handleDivClick}>SAVE10</span>,{' '}
            <span onClick={handleDivClick}>SAVE20</span>, or{' '}
            <span onClick={handleDivClick}>WELCOME</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DiscountCode;

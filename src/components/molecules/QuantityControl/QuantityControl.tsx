import { useQuantity } from '@hooks/useQuantity';
import './QuantityControl.scss';

interface QuantityControlProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (quantity: number) => void;
  size?: 'small' | 'medium' | 'large';
}

const QuantityControl = ({
  value,
  min = 1,
  max = 99,
  step = 1,
  onChange,
  size = 'medium',
}: QuantityControlProps) => {
  const {
    quantity,
    increment,
    decrement,
    setQuantity,
    canIncrement,
    canDecrement,
  } = useQuantity({ initial: value, min, max, step });

  const handleIncrement = () => {
    increment();
    onChange?.(quantity + step);
  };

  const handleDecrement = () => {
    decrement();
    onChange?.(quantity - step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setQuantity(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`quantity-control quantity-control--${size}`}>
      <button
        type="button"
        className="quantity-control__button quantity-control__button--decrement"
        onClick={handleDecrement}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <input
        name="quantity-control"
        type="number"
        className="quantity-control__input"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        aria-label="Quantity"
      />

      <button
        type="button"
        className="quantity-control__button quantity-control__button--increment"
        onClick={handleIncrement}
        disabled={!canIncrement}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;

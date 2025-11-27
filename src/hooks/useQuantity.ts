import { useState, useCallback } from 'react';

interface UseQuantityOptions {
  initial?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface UseQuantityReturn {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  setQuantity: (value: number) => void;
  reset: () => void;
  isAtMin: boolean;
  isAtMax: boolean;
  canIncrement: boolean;
  canDecrement: boolean;
}

export const useQuantity = (
  options: UseQuantityOptions = {},
): UseQuantityReturn => {
  const { initial = 1, min = 1, max = 99, step = 1 } = options;

  const [quantity, setQuantityState] = useState(initial);

  const increment = useCallback(() => {
    setQuantityState((prev) => {
      const newValue = prev + step;
      return newValue <= max ? newValue : prev;
    });
  }, [max, step]);

  const decrement = useCallback(() => {
    setQuantityState((prev) => {
      const newValue = prev - step;
      return newValue >= min ? newValue : prev;
    });
  }, [min, step]);

  const setQuantity = useCallback(
    (value: number) => {
      const numValue = Number(value);

      if (isNaN(numValue)) {
        return;
      }

      let newValue = Math.max(min, Math.min(max, numValue));
      newValue = Math.round(newValue / step) * step;

      setQuantityState(newValue);
    },
    [min, max, step],
  );

  const reset = useCallback(() => {
    setQuantityState(initial);
  }, [initial]);

  const isAtMin = quantity <= min;
  const isAtMax = quantity >= max;
  const canIncrement = quantity < max;
  const canDecrement = quantity > min;

  return {
    quantity,
    increment,
    decrement,
    setQuantity,
    reset,
    isAtMin,
    isAtMax,
    canIncrement,
    canDecrement,
  };
};

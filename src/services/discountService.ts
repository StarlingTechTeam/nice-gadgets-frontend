import type { DiscountCode } from '@/types/CartItem';

const VALID_CODES: Record<string, Omit<DiscountCode, 'code' | 'isValid'>> = {
  SAVE10: { type: 'percentage', value: 10 },
  SAVE20: { type: 'percentage', value: 20 },
  FIXED100: { type: 'fixed', value: 100 },
  WELCOME: { type: 'percentage', value: 15 },
  MATE: { type: 'percentage', value: 25 },
};

export const validateDiscountCode = async (
  code: string,
  subtotal: number,
): Promise<DiscountCode> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const normalizedCode = code.toUpperCase().trim();
  const discountInfo = VALID_CODES[normalizedCode];

  if (!discountInfo) {
    return {
      code: normalizedCode,
      type: 'fixed',
      value: 0,
      isValid: false,
      errorMessage: 'Invalid discount code',
    };
  }

  if (discountInfo.type === 'fixed' && subtotal < discountInfo.value) {
    return {
      code: normalizedCode,
      ...discountInfo,
      isValid: false,
      errorMessage: `Order must be at least ₴${discountInfo.value} to use this code`,
    };
  }

  return {
    code: normalizedCode,
    ...discountInfo,
    isValid: true,
  };
};

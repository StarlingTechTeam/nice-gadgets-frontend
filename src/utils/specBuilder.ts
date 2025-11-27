import type { ProductDetails } from '@/types/ProductDetails';
import { normalizeScreenQuote, formatCapacityOrRAM } from '@utils/formatting';

export const getMainSpecs = (product: ProductDetails | null) => {
  return [
    { key: 'Screen', value: normalizeScreenQuote(product?.screen ?? '') },
    { key: 'Resolution', value: product?.resolution ?? '' },
    { key: 'Processor', value: product?.processor ?? '' },
    { key: 'RAM', value: formatCapacityOrRAM(product?.ram ?? '') },
  ];
};

export const getTechSpecs = (product: ProductDetails | null) => {
  return [
    { key: 'Screen', value: normalizeScreenQuote(product?.screen ?? '') },
    { key: 'Resolution', value: product?.resolution ?? '' },
    { key: 'Processor', value: product?.processor ?? '' },
    { key: 'RAM', value: formatCapacityOrRAM(product?.ram ?? '') },
    { key: 'Built in memory', value: product?.capacity ?? '' },
    { key: 'Camera', value: product?.camera ?? '' },
    { key: 'Zoom', value: product?.zoom ?? '' },
    { key: 'Cell', value: (product?.cell ?? []).join(', ') },
  ];
};

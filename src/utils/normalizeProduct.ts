import type { ProductDetails } from '@/types/ProductDetails';

export const normalizeProduct = (raw?: ProductDetails | null) => {
  if (!raw) return null;

  const normalizeString = (v?: string | null) =>
    typeof v === 'string' ? v : '';

  const normalizeArray = (v?: string[] | null) =>
    Array.isArray(v) ? v.filter(Boolean) : [];

  const normalized = {
    id: normalizeString(raw.id),
    namespaceId: normalizeString(raw.namespaceId ?? raw.id),
    name: normalizeString(raw.name),

    category: normalizeString(raw.category),

    priceRegular: Number(raw.priceRegular ?? 0),
    priceDiscount: Number(raw.priceDiscount ?? raw.priceRegular ?? 0),

    images: normalizeArray(raw.images),

    colorsAvailable: normalizeArray(raw.colorsAvailable),
    capacityAvailable: normalizeArray(raw.capacityAvailable),

    color: normalizeString(raw.color),
    capacity: normalizeString(raw.capacity),

    screen: normalizeString(raw.screen),
    resolution: normalizeString(raw.resolution),
    processor: normalizeString(raw.processor),
    ram: normalizeString(raw.ram),
    camera: normalizeString(raw.camera),
    zoom: normalizeString(raw.zoom),
    cell: normalizeArray(raw.cell),

    description: Array.isArray(raw.description) ? raw.description : [],

    _raw: raw as ProductDetails,
  };

  return normalized;
};

export type NormalizedProduct = ReturnType<typeof normalizeProduct>;

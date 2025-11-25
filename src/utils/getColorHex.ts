import namer from 'color-namer';

const FALLBACK_COLORS: Record<string, string> = {
  spacegray: '#4A4A4A',
  spacegrey: '#4A4A4A',
  graphite: '#4A4A4A',
  midnightgreen: '#004953',
  rosegold: '#E6B7C2',
};

export const getColorHex = (input: string): string => {
  const normalized = input.toLowerCase().replace(/\s+/g, '');

  try {
    const result = namer(normalized);
    if (result?.html?.length > 0) {
      return result.html[0].hex;
    }
  } catch {
    console.log('Error getting color:', input);
  }

  return FALLBACK_COLORS[normalized] || '#cccccc';
};

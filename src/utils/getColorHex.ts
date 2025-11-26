import namer from 'color-namer';

const FALLBACK_COLORS: Record<string, string> = {
  spacegray: '#4A4A4A',
  spacegrey: '#4A4A4A',
  spaceblack: '#1C1C1E',
  graphite: '#4A4A4A',
  midnightgreen: '#004953',
  midnight: '#191970',
  rosegold: '#E6B7C2',
  sierrablue: '#69ABCE',
  starlight: '#F9F6F3',
  skyblue: '#A4D8E1',
};

export const getColorHex = (input: string): string => {
  const normalized = input.toLowerCase().replace(/\s+/g, '');

  if (FALLBACK_COLORS[normalized]) return FALLBACK_COLORS[normalized];

  try {
    const result = namer(normalized);
    if (result?.html?.length > 0) {
      return result.html[0].hex;
    }
  } catch {
    console.warn('Unknown color:', input);
  }

  return '#cccccc';
};

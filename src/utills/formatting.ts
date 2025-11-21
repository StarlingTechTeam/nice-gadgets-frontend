export const formatCapacityOrRAM = (value: string): string => {
  if (!value) return value;
  // This regex looks for a digit followed immediately by a letter,
  // or a letter followed immediately by a digit, and inserts a space.
  return value
    .replace(/(\d)([A-Za-z])/g, '$1 $2')
    .replace(/([A-Za-z])(\d)/g, '$1 $2');
};

export const normalizeScreenQuote = (value: string): string => {
  if (!value) return value;
  return value.replace("'", '"');
};

const PriceDisplay = ({
  price,
  className,
}: {
  price: number;
  className?: string;
}) => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
  return (
    <span className={`text-[16px] text-primary font-semibold ${className}`}>
      {formatted}
    </span>
  );
};
export default PriceDisplay;

import './Price.scss';

type PriceProps = {
  price: number;
  fullPrice?: number;
};

const Price = ({ price, fullPrice }: PriceProps) => {
  return (
    <div className="card__price-container">
      <div className="text-primary card__actual-price">${price}</div>
      {fullPrice && (
        <div className="text-secondary card__full-price">${fullPrice}</div>
      )}
    </div>
  );
};

export default Price;

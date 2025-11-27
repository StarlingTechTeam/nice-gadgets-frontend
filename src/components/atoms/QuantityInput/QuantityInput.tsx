type QuantityInputProps = {
  value: number;
  onChange?: (val: number) => void;
};

const QuantityInput = ({ value }: QuantityInputProps) => {
  return <div className="w-12 text-center font-medium">{value}</div>;
};
export default QuantityInput;

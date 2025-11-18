import './Value.scss';

type ValueProps = {
  value: string;
};

const Value = ({ value, ...props }: ValueProps) => {
  return (
    <div
      className="text-primary card__values"
      {...props}
    >
      {value}
    </div>
  );
};

export default Value;

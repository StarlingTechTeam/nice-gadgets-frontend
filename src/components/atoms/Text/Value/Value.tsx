import './Value.scss';

type ValueProps = {
  value: string;
  tech?: boolean;
};

const Value = ({ value, tech, ...props }: ValueProps) => {
  return (
    <div
      className={`text-primary ${tech ? 'card__values__lg' : 'card__values'}`}
      {...props}
    >
      {value}
    </div>
  );
};

export default Value;

import './Title.scss';

type TitleProps = {
  productName: string;
};

const Title = ({ productName }: TitleProps) => {
  return <span className="text-primary card__title">{productName}</span>;
};

export default Title;

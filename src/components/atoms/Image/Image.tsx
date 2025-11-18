import './Image.scss';
import cardImg from '../../../assets/img/phones/apple-iphone-xs/spacegray/00.webp';

const Image = () => {
  return (
    <div className="card__img-wrapper">
      <img
        className="card__img"
        src={cardImg}
      />
    </div>
  );
};

export default Image;

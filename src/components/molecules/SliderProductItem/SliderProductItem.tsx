import './SliderProductItem.scss';

interface SliderProductItemProps {
  image: string;
  title: string;
}

const SliderProductItem = ({ image, title }: SliderProductItemProps) => {
  return (
    <div className="product__slider__main-img cursor-pointer">
      <div className="slider-product-details__image-wrapper">
        <img
          src={image}
          alt={title}
          className="max-w-full max-h-full"
        />
      </div>
    </div>
  );
};

export default SliderProductItem;

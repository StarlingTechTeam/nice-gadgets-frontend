import { useState, type FC } from 'react';
import './SliderProductItem.scss';

interface SliderProductItemProps {
  image: string;
  title: string;
}

const SliderProductItem: FC<SliderProductItemProps> = ({ image, title }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = async () => {
    // Force loading state for 2 seconds to test the skeleton
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoaded(true);
  };

  return (
    <div className="product__slider__main-img cursor-pointer">
      <div className="slider-product-details__image-wrapper">
        <img
          src={image}
          alt={title}
          onLoad={handleLoad}
          className={`max-w-full max-h-full' ${loaded ? 'loaded' : 'hidden'}`}
        />
      </div>
    </div>
  );
};

export default SliderProductItem;

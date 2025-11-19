import { type FC } from 'react';

interface SliderHeroItemProps {
  image: string;
  imageMobile: string;
  title: string;
}

const SliderHeroItem: FC<SliderHeroItemProps> = ({
  image,
  imageMobile,
  title,
}) => {
  return (
    <div className="slider-hero__slide">
      <div className="slider-hero__image-wrapper">
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet={imageMobile}
          />
          <img
            src={image}
            alt={title}
          />
        </picture>
      </div>
    </div>
  );
};

export default SliderHeroItem;

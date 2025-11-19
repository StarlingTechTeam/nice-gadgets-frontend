import { type FC } from 'react';
import { Button } from '../../atoms/Button/Button';

interface SliderHeroButtonProps {
  direction: 'next' | 'prev';
  icon: string;
  className?: string;
}

const SliderHeroButton: FC<SliderHeroButtonProps> = ({
  direction,
  icon,
  className,
}) => {
  return (
    <Button
      variant="icon"
      className={`slider-hero__arrow slider-hero__arrow--${direction} ${className || ''}`}
      icon={
        <img
          src={icon}
          alt={direction === 'next' ? 'Next slide' : 'Previous slide'}
          className="slider-hero__arrow-icon"
        />
      }
    />
  );
};

export default SliderHeroButton;

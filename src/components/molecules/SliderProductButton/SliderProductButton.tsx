import { useRef, type FC } from 'react';
import Button from '@atoms/Button';
import './SliderProductButton.scss';

interface SliderProductButtonProps {
  direction: 'next' | 'prev';
  icon: string;
  className?: string;
}

const SliderProductButton: FC<SliderProductButtonProps> = ({
  direction,
  icon,
  className,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Button
      ref={btnRef}
      variant="icon"
      className={`slider-product-details__arrow slider-product-details__arrow--${direction} ${className || ''}`}
      icon={
        <img
          src={icon}
          alt={direction === 'next' ? 'Next slide' : 'Previous slide'}
          className="slider-product-details__arrow-icon"
        />
      }
    />
  );
};

export default SliderProductButton;

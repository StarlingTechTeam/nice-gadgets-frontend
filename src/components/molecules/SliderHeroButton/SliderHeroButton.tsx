import { type FC } from 'react';
import Button from '@atoms/Button';

interface SliderHeroButtonProps {
  direction: 'next' | 'prev';
  className?: string;
  baseClass?: string;
}

const SliderHeroButton: FC<SliderHeroButtonProps> = ({
  direction,
  className,
  baseClass = 'slider-hero',
}) => {
  return (
    <Button
      variant="icon"
      className={`
        ${baseClass}__arrow 
        ${baseClass}__arrow--${direction} 
        ${className || ''}
      `}
      icon={
        <span
          className={`${baseClass}__arrow-icon arrow-icon`}
          data-icon={direction}
        />
      }
    />
  );
};

export default SliderHeroButton;

import React from 'react';
import './Icon.scss';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  src,
  size = 16,
  className = '',
  style,
  ...rest
}) => {
  return (
    <div
      className={`icon-wrapper ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      {...rest}
    >
      <span
        className="icon"
        style={{
          display: 'inline-block',
          backgroundColor: 'var(--color-primary)',
          WebkitMaskImage: `url("${src}")`,
          maskImage: `url("${src}")`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
    </div>
  );
};

export default Icon;

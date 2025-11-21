import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import cn from 'classnames';
import './Button.scss';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'primary' | 'icon';
  icon?: React.ReactNode;
  isActive?: boolean;
};

const Button = ({
  children,
  variant = 'primary',
  icon,
  isActive,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn('btn', `btn-${variant}`, { 'is-active': isActive })}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

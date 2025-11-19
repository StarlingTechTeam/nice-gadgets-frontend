import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import './Button.scss';

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  icon?: React.ReactNode;
};

const Button = ({ children, variant, icon, ...props }: ButtonProps) => {
  return (
    <button
      className={`btn btn-${variant}`}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

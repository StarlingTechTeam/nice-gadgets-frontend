import './Button.scss';

type ButtonProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'icon';
  icon?: React.ReactNode;
};

export const Button = ({ children, variant, icon, ...props }: ButtonProps) => {
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

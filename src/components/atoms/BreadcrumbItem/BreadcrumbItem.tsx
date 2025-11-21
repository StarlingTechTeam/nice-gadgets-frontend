import './BreadcrumbItem.scss';
import { Link } from 'react-router-dom';
import cn from 'classnames';

export type BreadcrumbItemProps = {
  label: string;
  to?: string;
  icon?: boolean;
  isLast?: boolean;
};

const BreadcrumbItem = ({ label, to, icon, isLast }: BreadcrumbItemProps) => {
  const content = (
    <div className={cn('breadcrumb-item__content', { active: !isLast })}>
      {icon && <span className="breadcrumb-icon" />}
      {label && <span className="breadcrumb-item__label">{label}</span>}
    </div>
  );

  return (
    <div className="breadcrumb-item">
      {to && !isLast ?
        <Link to={to}>{content}</Link>
      : content}

      {!isLast && <span className="breadcrumb-separator" />}
    </div>
  );
};

export default BreadcrumbItem;

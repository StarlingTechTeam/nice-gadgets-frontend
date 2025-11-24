import { useLocation, useSearchParams } from 'react-router-dom';
import BreadcrumbItem, {
  type BreadcrumbItemProps,
} from '@atoms/BreadcrumbItem';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
  const location = useLocation();
  const [searcParams] = useSearchParams();
  const segments = location.pathname.split('/').filter(Boolean);

  const normalizeBreadcrumbText = (segment: string): string => {
    if (!segment) return '';

    const words: string[] = [];
    let current = '';

    for (const char of segment) {
      if (char === '-') {
        if (current) {
          words.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }

    if (current) words.push(current);

    return words.map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
  };

  const normalizeLabel = (segment: string, index: number, isLast: boolean) => {
    if (isLast) {
      const capacity = searcParams.get('capacity');
      const color = searcParams.get('color');

      if (capacity && color) {
        const fullSlug = `${segment}-${capacity}-${color}`;

        return normalizeBreadcrumbText(fullSlug);
      }

      return normalizeBreadcrumbText(segment);
    }

    const isCategory = index === 1;
    if (isCategory) {
      return segment[0].toUpperCase() + segment.slice(1);
    }

    return normalizeBreadcrumbText(segment);
  };

  const items: BreadcrumbItemProps[] = [
    { label: '', to: '/', icon: true },
    ...segments.map((segment, idx) => {
      const isLast = idx === segments.length - 1;
      const path = '/' + segments.slice(0, idx + 1).join('/');

      const toLink = isLast ? undefined : path;

      return {
        label: normalizeLabel(segment, idx + 1, isLast),
        to: toLink,
        icon: false,
      };
    }),
  ];

  return (
    <nav
      className="breadcrumbs"
      aria-label="Breadcrumbs"
    >
      {items.map((item, index) => (
        <BreadcrumbItem
          key={item.to ?? item.label}
          label={item.label}
          to={item.to}
          icon={item.icon}
          isLast={index === items.length - 1}
        />
      ))}
    </nav>
  );
};

export default Breadcrumbs;

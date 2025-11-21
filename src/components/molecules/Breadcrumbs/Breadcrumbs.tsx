import { useLocation } from 'react-router-dom';
import BreadcrumbItem, {
  type BreadcrumbItemProps,
} from '@/components/atoms/BreadcrumbItem/BreadcrumbItem';

const Breadcrumbs = () => {
  const location = useLocation();
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

  const normalizeLabel = (segment: string, index: number) => {
    const isCategory = index === 1;
    return isCategory ?
        segment[0].toUpperCase() + segment.slice(1)
      : normalizeBreadcrumbText(segment);
  };

  const items: BreadcrumbItemProps[] = [
    { label: '', to: '/', icon: true },
    ...segments.map((segment, idx) => {
      const path = '/' + segments.slice(0, idx + 1).join('/');

      return {
        label: normalizeLabel(segment, idx + 1),
        to: idx === segments.length - 1 ? undefined : path,
        icon: false,
      };
    }),
  ];

  return (
    <nav className="breadcrumbs">
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

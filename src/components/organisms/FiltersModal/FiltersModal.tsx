import { useEffect } from 'react';
import classNames from 'classnames';
import FiltersBar from '@organisms/FiltersBar';
import Button from '@atoms/Button';
import Icon from '@atoms/Icon';
import CloseIcon from '@assets/icons/close-icon.svg';
import type { ProductFilters, FilterOptions } from '@/types/ProductFilters';
import './FiltersModal.scss';

type FiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: ProductFilters;
  filterOptions: FilterOptions;
  category: string;
  onFiltersChange: (filters: ProductFilters) => void;
  allProducts?: import('@/types/ProductCard').ProductCard[];
};

const FiltersModal = ({
  isOpen,
  onClose,
  filters,
  filterOptions,
  category,
  onFiltersChange,
  allProducts = [],
}: FiltersModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="filters-modal__backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={classNames('filters-modal', {
          'filters-modal--open': isOpen,
        })}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        <div className="filters-modal__header">
          <h2 className="filters-modal__title">Filters</h2>
          <Button
            variant="icon"
            onClick={onClose}
            aria-label="Close filters"
            icon={<Icon src={CloseIcon} />}
          />
        </div>

        <div className="filters-modal__content">
          <FiltersBar
            filters={filters}
            filterOptions={filterOptions}
            category={category}
            onFiltersChange={onFiltersChange}
            vertical
            allProducts={allProducts}
          />
        </div>

        <div className="filters-modal__footer">
          <Button
            variant="primary"
            onClick={onClose}
            className="filters-modal__apply-btn"
          >
            Apply filters
          </Button>
        </div>
      </aside>
    </>
  );
};

export default FiltersModal;

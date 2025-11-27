import { useMemo, useState } from 'react';
import FilterSection from '@molecules/FilterSection';
import FilterCheckbox from '@atoms/FilterCheckbox';
import RangeSlider from '@atoms/RangeSlider';
import ColorSelectorModal from '@molecules/ColorSelectorModal';
import Button from '@atoms/Button';
import type { ProductFilters, FilterOptions } from '@/types/ProductFilters';
import { getAvailableFilterOptions } from '@/utils/getAvailableFilterOptions';
import './FiltersBar.scss';
import type { ProductCard } from '@/types/ProductCard';

type FiltersBarProps = {
  filters: ProductFilters;
  filterOptions: FilterOptions;
  category: string;
  onFiltersChange: (filters: ProductFilters) => void;
  vertical?: boolean;
  allProducts?: ProductCard[];
  showPriceOnly?: boolean;
  showOtherFiltersOnly?: boolean;
};

const FiltersBar = ({
  filters,
  filterOptions,
  category,
  onFiltersChange,
  vertical = false,
  allProducts = [],
  showPriceOnly = false,
  showOtherFiltersOnly = false,
}: FiltersBarProps) => {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const availableOptions = useMemo(() => {
    if (allProducts.length === 0) {
      return {
        availableRam: filterOptions.ram,
        availableCapacity: filterOptions.capacity,
        availableColor: filterOptions.color,
        availableSize: filterOptions.size,
        availableMatrixType: filterOptions.matrixType,
      };
    }
    return getAvailableFilterOptions(allProducts, category, filters);
  }, [allProducts, category, filters, filterOptions]);
  const handleRamChange = (ram: string, checked: boolean) => {
    const newRams =
      checked ? [...filters.ram, ram] : filters.ram.filter((r) => r !== ram);
    onFiltersChange({ ...filters, ram: newRams });
  };

  const handleCapacityChange = (capacity: string, checked: boolean) => {
    const newCapacities =
      checked ?
        [...filters.capacity, capacity]
      : filters.capacity.filter((c) => c !== capacity);
    onFiltersChange({ ...filters, capacity: newCapacities });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors =
      checked ?
        [...filters.color, color]
      : filters.color.filter((c) => c !== color);
    onFiltersChange({ ...filters, color: newColors });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes =
      checked ?
        [...filters.size, size]
      : filters.size.filter((s) => s !== size);
    onFiltersChange({ ...filters, size: newSizes });
  };

  const handleMatrixTypeChange = (matrixType: string, checked: boolean) => {
    const newMatrixTypes =
      checked ?
        [...filters.matrixType, matrixType]
      : filters.matrixType.filter((m) => m !== matrixType);
    onFiltersChange({ ...filters, matrixType: newMatrixTypes });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: range });
  };

  const hasActiveFilters = useMemo(() => {
    return (
      filters.ram.length > 0 ||
      filters.capacity.length > 0 ||
      filters.color.length > 0 ||
      filters.size.length > 0 ||
      filters.matrixType.length > 0 ||
      filters.priceRange[0] !== filterOptions.priceRange[0] ||
      filters.priceRange[1] !== filterOptions.priceRange[1]
    );
  }, [filters, filterOptions.priceRange]);

  const handleResetFilters = () => {
    onFiltersChange({
      ram: [],
      capacity: [],
      color: [],
      size: [],
      matrixType: [],
      priceRange: filterOptions.priceRange,
    });
  };

  return (
    <div
      className={`filters-bar ${vertical ? 'filters-bar--vertical' : ''} ${showPriceOnly ? 'filters-bar--price-only' : ''} ${showOtherFiltersOnly ? 'filters-bar--other-filters-only' : ''}`}
    >
      {showPriceOnly && !vertical && (
        <FilterSection
          title="Price"
          className="filters-bar__price-section"
        >
          <RangeSlider
            min={filterOptions.priceRange[0]}
            max={filterOptions.priceRange[1]}
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            step={10}
          />
        </FilterSection>
      )}

      {(showOtherFiltersOnly || vertical) && (
        <div className="filters-bar__content">
          {vertical && (
            <FilterSection
              title="Price"
              className="filters-bar__price-section"
            >
              <RangeSlider
                min={filterOptions.priceRange[0]}
                max={filterOptions.priceRange[1]}
                value={filters.priceRange}
                onChange={handlePriceRangeChange}
                step={10}
              />
            </FilterSection>
          )}

          {filterOptions.ram.length > 0 && (
            <>
              <FilterSection
                title="RAM"
                className="filters-bar__section"
              >
                <div className="filters-bar__checkboxes filters-bar__checkboxes--ram">
                  {filterOptions.ram.map((ram) => {
                    const isAvailable =
                      availableOptions.availableRam.includes(ram);
                    const isDisabled =
                      !isAvailable && !filters.ram.includes(ram);
                    return (
                      <FilterCheckbox
                        key={ram}
                        label={ram}
                        checked={filters.ram.includes(ram)}
                        onChange={(checked) => handleRamChange(ram, checked)}
                        disabled={isDisabled}
                      />
                    );
                  })}
                </div>
              </FilterSection>
              {!vertical && <div className="filters-bar__divider" />}
            </>
          )}

          {category !== 'accessories' && filterOptions.capacity.length > 0 && (
            <>
              <FilterSection
                title="Capacity"
                className="filters-bar__section"
              >
                <div className="filters-bar__checkboxes filters-bar__checkboxes--capacity">
                  {filterOptions.capacity.map((capacity) => {
                    const isAvailable =
                      availableOptions.availableCapacity.includes(capacity);
                    const isDisabled =
                      !isAvailable && !filters.capacity.includes(capacity);
                    return (
                      <FilterCheckbox
                        key={capacity}
                        label={capacity}
                        checked={filters.capacity.includes(capacity)}
                        onChange={(checked) =>
                          handleCapacityChange(capacity, checked)
                        }
                        disabled={isDisabled}
                      />
                    );
                  })}
                </div>
              </FilterSection>
              {!vertical && <div className="filters-bar__divider" />}
            </>
          )}

          {category === 'accessories' && filterOptions.size.length > 0 && (
            <>
              <FilterSection
                title="Size"
                className="filters-bar__section"
              >
                <div className="filters-bar__checkboxes filters-bar__checkboxes--size">
                  {filterOptions.size.map((size) => {
                    const isAvailable =
                      availableOptions.availableSize.includes(size);
                    const isDisabled =
                      !isAvailable && !filters.size.includes(size);
                    return (
                      <FilterCheckbox
                        key={size}
                        label={size}
                        checked={filters.size.includes(size)}
                        onChange={(checked) => handleSizeChange(size, checked)}
                        disabled={isDisabled}
                      />
                    );
                  })}
                </div>
              </FilterSection>
              {!vertical && <div className="filters-bar__divider" />}
            </>
          )}

          {filterOptions.matrixType.length > 0 && (
            <>
              <FilterSection
                title="Matrix Type"
                className="filters-bar__section"
              >
                <div className="filters-bar__checkboxes">
                  {filterOptions.matrixType.map((matrixType) => {
                    const isAvailable =
                      availableOptions.availableMatrixType.includes(matrixType);
                    const isDisabled =
                      !isAvailable && !filters.matrixType.includes(matrixType);
                    return (
                      <FilterCheckbox
                        key={matrixType}
                        label={matrixType}
                        checked={filters.matrixType.includes(matrixType)}
                        onChange={(checked) =>
                          handleMatrixTypeChange(matrixType, checked)
                        }
                        disabled={isDisabled}
                      />
                    );
                  })}
                </div>
              </FilterSection>
              {!vertical && <div className="filters-bar__divider" />}
            </>
          )}

          {filterOptions.color.length > 0 && (
            <FilterSection
              title="Color"
              className="filters-bar__section"
            >
              <Button
                variant="primary"
                onClick={() => setIsColorModalOpen(true)}
                className="filters-bar__color-button"
                isActive={filters.color.length > 0}
              >
                {filters.color.length > 0 ?
                  `${filters.color.length} selected`
                : 'Select colors'}
              </Button>
              <ColorSelectorModal
                isOpen={isColorModalOpen}
                onClose={() => setIsColorModalOpen(false)}
                colors={filterOptions.color}
                selectedColors={filters.color}
                onColorChange={handleColorChange}
                disabledColors={filterOptions.color.filter(
                  (color) => !availableOptions.availableColor.includes(color),
                )}
              />
            </FilterSection>
          )}

          {hasActiveFilters && (
            <button
              className={`filters-bar__reset ${vertical ? 'filters-bar__reset--vertical' : ''}`}
              onClick={handleResetFilters}
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FiltersBar;

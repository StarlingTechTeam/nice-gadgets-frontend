import { useState, useEffect, useRef } from 'react';
import { useCart } from '@hooks/useCart';
import {
  searchCities,
  getWarehouses,
  calculateDeliveryCost,
} from '@services/novaposhtaService';
import type { City, Warehouse } from '@services/novaposhtaService';
import type { ShippingAddress, ShippingMethod } from '@/types/CartItem';
import './ShippingSelector.scss';

const ShippingSelector = () => {
  const { subtotal, setShippingMethod, setShippingAddress } = useCart();

  const [cities, setCities] = useState<City[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null,
  );
  const [citySearch, setCitySearch] = useState<string>('');
  const [warehouseSearch, setWarehouseSearch] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingWarehouses, setIsLoadingWarehouses] = useState(false);
  const [isCalculatingCost, setIsCalculatingCost] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [errors, setErrors] = useState<{
    city?: string;
    warehouse?: string;
    name?: string;
    phone?: string;
  }>({});

  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const warehouseSelectRef = useRef<HTMLSelectElement>(null);
  const searchTimeoutRef = useRef<number | null>(null);
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+380\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    const searchTerm = citySearch ?? '';

    if (searchTerm.length < 2) {
      setCities([]);
      setShowCityDropdown(false);
      return;
    }

    if (selectedCity && searchTerm === selectedCity.Present) {
      setShowCityDropdown(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        setErrors((prev) => ({ ...prev, city: undefined }));

        const results = await searchCities(searchTerm);

        if (results.length === 0 && searchTerm.length >= 2) {
          setErrors((prev) => ({
            ...prev,
            city: 'No cities found. Use Cyrillic letters only.',
          }));
        }

        setCities(results);

        if (
          results.length > 0 &&
          document.activeElement === cityInputRef.current
        ) {
          setShowCityDropdown(true);
        }
      } catch (error) {
        console.error('Error searching cities:', error);
        setErrors((prev) => ({
          ...prev,
          city: 'Failed to search cities. Please try again.',
        }));
        setCities([]);
        setShowCityDropdown(false);
      } finally {
        setIsLoadingCities(false);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [citySearch, selectedCity]);

  useEffect(() => {
    if (!selectedCity) {
      setWarehouses([]);
      return;
    }

    const fetchWarehouses = async () => {
      try {
        setIsLoadingWarehouses(true);
        setErrors((prev) => ({ ...prev, warehouse: undefined }));

        const results = await getWarehouses(selectedCity.Ref);

        if (results.length === 0) {
          setErrors((prev) => ({
            ...prev,
            warehouse: 'No warehouses found in this city',
          }));
        }

        setWarehouses(results);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
        setErrors((prev) => ({
          ...prev,
          warehouse: 'Failed to load warehouses',
        }));
      } finally {
        setIsLoadingWarehouses(false);
      }
    };

    fetchWarehouses();
  }, [selectedCity]);

  useEffect(() => {
    if (!selectedCity || !selectedWarehouse) {
      setDeliveryCost(null);
      return;
    }

    const calculateCost = async () => {
      try {
        setIsCalculatingCost(true);

        const senderCityRef = 'db5c88e0-391c-11dd-90d9-001a92567626';
        const weight = 1;

        const cost = await calculateDeliveryCost(
          senderCityRef,
          selectedCity.Ref,
          weight,
          subtotal,
        );

        setDeliveryCost(cost);

        const shippingMethod: ShippingMethod = {
          id: 'novaposhta',
          name: 'Nova Poshta',
          description: `Delivery to ${selectedWarehouse.Description}`,
          price: cost,
          estimatedDays: '1-3',
          carrier: 'novaposhta',
        };

        setShippingMethod(shippingMethod);
      } catch (error) {
        console.error('Error calculating delivery cost:', error);
        setDeliveryCost(null);
      } finally {
        setIsCalculatingCost(false);
      }
    };

    calculateCost();
  }, [selectedCity, selectedWarehouse, subtotal, setShippingMethod]);

  useEffect(() => {
    if (
      !selectedCity ||
      !selectedWarehouse ||
      !recipientName ||
      !recipientPhone
    ) {
      return;
    }

    if (!validateName(recipientName) || !validatePhone(recipientPhone)) {
      return;
    }

    const address: ShippingAddress = {
      city: selectedCity.MainDescription,
      cityRef: selectedCity.Ref,
      warehouse: selectedWarehouse.Description,
      warehouseRef: selectedWarehouse.Ref,
      recipientName,
      recipientPhone,
    };

    setShippingAddress(address);
  }, [
    selectedCity,
    selectedWarehouse,
    recipientName,
    recipientPhone,
    setShippingAddress,
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (city: City) => {
    setCitySearch(city.Present);
    setSelectedCity(city);
    setShowCityDropdown(false);
    setCities([]);
    setSelectedWarehouse(null);
    setWarehouseSearch('');
    setErrors((prev) => ({ ...prev, city: undefined }));
  };

  const handleWarehouseSelect = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setWarehouseSearch('');
    setErrors((prev) => ({ ...prev, warehouse: undefined }));
  };

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCitySearch(value);

    if (selectedCity && value !== selectedCity.MainDescription) {
      setSelectedCity(null);
      setSelectedWarehouse(null);
      setWarehouses([]);
      setDeliveryCost(null);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipientName(value);

    if (value && !validateName(value)) {
      setErrors((prev) => ({
        ...prev,
        name: 'Name must be at least 2 characters',
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (!value.startsWith('+380')) {
      value = '+380';
    }

    value = '+380' + value.slice(4).replace(/\D/g, '').slice(0, 9);

    setRecipientPhone(value);

    if (value.length > 4 && !validatePhone(value)) {
      setErrors((prev) => ({
        ...prev,
        phone: 'Phone must be in format +380XXXXXXXXX',
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleClearCity = () => {
    setSelectedCity(null);
    setCitySearch('');
    setSelectedWarehouse(null);
    setWarehouses([]);
    setDeliveryCost(null);
    setErrors((prev) => ({ ...prev, city: undefined }));
    setTimeout(() => cityInputRef.current?.focus(), 0);
  };

  const handleClearWarehouse = () => {
    setSelectedWarehouse(null);
    setDeliveryCost(null);
    setWarehouseSearch('');
  };

  const filteredWarehouses =
    warehouses ?
      warehouseSearch.trim() ?
        warehouses.filter((warehouse) =>
          warehouse.Description.toLowerCase().includes(
            warehouseSearch.toLowerCase(),
          ),
        )
      : warehouses
    : [];

  useEffect(() => {
    if (
      selectedCity &&
      warehouses.length > 0 &&
      filteredWarehouses.length > 0 &&
      !selectedWarehouse &&
      warehouseSelectRef.current
    ) {
      setTimeout(() => {
        warehouseSelectRef.current?.focus();

        if ('showPicker' in HTMLSelectElement.prototype) {
          (warehouseSelectRef.current as HTMLSelectElement).showPicker?.();
        } else {
          warehouseSelectRef.current?.click();
        }
      }, 100);
    }
  }, [
    selectedCity,
    warehouses.length,
    filteredWarehouses.length,
    selectedWarehouse,
  ]);

  const isFormComplete =
    selectedCity &&
    selectedWarehouse &&
    recipientName &&
    recipientPhone &&
    validateName(recipientName) &&
    validatePhone(recipientPhone);

  return (
    <div className="shipping-selector">
      <h3 className="shipping-selector__title">Shipping Information</h3>

      <div
        className="shipping-selector__field"
        ref={cityDropdownRef}
      >
        <label className="shipping-selector__label">
          City <span className="shipping-selector__required">*</span>
        </label>
        <div className="shipping-selector__input-wrapper">
          <input
            ref={cityInputRef}
            type="text"
            className={`shipping-selector__input ${errors.city ? 'shipping-selector__input--error' : ''} ${selectedCity ? 'shipping-selector__input--filled' : ''}`}
            placeholder="Введіть назву міста (Kyiv, Lviv, Odesa...)"
            value={citySearch || ''}
            onChange={handleCityInputChange}
            onFocus={() => {
              if (cities.length > 0 && !selectedCity) {
                setShowCityDropdown(true);
              }
            }}
            onBlur={() => {
              setTimeout(() => {
                if (document.activeElement !== cityInputRef.current) {
                  setShowCityDropdown(false);
                }
              }, 200);
            }}
            disabled={isLoadingCities}
            autoComplete="off"
          />
          {isLoadingCities && <div className="shipping-selector__spinner" />}
          {selectedCity && !isLoadingCities && (
            <button
              type="button"
              className="shipping-selector__clear"
              onClick={handleClearCity}
              aria-label="Clear city"
            >
              ✕
            </button>
          )}
        </div>

        {showCityDropdown && cities.length > 0 && (
          <ul className="shipping-selector__dropdown">
            {cities.map((city) => (
              <li
                key={city.Ref}
                className="shipping-selector__dropdown-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleCitySelect(city);
                  cityInputRef.current?.focus();
                }}
              >
                <span className="shipping-selector__dropdown-name">
                  {city.MainDescription}
                </span>
                <span className="shipping-selector__dropdown-region">
                  {city.Area}
                </span>
              </li>
            ))}
          </ul>
        )}

        {errors.city && (
          <p className="shipping-selector__error">{errors.city}</p>
        )}

        <p className="shipping-selector__hint">
          Use Cyrillic letters only (Ukrainian)
        </p>
      </div>

      {selectedCity && (
        <div className="shipping-selector__field">
          <label className="shipping-selector__label">
            Nova Poshta Warehouse{' '}
            <span className="shipping-selector__required">*</span>
          </label>

          {isLoadingWarehouses ?
            <div className="shipping-selector__loading-state">
              <div className="shipping-selector__spinner" />
              <span>Loading warehouses...</span>
            </div>
          : warehouses && warehouses.length > 0 ?
            <>
              {warehouses && warehouses.length > 5 && (
                <div className="shipping-selector__search-wrapper">
                  <svg
                    className="shipping-selector__search-icon mb-2"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12.5 12.5L16 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    type="text"
                    className="shipping-selector__input shipping-selector__input--search"
                    placeholder={`Search in ${warehouses.length} warehouses...`}
                    value={warehouseSearch}
                    onChange={(e) => setWarehouseSearch(e.target.value)}
                    autoComplete="off"
                  />
                  <div className="flex items-center gap-2">
                    {warehouseSearch && (
                      <span className="shipping-selector__search-count">
                        {filteredWarehouses.length} found
                      </span>
                    )}
                    {warehouseSearch && (
                      <button
                        type="button"
                        className="shipping-selector__clear-search"
                        onClick={() => setWarehouseSearch('')}
                        aria-label="Clear search"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="shipping-selector__input-wrapper">
                <select
                  ref={warehouseSelectRef}
                  className={`shipping-selector__select ${selectedWarehouse ? 'shipping-selector__select--filled' : ''}`}
                  value={selectedWarehouse ? selectedWarehouse.Ref : ''}
                  onChange={(e) => {
                    const warehouse = warehouses.find(
                      (w) => w.Ref === e.target.value,
                    );
                    if (warehouse) handleWarehouseSelect(warehouse);
                  }}
                >
                  <option value="">
                    {filteredWarehouses.length === 0 ?
                      'No warehouses match your search'
                    : `Select warehouse (${filteredWarehouses.length} available)...`
                    }
                  </option>
                  {filteredWarehouses.map((warehouse) => (
                    <option
                      key={warehouse.Ref}
                      value={warehouse.Ref}
                    >
                      {warehouse.Description}
                    </option>
                  ))}
                </select>
                {selectedWarehouse && (
                  <button
                    type="button"
                    className="shipping-selector__clear shipping-selector__clear--select"
                    onClick={handleClearWarehouse}
                    aria-label="Clear warehouse"
                  >
                    ✕
                  </button>
                )}
              </div>

              {warehouseSearch && filteredWarehouses.length === 0 && (
                <div className="shipping-selector__no-results">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M21 21L16.65 16.65"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 11H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p>No warehouses match &quot;{warehouseSearch}&quot;</p>
                  <button
                    type="button"
                    onClick={() => setWarehouseSearch('')}
                    className="shipping-selector__clear-search-btn"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </>
          : <p className="shipping-selector__no-results-initial">
              No warehouses available in this city
            </p>
          }

          {errors.warehouse && (
            <p className="shipping-selector__error">{errors.warehouse}</p>
          )}
        </div>
      )}

      <div className="shipping-selector__field">
        <label className="shipping-selector__label">
          Recipient Name <span className="shipping-selector__required">*</span>
        </label>
        <input
          type="text"
          className={`shipping-selector__input ${errors.name ? 'shipping-selector__input--error' : ''}`}
          placeholder="Full name (e.g., Іван Петренко)"
          value={recipientName}
          onChange={handleNameChange}
          maxLength={50}
        />
        {errors.name && (
          <p className="shipping-selector__error">{errors.name}</p>
        )}
      </div>

      <div className="shipping-selector__field">
        <label className="shipping-selector__label">
          Phone Number <span className="shipping-selector__required">*</span>
        </label>
        <input
          type="tel"
          className={`shipping-selector__input ${errors.phone ? 'shipping-selector__input--error' : ''}`}
          placeholder="+380XXXXXXXXX"
          value={recipientPhone}
          onChange={handlePhoneChange}
          maxLength={13}
        />
        <p className="shipping-selector__hint">
          Format: +380 followed by 9 digits
        </p>
        {errors.phone && (
          <p className="shipping-selector__error">{errors.phone}</p>
        )}
      </div>

      {deliveryCost !== null && (
        <div className="shipping-selector__cost-display">
          <div className="shipping-selector__cost-header">
            <span className="shipping-selector__cost-label">Delivery Cost</span>
            {isCalculatingCost && (
              <span className="shipping-selector__calculating">
                Calculating...
              </span>
            )}
          </div>
          <div className="shipping-selector__cost-value">
            {deliveryCost.toFixed(2)} ₴
          </div>
          {selectedCity && selectedWarehouse && (
            <div className="shipping-selector__cost-details">
              <p className="shipping-selector__cost-route">
                📍 Kyiv → {selectedCity.MainDescription}
              </p>
              <p className="shipping-selector__cost-warehouse">
                📦 {selectedWarehouse.Description}
              </p>
              <p className="shipping-selector__cost-time">
                ⏱️ Estimated delivery: 1-3 business days
              </p>
            </div>
          )}
        </div>
      )}

      <div className="shipping-selector__status">
        {isFormComplete ?
          <div className="shipping-selector__status-complete">
            ✓ Shipping information complete
          </div>
        : <div className="shipping-selector__status-incomplete">
            ℹ️ Please complete all fields to proceed
          </div>
        }
      </div>
    </div>
  );
};

export default ShippingSelector;

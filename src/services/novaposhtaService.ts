const NOVAPOSHTA_API_KEY = import.meta.env.VITE_NOVAPOSHTA_API_KEY;
const NOVAPOSHTA_API_URL = 'https://api.novaposhta.ua/v2.0/json/';

interface NovaPoshtaResponse<T> {
  success: boolean;
  data: T[];
  errors: string[];
  warnings: string[];
  info: string[];
}

export interface ResponseProps {
  AddressDeliveryAllowed: boolean;
  Area: string;
  DeliveryCity: string;
  MainDescription: string;
  ParentRegionCode: string;
  ParentRegionTypes: string;
  Present: string;
  Ref: string;
  Region: string;
  RegionTypes: string;
  RegionTypesCode: string;
  SettlementTypeCode: string;
  StreetsAvailability: boolean;
  Warehouses: number;
}

export interface City {
  Ref: string;
  MainDescription: string;
  Area: string;
  DeliveryCity: string;
  Present: string;
  SettlementTypeDescription?: string;
}

export interface Warehouse {
  Ref: string;
  Description: string;
  DescriptionRu: string;
  Number: string;
  CityRef: string;
  CategoryOfWarehouse: string;
  SettlementRef: string;
}

export interface DeliveryCost {
  Cost: number;
  AssessedCost: number;
}

const sanitizeCityName = (input: string): string => {
  return input
    .trim()
    .replace(/[^А-Яа-яЁёІіЇїЄєҐґ\s\-']/g, '')
    .replace(/\s+/g, ' ');
};

interface SettlementSearchData {
  TotalCount: string;
  Addresses: City[];
}

export const searchCities = async (cityName: string): Promise<City[]> => {
  if (!cityName || cityName.length < 2) {
    return [];
  }

  const sanitizedName = sanitizeCityName(cityName);

  if (!sanitizedName || sanitizedName.length < 2) {
    console.warn('City name contains invalid characters');
    return [];
  }

  try {
    const response = await fetch(NOVAPOSHTA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: NOVAPOSHTA_API_KEY,
        modelName: 'Address',
        calledMethod: 'searchSettlements',
        methodProperties: {
          CityName: sanitizedName,
          Limit: 10,
        },
      }),
    });

    const result: NovaPoshtaResponse<SettlementSearchData> =
      await response.json();

    if (!result.success) {
      console.error('Nova Poshta API Error:', result.errors);
      return [];
    }

    if (!result.data || result.data.length === 0) {
      return [];
    }

    const addresses = result.data[0]?.Addresses || [];
    return addresses;
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

export const getWarehouses = async (cityRef: string): Promise<Warehouse[]> => {
  if (!cityRef) {
    return [];
  }

  try {
    const response = await fetch(NOVAPOSHTA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: NOVAPOSHTA_API_KEY,
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          SettlementRef: cityRef,
          Limit: 100,
        },
      }),
    });

    const result: NovaPoshtaResponse<Warehouse> = await response.json();

    if (!result.success) {
      console.error('Nova Poshta API Error:', result.errors);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    return [];
  }
};

export const calculateDeliveryCost = async (
  citySenderRef: string,
  cityRecipientRef: string,
  weight: number,
  cost: number,
): Promise<number> => {
  try {
    const response = await fetch(NOVAPOSHTA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: NOVAPOSHTA_API_KEY,
        modelName: 'InternetDocument',
        calledMethod: 'getDocumentPrice',
        methodProperties: {
          CitySender: citySenderRef,
          CityRecipient: cityRecipientRef,
          Weight: weight.toString(),
          ServiceType: 'WarehouseWarehouse',
          Cost: cost.toString(),
          CargoType: 'Cargo',
          SeatsAmount: '1',
        },
      }),
    });

    const result: NovaPoshtaResponse<DeliveryCost> = await response.json();

    if (!result.success) {
      console.error('Nova Poshta cost calculation error:', result.errors);
      return 50;
    }

    return result.data[0]?.Cost || 50;
  } catch (error) {
    console.error('Error calculating delivery cost:', error);
    return 50;
  }
};

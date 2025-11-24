import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Fragment, useEffect, useMemo } from 'react';
import data from '@/shared/api/data/phones.json';
import Divider from '@atoms/Divider';
import Price from '@atoms/Price';
import AddToFavButton from '@molecules/AddToFavButton';
import AddToCartButton from '@molecules/AddToCartButton';
import Breadcrumbs from '@molecules/Breadcrumbs';
import ProductSpecRow from '@molecules/ProductCardParams';
import SliderHero from '@organisms/SliderHero';
import { useTheme } from '@/hooks/useTheme';
import { formatCapacityOrRAM, normalizeScreenQuote } from '@/utills/formatting';
import './ProductDetailsPage.scss';
import SliderProductDetails from '@/components/organisms/SliderProductDetails';

type Param = string | number;
type Params = {
  [key: string]: Param | null;
};

const getSearchWith = (
  params: Params,
  search?: string | URLSearchParams,
): string => {
  const newParams = new URLSearchParams(search);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
};

const COLOR_MAP: Record<string, string> = {
  rosegold: '#E0BFB8',
};

const ProductDetailsPage = () => {
  const { theme } = useTheme();

  const { productId: urlProductId, categoryType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  let initialCapacity = searchParams.get('capacity');
  let initialColor = searchParams.get('color');

  const slugParts = urlProductId?.split('-');

  if (
    urlProductId &&
    !initialCapacity &&
    !initialColor &&
    slugParts &&
    slugParts?.length > 2
  ) {
    const lastPart = slugParts[slugParts.length - 1];
    const secondToLastPart = slugParts[slugParts.length - 2];

    initialCapacity = secondToLastPart;
    initialColor = lastPart;
  }

  const tempFullId = urlProductId;

  const product = useMemo(() => {
    let foundProduct = null;

    if (tempFullId) {
      foundProduct = data.find((p) => p.id === tempFullId);
    }

    if (!foundProduct && initialCapacity && initialColor) {
      const namespaceId = urlProductId?.replace(
        `-${initialCapacity}-${initialColor}`,
        '',
      );

      foundProduct = data.find((p) => {
        return (
          p.namespaceId === namespaceId &&
          p.capacity?.toLowerCase() === initialCapacity?.toLowerCase() &&
          p.color?.toLowerCase() === initialColor?.toLowerCase()
        );
      });
    }

    if (!foundProduct) {
      const baseNamespaceId = urlProductId?.split('-').slice(0, -2).join('-');

      foundProduct = data.find((p) => {
        return (
          urlProductId?.includes(p.namespaceId) ||
          (baseNamespaceId && p.namespaceId === baseNamespaceId)
        );
      });
    }

    return foundProduct;
  }, [tempFullId, initialCapacity, initialColor, urlProductId]);

  const currentCapacity =
    searchParams.get('capacity') || product?.capacity || null;
  const currentColor = searchParams.get('color') || product?.color || null;

  const updateSearchParams = (params: Params) => {
    const search = getSearchWith(params, searchParams);
    setSearchParams(search);
  };

  const handleProductColorChange = (value: string) => {
    updateSearchParams({ color: value || null });
  };

  const handleProductCapacityChange = (value: string) => {
    updateSearchParams({ capacity: value || null });
  };

  useEffect(() => {
    if (!product) return;

    const currentCategory = categoryType || product.category;
    const expectedPathname = `/${currentCategory}/${product.namespaceId}`;

    const newSearchParams = new URLSearchParams();
    if (currentCapacity) {
      newSearchParams.set('capacity', currentCapacity);
    }
    if (currentColor) {
      newSearchParams.set('color', currentColor);
    }
    const expectedSearch = newSearchParams.toString();

    const currentPathname = location.pathname.replace('#', '');
    const currentSearch = location.search.substring(1);

    if (
      currentPathname !== expectedPathname ||
      currentSearch !== expectedSearch
    ) {
      navigate(`${expectedPathname}?${expectedSearch}`, { replace: true });
    }
  }, [
    product,
    categoryType,
    currentCapacity,
    currentColor,
    location.pathname,
    navigate,
    location.search,
  ]);

  if (!product) {
    return (
      <div className="inline-wrapper">
        <div className="text-primary">Product Not Found</div>
      </div>
    );
  }

  const mainSpecifications = [
    { key: 'Screen', value: normalizeScreenQuote(product.screen) },
    { key: 'Resolution', value: product.resolution },
    { key: 'Processor', value: product.processor },
    { key: 'RAM', value: formatCapacityOrRAM(product.ram) },
  ];

  const techSpecifications = [
    { key: 'Screen', value: normalizeScreenQuote(product.screen) },
    { key: 'Resolution', value: product.resolution },
    { key: 'Processor', value: product.processor },
    { key: 'RAM', value: formatCapacityOrRAM(product.ram) },
    { key: 'Built in memory', value: product.capacity },
    { key: 'Camera', value: product.camera },
    { key: 'Zoom', value: product.zoom },
    { key: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <div className="inline-wrapper mt-6">
      <Breadcrumbs />
      <button
        className="text-secondary mb-4 hover:cursor-pointer"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <span className="text-primary">{'<'}</span> Back
      </button>

      <h2 className="text-primary mb-8">{product.name}</h2>

      <div className="product mb-14">
        <div className="product__slider">
          <SliderProductDetails
            slides={product.images}
            productName="Product Images"
          />
        </div>
        <div className="product__info">
          <div className="product__info-wrapper flex flex-col justify-between">
            <div className="colors mb-6">
              <div className="avaiable-colors flex flex-col gap-2">
                <p className="text-secondary">Available colors</p>
                <div
                  className="flex gap-2"
                  role="group"
                  aria-label="Color options"
                >
                  {product.colorsAvailable.map((color) => {
                    const displayColor = COLOR_MAP[color] || color;
                    return (
                      <button
                        key={color}
                        className={`border-2 rounded-full cursor-pointer ${currentColor === color ? 'border-primary' : 'border-border'}`}
                        onClick={() => handleProductColorChange(color)}
                        aria-label={`Select ${color} color`}
                      >
                        <div
                          style={{ backgroundColor: displayColor }}
                          className="w-[30px] h-[30px] rounded-full border-2 border-background"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <Divider />

            {/* Capacity Selection */}
            <div className="capacity my-6">
              <div className="avaiable-capacity flex flex-col gap-2">
                <p className="text-secondary">Select capacity</p>
                <div
                  className="flex gap-2"
                  role="group"
                  aria-label="Capacity options"
                >
                  {product.capacityAvailable.map((capacity) => (
                    <button
                      key={capacity}
                      className={`option cursor-pointer ${capacity === currentCapacity ? 'selected' : ''} ${theme === 'dark' ? 'text-primary' : ''}`}
                      onClick={() => handleProductCapacityChange(capacity)}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Divider />

            <div className="mt-8 mb-4">
              <Price
                price={product.priceDiscount}
                fullPrice={product.priceRegular}
              />
            </div>

            <div className="flex w-full mb-8 gap-2">
              <AddToCartButton />
              <AddToFavButton />
            </div>

            <div className="div flex flex-col gap-2">
              {mainSpecifications.map((spec) => (
                <ProductSpecRow
                  key={spec.key}
                  specKey={spec.key}
                  specValue={spec.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="product__description">
        <div className="description-item item-1 flex flex-col gap-8 mb-14">
          <div>
            <h3 className="text-primary mb-4">About</h3>

            <Divider />
          </div>

          {product.description.map(({ title, text }) => (
            <div key={title}>
              <h4 className="text-primary mb-4">{title}</h4>

              {text.map((paragraph) => (
                <Fragment key={paragraph}>
                  <p className="text-secondary">{paragraph}</p>
                  <br />
                </Fragment>
              ))}
            </div>
          ))}
        </div>
        <div className="description-item item-2 w-full mb-14">
          <div className="mb-[30px]">
            <h3 className="text-primary mb-4">Tech specs</h3>
            <Divider />
          </div>
          <div className="flex flex-col gap-2">
            {techSpecifications.map((spec) => (
              <ProductSpecRow
                key={spec.key}
                specKey={spec.key}
                specValue={spec.value}
                tech={true}
              />
            ))}
          </div>
        </div>
      </div>
      <SliderHero />
    </div>
  );
};

export default ProductDetailsPage;

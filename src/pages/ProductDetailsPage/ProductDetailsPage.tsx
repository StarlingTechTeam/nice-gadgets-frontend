import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { productDetailsApi } from '@/shared/api/productDetailsApi';
import type { ProductDetails } from '@/types/ProductDetails';

import Breadcrumbs from '@molecules/Breadcrumbs';
import ProductMainInfo from '@organisms/ProductMainInfo';
import ProductDescription from '@organisms/ProductDescription';
import ProductTechSpecs from '@organisms/ProductTechSpecs';
import ProductImageSlider from '@organisms/ProductImageSlider';
import './ProductDetailsPage.scss';
import { getMainSpecs, getTechSpecs } from '@utils/specBuilder';
import RecomendedProductSlider from '@organisms/RecomendedProductSlider';
import Icon from '@atoms/Icon';
import arrowLeftIcon from '@assets/icons/arrow-left.svg';

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

const ProductDetailsPage = () => {
  const [data, setData] = useState<ProductDetails[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { productId: urlProductId, categoryType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    productDetailsApi
      .getAll()
      .then((all) => mounted && setData(all))
      .catch(() => setData([]))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  let initialCapacity = searchParams.get('capacity');
  let initialColor = searchParams.get('color');

  const slugParts = urlProductId?.split('-');
  if (
    urlProductId &&
    !initialCapacity &&
    !initialColor &&
    slugParts &&
    slugParts.length > 2
  ) {
    const lastPart = slugParts[slugParts.length - 1];
    const secondToLastPart = slugParts[slugParts.length - 2];
    initialCapacity = secondToLastPart;
    initialColor = lastPart;
  }

  const tempFullId = urlProductId;

  const product: ProductDetails | undefined = (() => {
    if (!data || !urlProductId) return undefined;

    let foundProduct: ProductDetails | undefined;
    if (tempFullId) foundProduct = data.find((p) => p.id === tempFullId);

    if (!foundProduct && initialCapacity && initialColor) {
      const namespaceId = urlProductId.replace(
        `-${initialCapacity}-${initialColor}`,
        '',
      );
      foundProduct = data.find(
        (p) =>
          p.namespaceId === namespaceId &&
          p.capacity?.toLowerCase() === initialCapacity?.toLowerCase() &&
          p.color?.toLowerCase() === initialColor?.toLowerCase(),
      );
    }

    if (!foundProduct) {
      const baseNamespaceId = urlProductId.split('-').slice(0, -2).join('-');
      foundProduct = data.find(
        (p) =>
          (p.namespaceId && urlProductId.includes(p.namespaceId)) ||
          (baseNamespaceId && p.namespaceId === baseNamespaceId),
      );
    }

    return foundProduct;
  })();

  const currentCapacity =
    product ? searchParams.get('capacity') || product.capacity || null : null;
  const currentColor =
    product ? searchParams.get('color') || product.color || null : null;

  useEffect(() => {
    if (!product) return;

    const currentCategory = (categoryType as string) || product.category;
    const expectedPathname = `/${currentCategory}/${product.namespaceId}`;

    const newSearchParams = new URLSearchParams();
    if (currentCapacity) newSearchParams.set('capacity', currentCapacity);
    if (currentColor) newSearchParams.set('color', currentColor);

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

  const recommendedProducts = useMemo(() => {
    if (!data || !product) return [];

    let filtered = data.filter(
      (p) =>
        p.category === product.category &&
        p.namespaceId !== product.namespaceId,
    );

    for (let i = filtered.length - 1; i > 0; i--) {
      // eslint-disable-next-line react-hooks/purity
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    filtered = filtered.slice(0, 12);

    return filtered.map((item) => {
      const numericHash = item.id.split('').reduce((acc, char) => {
        return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
      }, 0);

      return {
        id: Math.abs(numericHash),
        name: item.name,
        fullPrice: item.priceRegular,
        price: item.priceDiscount,
        screen: item.screen.replace(/(\d+\.\d+).*?(XDR|OLED).*/, '$1 $2'),
        capacity: item.capacity,
        ram: item.ram,
        image: item.images[0],
        category: item.category,
        itemId: item.id,
        color: item.color,
        year: 2022,
      };
    });
  }, [data, product]);

  if (!product && !loading) {
    return (
      <div className="inline-wrapper">
        <div className="text-primary">Product Not Found</div>
      </div>
    );
  }

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

  const mainSpecifications = getMainSpecs(product ?? null);

  const techSpecifications = getTechSpecs(product ?? null);

  return (
    <div
      className="inline-wrapper mt-6"
      id="product-details-page"
    >
      <nav aria-label="Breadcrumbs">
        <Breadcrumbs />
      </nav>

      <button
        className="text-secondary mb-4 hover:cursor-pointer go-back"
        onClick={() => window.history.back()}
        aria-label="Go back to category"
      >
        <Icon src={arrowLeftIcon} />
        <span>Back</span>
      </button>

      <h2 className="text-primary mb-8">
        {loading ?
          <Skeleton width={300} />
        : product?.name}
      </h2>

      <div className="product mb-14">
        <ProductImageSlider
          loading={loading}
          slides={product?.images ?? []}
        />
        <ProductMainInfo
          loading={loading}
          product={product}
          mainSpecifications={mainSpecifications}
          currentColor={currentColor}
          currentCapacity={currentCapacity}
          onColorChange={handleProductColorChange}
          onCapacityChange={handleProductCapacityChange}
        />
      </div>

      <div className="product__description">
        <ProductDescription
          loading={loading}
          description={product?.description ?? []}
        />
        <ProductTechSpecs
          loading={loading}
          specifications={techSpecifications}
        />
      </div>

      <RecomendedProductSlider
        products={recommendedProducts}
        sliderId="Recomended"
        title="You may also like"
      />
    </div>
  );
};

export default ProductDetailsPage;

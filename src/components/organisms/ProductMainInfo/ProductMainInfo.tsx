import Divider from '@atoms/Divider';
import Price from '@atoms/Price';
import AddToCartButton from '@molecules/AddToCartButton';
import AddToFavButton from '@molecules/AddToFavButton';
import CapacitySelector from '@molecules/CapacitySelector';
import ColorSelector from '@molecules/ColorSelector';
import ProductSpecRow from '@molecules/ProductCardParams';
import type { ProductDetails } from '@/types/ProductDetails';
import Skeleton from 'react-loading-skeleton';
import './ProductMainInfo.scss';

type ProductMainInfoProps = {
  loading: boolean;
  product: ProductDetails | undefined;
  mainSpecifications: {
    key: string;
    value: string;
  }[];
  currentColor: string | null;
  currentCapacity: string | null;
  onColorChange: (value: string) => void;
  onCapacityChange: (value: string) => void;
};

const ProductMainInfo = ({
  loading,
  product,
  mainSpecifications,
  currentColor,
  currentCapacity,
  onColorChange,
  onCapacityChange,
}: ProductMainInfoProps) => {
  return (
    <div
      className="product__info"
      aria-labelledby="product-title"
    >
      <div className="product__info-wrapper flex flex-col justify-between">
        <div className="colors mb-6">
          <ColorSelector
            loading={loading}
            colors={product?.colorsAvailable || []}
            currentColor={currentColor}
            onChange={onColorChange}
          />
        </div>

        <Divider />

        <div className="capacity my-6">
          <CapacitySelector
            loading={loading}
            capacities={product?.capacityAvailable || []}
            currentCapacity={currentCapacity}
            onChange={onCapacityChange}
          />
        </div>

        <Divider />

        <div className="mt-8 mb-4">
          {loading ?
            <Skeleton
              width={70}
              height={28}
            />
          : <Price
              price={product?.priceDiscount ?? 0}
              fullPrice={product?.priceRegular}
            />
          }
        </div>

        <div className="flex w-full mb-8 gap-2">
          {loading ?
            <>
              <Skeleton
                height={40}
                width={260}
              />
              <Skeleton
                height={40}
                width={48}
              />
            </>
          : <>
              <AddToCartButton product={product} />
              <AddToFavButton product={product} />
            </>
          }
        </div>

        <div className="flex flex-col gap-2">
          {mainSpecifications.map((spec, idx) =>
            loading ?
              <Skeleton
                key={idx}
                height={24}
              />
            : <ProductSpecRow
                key={spec.key}
                specKey={spec.key}
                specValue={spec.value}
              />,
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductMainInfo;

import Divider from '@atoms/Divider';
import ProductSpecRow from '@molecules/ProductCardParams';
import Skeleton from 'react-loading-skeleton';

type Spec = { key: string; value: string };

type ProductTechSpecsProps = {
  loading: boolean;
  specifications: Spec[];
};

const ProductTechSpecs = ({
  loading,
  specifications,
}: ProductTechSpecsProps) => {
  return (
    <div className="item-2 w-full mb-14">
      <div className="mb-[30px]">
        <h3 className="text-primary mb-4">
          {loading ?
            <Skeleton width={120} />
          : 'Tech specs'}
        </h3>
        <Divider />
      </div>

      <div className="flex flex-col gap-2">
        {specifications.map((spec, idx) =>
          loading ?
            <Skeleton
              key={idx}
              height={24}
            />
          : <ProductSpecRow
              key={spec.key}
              specKey={spec.key}
              specValue={spec.value!}
              tech={true}
            />,
        )}
      </div>
    </div>
  );
};
export default ProductTechSpecs;

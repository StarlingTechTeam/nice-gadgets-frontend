import Divider from '@atoms/Divider';
import { skeletonArray } from '@utils/skeletonArray';
import Skeleton from 'react-loading-skeleton';
import { Fragment } from 'react/jsx-runtime';

type DescriptionItem = {
  title: string;
  text: string[];
};

type ProductDescriptionProps = {
  loading: boolean;
  description: DescriptionItem[];
};

const ProductDescription = ({
  loading,
  description,
}: ProductDescriptionProps) => {
  return (
    <div className="item-1 flex flex-col gap-8 mb-14">
      <div>
        <h3 className="text-primary mb-4">
          {loading ?
            <Skeleton width={120} />
          : 'About'}
        </h3>
        <Divider />
      </div>

      {loading ?
        skeletonArray(2).map((_, i) => (
          <Fragment key={i}>
            <Skeleton
              style={{ minWidth: '320px' }}
              width={600}
              height={25}
              className="mb-4"
            />
            <Skeleton count={3} />
          </Fragment>
        ))
      : description.map(({ title, text }) => (
          <div key={title}>
            <h4 className="text-primary mb-4">{title}</h4>

            {text.map((paragraph) => (
              <Fragment key={paragraph}>
                <p className="text-secondary">{paragraph}</p>
                <br />
              </Fragment>
            ))}
          </div>
        ))
      }
    </div>
  );
};
export default ProductDescription;

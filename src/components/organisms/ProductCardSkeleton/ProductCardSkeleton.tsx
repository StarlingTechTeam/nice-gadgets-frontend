import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './ProductCardSkeleton.scss';

const ProductCardSkeleton = () => {
  return (
    <div className="card skeleton-card">
      <div className="skeleton-card__img">
        <Skeleton
          height={190}
          width={200}
        />
      </div>

      <div className="add-to-fav-btn absolute">
        <Skeleton
          width={32}
          height={32}
          circle
        />
      </div>

      <div className="card__title-wrapper">
        <Skeleton
          width={'90%'}
          height={24}
        />
      </div>

      <Skeleton
        width={'60%'}
        height={28}
      />

      <Skeleton height={1} />

      <div className="card__product-parameters">
        <Skeleton
          height={20}
          width={'100%'}
          count={3}
        />
      </div>

      <Skeleton
        height={40}
        width={'100%'}
        style={{ marginTop: '8px' }}
      />
    </div>
  );
};

export default ProductCardSkeleton;

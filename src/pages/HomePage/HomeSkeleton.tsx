import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './HomePage.scss';

const HomePageSkeleton = () => {
  return (
    <div className="homepage-skeleton inline-wrapper">
      <div className="mt-8 mb-4">
        <Skeleton
          width={260}
          height={36}
        />
      </div>

      <Skeleton
        height={400}
        className="mb-12"
      />

      <Skeleton
        width={240}
        height={32}
        className="mb-6"
      />

      <div className="category-block">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="category-item"
          >
            <Skeleton
              height={180}
              className="mb-4"
            />
            <Skeleton
              width={150}
              height={24}
              className="mb-2"
            />
            <Skeleton
              width={80}
              height={20}
            />
          </div>
        ))}
      </div>

      <Skeleton
        width={220}
        height={32}
        className="my-6"
      />
      <Skeleton height={350} />

      <Skeleton
        width={180}
        height={32}
        className="my-6"
      />
      <Skeleton height={350} />
    </div>
  );
};

export default HomePageSkeleton;

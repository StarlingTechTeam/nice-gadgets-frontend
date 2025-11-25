import HomePageTitle from '@/components/atoms/HomePageTitle';
import './HomePage.scss';
import { useEffect, useState } from 'react';
import { productDetailsApi } from '@/shared/api/productDetailsApi';
import SliderHero from '@/components/organisms/SliderHero';
import { Link } from 'react-router-dom';
import HomePageSkeleton from './HomeSkeleton';

type CategoryCounts = {
  phones: number;
  tablets: number;
  accessories: number;
};

const HomePage = () => {
  const [counts, setCounts] = useState<CategoryCounts>({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [phones, tablets, accessories] = await Promise.all([
          productDetailsApi.getByCategory('phones'),
          productDetailsApi.getByCategory('tablets'),
          productDetailsApi.getByCategory('accessories'),
        ]);

        setCounts({
          phones: phones.length,
          tablets: tablets.length,
          accessories: accessories.length,
        });
      } catch (err) {
        console.error('Failed to fetch product counts', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      <div className="inline-wrapper">
        <HomePageTitle />
      </div>
      <div className="homepage-block__wrapper">
        <div className="inline-wrapper">
          <SliderHero />
        </div>
        <div className="text-primary text-2xl inline-wrapper homepage-category">
          <div className="homepage__section-title__wrapper">
            <h2 className="homepage__section-title">Brand new models</h2>
          </div>
          <div className="h-[352px] bg-gray-500 text-center leading-[352px] text-2xl">
            Brand new models
          </div>
        </div>
        <div className="text-primary text-2xl inline-wrapper homepage-category">
          <div className="homepage__section-title__wrapper">
            <h2 className="homepage__section-title">Shop by category</h2>
          </div>
          <div className="category-block">
            <Link
              to={'./phones'}
              className="category-item"
            >
              <div className="category-item__image-block image-block-1"></div>
              <div className="category-item__text-block">
                <h4 className="homepage__category-title">Mobile phones</h4>
                <span className="homepage__category-subtitle text-secondary">
                  {counts.phones} models
                </span>
              </div>
            </Link>
            <Link
              to={'./tablets'}
              className="category-item"
            >
              <div className="category-item__image-block image-block-2"></div>
              <div className="category-item__text-block">
                <h4 className="homepage__category-title text-primary">
                  Tablets
                </h4>
                <span className="homepage__category-subtitle text-secondary">
                  {counts.tablets} models
                </span>
              </div>
            </Link>
            <Link
              to={'./accessories'}
              className="category-item"
            >
              <div className="category-item__image-block image-block-3"></div>
              <div className="category-item__text-block">
                <h4 className="homepage__category-title text-primary">
                  Accessories
                </h4>
                <span className="homepage__category-subtitle text-secondary">
                  {counts.accessories} models
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className="text-primary text-2xl inline-wrapper">
          <div className="homepage__section-title__wrapper">
            <h2 className="homepage__section-title">Hot prices</h2>
          </div>
          <div className="h-[352px] bg-gray-500 text-center leading-[352px] text-2xl">
            Hot prices
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;

import { useEffect, useState } from 'react';
import HomePageTitle from '@atoms/HomePageTitle';
import SliderHero from '@organisms/SliderHero';
import CategorySection from '@organisms/CategorySection';
import NewModelsSlider from '@organisms/NewModelsSlider/';
import HotPricesSlider from '@organisms/HotPricesSlider';
import HomePageSkeleton from './HomeSkeleton';
import { productDetailsApi } from '@/shared/api/productDetailsApi';
import { useProducts } from '@/hooks/useProducts';
import './HomePage.scss';

type CategoryCounts = {
  phones: number;
  tablets: number;
  accessories: number;
};

const HomePage = () => {
  const { products, loading } = useProducts();

  const [counts, setCounts] = useState<CategoryCounts>({
    phones: 0,
    tablets: 0,
    accessories: 0,
  });

  const fetchCounts = async () => {
    try {
      setCounts(productDetailsApi.getByLength());
    } catch (err) {
      console.error('Failed to fetch product counts', err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  if (loading) {
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

        <div className="inline-wrapper text-primary">
          <NewModelsSlider products={products} />
        </div>

        <CategorySection
          phones={counts.phones}
          tablets={counts.tablets}
          accessories={counts.accessories}
        />

        <div className="inline-wrapper text-primary">
          <HotPricesSlider products={products} />
        </div>
      </div>
    </>
  );
};

export default HomePage;

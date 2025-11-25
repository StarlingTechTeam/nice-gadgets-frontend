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
      }
    };

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

        <div className="inline-wrapper">
          <NewModelsSlider products={products} />
        </div>

        <CategorySection
          phones={counts.phones}
          tablets={counts.tablets}
          accessories={counts.accessories}
        />

        <div className="inline-wrapper">
          <HotPricesSlider products={products} />
        </div>
      </div>
    </>
  );
};

export default HomePage;

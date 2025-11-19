import HomePageTitle from '@/components/atoms/HomePageTitle';
import './HomePage.scss';

const HomePage = () => {
  return (
    <>
      <div className="inline-wrapper">
        <HomePageTitle />
      </div>
      <div className="homepage-block__wrapper">
        {/* delete those styles from divs - h-[352px] aspect-square bg-gray-500 text-center leading-[352px] text-8xl (tailwind hardcoded), rest can leave and put your component inside */}
        <div className="h-[352px] aspect-square bg-gray-500 text-center leading-[352px] text-8xl inline-wrapper slider homepage-block__item">
          Slider
        </div>
        <div className="h-[352px] bg-gray-500 text-center leading-[352px] text-2xl inline-wrapper homepage-block__item">
          Brand new models
        </div>
        <div className="text-primary text-2xl inline-wrapper homepage-block__item homepage-category">
          Shop by category
          <div className="category-block">
            <div className="category-item">Item</div>
            <div className="category-item">Item</div>
            <div className="category-item">Item</div>
          </div>
        </div>

        <div className="h-[352px] bg-gray-500 text-center leading-[352px] text-2xl inline-wrapper homepage-block__item">
          Hot prices
        </div>
      </div>
    </>
  );
};
export default HomePage;

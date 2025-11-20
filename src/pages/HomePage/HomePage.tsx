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
        <div className="text-primary text-2xl inline-wrapper  homepage-category">
          <div className="h-[352px] bg-gray-500 text-center leading-[352px] text-2xl">
            Slider
          </div>
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
            <div className="category-item">
              <div className="category-item__image-block image-block-1"></div>
              <div className="category-item__text-block">
                <h4 className="homepage__category-title">Mobile phones</h4>
                <span className="homepage__category-subtitle text-secondary">
                  95 models
                </span>
              </div>
            </div>
            <div className="category-item">
              <div className="category-item__image-block image-block-2"></div>
              <div className="category-item__text-block">
                <h4 className="homepage__category-title text-primary">
                  Tablets
                </h4>
                <span className="homepage__category-subtitle text-secondary">
                  24 models
                </span>
              </div>
            </div>
            <div className="category-item">
              <div className="category-item__image-block image-block-3"></div>
              <div className="category-item__text-block">
                <h4 className="homepage__category-title text-primary">
                  Accessories
                </h4>
                <span className="homepage__category-subtitle text-secondary">
                  100 models
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-primary text-2xl inline-wrapper homepage-category">
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

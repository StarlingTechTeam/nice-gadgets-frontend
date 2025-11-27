import SliderProductDetails from '@organisms/SliderProductDetails';
import Skeleton from 'react-loading-skeleton';

type ProductImageSliderProps = {
  loading: boolean;
  slides: string[];
};

const ProductImageSlider = ({ loading, slides }: ProductImageSliderProps) => (
  <div>
    {loading ?
      <Skeleton
        height={464}
        width={490}
      />
    : <SliderProductDetails
        slides={slides}
        productName="Product Images"
      />
    }
  </div>
);

export default ProductImageSlider;

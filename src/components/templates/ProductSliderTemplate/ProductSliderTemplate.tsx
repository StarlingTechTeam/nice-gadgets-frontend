import { type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import './ProductSliderTemplate.scss';

import SliderHeroButton from '@molecules/SliderHeroButton';
import ProductCard from '@organisms/ProductCard';

import type { ProductCard as ProductCardType } from '@/types/ProductCard';

interface ProductsSliderProps {
  title: string;
  products: ProductCardType[];
  sliderId: string;
}

const splitDigitsAndLetters = (value: string) => {
  if (!value) return '';

  let digits = '';
  let letters = '';

  for (const c of value) {
    const isDigit = c >= '0' && c <= '9';
    if (isDigit) digits += c;
    else letters += c;
  }

  return digits && letters ? `${digits} ${letters}` : value;
};

const formatScreen = (value: string) => {
  if (!value) return '';

  let result = '';
  let replaced = false;

  for (const char of value) {
    if (char === "'" && !replaced) {
      result += "''";
      replaced = true;
    } else {
      result += char;
    }
  }
  return result;
};

const ProductsSlider: FC<ProductsSliderProps> = ({
  products,
  title,
  sliderId,
}) => {
  const prevClass = `js-prev-${sliderId}`;
  const nextClass = `js-next-${sliderId}`;

  return (
    <div className="products-slider">
      <div className="products-slider__main">
        <div className="products_slider__wrapper text-primary">
          <h2>{title}</h2>
        </div>
        <div className="products-slider__buttons">
          <div className="products-slider__controls">
            <SliderHeroButton
              direction="prev"
              className={`products-slider__arrow products-slider__arrow--prev ${prevClass}`}
              baseClass="products-slider"
            />
            <SliderHeroButton
              direction="next"
              className={`products-slider__arrow products-slider__arrow--prev ${nextClass}`}
              baseClass="products-slider"
            />
          </div>
        </div>
      </div>
      <div className="swiper-wrap">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={'auto'}
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }}
          className="swiper-template"
        >
          {products.map((product) => {
            const image_url = product.image;

            const screen = formatScreen(product.screen);
            const formattedCapacity = splitDigitsAndLetters(product.capacity);
            const ram = splitDigitsAndLetters(product.ram);

            const categoryType = product.category || 'phones';

            const capacityLabel =
              categoryType === 'accessories' ? 'Size' : 'Capacity';

            return (
              <SwiperSlide
                key={product.id}
                style={{ width: '270px' }}
              >
                <ProductCard
                  productName={product.name}
                  price={product.price}
                  fullPrice={product.fullPrice}
                  screen={screen}
                  capacity={formattedCapacity}
                  capacityLabel={capacityLabel}
                  ram={ram}
                  image={image_url}
                  categoryType={categoryType}
                  itemId={product.itemId}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductsSlider;

import { type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import './ProductSliderTemplate.scss';

import SliderHeroButton from '@molecules/SliderHeroButton';
import ProductCard from '@organisms/ProductCard';

import type { ProductCard as ProductCardType } from '@/types/ProductCard ';

interface ProductsSliderProps {
  title: string;
  products: ProductCardType[];
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

const ProductsSlider: FC<ProductsSliderProps> = ({ products, title }) => {
  return (
    <div className="products-slider">
      <div className="products-slider__main">
        <div className="products_slider__wrapper">
          <h2>{title}</h2>
        </div>
        <div className="products-slider__buttons">
          <div className="products-slider__controls">
            <SliderHeroButton
              direction="prev"
              className="products-slider__arrow products-slider__arrow--prev"
              baseClass="products-slider"
            />
            <SliderHeroButton
              direction="next"
              className="products-slider__arrow products-slider__arrow--next"
              baseClass="products-slider"
            />
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={4}
        navigation={{
          prevEl: '.products-slider__arrow--prev',
          nextEl: '.products-slider__arrow--next',
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.1,
          },
          360: {
            slidesPerView: 1.3,
          },
          540: {
            slidesPerView: 2.1,
          },
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3.2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product) => {
          const image_url = `./src/assets/${product.image}`;

          const screen = formatScreen(product.screen);
          const formattedCapacity = splitDigitsAndLetters(product.capacity);
          const ram = splitDigitsAndLetters(product.ram);

          const categoryType = product.category || 'phones';

          const capacityLabel =
            categoryType === 'accessories' ? 'Size' : 'Capacity';

          return (
            <SwiperSlide key={product.id}>
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
  );
};

export default ProductsSlider;

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import { Navigation, Thumbs } from 'swiper/modules';

import PrevArrowIcon from '@assets/icons/prevSlider.svg';
import NextArrowIcon from '@assets/icons/nextSlider.svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import './SliderProductDetails.scss';

import SliderProductButton from '@molecules/SliderProductButton';
import SliderProductItem from '@molecules/SliderProductItem';
import { useState } from 'react';
import { useScreenSize } from '@/hooks/useScreenSize';
import cn from 'classnames';

type SliderProductDetailsProps = {
  slides: string[];
  productName: string;
};

const SliderProductDetails = ({
  slides,
  productName,
}: SliderProductDetailsProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const screenSize = useScreenSize();

  const direction = screenSize === 'xs' ? 'horizontal' : 'vertical';

  return (
    <div
      className="slider-product-details"
      aria-label="Product images"
    >
      <div className="slider-product-details__container">
        <div className="slider-product-details__wrapper">
          <div className="slider-product-details__img">
            <SliderProductButton
              direction="next"
              icon={NextArrowIcon}
            />
            <SliderProductButton
              direction="prev"
              icon={PrevArrowIcon}
            />
            <Swiper
              modules={[Navigation, Thumbs]}
              direction="horizontal"
              spaceBetween={30}
              slidesPerView={1}
              loop
              thumbs={{ swiper: thumbsSwiper }}
              className="slider-product-details__slides"
              navigation={{
                prevEl: '.slider-product-details__arrow--prev',
                nextEl: '.slider-product-details__arrow--next',
              }}
              scrollbar={{ draggable: true }}
            >
              {slides.map((item, i) => (
                <SwiperSlide key={`${productName} main-${i}`}>
                  <SliderProductItem
                    image={`./src/assets/${item}`}
                    title={`${productName} view-${i}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <Swiper
            modules={[Navigation, Thumbs]}
            width={100}
            direction={direction}
            onSwiper={setThumbsSwiper}
            className={cn('slider-product-details__thumbs', {
              'is-vertical': direction === 'vertical',
            })}
            slidesPerView={'auto'}
            freeMode={true}
            style={{ height: '100%' }}
          >
            {slides.map((item, i) => (
              <SwiperSlide
                key={`${productName} thumb-${i}`}
                className="slider-product-details__thumb"
              >
                <img
                  src={`./src/assets/${item}`}
                  alt={`${productName} thumbnail-${i}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default SliderProductDetails;

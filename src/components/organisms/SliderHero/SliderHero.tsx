import { type FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import PrevArrowIcon from '@assets/icons/prevSlider.svg';
import NextArrowIcon from '@assets/icons/nextSlider.svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SliderHero.scss';

import { slides } from './slides';

import SliderHeroButton from '@molecules/SliderHeroButton/SliderHeroButton';
import SliderHeroItem from '@molecules/SliderHeroItem/SliderHeroItem';

const SliderHero: FC = () => {
  return (
    <div className="slider-hero">
      <SliderHeroButton
        direction="next"
        icon={NextArrowIcon}
      />

      <SliderHeroButton
        direction="prev"
        icon={PrevArrowIcon}
      />

      <div className="slider-hero__container">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          navigation={{
            prevEl: '.slider-hero__arrow--prev',
            nextEl: '.slider-hero__arrow--next',
          }}
          pagination={{
            el: '.slider-hero__pagination',
            clickable: true,
          }}
        >
          {slides.map((item) => (
            <SwiperSlide key={item.id}>
              <SliderHeroItem
                image={item.image}
                imageMobile={item.imageMobile}
                title={item.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="slider-hero__pagination"></div>
      </div>
    </div>
  );
};

export default SliderHero;

import React from "react"
import style from "./style.module.scss"
import SwiperCore ,{ Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.min.css"

SwiperCore.use([Pagination, Autoplay])


export interface SliderProps  {
  bannerList: Array<TSBannersProps.BannerData>
  [name: string]: any
}

const Slider: React.FC<SliderProps> = (props) => {
  const { bannerList } = props
  return (
    <div className={ style.SliderContainer }>
        <Swiper 
          className={style.sliderContainer}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={{clickable: true}}
          autoplay={{delay: 2500, disableOnInteraction: false}}
          onSlideChange={()=>{console.log("side change")}}
          // onSwiper={(swiper) => console.log(swiper)}

        >
          {
            bannerList.map((item, index) => {
              return <SwiperSlide key={index}>
                <img src={item.imageUrl} width="100%" height="100%" alt="推荐"></img>
              </SwiperSlide>
            })
          }
        </Swiper>
          {props.children}
      </div>
  )
}

export default React.memo(Slider)

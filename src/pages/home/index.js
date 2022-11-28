import 'swiper/css/bundle'
import SwiperCore, { Autoplay } from 'swiper'
import { React, useLayoutEffect, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import { Footer, Navbar } from '../../components'
import { formatRupiah, formatToURL, useWindowDimensions } from '../../utils'


const Home = () => {
  const [bannerPosition, setBannerPosition] = useState(0)
  const { width, height } = useWindowDimensions()

  SwiperCore.use([Autoplay])

  const Pagination = () => {
    const swiper = useSwiper()

    return (
      banners.map((item, index) => {
        return(
          <div
            key={index}
            onClick={() => swiper.slideTo(index, 1000, true)}
            className={'w-20 md:w-36 lg:w-44 h-1 md:h-2.5 mx-3 md:mx-6 cursor-pointer' + (bannerPosition == index ? ' bg-[#111111]' : ' bg-[#5B5555]')}
          />
        )
      })
    )
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />
      <section id='section-banner' className='pt-24'>
        <Swiper
          speed={1000}
          modules={[Autoplay]}
          className='relative'
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSlideChange={(evt) => setBannerPosition(evt.activeIndex)}
        >
          {banners.map((banner, index) => {
            return(
              <SwiperSlide key={index}>
                <img src={banner.image} className='h-[60vw] md:h-[40vw] lg:h-[30vw] w-full object-cover'/>
              </SwiperSlide>
            )
          })}
          <div className='absolute bottom-4 z-10 left-0 right-0 mx-auto text-center'>
            <button className='bg-primary text-base md:text-xl lg:text-2xl xl:text-4xl text-white rounded-xl sm:rounded-[20px] py-2 sm:py-4 px-3 sm:px-5 font-bold mb-[2%]'>Explore Now</button>
            <div className='flex justify-center'>
              <Pagination />
            </div>
          </div>
        </Swiper>
      </section>

      <section id='section-product-types' className='my-7 xl:px-20 lg:px-16 sm:px-10 px-4'>
        <Swiper
          slidesPerView={width > 768 ? 4 : 2}
          spaceBetween={16}
        >
          {productTypes.map((productType, index) => {
            return(
              <SwiperSlide key={index}>
                <a href='#' className='relative rounded-3xl'>
                  <img src={productType.image} className='w-full h-[25vw] md:h-[20vw] lg:h-[15vw] object-cover rounded-3xl'/>
                  <p className='text-product-type absolute bottom-0 left-0 right-0 py-1 lg:py-4 text-center text-white font-inter font-bold text-lg md:text-xl lg:text-2xl rounded-b-3xl'>{productType.name}</p>
                </a>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>

      <section id='section-new-arrival my-7'>
        <div className='xl:px-20 lg:px-16 sm:px-10 px-4 mb-10 flex justify-between items-center'>
          <p className='font-jakarta font-medium text-black text-lg md:text-xl lg:text-2xl uppercase tracking-wide'>New Arrival</p>
          <a href='#' className='font-jakarta font-medium text-black text-sm md:text-base lg:text-lg underline'>See More</a>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12 xl:px-20 lg:px-16 sm:px-10 px-4'>
          {newProducts.map((newProduct, index) => {
            let urlValue = formatToURL(newProduct.name)
            return(
              <a href={`/products/${urlValue}`} key={index} className='flex flex-col'>
                <img src={newProduct.image} className='w-full md:h-[35vw] lg:h-[24vw] object-cover'/>
                <p className='font-jakarta font-light text-black text-lg md:text-xl lg:text-2xl mb-2 uppercase tracking-wide flex-1'>{newProduct.name}</p>
                <p className='font-lato font-medium text-black text-lg md:text-xl lg:text-2xl'>{formatRupiah(newProduct.price)}</p>
              </a>
            )
          })}
        </div>
      </section>

      <section id='section-theme-banner' className='my-16 xl:px-20 lg:px-16 sm:px-10 px-4'>
        <div className='md:grid md:grid-cols-4 gap-x-7'>
          <div className='md:col-span-3'>
            <div className='relative'>
              <img src='/assets/images/DummyBanner4.png' className='w-full object-cover' />
              <a href='#' className='md:absolute shadow md:shadow-none bottom-[40%] right-4 py-5 px-2.5 bg-white flex items-center'>
                <span className='font-jakarta font-medium text-lg md:text-xl lg:text-2xl text-black tracking-[3px]'>Check full collection</span>
                <img src='/assets/icons/IconChevronRight.svg' />
              </a>
            </div>
          </div>
          <div className={'md:col-span-1 grid md:grid-rows-2 gap-y-4' + (width <= 768 ? ' grid-cols-2 mt-4 gap-x-4' : '')}>
            <div className='h-full relative'>
              <img src='/assets/images/DummyBanner5.png' className='w-full h-full object-cover'/>
              <a href='#' className='md:absolute shadow md:shadow-none bottom-[2%] left-[5%] py-3 px-2.5 bg-white flex items-center'>
                <span className='font-jakarta font-medium text-xs text-black tracking-[3px]'>Check full collection</span>
                <img src='/assets/icons/IconChevronRight.svg' />
              </a>
            </div>
            <div className='h-full relative'>
              <img src='/assets/images/DummyBanner6.png' className='w-full h-full object-cover'/>
              <a href='#' className='md:absolute shadow md:shadow-none bottom-[2%] left-[5%] py-3 px-2.5 bg-white flex items-center'>
                <span className='font-jakarta font-medium text-xs text-black tracking-[3px]'>Check full collection</span>
                <img src='/assets/icons/IconChevronRight.svg' />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id='section-trending-product' className='my-7'>
        <div className='xl:px-20 lg:px-16 sm:px-10 px-4 mb-10 flex justify-between items-center'>
          <p className='font-jakarta font-medium text-black text-lg md:text-xl lg:text-2xl uppercase tracking-wide'>Trending Products</p>
          <a href='#' className='font-jakarta font-medium text-black text-sm md:text-base lg:text-lg underline'>See More</a>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12 xl:px-20 lg:px-16 sm:px-10 px-4'>
          {trendingProducts.map((trendingProduct, index) => {
            let urlValue = formatToURL(trendingProduct.name)
            return(
              <a href={`/products/${urlValue}`} key={index} className='flex flex-col'>
                <img src={trendingProduct.image} className='w-full md:h-[35vw] lg:h-[24vw] object-cover'/>
                <p className='font-jakarta font-light text-black text-lg md:text-xl lg:text-2xl mb-2 uppercase tracking-wide flex-1'>{trendingProduct.name}</p>
                <p className='font-lato font-medium text-black text-lg md:text-xl lg:text-2xl'>{formatRupiah(trendingProduct.price)}</p>
              </a>
            )
          })}
        </div>
      </section>
      <Footer />
    </div>
  )
}

const banners = [
  {
    image: '/assets/images/DummyBanner3.png',
  },
  {
    image: '/assets/images/DummyBanner1.png',
  },
  {
    image: '/assets/images/DummyBanner2.jpg',
  },
]

const productTypes = [
  {
    name: 'Gift Card',
    image: '/assets/images/DummyCard1.png',
  },
  {
    name: 'Table',
    image: '/assets/images/DummyCard2.png',
  },
  {
    name: 'Home Decor',
    image: '/assets/images/DummyCard3.png',
  },
  {
    name: 'Outdoor',
    image: '/assets/images/DummyCard4.png',
  },
]

const newProducts = [
  {
    name: 'Dining Table',
    price: '1250000',
    image: '/assets/images/DummyNewProduct1.png',
  },
  {
    name: 'BLACK PARCHE ROUND CAFE',
    price: '1250000',
    image: '/assets/images/DummyNewProduct2.png',
  },
  {
    name: 'GREY FUNNEL CAFE TABLE',
    price: '1250000',
    image: '/assets/images/DummyNewProduct3.png',
  },
  {
    name: 'BLACK TAFEL OFFICE',
    price: '1250000',
    image: '/assets/images/DummyNewProduct4.png',
  },
  {
    name: 'BLACK STRING CROWN OFFICE',
    price: '1250000',
    image: '/assets/images/DummyNewProduct5.png',
  },
  {
    name: 'WHITE FELICE DINING TABLE',
    price: '1250000',
    image: '/assets/images/DummyNewProduct6.png',
  },
]

const trendingProducts = [
  {
    name: 'BLACK QUORA SQARE TISSUE',
    price: '1250000',
    image: '/assets/images/DummyTrendingProduct1.png',
  },
  {
    name: 'BLACK DUPE HIGH COFFEE TABLE',
    price: '1250000',
    image: '/assets/images/DummyTrendingProduct2.png',
  },
  {
    name: 'BEIGE COLLABORER COFFEE TABLE',
    price: '1250000',
    image: '/assets/images/DummyTrendingProduct3.png',
  },
  {
    name: 'BLACK SIMPLY MODERN DINING TABLE',
    price: '1250000',
    image: '/assets/images/DummyTrendingProduct4.png',
  },
  {
    name: 'BLACK COPRA SIDE TABLE',
    price: '1250000',
    image: '/assets/images/DummyTrendingProduct5.png',
  },
  {
    name: 'BEIGE QUORA TISSUE BOX',
    price: '1250000',
    image: '/assets/images/DummyTrendingProduct6.png',
  },
]

export default Home
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import { useWindowDimensions } from '../../utils'

const Footer = (props) => {
  SwiperCore.use([Autoplay])

  const { width, height } = useWindowDimensions()

  const [showCS, setShowCS] = useState(false)
  const [showFindUs, setShowFindUs] = useState(false)
  const [showAboutUs, setShowAboutUs] = useState(false)
  const [showInspiration, setShowInspiration] = useState(false)

  return (
    <footer ref={props.footerRef} className='mt-12'>
      <div className='bg-[#d9d9d9] md:bg-primary py-3 md:flex justify-center items-center text-center'>
        <p className='font-jakarta text-base text-black md:text-white md:mr-6'>Subscribe to get our newsletter</p>
        <input type='email' placeholder='Enter your email' className='w-60 py-1 pl-4 pr-2 my-2 md:my-0 font-lato text-xs rounded-xl md:rounded-l-[5px] md:rounded-r-none border border-black focus:outline-none' />
        <button className='hidden md:block bg-[#d9d9d9] rounded-r-[5px] border border-black'>
          <img src='/assets/icons/IconSendEmail.svg' className='px-6 py-1'/>
        </button>
        <button className='block md:hidden mx-auto bg-primary rounded-full text-white py-1 px-2.5 font-semibold text-sm'>Subscribe</button>
      </div>
      <Swiper
        speed={1000}
        modules={[Autoplay]}
        className='relative'
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        slidesPerView={width > 1200 ? 11 : width > 1024 ? 8 : width > 768 ? 7 : width > 576 ? 5 : 4}
      >
        {sellingPoint.map((item, index) => {
          return(
            <SwiperSlide key={index} className='text-center pt-6 pb-3'>
              <Link to='/unique-selling-point'>
                <img src={item.image} alt={item.label} className='mx-auto mb-3'/>
                <p className='font-lato text-xs text-black'>{item.label}</p>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className='md:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 pt-3 pb-12 xl:px-20 lg:px-16 sm:px-10 px-4 gap-y-8'>

        <div className='md:col-span-2'>
          <img src='/assets/icons/Logo.svg' alt='Estetico Home Logo' className='mb-2 w-48 sm:w-60 h-auto object-cover'/>
          <p className='font-inter text-sm md:text-base text-black my-1 md:my-2'>+6282273386665</p>
          <a href='mailto:hello@esteticohome.com' target='_blank' className='block font-inter text-sm md:text-base text-black mb-3' rel='noreferrer'>hello@esteticohome.com</a>
          <ul className='flex gap-x-2'>
            <li>
              <a href='https://www.instagram.com/estetico.home' target='_blank' rel='noreferrer'>
                <img src='/assets/icons/IconInstagram.svg'/>
              </a>
            </li>
            <li>
              <a href='https://www.facebook.com/Estetico-Home-111476051030181' target='_blank' rel='noreferrer'>
                <img src='/assets/icons/IconFacebook.svg'/>
              </a>
            </li>
            <li>
              <a href='https://www.youtube.com/channel/UCMGH3GcQeq-ChAJHCWy3jtw' target='_blank' rel='noreferrer'>
                <img src='/assets/icons/IconYoutube.svg'/>
              </a>
            </li>
            <li>
              <a href='https://www.linkedin.com/company/estetico-home' target='_blank' rel='noreferrer'>
                <img src='/assets/icons/IconLinkedin.svg'/>
              </a>
            </li>
          </ul>
        </div>

        <div className='md:col-span-1 my-8 md:my-0'>
          <h4
            onClick={() => setShowAboutUs(!showAboutUs)}
            className='font-jakarta font-semibold text-base text-black uppercase hover:cursor-pointer md:hover:cursor-auto flex justify-between'
          >
            <span>About Us</span>
            <img src='/assets/icons/IconChevronRight.svg' className={'block md:hidden' + (showAboutUs ? ' -rotate-90' : ' rotate-90')}/>
          </h4>
          <ul className={showAboutUs ? 'block' : 'hidden md:block'}>
            <li className='my-2.5'>
              <Link to='/about-us' className='font-inter text-base text-black'>Who we are</Link>
            </li>
            <li className='my-2.5'>
              <Link to='#' className='font-inter text-base text-black'>Press Release</Link>
            </li>
            <li className='my-2.5'>
              <Link to='/contact-us' className='font-inter text-base text-black'>Contact Us</Link>
            </li>
            <li className='my-2.5'>
              <Link to='#' className='font-inter text-base text-black'>Event</Link>
            </li>
            <li className='my-2.5'>
              <Link to='#' className='font-inter text-base text-black'>Career</Link>
            </li>
          </ul>
        </div>

        <div className='md:col-span-1 my-8 md:my-0'>
          <h4
            onClick={() => setShowCS(!showCS)}
            className='font-jakarta font-semibold text-base text-black uppercase hover:cursor-pointer md:hover:cursor-auto flex justify-between'
          >
            <span>Customer Care</span>
            <img src='/assets/icons/IconChevronRight.svg' className={'block md:hidden' + (showCS ? ' -rotate-90' : ' rotate-90')}/>
          </h4>
          <ul className={showCS ? 'block' : 'hidden md:block'}>
            <li className='my-2.5'>
              <Link to='/knowledge-base' className='font-inter text-base text-black'>Knowledge Base</Link>
            </li>
            <li className='my-2.5'>
              <a href='#' className='font-inter text-base text-black'>Customer Feedback</a>
            </li>
            <li className='my-2.5'>
              <a href='/terms' className='font-inter text-base text-black'>Terms of Service</a>
            </li>
            <li className='my-2.5'>
              <a href='/privacy-policy' className='font-inter text-base text-black'>Privacy Policy</a>
            </li>
            <li className='my-2.5'>
              <Link to='/faq' className='font-inter text-base text-black'>FAQ</Link>
            </li>
          </ul>
        </div>

        <div className='md:col-span-1 my-8 md:my-0'>
          <h4
            onClick={() => setShowInspiration(!showInspiration)}
            className='font-jakarta font-semibold text-base text-black uppercase hover:cursor-pointer md:hover:cursor-auto flex justify-between'
          >
            <span>Inspiration</span>
            <img src='/assets/icons/IconChevronRight.svg' className={'block md:hidden' + (showInspiration ? ' -rotate-90' : ' rotate-90')}/>
          </h4>
          <ul className={showInspiration ? 'block' : 'hidden md:block'}>
            <li className='my-2.5'>
              <a href='#' className='font-inter text-base text-black'>Promo Deals</a>
            </li>
            <li className='my-2.5'>
              <a href='#' className='font-inter text-base text-black'>Tips & Tricks</a>
            </li>
            <li className='my-2.5'>
              <a href='#' className='font-inter text-base text-black'>Blogs</a>
            </li>
            <li className='my-2.5'>
              <a href='#' className='font-inter text-base text-black'>Online Catalogs</a>
            </li>
            <li className='my-2.5'>
              <a href='#' className='font-inter text-base text-black'>News & Updates</a>
            </li>
          </ul>
        </div>

        <div className='md:col-span-1 my-8 md:my-0'>
          <h4
            onClick={() => setShowFindUs(!showFindUs)}
            className='font-jakarta font-semibold text-base text-black hover:cursor-pointer md:hover:cursor-auto flex justify-between'
          >
            <span>Find us on</span>
            <img src='/assets/icons/IconChevronRight.svg' className={'block md:hidden' + (showFindUs ? ' -rotate-90' : ' rotate-90')}/>
          </h4>
          <ul className={showFindUs ? 'block' : 'hidden md:block'}>
            <li className='my-2.5'>
              <a href='https://www.lazada.co.id/estetico-home' target='_blank' className='font-inter text-base text-black' rel='noreferrer'>Lazada</a>
            </li>
            <li className='my-2.5'>
              <a href='https://www.tokopedia.com/estetico-home' target='_blank' className='font-inter text-base text-black' rel='noreferrer'>Tokopedia</a>
            </li>
            <li className='my-2.5'>
              <a href='https://shopee.co.id/estetico_home' target='_blank' className='font-inter text-base text-black' rel='noreferrer'>Shopee</a>
            </li>
          </ul>
        </div>

        <div className='md:col-span-1 my-8 md:my-0'>
          <div className='mb-7'>
            <h4 className='font-jakarta font-semibold text-base text-black'>Payment Partner</h4>
            <div className='flex items-center mt-2'>
              <img src='/assets/icons/IconDoku.svg'/>
            </div>
          </div>
          <div>
            <h4 className='font-jakarta font-semibold text-base text-black'>Delivery Partner</h4>
            <div className='flex items-center mt-2'>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-[#d9d9d9] py-1 flex items-center justify-center'>
        <img src='/assets/icons/IconCopyright.svg' alt='Copyright' className='mt-[2px] mr-1'/>
        <p className='font-lato text-base text-black'>Estetico Home 2022 All Rights Reserved</p>
      </div>

    </footer>
  )
}

const sellingPoint = [
  { label: 'Custom Made', image: '/assets/icons/IconGift.svg' },
  { label: 'Point Reward', image: '/assets/icons/IconReward.svg' },
  { label: 'Free Delivery', image: '/assets/icons/IconDelivery.svg' },
  { label: 'Personal Assistant', image: '/assets/icons/IconAssistant.svg' },
  { label: 'Free Installation', image: '/assets/icons/IconMechanic.svg' },
  { label: 'Free Installment', image: '/assets/icons/IconFreeInstallment.svg' },
  { label: 'Unique Piece Marble', image: '/assets/icons/IconThumbUp.svg' },
  { label: 'Easy Shopping', image: '/assets/icons/IconAccess.svg' },
  { label: 'Warranty Repolish', image: '/assets/icons/IconWarranty.svg' },
  { label: 'Service and Maintenance', image: '/assets/icons/IconService.svg' },
  { label: 'Visualization Service', image: '/assets/icons/IconGarage.svg' },
]

Footer.propTypes = {
  footerRef: PropTypes.any,
}

export default Footer
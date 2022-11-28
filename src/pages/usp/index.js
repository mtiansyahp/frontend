import { Link } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'

import { Footer, Navbar } from '../../components'
import Linkify from 'react-linkify'

const USP = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />
      <div className='pt-24 xl:px-20 lg:px-16 sm:px-10 px-4'>
        <span className='font-lato text-xs font-medium'>
          <span>
            <Link to='/'>{'<'} Back</Link>
          </span>
          <span> | Home {'>'} Unique Selling Point </span>
        </span>
        <div className='grid grid-cols-2 mt-12'>
          <div className='col-span-2 md:col-span-1'>
            <div className='h-fit md:w-72 lg:w-96 border-b-2 border-black pb-2'>
              <h1 className='font-jakarta font-medium text-3xl md:text-4xl lg:text-5xl tracking-wide text-black'>Unique Selling Point Estetico Home</h1>
            </div>
          </div>
          <div className='col-span-2 md:col-span-1 cart-shadow mt-12 md:mt-0 pl-6 pr-8'>
            {textUSP.map((item, index) => {
              return(
                <div key={index} className='mb-7'>
                  <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a className='text-[#0000ee]' target='blank' href={decoratedHref} key={key}>
                      {decoratedText}
                    </a>
                  )}>
                    <p className='mb-2.5 font-jakarta font-medium text-xl md:text-2xl text-black tracking-wide'>{item.title}</p>
                    <p className='font-lato text-lg md:text-xl text-black whitespace-pre-line text-justify'>{item.content}</p>
                  </Linkify>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const textUSP = [
  {
    title: 'Custom Made',
    content: 'We understand that every customer has a unique taste, therefore we serve the manufacture of products based on requests from customers.',
  },
  {
    title: 'Membership and Point Reward',
    content: 'For every purchase you make at Maui Living, get reward points that can be redeemed for next purchase by registering as Maui Living Member.',
  },
  {
    title: 'Free Delivery',
    content: 'Free delivery Service to your home for Medan area. Proper packing to ensure perfect condition is guaranteed from us (free delivery only valid for Furniture purchase, and selected home decor accessories with minimum purchase).',
  },
  {
    title: 'Personal Assistant',
    content: 'Any questions, comments, or inquiries? Our Customer Care Officers are ready to assist you by phone or email.',
  },
  {
    title: 'Free Instalation',
    content: 'Since our products already installed our reliable and experienced workers will help you organize the products you have purchased (for Medan area). Quick and prompt installation will result in your satisfaction.',
  },
  {
    title: '0% Installment',
    content: 'We value your financial planning, so we offer up to 24 months of installment with no interest (for selected banks).',
  },
  {
    title: 'Unique Piece Marble',
    content: 'We guarantee the marble products we sell are very unique with the best quality. With the experience of our workers, the products we send are quality products.',
  },
  {
    title: 'Easy Shopping',
    content: 'To always provide a comfortable and easy shopping experience for customers. We have updated the online shopping version of our store which can be downloaded in the play store and app store.',
  },
  {
    title: 'Warranty Repolish',
    content: 'For your ease of mind, we offer 1-year warranty for repolishing your item purchased.',
  },
  {
    title: 'Service & Maintenance',
    content: 'We provide service and maintenance for polishing your product so that it always looks shiny and new.',
  },
  {
    title: 'Visualization Service',
    content: 'For buyers who plan to decorate your home with our products, we can prepare a 3D design for the product you choose based on the room in your house. Terms and Conditions apply.',
  },
]

export default USP
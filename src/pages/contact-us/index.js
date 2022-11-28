import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

import { Footer, Navbar } from '../../components'
import { useWindowDimensions } from '../../utils'

const ContactUs = () => {
  const { width, height } = useWindowDimensions()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />
      <div className='xl:px-20 lg:px-16 sm:px-10 px-4'>
        <div className='pt-24 flex justify-between'>
          <span className='font-lato text-xs font-medium'>
            <span>
              <Link to='/'>{'<'} Back</Link>
            </span>
            <span> | Home {'>'} Contact Us </span>
          </span>
        </div>
        <div className='mt-12 mb-16'>
          <h1 className='font-jakarta font-medium text-5xl text-black tracking-wide mb-3'>Contact Us</h1>
          <p className='font-lato text-base text-black'>Drop us your questions, comments or concerns below. {'We\'ll'} get in touch with you soon!</p>
        </div>
        <div className='grid grid-cols-2'>
          <div className='col-span-2 md:col-span-1'>
            <p className='font-jakarta font-medium text-base text-black tracking-wide uppercase'>Full Name *</p>
            <input
              type='text'
              placeholder='Enter Full Name'
              className='font-lato text-base border border-black rounded-[10px] w-2/3 py-2 px-4 mt-3 mb-7'
            />
            <p className='font-jakarta font-medium text-base text-black tracking-wide uppercase'>Email *</p>
            <input
              type='email'
              placeholder='Enter Email Address'
              className='font-lato text-base border border-black rounded-[10px] w-2/3 py-2 px-4 mt-3 mb-7'
            />
            <p className='font-jakarta font-medium text-base text-black tracking-wide uppercase'>Phone Number *</p>
            <input
              type='text'
              placeholder='Enter Phone Number'
              className='font-lato text-base border border-black rounded-[10px] w-2/3 py-2 px-4 mt-3 mb-7'
            />
            <p className='font-jakarta font-medium text-base text-black tracking-wide uppercase'>Subject Category *</p>
            <input
              type='text'
              placeholder='Your Interest'
              className='font-lato text-base border border-black rounded-[10px] w-2/3 py-2 px-4 mt-3 mb-7'
            />
            <p className='font-jakarta font-medium text-base text-black tracking-wide uppercase'>Message *</p>
            <textarea
              cols={40}
              rows={5}
              placeholder='Enter the message'
              className='border border-black rounded-[10px] w-2/3 py-2 px-4 mt-3 mb-7'
            />
            <button className='block bg-primary text-white font-jakarta font-bold text-base w-fit py-2.5 px-12 rounded-[10px]'>Submit Message</button>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <h3 className='font-jakarta font-medium text-base text-black tracking-wide mt-12 md:mt-0'>Estetico Home</h3>
            <p className='font-lato text-xs text-black mt-1'>Jalan Gatot Subroto Nomor 47 E Petisah Tengah, Medan Petisah <br/>Medan, Sumatera Utara <br/>Indonesia</p>
            <h3 className='font-jakarta font-medium text-base text-black tracking-wide mt-4'>Customer Service</h3>
            <p className='flex items-center font-lato text-xs text-black mt-1 mb-8'>
              <img src='/assets/icons/IconPhone.svg' />
              <span>+6282273386665</span>
            </p>
            <iframe
              loading='lazy'
              className='drop-shadow-2xl rounded-sm w-full aspect-[4/3]'
              allowFullScreen=''
              referrerPolicy='no-referrer-when-downgrade'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d995.4947218375495!2d98.66956882917971!3d3.5923159998366243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131dac51167b5%3A0xce8fe3ca2b5f55!2sEnzo%20Stone%20Concept!5e0!3m2!1sen!2sid!4v1655451571350!5m2!1sen!2sid'
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ContactUs
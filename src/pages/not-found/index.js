import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Footer, Navbar } from '../../components'

const NotFound = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />
      <div className='pt-24 px-8 flex flex-col items-center w-full'>
        <p className='font-jakarta font-medium text-xl md:text-2xl lg:text-3xl text-black mt-24'>Oops! The page was not found</p>
        <p className='font-lato text-sm md:text-base lg:text-lg text-black my-12'>Maybe the page has been deleted or you have typed the wrong address</p>
        <Link to='/' className='bg-primary py-2.5 px-6 font-jakarta font-bold text-sm md:text-base lg:text-lg text-white rounded-[10px] block w-fit mb-24'>Back to Homepage</Link>
      </div>
      <Footer />
    </div>
  )
}

export default NotFound
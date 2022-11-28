import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

import { Footer, Navbar } from '../../components'
import { formatRupiah, formatToURL } from '../../utils'

const Product = () => {
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
            <span> | Home {'>'} Products {'>'} All Product </span>
          </span>
          <span className='block md:hidden font-lato text-xs font-medium'>
            <button>Filter <img src='/assets/icons/IconFilter.svg' className='inline-block -mt-[1px] ml-1'/></button>
          </span>
          <span className='hidden md:block font-lato text-xs font-medium'>
            <span className='mr-2'>Filter by</span>
            <span>
              <button>All Product <img src='/assets/icons/IconChevronBottom.svg' className='inline-block -mt-1 ml-1'/></button>
            </span>
            <span className='ml-6 mr-2'>Sort By</span>
            <span>
              <button>All Product <img src='/assets/icons/IconChevronBottom.svg' className='inline-block -mt-1 ml-1'/></button>
            </span>
          </span>
        </div>
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12 mt-7'>
          {allProducts.map((allProduct, index) => {
            let urlValue = formatToURL(allProduct.name)
            return(
              <a href={`/products/${urlValue}`} key={index} className='flex flex-col'>
                <img src={allProduct.image} className='w-full md:h-[35vw] lg:h-[24vw] object-cover'/>
                <p className='font-jakarta font-light text-black text-lg md:text-xl lg:text-2xl mb-2 uppercase tracking-wide flex-1'>{allProduct.name}</p>
                <p className='font-lato font-medium text-black text-lg md:text-xl lg:text-2xl'>{formatRupiah(allProduct.price)}</p>
              </a>
            )
          })}
        </section>
      </div>
      <Footer />
    </div>
  )
}

const allProducts = [
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

export default Product
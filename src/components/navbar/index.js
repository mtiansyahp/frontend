import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { formatRupiah, formatToURL } from '../../utils'

const Navbar = () => {
  //useSelector, is a method to get value of a state, but using global state (redux) instead
  const { userData, isLogin } = useSelector(state => state.UserReducer)
  //console.log(userData)

  const [onScroll, setOnScroll] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [showTables, setShowTables] = useState(false)
  const [showProducts, setShowProducts] = useState(false)
  const [showHomeDecor, setShowHomeDecor] = useState(false)
  const [showInspirations, setShowInspirations] = useState(false)

  const changeBackgroundColor = () => {
    if(window.scrollY > 48) {
      setOnScroll(true)
    } else {
      setOnScroll(false)
    }
  }

  const handleSearchBarType = (event) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    window.addEventListener('scroll', changeBackgroundColor)
  }, [])

  return (
    <nav className={'w-full flex flex-col xl:px-20 lg:px-16 sm:px-10 px-4 py-4 lg:py-0 fixed z-10 bg-white' + (onScroll ? ' nav-shadow' : '')}>
      <ul className='flex w-full items-center justify-between lg:justify-between'>
        <li>
          <a href='/'><img src='/assets/icons/Logo.svg' className='w-40'/></a>
        </li>
        <li className='hidden lg:block py-9' onMouseEnter={() => setShowProducts(true)} onMouseLeave={() => setShowProducts(false)}>
          <Link
            to='/products'
            className='relative text-xl font-jakarta font-medium uppercase tracking-wide'>Products</Link>
          {showProducts && (
            <div className='checkout-shadow absolute bg-white py-4 top-[100px]'>
              <ul className='font-jakarta text-xl text-black tracking-wide'>
                <li className='py-4 px-8'>
                  <Link to='/products'>ALL PRODUCT</Link>
                </li>
                <li className='py-4 px-8'>
                  <Link to='/products'>GIFT CARDS</Link>
                </li>
                <li className='relative py-4 px-8' onMouseEnter={() => setShowTables(true)} onMouseLeave={() => setShowTables(false)}>
                  <Link to='/products' className='flex justify-between'>
                    <span>TABLE</span>
                    <img src='/assets/icons/IconChevronRight.svg' className='ml-10'/>
                  </Link>
                  {showTables && (
                    <div className='absolute p-4 -top-8 -right-[306px]'>
                      <div className='checkout-shadow bg-white py-4'>
                        <ul className='font-jakarta text-xl text-black tracking-wide'>
                          <li className='py-4 px-8'>
                            <Link to='/products'>DINING TABLE</Link>
                          </li>
                          <li className='py-4 px-8'>
                            <Link to='/products'>CAFE AND BAR TABLE</Link>
                          </li>
                          <li className='py-4 px-8'>
                            <Link to='/products'>SIDE TABLE</Link>
                          </li>
                          <li className='py-4 px-8'>
                            <Link to='/products'>COFFEE TABLE</Link>
                          </li>
                          <li className='py-4 px-8'>
                            <Link to='/products'>CONSOLE TABLE</Link>
                          </li>
                          <li className='py-4 px-8'>
                            <Link to='/products'>OFFICE TABLE</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
                <li className='relative py-4 px-8' onMouseEnter={() => setShowHomeDecor(true)} onMouseLeave={() => setShowHomeDecor(false)}>
                  <Link to='/products' className='flex justify-between'>
                    <span>HOME DECOR</span>
                    <img src='/assets/icons/IconChevronRight.svg' className='ml-10'/>
                  </Link>
                  {showHomeDecor && (
                    <div className='absolute p-4 -top-8 -right-[262px]'>
                      <div className='checkout-shadow bg-white py-4'>
                        <ul className='font-jakarta text-xl text-black tracking-wide'>
                          <li className='py-4 px-8'>
                            <Link to='/products'>TISSUE BOX</Link>
                          </li>
                          <li className='py-4 px-8'>
                            <Link to='/products'>TRAY</Link>
                          </li>
                          <li className='py-4 px-8'>
                            <Link to='/products'>FLOWER VASE</Link>
                          </li>
                          <li className='py-4 px-8'>
                            <Link to='/products'>ASHTRAY</Link>
                          </li>
                          <li className='py-4 px-8'>
                            <Link to='/products'>SPECIAL WORKS</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
                <li className='py-4 px-8'>
                  <Link to='/products'>WASH BASIN</Link>
                </li>
                <li className='py-4 px-8'>
                  <Link to='/products'>OUTDOOR</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li className='hidden lg:block py-9' onMouseEnter={() => setShowInspirations(true)} onMouseLeave={() => setShowInspirations(false)}>
          <Link
            to='#'
            className='relative text-xl font-jakarta font-medium uppercase tracking-wide'>Inspiration</Link>
          {showInspirations && (
            <div className='checkout-shadow absolute bg-white py-4 px-8 top-[100px]'>
              <ul className='font-jakarta text-xl text-black tracking-wide'>
                <li className='py-4'>
                  <Link to='/products'>VICTORIAN</Link>
                </li>
                <li className='py-4'>
                  <Link to='/products'>SCANDINAVIAN</Link>
                </li>
                <li className='py-4'>
                  <Link to='/products'>INDUSTRIAL</Link>
                </li>
                <li className='py-4'>
                  <Link to='/products'>ORIENTAL</Link>
                </li>
                <li className='py-4'>
                  <Link to='/products'>MODERN LUXURY</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li className='hidden sm:block'>
          <div className='flex border-b-black border-b'>
            <input
              type='text'
              placeholder='Search...'
              onChange={handleSearchBarType}
              className='text-xl font-lato input-icon-search pl-8 w-80 tracking-wide focus:outline-none'
            />
          </div>
        </li>
        <ul className={'hidden lg:flex lg:items-center lg:gap-x-4' + (isLogin ? ' xl:gap-x-8' : ' xl:gap-x-14')}>
          <li>
            <Link to='/cart'>
              <img src='/assets/icons/IconCart.svg' alt='' />
            </Link>
          </li>
          {isLogin ? (
            <>
              <li>
                <Link to='/'>
                  <img src='/assets/icons/IconNotif.svg' alt='' />
                </Link>
              </li>
              <li>
                <Link to='/user-profile' className='flex items-center gap-x-2'>
                  <img src='/assets/icons/IconProfile.svg' alt='' />
                  <img src='/assets/icons/IconChevronRight.svg' alt=''  className='rotate-90'/>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to='/login'>
                <div className='bg-primary text-white py-2.5 px-6 rounded-xl'>Login</div>
              </Link>
            </li>
          )}
        </ul>
        <li className='block lg:hidden'>
          <button>
            <img src='/assets/icons/IconBurger.svg' />
          </button>
        </li>
      </ul>
      {searchValue.length > 0 && (
        <div className='py-4'>
          <p className='my-4 md:my-8 font-jakarta font-medium text-base md:text-lg lg:text-xl text-black uppercase tracking-wide'>Search Result for {`"${searchValue}"`}</p>
          {searchResults.slice(0, 2).map((item, index) => {
            let urlValue = formatToURL(item.name)
            return(
              <a href={`/products/${urlValue}`} key={index} className='cart-shadow my-8 py-3 px-4 flex items-center'>
                <img src={item.image} className='w-20 h-16 md:w-24 md:h-20' />
                <div className='ml-14 flex flex-col gap-y-2 text-lg md:text-xl lg:text-2xl text-black'>
                  <p className='font-jakarta font-light uppercase tracking-wide'>{item.name}</p>
                  <p className='font-lato font-medium'>{formatRupiah(item.price)}</p>
                </div>
              </a>
            )
          })}
          <Link to={`/catalog-search/?q=${searchValue}`} className='bg-primary py-2.5 px-6 text-white rounded-xl font-bold text-base'>More Product</Link>
        </div>
      )}
    </nav>
  )
}

const searchResults = [
  {
    name: 'Dining Table',
    price: '1250000',
    image: '/assets/images/DummyNewProduct1.png',
  },
  {
    name: 'GREY FUNNEL CAFE TABLE',
    price: '1250000',
    image: '/assets/images/DummyNewProduct3.png',
  },
  {
    name: 'WHITE FELICE DINING TABLE',
    price: '1250000',
    image: '/assets/images/DummyNewProduct6.png',
  },
]

export default Navbar
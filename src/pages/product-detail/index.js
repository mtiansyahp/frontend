import { useLayoutEffect, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Footer, Navbar } from '../../components'
import { formatRupiah } from '../../utils'
import './product-detail.css'

const ProductDetail = () => {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const products = [
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
    {
      name: 'Bedroom Table',
      price: 1250000,
      url: '/assets/images/DummyBedroomTable.jpg'
    },
  ]

  const params = useParams()

  const [selectedImages, setSelectedImages] = useState('/assets/images/DummyNewProduct1.png')
  function changeImage(anything) {
    setSelectedImages(anything)
  }

  const [open, setOpen] = useState(false)
  const [selectedSeaters, setSelectedSeaters] = useState('4 Seats')
  const [price, setPrice] = useState('')
  function selectBox() {
    setOpen(!open)
  }
  function show(anything) {
    setSelectedSeaters(anything)
  }
  useEffect(function () {
    if (selectedSeaters == '4 Seats') {
      setPrice(10000000)
    }

    if (selectedSeaters == '6 Seats') {
      setPrice(15000000)
    }
  }, [selectedSeaters])

  const [count, setCount] = useState(1)
  function countDown() {
    if(count >= 2) {
      setCount(count - 1)
    } else {
      setCount(1)
    }
  }
  function countUp() {
    setCount(count + 1)
  }

  return (
    <div>
      <Navbar />

      <div className='xl:px-20 lg:px-16 sm:px-10 px-4' id='detail-product'>
        <section className="pt-24 pb-10">
          <span className="font-lato text-xs font-medium">   
            <a className="hover:text-primary" href="#">{'<'} Back </a> | 
            <a className="hover:text-primary" href="#"> Home </a> {'>'} Detail Product {`"${params.productName}"`}
          </span>
        </section>

        <section className="grid md:grid-cols-2 grid-cols-1 gap-10 ">
          <div className='flex flex-col items-center gap-3'>
            <div className='max-h-[360px]'>
              <img className='h-full w-full object-contain' src={selectedImages} />
            </div>
            <div className="flex gap-3">
              <button className='h-[65px] aspect-square border border-[#8D8A8A] focus:border-primary cursor-pointer' onClick={changeImage.bind(this, '/assets/images/DummyNewProduct1.png')}>
                <img className='h-full w-full object-contain' src="/assets/images/DummyNewProduct1.png" />
              </button>
              <button className='h-[65px] aspect-square border border-[#8D8A8A] focus:border-primary cursor-pointer' onClick={changeImage.bind(this, '/assets/images/DummyNewProduct2.png')}>
                <img className='h-full w-full object-contain' src="/assets/images/DummyNewProduct2.png" />
              </button>
              <button className='h-[65px] aspect-square border border-[#8D8A8A] focus:border-primary cursor-pointer' onClick={changeImage.bind(this, '/assets/images/DummyNewProduct3.png')}>
                <img className='h-full w-full object-contain' src="/assets/images/DummyNewProduct3.png" />
              </button>
            </div>
          </div>

          <div>
            <h2 className='font-jakarta lg:text-3xl md:text-2xl text-xl font-bold mb-3'>Bar Table</h2>

            <div className='flex gap-1 mb-5'>
              <img src='/assets/icons/IconStarFull.svg' />
              <img src='/assets/icons/IconStarFull.svg' />
              <img src='/assets/icons/IconStarFull.svg' />
              <img src='/assets/icons/IconStarFull.svg' />
              <img src='/assets/icons/IconStarNull.svg' />
              <p className='self-end font-jakarta md:text-sm text-xs font-normal text-[#8D8A8A]'>(4)</p>
            </div>

            <div className='flex justify-between items-center mb-6'>
              <p className='font-lato lg:text-base md:text-sm text-xs font-normal'>17 - 21 Days</p>
              <p className='font-jakarta lg:text-xl md:text-lg text-base font-bold'>{formatRupiah(price)}</p>
            </div>

            <h5 className='font-jakarta lg:text-2xl md:text-xl text-lg font-bold mb-3'>Description Product</h5>

            <p className='font-lato lg:text-base md:text-sm text-xs font-normal mb-3'>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>

            <div className='mb-3'>
              <h6 className='font-lato lg:text-base md:text-sm text-xs font-semibold mb-1'>Dimensions :</h6>
              <ul>
                <li className='font-lato lg:text-base md:text-sm text-xs font-normal pl-1'>4 Seats &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: 150cm (P) x 90cm (L) x 76cm (T) (100kg)</li>
                <li className='font-lato lg:text-base md:text-sm text-xs font-normal pl-1'>6 Seaters &nbsp; &nbsp; &nbsp; : 180cm (P) x 90cm (L) x 76cm (T) (115kg)</li>
                <li className='font-lato lg:text-base md:text-sm text-xs font-normal pl-1'>6+2 Seaters : 210cm (P) x 110cm (L) x 76cm (T) (150kg)</li>
              </ul>
            </div>

            <div className='mb-3'>
              <h6 className='font-lato lg:text-base md:text-sm text-xs font-semibold mb-1'>Material :</h6>
              <ul>
                <li className='font-lato lg:text-base md:text-sm text-xs font-normal pl-1'>Italian Marble (Top)</li>
                <li className='font-lato lg:text-base md:text-sm text-xs font-normal pl-1'>Steels (Base)</li>
              </ul>
            </div>

            <div className='flex justify-between items-start mb-3'>
              <h6 className='font-lato lg:text-base md:text-sm text-xs font-semibold'>Variant</h6>
              <div className='flex gap-2'>
                <div className='w-[30px] h-[30px] rounded-full bg-[#DA0D0D] cursor-pointer'></div>
                <div className='w-[30px] h-[30px] rounded-full bg-[#F4E348] cursor-pointer'></div>
                <div className='w-[30px] h-[30px] rounded-full bg-[#2C9F19] cursor-pointer'></div>
                <div className='w-[30px] h-[30px] rounded-full bg-[#0C24F6] cursor-pointer'></div>
                <div className='w-[30px] h-[30px] rounded-full bg-[#000000] cursor-pointer'></div>
              </div>
            </div>

            <div className='flex justify-between items-start mb-3'>
              <h6 className='font-lato lg:text-base md:text-sm text-xs font-semibold'>Seater Size</h6>

              <div className={open === true ? 'border border-[#D9D9D9] px-3 py-1 rounded-[5px] cursor-pointer active' : 'border border-[#D9D9D9] px-3 py-1 rounded-[5px] cursor-pointer'} onClick={selectBox}>
                <div className='flex'>
                  <input className='placeholder:font-jakarta placeholder:text-xs placeholder:font-normal placeholder:text-[#8D8A8A] mb-1 border-none outline-none cursor-pointer' type='text' placeholder={selectedSeaters} readOnly />
                  <img className='rotate-[-90deg] arrowSelect' src='/assets/icons/IconArrowLeft.svg' />
                </div>
                <div className='selectItems mb-1'>
                  <p className="font-jakarta md:text-sm text-xs font-normal pt-1 after:content-[''] after:block after:pt-1 after:border-b after:border-[#D9D9D9] after:w-3 after:duration-500 hover:after:w-full hover:after:border-primary" onClick={show.bind(this, '4 Seats')}>4 Seats</p>
                  <p className="font-jakarta md:text-sm text-xs font-normal pt-1 after:content-[''] after:block after:pt-1 after:border-b after:border-[#D9D9D9] after:w-3 after:duration-500 hover:after:w-full hover:after:border-primary" onClick={show.bind(this, '6 Seats')}>6 Seats</p>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-start mb-10'>
              <h6 className='font-lato lg:text-base md:text-sm text-xs font-semibold'>Quantity</h6>
              <div className='grid grid-cols-3 h-[30px] w-[90px] text-center items-center select-none'>
                <span className='font-jakarta lg:text-base md:text-sm text-xs font-normal text-primary border border-[#BCC2C2] bg-[#D9D9D9] rounded-l-[10px] cursor-pointer' onClick={countDown}> - </span>
                <span className='font-jakarta lg:text-base md:text-sm text-xs font-normal border-y border-[#BCC2C2] bg-[#D9D9D9]'> {count} </span>
                <span className='font-jakarta lg:text-base md:text-sm text-xs font-normal text-primary border border-[#BCC2C2] bg-[#D9D9D9] rounded-r-[10px] cursor-pointer' onClick={countUp}> + </span>
              </div>
            </div>

            <div className='flex lg:flex-row flex-col gap-[15px] mb-[135px]'>
              <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold px-12 py-[10px] border border-primary bg-primary text-white duration-500 hover:bg-white hover:text-primary rounded-[10px]'>Add to cart</button>
              <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold px-12 py-[10px] border border-primary text-primary duration-500 hover:bg-primary hover:text-white rounded-[10px]'>Checkout now</button>
            </div>
          </div>
        </section>

        <section>
          <h2 className='font-jakarta lg:text-3xl md:text-2xl text-xl font-bold mb-6'>YOU MAY ALSO LIKE</h2>

          <div className="flex items-center gap-[50px] h-auto w-full overflow-auto mb-[130px] scrollbar-custom">
            {products.map(function(data, index) {
              if (index <= 6) {
                return <div className='px-10 py-6 bg-[#FDF5F5] inline-block' key={index}>
                  <div className='h-[180px] aspect-square mb-5'>
                    <img className='h-full w-full object-cover' src={data.url} />
                  </div>
                  <p className='font-lato md:text-sm text-xs font-light mb-2'>{data.name}</p>
                  <p className='font-lato md:text-sm text-xs font-medium mb-2'>{formatRupiah(data.price)}</p>
                </div>
              }
            })}
            <div className='h-[180px] aspect-square flex flex-col justify-center items-center'>
              <a href='#'>
                <img className='rotate-180 px-5 py-[19px] rounded-full border bg-[#FDF5F5] border-black mb-4' src='/assets/icons/IconArrowLeft.svg' />
              </a>
              <p className='font-lato md:text-sm text-xs font-medium'>See More</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetail
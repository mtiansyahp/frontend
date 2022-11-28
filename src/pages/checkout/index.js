import Radio from '@mui/material/Radio'
import InputMask from 'react-input-mask'
import { Link, useLocation } from 'react-router-dom'
import { useLayoutEffect, useRef, useState } from 'react'

import { formatRupiah } from '../../utils'
import { Footer, Navbar } from '../../components'

const Checkout = () => {
  const footerRef = useRef()
  const location = useLocation()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('debit')
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardDate: '',
    cardCVV: '',
    cardName: '',
    mask: '9999 9999 9999 9999',
  })

  const summary = location?.state?.summary

  const handleChangeMethod = (event) => {
    setSelectedPaymentMethod(event.target.value)
  }

  const handleInputCardNumber = (event) => {
    let value = event.target.value
    if(/^3[47]/.test(value)) {
      setCardData(state => ({ ...state, mask: '9999 999999 99999' }))
    }
    setCardData(state => ({ ...state, cardNumber: value }))
  }

  const FormCardData = () => {
    return(
      <div className='grid grid-cols-4 w-full xl:w-3/4 gap-x-4 gap-y-3 mt-3 font-lato text-sm'>
        <div className='card-field-shadow relative col-span-4 md:col-span-2 rounded-[5px]'>
          <InputMask
            mask={cardData.mask}
            maskPlaceholder={''}
            value={cardData.cardNumber}
            onChange={handleInputCardNumber}
            placeholder='Card Number'
            className='w-full py-2 px-4 rounded-[5px]'
          />
          <img src='/assets/icons/IconCreditCard.svg' className='hidden sm:absolute top-[2px] right-2'/>
        </div>
        <div className='card-field-shadow relative col-span-2 md:col-span-1 rounded-[5px]'>
          <InputMask
            mask={'99/99'}
            placeholder='MM/YY'
            maskPlaceholder={''}
            className='w-full py-2 px-4 rounded-[5px]'
            value={cardData.cardDate}
            onChange={(event) => setCardData(state => ({ ...state, cardDate: event.target.value }))}
          />
          <img src='/assets/icons/IconCalender.svg' className='hidden sm:absolute top-[5px] right-2'/>
        </div>
        <div className='card-field-shadow relative col-span-2 md:col-span-1 rounded-[5px]'>
          <input
            type='text'
            maxLength={4}
            placeholder='CVV'
            inputMode='numeric'
            className='w-full py-2 px-4 rounded-[5px]'
            onChange={(event) => setCardData(state => ({ ...state, cardCVV: event.target.value }))}
          />
          <img src='/assets/icons/IconCVV.svg' className='hidden sm:absolute top-[2px] right-2'/>
        </div>
        <input
          type='text'
          placeholder='Card holder name'
          className='card-field-shadow col-span-4 py-2 px-4 rounded-[5px]'
          onChange={(event) => setCardData(state => ({ ...state, cardName: event.target.value }))}
        />
      </div>
    )
  }

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
          <span> | Home {'>'} Checkout </span>
        </span>
        <p className='font-jakarta text-2xl md:text-3xl lg:text-4xl text-black mt-12 mb-5 tracking-wide'>Checkout</p>
        <div className='grid grid-cols-5 gap-x-14'>
          <div className='col-span-5 lg:col-span-3'>
            <section id='shipment-address' className='checkout-shadow grid grid-cols-5 my-5 py-4 pl-7 pr-3 rounded-[10px]'>
              <div className='col-span-4 grid grid-cols-2 font-jakarta text-black'>
                <div className='col-span-2 md:col-span-1'>
                  <p className='text-sm'>Shipment</p>
                  <div className='lg:grid lg:grid-cols-2 mt-1 lg:mt-3'>
                    <p className='text-xs font-medium'>Budi Setiawan</p>
                    <p className='text-xs font-medium'>+628 xx-xxxx-xxxx</p>
                  </div>
                </div>
                <div className='col-span-2 md:col-span-1 mt-3 md:mt-0'>
                  <p className='font-jakarta text-sm'>Address</p>
                  <p className='font-jakarta text-xs font-medium tracking-wide mt-1 lg:mt-3 mb-1'>Home</p>
                  <p className='font-lato text-xs'>Jl. Brigjend H Kasim No 1880 RT 023 RW 005, Bukit Sangkal, Kalidoni, Palembang, Sumatera Selatan</p>
                </div>
              </div>
              <div className='col-span-1 justify-self-end'>
                <br />
                <button className='font-jakarta font-medium text-xs text-black uppercase underline underline-offset-1'>Change</button>
              </div>
            </section>
            <section id='payment-method' className='checkout-shadow pt-3 px-8 pb-8 rounded-[10px]'>
              <p className='mb-4 font-jakarta font-medium text-xs text-black tracking-wide uppercase'>Payment Method</p>
              <div className='checkout-shadow py-3 px-4 rounded-[10px]'>
                <div className='flex'>
                  <div className='mr-1 md:mr-3 -mt-2.5'>
                    <Radio
                      size='small'
                      value='debit'
                      name='payment_method'
                      onChange={handleChangeMethod}
                      checked={selectedPaymentMethod === 'debit'}
                      sx={{ color: '#004441', '&.Mui-checked': { color: '#004441' } }}
                    />
                  </div>
                  <div className='w-full'>
                    <p className='font-lato text-xs text-black'>Debit Card</p>
                    <ul className='flex items-center gap-x-4'>
                      <li>
                        <img src='/assets/images/LogoBCA.png' alt='' className='hover:cursor-pointer w-24 h-auto'/>
                      </li>
                      <li>
                        <img src='/assets/images/LogoMandiri.png' alt='' className='hover:cursor-pointer w-24 h-auto'/>
                      </li>
                      <li>
                        <img src='/assets/images/LogoBNI.png' alt='' className='hover:cursor-pointer w-24 h-auto'/>
                      </li>
                      <li>
                        <img src='/assets/images/LogoPermata.png' alt='' className='hover:cursor-pointer w-24 h-auto'/>
                      </li>
                      <li>
                        <img src='/assets/images/LogoBRI.png' alt='' className='hover:cursor-pointer w-24 h-auto'/>
                      </li>
                    </ul>
                    {selectedPaymentMethod === 'debit' && (
                      FormCardData()
                    )}
                    <p className='mt-1 font-lato text-[10px] md:text-xs text-[#5b5555] text-right'>Payment cost: {formatRupiah(4400)}</p>
                  </div>
                </div>
                <div className='w-full h-[1px] bg-[#e5e5e5] my-3'/>
                <div className='flex'>
                  <div className='mr-1 md:mr-3 -mt-2.5'>
                    <Radio
                      size='small'
                      value='credit'
                      name='payment_method'
                      onChange={handleChangeMethod}
                      checked={selectedPaymentMethod === 'credit'}
                      sx={{ color: '#004441', '&.Mui-checked': { color: '#004441' } }}
                    />
                  </div>
                  <div className='w-full'>
                    <p className='font-lato text-xs text-black'>Credit Card</p>
                    <ul className='flex items-center gap-x-4'>
                      <li>
                        <img src='/assets/images/LogoVisa.png' alt='' className='hover:cursor-pointer w-24 h-auto'/>
                      </li>
                      <li>
                        <img src='/assets/images/LogoMastercard.png' alt='' className='hover:cursor-pointer w-24 h-auto'/>
                      </li>
                      <li>
                        <img src='/assets/images/LogoJCB.png' alt='' className='hover:cursor-pointer w-24 h-auto'/>
                      </li>
                      <li>
                        <img src='/assets/images/LogoAmex.png' alt='' className='hover:cursor-pointer w-24 h-auto'/>
                      </li>
                    </ul>
                    {selectedPaymentMethod === 'credit' && (
                      FormCardData()
                    )}
                    <p className='mt-1 font-lato text-[10px] md:text-xs text-[#5b5555] text-right'>Payment cost: {formatRupiah(91000)}</p>
                  </div>
                </div>
              </div>
            </section>
            <section className='checkout-shadow my-9 py-4 pl-7 pr-3 rounded-[10px]'>
              <p className='font-jakarta text-xs text-black tracking-wide uppercase mb-3'>Enter Discount Code</p>
              <div className='flex gap-x-2'>
                <input
                  type='text'
                  placeholder='Enter your Discount Code'
                  className='card-field-shadow font-lato text-xs rounded-[5px] py-2 pl-2 pr-5'
                />
                <button className='font-jakarta font-bold text-xs text-white bg-primary py-2 px-5 rounded-[5px]'>Apply</button>
              </div>
            </section>
          </div>
          <div className='col-span-5 lg:col-span-2 order-first lg:order-last'>
            <section id='shipment-address' className='checkout-shadow my-5 py-4 px-5 rounded-[10px]'>
              <p className='font-jakarta font-medium text-xs text-black tracking-wide uppercase mb-3'>Your order</p>
              {summary?.checkedCartList.map((item, index, arr) => {
                return(
                  <div key={index} className={'flex items-center border-t border-[#d9d9d9] py-1' + (index == (arr.length - 1) && ' border-b')}>
                    <img src={item.image} alt='' className='w-20' />
                    <div className='w-full'>
                      <p className='font-jakarta text-base text-black tracking'>{item.name}</p>
                      <div className='flex justify-between w-full font-lato text-xs text-black'>
                        <p>Color: {item.color}</p>
                        <p>{formatRupiah(item.price)} x {item.count}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className='pt-2 text-xs text-black'>
                <div className='grid grid-cols-2 my-[6px]'>
                  <p className='font-jakarta'>Delivery</p>
                  <p className='font-lato'>{formatRupiah(100000)} <span className='text-[#5b5555] ml-1'>Reguler</span></p>
                </div>
                <div className='grid grid-cols-2 my-[6px]'>
                  <p className='font-jakarta'>Packaging Fee</p>
                  <p className='font-lato'>{formatRupiah(100000)}</p>
                </div>
                <div className='grid grid-cols-2 my-[6px]'>
                  <p className='font-jakarta'>Estetico Point</p>
                  <div className='flex justify-between'>
                    <p className='font-lato'>500 Point</p>
                    <button className='bg-primary text-white font-jakarta font-bold text-xs px-2 rounded-[5px]'>Use</button>
                  </div>
                </div>
                <div className='grid grid-cols-2 my-[6px]'>
                  <p className='font-jakarta'>Discount</p>
                  <p className='font-lato'>{formatRupiah(100000)}</p>
                </div>
                <div className='grid grid-cols-2 my-[6px]'>
                  <p className='font-jakarta'>Payment Costs</p>
                  <p className='font-lato'>{formatRupiah(4400)}</p>
                </div>
                <div className='w-full h-[1px] bg-[#d9d9d9] mt-4 mb-3'/>
                <div className='grid grid-cols-2 font-jakarta font-medium text-base text-black tracking-wide'>
                  <p>TOTAL</p>
                  <p>{formatRupiah(14104400)}</p>
                </div>
              </div>
            </section>
            <div className='hidden lg:block w-100 text-right pr-5'>
              <Link to='/invoice' className='bg-primary font-jakarta font-bold text-xs py-2 px-3 text-white rounded-[10px]'>Payment</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer footerRef={footerRef}/>
    </div>
  )
}

export default Checkout
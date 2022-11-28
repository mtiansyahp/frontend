import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CustomEnqContext } from "../../config/context/customEnqContext";
import { formatRupiah } from '../../utils'

const CartCustomEnquiry = () => {
  const context = useContext(CustomEnqContext);
  const [isCheckAll, setIsCheckAll] = useState(false)

  const [summary, setSummary] = useState({
    subtotalPrice: 0,
    subtotalCount: 0,
    checkedCartList: [],
  })

  const [cartList, setCartList] = useState([
    {
      name: 'Dining Table',
      price: '1250000',
      image: '/assets/images/DummyNewProduct1.png',
      count: 1,
      color: 'Blue',
      isChecked: false,
    },
    {
      name: 'Cafe Table',
      price: '1250000',
      image: '/assets/images/DummyNewProduct2.png',
      count: 1,
      color: 'Blue',
      isChecked: false,
    },
  ])

  const handleChecklistProduct = (index, value) => {
    let cartListTemp = [...cartList]
    cartListTemp[index].isChecked = value
    setCartList(cartListTemp)
    if(value == false) {
      setIsCheckAll(false)
    }
  }

  const handleCheckAllProduct = () => {
    let uncheckedCartList = cartList.filter((item) => item.isChecked == false)
    let resultCartList = [...cartList]
    if(uncheckedCartList.length == 0) {
      resultCartList.map((item, index) => {
        resultCartList[index].isChecked = false
      })
      setIsCheckAll(false)
    } else {
      resultCartList.map((item, index) => {
        resultCartList[index].isChecked = true
      })
      setIsCheckAll(true)
    }
    setCartList(resultCartList)
  }

  const handleProductCount = (index, value) => {
    let cartListTemp = [...cartList]
    if(parseInt(value)) {
      cartListTemp[index].count = parseInt(value)
      setCartList(cartListTemp)
    } else {
      cartListTemp[index].count = 0
      setCartList(cartListTemp)
    }
  }

  const increaseProductCount = (index) => {
    let cartListTemp = [...cartList]
    cartListTemp[index].count += 1
    setCartList(cartListTemp)
  }

  const decreaseProductCount = (index) => {
    let cartListTemp = [...cartList]
    if(cartListTemp[index].count > 1) {
      cartListTemp[index].count -= 1
      setCartList(cartListTemp)
    } else {
      const answer = window.confirm('Hapus produk?')
      if(answer) {
        cartListTemp[index].count = 0
        setCartList(cartListTemp)
      } else {
        alert('gak jadi')
      }
    }
  }

  const deleteProductCount = (index) => {
    const answer = window.confirm('Hapus produk?')
    if(answer) {
      let cartListTemp = [...cartList]
      cartListTemp[index].count = 0
      setCartList(cartListTemp)
    } else {
      alert('gak jadi')
    }
  }

  useEffect(() => {
    let subtotalCount = 0
    let subtotalPrice = 0
    const checkedCartList = cartList.filter((item) => item.isChecked)
    checkedCartList.map((item, index) => {
      subtotalCount += item.count
      subtotalPrice = subtotalPrice + (item.count * item.price)
    })
    setSummary(state => ({
      ...state,
      subtotalPrice: subtotalPrice,
      subtotalCount: subtotalCount,
      checkedCartList: checkedCartList,
    }))
    if(checkedCartList.length == cartList.length) {
      setIsCheckAll(true)
    }
  }, [cartList])

	return (
		<>
			<img
				className="h-[24px] cursor-pointer mb-1 float-right clear-both"
				onClick={() => context.setIsOpenCart(!context.isOpenCart)}
				src="/assets/icons/IconCloseBlack.svg"
				alt=""
			/>
			<p className='font-jakarta text-xl md:text-2xl lg:text-3xl font-light mt-4 mb-8 tracking-[2px]'>My Cart</p>
			<div className='flex items-center gap-5 mb-4'>
				<input
					type='checkbox'
					checked={isCheckAll}
					onChange={handleCheckAllProduct}
					className='w-4 h-4 lg:w-6 lg:h-6 border-black rounded-md'
				/>
				<p className='font-jakarta font-medium text-base md:text-lg lg:text-xl'>Checkout All</p>
			</div>
			
			<div className='grid grid-cols-5 gap-4'>
				<div className='col-span-5 md:col-span-3'>
					{cartList.map((item, index) => {
						return (
							<div key={index} className='flex gap-5 mb-2'>
								<input
									type='checkbox'
									checked={item.isChecked}
									className='w-4 h-4 lg:w-6 lg:h-6 border-black rounded-md'
									onChange={(event) => handleChecklistProduct(index, event.target.checked)}
								/>
								<div className='border border-slate-300 rounded-sm grid grid-cols-1 lg:grid-cols-3 w-full p-4 items-center'>
									<img alt="" src={item.image} className='col-span-1 h-[130px] aspect-square object-cover block m-auto'/>
									<div className='col-span-2'>
										<div className='flex flex-wrap gap-x-10 gap-y-2 md:justify-start justify-center mb-3'>
											<div>
												<span className="font-jakarta text-xs md:text-sm lg:text-base font-semibold">Table Top</span>
												<table className='font-lato md:text-sm text-xs mt-2'>
													<tr>
														<td>Shape</td>
														<td className='w-[20px] text-center'>:</td>
														<td>{item.name}</td>
													</tr>
													<tr>
														<td>Dimension</td>
														<td className='w-[20px] text-center'>:</td>
														<td>{item.name}</td>
													</tr>
													<tr>
														<td>Marble Pattern</td>
														<td className='w-[20px] text-center'>:</td>
														<td>{item.name}</td>
													</tr>
												</table>
											</div>
											<div>
												<span className="font-jakarta text-xs md:text-sm lg:text-base font-semibold">Table Leg</span>
												<table className='font-lato md:text-sm text-xs mt-2' >
													<tr>
														<td>Design</td>
														<td className='w-[20px] text-center'>:</td>
														<td>{item.color}</td>
													</tr>
													<tr>
														<td>Color</td>
														<td className='w-[20px] text-center'>:</td>
														<td>{item.color}</td>
													</tr> 
												</table>
											</div>
										</div>
										<p className="font-jakarta text-xs md:text-sm lg:text-base font-semibold md:text-start text-center">{`${formatRupiah(item.price)} x ${item.count}`}</p>
										<div className='flex gap-x-3 md:justify-end justify-center mt-3'>
											<button onClick={() => deleteProductCount(index)}><img alt="" src='/assets/icons/IconTrash.svg'/></button>
											<div className='h-6 w-[2px] bg-black'/>
											<button onClick={() => increaseProductCount(index)}><img alt="" src='/assets/icons/IconPlus.svg' className='border-2 border-black'/></button>
											<input
												type='text'
												inputMode='numeric'
												value={item.count}
												onChange={(event) => handleProductCount(index, event.target.value)}
												className='border-2 border-black w-6 h-6 font-lato text-sm font-medium text-center'
											/>
											<button onClick={() => decreaseProductCount(index)}><img alt="" src='/assets/icons/IconMinus.svg' className='border-2 border-black'/></button>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				
				<div className='col-span-5 md:col-span-2'>
					<div className='border border-slate-300 p-4 rounded-sm'>
						<p className='font-jakarta font-medium text-base md:text-lg lg:text-xl'>Summary</p>
						<div className='flex justify-between my-3'>
							<p className='font-lato text-xs md:text-sm lg:text-base'>Subtotal Price ({summary.subtotalCount} Item)</p>
							<p>: {formatRupiah(summary.subtotalPrice)}</p>
						</div>
						<div className='w-full h-[1px] bg-black'/>
						<div className='flex justify-between mt-3'>
							<p className='font-lato text-xs md:text-sm lg:text-base'>Total Price</p>
							<p>: {formatRupiah(summary.subtotalPrice)}</p>
						</div>
					</div>
					{summary.subtotalCount > 0 ? (
						<Link
							to='/checkout-custom-enquiry'
							state={{ summary: summary }}
							className='w-fit block ml-auto font-jakarta font-bold text-xs md:text-sm text-white bg-primary rounded-lg py-2 px-6 mt-4'
						>
							Checkout
						</Link>
					) : (
						<button className='block ml-auto font-jakarta font-bold text-xs md:text-sm text-white bg-gray-300 rounded-lg py-2 px-6 mt-4'>Checkout</button>
					)}
				</div>
			</div>
		</>
	)
}

export default CartCustomEnquiry
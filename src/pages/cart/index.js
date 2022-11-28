import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { refreshTokenCustomer } from "../../config/redux/reducer/auth-customer";
import * as constants from "../../constants";
import { formatRupiah } from '../../utils'
import { Footer, Navbar } from '../../components'
import { LoadingSpinner, Customloading } from "../../components";

const base_url = constants.base_url;
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams()
  const footerRef = useRef()
  const getLocalStorageValue = (s) => localStorage.getItem(s);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    refreshToken()
  },[])

  const refreshToken = async () => {
    await dispatch(refreshTokenCustomer())
    .unwrap()
    .then(res => {
        if(res.success) getCart(res.token);
        else navigate(`/login?code=${searchParams.get("code")}&action=my-cart`, { replace: true }); 
    })
    .catch(err => {
        if (err) {
          navigate(`/login?code=${searchParams.get("code")}&action=my-cart`, { replace: true });
        }
    })
  }

  const [isCheckAll, setIsCheckAll] = useState(false)
  const [footerPosition, setFooterPosition] = useState(0)
  const [currentScrollY, setCurrentScrollY] = useState(0)
  const [dataCart, setDatacart] = useState([])
  const [token, setToken] = useState('')
  const [expire, setExpire] = useState('')
  const [name, setName] = useState('')

  const [summary, setSummary] = useState({
    subtotalPrice: 0,
    subtotalCount: 0,
    checkedCartList: [],
  })

  const [cartList, setCartList] = useState([])

  const getCart = async(token) => {
    try{
      setLoading(true)
      const response = await axios.get(base_url + `/cart/get-cart/?phone=${getLocalStorageValue('phone')}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data.data;
      data.forEach((value, index)=>{
          //data[index].harga = value.harga - Math.floor(((value.harga) * (15/100)))
      }) 

      let dataArray = [];
      await Promise.all(data.map( async (value, index) => {
          const code = value.code_varian;
          
          const response = await axios.get(base_url + "/item-code/get-item-code/?code=" + code );
          const top = response.data.data.top;
          const seaters = response.data.data.dimension;
          const color = response.data.data.color;
          const marblePattern = response.data.data.marblePattern;
          const design = response.data.data.design;
          
          value.data_top = top.file
          value.data_seater = seaters.file
          value.data_color = color.file
          value.data_pattern = marblePattern.name
          value.data_kaki = design.nama
      }))

      setCartList(data)
      setLoading(false)
    }
    catch (err) {
      // setLoading(false)
      console.log(err);
    }
  }

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

  const increaseProductCount = async(index, id) => {
    console.log(id)
    let cartListTemp = [...cartList]
    // cartListTemp[index].quantity += 1

    const addToCart = await axios.put(`${base_url}/cart/update-quantity?id=${id}`)
    
    if(addToCart.data.success) {
      // Swal.fire({
      //   title: "Success",
      //   icon:"success",
      //   text : addToCart.data.message,
      //   allowOutsideClick: false,
      //   confirmButtonColor:"#004441"
      // });
      cartListTemp[index].quantity += 1
      setCartList(cartListTemp)
    } else {
      Swal.fire({
        title: "Warning",
        icon:"warning",
        text : 'Something went wrong',
        allowOutsideClick: false,
        confirmButtonColor:"#004441"
      });
    }
    
  }

  const decreaseProductCount = async(index, id) => {
    let cartListTemp = [...cartList]
    if(cartListTemp[index].quantity > 1) {
      // cartListTemp[index].quantity -= 1

      const response = await axios.put(`${base_url}/cart/decrease-quantity?id=${id}`)
    
      if(response.data.success) {
        // Swal.fire({
        //   title: "Success",
        //   icon:"success",
        //   text : response.data.message,
        //   allowOutsideClick: false,
        //   confirmButtonColor:"#004441"
        // });
        cartListTemp[index].quantity -= 1
        setCartList(cartListTemp)
      } else {
        Swal.fire({
          title: "Warning",
          icon:"warning",
          text : 'Something went wrong',
          allowOutsideClick: false,
          confirmButtonColor:"#004441"
        });
      }

    } else {
      Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Data yang telah dihapus tidak dapat dikembalikan lagi",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        let cartListTemp = [...cartList]
        cartListTemp.splice(index, 1);

        const response = await axios.delete(`${base_url}/cart/delete-cart?id=${id}`)
      
        if(response.data.success) {
          Swal.fire({
            title: "Success",
            icon:"success",
            text : response.data.message,
            allowOutsideClick: false,
            confirmButtonColor:"#004441"
          });

          setCartList(cartListTemp)
        } else {
          Swal.fire({
            title: "Warning",
            icon:"warning",
            text : 'Something went wrong',
            allowOutsideClick: false,
            confirmButtonColor:"#004441"
          });
        }
      } 
    })}
  }

  const deleteProductCount = async(index, id) => {
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "Data yang telah dihapus tidak dapat dikembalikan lagi",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Ok',
      denyButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let cartListTemp = [...cartList]
        cartListTemp.splice(index, 1);

        const response = await axios.delete(`${base_url}/cart/delete-cart?id=${id}`)
      
        if(response.data.success) {
          Swal.fire({
            title: "Success",
            icon:"success",
            text : response.data.message,
            allowOutsideClick: false,
            confirmButtonColor:"#004441"
          });

          setCartList(cartListTemp)
        } else {
          Swal.fire({
            title: "Warning",
            icon:"warning",
            text : 'Something went wrong',
            allowOutsideClick: false,
            confirmButtonColor:"#004441"
          });
        }
      } 
    })
  }

  const backNavigate = () => {
    if (searchParams.get("code") == null) {
      navigate('/')
    } else {
      navigate(`/?code=${searchParams.get("code")}`)
    }
  }

  useEffect(() => {
    let subtotalCount = 0
    let subtotalPrice = 0
    const checkedCartList = cartList.filter((item) => item.isChecked)
    checkedCartList.map((item, index) => {
      subtotalCount += item.quantity
      subtotalPrice = subtotalPrice + (item.quantity * item.harga)
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

  useEffect(() => {
    getCart()
    setIsCheckAll(false)
  }, [])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="mt-[50px] lg:px-16 md:p-4 p-2 font-jakarta">

      <section className="fixed z-[6] top-0 left-0 h-[50px] w-full flex justify-between items-center px-5 bg-primary text-white">
        <div className="flex items-center gap-5">
            <img
                className="w-6 ml-[-4px] cursor-pointer rotate-270"
                src="/assets/icons/IconArrowWhiteCircle.svg"
                alt=""
                onClick={backNavigate}
            />

            <h2 className="lg:text-base md:text-sm text-xs font-bold uppercase tracking-wide">My Cart</h2>
        </div>
      </section>

      
      
      {
        loading
        ? <div class="flex flex-col items-center justify-center h-screen">
            <Customloading width={90} height={90} color={`#004441`} />
          </div>
        :
          cartList.length 
          ? 
          (
          <section>
            <div className='flex items-center gap-5 mb-5'>
              <input
                type='checkbox'
                checked={isCheckAll}
                onChange={handleCheckAllProduct}
                className='appearance-none h-4 w-4 border outline outline-1 outline-black checked:bg-primary'
              />
              <p className='font-jakarta font-medium text-base md:text-lg lg:text-xl'>Checkout All</p>
            </div>
            <div className='grid grid-cols-5 gap-4'>
              <div className='col-span-5 sm:col-span-3'>
                {cartList.map((item, index) => {
                  return (
                    <div key={index} className='flex gap-5 mb-2'>
                      <input
                        type='checkbox'
                        checked={item.isChecked}
                        className='appearance-none h-4 w-4 border outline outline-1 outline-black checked:bg-primary'
                        onChange={(event) => handleChecklistProduct(index, event.target.checked)}
                      />
                      <div className='border border-slate-300 rounded-sm grid grid-cols-1 lg:grid-cols-3 w-full p-4 items-center'>
                        <img alt="" src={item.image} className='col-span-1 h-[130px] aspect-square object-cover block m-auto'/>
                        <div>
                          <div className='detail-product'>
                            <p>{item.data_kaki}</p>
                            <p>{item.data_pattern}</p>
                          </div>
                          {/* <p className='font-lato font-light text-xs md:text-sm lg:text-base'>Code Variant: {item.code_varian}</p> */}
                          <p className='font-lato font-normal text-xs md:text-sm lg:text-base'>
                            <div>
                              <label>{`${formatRupiah(item.harga, "IDR")} x ${item.quantity}`}</label>
                              {/* <label className="ml-2 mr-3 line-through text-xs">{formatRupiah( item.harga_original, "IDR" )}</label>
                              <span className="text-xs font-semibold inline-block pt-[1px] pb-[1px] px-2 rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1">
                                20% Off
                              </span> */}
                            </div>
                          </p>
                        </div>
                        <div className='flex gap-x-3 self-end justify-end mt-3'>
                          <button onClick={() => deleteProductCount(index, item.id)}><img alt="" src='/assets/icons/IconTrash.svg'/></button>
                          <div className='h-6 w-[2px] bg-black'/>
                          <button onClick={() => increaseProductCount(index, item.id)}><img alt="" src='/assets/icons/IconPlus.svg' className='border-2 border-black'/></button>
                          <input
                            type='text'
                            inputMode='numeric'
                            value={item.quantity}
                            disabled={true}
                            onChange={(event) => handleProductCount(index, event.target.value)}
                            className='border-2 border-black w-6 h-6 font-lato text-sm font-medium text-center'
                          />
                          <button onClick={() => decreaseProductCount(index, item.id)}><img alt="" src='/assets/icons/IconMinus.svg' className='border-2 border-black'/></button>
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
                    <p>: {formatRupiah(summary.subtotalPrice, "IDR")}</p>
                  </div>
                  <div className='w-full h-[1px] bg-black'/>
                  <div className='flex justify-between mt-3'>
                    <p className='font-lato text-xs md:text-sm lg:text-base'>Total Price</p>
                    <p>: {formatRupiah(summary.subtotalPrice, "IDR")}</p>
                  </div>
                </div>
                <div className='flex justify-end gap-2'>
                  {summary.subtotalCount > 0 ? (
                    <Link
                      to='/checkout-custom-enquiry'
                      state={{ summary: summary }}
                      className='w-fit block font-jakarta font-bold text-xs md:text-sm text-white bg-primary rounded-lg py-2 px-6 mt-4'
                    >
                      <p>Checkout</p>
                    </Link>
                  ) : (
                    <button className='block font-jakarta font-bold text-xs md:text-sm text-white bg-gray-300 rounded-lg py-2 px-6 mt-4'>Checkout</button>
                  )}

                  <Link
                    to='/my-orders'
                    className='w-fit block font-jakarta font-bold text-xs md:text-sm text-white bg-primary rounded-lg py-2 px-6 mt-4'
                  >
                    <p>My orders</p>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : 
          <>
            <div class="flex flex-col items-center justify-center h-screen">
              
              <img src='/assets/images/cart.png' className='w-3/12' />
              <div className='mt-3 md:mt-5'>
                <label className='uppercase text-sm md:text-xl'>Cart Kosong</label>
              </div>

            </div>
          </> 
      }

    </div>
  )
}

export default Cart
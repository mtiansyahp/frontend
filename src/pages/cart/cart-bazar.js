import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { formatRupiah } from '../../utils'
import { Footer, Navbar } from '../../components'
import { useDispatch, useSelector } from "react-redux";
import { refreshTokenCustomer, logoutCustomer } from "../../config/redux/reducer/auth-customer";
import jwt_decode from "jwt-decode";
import * as constants from "../../constants";

var CryptoJS = require("crypto-js");

const CartBazar = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const getLocalStorageValue = (s) => localStorage.getItem(s);
    const footerRef = useRef()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const data = searchParams.get('data');
    
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [footerPosition, setFooterPosition] = useState(0)
    const [currentScrollY, setCurrentScrollY] = useState(0)
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [name, setName] = useState('')

    const [dataCart, setCart] = useState([])
    // const {data} = useParams();
    const items = JSON.parse(getLocalStorageValue('cart'));

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
            name: 'Black Parche Round Cafe Table',
            price: '1250000',
            image: '/assets/images/DummyNewProduct2.png',
            count: 1,
            color: 'Blue',
            isChecked: false,
        },
    ])

    // http://localhost:3000/cart-bazar/U2FsdGVkX1%2FGj1VUC5Sjn4HGXrKuyUE4sEoQERlmKYJvVJwAby7We9Y5XoAbtHXXzlbVJT9SrzsvOz4UaXcF8L4vaqCd6HqckkouvT8yMVM%3D

    const refreshToken = async () => {
      dispatch(refreshTokenCustomer())
      .unwrap()
      .then(res => {
        if(res.success) {
          const decoded = jwt_decode(res.token);
          setToken(res.token);
          setExpire(decoded.exp)
          setName(decoded.name)
        } else {
          navigate(`/login?data=${data}`);
          navigate(0);
        }
          
          // setHakAkses(decoded.accessRights);
          // //HAK Akses
          // if(decoded.role != 'admin') {
          //   navigate("/", { replace: true });
          // }
      })
      .catch(err => {
        if (err.code) {
          navigate(`/login?data=${data}`);
          navigate(0);
        }
      })
    }

    useEffect(() => {
      refreshToken();
    })

    const [summary, setSummary] = useState({
        subtotalPrice: 0,
        subtotalCount: 0,
        checkedCartList: [],
        tipeCheckout : 'bazar'
      })

    const handleChecklistProduct = (index, value) => {
        let cartListTemp = [...dataCart]
        items[index].isChecked = value
        
        localStorage.setItem('cart', JSON.stringify(items));
        cartListTemp[index].isChecked = value
        setCart(cartListTemp)
        if(value == false) {
          setIsCheckAll(false)
        }
    }

    const handleCheckAllProduct = () => {
        let uncheckedCartList = dataCart.filter((item) => item.isChecked == false)
        let resultCartList = [...dataCart]
        if(uncheckedCartList.length == 0) {
          resultCartList.map((item, index) => {
            resultCartList[index].isChecked = false
            items[index].isChecked = false
          })
          setIsCheckAll(false)
        } else {
          resultCartList.map((item, index) => {
            resultCartList[index].isChecked = true
            items[index].isChecked = true
          })
          setIsCheckAll(true)
        }
        localStorage.setItem('cart', JSON.stringify(items));
        setCart(resultCartList)
      }

    const generateCode = () => {

        //HANDLING FAILED DECRYPTED
        try {
            
            if(data) {
                var bytes = CryptoJS.AES.decrypt(data, 'jabjafjaj5h759j123hbyfguiesfhisfuusfkgdfsjkdf23ug4y2g3j234');
                var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                if(!items) {

                    const array = [
                        {
                          "phone" : decryptedData.phone,
                          "code_varian" : decryptedData.code,
                          "harga" : decryptedData.price,
                          "harga_original" : decryptedData.price_original,
                          "isChecked": false,
                          "quantity" : 1
                        }
                    ]
                    localStorage.setItem('cart', JSON.stringify(array));
        
                    setCart(array)
            
                } else {
            
                    const isFound = items.some(element => {
                        if (element.phone == decryptedData.phone && element.code_varian == decryptedData.code && element.harga == decryptedData.price) {
                        return true;
                        }
                    
                        return false;
                    });
                
                    if(!isFound) {
                        const indexku = items.length
                        items.push({
                            "phone" : decryptedData.phone,
                            "code_varian" : decryptedData.code,
                            "harga" : decryptedData.price,
                            "harga_original" : decryptedData.price_original,
                            "isChecked": false,
                            "quantity" : 1
                        })
                
                        localStorage.setItem('cart', JSON.stringify(items));
                    }
        
                    setCart(items)
                }

                searchParams.delete('data');
                setSearchParams(searchParams);
            } else {
              if(!items) {
                setCart([])
              } else {
                setCart(items)
              }
            }
        
        } catch (error) {
          searchParams.delete('data');
          setSearchParams(searchParams);

          if(!items) {
            setCart([])
          } else {
            setCart(items)
          }
        }

    }

    const handleScroll = () => {
        setCurrentScrollY(window.scrollY)
        setFooterPosition(footerRef.current?.offsetTop)
    }

    const increaseProductCount = (index) => {
        let cartListTemp = [...dataCart]
        cartListTemp[index].quantity += 1
        items[index].quantity += 1

        localStorage.setItem('cart', JSON.stringify(items));
        setCart(cartListTemp)
    }

    const decreaseProductCount = (index) => {
        let cartListTemp = [...dataCart]
        if(cartListTemp[index].quantity > 1) {
            cartListTemp[index].quantity -= 1
            items[index].quantity -= 1

            localStorage.setItem('cart', JSON.stringify(items));
            setCart(cartListTemp)
        } else {
          const answer = window.confirm('Hapus produk?')
          if(answer) {
            handleDeleteItem(index)
          } else {
            alert('gak jadi')
          }
        }
    }

    const handleDeleteItem = (index) => {
        items.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(items));
        setCart(items)
    }

    useEffect(() => {
      generateCode()
    }, [])

    useEffect(() => {
        setCurrentScrollY(window.scrollY)
        setFooterPosition(footerRef.current?.offsetTop)
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        let subtotalCount = 0
        let subtotalPrice = 0
        const checkedCartList = dataCart.filter((item) => item.isChecked)
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
    }, [dataCart])

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="mt-[50px] md:p-4 p-2 font-jakarta">
          
          <section className="fixed z-[6] top-0 left-0 h-[50px] w-full flex justify-between items-center px-5 bg-primary text-white">
            <div className="flex items-center gap-5">
                <img
                    className="w-6 ml-[-4px] cursor-pointer rotate-270"
                    src="/assets/icons/IconArrowWhiteCircle.svg"
                    alt=""
                    onClick={() => window.history.go(-1)}
                />

                <h2 className="lg:text-base md:text-sm text-xs font-bold uppercase tracking-wide">My Cart</h2>
            </div>
          </section>

        <section className='pt-24 xl:px-20 lg:px-16 sm:px-10 px-4'>
          <div className='grid grid-cols-5'>
            <div className='col-span-5 sm:col-span-3'>

              <div className='flex items-center'>
                <input
                  type='checkbox'
                  checked={isCheckAll}
                  onChange={handleCheckAllProduct}
                  className='mr-8 w-4 h-4 md:mr-12 lg:mr-16 lg:w-6 lg:h-6 border-black rounded-md'
                />
                <p className='font-jakarta text-2xl text-black'>Checkout All</p>
              </div>
              {dataCart.map((item, index) => {
                return (
                  <div key={index} className='flex my-12'>
                    <input
                      type='checkbox'
                      checked={item.isChecked}
                      className='mr-8 w-4 h-4 md:mr-12 lg:mr-16 lg:w-6 lg:h-6 border-black rounded-md'
                      onChange={(event) => handleChecklistProduct(index, event.target.checked)}
                    />
                    <div className='cart-shadow grid grid-cols-1 lg:grid-cols-3 w-full pt-7 pb-6 px-4 items-center'>
                      <img src={`/assets/img/upload/bazar/${item.code_varian} - ${item.phone}.png`} className='w-full h-auto lg:w-auto lg:h-28'/>
                      <div>
                        <p className='font-jakarta font-medium text-lg md:text-xl lg:text-2xl text-black'>Dining Table</p>
                        <p className='font-lato font-light text-base lg:text-lg text-black'>Code Varian: {item.code_varian}</p>
                        <p className='font-lato font-normal text-base lg:text-lg text-black'>
                          <div>
                            <label className="mr-3 line-through">{formatRupiah( item.harga_original )}</label>
                            <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1">
                              20%
                            </span>
                          </div>

                          <label>{formatRupiah(item.harga)}</label>
                        </p>
                      </div>
                      <div className='flex gap-x-4 self-end justify-end'>
                        <button onClick={() => handleDeleteItem(index)}><img src='/assets/icons/IconTrash.svg'/></button>
                        <div className='h-6 w-[2px] bg-black'/>
                        <button onClick={() => increaseProductCount(index)}><img src='/assets/icons/IconPlus.svg' className='border-2 border-black'/></button>
                        <input
                          type='text'
                          value={item.quantity}
                          inputMode='numeric'
                          readOnly={true}
                          className='border-2 border-black w-6 h-6 font-inter text-base text-black text-center'
                        />
                        <button onClick={() => decreaseProductCount(index)}><img src='/assets/icons/IconMinus.svg' className='border-2 border-black'/></button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* fixed until reach near footer */}
            <div className={(currentScrollY <= (footerPosition - 550)) ? 'col-span-5 sm:fixed sm:top-60 right-4 sm:right-10 lg:right-16 xl:right-20' : 'col-span-5 sm:col-span-2 sm:self-end sm:my-12 sm:justify-self-end'}>
              <div className='lg:w-[300px] xl:w-[400px] shadow-lg p-4 rounded-sm'>
                <p className='font-jakarta font-medium text-lg md:text-xl lg:text-2xl text-black'>Summary</p>
                <div className='flex justify-between my-4'>
                  <p className='font-lato text-base text-black'>Subtotal Price </p>
                  <p>: {formatRupiah(summary.subtotalPrice)}</p>
                </div>
                <div className='w-full h-[1px] bg-black'/>
                <div className='flex justify-between mt-4'>
                  <p className='font-lato text-base text-black'>Total Price</p>
                  <p>: {formatRupiah(summary.subtotalPrice)}</p>
                </div>
              </div>

              <div className='flex'>
                  
              {summary.subtotalCount > 0 ? (
                
                <Link
                    to='/checkout-custom-enquiry'
                    state={{ summary: summary }}
                    className='block w-fit font-jakarta font-bold text-base text-white bg-primary rounded-xl py-2.5 px-6 mt-5'
                >
                    <p>Checkout</p>
                </Link>
                ) : (
                <p className='w-fit font-jakarta font-bold text-base text-white bg-gray-300 rounded-xl py-2.5 px-6 mt-5'>Checkout</p>
                )}

              <Link
                to='/my-orders'
                className='block w-fit font-jakarta font-bold text-base text-white bg-primary rounded-xl py-2.5 px-6 mt-5 ml-5'
              >
                <p>My orders</p>
              </Link>

              </div>

            </div>
          </div>
        </section>
      </div>
    )
}

export default CartBazar
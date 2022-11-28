import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Customloading } from '../../components';
import { formatRupiah } from '../../utils'
import {roundTo, roundToUp, roundToDown} from 'round-to';
import * as constants from "../../constants";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import { refreshTokenCustomer, logoutCustomer } from "../../config/redux/reducer/auth-customer";

const base_url = constants.base_url;

const CheckoutCustomEnquiry = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch()

    const [paymentModal, setPaymentmodal] = useState(false)
    const [loading, setLoading] = useState(false)

    const [url, setUrl] = useState('')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState()
    const [priceIncl, setPriceIncl] = useState(0)
    const [itemsChecked, setItemschecked] = useState(location.state == null ? [] : location.state.summary.checkedCartList)

    const [msgValidation, setMsgvalidation] = useState([])
    const [provinsi, setProvinsi] = useState([])
    const [kota, setKota] = useState([])

    // const [subtotal, setSubtotal] = useState(roundToUp(location.state.summary.subtotalPrice, -6))
    
    const [form, setForm] = useState({
        nama_customer : "",
        phone_customer : "",
        id_provinsi : "",
        id_kota : "",
        kode_pos : "",
        alamat : "",
        tipe_payment : ""
    })

    const refreshToken = async () => {
        dispatch(refreshTokenCustomer())
        .unwrap()
        .then(res => {
          if(res.success) {
            const decoded = jwt_decode(res.token);
            setToken(res.token);
            setExpire(decoded.exp)
            setName(decoded.name)
            setPhone(decoded.phone)
          } else {
            navigate("/login", {
              replace: true 
            });
            navigate(0);
          }
            
        })
        .catch(err => {
          if (err.code) {
            navigate("/login", { replace: true });
            navigate(0);
          }
        })
      }

    const handleFormChange = (e) => {
		// e.preventDefault();
	
		let data = { ...form };
		data[e.target.name] = e.target.value;

        if (e.target.name == 'id_provinsi') {
			getKota(e.target.value)
		}

        if(e.target.name == 'tipe_payment') {
            if(e.target.value == 'BANK TRANSFER') {
                setPriceIncl(5000)
            } else {
                const price = location.state.summary.subtotalPrice + 2775
                const payment_price = Math.floor(((price+(price/(100-2.9))*2.9)/100)*2.9) + 2775
                setPriceIncl(payment_price)
            }
        }
	
		setForm(data);
	};

    const getProvinsi = async() => {
        const response = await axios.get(`${base_url}/orders/get-provinsi`)
        setProvinsi(response.data.data)
    }

    const getKota = async(id_provinsi) => {
		const response = await axios.get(`${base_url}/orders/get-kota?id=${id_provinsi}`)
        setKota(response.data.data)
	};

    const checkout = async() => {
        setLoading(true)
        form.phone_customer = phone
        const newData = {
          'items' : location.state.summary.checkedCartList,
          'orders' : form,
          'total_price' : location.state.summary.subtotalPrice + priceIncl
        }
        
        await axios.post(`${base_url}/orders/${form.tipe_payment == 'CREDIT CARD' ? 'save-orders-cc' : 'save-orders'}`, newData)
        .then(result => {
            setLoading(false)
            if(result.data.success) {

                if(location.state.summary.tipeCheckout == 'bazar') {
                    const items = JSON.parse(localStorage.getItem('cart'));
                    const newCart = items.filter((item) => item.isChecked != true);
                    localStorage.setItem('cart', JSON.stringify(newCart));
                } else {
                    deleteCart(location.state.summary.checkedCartList)
                }

                setUrl(result.data.url)
                setPaymentmodal(true)
            } else {
                setMsgvalidation(result.data.message)
            }
        })
    }

    const deleteCart = async(data) => {
        const newData = {
            'items' : data
        }

        await axios.post(`${base_url}/cart/delete-multiple-cart`, newData)
    }

    const closePayment = () => {
        setPaymentmodal(false)
        if(location.state.summary.tipeCheckout == 'bazar') {
            navigate("/cart-bazar", {
                replace : true
            });
        } else {
            navigate("/my-orders", {
                replace : true
            });
        }
        
    }

    const testempty = async() => {
        // navigate("/payment", {
        //     state: { url: 'https://dw.esteticohome.my.id' },
        //     replace : true
        // });

        setPaymentmodal(true)
        // const items = JSON.parse(sessionStorage.getItem('cart'));
        // const newCart = items.filter((item) => item.isChecked != true);

        // sessionStorage.setItem('cart', JSON.stringify(newCart));

        // let array = []

        // for (var i = 0; i < checked.length; i++) {
        //     testArr.splice(checked[i].index, checked.length);
        // }

        // console.log(checked)

        // sessionStorage.setItem('cart', JSON.stringify(items));
    }

    useEffect(() => {
        refreshToken();
        if(location.state == null) {
            navigate("/cart-bazar", {
                replace : true
            });
        }
    })

    useEffect(() => {
        getProvinsi()
    }, [])

    
    return (
        <div className="mt-[50px] lg:px-16 md:p-4 p-2 font-jakarta">

        <section className="fixed z-[6] top-0 left-0 h-[50px] w-full flex justify-between items-center px-5 bg-primary text-white">
            <div className="flex items-center gap-5">
                <img
                    className="w-6 ml-[-4px] cursor-pointer rotate-270"
                    src="/assets/icons/IconArrowWhiteCircle.svg"
                    alt=""
                    onClick={() => window.history.go(-1)}
                />

                <h2 className="lg:text-base md:text-sm text-xs font-bold uppercase tracking-wide">Checkout</h2>
            </div>
        </section>

            <div className={"fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[12] transition-all duration-500 " +  (paymentModal === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                <div className={"fixed h-[80%] xl:w-[50%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom font-jakarta md:text-sm text-xs " + (paymentModal === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                  
                <img
                    className="h-[24px] cursor-pointer mb-1 float-right clear-both"
                    onClick={closePayment}
                    src="/assets/icons/IconCloseBlack.svg"
                    alt=""
                />
                <iframe style={{width:'100%', height: '80%'}} src={url}></iframe>
                </div>
            </div>

            {
                (msgValidation.length > 0)
                ?   <div className="flex p-4 mb-10 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Danger</span>
                        <div>
                            <span className="font-medium">Ensure that these requirements are met:</span>
                            <ul className="mt-1.5 ml-4 text-red-700 list-disc list-inside">
                                {
                                    msgValidation.map((validation, index) => (
                                        <li key={index}>{validation}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                :   ''
            }

            <section className='grid md:grid-cols-2 grid-cols-1 gap-5'>

                <div className='py-8 px-4 border border-slate-300 lg:text-base md:text-sm text-xs'>
                    <div className="mb-2.5">
                        <label htmlFor="Name">Name</label>
                        <input
                            type="text"
                            value={form.nama_customer}
                            name="nama_customer"
                            onChange={handleFormChange}
                            className="w-full font-light border border-slate-300 focus:outline-none hover:border-slate-500 focus:border-slate-500 p-1 mt-1"
                        />
                    </div>
                    <div className='grid grid-cols-3 sm:gap-3 gap-1 mb-2.5'>
                        <div>
                            <label htmlFor="Province">Province</label>
                            <select 
                                id="Province"
                                value={form.id_provinsi}
                                name="id_provinsi"
                                onChange={handleFormChange}
                                className="w-full font-light border border-slate-300 focus:outline-none hover:border-slate-500 focus:border-slate-500 py-1 pr-5 mt-1"
                            >
                                <option value='' disabled>Choose one</option>
                                {
                                    provinsi.map((prov, index) => {
                                        return(
                                            <option key={index} value={prov.id_province_rajaongkir}>{prov.name_province_rajaongkir}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="Province">City</label>
                            <select 
                                id="City"
                                value={form.id_kota}
                                name="id_kota"
                                onChange={handleFormChange}
                                className="w-full font-light border border-slate-300 focus:outline-none hover:border-slate-500 focus:border-slate-500 py-1 pr-5 mt-1"
                            >
                                <option value='' disabled>Choose one</option>
                                {
                                    kota.map((dKota, index) => {
                                        return(
                                            <option key={index} value={dKota.id}>{dKota.city_name} ({dKota.type})</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="Post Code">Post Code</label>
                            <input
                                type="text"
                                value={form.kode_pos}
                                name="kode_pos"
                                onChange={handleFormChange}
                                className="w-full font-light border border-slate-300 focus:outline-none hover:border-slate-500 focus:border-slate-500 p-1 mt-1"
                            />
                        </div>
                    </div>
                    <div className="mb-2.5">
                        <label htmlFor="Address">Address</label>
                        <textarea
                            type="text"
                            value={form.alamat}
                            name="alamat"
                            onChange={handleFormChange}
                            className="col-span-3 w-full h-[150px] font-light border border-slate-300 focus:outline-none hover:border-slate-500 focus:border-slate-500 p-1 mt-1"
                        ></textarea>
                    </div>
                    <div>
                        <label>Payment Method</label>
                        <div className='mt-1 flex gap-x-8 gap-y-1 flex-wrap'>
                            <div>
                                <input 
                                    type='radio'
                                    value='BANK TRANSFER'
                                    name="tipe_payment"
                                    id="Bank Transfer"
                                    onChange={handleFormChange}
                                    className='appearance-none h-3 w-3 rounded-full border outline outline-1 outline-black checked:bg-primary mr-2'
                                />
                                <label className='cursor-pointer' htmlFor="Bank Transfer">Bank Transfer (Virtual Account)</label>
                            </div>
                            <div>
                                <input 
                                    type='radio'
                                    value='CREDIT CARD'
                                    name="tipe_payment"
                                    id="Credit Card"
                                    onChange={handleFormChange}
                                    className='appearance-none h-3 w-3 rounded-full border outline outline-1 outline-black checked:bg-primary mr-2'
                                />
                                <label className='cursor-pointer' htmlFor="Credit Card">Credit Card</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='py-8 px-4 border border-slate-300'>
                    
                    {
                        itemsChecked.map((item, index) => {
                            return(

                                <div className='grid grid-cols-1 lg:grid-cols-3 gap-3 items-center mb-5'>
                                    <img alt="" src={location.state.summary.tipeCheckout == 'bazar' ? `/assets/img/upload/bazar/${item.code_varian} - ${item.phone}.png` : item.image} className='col-span-1 h-[130px] aspect-[3/2] object-cover block m-auto p-2 rounded-lg'/>
                                    {/* <div className='col-span-2 flex flex-wrap gap-x-10 gap-y-2 md:justify-evenly justify-center items-center h-full p-2 border border-slate-300'> */}
                                    <div className='col-span-2 flex flex-col gap-x-10 gap-y-2 justify-center items-center h-full p-2 border border-slate-300'>
                                        <div>
                                            <span className="text-xs md:text-sm lg:text-base">Dinning Table</span>
                                        </div>
                                        <div>
                                            <span className="text-xs md:text-sm lg:text-base">{location.state.summary.tipeCheckout == 'bazar' ? item.code_varian : item.name}</span>
                                            {/* <table className='md:text-sm text-xs mt-2'>
                                                <tr>
                                                    <td>Shape</td>
                                                    <td className='w-[20px] text-center'>:</td>
                                                    <td>blablabla</td>
                                                </tr>
                                                <tr>
                                                    <td>Dimension</td>
                                                    <td className='w-[20px] text-center'>:</td>
                                                    <td>blablabla</td>
                                                </tr>
                                                <tr>
                                                    <td>Marble Pattern</td>
                                                    <td className='w-[20px] text-center'>:</td>
                                                    <td>blablabla</td>
                                                </tr>
                                            </table> */}
                                        </div>
                                        {/* <div>
                                            <span className="text-xs md:text-sm lg:text-base">Table Leg</span>
                                            <table className='md:text-sm text-xs mt-2' >
                                                <tr>
                                                    <td>Design</td>
                                                    <td className='w-[20px] text-center'>:</td>
                                                    <td>nanana</td>
                                                </tr>
                                                <tr>
                                                    <td>Color</td>
                                                    <td className='w-[20px] text-center'>:</td>
                                                    <td>nanana</td>
                                                </tr> 
                                            </table>
                                        </div> */}
                                    </div>
                                </div>

                            )
                        })
                    }

                    <div className='p-2 border border-slate-300 mb-4'>
                        <table className='w-full lg:text-base md:text-sm text-xs'>
                            <tr>
                                <td className='py-1.5 pr-10'>Subtotal</td>
                                <td className='py-1.5'>Rp.{formatRupiah(location.state == null ? 0 : location.state.summary.subtotalPrice)}</td>
                            </tr>
                            {
                                (priceIncl != '')
                                ?   <tr>
                                        <td className='py-1.5 pr-10'>Service Charge</td>
                                        <td className='py-1.5'>Rp.{formatRupiah(priceIncl)}</td>
                                    </tr>
                                :   ''
                            }

                            <tr className='border-t-2 border-primary'>
                                <td className='py-1.5 pr-10 font-bold'>Total</td>
                                <td className='py-1.5 font-bold'>Rp.{formatRupiah(location.state == null ? 0 : (location.state.summary.subtotalPrice + priceIncl))}</td>
                            </tr>
                            
                            {/* <tr>
                                <td className='py-1.5 pr-10'>Shipping Fee</td>
                                <td className='py-1.5'>Rp 0</td>
                            </tr> */}
                            {/* <tr>
                                <td className='py-1.5 pr-10'>Payment Costs</td>
                                <td className='py-1.5'>{formatRupiah((subtotal - 1000000) + 990000)}</td>
                            </tr> */}
                        </table>
                    </div>
                    
                    {/* <Link to="/thanks-for-order" className='w-fit block ml-auto font-bold text-xs md:text-sm text-white bg-primary rounded-lg py-2 px-10'>Pay</Link> */}
                    <button className='w-fit block ml-auto font-bold text-xs md:text-sm text-white bg-primary rounded-lg py-2 px-10' onClick={checkout} disabled={loading ? true : false}>
                        {
                            loading
                            ?   <div className="flex gap-2 justify-center">
                                    <Customloading 
                                        height='20'
                                        width='20'
                                        color='#fff'
                                    />
                                    Loading ...
                                </div>
                            : 'Pay Now'
                        }
                        
                    </button>

                    {/* <button className='w-fit block ml-auto font-bold text-xs md:text-sm text-white bg-primary rounded-lg py-2 px-10' onClick={testempty}>Pay Test</button> */}
                </div>
            </section>
        </div>
    )
}

export default CheckoutCustomEnquiry
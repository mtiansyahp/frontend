import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { formatRupiah } from '../../utils'
import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

import { refreshTokenCustomer, logoutCustomer } from "../../config/redux/reducer/auth-customer";
import * as constants from "../../constants";

const base_url = constants.base_url;
const OrderBazar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const getLocalStorageValue = (s) => localStorage.getItem(s);

    const [url, setUrl] = useState('')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [dataOrders, setDataorders] = useState([])
    const [dataItems, setDataitems] = useState([])

    const [modalPay, setModalpay] = useState(false)
    const [modalItems, setModalitems] = useState(false)

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
              state : {pathbazar : 'my-orders'},
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

    const getOrders = async() => {
        const response = await axios.get(`${base_url}/orders/get-orders?phone=${getLocalStorageValue("phone")}`)
        setDataorders(response.data.data)
    }

    const openItems = async(id) => {
        // navigate("/order-item", { 
        //     state : {id : id},
        //     replace: true 
        // });
        
        const response = await axios.get(`${base_url}/orders/get-orders-item?id=${id}`)
        setDataitems(response.data.data)
        setModalitems(true)
        
    }

    const closeItems = () => {
        setModalitems(false)
    }

    const openPayment = (url) => {
        setModalpay(true)
        setUrl(url)
    }

    const refundCc = async(id) => {


        // const data = {
        //   'id' : id
        // }

        // const response = await axios.post(`${base_url}/orders/refund-cc`, data)
        // console.log(response)

        Swal.fire({
            title: "We're Sorry",
            icon:"warning",
            text : "Fitur refund credit card masih dalam tahap pengerjaan, jika anda tetap mau refund maka hubungi admin",
            allowOutsideClick: false,
            confirmButtonColor:"#004441"
        });

    }

    const closePayment = () => {
        setModalpay(false)
        setUrl('')
    }

    useEffect(() => {
        getOrders();
    }, [])

    useEffect(() => {
        refreshToken();
    })

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

                    <h2 className="lg:text-base md:text-sm text-xs font-bold uppercase tracking-wide">My Order</h2>
                </div>
            </section>

            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Invoice Number
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Nama Customer
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Phone Customer
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Tipe Payment
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Status Order
                            </th>
                            <th scope="col" class="py-3 px-6 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataOrders.map((order, index) => {
                                return(
                                    
                                    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {order.invoice_number}
                                        </th>
                                        <td class="py-4 px-6">
                                            {order.nama_customer}
                                        </td>
                                        <td class="py-4 px-6">
                                            {order.phone_customer}
                                        </td>
                                        <td class="py-4 px-6">
                                            {order.tipe_payment}
                                        </td>
                                        <td class="py-4 px-6">
                                            {
                                                order.status_order == 0 ? 'Belum Bayar'
                                                : order.status_order == 1 ? 'Sudah Bayar'
                                                : order.status_order == 2 ? 'Refund Credit'
                                                : 'Lainya'
                                            }
                                        </td>
                                        <td class="py-4 px-6 text-center">
                                            {
                                                order.status_order == 0
                                                ?   <button onClick={() => openPayment(order.url_payment)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-5'>Pay Now</button>
                                                :   order.status_order == 1 && order.tipe_payment == 'CREDIT CARD' ? <button onClick={() => refundCc(order.id)} className='bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full mr-5'>Refund</button>
                                                :   ''
                                            } 
                                            
                                            <button onClick={() => openItems(order.id)} className='bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full mr-5'>Check Items</button>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>

            <div className={"fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[12] transition-all duration-500 " +  (modalPay === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                <div className={"fixed h-[80%] xl:w-[50%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom font-jakarta md:text-sm text-xs " + (modalPay === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                  
                <img
                    className="h-[24px] cursor-pointer mb-1 float-right clear-both"
                    onClick={closePayment}
                    src="/assets/icons/IconCloseBlack.svg"
                    alt=""
                />
                <iframe style={{width:'100%', height: '80%'}} src={url}></iframe>
                </div>
            </div>

            <div className={"fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[12] transition-all duration-500 " +  (modalItems === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                <div className={"fixed h-[80%] xl:w-[50%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom font-jakarta md:text-sm text-xs " + (modalItems === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                  
                <img
                    className="h-[24px] cursor-pointer mb-1 float-right clear-both"
                    onClick={closeItems}
                    src="/assets/icons/IconCloseBlack.svg"
                    alt=""
                />
                
                <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                            <th scope="col" class="py-3 px-6">
                                    Image
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Code Varian
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    quantity
                                </th>
                                <th scope="col" width="200" class="py-3 px-6">
                                    Harga
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataItems.map((items, index) => {
                                    return(

                                        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td class="py-4 px-6">
                                                <img width='50%' src={`/assets/img/upload/cart/${items.code_varian}-${phone}.png`} />
                                            </td>
                                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {items.code_varian}
                                            </th>
                                            <td class="py-4 px-6">
                                                {items.quantity}
                                            </td>
                                            <td class="py-4 px-6">
                                                {formatRupiah(items.harga)}
                                            </td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                </div>
            </div>

        </div>

    )
}

export default OrderBazar
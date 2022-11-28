import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../config/context/adminContext";
import { useLocation } from 'react-router-dom'
import { checkExpiredTokenAdmin } from "../../config/helper/checkexpiredtoken";
import { formatRupiah, formatDollar } from "../../utils";

import * as constants from "../../constants";
import axios from "axios";
import {roundTo, roundToUp, roundToDown} from 'round-to';

const base_url = constants.base_url;
const CustomerActivityDw = () => {

    const location = useLocation()
    const context = useContext(AdminContext);
    const [isOpenModal, setIsopenmodal] = useState(false)

    const [wishlist, setWishlist] = useState([])
    const [order, setOrder] = useState([])
    const [orders, setOrders] = useState([])
    const [isOrder, setIsorder] = useState(true)
    const [isWishlist, setIswishlist] = useState(false)
    const [range, setRange] = useState('')

    const [detail, setDetail] = useState({
        shape : '',
        edge : '',
        dimension : '',
        pattern : '',
        leg_design : '',
        material : '',
        color : '',
        phone : '',
        created : '',
        code : '',
        tipe : ''
    })

    // console.log(location.state.phone)

    // console.log(context.expire)

    const openModal = (shape, edge, dimension, pattern, leg, material, color, phone, created, code, type) => {
        setDetail({
            shape : shape,
            edge : edge,
            dimension : dimension,
            pattern : pattern,
            leg_design : leg,
            material : material,
            color : color,
            phone : phone,
            created : created,
            code : code,
            tipe : type
        })
        setIsopenmodal(true)
    }

    const getWishlist = async() => {

        let data = [];
        // let token
        // let exptest = context.expire
        // let jsonData = await checkExpiredTokenAdmin(exptest);
        // if (jsonData[0].status_expired) {
        //     token = jsonData[0].data_token;
        //     exptest = jsonData[0].tgl_exp;
        // }

        const responseku = await axios.get(`${base_url}/wishlist/get-customer-wishlist-admin/${location.state.phone}`)
        const wishlist = responseku.data.data

        await Promise.all(wishlist.map( async (value, index) => {
            const code = value.code;
            
            const response = await axios.get(base_url + "/item-code/get-item-code/?code=" + code );
            const top = response.data.data.top;
            const edge = response.data.data.edge;
            const seaters = response.data.data.dimension;
            const marblePattern = response.data.data.marblePattern;
            const materialBottom = response.data.data.materialBottom;
            const design = response.data.data.design;
            const color = response.data.data.color;
            const priceTable = await axios.get(base_url + "/texture/get-texture-by-id/" + marblePattern.id + "/" + seaters.id );
            const priceLeg = await axios.get(base_url + "/grade/get-grade-detail-by-kaki-seaters/" + design.id + "/" + seaters.id )
            
            const hargaAsli = (roundToDown(priceTable.data.harga_slab + priceLeg.data.data.harga, -6))  + 5990000;
            
            data.push({
              top,
              edge,
              seaters,
              marblePattern,
              materialBottom,
              design,
              color,
              code : value.code,
              phone : value.phone,
              created : value.createdAt,
              priceTable : priceTable.data.harga_slab,
              priceLeg : priceLeg.data.data.harga,
              wishlist : value,
              hargaDiskon : Math.floor(((hargaAsli * (20/100)))),
              hargaAsli
            })
        }))

        setWishlist(data)

        console.log(data)

    }

    const getOrder = async() => {

        let data = [];
        const responseku = await axios.get(`${base_url}/orders/get-orders-customer?range=${range}&phone=${location.state.phone}`)
        const orders = responseku.data.data

        await Promise.all(orders.map( async (values, index) => {

            const items = values.order_item;

            await Promise.all(items.map( async (value, index) => {

                const code = value.code_varian;
                const response = await axios.get(base_url + "/item-code/get-item-code/?code=" + code );
                const top = response.data.data.top;
                const edge = response.data.data.edge;
                const seaters = response.data.data.dimension;
                const marblePattern = response.data.data.marblePattern;
                const materialBottom = response.data.data.materialBottom;
                const design = response.data.data.design;
                const color = response.data.data.color;
                const priceTable = await axios.get(base_url + "/texture/get-texture-by-id/" + marblePattern.id + "/" + seaters.id );
                const priceLeg = await axios.get(base_url + "/grade/get-grade-detail-by-kaki-seaters/" + design.id + "/" + seaters.id )
                
                const hargaAsli = (roundToDown(priceTable.data.harga_slab + priceLeg.data.data.harga, -6))  + 5990000;
                
                data.push({
                    top,
                    edge,
                    seaters,
                    marblePattern,
                    materialBottom,
                    design,
                    color,
                    phone : values.phone_customer,
                    code : value.code_varian,
                    created : value.createdAt,
                    priceTable : priceTable.data.harga_slab,
                    priceLeg : priceLeg.data.data.harga,
                    wishlist : value,
                    hargaDiskon : Math.floor(((hargaAsli * (20/100)))),
                    hargaAsli
                })
                
            }))

        }))

        setOrder(data)

    }

    const openOrder = async() => {
        setIsorder(true)
        setIswishlist(false)
    }

    const openWishlist = async() => {
        setIsorder(false)
        setIswishlist(true)
    }

    useEffect(() => {
        getWishlist()
        getOrder()
    }, [range])

    return (
        
        <section
            className={
            "top-[50px] h-full relative p-5 bg-[#FFF3E5] " +
            (context.navResponsive == true
                ? "lg:ml-[230px] ml-[55px]"
                : "ml-[55px]")
            }
        >

        <div>
            <div className="flex mb-3">
                <button type="button" onClick={() => setRange('')} class={`py-2 px-3 text-xs font-medium text-center ${range == '' ? 'text-white bg-primary hover:bg-primary hover:text-white' : 'text-primary bg-transparent hover:bg-primary hover:text-white'} rounded-lg focus:ring-4 focus:outline-none`}>All</button>
                <button type="button" onClick={() => setRange(1)} class={`py-2 px-3 text-xs font-medium text-center ${range == 1 ? 'text-white bg-primary hover:bg-primary hover:text-white' : 'text-primary bg-transparent hover:bg-primary hover:text-white'} rounded-lg focus:ring-4 focus:outline-none`}>Today</button>
                <button type="button" onClick={() => setRange(7)} class={`py-2 px-3 text-xs font-medium text-center ${range == 7 ? 'text-white bg-primary hover:bg-primary hover:text-white' : 'text-primary bg-transparent hover:bg-primary hover:text-white'} rounded-lg focus:ring-4 focus:outline-none`}>This Week</button>
                <button type="button" onClick={() => setRange(30)} class={`py-2 px-3 text-xs font-medium text-center ${range == 30 ? 'text-white bg-primary hover:bg-primary hover:text-white' : 'text-primary bg-transparent hover:bg-primary hover:text-white'} rounded-lg focus:ring-4 focus:outline-none`}>This Month</button>
            </div>

            <div class="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-5">
                <table className="w-1/2 text-sm text-left">
                    <thead className="font-normal">
                    <tr>
                        <td>Phone Number</td>
                        <td>Total Enquiry</td>
                        <td>Last Visit</td>
                        <td>Last Known IP</td>
                        <td>Location</td>
                    </tr>
                    </thead>
                    <tbody className="text-base font-bold">
                    <tr>
                        <td>{location.state.phone}</td>
                        <td>{location.state.total}</td>
                        <td>{location.state.last_visit}</td>
                        <td>{location.state.last_ip}</td>
                        <td>{location.state.locate}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
        

        <div className="grid grid-cols-8 gap-1 mb-3">


            <div className="flex">
                <button onClick={openOrder} className={`w-1/2 text-center gap-2 border ${isOrder ? 'bg-green-800 hover:bg-primary' : 'bg-primary hover:bg-green-800'} rounded-[5px] py-1 px-4 font-jakarta text-xs text-white`}>
                    Order
                </button>

                <button onClick={openWishlist} className={`w-1/2 text-center gap-2 border ${isWishlist ? 'bg-green-800 hover:bg-primary' : 'bg-primary hover:bg-green-800'} rounded-[5px] py-1 px-4 font-jakarta text-xs text-white`}>
                    Wishlist
                </button>
            </div>

        </div>

        <div className="grid grid-cols-3 gap-4">

            {
                isWishlist
                ?   wishlist.length > 0
                    ?   wishlist.map((dWish, index) => {
                            return(

                                <div className="flex flex-col bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl">
                                    <div className="items-center">
                                        <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`/assets/img/upload/wishlist/${dWish.code}-${dWish.phone}.png`} alt="" />
                                    </div>
                                    
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">{dWish.code}</h5>
                                        <div className="mb-3">
                                            <p className="font-normal text-gray-700 dark:text-gray-400">{dWish.marblePattern.name}</p>
                                            <p className="font-normal text-gray-700 dark:text-gray-400">{dWish.design.nama}</p>
                                            <p className="font-bold text-gray-700 dark:text-gray-400">Rp.{formatRupiah(dWish.hargaAsli - dWish.hargaDiskon)}</p>
                                        </div>
                                        <button onClick={() => openModal(dWish.top.name, dWish.edge.name, dWish.seaters.name, dWish.marblePattern.name, dWish.design.nama, dWish.materialBottom.name, dWish.color.name, dWish.phone, dWish.created, dWish.code, 'wishlist')} className="flex w-1/2 gap-2 border bg-primary hover:bg-green-800 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white">
                                            <img
                                                className="scale-[65%]"
                                                src="/assets/icons/IconCheckWhite.svg"
                                                alt="View"
                                            />
                                            <p>View</p>
                                        </button>
                                    </div>
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <span class="px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">Wishlist</span>
                                    </div>
                                </div>

                            )
                        })
                    : <p>Tidak ada wishlist</p>
                : ''
            }

            {
                isOrder
                ?   order.length > 0
                    ?   order.map((dOrder, index) => {
                            return(

                                <div className="flex flex-col bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl">
                                    <div className="items-center">
                                        <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={`/assets/img/upload/cart/${dOrder.code}-${dOrder.phone}.png`} alt="" />
                                    </div>
                                    
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">{dOrder.code}</h5>
                                        <div className="mb-3">
                                            <p className="font-normal text-gray-700 dark:text-gray-400">{dOrder.marblePattern.name}</p>
                                            <p className="font-normal text-gray-700 dark:text-gray-400">{dOrder.design.nama}</p>
                                            <p className="font-bold text-gray-700 dark:text-gray-400">Rp.{formatRupiah(dOrder.hargaAsli - dOrder.hargaDiskon)}</p>
                                        </div>
                                        <button onClick={() => openModal(dOrder.top.name, dOrder.edge.name, dOrder.seaters.name, dOrder.marblePattern.name, dOrder.design.nama, dOrder.materialBottom.name, dOrder.color.name, dOrder.phone, dOrder.created, dOrder.code, 'cart')} className="flex w-1/2 gap-2 border bg-primary hover:bg-green-800 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white">
                                            <img
                                                className="scale-[65%]"
                                                src="/assets/icons/IconCheckWhite.svg"
                                                alt="View"
                                            />
                                            <p>View</p>
                                        </button>
                                    </div>
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <span class="px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">Order</span>
                                    </div>
                                </div>

                            )
                        })
                    :   <p>Tidak ada order</p>
                : ''
            }

            {/* <div className="flex flex-col bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl">
                <div className="items-center">
                    <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/assets/img/2D/texture/300_778d4e2dcc54bbf704f67fb5fa32400e.png" alt="" />
                </div>
                
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TYUHFG3TYPOT</h5>
                    <div className="mb-3">
                        <p className="font-normal text-gray-700 dark:text-gray-400">Parletto Royal</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Cavallo</p>
                        <p className="font-bold text-gray-700 dark:text-gray-400">Rp.19.890.000</p>
                    </div>
                    <button className="flex w-1/2 gap-2 border bg-primary hover:bg-green-800 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white">
                        <img
                            className="scale-[65%]"
                            src="/assets/icons/IconCheckWhite.svg"
                            alt="View"
                        />
                        <p>View</p>
                    </button>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <span class="px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">Wishlist</span>
                </div>
            </div> */}

            {/* <div className="grid grid-cols-3 gap-2 bg-white rounded-lg border shadow-md">
                <div className="items-center">
                    <img className="" src="/assets/img/2D/texture/300_778d4e2dcc54bbf704f67fb5fa32400e.png" alt="" />
                </div>
                <div>
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TYUHFG3TYPOT</h5>
                        <div className="mb-3">
                            <p className="font-normal text-gray-700 dark:text-gray-400">Parletto Royal</p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">Cavallo</p>
                            <p className="font-bold text-gray-700 dark:text-gray-400">Rp.19.890.000</p>
                        </div>
                        <button className="flex gap-2 border bg-primary hover:bg-green-800 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white">
                            <img
                                className="scale-[65%]"
                                src="/assets/icons/IconCheckWhite.svg"
                                alt="View"
                            />
                            <p>View</p>
                        </button>
                    </div>
                </div>
                <div>
                    <span class="px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">99+</span>
                </div>
            </div> */}
            
        </div>

        <div
            className={
            "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
            (isOpenModal === true
                ? "opacity-100 visible"
                : "opacity-0 invisible")
            }
        >
            <div
                className={
                    "fixed max-h-[100vh] xl:w-[30%] md:w-[70%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
                    (isOpenModal === true
                    ? "opacity-100 visible"
                    : "opacity-0 invisible")
                }
            >
                <img
                    className="h-[24px] cursor-pointer mb-1 float-right clear-both"
                    onClick={() => setIsopenmodal(false)}
                    src="/assets/icons/IconCloseBlack.svg"
                    alt=""
                />
                <div class="flex flex-col justify-center items-center p-10">
                    <img className="w-full md:h-auto md:w-48 md:rounded-none" src={`/assets/img/upload/${detail.tipe}/${detail.code} - ${detail.phone}.png`} alt="" />
                    <p className="font-bold text-lg mt-3">{detail.phone}</p>
                    <label className="font-light text-xs mb-3">{detail.created}</label>
                    <table className="">
                        <tr>
                            <td>Top Shape </td>
                            <td> <p className="font-bold">: {detail.shape}</p></td>
                        </tr>
                        <tr>
                            <td>Top Edge </td>
                            <td> : {detail.edge}</td>
                        </tr>
                        <tr>
                            <td>Top Dimension </td>
                            <td> : {detail.dimension}</td>
                        </tr>
                        <tr>
                            <td>Top Pattern </td>
                            <td> : {detail.pattern}</td>
                        </tr>
                        <tr>
                            <td>Leg Design </td>
                            <td> : {detail.leg_design}</td>
                        </tr>
                        <tr>
                            <td>Leg Material </td>
                            <td>: {detail.material}</td>
                        </tr>
                        <tr>
                            <td>Leg Color </td>
                            <td> : {detail.color}</td>
                        </tr>
                    </table>
                </div>

            </div>
        </div>


        </section>

    )

}

export default CustomerActivityDw
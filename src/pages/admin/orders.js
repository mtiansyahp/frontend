import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../config/context/adminContext";
import { useLocation } from 'react-router-dom'

import {
    AddButton,
    SearchBar,
    MiniButtonWithIcon,
    LoadingSpinner,
    CurrencyInput,
  } from "../../components";

import * as constants from "../../constants";
import axios from "axios";
import ReactPaginate from "react-paginate";
import {roundTo, roundToUp, roundToDown} from 'round-to';

const base_url = constants.base_url;

const Orders = () => {

    const context = useContext(AdminContext);
    
    const [dataItems, setDataitems] = useState([])

    //pagination
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [limit, setLimit] = useState(10);
    const [query, setQuery] = useState("");

    const [modalItems, setModalitems] = useState(false)

    const findData = async (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
    };

    const openItems = async(id) => {
        const response = await axios.get(`${base_url}/orders/get-orders-item?id=${id}`)
        setDataitems(response.data.data)
        setModalitems(true)
    }

    const closeItems = () => {
        setModalitems(false)
    }

    const changePage = ({ selected }) => {
        setPage(selected);
    };

    const getOrders = async() => {
        const response = await axios.get(`${base_url}/orders/get-all-orders?search_query=${keyword}&page=${page}&limit=${limit}`)
        setOrders(response.data.data.result);
        setPage(response.data.data.page);
        setPages(response.data.data.totalPage);
        setRows(response.data.data.totalRows);
    }

    useEffect(function () {
        const search = document.getElementById("searchIpt");
        search.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("searchBtn").click();
          }
        });
    }, []);

    useEffect(() => {
        getOrders()
    }, [keyword, page])

    return (
        
        <section
            className={
            "top-[50px] h-full relative p-5 bg-[#FFF3E5] " +
            (context.navResponsive == true
                ? "lg:ml-[230px] ml-[55px]"
                : "ml-[55px]")
            }
        >  

            <div className="flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6">
                <SearchBar
                    value={query}
                    actionChange={(e) => setQuery(e.target.value)}
                    action={findData}
                    idIpt="searchIpt"
                    idBtn="searchBtn"
                />
            </div>

            <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
                <table
                className="sm:w-full w-max border border-black"
                id="table--Users"
                >
                <thead>
                    <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
                        <th className="p-2" scope="col">
                            Invoice Number
                        </th>
                        <th className="p-2" scope="col">
                            Nama Customer
                        </th>
                        <th className="p-2" scope="col">
                            Phone Customer
                        </th>
                        <th className="p-2" scope="col">
                            Provinsi
                        </th>
                        <th className="p-2" scope="col">
                            Kota
                        </th>
                        <th className="p-2" scope="col">
                            Alamat
                        </th>
                        <th className="p-2" scope="col">
                            Status Order
                        </th>
                        <th className="p-2" scope="col">
                            Items
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((dOrders, index) => {
                            return(
                                <tr className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal" key={index}>
                                    <td>{dOrders.invoice_number}</td>
                                    <td>{dOrders.nama_customer}</td>
                                    <td>{dOrders.phone_customer}</td>
                                    <td>{dOrders.province}</td>
                                    <td>{dOrders.city_name}</td>
                                    <td>{dOrders.alamat}</td>
                                    <td>
                                        <span class={`inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 ${dOrders.status_order == 0 ? 'bg-red-600' : 'bg-sky-500'} rounded-full`}>{dOrders.status_order == 0 ? 'Belum Bayar' : 'Sudah Bayar'}</span>
                                    </td>
                                    <td>
                                        <button onClick={() => openItems(dOrders.id)} className="w-1/2 text-center gap-2 border bg-primary hover:bg-green-800 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white">Items</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
                </table>
            </div>

            <p className="font-jakarta lg:text-base md:text-sm text-xs">
                Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
            </p>

            <nav key={rows} role="navigation" aria-label="pagination">
                <ReactPaginate
                    previousLabel={
                        <img
                        className="h-[30px] w-[30px] p-[11px] object-cover"
                        src="/assets/icons/IconArrowLeft.svg"
                        alt="Prev"
                        />
                    }
                    nextLabel={
                        <img
                        className="h-[30px] w-[30px] p-[11px] object-cover rotate-180"
                        src="/assets/icons/IconArrowLeft.svg"
                        alt="Next"
                        />
                    }
                    breakLabel={"..."}
                    pageCount={pages}
                    pageRangeDisplayed={2}
                    onPageChange={changePage}
                    containerClassName={"flex items-center justify-center"}
                    pageClassName={
                        "h-[30px] w-[30px] flex items-center justify-center border border-primary ml-[-1px]"
                    }
                    activeClassName={
                        "h-[30px] w-[30px] flex items-center justify-center border border-primary ml-[-1px] bg-primary text-white"
                    }
                    pageLinkClassName={"font-jakarta lg:text-base md:text-sm text-xs"}
                    previousClassName={
                        "h-[30px] w-[30px] flex items-center justify-center border border-primary rounded-l-lg"
                    }
                    nextClassName={
                        "h-[30px] w-[30px] flex items-center justify-center border border-primary ml-[-1px] rounded-r-lg"
                    }
                    previousLinkClassName={"font-jakarta lg:text-base md:text-sm text-xs"}
                    nextLinkClassName={"font-jakarta lg:text-base md:text-sm text-xs"}
                />
            </nav>

            <div className={"fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[12] transition-all duration-500 " +  (modalItems === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                <div className={"fixed h-[80%] xl:w-[50%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom font-jakarta md:text-sm text-xs " + (modalItems === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                  
                <img
                    className="h-[24px] cursor-pointer mb-1 float-right clear-both"
                    onClick={closeItems}
                    src="/assets/icons/IconCloseBlack.svg"
                    alt=""
                />
                
                <div class="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
                    <table className="sm:w-full w-max border border-black">
                        <thead>
                            <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
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
                                            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {items.code_varian}
                                            </th>
                                            <td class="py-4 px-6 text-center">
                                                {items.quantity}
                                            </td>
                                            <td class="py-4 px-6 text-center">
                                                {items.harga}
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

        </section>

    )
}

export default Orders
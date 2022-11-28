import React from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { refreshTokenCustomer, logoutCustomer } from "../../config/redux/reducer/auth-customer";
import jwt_decode from "jwt-decode";
import * as constants from "../../constants";

const base_url = constants.base_url;
const Link = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataLink, setDatalink] = useState([])
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const kode = searchParams.get('link');
    // setSearchParams(kode);

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
            setSearchParams(kode);
            navigate(`/login?link=${kode}`);
            navigate(0);
          }
        })
        .catch(err => {
          if (err.code) {
            setSearchParams(kode);
            navigate(`/login?link=${kode}`);
            navigate(0);
          }
        })
    }
  
    useEffect(() => {
        refreshToken();
    })

    const getLink = async() => {
        const response = await axios.get(`${base_url}/cart/get-link?kode=${kode}`)
        if(response.data.data.length > 0) {
            setDatalink(response.data.data)
        } else {
            setDatalink([])
        }
    }

    const addCart = async(encryp, id) => {

        const response = await axios.put(`${base_url}/cart/update-link?id=${id}`)

        if(response.data.success) {
            navigate(`/cart-bazar?data=${encryp}`);
        }
    }

    useEffect(() => {
        getLink()
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

                    <h2 className="lg:text-base md:text-sm text-xs font-bold uppercase tracking-wide">My Link</h2>
                </div>
            </section>

            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-6">
                                Link
                            </th>
                            <th scope="col" class="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            dataLink.map((dLink, index) => {
                                return(

                                    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dLink.short_link}</th>
                                        <td class="py-4 px-6">
                                            <button onClick={() => addCart(dLink.encrypted, dLink.id)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-5'>Add to cart</button>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                        
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default Link
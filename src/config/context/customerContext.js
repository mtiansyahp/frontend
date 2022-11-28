import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import React, { createContext, useState, useEffect } from 'react'

import { refreshTokenCustomer } from '../redux/reducer/auth-customer';

export const CustomerContext = createContext();

const CustomerProvider = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [name, setName] = useState('')
    const [hakAkses, setHakAkses] = useState('')
    const [navResponsive, setNavResponsive] = useState(true)

    const refreshToken = async () => {
        dispatch(refreshTokenCustomer())
        .unwrap()
        .then(res => {
            const decoded = jwt_decode(res.token);
            setToken(res.token);
            setExpire(decoded.exp)
            setName(decoded.name)
            // setHakAkses(decoded.accessRights);
            // //HAK Akses
            // if(decoded.role != 'admin') {
            //   navigate("/", { replace: true });
            // }
        })
        .catch(err => {
          if (err.code) {
            navigate("/login", { replace: true });
            navigate(0);
          }
        })
    }

    useEffect(() => {
        refreshToken();
    })

    return (
        <CustomerContext.Provider 
            value={{
                token,
                expire
            }}
        >
            {props.children}
        </CustomerContext.Provider>
    );
}

export default CustomerProvider
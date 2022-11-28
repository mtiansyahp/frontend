import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import * as constants from "../../constants";
import { useDispatch } from "react-redux";
import { refreshTokenCustomer } from '../redux/reducer/auth-customer';
import { useSearchParams } from "react-router-dom";
export const CustomEnqContext = createContext();

const CustomEnqProvider = (props) => {
    const dispatch = useDispatch()
    const array = [
        {
            id: 3,
            shape: 'Rounded Corner',
            image: 'LD_CE_rounded_corner.jpg',
            items: [
                {
                    id: 1,
                    name: 'Cavallo',
                    image: 'Rounded Corner/Cavallo.png',
                    url: '/?code=RDCSLMC06CCBSSLCVLBRD'
                },
                {
                    id: 2,
                    name: 'Cavallo Bloc',
                    image: 'Rounded Corner/Cavallo Bloc.png',
                    url: '/?code=RDCSLMC08CMPSSLCVBBRD'
                },
                {
                    id: 3,
                    name: 'Cavallo Slim',
                    image: 'Rounded Corner/Cavallo Slim.png',
                    url: '/?code=RDCSLMC06CRSSSLCVSBRD'
                },
                {
                    id: 4,
                    name: 'Fellice',
                    image: 'Rounded Corner/Fellice.png',
                    url: '/?code=RDCSLMC08AB7SSLFLCBRD'
                },
                {
                    id: 5,
                    name: 'Simply Modern',
                    image: 'Rounded Corner/Simply Modern.png',
                    url: '/?code=RDCSLMC08EBGSSLSMNBDF'
                },
                {
                    id: 6,
                    name: 'Spidery',
                    image: 'Rounded Corner/Spidery.png',
                    url: '/?code=RDCSLMC08PBCSSLSPDBRD'
                },
                {
                    id: 7,
                    name: 'Type X',
                    image: 'Rounded Corner/Type X.png',
                    url: '/?code=RDCSLMC08CMPSSLTPXBRD'
                },
                {
                    id: 8,
                    name: 'Zorro',
                    image: 'Rounded Corner/Zorro.png',
                    url: '/?code=RDCSLMC06CCBSSLZROBDF'
                },
                {
                    id: 9,
                    name: 'Cross Z',
                    image: 'Rounded Corner/Cross Z.png',
                    url: '/?code=RDCSLMC08PBCSSLCRZBDF'
                }
            ]
        },
        {
            id: 1,
            shape: 'Rectangle',
            image: 'LD_CE_rectangle.jpg',
            items: [
                {
                    id: 1,
                    name: 'Cavallo',
                    image: 'Rectangle/Cavallo.png',
                    url: '/?code=RCTSLMC08AB5SSLCVLBRD'
                },
                {
                    id: 2,
                    name: 'Cavallo Bloc',
                    image: 'Rectangle/Cavallo Bloc.png',
                    url: '/?code=RCTSLMC08AB9SSLCVBBDF'
                },
                {
                    id: 3,
                    name: 'Cavallo Slim',
                    image: 'Rectangle/Cavallo Slim.png',
                    url: '/?code=RCTSLMC08AB7SSLCVSBDF'
                },
                {
                    id: 4,
                    name: 'Fellice',
                    image: 'Rectangle/Fellice.png',
                    url: '/?code=RCTSLMC08CRSSSLFLCGDF'
                },
                {
                    id: 5,
                    name: 'Simply Modern',
                    image: 'Rectangle/Simply Modern.png',
                    url: '/?code=RCTSLMC08PGLSSLSMNGDF'
                },
                {
                    id: 6,
                    name: 'Spidery',
                    image: 'Rectangle/Spidery.png',
                    url: '/?code=RCTSLMC08CMPSSLSPDBRD'
                },
                {
                    id: 7,
                    name: 'Type X',
                    image: 'Rectangle/Type X.png',
                    url: '/?code=RCTSLMC08MP2SSLTPXBDF'
                },
                {
                    id: 8,
                    name: 'Zorro',
                    image: 'Rectangle/Zorro.png',
                    url: '/?code=RCTSLMC08MP7SSLZROBDF'
                },
                {
                    id: 9,
                    name: 'Cross Z',
                    image: 'Rectangle/Cross Z.png',
                    url: '/?code=RCTSLMC08PBCSSLCRZBDF'
                }
            ]
        },
        {
            id: 2,
            shape: 'Round',
            image: 'LD_CE_round.jpg',
            items: [
                {
                    id: 1,
                    name: 'Omnia',
                    image: 'Round/Omnia.png',
                    url: '/?code=RNDBVDN05CRBSSLOMNBDF'
                },
                {
                    id: 2,
                    name: 'Orbitus',
                    image: 'Round/Orbitus.png',
                    url: '/?code=RNDBVDN06AB5SSLOBTBDF'
                }
            ]
        }
    ]
    const base_url = constants.base_url;
    const getLocalStorageValue = (s) => localStorage.getItem(s);
    const [dataArray, setDataArray] = useState([]);
    const [design, setDesign] = useState([]);
    const [selectedShape, setSelectedShape] = useState('');
	const [isActive, setIsActive] = useState('page1');
	const [sumWishlist, setSumWishlist] = useState(0);
	const [isOpenCart, setIsOpenCart] = useState(false);
    const navigate = useNavigate();

    const goPage1 = () => {
        setIsActive('page1')
        navigate("/");
    }
    const goPage2 = () => {
        setIsActive('page2')
        navigate("/");
    }
    const goPage3 = () => {
        setIsActive('page3')
        navigate("/");
    }
    const goPage4 = () => {
        setIsActive('page4')
    }
    
    const getDataArray = () => {
        setDataArray(array);
    };

    const getSumWishlist = async () => {
        await dispatch(refreshTokenCustomer())
        .unwrap()
        .then( async (res) => {
            if(res.success) {
                const response = await axios.get(base_url + "/wishlist/get-customer-wishlist/"+ getLocalStorageValue("phone"),{
                    headers: {
                        Authorization: `Bearer ${res.token}`
                    }
                });
                if(response.data.success) {
                    setSumWishlist(response.data.data.length);
                    //console.log("ada brp wishlizt:", response.data.data.length)
                }
            }
            else setSumWishlist(0);
        })
        .catch(err => {
            if (err) {
                setSumWishlist(0);
            }
        })
    }

    useEffect(() => {
        getSumWishlist();
        getDataArray();
        const localStrg = localStorage.getItem("active")
        const localStrgData = localStorage.getItem("getDesign")
        const localStrgShape = localStorage.getItem("getSelectedShape")
        if (localStrg && !searchParams.get("code") ) {
            setIsActive(localStrg)
            setDesign(JSON.parse(localStrgData))
            setSelectedShape(localStrgShape)
            console.log("Running", searchParams.get("code"))
        }
        else {
            localStorage.setItem("active", "page4")
            setIsActive('page4')
            console.log("Running", searchParams.get("code"))
        }
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();
    
    useEffect(() => {
        if(!searchParams.get("code")) localStorage.setItem("active", isActive)
        else {
            localStorage.setItem("active", 'page4');
            setIsActive('page4')
        }
        localStorage.setItem("getDesign", JSON.stringify(design))
        localStorage.setItem("getSelectedShape", selectedShape)
    });

    return (
        <CustomEnqContext.Provider 
            value={{
                array,
                dataArray, 
                setDataArray,
                design, 
                setDesign,
                isActive, 
                setIsActive,
                goPage1,
                goPage2,
                goPage3,
                goPage4,
                sumWishlist, 
                setSumWishlist,
                getSumWishlist,
                isOpenCart, 
                setIsOpenCart,
                selectedShape, 
                setSelectedShape
            }}
        >
            {props.children}
        </CustomEnqContext.Provider>
    );
}

export default CustomEnqProvider
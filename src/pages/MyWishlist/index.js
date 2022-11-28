import CustomerData from "./CustomerData";
import CustomerWishtList from "./CustomerWishList";
import { AdminContext } from "../../config/context/adminContext";
import "tw-elements";
import { LoadingSpinner } from "../../components";
import {useState, useEffect} from 'react';
import * as constants from "../../constants";
import { refreshTokenCustomer } from "../../config/redux/reducer/auth-customer";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
const base_url = constants.base_url;

export default function CustomerDashboard() {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([])
  const getLocalStorageValue = (s) => localStorage.getItem(s);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tokenAccess, setTokenAccess] = useState();
  const [expireAccess, setExpireAccess] = useState();
  
  useEffect(() => {
      refreshToken()
      //console.log(searchParams.get("code"))
  },[])

  const refreshToken = async () => {
    await dispatch(refreshTokenCustomer())
    .unwrap()
    .then(res => {
        if(res.success) getWishlist(res.token);
        else navigate(`/login?code=${searchParams.get("code")}&action=wishlist`, { replace: true }); 
    })
    .catch(err => {
        if (err) {
          navigate(`/login?code=${searchParams.get("code")}&action=wishlist`, { replace: true }); 
        }
    })
  }

  const getWishlist = async (token) => {
    try{
        setLoading(true)
        const response = await axios.get(base_url + "/wishlist/get-customer-wishlist/"+ getLocalStorageValue("phone"),{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if(response.data.success) {
          setLoading(false)
          setWishlist(response.data.data);
          //console.log("ada brp wishlizt:", response.data.data.length)
        }
    } catch (err) {
      setLoading(false)
      console.log(err);
    }
  }

  return (
    <>
      <div className="mt-[50px]">
        <section className="fixed z-[6] top-0 left-0 h-[50px] w-full flex justify-between items-center px-5 bg-primary text-white">
          <div className="flex items-center gap-5">
            {/* <img
              className={
                "w-6 ml-[-4px] cursor-pointer rotate-270"
              }
              src="/assets/icons/IconArrowWhiteCircle.svg"
              alt=""
              // onClick={() => window.history.go(-1) }
              onClick={() => navigate(-1, {replace:true}) }
            /> */}
            <Link to={"/?code="+searchParams.get("code")}>
              <img
                className={
                  "w-6 ml-[-4px] cursor-pointer rotate-270"
                }
                src="/assets/icons/IconArrowWhiteCircle.svg"
                alt=""
              />
            </Link>

            <h2 className="font-jakarta md:text-base text-sm font-bold uppercase tracking-wide">
              My Wishlist
            </h2>
          </div>
        </section>
        {/* <CustomerData /> */}
        <CustomerWishtList wishlist={wishlist} getWishlist={getWishlist} isLoading={loading} setIsLoading={setLoading} />
      </div>
    </>
  );
}

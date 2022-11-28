import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { LOGIN } from '../../config/redux/action'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Countdown from "react-countdown"
import { verifyCustomerOtp, loginCustomerOtp, refreshTokenCustomer } from '../../config/redux/reducer/auth-customer'
import { LoadingSpinner } from '../../components'

const Login = () => {
  const location = useLocation()
  
  const [searchParams, setSearchParams] = useSearchParams();
  const getLocalStorageValue = (s) => localStorage.getItem(s);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showSectionOTP, setShowSectionOTP] = useState(false)
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState('')
  const [code, setCode] = useState()
  const [isLoading, setIsLoading] = useState();
  const [otpNumber, setOTPNumber] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
    value: '',
  })

  const [verifyOtp, setVerifyOtp] = useState([true, ""])
 
  useEffect(()=>{
    const cekSession = async () =>{
      await dispatch(refreshTokenCustomer())
      .unwrap()
      .then(res => {
          setIsLoading(false)
          if(!res.token){
            if(searchParams.get("code") ) setCode(searchParams.get("code"))
            if(getLocalStorageValue("status") == null){
              localStorage.removeItem("phone")
            }
          }
          else navigate(`/?code=${searchParams.get("code") }`, { replace: true });
      })
      .catch(err => {
        navigate(`/?code=${searchParams.get("code") }`, { replace: true });
      })
    }
    setIsLoading(true)
    cekSession();
  },[searchParams])

  const [data, setData] = useState(
    { date: Date.now(), 
      delay: getLocalStorageValue("minute") == null ? 0 : getLocalStorageValue("minute") 
    }
  );
//tes
  const handleInsertOTP = (event, otpIndex) => {
    setOTPNumber(otpNumber => ({ ...otpNumber, [otpIndex]: event.target.value }))
    setVerifyOtp([true], "")
  }

  const handleOTPSubmit = async (e) => {
    setIsLoading(true)
    //e.preventDefault();
    dispatch(verifyCustomerOtp({phone: getLocalStorageValue("phone"), otp : otpNumber, hash: getLocalStorageValue("encrypted"), currentdate : Date.now()}))
    .unwrap()
    .then(res => {
      setIsLoading(false)
      if(res.success) {
        localStorage.removeItem("status");
        localStorage.removeItem("minute");
        localStorage.removeItem("end_date");
        localStorage.removeItem("encrypted");
        const code = searchParams.get("code");
        const action = searchParams.get("action");
        const data = searchParams.get("data");
        const link = searchParams.get("link");
        // let pecahCode = code.split("+")
        // pecahCode.forEach((value, i)=>{
        //     const string = value.replace(/[^a-zA-Z]+/g, ',');
        //     pecahCode[i] = string;
        // })
        if(action && code ) navigate(`/?code=${code.replace(/[+]/g, "%2B")}&action=${action}`, { replace: true });
        else if(code) navigate(`/?code=${code.replace(/[+]/g, "%2B")}`, { replace: true });
        else if(action == "wishlist")  navigate(`/MyWishlist?code=${code}`, {replace:true})
        else if(action == "my-cart")  navigate(`/cart?code=${code}`, {replace:true})
        else if(data) navigate(`/cart-bazar?data=${encodeURIComponent(data)}`, {replace:true})
        else if(link) navigate(`/link?link=${link}`, {replace:true})
        else if(location.state.pathbazar) navigate(`/${location.state.pathbazar}`, {replace:true})
        else if(data == null) navigate(`/cart-bazar`, {replace:true})
        else navigate(`/`, { replace: true });
      }
      else{
        setVerifyOtp([false, res.message])
      }
      
    })
    .catch(err => {
      setIsLoading(false)
      console.log(err)
    })

    //dispatch redux (just like setState, but using global state instead)
    // await dispatch({
    //   type: LOGIN,
    //   user: {
    //     username: 'test',
    //     phoneNumber: phoneNumber,
    //   }
    // })

    //push route to home
    // navigate('/')
  }

  const handleLoginOtp = async(e) => {
    e.preventDefault();
    localStorage.removeItem("status");
    localStorage.removeItem("minute");
    localStorage.removeItem("end_date");
    //localStorage.removeItem("phone");
    localStorage.removeItem("encrypted");
    setVerifyOtp([true, ""])
    setIsLoading(true)
    setOTPNumber({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: ''
    })
    dispatch(loginCustomerOtp({phone :getLocalStorageValue("phone") && getLocalStorageValue("phone") != "" ? getLocalStorageValue("phone") : phoneNumber , currentDate : Date.now()}))
    .unwrap()
    .then(res => {
      if(res.success) {
        setIsLoading(false)
        localStorage.setItem("status",1);
        localStorage.setItem("end_date",res.expired);
        localStorage.setItem("minute",res.minute);
        if( !getLocalStorageValue("phone") || getLocalStorageValue("phone") == "") localStorage.setItem("phone",phoneNumber);
        localStorage.setItem("encrypted",res.data);
        setShowSectionOTP(!showSectionOTP)

        const savedDate = res.expired;
        const currentTime = Date.now();
        const delta = parseInt(savedDate, 10) - currentTime;

        if (delta <= res.minute) {
          setData({ date: currentTime, delay: delta });
        }

      } else {
        if(Array.isArray(res.message)) {
          setMsgValidation(res.message)
        } else {
          setMsgValidation([])
          setSingleMsg(res.message)
        }
        setIsLoading(false)
      }
    })
    .catch(err => {
      setIsLoading(false)
      console.log(err)
    })
  }

  const handleInsertFocus = (element) => {
    if(element.key === 'Delete' || element.key === 'Backspace') {
      const prev = element.target.tabIndex - 2
      if(prev > -1) {
        element.target.form.elements[prev].focus()
      }
    } else if ((element.keyCode >= 48 && element.keyCode <= 57) || (element.keyCode >= 65 && element.keyCode <= 90) || (element.keyCode >= 96 && element.keyCode <= 105) || element.keyCode === 39) {
      const next = element.target.tabIndex
      if(next < 6) {
        element.target.form.elements[next].focus()
      }
    } else if(element.keyCode === 13) {
      handleOTPSubmit()
    }
  }

  const handleEditNomor = () => {
    localStorage.removeItem("status");
    localStorage.removeItem("minute");
    localStorage.removeItem("end_date");
    localStorage.removeItem("phone");
    localStorage.removeItem("encrypted");
    setShowSectionOTP(false)
    setMsgValidation([])
    setSingleMsg()
  }

  useEffect(() => {
    // if(getLocalStorageValue("status") == null) {
    //   localStorage.removeItem("phone");
    //   localStorage.removeItem("encrypted");
    // }
    //localStorage.removeItem("status")
    const savedDate = getLocalStorageValue("end_date");
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      if (delta <= wantedDelay) {
        setData({ date: currentTime, delay: delta });
      }
    }
  }, []);

  const wantedDelay = getLocalStorageValue("minute") == null ? 0 : getLocalStorageValue("minute");

  // const Completionist = () => <span className='text-red-600 font-lato font-medium text-sm'>Maaf, OTP sudah kadaluarsa</span>;
  // const renderer = ({ minutes, seconds, completed }) => {
  //   if (completed) {
  //     return <Completionist />;
  //   } else {
  //     return (
  //       <span className='text-primary font-lato font-medium text-sm'>
  //         {minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };

  const Completionist = () => {
    return <button type="button" onClick={handleLoginOtp} className='bg-black py-2 px-4 rounded-[10px] text-xs text-white' >Kirim Ulang Kode OTP</button>
  }
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <button className='bg-gray-500 py-2 px-4 rounded-[10px] text-xs text-white' disabled={true}>{ minutes.toString().length == 1 ?"0"+minutes : minutes} : {seconds.toString().length == 1 ?"0"+seconds : seconds} </button>
      );
    }
  };
  
  const SectionInsertNumber = () => {

    return (
      <form onSubmit={handleLoginOtp}>
        <div>
          {/* onClick={() => setShowSectionOTP(!showSectionOTP)} */}
          <img
            src="/assets/images/ILAuth.png"
            className="hidden sm:block absolute right-0 h-full w-auto object-cover rounded-r-lg -z-10"
          />
          <div className="w-full sm:w-fit flex flex-col items-center py-12 px-10">
            <img src="/assets/icons/IconLogo.svg" />
            <p className="font-jakarta font-bold text-base my-5">Login</p>
            {msgValidation.length > 0 ? (
              msgValidation.map((validation, index) => (
                <p
                  className="font-jakarta text-base self-start mb-2"
                  key={index}
                >
                  {validation}
                </p>
              ))
            ) : (
              <p className="font-jakarta text-base self-start mb-2">
                {singleMsg}
              </p>
            )}
            <p className="font-jakarta text-xs self-start mb-2">
              No. Handphone
            </p>
            <input
              type="tel"
              placeholder="08**********"
              onChange={(event) => setPhoneNumber(event.target.value)}
              className="w-full sm:w-56 border border-[#d9d9d9] rounded-md py-2.5 pl-2 text-xs focus:outline-none"
            />
            <button className="bg-primary rounded-md text-white py-2 px-7 font-bold mt-2.5 mb-5 text-xs uppercase hover:bg-green-900" data-mdb-ripple="true"
              data-mdb-ripple-color="light">
              Login
            </button>
            <button
              type='button'
              onClick={() => navigate(-1)}
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
              class="inline-block px-6 py-2 bg-slate-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-500 hover:shadow-lg focus:bg-slate-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-600 active:shadow-lg transition duration-150 ease-in-out"
            >
              Cancel login
            </button>
            {/* <span className='font-lato text-xs'>Belum punya akun Estetico Home?{' '}
              <a href='/register' className='font-bold text-primary hover:cursor-pointer'>Daftar</a>
            </span> */}
          </div>
        </div>
      </form>
    );
  }

  const SectionInsertOTP = () => {
    return(
      <form className='w-full h-full flex flex-col items-center py-12 px-5' onSubmit={handleOTPSubmit}>
        <img src='/assets/icons/IconLogo.svg' />
        <p className='font-jakarta font-bold text-base mt-10'>Masukkan Kode OTP</p>
        <p className='font-lato sm:text-sm mini:text-xs  text-black mt-2 mb-2'>Kami telah mengirimkan kode OTP melalui Whatsapp di nomor <b>{getLocalStorageValue("phone")}</b>.
        </p>
        
        <span className='text-red-500 font-lato text-md mb-3'>{verifyOtp[1]}</span>
        <form className='flex font-inter font-medium  text-3xl md:text-4xl lg:text-5xl mb-3 justify-between w-full' autoComplete='off'>
          <input
            name='otp1'
            type='text'
            tabIndex='1'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp1}
            onKeyUp={(element) => handleInsertFocus(element)}
            onInput={(event) => handleInsertOTP(event, 'otp1')}
            className={'border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 '+(verifyOtp[0] ? 'border-black' : 'border-red-600' )+' text-center'}
          />
          <input
            name='otp2'
            type='text'
            tabIndex='2'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp2}
            onKeyUp={(element) => handleInsertFocus(element)}
            onInput={(event) => handleInsertOTP(event, 'otp2')}
            className={'border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 '+(verifyOtp[0] ? 'border-black' : 'border-red-600' )+' text-center'}
          />
          <input
            name='otp3'
            type='text'
            tabIndex='3'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp3}
            onKeyUp={(element) => handleInsertFocus(element)}
            onInput={(event) => handleInsertOTP(event, 'otp3')}
            className={'border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 '+(verifyOtp[0] ? 'border-black' : 'border-red-600' )+' text-center'}
          />
          <input
            name='otp4'
            type='text'
            tabIndex='4'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp4}
            onKeyUp={(element) => handleInsertFocus(element)}
            onInput={(event) => handleInsertOTP(event, 'otp4')}
            className={'border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 '+(verifyOtp[0] ? 'border-black' : 'border-red-600' )+' text-center'}
          />
          <input
            name='otp5'
            type='text'
            tabIndex='5'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp5}
            onKeyUp={(element) => handleInsertFocus(element)}
            onInput={(event) => handleInsertOTP(event, 'otp5')}
            className={'border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 '+(verifyOtp[0] ? 'border-black' : 'border-red-600' )+' text-center'}
          />
          <input
            name='otp6'
            type='text'
            tabIndex='6'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp6}
            onKeyUp={(element) => handleInsertFocus(element)}
            onInput={(event) => handleInsertOTP(event, 'otp6')}
            className={'border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 '+(verifyOtp[0] ? 'border-black' : 'border-red-600' )+' text-center'}
          />
        </form>

        
        <p className='font-lato sm:text-sm mini:text-xs  text-black mb-1 '>Tidak menerima OTP? &nbsp; <span className='text-primary underline cursor-pointer' onClick={handleEditNomor} >Ubah nomor sekarang</span></p>

        <div className='w-full flex flex-row justify-between items-center px-2 mt-5'>
            <Countdown
              date={data.date + data.delay}
              renderer={renderer}
              onStart={(delta) => {
                //Save the end date
                localStorage.getItem("end_date")
              }}
              onComplete={() => {
                localStorage.removeItem("status");
                localStorage.removeItem("minute");
                localStorage.removeItem("end_date");
              }}
            />
            {
              otpNumber.otp1 != "" &&  otpNumber.otp2 != "" && otpNumber.otp3 != "" && otpNumber.otp4 != "" && otpNumber.otp5 != "" && otpNumber.otp6 != "" ? (
                <button onClick={handleOTPSubmit} className='bg-primary py-2 px-4 rounded-[10px] text-xs text-white'>Submit</button>
              ) : (
                <button className='bg-gray-500 py-2 px-4 rounded-[10px] text-xs text-white' disabled={true}>Submit </button>
              )
            }
        </div>
      </form>
    )
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='w-full h-[100vh] flex justify-center sm:items-center'>
      {
        isLoading && (
          <div className='grid h-screen place-items-center'>
            <LoadingSpinner/>
          </div>
        )
      }

      {
        !isLoading && (
          <div className='w-full sm:w-[567px] sm:h-[430px] relative rounded-lg shadow-lg'>
            {getLocalStorageValue("status") == null && !showSectionOTP ? (
              SectionInsertNumber()
            ) : (
              SectionInsertOTP()
            )}
            {/* <SectionInsertOTP/> */}
          </div>
        )
      }
    </div>
  )
}

export default Login
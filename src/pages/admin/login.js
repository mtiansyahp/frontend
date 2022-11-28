import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { authAdmin } from '../../config/redux/reducer/auth-admin';

const LoginAdmin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState('')

  const getStatus = useSelector(state => state.adminReducer.stateAuthAdmin.status)

  const Auth = async (e) => {
    e.preventDefault();
    try {
      dispatch(authAdmin({email : email, password : password}))
      .unwrap()
      .then(res => {
        if(res.success) {
          navigate("/admin");
        } else {
          if(Array.isArray(res.message)) {
            setMsgValidation(res.message)
          } else {
            setMsgValidation([])
            setSingleMsg(res.message)
          }
        }
      })
      .catch(e => {
        console.log(e)
      })
    } catch (error) {
        console.log(error);
    }
  }

  const SectionInsertNumber = () => {
    return(
      <div>
        <form onSubmit={Auth}>
          <div className='fixed h-auto xl:w-[35%] sm:w-[55%] w-[90%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 md:p-10 p-5 rounded-3xl cart-shadow bg-[#FFF3E5]'>
            <img className='block mx-auto' src='/assets/icons/Logo.svg' />
            <h2 className='text-center font-jakarta font-bold text-base my-2'>LOGIN</h2>
            <p className='text-center font-jakarta font-bold text-base mb-5'>CMS CUSTOM ENQUIRY</p>
            <div className={(msgValidation.length || singleMsg) && 'font-jakarta md:text-sm text-xs mb-3 px-3 py-1 border border-red-500 rounded-[5px] bg-red-50 font-semibold text-red-900'}>
              {
                (msgValidation.length > 0)
                ? msgValidation.map((validation, index) => (
                  <p key={index}>{validation}</p>
                ))
                : <p>{singleMsg}</p>
              }
            </div>
            <p className='font-jakarta md:text-sm text-xs font-bold' >Email</p>
            <input
                placeholder='Masukkan Email'
                onChange={(event) => setEmail(event.target.value)}
                className='font-lato md:text-sm text-xs font-light placeholder:text-black border border-black rounded-md w-full py-2 px-4 mt-2 mb-3'
            />
            <p className='font-jakarta md:text-sm text-xs font-bold' >Password</p>
            <input
                type='password'
                placeholder='Masukkan Password'
                onChange={(event) => setPassword(event.target.value)}
                className='font-lato md:text-sm text-xs font-light placeholder:text-black border border-black rounded-md w-full py-2 px-4 mt-2 mb-3'
            />
            {
              (getStatus == 'loading')
              ? <button disabled type="button" className="bg-primary rounded-md text-white py-2 px-10 font-bold mt-2.5 mb-5 md:text-sm text-xs block mx-auto">
                  <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  Loading...
                </button>
              : <button className='bg-primary rounded-md text-white py-2 px-10 font-bold mt-2.5 mb-5 md:text-sm text-xs block mx-auto'>Login</button>
            }
          </div>
        </form>
      </div>
    )
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='fixed h-[100%] w-[100%] top-0 left-0 bg-[#FFF3E5]'>
      {SectionInsertNumber()}
    </div>
  )
}

export default LoginAdmin
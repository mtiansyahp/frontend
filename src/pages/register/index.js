import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='w-full h-[100vh] flex justify-center sm:items-center'>
      <div className='w-full sm:w-[567px] sm:h-[410px] relative rounded-lg shadow-lg'>
        <img src='/assets/images/ILAuth.png' className='hidden sm:block absolute right-0 h-full w-auto object-cover rounded-r-lg -z-10'/>
        <div className='w-full sm:w-fit flex flex-col items-center py-12 px-10'>
          <img src='/assets/icons/IconLogo.svg' />
          <p className='font-jakarta font-bold text-base my-5'>Register</p>
          <p className='font-jakarta text-xs self-start mb-2' >No. Handphone</p>
          <input type='tel' placeholder='Masukkan No. Handphone' className='w-full sm:w-56 border border-[#d9d9d9] rounded-md py-2.5 pl-2 text-xs focus:outline-none'/>
          <button className='bg-primary rounded-md text-white py-2 px-7 font-bold mt-2.5 mb-5 text-xs'>Register</button>
          <span className='font-lato text-xs'>Sudah punya akun Estetico Home?{' '}
            <a href='/login' className='font-bold text-primary hover:cursor-pointer'>Login</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
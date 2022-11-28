import { Link } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { Footer, Navbar } from '../../components'

const UserProfile = () => {

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [selectedTab, setSelectedTab] = useState(0)
  const [changeInfoModal, setChangeInfoModal] = useState(false)
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const [seeCurrentPassword, setSeeCurrentPassword] = useState(false)
  const [seeNewPassword, setSeeNewPassword] = useState(false)
  const [seeReNewPassword, setSeeReNewPassword] = useState(false)
  const [addAddressModal, setAddAddressModal] = useState(false)
  const [changeAddressModal, setChangeAddressModal] = useState(false)
  const [deleteAddressModal, setDeleteAddressModal] = useState(false)

  function changeInfo() {
    setChangeInfoModal(!changeInfoModal)
  }
  function changePassword() {
    setChangePasswordModal(!changePasswordModal)
  }
  function changeSeeCurPas() {
    setSeeCurrentPassword(!seeCurrentPassword)
  }
  function changeSeeNewPas() {
    setSeeNewPassword(!seeNewPassword)
  }
  function changeSeeReNewPas() {
    setSeeReNewPassword(!seeReNewPassword)
  }
  function addAddress() {
    setAddAddressModal(!addAddressModal)
  }
  function changeAddress() {
    setChangeAddressModal(!changeAddressModal)
  }
  function deleteAddress() {
    setDeleteAddressModal(!deleteAddressModal)
  }

  return (
    <div>
      <Navbar />
      <div className='xl:px-20 lg:px-16 sm:px-10 px-4'>

        <section className='pt-24 pb-10'>
          <span className='font-lato text-xs font-medium'>   
            <Link className='hover:text-primary' to='/'>{'<'} Back </Link> | 
            <Link className='hover:text-primary' to='#'> Home </Link> {'>'} User Profile
          </span>
        </section>

        <section>
          <h1 className='font-jakarta font-medium lg:text-4xl md:text-3xl text-2xl tracking-wide mb-8'>User Profile</h1>

          <div className='md:flex'>
            <div className='md:w-[28%]'>
              <button
                onClick={() => setSelectedTab(0)}
                className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 0 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px] text-primary')}>Personal Information</button>
              <button
                onClick={() => setSelectedTab(1)}
                className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 1 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px] text-primary')}>Address</button>
              <button
                onClick={() => setSelectedTab(2)}
                className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide text-black' + (selectedTab == 2 && ' border-y-2 border-r-2 cart-shadow border-primary md:rounded-r-[30px] text-primary')}>Order History</button>
              <Link
                to='/'
                className={'block w-full md:w-3/4 py-3 md:py-5 lg:py-7 px-2 text-left font-jakarta font-medium text-xs md:text-sm lg:text-base tracking-wide border-y-2 border-r-2 cart-shadow border-[#D52E2F] md:rounded-r-[30px] text-[#D52E2F] md:mt-10 mt-5'}>Log Out</Link>
            </div>

            <div className='md:w-[72%] cart-shadow mt-12 md:mt-0 pt-3 pb-[250px] md:px-6 px-3'>
              {selectedTab == 0 && (
                <div>
                  <h2 className='font-jakarta lg:text-4xl md:text-3xl text-2xl font-medium tracking-[3%] text-primary mb-14'>Personal Information</h2>

                  <div className='lg:flex lg:flex-row lg:justify-center lg:gap-10'>
                    <div className='lg:w-[45%] flex flex-col items-center'>
                      <div className='md:h-[250px] h-[180px] aspect-square rounded-full overflow-hidden mb-7 cart-shadow'>
                        <img className='w-full h-full object-cover' src='/assets/images/DummyBlankProfile.jpg' />
                      </div>
                      <div className='relative mb-5'>
                        <input className='w-[65px] rounded-[10px] after:absolute after:top-0 after:left-[50%] after:translate-x-[-50%] after:px-8 after:py-2 after:content-["Edit"] after:flex after:justify-center after:items-center after:font-jakarta after:lg:text-base after:md:text-sm after:text-xs after:font-bold after:text-white after:bg-primary after:rounded-[10px]' type='file' />
                      </div>
                      <p className='font-lato md:text-sm text-xs font-normal md:w-[250px] w-[180px] mb-5'>Besar file: maksimum 10.000.000 bytes (10 Megabytes). Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG</p>
                    </div>

                    <div className='lg:w-[55%]'>
                      <div className='overflow-x-auto scrollbar-custom mb-8'>
                        <table className='w-max'>
                          <tr>
                            <td className='font-jakarta lg:text-xl md:text-lg text-base font-semibold lg:p-3 md:p-2 p-1'>Name</td>
                            <td className='font-lato lg:text-xl md:text-lg text-base font-normal lg:p-3 md:p-2 p-1'>: Budi Setiawan</td>
                          </tr>
                          <tr>
                            <td className='font-jakarta lg:text-xl md:text-lg text-base font-semibold lg:p-3 md:p-2 p-1'>Date of Birth</td>
                            <td className='font-lato lg:text-xl md:text-lg text-base font-normal lg:p-3 md:p-2 p-1'>: 28 Februari 1998</td>
                          </tr>
                          <tr>
                            <td className='font-jakarta lg:text-xl md:text-lg text-base font-semibold lg:p-3 md:p-2 p-1'>Sex</td>
                            <td className='font-lato lg:text-xl md:text-lg text-base font-normal lg:p-3 md:p-2 p-1'>: Laki-Laki</td>
                          </tr>
                          <tr>
                            <td className='font-jakarta lg:text-xl md:text-lg text-base font-semibold lg:p-3 md:p-2 p-1'>Phone Number</td>
                            <td className='font-lato lg:text-xl md:text-lg text-base font-normal lg:p-3 md:p-2 p-1'>: 081234567789</td>
                          </tr>
                          <tr>
                            <td className='font-jakarta lg:text-xl md:text-lg text-base font-semibold lg:p-3 md:p-2 p-1'>Email</td>
                            <td className='font-lato lg:text-xl md:text-lg text-base font-normal lg:p-3 md:p-2 p-1'>: bussddsdbs@gmail.com</td>
                          </tr>
                        </table>
                      </div>

                      <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold text-white px-8 py-2 rounded-[10px] bg-primary mb-5 block' onClick={changeInfo}>Update your detail</button>
                      {/* CHANGE INFO MODAL */}
                      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (changeInfoModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                        <div className={'fixed h-[80%] xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-40%] z-20 md:p-10 p-5 bg-white rounded-3xl cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (changeInfoModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                          <div className='flex justify-between items-center mb-8'>
                            <p className='font-jakarta lg:text-2xl md:text-xl text-lg font-bold'>Change Personal Info</p>
                            <img className='cursor-pointer' onClick={changeInfo} src='/assets/icons/IconCloseBlack.svg' />
                          </div>
                          <div>
                            <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                              Full Name
                              <input
                                type='text'
                                placeholder='Budi Santoso'
                                className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                              />
                            </label>
                            <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                              Phone Number
                              <input
                                type='text'
                                placeholder='(+62) 81234567789'
                                className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                              />
                            </label>
                            <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                              Email
                              <input
                                type='email'
                                placeholder='Budbs@gmail.com'
                                className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                              />
                            </label>
                            <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                              Date of Birth
                              <input
                                type='date'
                                placeholder='28/02/1998'
                                className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                              />
                            </label>
                            <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                              Gender
                              <div className='flex gap-4 mt-2 mb-10'>
                                <label className='flex items-center gap-1'>
                                  <input className='appearance-none h-3 w-3 rounded-full border outline outline-1 outline-black checked:bg-primary' type='radio' name='kategori' />
                                  <p className='font-lato lg:text-base md:text-sm text-xs font-light'>Male</p>
                                </label>
                                <label className='flex items-center gap-1'>
                                  <input className='appearance-none h-3 w-3 rounded-full border outline outline-1 outline-black checked:bg-primary' type='radio' name='kategori' />
                                  <p className='font-lato lg:text-base md:text-sm text-xs font-light'>Female</p>
                                </label>
                              </div>
                            </label>
                            <div className='text-center'>
                              <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold text-white px-8 py-2 rounded-[10px] bg-primary'>Update your profile</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* CHANGE INFO MODAL */}

                      <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold text-white px-8 py-2 rounded-[10px] bg-primary mb-5' onClick={changePassword}>Change your password</button>
                      {/* CHANGE PASSWORD MODAL */}
                      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (changePasswordModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                        <div className={'fixed h-[80%] xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-40%] z-20 md:p-10 p-5 bg-white rounded-3xl cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (changePasswordModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                          <div className='flex justify-between items-center mb-8'>
                            <p className='font-jakarta lg:text-2xl md:text-xl text-lg font-bold'>Change Password</p>
                            <img className='cursor-pointer' onClick={changePassword} src='/assets/icons/IconCloseBlack.svg' />
                          </div>
                          <div>
                            <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                              Enter Your Current Password 
                              <div className='flex items-center gap-4 border border-black rounded-[10px] py-1 px-4 mt-2 mb-5'>
                                <input
                                  type={seeCurrentPassword === true ? 'text' : 'password'}
                                  placeholder='Your current password...'
                                  className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black w-[90%] border-none outline-none'
                                />
                                <img className='w-[10%] scale-[60%]' onClick={changeSeeCurPas} src='/assets/icons/IconEye.svg' />
                              </div>
                            </label>
                            <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                              Enter Your New Password 
                              <div className='flex items-center gap-4 border border-black rounded-[10px] py-1 px-4 mt-2 mb-5'>
                                <input
                                  type={seeNewPassword === true ? 'text' : 'password'}
                                  placeholder='Your new password...'
                                  className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black w-[90%] border-none outline-none'
                                />
                                <img className='w-[10%] scale-[60%]' onClick={changeSeeNewPas} src='/assets/icons/IconEye.svg' />
                              </div>
                            </label>
                            <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                              Re-Enter Your New Password 
                              <div className='flex items-center gap-4 border border-black rounded-[10px] py-1 px-4 mt-2 mb-10'>
                                <input
                                  type={seeReNewPassword === true ? 'text' : 'password'}
                                  placeholder='Your new password...'
                                  className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black w-[90%] border-none outline-none'
                                />
                                <img className='w-[10%] scale-[60%]' onClick={changeSeeReNewPas} src='/assets/icons/IconEye.svg' />
                              </div>
                            </label>
                            <div className='text-center'>
                              <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold text-white px-8 py-2 rounded-[10px] bg-primary'>Change password</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* CHANGE PASSWORD MODAL */}
                    </div>
                  </div>
                </div>
              )}

              {selectedTab == 1 && (
                <div>
                  <h2 className='font-jakarta lg:text-4xl md:text-3xl text-2xl font-medium tracking-[3%] text-primary mb-7'>Address</h2>

                  <div className='text-right mb-10'>
                    <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold text-white px-8 py-2 rounded-[10px] bg-primary' onClick={addAddress}>Add Address</button>
                  </div>
                  {/* ADD ADDRESS MODAL */}
                  <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (addAddressModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                    <div className={'fixed h-[80%] xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-40%] z-[7] md:p-10 p-5 bg-white rounded-3xl cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (addAddressModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                      <div className='flex justify-between items-center mb-8'>
                        <p className='font-jakarta lg:text-2xl md:text-xl text-lg font-bold'>Tambah Alamat</p>
                        <img className='cursor-pointer' onClick={addAddress} src='/assets/icons/IconCloseBlack.svg' />
                      </div>
                      <div>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Nama Penerima
                          <input
                            type='text'
                            placeholder='Masukkan Nama Penerima...'
                            className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                          />
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          No Hp
                          <input
                            type='text'
                            placeholder='Masukkan No Hp...'
                            className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                          />
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Provinsi
                          <select className='font-lato lg:text-base md:text-sm text-xs font-light border border-black rounded-[10px] w-full py-2 px-3 mt-2 mb-5'>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='pilih Provinsi...'>Pilih Provinsi...</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='pilihan1'>Pilihan1</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='dst'>Dst</option>
                          </select>
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Kota
                          <select className='font-lato lg:text-base md:text-sm text-xs font-light border border-black rounded-[10px] w-full py-2 px-3 mt-2 mb-5'>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='pilih Kota...'>Pilih Kota...</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='pilihan1'>Pilihan1</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='dst'>Dst</option>
                          </select>
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Kecamatan
                          <select className='font-lato lg:text-base md:text-sm text-xs font-light border border-black rounded-[10px] w-full py-2 px-3 mt-2 mb-5' id='kecamatan'>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='pilih Kecamatan...'>Pilih Kecamatan...</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='pilihan1'>Pilihan1</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='dst'>Dst</option>
                          </select>
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Alamat Lengkap
                          <textarea
                            rows={4}
                            placeholder='Masukkan Alamat Lengkap (Cth Nama Jalan dll)...'
                            className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                          />
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Tandai Sebagai
                          <div className='flex gap-4 mt-2 mb-5'>
                            <label className='flex items-center gap-1'>
                              <input className='appearance-none h-3 w-3 rounded-full border outline outline-1 outline-black checked:bg-primary' type='radio' name='kategori' />
                              <p className='font-lato lg:text-base md:text-sm text-xs font-light border border-black p-2'>Home</p>
                            </label>
                            <label className='flex items-center gap-1'>
                              <input className='appearance-none h-3 w-3 rounded-full border outline outline-1 outline-black checked:bg-primary' type='radio' name='kategori' />
                              <p className='font-lato lg:text-base md:text-sm text-xs font-light border border-black p-2'>Office</p>
                            </label>
                          </div>
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          <input className='appearance-none h-3 w-3 border outline outline-1 outline-black checked:bg-primary mr-2' type='checkbox' />
                          Jadikan Sebagai Alamat Utama
                        </label>
                        <div className='text-center mt-10'>
                          <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold text-white px-8 py-2 rounded-[10px] bg-primary'>Add Address</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ADD ADDRESS MODAL */}

                  <div className='grid grid-col-1 gap-5'>
                    <div className='cart-shadow lg:px-10 px-4 pt-3 pb-7 sm:flex sm:gap-8'>
                      <div className='sm:w-[60%]'>
                        <p className='font-jakarta md:text-sm text-xs font-medium mb-1 after:ml-3 after:content-["main_addres"] after:p-1 after:text-white after:bg-primary after:rounded-[10px]'>Budi Setiawan</p>
                        <p className='font-lato md:text-sm text-xs font-normal mb-2'>(+62) 81234567789</p>
                        <p className='font-lato md:text-sm text-xs font-normal mb-2'>Jl. Brigjend H Kasim No 1880 RT 023 RW 005, Bukit Sangkal, Kalidoni, Palembang, Sumatera Selatan</p>
                        <button className='font-jakarta md:text-sm text-xs font-normal p-2 border border-black'>Home</button>
                      </div>
                      <div className='sm:w-[40%] sm:pt-0 pt-5'>
                        <p className='font-lato md:text-sm text-xs font-normal text-[#126324] underline decoration-[#126324] cursor-pointer' onClick={changeAddress}>Change Detail</p>
                      </div>
                    </div>
                    
                    <div className='cart-shadow lg:px-10 px-4 pt-3 pb-7 sm:flex sm:gap-8'>
                      <div className='sm:w-[60%]'>
                        <p className='font-jakarta md:text-sm text-xs font-medium mb-1'>Kantor Budi</p>
                        <p className='font-lato md:text-sm text-xs font-normal mb-2'>(+62) 711855312</p>
                        <p className='font-lato md:text-sm text-xs font-normal mb-2'>Jl Rudus Sekip Ujung, No 88, Sekip Ujung, Kemuning, Palembang Sumatera Selatan</p>
                        <button className='font-jakarta md:text-sm text-xs font-normal p-2 border border-black'>Office</button>
                      </div>
                      <div className='sm:w-[40%] sm:pt-0 pt-5 flex gap-5'>
                        <p className='font-lato md:text-sm text-xs font-normal text-[#126324] underline decoration-[#126324] cursor-pointer' onClick={changeAddress}>Change Detail</p>
                        <p className='font-lato md:text-sm text-xs font-normal text-[#126324] underline decoration-[#126324] cursor-pointer' onClick={deleteAddress}>Delete</p>
                      </div>
                    </div>

                    <div className='cart-shadow lg:px-10 px-4 pt-3 pb-7 sm:flex sm:gap-8'>
                      <div className='sm:w-[60%]'>
                        <p className='font-jakarta md:text-sm text-xs font-medium mb-1'>Kantor Budi</p>
                        <p className='font-lato md:text-sm text-xs font-normal mb-2'>(+62) 711855312</p>
                        <p className='font-lato md:text-sm text-xs font-normal mb-2'>Jl Rudus Sekip Ujung, No 88, Sekip Ujung, Kemuning, Palembang Sumatera Selatan</p>
                        <button className='font-jakarta md:text-sm text-xs font-normal p-2 border border-black'>Office</button>
                      </div>
                      <div className='sm:w-[40%] sm:pt-0 pt-5 flex gap-5'>
                        <p className='font-lato md:text-sm text-xs font-normal text-[#126324] underline decoration-[#126324] cursor-pointer' onClick={changeAddress}>Change Detail</p>
                        <p className='font-lato md:text-sm text-xs font-normal text-[#126324] underline decoration-[#126324] cursor-pointer' onClick={deleteAddress}>Delete</p>
                      </div>
                    </div>
                  </div>
                  {/* CHANGE ADDRESS MODAL */}
                  <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (changeAddressModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                    <div className={'fixed h-[80%] xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-40%] z-20 md:p-10 p-5 bg-white rounded-3xl cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (changeAddressModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                      <div className='flex justify-between items-center mb-8'>
                        <p className='font-jakarta lg:text-2xl md:text-xl text-lg font-bold'>Ubah Detail Alamat</p>
                        <img className='cursor-pointer' onClick={changeAddress} src='/assets/icons/IconCloseBlack.svg' />
                      </div>
                      <div>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Nama Penerima
                          <input
                            type='text'
                            placeholder='Budi Santoso'
                            className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                          />
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          No Hp
                          <input
                            type='text'
                            placeholder='(+62) 81234567789'
                            className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                          />
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Provinsi
                          <select className='font-lato lg:text-base md:text-sm text-xs font-light border border-black rounded-[10px] w-full py-2 px-3 mt-2 mb-5'>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='sumatera selatan'>Sumatera Selatan</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='pilihan1'>Pilihan1</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='dst'>Dst</option>
                          </select>
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Kota
                          <select className='font-lato lg:text-base md:text-sm text-xs font-light border border-black rounded-[10px] w-full py-2 px-3 mt-2 mb-5'>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='palembang'>Palembang</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='pilihan1'>Pilihan1</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='dst'>Dst</option>
                          </select>
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Kecamatan
                          <select className='font-lato lg:text-base md:text-sm text-xs font-light border border-black rounded-[10px] w-full py-2 px-3 mt-2 mb-5' id='kecamatan'>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='kalidoni'>Kalidoni</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='pilihan1'>Pilihan1</option>
                            <option className='font-lato lg:text-base md:text-sm text-xs font-light' value='dst'>Dst</option>
                          </select>
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Alamat Lengkap
                          <textarea
                            rows={4}
                            placeholder='Jl. Brigjend H Kasim No 1880 RT 023 RW 005, Bukit Sangkal'
                            className='font-lato lg:text-base md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[10px] w-full py-2 px-4 mt-2 mb-5'
                          />
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          Tandai Sebagai
                          <div className='flex gap-4 mt-2 mb-5'>
                            <label className='flex items-center gap-1'>
                              <input className='appearance-none h-3 w-3 rounded-full border outline outline-1 outline-black checked:bg-primary' type='radio' name='kategori' />
                              <p className='font-lato lg:text-base md:text-sm text-xs font-light border border-black p-2'>Home</p>
                            </label>
                            <label className='flex items-center gap-1'>
                              <input className='appearance-none h-3 w-3 rounded-full border outline outline-1 outline-black checked:bg-primary' type='radio' name='kategori' />
                              <p className='font-lato lg:text-base md:text-sm text-xs font-light border border-black p-2'>Office</p>
                            </label>
                          </div>
                        </label>
                        <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold'>
                          <input className='appearance-none h-3 w-3 border outline outline-1 outline-black checked:bg-primary mr-2' type='checkbox' />
                          Jadikan Sebagai Alamat Utama
                        </label>
                        <div className='text-center mt-10'>
                          <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold text-white px-8 py-2 rounded-[10px] bg-primary'>Add Address</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* CHANGE ADDRESS MODAL */}
                  {/* DELETE ADDRESS MODAL */}
                  <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (deleteAddressModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                    <div className={'fixed h-[80%] xl:w-[35%] md:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-40%] z-20 md:p-10 p-5 bg-white rounded-3xl cart-shadow transition-all duration-500 overflow-auto scrollbar-custom flex flex-col items-center justify-center gap-7 ' + (deleteAddressModal === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
                      <p className='font-jakarta lg:text-2xl md:text-xl text-lg font-bold'>DELETE ADDRESS</p>
                      <p className='font-lato lg:text-base md:text-sm text-xs font-light text-center'>Are you sure to delete address called “Kantor Budi” ?</p>
                      <div className='flex justify-center items-center gap-3'>
                        <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold text-white px-8 py-2 rounded-[10px] bg-primary'>Yes</button>
                        <button className='font-jakarta lg:text-base md:text-sm text-xs font-bold text-primary px-8 py-2 rounded-[10px] border border-primary' onClick={deleteAddress}>Cancel</button>
                      </div>
                    </div>
                  </div>
                  {/* DELETE ADDRESS MODAL */}
                </div>
              )}

              {selectedTab == 2 && (
                <div>
                  <h2 className='font-jakarta lg:text-4xl md:text-3xl text-2xl font-medium tracking-[3%] text-primary mb-14'>Order History</h2>

                  <div className='grid grid-col-1 gap-5'>
                    <div className='cart-shadow lg:px-10 px-4 pt-3 pb-7 lg:flex lg:gap-8'>
                      <div className='lg:w-[73%] flex sm:flex-row flex-col sm:items-center sm:gap-8 gap-4'>
                        <div className='sm:w-[40%] flex sm:flex-col flex-row sm:items-center items-start justify-between'>
                          <p className="font-lato md:text-base text-sm font-normal inline px-1 bg-[#F3EB30] rounded-[10px] sm:order-1 order-2">On Progress</p>
                          <div className='md:h-[90px] h-[70px] aspect-square overflow-hidden sm:order-2 order-1'>
                            <img className='w-full h-full object-cover' src='/assets/images/DummyNewProduct1.png' />
                          </div>
                        </div>
                        <div className='sm:w-[60%]'>
                          <div className='flex gap-3 mb-3'>
                            <p className='font-lato lg:text-base md:text-sm text-xs font-normal'>23 Apr 2022</p>
                            <p className='font-jakarta lg:text-base md:text-sm text-xs font-medium text-primary'>INV00443</p>
                          </div>
                          <p className='font-jakarta lg:text-base md:text-sm text-xs font-semibold mb-3'>BAR TABLE</p>
                          <p className='font-lato md:text-sm text-xs font-normal'>1 x Rp. 10.000.000,00</p>
                        </div>
                      </div>

                      <div className='lg:w-[27%] self-center flex lg:flex-col sm:flex-row flex-col justify-between gap-3 lg:mt-0 mt-4'>
                        <a className='font-lato md:text-sm text-xs font-normal text-[#126324] underline decoration-[#126324] lg:order-1 order-2' href=''>Transaction Detail</a>
                        <p className='font-lato md:text-sm text-xs font-normal lg:order-2 order-1'>Rp. 10.000.000,00</p>
                      </div>
                    </div>

                    <div className='cart-shadow lg:px-10 px-4 pt-3 pb-7 lg:flex lg:gap-8'>
                      <div className='lg:w-[73%] flex sm:flex-row flex-col sm:items-center sm:gap-8 gap-4'>
                        <div className='sm:w-[40%] flex sm:flex-col flex-row sm:items-center items-start justify-between'>
                          <p className="font-lato md:text-base text-sm font-normal inline px-1 bg-[#0BF623] rounded-[10px] sm:order-1 order-2">Done</p>
                          <div className='md:h-[90px] h-[70px] aspect-square overflow-hidden sm:order-2 order-1'>
                            <img className='w-full h-full object-cover' src='/assets/images/DummyNewProduct2.png' />
                          </div>
                        </div>
                        <div className='sm:w-[60%]'>
                          <div className='flex gap-3 mb-3'>
                            <p className='font-lato lg:text-base md:text-sm text-xs font-normal'>27 Dec 2021</p>
                            <p className='font-jakarta lg:text-base md:text-sm text-xs font-medium text-primary'>INV00343</p>
                          </div>
                          <p className='font-jakarta lg:text-base md:text-sm text-xs font-semibold mb-3'>BEIGE SPEAKEASY BAR TABLE</p>
                          <p className='font-lato md:text-sm text-xs font-normal'>1 x Rp. 9.750.000,00</p>
                        </div>
                      </div>

                      <div className='lg:w-[27%] self-center flex lg:flex-col sm:flex-row flex-col justify-between gap-3 lg:mt-0 mt-4'>
                        <a className='font-lato md:text-sm text-xs font-normal text-[#126324] underline decoration-[#126324] lg:order-1 order-2' href=''>Transaction Detail</a>
                        <p className='font-lato md:text-sm text-xs font-normal lg:order-2 order-1'>Rp. 9.750.000,00</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  )
}

export default UserProfile
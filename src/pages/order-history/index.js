import React, {useState} from 'react'
import ModalofDetail from './modal-of-detail';

const OrderHistory = () => {
    const [openDetail, setOpenDetail] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);

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

                    <h2 className="lg:text-base md:text-sm text-xs font-bold uppercase tracking-wide">My Order</h2>
                </div>
            </section>

            <section className='grid xl:grid-cols-2 grid-cols-1 gap-3'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 items-center p-2 border border-slate-300'>
                    <img alt="" src="/assets/images/DummyTableCavalloGalaxy.jpg" className='col-span-1 h-[130px] aspect-[3/2] object-cover block m-auto'/>
                    <div className='col-span-2 h-full'>
                        <div className='flex justify-between items-center mb-2 md:text-sm text-xs'>
                            <span className='font-light'>{new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()}</span>
                            <span className='px-2 bg-yellow-300 rounded-lg font-bold'>On Progress</span>
                        </div>
                        <div className='flex flex-wrap gap-x-10 gap-y-2 justify-between'>
                            <div>
                                <span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Table Top</span>
                                <table className='md:text-sm text-xs mt-2'>
                                    <tr>
                                        <td>Shape</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>blablabla</td>
                                    </tr>
                                    <tr>
                                        <td>Dimension</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>blablabla</td>
                                    </tr>
                                    <tr>
                                        <td>Marble Pattern</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>blablabla</td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Table Leg</span>
                                <table className='md:text-sm text-xs mt-2' >
                                    <tr>
                                        <td>Design</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>nanana</td>
                                    </tr>
                                    <tr>
                                        <td>Color</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>nanana</td>
                                    </tr> 
                                </table>
                            </div>
                            <div className='my-auto'>
                                <p className="text-xs md:text-sm font-light">Rp 20.000.000 x 1</p>
                                <p className="text-xs md:text-sm lg:text-base font-bold">Rp 20.000.000</p>
                            </div>
                            <span onClick={() => {setIsOpenModal(true);setOpenDetail('On Progress');}} className='m-auto underline text-primary md:text-sm text-xs cursor-pointer' >Detail Transaction</span>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 items-center p-2 border border-slate-300'>
                    <img alt="" src="/assets/images/DummyTableCavalloGalaxy.jpg" className='col-span-1 h-[130px] aspect-[3/2] object-cover block m-auto'/>
                    <div className='col-span-2 h-full'>
                        <div className='flex justify-between items-center mb-2 md:text-sm text-xs'>
                            <span className='font-light'>{new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()}</span>
                            <span className='px-2 bg-green-300 rounded-lg font-bold'>Success</span>
                        </div>
                        <div className='flex flex-wrap gap-x-10 gap-y-2 justify-between'>
                            <div>
                                <span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Table Top</span>
                                <table className='md:text-sm text-xs mt-2'>
                                    <tr>
                                        <td>Shape</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>blablabla</td>
                                    </tr>
                                    <tr>
                                        <td>Dimension</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>blablabla</td>
                                    </tr>
                                    <tr>
                                        <td>Marble Pattern</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>blablabla</td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Table Leg</span>
                                <table className='md:text-sm text-xs mt-2' >
                                    <tr>
                                        <td>Design</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>nanana</td>
                                    </tr>
                                    <tr>
                                        <td>Color</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>nanana</td>
                                    </tr> 
                                </table>
                            </div>
                            <div className='my-auto'>
                                <p className="text-xs md:text-sm font-light">Rp 20.000.000 x 1</p>
                                <p className="text-xs md:text-sm lg:text-base font-bold">Rp 20.000.000</p>
                            </div>
                            <span onClick={() => {setIsOpenModal(true);setOpenDetail('Success');}} className='m-auto underline text-primary md:text-sm text-xs cursor-pointer' >Detail Transaction</span>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 items-center p-2 border border-slate-300'>
                    <img alt="" src="/assets/images/DummyTableCavalloGalaxy.jpg" className='col-span-1 h-[130px] aspect-[3/2] object-cover block m-auto'/>
                    <div className='col-span-2 h-full'>
                        <div className='flex justify-between items-center mb-2 md:text-sm text-xs'>
                            <span className='font-light'>{new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()}</span>
                            <span className='px-2 bg-red-300 rounded-lg font-bold'>Cancelled</span>
                        </div>
                        <div className='flex flex-wrap gap-x-10 gap-y-2 justify-between'>
                            <div>
                                <span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Table Top</span>
                                <table className='md:text-sm text-xs mt-2'>
                                    <tr>
                                        <td>Shape</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>blablabla</td>
                                    </tr>
                                    <tr>
                                        <td>Dimension</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>blablabla</td>
                                    </tr>
                                    <tr>
                                        <td>Marble Pattern</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>blablabla</td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <span className="text-xs md:text-sm lg:text-base font-light tracking-[2px]">Table Leg</span>
                                <table className='md:text-sm text-xs mt-2' >
                                    <tr>
                                        <td>Design</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>nanana</td>
                                    </tr>
                                    <tr>
                                        <td>Color</td>
                                        <td className='w-[20px] text-center'>:</td>
                                        <td>nanana</td>
                                    </tr> 
                                </table>
                            </div>
                            <div className='my-auto'>
                                <p className="text-xs md:text-sm font-light">Rp 20.000.000 x 1</p>
                                <p className="text-xs md:text-sm lg:text-base font-bold">Rp 20.000.000</p>
                            </div>
                            <span onClick={() => {setIsOpenModal(true);setOpenDetail('Cancelled');}} className='m-auto underline text-primary md:text-sm text-xs cursor-pointer' >Detail Transaction</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MODAL */}
            <div className={"fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[12] transition-all duration-500 " +  (isOpenModal === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                <div className={"fixed h-[80%] xl:w-[55%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom font-jakarta md:text-sm text-xs " + (isOpenModal === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                    <ModalofDetail setIsOpenModal={setIsOpenModal} openDetail={openDetail} />
                </div>
            </div>
        </div>
    )
}

export default OrderHistory
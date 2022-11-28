import {ThreeDRender} from '../../components'
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomEnqContext } from "../../config/context/customEnqContext";
import * as constants from "../../constants";
import ProgressiveImage from 'react-progressive-image';
import {ErrorBoundary} from 'react-error-boundary'

const base_url = constants.base_url;

const CustomEnquiryCustomer = ({form}) => {

    function ErrorFallback({error, resetErrorBoundary}) {
        return (
            <div className='h-screen w-screen flex flex-col items-center justify-center p-4'>
                <img
                    className="absolute top-2 left-2 h-[30px]"
                    src="/assets/icons/Logo.svg"
                    alt=""
                />
                <h1 className='lg:text-6xl md:text-4xl text-2xl font-bold tracking-[3px] md:mb-6 mb-3'>Oops!</h1>
                <span className='text-center font-jakarta font-medium text-xl md:text-2xl lg:text-3xl text-black'>Maaf, halaman yang kamu cari sedang dalam perbaikan.</span>
                <span className='text-center font-lato text-sm md:text-base lg:text-lg text-black my-6'>Silahkan klik tombol di bawah ini.</span>
                <button 
                    className='bg-primary py-2 px-6 font-jakarta font-bold text-sm md:text-base lg:text-lg text-white rounded-[10px] block mx-auto' 
                    onClick={() => {
                        navigate('/');
                        window.location.reload(true);
                    }}
                >
                    Kembali
                </button>
            </div>
        )
    }
    useEffect(() => {
        if ("caches" in window) {
            caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
            });
        }
    }, []);
    const context = useContext(CustomEnqContext);
	const array = context.array;
	const dataArray = context.dataArray;
	const design = context.design;
	const setDesign = context.setDesign;
	const selectedShape = context.selectedShape;
	const setSelectedShape = context.setSelectedShape;
	const isActive = context.isActive;
	const goPage1 = context.goPage1;
	const goPage2 = context.goPage2;
	const goPage3 = context.goPage3;
	const goPage4 = context.goPage4;
    const navigate = useNavigate();

    const changeToPage3 = (id, name) => {  
        setSelectedShape(name) 
        goPage3()
        let data = [...dataArray];
        console.log(id, data)
        let foundData = data.find((data) => data.id === id);
        setDesign(foundData.items);
    }
    const goLast = (url) => {   
        goPage4();
        navigate(url);
    }

    var time = new Date().getTime();
    window.addEventListener("touchstart", function () {
        time = new Date().getTime();
    });
    window.addEventListener("mousemove", function () {
        time = new Date().getTime();
    });

    setInterval(function() {
        if (new Date().getTime() - time >= 900000) {
            goPage1()
            navigate("/");
            window.location.reload(true);
        }
    }, 1000);

    const hostName = constants.hostname;
    const protocol = constants.protocol;
    const port = constants.port;
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
            // reset the state of your app so the error doesn't happen again
            }}
        >
            <div id="custom-enquiry" className='select-none'>  
                {(isActive !== "page4") ? (
                    <div className='relative w-full h-screen font-jakarta'>
                        {(isActive === "page1") && (
                            // <div className='cursor-pointer' onClick={() => {setPage2(true)}}>
                            // 	<video className='absolute w-full lg:h-full h-auto top-1/2 translate-y-[-50%] left-0 object-cover' loop="true" autoplay="autoplay" muted>
                            // 		<source src="/assets/videos/bazar.mp4" type="video/mp4"/>
                            // 		Your browser does not support the video tag.
                            // 	</video>
                            // 	<div className='absolute w-full h-full top-0 left-0 object-cover z-[2] bg-gradient-to-tr from-black/25 to-black/75'></div>
                            // </div>
                            <div className='w-full h-full relative text-white overflow-hidden'>
                                <div  id='amination-bg1' className='absolute w-[120%] h-full top-0 left-0'>
                                    <img className='absolute w-full h-full object-cover top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' src={`${protocol}${hostName}${port}/assets/images/hero_image.jpg`} alt="" />
                                </div>
                                <div  id='amination-bg2' className='absolute w-[120%] h-full top-0 left-0'>
                                    <img className='absolute w-full h-full object-cover top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' src={`${protocol}${hostName}${port}/assets/images/DummyBanner3.png`} alt="" />
                                </div>
                                <div  id='amination-bg3' className='absolute w-[120%] h-full top-0 left-0'>
                                    <img className='absolute w-full h-full object-cover top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]' src={`${protocol}${hostName}${port}/assets/images/DummyBanner4.png`} alt="" />
                                </div>
                                <div className='absolute w-full h-full top-0 left-0 bg-black/50 blur-lg'></div>
                                <div className='absolute w-full h-full top-[-30px] left-0 flex flex-col justify-center items-center text-center'>
                                    <img id='amination-logo' className='md:mb-20 mb-14 saturate-[0.4]' src={`${protocol}${hostName}${port}/assets/icons/IconLogo.svg`} alt='estetico'/>
                                    <h1 className='lg:text-6xl md:text-4xl text-2xl font-bold tracking-[3px] uppercase md:mb-6 mb-3'>Custom enquiry</h1>
                                    <p className='lg:text-2xl md:text-xl text-lg md:mb-12 mb-6'>It’s time for you to build your dream  table</p>
                                    <button className='cursor-pointer lg:text-lg md:text-base text-sm py-3 px-10 bg-black border border-white tracking-[3px] uppercase' onClick={goPage2}>Start Now</button>
                                </div>
                            </div>
                        )}

                        {/* PAGE 2 */}
                        {(isActive === "page2") && (
                            <div className='absolute w-full h-full top-0 left-0 flex lg:flex-row flex-col gap-[2px] text-center xl:text-5xl md:text-4xl text-2xl tracking-[5px] font-bold text-white/80 uppercase'>
                                <div className='relative w-full md:h-full h-1/3 cursor-pointer' onClick={() => changeToPage3(3, 'Rounded Corner')}>
                                    <img className='absolute w-full h-full top-0 left-0 object-cover' src={`${protocol}${hostName}${port}/assets/images/LD_CE_rounded_corner.jpg`} alt='Rounded Corner' />
                                    <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-b from-black/0 to-black/100'></div>
                                    <span className='absolute bottom-[15%] left-1/2 translate-x-[-50%]'>Rounded Corner</span>
                                </div>
                                <div className='relative w-full md:h-full h-2/3 flex lg:flex-col md:flex-row flex-col gap-[2px]'>
                                    <div className='relative w-full h-full cursor-pointer' onClick={() => changeToPage3(2, 'Round')}>
                                        <img className='absolute w-full h-full top-0 left-0 object-cover' src={`${protocol}${hostName}${port}/assets/images/LD_CE_round.jpg`} alt='Round' />
                                        <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-b from-black/0 to-black/100'></div>
                                        <span className='absolute bottom-[15%] left-1/2 translate-x-[-50%]'>Round</span>
                                    </div>
                                    <div className='relative w-full h-full cursor-pointer' onClick={() => changeToPage3(1, 'Rectangle')}>
                                        <img className='absolute w-full h-full top-0 left-0 object-cover' src={`${protocol}${hostName}${port}/assets/images/LD_CE_rectangle.jpg`} alt='Rectangle' />
                                        <div className='absolute w-full h-full top-0 left-0 bg-gradient-to-b from-black/0 to-black/100'></div>
                                        <span className='absolute bottom-[15%] left-1/2 translate-x-[-50%]'>Rectangle</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PAGE 3 */}
                        {(isActive === "page3") && (
                            <div className='absolute w-full h-full top-0 left-0 flex flex-col items-center p-3 font-light'>
                                <div className='xl:h-[11%] lg:h-[12%] sm:h-[8%] h-[10%] w-full'>
                                    <div className='m-auto text-center lg:text-xl md:text-lg text-base tracking-[3px] uppercase mb-[6px]'>{selectedShape}</div>
                                    <div className='flex justify-center items-center gap-3 xl:text-sm text-xs'>
                                        <p className='px-4 rounded-xl bg-white border border-black/50 hover:bg-black hover:text-crema transition-all duration-500 cursor-pointer' onClick={goPage2}>Back</p>
                                        <p className='px-4 rounded-xl bg-white border border-black/50 hover:bg-black hover:text-crema transition-all duration-500 cursor-pointer' onClick={goPage1}>Back to Home</p>
                                    </div>
                                </div>
                                <div className='xl:h-[89%] lg:h-[88%] sm:h-[92%] h-[90%] w-full relative flex justify-center flex-wrap gap-3'>
                                {
                                    design.map(function(data, index) {
                                    return (
                                        <div className='lg:h-[calc(33.3%-12px)] md:h-[calc(25%-12px)] md:w-[calc(33.3%-12px)] h-[calc(33.3%-12px)] w-full py-2 px-4 rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)] transition-all duration-1000 relative flex flex-col items-center gap-1 cursor-pointer' key={index} onClick={() => goLast(data.url)}>
                                            {/* <img className='h-[85%] aspect-video object-cover lg:px-7 sm:px-0 px-7' src={`${protocol}${hostName}${port}/assets/img/2D/fullset/${data.image}`} alt={data.name} /> */}
                                            <ProgressiveImage src={`${protocol}${hostName}${port}/assets/img/2D/fullset/${data.image}`} placeholder={`${protocol}${hostName}${port}/assets/icons/IconLogoAlt.svg`}>
                                                {(src, loading) => (
                                                    <img src={src} alt={data.name} className={'h-[85%] aspect-video object-cover lg:px-7 sm:px-0 px-7 ' + (loading && 'scale-[0.2] opacity-30')}/>
                                                )}
                                            </ProgressiveImage>
                                            <span className='h-[15%] text-center md:text-sm text-xs tracking-[0.5px] uppercase'>{data.name}</span>
                                        </div>
                                    )})
                                }
                                </div>
                            </div>
                        )}
                    </div>
                ) : (    
                    // <ThreeDRender menu = {"customer"} form={form} changeToPage3={changeToPage3} />
                    <ThreeDRender menu = {"customer2"} form={form} changeToPage3={changeToPage3} />
                )}
            </div>
        </ErrorBoundary>
    )
}

export default CustomEnquiryCustomer;
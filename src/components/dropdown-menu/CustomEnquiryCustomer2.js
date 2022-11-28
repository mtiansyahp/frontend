import { hostname, protocol } from "../../constants";
import { useState } from "react";
import ProgressiveImage from 'react-progressive-image';
import { formatRupiah } from "../../utils";

const CustomEnquiryCustomer2 = (
    {
        message,
        clickable,
        isLoading,
        refreshToken,
        setAutoRotate,
        setIsScreenShoot,
        marblePatterns,
        threeDTexture,
        selectedMarblePattern,
        selectedDesign,
        marblePatternDesc,
        designDesc,
        selectMarblePattern,
        showPattern,
        setShowPattern,
        hargaAsli,
        isMyWishList
    }
) => {
    const random = marblePatterns ? Math.floor(Math.random() * marblePatterns.length) : null;
    const pattern = random ? marblePatterns[random].texture : "";
    const pattern_name = random ? marblePatterns[random].name : "";
    return (
        <>
            {/* <div className="lg:h-full md:h-[57%] sm:h-[calc(100%-270px)] h-[60%] xl:w-[35%] lg:w-[40%] lg:pt-0 md:pt-4 pt-2 mx-auto flex flex-col gap-5 overflow-auto "> */}
            <div className={`
            xl:col-span-4
            xl:grid-cols-1
            
            lg:min-h-[72vh]
            lg:mt-0
            lg:pt-0
            lg:col-span-4
            lg:flex flex-col
            lg:ml-5
            lg:pb-20
            lg:h-[40vh]

            md:col-span-12
            md:h-[400px]
            md:mt-8

            midget:h-[300px]
            mini:h-[350px]

            mb-[150px]
            sm:grid
            gap-5 overflow-auto scrollbar-custom
            px-6
            mt-[7px]
            ` }>
                {
                    !showPattern ? 
                        <>

                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item bg-white border border-gray-200">
                                    <h2 class="accordion-header mb-0" id="headingOne">
                                        <button class="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            {selectedDesign}
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample">
                                        <div class="accordion-body py-4 px-5">
                                            <strong>This is the first item's accordion body.</strong> It is shown by default,
                                            until the collapse plugin adds the appropriate classes that we use to style each
                                            element. These classes control the overall appearance, as well as the showing and
                                            hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                                            our default variables. It's also worth noting that just about any HTML can go within
                                            the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item bg-white border border-gray-200">
                                    <h2 class="accordion-header mb-0" id="headingTwo">
                                        <button class="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            {selectedMarblePattern}
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample">
                                        <div class="accordion-body py-4 px-5">
                                        <p className="font-martel font-normal text-[12px] tracking-[0.444444px] leading-[24px] indent-5 text-justify mt-2">
                                                <div className="grid 
                                                    2xl:grid-cols-2 
                                                    xl:grid-cols-1 
                                                    lg:grid-cols-1 
                                                    md:grid-cols-1 
                                                    sm:grid-cols-2 
                                                    gap-4">
                                                    <div className={`w-fullrounded-[10px] h-[150px]
                                                        bg-cover shadow-lg flex flex-col items-center justify-center `} style={{backgroundImage: `url("${protocol+hostname}/assets/img/2D/texture/${threeDTexture}")` }} >
                                                        <div className={`group bg-black bg-opacity-0 p-4 w-full rounded-[10px] h-full hover:bg-opacity-50 transition-all ease-in-out duration-500  z-[5] flex flex-col items-center justify-center `} >
                                                            <button type="button" className="bg-primary z-[6] opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 text-white font-martel text-[11px] font-[400] p-[5px] tracking-[0.4px] cursor-pointer rounded-[10px] " onClick={() => setShowPattern(true)} >Customize</button>
                                                        </div>
                                                    </div>
                                                    <p className="font-martel font-normal text-[12px] tracking-[0.444444px] leading-[24px] indent-5 text-justify ">
                                                        <div className="mini:hidden midget:hidden md:hidden lg:block">
                                                            {marblePatternDesc}
                                                        </div>
                                                    </p>
                                                </div>
                                            </p> 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div class="mini:block midget:block md:block hidden accordion mb-5">
                                <div class="accordion-item bg-white">
                                    <h2 class="accordion-header mb-0" id="headingOne5">
                                        <button class="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none uppercase font-martel" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-title" aria-expanded="true" aria-controls="collapse-title">
                                            {selectedDesign}
                                        </button>
                                    </h2>
                                    <div id="collapse-title" class="accordion-collapse collapse show" aria-labelledby="heading-title">
                                        <div class="accordion-body py-4 px-5 text-justify">
                                            <strong>This is the first item's accordion body.</strong> It is shown by default,
                                            until the collapse plugin adds the appropriate classes that we use to style each
                                            element. These classes control the overall appearance, as well as the showing and
                                            hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                                            our default variables. It's also worth noting that just about any HTML can go within
                                            the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mini:block midget:block md:block hidden accordion">
                                <div class="accordion-item bg-white">
                                    <h2 class="accordion-header mb-0" id="headingOne5">
                                    <button class="accordion-button relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none uppercase font-martel" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-title-second" aria-expanded="true" aria-controls="collapse-title-second">
                                        {selectedMarblePattern}
                                    </button>
                                    </h2>
                                    <div id="collapse-title-second" class="accordion-collapse collapse show" aria-labelledby="heading-title">
                                        <div class="accordion-body py-4 px-5">
                                            <p className="font-martel font-normal text-[12px] tracking-[0.444444px] leading-[24px] indent-5 text-justify mt-2">
                                                <div className="grid 
                                                    2xl:grid-cols-2 
                                                    xl:grid-cols-1 
                                                    lg:grid-cols-1 
                                                    md:grid-cols-1 
                                                    sm:grid-cols-2 
                                                    gap-4">
                                                    <div className={`w-fullrounded-[10px] h-[150px]
                                                        bg-cover shadow-lg flex flex-col items-center justify-center `} style={{backgroundImage: `url("${protocol+hostname}/assets/img/2D/texture/${threeDTexture}")` }} >
                                                        <div className={`group bg-black bg-opacity-0 p-4 w-full rounded-[10px] h-full hover:bg-opacity-50 transition-all ease-in-out duration-500  z-[5] flex flex-col items-center justify-center `} >
                                                            <button type="button" className="bg-primary z-[6] opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 text-white font-martel text-[11px] font-[400] p-[5px] tracking-[0.4px] cursor-pointer rounded-[10px] " onClick={() => setShowPattern(true)} >Customize</button>
                                                        </div>
                                                    </div>
                                                    <p className="font-martel font-normal text-[12px] tracking-[0.444444px] leading-[24px] indent-5 text-justify ">
                                                        <div className="block mini:hidden midget:hidden">
                                                            {marblePatternDesc}
                                                        </div>
                                                    </p>
                                                </div>
                                            </p> 
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className ="mini:hidden midget:hidden md:hidden box-border border border-gray-200 rounded-[20px] px-3 pb-3">
                                <h1 className="font-marcellus font-normal text-[34px] tracking-[2px] uppercase ">
                                    {selectedDesign}
                                </h1>
                                <p className="font-martel font-normal text-[12px] tracking-[0.444444px] leading-[24px] indent-5 text-justify ">
                                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra
                                    Perletto Royale
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta arcu justo enim, vivamus ac mi. Id vitae duis in eget sagittis. Et scelerisque nibh pharetra. */}
                                    {designDesc}
                                </p>
                                
                            </div>

                            <div className ="mini:hidden midget:hidden md:hidden box-border border border-gray-200 rounded-[20px] px-3 pb-3 ">
                                <h1 className="font-marcellus font-normal text-[24px] tracking-[0.15px] uppercase ">
                                    {selectedMarblePattern}
                                </h1>
                                <p className="font-martel font-normal text-[12px] tracking-[0.444444px] leading-[24px] indent-5 text-justify mt-2">
                                    <div className="grid 
                                        2xl:grid-cols-2 
                                        xl:grid-cols-1 
                                        lg:grid-cols-1 
                                        md:grid-cols-1 
                                        sm:grid-cols-2 
                                        gap-4">
                                        <div className={`w-fullrounded-[10px] h-[150px]
                                            bg-cover shadow-lg flex flex-col items-center justify-center `} style={{backgroundImage: `url("${protocol+hostname}/assets/img/2D/texture/${threeDTexture}")` }} >
                                            <div className={`group bg-black bg-opacity-0 p-4 w-full rounded-[10px] h-full hover:bg-opacity-50 transition-all ease-in-out duration-500  z-[5] flex flex-col items-center justify-center `} >
                                                <button type="button" className="bg-primary z-[6] opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 text-white font-martel text-[11px] font-[400] p-[5px] tracking-[0.4px] cursor-pointer rounded-[10px] " onClick={() => setShowPattern(true)} >Customize</button>
                                            </div>
                                        </div>
                                        <p className="font-martel font-normal text-[12px] tracking-[0.444444px] leading-[24px] indent-5 text-justify ">
                                            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porta arcu justo enim, vivamus ac mi. Id vitae duis in eget sagittis. Et scelerisque nibh pharetra. */}
                                            {marblePatternDesc}
                                        </p>
                                    </div>
                                </p> 
                            </div>
                        </>
                    :
                    <div className="w-full flex flex-col gap-4 pl-5 col-span-12 ">
                        <div className="flex flex-row justify-start gap-5 items-center  ">
                            <img
                                className="h-[20px] cursor-pointer mb-1 float-left clear-both"
                                onClick={() => setShowPattern(false)}
                                src="/assets/icons/IconCloseBlack.svg"
                                alt=""
                            />
                            <span className="font-marcellus tracking-[0.15px] text-[20px] " >All Patterns</span>
                        </div>
                        <div className="w-full lg:max-h-[775px] md:h-full grid grid-cols-3 gap-[9px] pb-[50px]">
                            {marblePatterns.map(function (marblePattern, index) {
                                return (
                                    <button
                                    className={"relative  flex flex-col items-center gap-3 cursor-pointer border " + (marblePattern.name == selectedMarblePattern ? "border-primary" : "") + (selectedMarblePattern == marblePattern.name ?  "" : "animate-border") }
                                    key={index}
                                    onClick={selectMarblePattern.bind(this, marblePattern.id, marblePattern.name, marblePattern.texture, marblePattern.code, marblePattern.deskripsi )}
                                    >
                                        <div className="w-full aspect-[3/2] overflow-hidden">
                                            <ProgressiveImage  delay={3000} src={"assets/img/2D/texture/" + marblePattern.thumbnail} placeholder='/assets/icons/IconLogoAlt.svg'>
                                                {(src, loading) => (
                                                    <img src={src} alt="" className={'w-full h-full object-cover ' + (loading && 'scale-[0.2] opacity-30')}/>
                                                )}
                                            </ProgressiveImage>
                                        </div>
                                        <p className="font-martel text-xs text-center max-w-[97px] tracking-[0.4px] ">{marblePattern.name}</p>
                                        <img className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[50%] " + (marblePattern.name == selectedMarblePattern ? "" : "hidden")} src="/assets/icons/IconChecklist.svg" alt="" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                }

                {/* <div className="md:mt-auto sm:mt-2 font-martel md:text-sm mini:text-xs text-[10px] flex flex-row justify-between items-center w-fit gap-5
                mini:{
                    fixed
                    right-3
                    bottom-20
                    bg-white
                    pt-3
                    px-2
                    z-[100]
                    w-[100%]
                }
                lg:w-[33%]
                ">
                    <span>Qty : </span>
                    <div className="flex flex-row justify-center items-center bg-red-200">
                        <img 
                            src="../assets/icons/IconMinusCircle.svg"
                        />
                        <span>1</span>
                        <img 
                            src="../assets/icons/IconPlusCircle.svg"
                        />
                    </div>
                </div> */}

                <div className="md:mt-auto lg:border-none sm:mt-2 font-martel md:text-sm mini:text-xs text-[10px] flex flex-col w-full
                mini:{
                    fixed
                    right-0
                    bottom-0
                    bg-white
                    z-[100]
                    border-[1px] border-[#D9D9D9]
                    rounded-t-[20px]
                }
                lg:w-[33%]
                ">
                    {/* <div className="py-[5px] px-[21px]">
                        <label className="font-martel text-[8px] uppercase tracking-[2px] mb-[5px]">Subtotal</label>
                        <div className="flex gap-[30px] items-center justify-between">
                            <div className="price font-roboto">
                                <label className="text-[#004441] text-[20px]">{formatRupiah( (hargaAsli), "IDR" )}</label>
                            </div>
                            <div className="action-cart flex gap-[15px] mini:gap-[15px] midget:gap-[5px] items-center">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-share" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <circle cx={6} cy={12} r={3}></circle>
                                        <circle cx={18} cy={6} r={3}></circle>
                                        <circle cx={18} cy={18} r={3}></circle>
                                        <line x1="8.7" y1="10.7" x2="15.3" y2="7.3"></line>
                                        <line x1="8.7" y1="13.3" x2="15.3" y2="16.7"></line>
                                    </svg>
                                </div>

                                <div
                                    onClick={() => {
                                        if(clickable && !isLoading){
                                          refreshToken("save")
                                          setAutoRotate(false)
                                          setIsScreenShoot(true)
                                        }
                                      }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler icon-tabler-heart ${isMyWishList ? 'fill-pink-600' : ''}`} width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                                    </svg>
                                </div>

                                <button className={"py-2 px-3 rounded-lg flex-1 w-full" + (message && message[0] == "dimension" ? "text-white bg-black/40" : "text-white bg-primary")}
                                    onClick={() => {
                                    if(clickable && !isLoading){
                                        refreshToken("cart")
                                        setAutoRotate(false)
                                        setIsScreenShoot(true)
                                    }
                                    }}
                                    title="Add to Cart"
                                    data-bs-toggle="tooltip"
                                >
                                    <div className="flex justify-center items-center text-[#DEDCCF] gap-[8px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <circle cx={6} cy={19} r={2}></circle>
                                            <circle cx={17} cy={19} r={2}></circle>
                                            <path d="M17 17h-11v-14h-2"></path>
                                            <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13"></path>
                                            <path d="M15 6h6m-3 -3v6"></path>
                                        </svg>
                                        <label>Add to Cart</label>
                                    </div>
                                </button>

                            </div>
                        </div>
                    </div> */}

                    <div className="flex flex-row justify-between items-center w-full px-5 ">
                        <span>Qty : </span>
                        <div className="flex flex-row justify-between items-center gap-4">
                            <img 
                                src="../assets/icons/IconMinusCircle.svg"
                                className="w-[24px] h-[24px] cursor-pointer"
                            />
                            <span className="font-martel text-[15px]" >1</span>
                            <img 
                                src="../assets/icons/IconPlusCircle.svg"
                                className="w-[24px] h-[24px] cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between items-center w-full gap-5">
                        <div className="flex justify-between items-center gap-4">
                            <img
                                className="w-[30px] h-[30px] mini:{
                                    w-[56px]
                                    h-[56px]
                                } "
                                src={"../assets/icons/IconShare.svg"}
                            />

                            <img
                                className="w-[28px] h-[28px] mini:{
                                    w-[36px]
                                    h-[36px]
                                }"
                                src={"../assets/icons/IconLike.svg"}
                            />
                        </div>
                        <button className={"py-2 px-3 rounded-lg flex-1 w-full" + (message && message[0] == "dimension" ? "text-white bg-black/40" : "text-white bg-primary")}
                            onClick={() => {
                            if(clickable && !isLoading){
                                refreshToken("cart")
                                setAutoRotate(false)
                                setIsScreenShoot(true)
                            }
                            }}
                            title="Add to Cart"
                            data-bs-toggle="tooltip"
                        >
                            <div className="flex justify-center items-center">
                                <img
                                    className="w-[20px] h-[20px] mr-2"
                                    src={"../assets/icons/IconPlusWhite.svg"}
                                />
                                <span className="text-white">Add to Cart</span>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
} 

export default CustomEnquiryCustomer2;
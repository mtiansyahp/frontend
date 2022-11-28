import { useContext, useEffect, useState } from "react";
import { formatRupiah } from "../../utils";
import axios from "axios";
import * as constants from "../../constants";
import { CustomEnqContext } from "../../config/context/customEnqContext";
import "./style.css";
import ProgressiveImage from 'react-progressive-image';
import {roundTo, roundToUp, roundToDown} from 'round-to';
const base_url = constants.base_url;

const CustomEnquiryCustomer = ({
  message,
  clickable,
  isLoading,
  setMessage,
  selectedShape,
  setSelectedShape,
  selectedEdge,
  setSelectedEdge,
  selectedDimension,
  setSelectedDimension,
  selectedMarblePattern,
  setSelectedMarblePattern,
  selectedMaterial,
  setSelectedMaterial,
  selectedDesign,
  setSelectedDesign,
  selectedColor,
  setSelectedColor,
  scaleT,
  setScaleT,
  scaleB,
  setScaleB,
  positionT,
  setPositionT,
  positionB,
  setPositionB,
  selectShape,
  selectEdge,
  selectDimension,
  selectMaterial,
  selectDesign,
  selectColor,
  shapes,
  shapeType,
  edges,
  dimensions,
  designs,
  materials,
  colors,
  setDimensions,
  marblePatterns,
  setMarblePatterns,
  selectMarblePattern,
  setDimensionId,
  shapeId,
  edgeId,
  dimensionId,
  marblePatternId,
  materialId,
  designId,
  colorId,
  form,
  setAutoRotate,
  autoRotate,
  isOpenTopTable,
  showTopTable,
  isOpenEdge,
  showEdge,
  isOpenDimension,
  showDimension,
  bgDimension,
  isOpenMarblePattern,
  showMarblePattern,
  bgMarblePattern,
  isOpenLegTable,
  showLegTable,
  isOpenDesign,
  showDesign,
  bgDesign,
  isOpenColor,
  isHideAccordionColor,
  bgColor,
  showColor,
  priceTableTop,
  priceTableLeg,
  refreshToken,
  setIsScreenShoot,
  isMyWishList,
  hargaDiskon,
  hargaAsli
}) => {
  useEffect(() => {
    async function addVisitor() {
      const response = await axios.post(base_url + "/visitor/add-visitor");
    }
    addVisitor();
  }, []);
  const getLocalStorageValue = (s) => localStorage.getItem(s);
  const context = useContext(CustomEnqContext);
  return (
    <div className="lg:h-full md:h-[57%] sm:h-[calc(100%-270px)] h-[60%] xl:w-[35%] lg:w-[40%] lg:pt-0 md:pt-4 pt-2 mx-auto flex flex-col">
      <div className="lg:block sm:flex sm:justify-between gap-2">

      {/* <div id="controls-carousel" className="relative" data-carousel="static">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="/assets/images/BannerPrivacyPolicy.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
              </div>
              
              <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                  <img src="/assets/images/ColorSilver.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
              </div>
              
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="/docs/images/carousel/carousel-3.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
              </div>
              
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="/docs/images/carousel/carousel-4.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
              </div>
              
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="/docs/images/carousel/carousel-5.svg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
              </div>
        </div>
          
          <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  <span className="sr-only">Previous</span>
              </span>
          </button>
          <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg aria-hidden="true" className="w-6 h-6 text-white dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  <span className="sr-only">Next</span>
              </span>
          </button>
      </div> */}

        <div id="border" className={"relative w-full lg:mb-2 sm:mb-0 mb-2 border border-black px-1 lg:hover:bg-primary " + (isOpenTopTable === true ? "bg-primary" : "h-auto sm:h-[46px]")}>
          <div
            id="isi-border"
            className={
              "relative px-2 py-2 cursor-pointer after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 lg:hover:bg-transparent lg:hover:text-white lg:hover:after:border-white " +
              (isOpenTopTable === true ? "text-white bg-primary after:top-[18px] after:border-white after:rotate-45" : "after:top-[14px] bg-white after:border-black after:rotate-[225deg]")
            }
            onClick={showTopTable}
          >
            <h4 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[2px]">TABLE TOP</h4>
          </div>

          <div className={isOpenTopTable === true ? "opacity-100 visible h-auto" : "opacity-0 invisible h-0"}>
            <div className="flex flex-col">
              {/* SHAPE */}
              <div className={"mb-1 " + (isOpenEdge === true ? "order-0 sm:static fixed sm:w-auto w-[100vw] bg-white left-0 md:top-[calc(40vh+18px)] top-[calc(40vh+10px)] sm:px-0 px-2 sm:z-0 z-10" : "order-1")}>
                <div
                  className={
                    "relative px-2 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                    (isOpenEdge === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "after:top-[18px] bg-white after:border-black after:rotate-[225deg]")
                  }
                  onClick={showEdge}
                >
                  Shape
                  <br />
                  <span className="font-lato text-xs tracking-[3%]">{selectedShape + " , " + selectedEdge}</span>
                </div>

                <div className={"border-x border-b border-primary " + (isOpenEdge === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                  <div className="flex gap-x-4 flex-wrap font-lato md:text-sm text-xs tracking-[3%] pb-3 px-[5px]">
                    {/* onClick={selectShape.bind(this, 0, 0, ' . . . . . ', 0)} */}
                    <p className="cursor-pointer">Shape : </p>
                    {shapes.map(function (shape, index) {
                      return (
                        <div className="cursor-pointer flex items-center gap-1" key={index} onClick={selectShape.bind(this, shape.id, shape.type, shape.name, shape.code)}>
                          <span className={"h-3 w-3 rounded-full border outline outline-1 outline-black " + (shape.name == selectedShape ? "bg-primary" : " bg-white")}></span>
                          <p>{shape.name}</p>
                          <img className="h-[14px]" src={shape.name === "Rectangle" ? "/assets/icons/IconR.svg" : shape.name === "Round" ? "/assets/icons/IconC.svg" : shape.name === "Rounded Corner" ? "/assets/icons/IconRC.svg" : ''} alt="" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="lg:h-[calc(100vh-415px)] md:h-[calc(57vh-390px)] sm:h-[220px] mini:h-[calc(40vh-32px)] h-[calc(36vh-32px)] w-auto overflow-auto scrollbar-custom">
                    {shapeId == 0 ? (
                      <p className="font-lato md:text-sm text-xs tracking-[3%] mt-5" onClick={selectEdge.bind(this, " . . . . . ")}>
                        &nbsp; Please choose the shape first.. &nbsp;{" "}
                      </p>
                    ) : (
                      <div>
                        {edges.map(function (edges, index) {
                          const three_d_file = edges.three_d_file;
                          edges = edges.Edge;
                          return (
                            <button
                              className={"w-full text-left py-3 border-b border-[#D9D9D9] cursor-pointer lg:flex lg:justify-between lg:hover:bg-[#FFF3E5] " + (edges.name == selectedEdge ? "bg-[#FFF3E5]" : "bg-white")}
                              key={index}
                              onClick={selectEdge.bind(this, edges.id, edges.name, three_d_file, edges.code)}
                            >
                              <h6 className="font-lato md:text-sm text-xs tracking-[3%]">&nbsp; {edges.name} &nbsp;</h6>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* DIMENTION */}
              <div className={"mb-1 " + (isOpenDimension === true ? "order-0 sm:static fixed sm:w-auto w-[100vw] bg-white left-0 md:top-[calc(40vh+18px)] top-[calc(40vh+10px)] sm:px-0 px-2 sm:z-0 z-10" : "order-2")}>
                <div
                  className={
                    "relative px-2 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                    (isOpenDimension === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "text-black " + bgDimension + " after:top-[18px] after:border-black after:rotate-[225deg]")
                  }
                  onClick={showDimension}
                >
                  Dimension
                  <br />
                  <span className={"font-lato text-xs tracking-[3%]" + message && message[0] == "dimension" && !isOpenDimension ? "text-red-500" : ""} >{message.length > 0 && message[0] == "dimension"? message[1] : selectedDimension}</span>
                </div>

                <div className={"border-x border-b border-primary " + (isOpenDimension === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                    <div className="lg:h-[calc(100vh-383px)] md:h-[calc(57vh-358px)] sm:h-[252px] mini:h-[40vh] h-[36vh] w-auto overflow-auto scrollbar-custom">
                      {dimensions.map(function (dimension, index) {
                        //console.log("Position Botttom ",posB)
                        //console.log(dimension.harga_kaki)
                        return (
                          <button
                            className={"w-full text-left pt-3 border-b border-[#D9D9D9] cursor-pointer flex justify-between lg:hover:bg-[#FFF3E5] " + (dimension.name == selectedDimension ? "bg-[#FFF3E5]" : "bg-white")}
                            key={index}
                            onClick={selectDimension.bind(this, dimension.id, dimension.name, dimension.panjang, dimension.lebar, null, index, dimension.code, dimension.harga_kaki)}
                          >
                            <h6 className="font-lato md:text-sm text-xs tracking-[3%] mb-3">&nbsp; {dimension.name} &nbsp;</h6>
                            <span className="self-end font-lato text-xs tracking-[3%] mb-1 text-[#8D8A8A]">&nbsp; Diameter {shapeType == 0 ? dimension.diameter + "cm" : dimension.panjang + "cm (P) x " + dimension.lebar + "cm (L)"} &nbsp;</span>
                          </button>
                        );
                      })}
                    </div>
                </div>
              </div>

              {/* MARBLE PATTERN */}
              <div className={"mb-1 " + (isOpenMarblePattern === true ? "order-0 sm:static fixed sm:w-auto w-[100vw] bg-white left-0 md:top-[calc(40vh+18px)] top-[calc(40vh+10px)] sm:px-0 px-2 sm:z-0 z-10" : "order-3")}>
                <div
                  className={
                    "relative px-2 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                    (isOpenMarblePattern === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "text-black " + bgMarblePattern + " after:top-[18px] after:border-black after:rotate-[225deg]")
                  }
                  onClick={showMarblePattern}
                >
                  Marble Pattern
                  <br />
                  <span className="font-lato text-xs tracking-[3%]">{selectedMarblePattern}</span>
                </div>

                <div className={"border-x border-b border-primary " + (isOpenMarblePattern === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                  <div className="lg:h-[calc(100vh-383px)] md:h-[calc(57vh-358px)] sm:h-[252px] mini:h-[40vh] h-[36vh] w-auto overflow-auto scrollbar-custom pb-2 grid md:grid-cols-3 grid-cols-2 gap-1 items-start">
                    {marblePatterns.map(function (marblePattern, index) {
                      return (
                        <button
                          className={"relative flex flex-col items-center cursor-pointer border " + (marblePattern.name == selectedMarblePattern ? "border-primary" : "border-white")}
                          key={index}
                          onClick={selectMarblePattern.bind(this, marblePattern.id, marblePattern.name, marblePattern.texture, marblePattern.code, marblePattern.deskripsi )}
                        >
                          <div className="w-full aspect-[3/2] overflow-hidden">
                            {/* <img className="w-full h-full object-cover" src={"assets/img/2D/texture/" + marblePattern.texture} alt="" /> */}
                            <ProgressiveImage  delay={3000} src={"assets/img/2D/texture/" + marblePattern.thumbnail} placeholder='/assets/icons/IconLogoAlt.svg'>
                                {(src, loading) => (
                                    <img src={src} alt="" className={'w-full h-full object-cover ' + (loading && 'scale-[0.2] opacity-30')}/>
                                )}
                            </ProgressiveImage>
                          </div>
                          <p className="font-lato text-xs text-center">{marblePattern.name}</p>
                          <img className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[50%] " + (marblePattern.name == selectedMarblePattern ? "" : "hidden")} src="/assets/icons/IconChecklist.svg" alt="" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="border" className={"relative w-full border border-black px-1 lg:hover:bg-primary " + (isOpenLegTable === true ? "bg-primary" : "h-auto sm:h-[46px]")}>
          <div
            id="isi-border"
            className={
              "relative px-2 py-2 cursor-pointer after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 lg:hover:bg-transparent lg:hover:text-white lg:hover:after:border-white " +
              (isOpenLegTable === true ? "text-white bg-primary after:top-[18px] after:border-white after:rotate-45" : "after:top-[14px] bg-white after:border-black after:rotate-[225deg]")
            }
            onClick={showLegTable}
          >
            <h4 className="font-jakarta lg:text-xl md:text-lg text-base font-medium tracking-[2px]">TABLE LEG</h4>
          </div>

          <div className={isOpenLegTable === true ? "opacity-100 visible h-auto" : "opacity-0 invisible h-0"}>
            <div className="flex flex-col">
              {/* DESIGN */}
              <div className={"mb-1 " + (isOpenDesign === true ? "order-0 sm:static fixed sm:w-auto w-[100vw] bg-white left-0 md:top-[calc(40vh+18px)] top-[calc(40vh+10px)] sm:px-0 px-2 sm:z-0 z-10" : "order-1")}>
                <div
                  className={
                    "relative px-2 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                    (isOpenDesign === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "text-black " + bgDesign + " after:top-[18px] bg-white after:border-black after:rotate-[225deg]")
                  }
                  onClick={showDesign}
                >
                  Design
                  <br />
                  <span className="font-lato text-xs tracking-[3%]">{selectedDesign}</span>
                </div>

                <div className={"border-x border-b border-primary " + (isOpenDesign === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                  <div className="flex gap-x-4 flex-wrap font-lato md:text-sm text-xs tracking-[3%] pb-3 px-[5px]">
                    <p className="cursor-pointer" onClick={selectMaterial.bind(this, 0, " . . . . . ")}>
                      &nbsp; Material :{" "}
                    </p>
                    {materials.map(function (material, index) {
                      return (
                        <div className="cursor-pointer flex items-center gap-1" key={index} onClick={selectMaterial.bind(this, material.id, material.name, material.code)}>
                          <span className={"h-3 w-3 rounded-full border outline outline-1 outline-black " + (material.name == selectedMaterial ? "bg-primary" : " bg-white")}></span>
                          <p>{material.name}</p>
                        </div>
                      );
                    })}
                  </div>
                  {materialId == 0 ? (
                    <div className="lg:h-[calc(100vh-415px)] md:h-[calc(57vh-390px)] sm:h-[220px] mini:h-[calc(40vh-32px)] h-[calc(36vh-32px)] w-auto overflow-auto scrollbar-custom pb-2">
                      <p className="font-lato md:text-sm text-xs tracking-[3%] mt-5" onClick={selectDesign.bind(this, " . . . . . ")}>
                        &nbsp; Please choose the material first.. &nbsp;{" "}
                      </p>
                    </div>
                  ) : (
                    <div className="lg:h-[calc(100vh-415px)] md:h-[calc(57vh-390px)] sm:h-[220px] mini:h-[calc(40vh-32px)] h-[calc(36vh-32px)] w-auto overflow-auto scrollbar-custom pb-2 grid md:grid-cols-3 grid-cols-2 gap-1 items-start">
                      {designs.map(function (design, index) {
                        return (
                          <button
                            className={"relative flex flex-col items-center cursor-pointer border " + (design.nama == selectedDesign ? "border-primary" : "border-white")}
                            key={index}
                            onClick={selectDesign.bind(this, design.id, design.harga, design.nama, design.file_three_d, design.code, design.deskripsi)}
                          >
                            <div className="w-full aspect-[3/2] overflow-hidden">
                              {/* <img className="w-full h-full object-cover" src={"assets/img/2D/kaki/" + design.file_two_d} alt="" /> */}
                              <ProgressiveImage  delay={3000} src={"assets/img/2D/kaki/" + design.thumbnail} placeholder='/assets/icons/IconLogoAlt.svg'>
                                {(src, loading) => (
                                    <img src={src} alt="" className={'w-full h-full object-cover ' + (loading && 'scale-[0.2] opacity-30')}/>
                                )}
                              </ProgressiveImage>
                            </div>
                            <p className="font-lato text-xs text-center">{design.nama}</p>
                            <img className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[50%] " + (design.nama == selectedDesign ? "" : "hidden")} src="/assets/icons/IconChecklist.svg" alt="" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* COLOR */}
              <div className={"mb-1 " + (isOpenColor === true ? "order-0 sm:static fixed sm:w-auto w-[100vw] bg-white left-0 md:top-[calc(40vh+18px)] top-[calc(40vh+10px)] sm:px-0 px-2 sm:z-0 z-10" : "order-1")}>
                {isHideAccordionColor === true ? (
                  <div>
                    <div className={"relative px-2 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] " + bgColor}>
                      Color
                      <br />
                      <span className="font-lato text-xs tracking-[3%]">{selectedColor}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className={
                        "relative px-2 py-1 border border-primary cursor-pointer font-jakarta text-xs leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " +
                        (isOpenColor === true ? "text-white bg-primary after:top-[21px] after:border-white after:rotate-45" : "text-black " + bgColor + " after:top-[18px] after:border-black after:rotate-[225deg]")
                      }
                      onClick={showColor}
                    >
                      Color
                      <br />
                      <span className="font-lato text-xs tracking-[3%]">{selectedColor}</span>
                    </div>

                    <div className={"border-x border-b border-primary " + (isOpenColor === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                      <div className="lg:h-[calc(100vh-383px)] md:h-[calc(57vh-358px)] sm:h-[252px] mini:h-[40vh] h-[36vh] w-auto overflow-auto scrollbar-custom">
                        {colors.map(function (color, index) {
                          return (
                            <button
                              className={"w-full text-left py-3 border-b border-[#D9D9D9] cursor-pointer lg:flex lg:justify-between lg:hover:bg-[#FFF3E5] " + (color.name == selectedColor ? "bg-[#FFF3E5]" : "bg-white")}
                              key={index}
                              onClick={selectColor.bind(this, color.id, color.name, color.file, color.code)}
                            >
                              <h6 className="font-lato md:text-sm text-xs tracking-[3%]">&nbsp; {color.name} &nbsp;</h6>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:mt-auto sm:mt-2 mt-auto font-jakarta md:text-sm mini:text-xs text-[10px] flex sm:gap-5">
        {/* <div className="w-full flex justify-between">
            <span>Table Top :</span>
            <span className="text-right font-semibold">{formatRupiah(priceTableTop)}</span>
          </div>
          <div className="w-full flex justify-between">
            <span>Table Leg :</span>
            <span className="text-right font-semibold">{formatRupiah(priceTableLeg)}</span>
          </div> */}
        <div>
          <div className="font-semibold">
              <div>
                {/* <label>{formatRupiah( (hargaAsli - hargaDiskon), "IDR" )}</label> */}
                <label>{formatRupiah( (hargaAsli), "IDR" )}</label>
                {/* <label className="ml-2 mr-3 line-through text-xs">{formatRupiah( hargaAsli, "IDR" )}</label> */}
                {/* <span className="text-xs font-semibold inline-block pt-[1px] pb-[1px] px-2 rounded text-pink-600 bg-pink-200 uppercase last:mr-0 mr-1">
                  20% Off
                </span> */}
              </div>
              {/* <label className="text-primary text-xs  ">Anda Hemat {formatRupiah( hargaDiskon, "IDR" )}</label> */}
          </div>
            
          {/* <p className="text-xs mt-1 text-[#3a3a3a]">Deliver within 17 - 21 Days</p> */}
          <p className="text-xs mt-1 text-[#3a3a3a]">Anda Hemat {formatRupiah( hargaDiskon, "IDR" )}</p>
        </div>
        <div className="ml-auto font-bold text-center flex items-center gap-2">
          <button 
            className={"border border-black py-2 px-3 rounded-lg " + (message && message[0] == ("dimension" || "pattern") ? "bg-black/40" : "bg-white")} 
            onClick={() => {
              if(clickable && !isLoading){
                refreshToken("save")
                setAutoRotate(false)
                setIsScreenShoot(true)
              }
            }}
            title="Add to Wishlist"
            data-bs-toggle="tooltip"
          >
            <img className="md:h-[18px] mini:h-[16px] h-[14px]" src={isMyWishList ? '/assets/icons/IconUnlike.svg' : '/assets/icons/IconLike.svg'} alt='' />
          </button>
          <button className={"py-2 px-3 rounded-lg " + (message && message[0] == "dimension" ? "text-white bg-black/40" : "text-white bg-primary")}
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
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomEnquiryCustomer;

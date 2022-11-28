import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../config/context/adminContext";
import axios from 'axios';
import "tw-elements";
import { useSearchParams } from "react-router-dom";
import jsPDF  from "jspdf";
import html2canvas from "html2canvas";
import { formatRupiah } from "../../utils";
import * as constants from "../../constants";
import {roundTo, roundToUp, roundToDown} from 'round-to';

const base_url = constants.base_url;

export default function PdfWishList() {
  // const context = useContext(AdminContext);
  const [code, setCode] = useState();
  const [navResponsive, setNavResponsive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [top, setTop] = useState();
  const [edge, setEdge] = useState();
  const [seaters, setSeaters] = useState();
  const [marblePattern, setMarblePattern] = useState();
  const [materialBottom, setMaterialBottom] = useState();
  const [design, setDesign] = useState();
  const [color, setColor] = useState();
  const [priceTable, setPriceTable] = useState();
  const [priceLeg, setPriceLeg] = useState();
  //const [priceLeg, setPriceLeg] = useState();
  const getLocalStorageValue = (s) => localStorage.getItem(s);
  const [hargaAsli, setHargaAsli] = useState();
  const [hargaDiskon, setHargaDiskon] = useState();

  useEffect(()=>{
    const getData = async () => {
      window.html2canvas = html2canvas
      if(searchParams.get("code")){
          setCode(searchParams.get("code"));
          const code = searchParams.get("code");
          if(!top && !edge && !seaters && !marblePattern && !materialBottom && !design && !color){
            const response = await axios.get(base_url + "/item-code/get-item-code/?code=" + code );
            setTop(response.data.data.top)
            setEdge(response.data.data.edge)
            setSeaters(response.data.data.dimension)
            setMarblePattern(response.data.data.marblePattern)
            setMaterialBottom(response.data.data.materialBottom)
            setDesign(response.data.data.design)
            setColor(response.data.data.color)
          }
          
          else {
            if(seaters && marblePattern) {
              const response = getAllPrice(seaters.id, marblePattern.id, design.id);
              response.then((data) => {
                  setPriceTable(data.priceTable.harga_jual_seaters);
                  setPriceLeg(data.priceLeg.harga);
                  setHargaAsli(data.hargaAsli)
                  setHargaDiskon(data.hargaDiskon)
              })
            } 
          }
      }
    }

    getData()
    
  },[searchParams, top, edge, seaters, marblePattern, materialBottom, design, color, priceTable])

  useEffect(() => {
    if(top && edge && seaters && marblePattern && materialBottom && design && color && priceTable && hargaAsli && hargaDiskon ) convertPdf()
  },[top, edge, seaters, marblePattern, materialBottom, design, color, priceTable])

  function convertPdf() {
    window.html2canvas = html2canvas
    var pdf = new jsPDF('p', 'pt', 'letter');
    var elementHTML = document.getElementById("PDFWishlist");
    var specialElementHandlers = {
        '#elementH': function (element, renderer) {
            return true;
        }
    };

    html2canvas(elementHTML,{scale:4, allowTaint:true, useCORS:true}).then(function(canvas){
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('p', 'pt', [595, 842] );
        const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();
        const code = searchParams.get("code")
        const phone = searchParams.get("phone")
        doc.addImage(imgData, 'PNG', 10, 10, width - 20, height - 18);
        doc.save( code.replace(/[+]/g, "") + " - " + phone + '.pdf');
        window.close();
    })

    // pdf.html(elementHTML, {
    //   'elementHandlers': specialElementHandlers,
    //   margin: [0, 20, 20, 0],
    //   callback: function (pdf) {
    //       // Save the PDF
    //       window.html2canvas = html2canvas
    //       const code = searchParams.get("code")
    //       const phone = searchParams.get("phone")
    //       setTimeout(()=> {
    //           pdf.save( code.replace(/[+]/g, "") + " - " + phone + '.pdf');
    //       },0)
    //       //window.close();
    //   }
    // });
  }

  async function getAllPrice(seatersId, marblePatternId, designId) {
    const priceTable = await axios.get(base_url + "/texture/get-texture-by-id/" + marblePatternId + "/" + seatersId );
    const priceLeg = await axios.get(base_url + "/grade/get-grade-detail-by-kaki-seaters/" + designId + "/" + seatersId );
    const hargaAsli = (roundToDown(priceTable.data.harga_slab + priceLeg.data.data.harga, -6))  + 5990000;
    const hargaDiskon = Math.floor(((hargaAsli * (20/100))));
    return {
      priceTable : priceTable.data,
      priceLeg : priceLeg.data.data,
      hargaAsli,
      hargaDiskon
    };
  }

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  const hostName = constants.hostname;
  const protocol = constants.protocol;
  const port = constants.port;

  return (
    <div >
      {/* <section className={
        "top-[50px] h-full relative p-5 bg-[#FFF3E5] hidden" +
        (navResponsive == true
          ? "lg:ml-[230px] ml-[55px]"
          : "ml-[55px]")
      }> */}
        {/* <div id="PDFWishlist" className="flex flex-col container  min-w-[610px] midget:w-full p-2 bg-white rounded-md text-[11px] "> */}
        <div id="PDFWishlist" className=" w-[595px] h-[842px] p-2 bg-white rounded-md text-[11px] ">
          <div className="flex flex-row justify-between items-start ">
            <img
              src={`${protocol}${hostName}${port}/assets/icons/IconEsteticohome.png`}
              width={75}
              height={70}
            />
            <p className="text-right text-sm font-bold">{searchParams.get("code") ? searchParams.get("code").replace(/[' ']/g, "") : ""}</p>
          </div>
          <hr className="my-1" />

          <div className="flex sm:flex-row flex-col gap-3">
            <div className="basis-1/2">
              <p className="midget:text-sm font-bold">Cust. {getLocalStorageValue("phone")}</p>
            </div>
            <div className="basis-1/2">
              <address className="text-right text-[12px]">
                <p className="font-bold not-italic">PT Estetico Furnir Agung</p>
                <p className="not-italic">
                  Jalan Gatot Subroto 47E Medan, Sumatera Utara 20112
                </p>
              </address>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <p className="font-bold midget:text-sm">
              www.custom.esteticohome.my.id
            </p>
            <p className="font-bold midget:text-sm">
              www.esteticohome.com
            </p>
          </div>

          <div className="flex flex-row justify-between mt-2 ">
            <div className=" midget:text-sm">
              <p>
                order@esteticohome.com <br />
                Tel. 082273386665
              </p>
            </div>
            <div className=" midget:text-sm">
              <p>
                <span className="font-bold">Date</span>
                <br />
                Monday, {today}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
              <img
                  // src={ base_url+"/wishlist/"+code+" - "+getLocalStorageValue("phone")+".png" }
                  src={`${protocol}${hostName}${port}/assets/img/upload/wishlist/${code} - ${getLocalStorageValue("phone")}.png`}
                  alt=""
                  className="object-fit"
                  width={336}
                  height={336}
                  crossOrigin={"use-credentials"}
              />  
          </div>
          
          <div className="mx-auto my-0 w-full p-3">
              <div className="overflow-x-auto">
                {/*<table className="w-full border border-primary mb-2 text-sm">
                  <thead>
                    <tr className="border border-primary border-b-2 border-collapse bg-gray-300">
                      <th className="px-2 pb-2 text-center" scope="col">Descriptions</th>
                      <th className="px-2 pb-2 text-center" scope="col">Quantity</th>
                      <th className="px-2 pb-2 text-center" scope="col">Item Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#FFF3E5]">
                  <tr className="border border-primary border-b-1 border-collapse">
                      <td className="pl-2 py-1" data-label="Description">
                        <span className="font-bold text-sm"> Table Top </span>
                        <br />
                        <table  className='text-xs w-full' >
                          <tr>
                            <td>Shape</td>
                            <td className='w-[10px]'>:</td>
                            <td>{top ? top.name : ""} {edge ? edge.name : "" }</td>
                          </tr>

                          <tr>
                            <td>Dimension</td>
                            <td className='w-[10px]'>:</td>
                            <td>{seaters ? seaters.name : "" }</td>
                          </tr>

                          <tr>
                            <td>Marble Pattern</td>
                            <td className='w-[10px]'>:</td>
                            <td>{ marblePattern ? marblePattern.name : "" }</td>
                          </tr>

                          <tr className='text-transparent text-xs py-0' >
                            <td>Shape</td>
                            <td className='w-[10px]'>:</td>
                            <td>{top ? top.name : ""} {edge ? edge.name : "" }</td>
                          </tr>

                          <tr className='text-transparent text-xs py-0'>
                            <td>Dimension</td>
                            <td className='w-[10px]'>:</td>
                            <td>{seaters ? seaters.name : "" }</td>
                          </tr>

                          <tr className='text-transparent text-xs py-0'>
                            <td>Marble Pattern</td>
                            <td className='w-[10px]'>:</td>
                            <td>{ marblePattern ? marblePattern.name : "" }</td>
                          </tr>
                        </table>
                      </td>
                      <td className="px-2 py-1 text-xs text-center" data-label="Description">1x</td>
                      <td className="px-2 py-1 text-right text-xs" data-label="Item Price">Rp {priceTable ? formatRupiah(priceTable) : ""},-</td>
                    </tr>

                    <tr className="border border-primary border-b-1 border-collapse">
                      <td className="px-2 py-1" data-label="Description">
                        <span className="font-bold text-sm">Table Leg </span>
                        <br />
                        
                        <table  className='text-xs w-full' >
                          <tr>
                            <td>Design</td>
                            <td className='w-[10px]'>:</td>
                            <td>{design ? design.nama : ""}</td>
                          </tr>

                          <tr>
                            <td>Color</td>
                            <td className='w-[10px]'>:</td>
                            <td>{color ? color.name : "" }</td>
                          </tr> 

                          <tr className='text-transparent text-xs py-0' >
                            <td>Shape</td>
                            <td className='w-[10px]'>:</td>
                            <td>{top ? top.name : ""} {edge ? edge.name : "" }</td>
                          </tr>

                          <tr className='text-transparent text-xs py-0'>
                            <td>Dimension</td>
                            <td className='w-[10px]'>:</td>
                            <td>{seaters ? seaters.name : "" }</td>
                          </tr>

                          <tr className='text-transparent text-xs py-0'>
                            <td>Marble Pattern</td>
                            <td className='w-[10px]'>:</td>
                            <td>{ marblePattern ? marblePattern.name : "" }</td>
                          </tr>
                        </table>
                      </td>
                      <td className="px-2 py-1 text-xs text-center" data-label="Description">1x</td>
                      <td className="px-2 py-1 text-right text-xs" data-label="Item Price">Rp {design ? formatRupiah(priceLeg) : ""},-</td>
                    </tr>

                    <tr className="border border-primary border-t-2 border-collapse">
                      <td className="px-2 py-2 text-center font-bold text-xs" data-label="Total" colSpan="2">Total</td>
                      <td className="px-2 py-2 font-bold text-right text-xs">
                        Rp { priceTable && design ? formatRupiah(priceTable + priceLeg) : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>*/}
                
                <table className="w-full border border-primary mb-2 font-jakarta text-sm">
                  <thead>
                    <tr className="border-b border-primary bg-gray-300">
                      {/* <th className="px-2 py-1 font-bold text-center" scope="col" colSpan={3} >Descriptions</th> */}
                    </tr>
                  </thead>
                  <tbody className="border-primary ">

                    <tr className=" border-primary ">
                      <td className="px-2 pb-2" colSpan={3} data-label="Description">
                        <span className="font-semibold text-md"> Table Top </span>
                      </td>
                    </tr>

                    <tr className=" border-primary ">
                      <td className="px-2 py-1 text-xs" data-label="Description">
                          Shape
                      </td>
                      <td>:</td>
                      <td className="px-2 py-1 text-xs " data-label="Description">
                        {top ? top.name : ""} {edge ? edge.name : "" }
                      </td>
                    </tr>

                    <tr className=" border-primary">
                      <td className="px-2 py-1 text-xs" data-label="Description">
                        Dimension
                      </td>
                      <td>:</td>
                      <td className="px-2 py-1 text-xs" data-label="Description">
                        {seaters ? seaters.name : "" } 
                        <span className='text-xs' > ( {seaters ? seaters.type_top == 0 ? `Diameter ${seaters.diameter} cm`  : `${seaters.panjang} cm x ${seaters.lebar} cm` : ""} )</span>
                      </td>
                    </tr>

                    <tr className=" border-primary ">
                      <td className="px-2 pt-1 pb-5 text-xs align-top" data-label="Description">
                        Marble Pattern
                      </td>
                      <td className="align-top">:</td>
                      <td className="px-2 pt-1 pb-5 text-xs" data-label="Description">
                        {marblePattern ? marblePattern.name : ""}
                      </td>
                    </tr>

                    <tr className=" border-primary ">
                      <td className="px-2 pb-2 align-top" colSpan={3} data-label="Description">
                        <span className="font-semibold text-sm"> Table Leg </span>
                      </td>
                    </tr>
                    
                    <tr className=" border-primary ">
                      <td className="px-2 py-1 text-xs" data-label="Description">
                          Material
                      </td>
                      <td>:</td>
                      <td className="px-2 py-1 text-xs " data-label="Description">
                        {materialBottom ? materialBottom.name : ""}
                      </td>
                    </tr>

                    <tr className=" border-primary ">
                      <td className="px-2 py-1 text-xs" data-label="Description">
                          Design
                      </td>
                      <td>:</td>
                      <td className="px-2 py-1 text-xs " data-label="Description">
                        {design ? design.nama : ""}
                      </td>
                    </tr>

                    <tr className=" border-primary ">
                      <td className="px-2 py-1 pb-5 align-top text-xs" data-label="Description">
                          Color
                      </td>
                      <td className="align-top">:</td>
                      <td className="px-2 text-xs align-top" data-label="Description">
                        {color ? color.name : ""}
                      </td>
                    </tr>
                    
                    <tr className='bg-primary text-white'>
                      <td className="px-2 pb-2 text-start font-semibold text-sm" colSpan={2} data-label="Total">Total</td>
                      <td className="px-2 pb-1 font-bold text-xs text-start">
                        {/* { priceTable && design ? formatRupiah( hargaAsli - hargaDiskon , "IDR") : "-" } */}
                        { priceTable && design ? formatRupiah( hargaAsli , "IDR") : "-" }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                <span className="font-bold text-xs">Note</span> <span className="text-[10px]">: Estimated Working Time 17 - 21 Days</span>
              </p>
          </div>
        </div>
      {/* </section> */}
    </div>
  );
}

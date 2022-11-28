import {useEffect, useState} from 'react'
import "tw-elements"
import axios from 'axios'
import * as constants from "../../constants";
import { checkExpiredTokenCustomer } from "../../config/helper/checkexpiredtoken";
import { refreshTokenCustomer } from "../../config/redux/reducer/auth-customer";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { formatRupiah } from "../../utils";
import Swal from 'sweetalert2'
import LoadingSpinner from '../../components/atoms/loading';
import {roundTo, roundToUp, roundToDown} from 'round-to';

const base_url = constants.base_url;
const hostName = constants.hostname;
const protocol = constants.protocol;
const port = constants.port;

export default function CustomerWishtList({wishlist, getWishlist, isLoading, setIsLoading}) {
  const [wishlistUI, setWishlistUI] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(wishlist.length > 0) {
      setIsLoading(true)
      allWishlist()
    }
  },[wishlist])

  const [tokenAccess, setTokenAccess] = useState();
  const [expireAccess, setExpireAccess] = useState();
  const getLocalStorageValue = (s) => localStorage.getItem(s);
  
  const allWishlist = async () => {
    //console.log("Setting Wishlist", wishlist)
    let data = [];
    await Promise.all(wishlist.map( async (value, index) => {
        const code = value.code;
        
        const response = await axios.get(base_url + "/item-code/get-item-code/?code=" + code );
        const top = response.data.data.top;
        const edge = response.data.data.edge;
        const seaters = response.data.data.dimension;
        const marblePattern = response.data.data.marblePattern;
        const materialBottom = response.data.data.materialBottom;
        const design = response.data.data.design;
        const color = response.data.data.color;
        const priceTable = await axios.get(base_url + "/texture/get-texture-by-id/" + marblePattern.id + "/" + seaters.id );
        const priceLeg = await axios.get(base_url + "/grade/get-grade-detail-by-kaki-seaters/" + design.id + "/" + seaters.id )
        
        const hargaAsli = (roundToDown(priceTable.data.harga_slab + priceLeg.data.data.harga, -6))  + 5990000;
        
        // console.log("Harga Slab : ", priceTable.data.harga_slab)
        // console.log("Harga Kaki : ", priceLeg.data.data.harga)
        // console.log("Harga Diskon : ", Math.floor(((hargaAsli * (15/100)))))
        // console.log("Harga Akhir : ",hargaAsli)
        
        data.push({
          top,
          edge,
          seaters,
          marblePattern,
          materialBottom,
          design,
          color,
          priceTable : priceTable.data.harga_slab,
          priceLeg : priceLeg.data.data.harga,
          wishlist : value,
          hargaDiskon : Math.floor(((hargaAsli * (20/100)))),
          hargaAsli
        })
        //setWishlistUI([...data])
    }))
    setWishlistUI(data);
    setIsLoading(false)
  }

  const refreshToken = async (action, code) => {
    await dispatch(refreshTokenCustomer())
    .unwrap()
    .then(res => {
        if(res.success) {
          const decoded = jwt_decode(res.token);
          setTokenAccess(res.token)
          setExpireAccess(decoded.exp)
          if (action == "share") handleShareToPDF(code, getLocalStorageValue("phone"), res.token, decoded.exp);
          else if (action == "save") handleDeleteWishlist(code, getLocalStorageValue("phone"), res.token, decoded.exp)
        }
        else navigate(`/login?action=wishlist`, { replace: true }); 
    })
    .catch(err => {
        if (err) {
          navigate(`/login?action=wishlist`, { replace: true });
        }
    })
  }

  const handleShareToPDF = async (code, phone, token, exp) => {
      let jsonData = await checkExpiredTokenCustomer(exp);
      if (jsonData[0].status_expired) {
        const decoded = jwt_decode(jsonData[0].data_token);
        setTokenAccess(jsonData[0].data_token);
        setExpireAccess(decoded.exp);
      }
      window.open(`/convert-pdf?code=${code}&phone=${phone}`, "_BLANK");
  }

  const handleDeleteWishlist = async (code, token, exp) => {
    setIsLoading(true)
    // Swal.fire({
    //   title: "",
    //   html: "Please Wait . . . ",
    //   timerProgressBar: true,
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    await dispatch(refreshTokenCustomer())
    .unwrap()
    .then( async (res) => {
        const decoded = jwt_decode(res.token);
        setTokenAccess(res.token)
        setExpireAccess(decoded.exp)
        const cek = await axios.get(base_url + `/wishlist/get-detail-wishlist/?code=${code}&phone=${getLocalStorageValue("phone")}`, {
          headers: {
            Authorization: `Bearer ${res.token}`
          }
        })
    
        if(cek.data.success){
            const data = {
              phone: getLocalStorageValue("phone"),
              code : code.replace(/[+]/g, "")
            }
            const response = await axios.delete(`${base_url}/wishlist/delete-wishlist/?code=${data.code}&phone=${data.phone}`, {
                headers: {
                  Authorization: `Bearer ${res.token}`,
                },
            });
            if(response.data.success){
                const get = getWishlist(res.token);
                get.then(()=>{
                  Swal.close()
                  setIsLoading(false)
                })
            }
            else {
              Swal.close();
              setIsLoading(false)
            }
        }
        else {
          Swal.close();
          setIsLoading(false)
        }

    })
    .catch(err => {
        if (err) {
        }
    })
  }

  return (
    <>
    {
      isLoading ? (
        <>
          <div class="flex flex-col items-center justify-center h-screen">
            <LoadingSpinner/>
          </div>
        </>
      ) : wishlist.length == 0 ? (
          <>
            <div class="flex flex-col items-center justify-center h-screen">
              
              <img src='/assets/icons/Icon_heart_abu.svg' className='w-1/12' />
              <div className='mt-3 md:mt-5'>
                <label className='uppercase text-sm md:text-xl'>Wishlist Kosong</label>
              </div>

            </div>
          </> 
      )
        :
      (
        <section>
          <div className="mb-8 p-2 grid md:grid-cols-2 xs:grid-cols-1 gap-3">
            {
              wishlistUI.map((value, index)=>{
                const top = value.top;
                const edge = value.edge;
                const seaters = value.seaters;
                const marblePattern = value.marblePattern;
                const materialBottom = value.materialBottom;
                const design = value.design;
                const color = value.color;
                const priceTable = value.priceTable;
                const priceLeg = value.priceLeg;
                const wishlist = value.wishlist;
                const hargaAsli = value.hargaAsli;
                const hargaDiskon = value.hargaDiskon;

                return (
                  <div className="border bg-transparent rounded-md flex flex-col h-full" key={index}>
                      <div className="grid xl:grid-cols-6 grid-cols-1 gap-1 p-2">
                          <div className='xl:col-span-2 relative'>
                            <img
                                className="h-[28px] cursor-pointer absolute right-0"
                                src="/assets/icons/Icon_heart.svg"
                                alt="Wishlist"
                                title="Wishlist"
                                data-bs-toggle="tooltip"
                                width={48}
                                height={48}
                                onClick={() => 
                                  {
                                    Swal.fire({
                                      title: "Remove From Your Wishlist ?",
                                      icon : "warning",
                                      html: "Once You Continue, This Cannot Be Undone",
                                      confirmButtonText : "Continue",
                                      confirmButtonColor : "#004441",
                                      cancelButtonColor : "darkred",
                                      cancelButtonText : "Cancel",
                                      showCancelButton :true,
                                      allowOutsideClick: false,
                                    }).then((result)=>{
                                        if(result.isConfirmed){
                                            refreshToken("save", wishlist.code)
                                        }
                                    });
                                }}
                            />
                            
                            <img
                              src={`${protocol}${hostName}${port}/assets/img/upload/wishlist/${wishlist.code} - ${getLocalStorageValue("phone")}.png`}
                              alt=""
                              className="w-full h-auto mx-auto"
                            />
                          </div>


                          <table className="xl:col-span-4 border border-gray mb-2 font-jakarta lg:text-base md:text-sm text-md text-start">
                            <thead>
                              <tr className="border-b border-gray bg-gray-300">
                              </tr>
                            </thead>
                            <tbody className="">

                              <tr className="border-b border-gray bg-gray-100 text-primary">
                                <td className="px-2 py-3" colSpan={3} data-label="Description">
                                  <span className="font-semibold text-md"> Table Top </span>
                                </td>
                              </tr>

                              <tr className=" border-gray ">
                                <td className="px-2 py-1 text-sm" data-label="Description">
                                    Shape
                                </td>
                                <td>:</td>
                                <td className="px-2 py-1 text-sm " data-label="Description">
                                  {top ? top.name : ""} {edge ? edge.name : "" }
                                </td>
                              </tr>

                              <tr className=" border-gray">
                                <td className="px-2 py-1 text-sm" data-label="Description">
                                  Dimension
                                </td>
                                <td>:</td>
                                <td className="px-2 py-1 text-sm" data-label="Description">
                                  {seaters ? seaters.name : "" } 
                                  <span className='text-xs' > ( {seaters ? seaters.type_top == 0 ? `Diameter ${seaters.diameter} cm`  : `${seaters.panjang} cm x ${seaters.lebar} cm` : ""} )</span>
                                </td>
                              </tr>

                              <tr className=" border-gray ">
                                <td className="px-2 py-1 text-sm" data-label="Description">
                                  Marble Pattern
                                </td>
                                <td>:</td>
                                <td className="px-2 py-1 text-sm" data-label="Description">
                                  {marblePattern ? marblePattern.name : ""}
                                </td>
                              </tr>

                              <tr className="border-b border-t border-gray bg-gray-100 text-primary">
                                <td className="px-2 py-3" colSpan={3} data-label="Description">
                                  <span className="font-semibold text-md"> Table Leg </span>
                                </td>
                              </tr>
                              
                              <tr className=" border-gray ">
                                <td className="px-2 py-1 text-sm" data-label="Description">
                                    Material
                                </td>
                                <td>:</td>
                                <td className="px-2 py-1 text-sm " data-label="Description">
                                  {materialBottom ? materialBottom.name : ""}
                                </td>
                              </tr>

                              <tr className=" border-gray ">
                                <td className="px-2 py-1 text-sm" data-label="Description">
                                    Design
                                </td>
                                <td>:</td>
                                <td className="px-2 py-1 text-sm " data-label="Description">
                                  {design ? design.nama : ""}
                                </td>
                              </tr>

                              <tr className=" border-gray pb-5">
                                <td className="px-2 py-1 text-sm" data-label="Description">
                                    Color
                                </td>
                                <td>:</td>
                                <td className="px-2 text-sm" data-label="Description">
                                  {color ? color.name : ""}
                                </td>
                              </tr>
                              
                              <tr className='bg-gray-100 text-primary'>
                                <td className="px-2 py-4 text-start font-semibold text-md" colSpan={2} data-label="Total">Total</td>
                                <td className="px-2 py-4 font-bold md:text-sm text-sm text-start">
                                  {/* { priceTable && design ? formatRupiah( hargaAsli - hargaDiskon , "IDR") : "-" } */}
                                  { priceTable && design ? formatRupiah( hargaAsli, "IDR") : "-" }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                      </div>

                      <div className="text-right md:text-sm text-xs p-2">
                        <p>Estimated Working Time 17 - 21 Days</p>
                      </div>

                      <div className="mt-auto flex flex-wrap justify-end gap-1 p-2 border-t md:text-sm text-xs">
                            <button className="flex items-center gap-1 py-1 px-2 border border-blue-300 text-grey bg-white hover:bg-blue-300 rounded-md " role="group" onClick={()=>{
                              const hostName = constants.hostname;
                              const protocol = constants.protocol;
                              const port = constants.port;
                              try{
                                  navigator.clipboard.writeText(`${protocol}${hostName}${port}/?code=${wishlist.code.replace(/[+]/g, "%2B") }`);
                                  Swal.fire({
                                    title: "Tautan Berhasil Disalin",
                                    html: "Kamu bisa membagi tautan ini kepada semua temanmu. Check out sekarang sebelum pattern favoritemu kehabisan!!",
                                    icon:"success",
                                    confirmButtonColor: "#004441",
                                    allowOutsideClick: false,
                                  });
                              }catch(err){

                              }}} 
                            >
                              <img
                                src="/assets/icons/IconCopyLink.svg"
                                alt="Copy Link"
                                title="Copy Link"
                                data-bs-toggle="tooltip"
                                className='h-[30px]'
                              />
                              <span> Link</span>
                            </button>
                            <button className="bg-primary hover:bg-green-800 py-1 px-2 rounded-md md:inline" onClick={()=> refreshToken("share", wishlist.code) } >
                              <img
                                  src="/assets/icons/IconPDF.svg"
                                  alt="Convert To PDF"
                                  title="Convert To PDF"
                                  data-bs-toggle="tooltip"
                                  className='h-[30px]'
                                />
                            </button>
                      </div>
                  </div>
                )
              })
            }
          </div>
        </section>
      )
    }
      
    </>
  );
}

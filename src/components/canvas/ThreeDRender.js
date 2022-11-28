import { useLayoutEffect, useEffect, useState, useRef, createRef, Suspense, useContext, useExample } from "react";
import { CustomEnqContext } from "../../config/context/customEnqContext";
import axios from "axios";
import { Tooltip } from "react-tippy";
import 'react-tippy/dist/tippy.css'
import * as constants from "../../constants";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";
import { Top, Bottom, CustomEnquiryEditor, CustomEnquiryCustomer, CustomEnquiryCustomer2 } from "../../components";
import { BakeShadows, Stage, Html, useProgress, OrbitControls } from "@react-three/drei";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { createPopper, detectOverflow } from "@popperjs/core";
import "tw-elements";
import * as THREE from "three";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import {roundTo, roundToUp, roundToDown} from 'round-to';
//import Cookies from 'js-cookie';
import { checkExpiredTokenCustomer } from "../../config/helper/checkexpiredtoken";
import { CustomerContext } from "../../config/context/customerContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import md5 from "md5";
import { refreshTokenCustomer, logoutCustomer } from "../../config/redux/reducer/auth-customer";
import jwt_decode from "jwt-decode";
import PdfWishList from '../../pages/admin/PdfWishlist';
import Faqknwl from "../faqknwl"
import CartCustomEnquiry from "../../pages/custom-enquiry/cart-cutom-enquiry";
import { DefaultLoadingManager } from 'three';
import LoadingSpinner from '../atoms/loading';
import { typeOf } from "react-summernote";

const base_url = constants.base_url;
// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
// extend({ OrbitControls });

const popcorn = document.querySelector("#popcorn");
const tooltip = document.querySelector("#tooltip");
createPopper(popcorn, tooltip);

const ThreeDRender = ({ menu, form, changeToPage3 }) => {
  
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const context = useContext(CustomEnqContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const [userAction, setUserAction] = useState();
  const cookies = new Cookies();
  const [threeDTop, setThreeDTop] = useState(0);
  const [threeDTexture, setThreeDTexture] = useState(0);
  const [threeDLeg, setThreeDLeg] = useState(0);
  const [threeDColor, setThreeDColor] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { token, expire } = useContext(CustomerContext)
  const [codeTop, setCodeTop] = useState(0);
  const [codeEdge, setCodeEdge] = useState(0);
  const [codeMarblePattern, setCodeMarblePattern] = useState(0);
  const [codeSeaters, setCodeSeaters] = useState(0);
  const [codeMaterialBottom, setCodeMaterialBottom] = useState(0);
  const [codeDesign, setCodeDesign] = useState(0);
  const [codeColor, setCodeColor] = useState(0);

  const [shapes, setShapes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [marblePatterns, setMarblePatterns] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [colors, setColors] = useState([]);
  const [idTopStatus, setIdTopStatus] = useState(0);
  const [typeTopStatus, setTypeTopStatus] = useState(0);
  const [idMaterialStatus, setIdMaterialStatus] = useState(0);
  const [shapeId, setShapeId] = useState(0);
  const [edgeId, setEdgeId] = useState(0);
  const [shapeType, setShapeType] = useState();
  const [dimensionId, setDimensionId] = useState(0);
  const [marblePatternId, setMarblePatternId] = useState(0);
  const [materialId, setMaterialId] = useState(0);
  const [designId, setDesignId] = useState(0);
  const [colorId, setColorId] = useState(0);
  const [priceTableTop, setPriceTableTop] = useState(0);
  const [priceTableLeg, setPriceTableLeg] = useState(0);
  const [selectedShape, setSelectedShape] = useState(0);
  const [selectedEdge, setSelectedEdge] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState(0);
  const [selectedMarblePattern, setSelectedMarblePattern] = useState(0);
  const [marblePatternDesc, setMarblePatternDesc] = useState();
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [designDesc, setDesignDesc] = useState();
  const [selectedColor, setSelectedColor] = useState(0);
  const [azimuthAngle, setAzimuthAngle] = useState(-0.772398469658455);
  const [polarAngle, setPolarAngle] = useState(1.2);
  const [distance, setDistance] = useState(3.1100204526123507);
  const [autoRotate, setAutoRotate] = useState(false);
  const [timer, setTimer] = useState(1200);
  const controls = useRef();
  const canvas = useRef();

  const [isOpenPreset, setIsOpenPreset] = useState(false);
  const [isOpenTopTable, setIsOpenTopTable] = useState(false);
  const [isOpenEdge, setIsOpenEdge] = useState(false);
  const [isOpenDimension, setIsOpenDimension] = useState(false);
  const [bgDimension, setBgDimension] = useState("");
  const [isOpenMarblePattern, setIsOpenMarblePattern] = useState(false);
  const [bgMarblePattern, setBgMarblePattern] = useState("");
  const [isOpenLegTable, setIsOpenLegTable] = useState(false);
  const [isOpenDesign, setIsOpenDesign] = useState(false);
  const [bgDesign, setBgDesign] = useState("");
  const [isHideAccordionColor, setIsHideAccordionColor] = useState(false);
  const [isOpenColor, setIsOpenColor] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [isOpenGuide, setIsOpenGuide] = useState("");
  const [isOpenFAQ, setIsOpenFAQ] = useState("");
  const [isOpenUser, setIsOpenUser] = useState("");

  const [showTopSegment, setShowTopSegment] = useState(true);
  const [showTopShape, setShowTopShape] = useState(false);
  const [showTopEdge, setShowTopEdge] = useState(false);
  const [showTopSeaters, setShowTopSeaters] = useState(false);
  const [showTopMarblePattern, setShowTopMarblePattern] = useState(false);
  const [showTopScale, setShowTopScale] = useState(false);
  const [showTopPosition, setShowTopPosition] = useState(false);
  const [showBottomSegment, setShowBottomSegment] = useState(true);
  const [showBottomScale, setShowBottomScale] = useState(false);
  const [showBottomPosition, setShowBottomPosition] = useState(false);
  const [showBottomMaterial, setShowBottomMaterial] = useState(false);
  const [showBottomSeaters, setShowBottomSeaters] = useState(false);
  const [showBottomColor, setShowBottomColor] = useState(false);

  const [sizeEdited, setSizeEdited] = useState([]);
  const [rotateSpeed, setRotateSpeed] = useState(0.5);
  const [rectLightHeight, setRectLightHeight] = useState(0);

  const [tokenAccess, setTokenAccess] = useState();
  const [expireAccess, setExpireAccess] = useState();
  const getLocalStorageValue = (s) => localStorage.getItem(s);

  const [isMyWishList, setIsMyWishList] = useState();
  const [isScreenShoot, setIsScreenShoot] = useState(false);

  const [message, setMessage] = useState([]);
  
  const [showPattern, setShowPattern] = useState(false)
  //dw
  const [sumCart, setSumcart] = useState(0)
  const [dataCart, setDatacart] = useState([])
  const [choiceVariant, setChoicevariant] = useState(false)
  const [choiceSteptwo, setChoicesteptwo] = useState('')

  const [scaleT, setScaleT] = useState({
    scale_x: 1,
    scale_y: 1,
    scale_z: 1,
  });
  const [scaleB, setScaleB] = useState({
    scale_x: 1,
    scale_y: 1,
    scale_z: 1,
  });
  const [positionT, setPositionT] = useState({
    position_x: 0,
    position_y: 0,
    position_z: 0,
  });
  const [positionB, setPositionB] = useState({
    position_x: 0,
    position_y: 0,
    position_z: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [clickable, setClickable] = useState(false);
  const [arrIsLoading, setArrIsLoading] = useState({
    loadingShape : true, 
    loadingEdge : true,
    loadingDimension : true, 
    loadingPattern : true,
    loadingMaterial : true, 
    loadingDesign : true, 
    loadingColor : true, 
    loadingScaleT : true, 
    loadingScaleB : true, 
  })
  const hargaAsli = (roundToDown(priceTableTop + priceTableLeg, -6))  + 5990000;
  const hargaDiskon = Math.floor(hargaAsli * (20/100))

  {
    /* USE EFFECT */
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
  
  useEffect(() => {
    if(!searchParams.get("action") && codeTop != 0 && codeEdge != 0  && codeSeaters != 0  && codeMarblePattern != 0  && codeMaterialBottom != 0  && codeDesign != 0  && codeColor != 0 ) {
      setSearchParams({ code: `${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}`});
    }
  }, [codeTop, codeEdge, codeSeaters, codeMarblePattern, codeMaterialBottom, codeDesign, codeColor]);

  useEffect(()=>{
    const cekWishList = async () => {
      if (codeTop && codeEdge  && codeSeaters  && codeMarblePattern  && codeMaterialBottom  && codeDesign  && codeColor && tokenAccess) {
          let token;
          await dispatch(refreshTokenCustomer())
          .unwrap()
          .then(res => {
              const decoded = jwt_decode(res.token);
              setTokenAccess(res.token)
              setExpireAccess(decoded.exp)
              token = res.token
          })
          .catch(err => {
              if (err) {
              }
          })

          const response = await axios.get(base_url + `/wishlist/get-detail-wishlist/?code=${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}&phone=${getLocalStorageValue("phone")}`, {
            headers: {
              "Content-type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          });
          if(response.data.success) setIsMyWishList(true);
          else setIsMyWishList(false);
      }
    }
    cekWishList();
  },[searchParams, codeTop, codeEdge, codeSeaters, codeMarblePattern, codeMaterialBottom, codeDesign, codeColor])

  useEffect(() => {
    if(searchParams.get("action") && !userAction ){
        refreshToken(searchParams.get("action"))
    }
    else{
        if(userAction == "save" && azimuthAngle == -0.772398469658455 && polarAngle == 1.2 && tokenAccess && expireAccess && threeDTop != 0  && threeDLeg != 0 && threeDTexture != 0 && threeDColor != 0 && codeTop != 0 && codeEdge != 0 && codeEdge != 0 && codeSeaters != 0 && codeMarblePattern != 0 && codeMaterialBottom != 0 && codeDesign != 0 && codeColor != 0 ) {
            setIsScreenShoot(true)
            setAutoRotate(false)
            setTimeout(() => {
                handleAddWishlist(searchParams.get("code"), tokenAccess, expireAccess );
            }, 1500);
        }

        if(userAction == "share" && azimuthAngle == -0.772398469658455 && polarAngle == 1.2 && tokenAccess && expireAccess && threeDTop != 0  && threeDLeg != 0 && threeDTexture != 0 && threeDColor != 0) {
            setIsScreenShoot(true)
            setAutoRotate(false)
            setTimeout(() => {
              handleShareToPDF(searchParams.get("code"), getLocalStorageValue("phone"), tokenAccess, expireAccess );
            }, parseInt(timer + 1000 ) )  
        }

        if(userAction == "cart" && azimuthAngle == -0.772398469658455 && polarAngle == 1.2 && tokenAccess && expireAccess && threeDTop != 0  && threeDLeg != 0 && threeDTexture != 0 && threeDColor != 0 && codeTop != 0 && codeEdge != 0 && codeEdge != 0 && codeSeaters != 0 && codeMarblePattern != 0 && codeMaterialBottom != 0 && codeDesign != 0 && codeColor != 0 ) {
          setIsScreenShoot(true)
          setAutoRotate(false)
          setTimeout(() => {
              handleAddCart(searchParams.get("code"), tokenAccess, expireAccess );
          }, 1500);
        }

        if(userAction == "wishlist"){
          navigate(`/MyWishlist?code=${searchParams.get("code")}`, {replace : true} )
        }
        
        if(userAction == "my-cart"){
          navigate(`/cart?code=${searchParams.get("code")}`, {replace : true} )
        }
    }
  },
  [
    userAction,
    azimuthAngle,
    polarAngle,
    tokenAccess,
    expireAccess,
    threeDTop,
    threeDTexture,
    threeDLeg,
    threeDColor,
    codeTop,
    codeEdge,
    codeSeaters,
    codeMarblePattern,
    codeMaterialBottom,
    codeDesign,
    codeColor,
  ])

  useEffect(() => {
    cookies.remove("marblePatternId");
    cookies.remove("selectedMarblePattern");
    cookies.remove("threeDTexture");
    cookies.remove("designId");
    cookies.remove("selectedDesign");
    cookies.remove("threeDLeg");
    cookies.remove("colorId");
    cookies.remove("selectedColor");
    cookies.remove("threeDColor");
    cookies.remove("priceLeg");
  }, []);

  useEffect(
    function () {
      if (shapeId == 0 && !searchParams.get("code")) {
        tableDefault('');
      }
      else{
        const code = searchParams.get("code");
        if (code) {
          doSearchParams();
        }
      }
    },
    []
  );

  useEffect(() => {
    const cekSession = async () => {
      await dispatch(refreshTokenCustomer())
      .unwrap()
      .then(res => {
          const decoded = jwt_decode(res.token);
          setTokenAccess(res.token)
          setExpireAccess(decoded.exp)
      })
      .catch(err => {
          if (err) {
          }
      })
    }
    cekSession();
  },[])

  async function getDataByCode(value) {
    const response = await axios.get(base_url + "/item-code/get-item-code/?code=" + value);
    if (response.data.success) {
      return response.data.data;
    } else {
      navigate('/');
      window.location.reload(true);
    }
  }

  useEffect(() => {
    if((menu == "customer") || menu == "customer2") {
      const getSumWishlist = context.getSumWishlist;
      return getSumWishlist;
    }
  }, [isMyWishList])

  useEffect(
    function () {
      doSearchParams();
    },
    //[searchParams.get("code")]
    [searchParams.get("code")]
  );

  useEffect(() => {
    if(shapes.length > 0 && edges.length > 0 && dimensions.length == 0 && marblePatterns.length > 0 && materials.length > 0 && designs.length > 0 && colors.length > 0){
      setMessage(["dimension", "Dimensi ini tidak tersedia untuk desain "+ selectedDesign + ". Silahkan pilih desain yang lain."]);
        
    } else if(shapes.length > 0 && edges.length > 0 && dimensions.length > 0 && marblePatterns.length == 0 && materials.length > 0 && designs.length > 0 && colors.length > 0){
      setMessage(["pattern", "Pattern ini tidak tersedia untuk desain "+ selectedDesign + " dan dimensi " + selectedDimension + ". Silahkan pilih desain yang lain."]);  
    }
    else setMessage([])
  },[
    shapes, 
    edges, 
    dimensions, 
    marblePatterns, 
    materials, 
    designs, 
    colors,
    searchParams.get("code")
  ])

  const [cekMarbleStatus, setCekMarbleStatus] = useState(false);

  const doSearchParams = () => {
    if(searchParams.get("code") && searchParams.get("code") != "0000000"  ){
        //console.log(searchParams.get("code"))
        const get = getDataByCode(searchParams.get("code"));
        if(get){
          get.then(async(data) => {
              setShapeId(data.top.id);
              setShapeType(data.top.type);
              setSelectedShape(data.top.name);
              setEdgeId(data.edge.id);
              setSelectedEdge(data.edge.name);
              setDimensionId(data.dimension.id);
              setSelectedDimension(data.dimension.name);
              setMarblePatternId(data.marblePattern.id);
              setSelectedMarblePattern(data.marblePattern.name);
              setMarblePatternDesc(data.marblePattern.deskripsi);
              setThreeDTexture(data.marblePattern.texture)
              setMaterialId(data.materialBottom.id);
              setSelectedMaterial(data.materialBottom.name);
              setDesignId(data.design.id);
              setSelectedDesign(data.design.nama);
              setDesignDesc(data.design.deskripsi);
              setThreeDLeg(data.design.file_three_d);
              setPriceTableLeg(data.dimension.harga_kaki);
              setColorId(data.color.id);
              setSelectedColor(data.color.name);
              setThreeDColor(data.color.file);
              const response = await axios.get(base_url + "/topthreed/get-by-top-edges/" + data.top.id + "/" + data.edge.id);
              const threeD = response.data.data.three_d_file;
              setThreeDTop(threeD)

              if(data.top.code != codeTop ) setCodeTop(data.top.code);
              if(data.edge.code != codeEdge ) setCodeEdge(data.edge.code);
              if(data.dimension.code != codeSeaters ) setCodeSeaters(data.dimension.code);
              if(data.marblePattern.code != codeMarblePattern ) setCodeMarblePattern(data.marblePattern.code);
              //setCodeMarblePattern(data.marblePattern.code);
              if(data.materialBottom.code != codeMaterialBottom ) setCodeMaterialBottom(data.materialBottom.code);
              if(data.design.code != codeDesign ) setCodeDesign(data.design.code);
              if(data.color.code != codeColor ) setCodeColor(data.color.code);
              //setCekMarbleStatus(true)
              // let setFirstMarble = true;

              // marblePatterns.forEach((value)=>{
              //   if( data.marblePattern.code == value.code ) setFirstMarble = false; 
              // })
              
              // if(setFirstMarble){
              //     setCodeMarblePattern(data.marblePattern.code)
              // }
              // else{
              //   Swal.fire({
              //     title: "We're Sorry",
              //     icon:"warning",
              //     html: "Pattern ini tidak tersedia untuk desain kaki "+ data.design.name + " dan dimensi " + data.dimension.name + ". Silahkan pilih dimensi yang lain.",
              //     allowOutsideClick: false,
              //     confirmButtonColor:"#004441"
              //   });
              // }
          });
        }
        else{
          console.log("0 Search Params")
        }
    }
  }

  useEffect(() => {
    if(dimensions.length > 0 && codeSeaters != 0 && !isLoading ){
        let found = false;
        //const found = dimensions.find((element) => element.code === codeSeaters )
        dimensions.forEach((value) => {
          if( codeSeaters == value.code ) found = true; 
        })
        if(found) setClickable(true);
        else {
          //setClickable(false);
          //const item = dimensions[Math.floor(Math.random() * dimensions.length)];
          setCodeSeaters(dimensions[0].code)
          //setMessage(["dimension", "Currently Dimension "+ selectedDimension +" Is Not Available For "+selectedDesign + " Design" ]);
        }
    }
    else setClickable(false);
  },[
    dimensions,
    selectedDimension,
    isLoading
  ])

  useEffect(() => {
    if(marblePatterns.length > 0 && codeMarblePattern != 0 && selectedMarblePattern != 0 && selectedDimension != 0 &&  !isLoading){
      let setFirstMarble = true;
      marblePatterns.forEach((value) => {
        if( codeMarblePattern == value.code ) setFirstMarble = false; 
      })
      
      if(setFirstMarble){
          setCodeMarblePattern(marblePatterns[0].code)
          Swal.fire({
            title: "Maaf",
            icon:"warning",
            html: "Pattern "+selectedMarblePattern+" untuk desain kaki "+selectedDesign+" dan dimension "+selectedDimension+" tidak tersedia saat ini",
            allowOutsideClick: false,
            confirmButtonColor:"#004441"
          });
      }
    }
  },[marblePatterns, selectedMarblePattern, selectedDimension, selectedDesign, isLoading])

  useEffect(
    function () {
      if (selectedEdge == " . . . . . ") {
        setBgDimension("bg-[#ddd]");
        setSelectedDimension(" . . . . . ");
      } else {
        setBgDimension("bg-[#fff]");
      }
    },
    [selectedEdge]
  );

  useEffect(
    function () {
      if (selectedDimension == " . . . . . ") {
        setBgMarblePattern("bg-[#ddd]");
        setSelectedMarblePattern(" . . . . . ");
      } else {
        setBgMarblePattern("bg-[#fff]");
      }
    },
    [selectedDimension]
  );

  useEffect(
    function () {
      if (selectedMarblePattern == " . . . . . ") {
        setBgDesign("bg-[#ddd]");
        setSelectedMaterial(" . . . . . ");
        setSelectedDesign(" . . . . . ");
      } else {
        setBgDesign("bg-[#fff]");
      }
    },
    [selectedMarblePattern]
  );

  useEffect(
    function () {
      if (selectedMaterial == "Steel") {
        setIsHideAccordionColor(false);
      } else if (selectedMaterial == "Marble") {
        setIsHideAccordionColor(true);
      }
    },
    [selectedMaterial]
  );

  useEffect(
    function () {
      if (selectedDesign == " . . . . . ") {
        setBgColor("bg-[#ddd]");
        setSelectedColor(" . . . . . ");
      } else {
        setBgColor("bg-[#fff]");
      }
    },
    [selectedDesign]
  );
  

  useEffect(function () {
    async function tableOfShape() {
      setIsLoading(true)
      setArrIsLoading(prevState => {
        let data = prevState 
        data.loadingShape = true;            
        return {...prevState, ...data}
      })
      
      await axios.get(base_url + "/top").then((response) => {
        setShapes(response.data.data);
        setArrIsLoading(prevState => {
          let data = prevState 
          data.loadingShape = false;            
          return {...prevState, ...data}
        })
        //setIsLoading(false)
      });
    }
    tableOfShape();
  }, []);

  useEffect(
    function () {
      async function tableOfEdge() {
        setIsLoading(true)
        setArrIsLoading(prevState => {
          let data = prevState 
          data.loadingEdge = true;            
          return {...prevState, ...data}
        })
        
        await axios.get(base_url + "/topthreed/get-by-top/" + shapeId).then((response) => {
          //setIsLoading(false)  
          setEdges(response.data.data);
          setArrIsLoading(prevState => {
            let data = prevState 
            data.loadingEdge = false;            
            return {...prevState, ...data}
          })
          
        });
      }
      if (shapeId != 0) tableOfEdge();
    },
    [shapeId]
  );

  useEffect(
    function () {
      if (designId != 0) tableOfDimension();
    },
    [selectedDesign, designId ]
  );

  async function tableOfDimension() {
    setIsLoading(true)
    setArrIsLoading(prevState => {
      let data = prevState 
      data.loadingDimension = true;            
      return {...prevState, ...data}
    })
    
    await axios.get(base_url + "/grade/get-grade-detail-by-kaki/" + designId).then((response) => {
      response.data.data.map((val, i) => {
        response.data.data[i].showForm = false;
      });
      
      setDimensions(response.data.data);
      setArrIsLoading(prevState => {
        let data = prevState 
        data.loadingDimension = false;            
        return {...prevState, ...data}
      })
      
      //setIsLoading(false)
    });
  }

  useEffect(
    function () {
      async function tableOfMarblePattern() {
        setIsLoading(true)
        setArrIsLoading(prevState => {
          let data = prevState 
          data.loadingPattern = true;            
          return {...prevState, ...data}
        })

        await axios.get(base_url + "/texture/get-texture-by-seaters/" + dimensionId+"?size=300").then((response) => {
          //setIsLoading(false)
          setArrIsLoading(prevState => {
            let data = prevState 
            data.loadingPattern = false;            
            return {...prevState, ...data}
          })

          setMarblePatterns(response.data.data);
          if(codeMarblePattern != 0){
              const marbles = response.data.data;
              let setFirstMarble = true;
              
              marbles.forEach((value)=>{
                if( codeMarblePattern == value.code ) setFirstMarble = false; 
              })
              
              if(setFirstMarble){
                if(response.data.data[0]) {
                  setCodeMarblePattern(response.data.data[0].code);
                }
                else{
                  Swal.fire({
                    title: "Maaf",
                    icon:"warning",
                    html: "Pattern "+selectedMarblePattern+" untuk desain kaki "+selectedDesign+" dan dimension "+selectedDimension+" tidak tersedia saat ini",
                    allowOutsideClick: false,
                    confirmButtonColor:"#004441"
                  });
                  setClickable(false)
                }
              }
          }
        });
      }
      
      if (dimensionId != 0 ) tableOfMarblePattern();
    },
    [selectedDimension, dimensionId]
  );

  const idPatternDimension = marblePatternId + "/" + dimensionId;

  useEffect(
    function () {
      async function tableOfMaterial() {
        setIsLoading(true)
        setArrIsLoading(prevState => {
          let data = prevState 
          data.loadingMaterial = true;            
          return {...prevState, ...data}
        })

        await axios.get(base_url + "/material-bottom").then((response) => {
          setMaterials(response.data.data);
          setArrIsLoading(prevState => {
            let data = prevState 
            data.loadingMaterial = false;            
            return {...prevState, ...data}
          })
          
        });
        //setAutoRotate(false);
      }
      tableOfMaterial();
    },
    [selectedShape]
  );

  useEffect(
    function () {
      if (dimensionId != 0 && marblePatternId != 0) tableOfPriceTableTop(true);
    },
    [selectedDimension, selectedMarblePattern]
  );

  async function tableOfPriceTableTop(showLoading) {
    setArrIsLoading(prevState => {
      let data = prevState 
      data.loadingPriceTable = true;            
      return {...prevState, ...data}
    })
    
    await axios.get(base_url + "/texture/get-texture-by-id/" + idPatternDimension).then( (response) =>{
      //setIsLoading(false)
      setPriceTableTop(response.data.harga_slab);
      setArrIsLoading(prevState => {
        let data = prevState 
        data.loadingPriceTable = false;            
        return {...prevState, ...data}
      })

    });
  }

  // const refreshData = () => {
  //   const timer = setTimeout(() => {
  //     if (dimensionId != 0 && marblePatternId != 0) tableOfPriceTableTop(false);
  //     clearTimeout(timer);
  //   }, 5000);
  // }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('This will run after 1 second!')
  //     if (dimensionId != 0 && marblePatternId != 0) tableOfPriceTableTop();
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [selectedDimension, selectedMarblePattern]);

  useEffect(
    function () {
      async function tableOfDesign() {
        setArrIsLoading(prevState => {
          let data = prevState 
          data.loadingDesign = true;            
          return {...prevState, ...data}
        })

        await axios.get(base_url + "/kaki/get-by-typetop-material/" + shapeType + "/" + materialId+"?size=300").then((response) => {
          //setIsLoading(false); 
          setDesigns(response.data.data);
          setArrIsLoading(prevState => {
            let data = prevState 
            data.loadingDesign = false;            
            return {...prevState, ...data}
          })

        });
      }
      if(materialId != 0 ) tableOfDesign();
    },
    [materialId, selectedMaterial, shapeType]
  );

  useEffect(
    function () {
      async function tableOfScaleT() {
        setIsLoading(true)
        setArrIsLoading(prevState => {
          let data = prevState 
          data.loadingScaleT = true;            
          return {...prevState, ...data}
        })

        await axios.get(base_url + "/topscale/get-top-scale-by-seaters-top/" + dimensionId + "/" + shapeType).then( (response) => {
            //setIsLoading(false)
            setArrIsLoading(prevState => {
              let data = prevState 
              data.loadingScaleT = false;            
              return {...prevState, ...data}
            })
            
            if (response.data.success) {
              setScaleT(response.data.data);
            } else
              setScaleT({
                scale_x: 1,
                scale_y: 1,
                scale_z: 1,
              });
        });
        
      }
      if (dimensionId != 0 ) tableOfScaleT();

      async function tableOfScaleB() {
        setIsLoading(true);
        setArrIsLoading(prevState => {
          let data = prevState 
          data.loadingScaleB = true;            
          return {...prevState, ...data}
        })

        await axios.get(base_url + "/bottomscale/get-bottom-scale-by-seaters-kaki/" + dimensionId + "/" + designId).then((response) => {
            //setIsLoading(false)
            setArrIsLoading(prevState => {
              let data = prevState 
              data.loadingScaleB = false;            
              return {...prevState, ...data}
            })

            if (response.data.success) {
              setScaleB(response.data.data);
            } else if (menu == "editor") {
              setScaleB({
                scale_x: 1,
                scale_y: 1,
                scale_z: 1,
              });
            }
        });
      }
      if (dimensionId != 0 && designId != 0) tableOfScaleB();

      // async function tableOfPositionT() {
      //   const response = await axios.get(base_url + "/topposition/get-top-position-by-seaters-top/" + dimensionId + "/" + shapeType);
      //   if (response.data.success) {
      //     setPositionT(response.data.data);
      //   } else
      //     setPositionT({
      //       position_x: 0,
      //       position_y: 0,
      //       position_z: 0,
      //     });
      // }
      // if (dimensionId != 0 && shapeType != 0) tableOfPositionT();

      // async function tableOfPositionB() {
      //   const response = await axios.get(base_url + "/bottomposition/get-bottom-position-by-seaters-kaki/" + dimensionId + "/" + designId);
      //   if (response.data.success) {
      //     setPositionB(response.data.data);
      //   } else
      //     setPositionB({
      //       position_x: 0,
      //       position_y: 0,
      //       position_z: 0,
      //     });
      //   //setAutoRotate(false);
      // }
      // if (dimensionId != 0 && designId != 0 && shapeType) tableOfPositionB();
    },
    [selectedDimension, designId, shapeType]
  );

  useEffect(
    function () {
      async function tableOfColor() {
        setIsLoading(true)
        setArrIsLoading(prevState => {
          let data = prevState 
          data.loadingColor = true;            
          return {...prevState, ...data}
        })

        await axios.get(base_url + "/color/get-by-material/" + materialId).then((response) => {
          //setIsLoading(false)
          setColors(response.data.data);
          setArrIsLoading(prevState => {
            let data = prevState 
            data.loadingColor = false;            
            return {...prevState, ...data}
          })
        });
      }
      if (materialId != 0) tableOfColor();
    },
    [selectedDesign]
  );
  
  const [progressGetData, setProgressGetData] = useState(0);
  //const { dataEx } = useExample(arrIsLoading)

  useEffect(() => {
      let value = 0;
      if(arrIsLoading.loadingShape === false ){
        value = value + (( 1 / 9 ) * 100)
      } 
      if(arrIsLoading.loadingEdge == false ){
        value = value + (( 1 / 9 ) * 100)
      }
      if(arrIsLoading.loadingDimension === false ){
        value = value + (( 1 / 9 ) * 100)
      }
      if(arrIsLoading.loadingPattern === false ){
       value = value + (( 1 / 9 ) * 100)
      }
      if(arrIsLoading.loadingMaterial === false ){
       value = value + (( 1 / 9 ) * 100)
      }
      if(arrIsLoading.loadingDesign === false ){
       value = value + (( 1 / 9 ) * 100)
      }
      if(arrIsLoading.loadingColor === false ){
        value = value + (( 1 / 9 ) * 100)
      }
      if(arrIsLoading.loadingScaleT === false ){
        value = value + (( 1 / 9 ) * 100)
      }
      if(arrIsLoading.loadingScaleB === false ){
        value = value + (( 1 / 9 ) * 100)
      }
      setProgressGetData(value)
  },[arrIsLoading.loadingShape, arrIsLoading.loadingEdge, arrIsLoading.loadingDimension, , arrIsLoading.loadingPattern, , arrIsLoading.loadingMaterial, arrIsLoading.loadingDesign, arrIsLoading.loadingColor, arrIsLoading.loadingScaleT, arrIsLoading.loadingScaleB])

  useEffect(() => {
    if(progressGetData.toFixed(0) == 100) {}
  },[progressGetData])

  async function tableDefault(newId) {
    if (menu == "editor") {
      // Swal.fire({
      //   title: "",
      //   html: "Please Wait . . .",
      //   timerProgressBar: true,
      //   allowOutsideClick: false,
      //   didOpen: () => {
      //     Swal.showLoading();
      //   },
      // });
    }
    
    let response;
    // if (shapeId != 0) response = await axios.get(base_url + "/table-default/" + shapeId);
    response = await axios.get(base_url + "/table-default/" + newId);
    // else response = await axios.get(base_url + "/table-default");
    //console.log(response.data.data[0]);
    const code_top = response.data.data[0].top.code;
    const code_edge = response.data.data[0].edge.code;
    const code_seaters = response.data.data[0].seaters.code;
    const code_marble_pattern = response.data.data[0].texture.code;
    const code_material_bottom = response.data.data[0].material_bottom.code;
    const code_design = response.data.data[0].kaki.code;
    const code_color = response.data.data[0].color.code;
    //KOMBINASI CODE
    
    setCodeTop(code_top);
    setCodeEdge(code_edge);
    setCodeSeaters(code_edge);
    setCodeSeaters(code_seaters);
    setCodeMaterialBottom(code_material_bottom);
    setCodeDesign(code_design);
    setCodeColor(code_color);
    setCodeMarblePattern(code_marble_pattern);
    
    //KOMBINASI CODE
    Swal.close();
  }

  async function cekTableDefault(id_seaters) {
    try {
      let response;
      if (shapeId == 0) response = await axios.get(base_url + "/table-default");
      else response = await axios.get(base_url + "/table-default/" + shapeId);
      //console.log("CEK TABLE", response.data.success)
      if (response.data.success) {
        const defaultIdSeaters = response.data.data[0].seaters.id;
        //console.log("id Seaters", id_seaters)
        if (id_seaters === defaultIdSeaters) return { isUseDefault: true, message: "Dimension Default Tersedia", data: response.data.data };
        else return { isUseDefault: false, message: "Dimension Default Tidak Tersedia", data: [] };
      } else {
        return { isUseDefault: false, message: "Terjadi Kesalahan", data: [] };
      }
    } catch (err) {
      return { isUseDefault: false, message: err.message, data: [] };
    }
  }

  useEffect(() => {
    if (controls.current && menu == "editor") {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    if(threeDTop != 0 &&  threeDTexture  != 0 &&  threeDLeg != 0 && threeDColor != 0 && scaleT.scale_x != undefined && scaleT.scale_y != undefined && scaleT.scale_y != undefined && scaleB.scale_x != undefined && scaleB.scale_y != undefined && scaleB.scale_y != undefined && scaleB.scale_z != undefined ){
      setAutoRotate(false);
    }
  }, [ threeDTop, threeDTexture, threeDLeg, threeDColor, scaleB, scaleT ]);

  {
    /* USE EFFECT */
  }

  {
    /* START FUNCTION */
  }
  {
    /* ON COMPONENT SELECTED FUNCTION */
  }

  function selectShape(id, type, anything, code) {
    if(!isLoading && !isScreenShoot ) {
      if(code != codeTop){
        if (controls.current) {
          setAzimuthAngle(controls.current.getAzimuthalAngle());
          setPolarAngle(controls.current.getPolarAngle());
          controls.current.maxAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.maxPolarAngle = controls.current.getPolarAngle()
          controls.current.minAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.minPolarAngle = controls.current.getPolarAngle()
        }
        // setShapeId(id)
        // setShapeType(type)
        setCodeTop(code)
        setTimer(500);
        setThreeDTop(0)
        setThreeDLeg(0)
        setThreeDTexture(0)
        setThreeDColor(0)
        
        //tableDefault(id)
      }
    }
  }

  function selectEdge(id, anything, threeD, code) {
    if(!isLoading && !isScreenShoot ) {
      if(code != codeEdge){
        if (controls.current) {
          setAzimuthAngle(controls.current.getAzimuthalAngle());
          setPolarAngle(controls.current.getPolarAngle());
          controls.current.maxAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.maxPolarAngle = controls.current.getPolarAngle()
          controls.current.minAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.minPolarAngle = controls.current.getPolarAngle()
        }
        setTimer(500);
        setThreeDTop(0)
        setThreeDLeg(0)
        setThreeDTexture(0)
        setThreeDColor(0)
        setCodeEdge(code);
      }
    }
  }

  function selectDimension(id, anything, panjang, lebar, show, index, code, harga_kaki) {
    if(!isLoading && !isScreenShoot ) {
      if(code != codeSeaters){
        if (controls.current) {
          setAzimuthAngle(controls.current.getAzimuthalAngle());
          setPolarAngle(controls.current.getPolarAngle());
          controls.current.maxAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.maxPolarAngle = controls.current.getPolarAngle()
          controls.current.minAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.minPolarAngle = controls.current.getPolarAngle()
        }
        if(menu == 'editor'){
          let data = dimensions;
          if (index) {
            dimensions.map((val, i) => {
              if (i == index) data[i].showForm = !data[i].showForm;
              else data[i].showForm = false;
            });
          }
          setDimensions(data);
        }
        setTimer(500);
        setThreeDTop(0)
        setThreeDLeg(0)
        setThreeDTexture(0)
        setThreeDColor(0)
        setCodeSeaters(code);
        setPriceTableLeg(harga_kaki);
      }
    }
  }

  function selectMarblePattern(id, anything, threeD, code, deskripsi) {
    if(!isLoading && !isScreenShoot ) {
      if(code != codeMarblePattern){
        if (controls.current) {
          setAzimuthAngle(controls.current.getAzimuthalAngle());
          setPolarAngle(controls.current.getPolarAngle());
          controls.current.maxAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.maxPolarAngle = controls.current.getPolarAngle()
          controls.current.minAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.minPolarAngle = controls.current.getPolarAngle()
        }
        setTimer(500);
        setThreeDTop(0)
        setThreeDLeg(0)
        setThreeDTexture(0)
        setThreeDColor(0)
        setCodeMarblePattern(code);
        setMarblePatternDesc(deskripsi)
      }
    }
  }

  function selectMaterial(id, anything, code) {
    if(!isLoading && !isScreenShoot ) {
      if(code != codeMaterialBottom){
        if (controls.current) {
          setAzimuthAngle(controls.current.getAzimuthalAngle());
          setPolarAngle(controls.current.getPolarAngle());
          controls.current.maxAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.maxPolarAngle = controls.current.getPolarAngle()
          controls.current.minAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.minPolarAngle = controls.current.getPolarAngle()
        }
        setTimer(500);
        //setPriceTableLeg(0);
        setThreeDTop(0)
        setThreeDLeg(0)
        setThreeDTexture(0)
        setThreeDColor(0)
        setCodeMaterialBottom(code);
      }
    }
  }

  function selectDesign(id, price, anything, threeD, code, deskripsi) {
    if(!isLoading && !isScreenShoot ) {
      if(code != codeDesign){
        if (controls.current) {
          setAzimuthAngle(controls.current.getAzimuthalAngle());
          setPolarAngle(controls.current.getPolarAngle());
          controls.current.maxAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.maxPolarAngle = controls.current.getPolarAngle()
          controls.current.minAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.minPolarAngle = controls.current.getPolarAngle()
        }
        setTimer(500);
        setThreeDTop(0)
        setThreeDLeg(0)
        setThreeDTexture(0)
        setThreeDColor(0)
        setCodeDesign(code);
        setDesignDesc(deskripsi)
      }
    }
  }

  function selectColor(id, anything, threeD, code) {
    if(!isLoading && !isScreenShoot ) {
      if(code != codeColor){
        if (controls.current) {
          setAzimuthAngle(controls.current.getAzimuthalAngle());
          setPolarAngle(controls.current.getPolarAngle());
          controls.current.maxAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.maxPolarAngle = controls.current.getPolarAngle()
          controls.current.minAzimuthAngle = controls.current.getAzimuthalAngle()
          controls.current.minPolarAngle = controls.current.getPolarAngle()
        }
        setTimer(500);
        setThreeDTop(0)
        setThreeDLeg(0)
        setThreeDTexture(0)
        setThreeDColor(0)
        setCodeColor(code);
      }
    }
  }
  {
    /* ON COMPONENT SELECTED FUNCTION */
  }

  {
    /* SHOW DROPDOWN CONTENT */
  }
  function showTopTable() {
    setIsOpenTopTable(!isOpenTopTable);
    setIsOpenEdge(false);
    setIsOpenMarblePattern(false);
    setIsOpenDimension(false);
    setIsOpenLegTable(false);
    setIsOpenDesign(false);
    setIsOpenColor(false);
  }
  function showEdge() {
    setIsOpenEdge(!isOpenEdge);
    setIsOpenMarblePattern(false);
    setIsOpenDimension(false);
    setIsOpenDesign(false);
    setIsOpenColor(false);
  }
  function showDimension() {
    if (selectedEdge == " . . . . . ") {
      setIsOpenDimension(false);
    } else {
      setIsOpenEdge(false);
      setIsOpenMarblePattern(false);
      setIsOpenDimension(!isOpenDimension);
      setIsOpenDesign(false);
      setIsOpenColor(false);
    }
  }
  function showMarblePattern() {
    if (selectedDimension.name == " . . . . . ") {
      setIsOpenMarblePattern(false);
    } else {
      setIsOpenEdge(false);
      setIsOpenMarblePattern(!isOpenMarblePattern);
      setIsOpenDimension(false);
      setIsOpenDesign(false);
      setIsOpenColor(false);
    }
  }
  function showLegTable() {
    setIsOpenTopTable(false);
    setIsOpenEdge(false);
    setIsOpenMarblePattern(false);
    setIsOpenDimension(false);
    setIsOpenLegTable(!isOpenLegTable);
    setIsOpenDesign(false);
    setIsOpenColor(false);
  }
  function showDesign() {
    if (selectedMarblePattern == " . . . . . ") {
      setIsOpenDesign(false);
    } else {
      setIsOpenEdge(false);
      setIsOpenMarblePattern(false);
      setIsOpenDimension(false);
      setIsOpenDesign(!isOpenDesign);
      setIsOpenColor(false);
    }
  }

  function showColor() {
    if (selectedDesign == " . . . . . ") {
      setIsOpenColor(false);
    } else {
      setIsOpenEdge(false);
      setIsOpenMarblePattern(false);
      setIsOpenDimension(false);
      setIsOpenDesign(false);
      setIsOpenColor(!isOpenColor);
    }
  }
  {
    /* SHOW DROPDOWN CONTENT */
  }

  const CameraControl = () => {
    const {
      camera,
      scene,
      gl,
      gl: { domElement },
    } = useThree();
    
    const context = gl.getContext();

    const canvas = document.getElementsByTagName("canvas")[0];
    if(canvas){
        canvas.addEventListener("webglcontextlost", function(event) {
          event.preventDefault();
          // animationID would have been set by your call to requestAnimationFrame
          setTimeout(() => {
              setAutoRotate(true)
          },2500) 
        }, false);
    }

    // if(scene.children[0]){
    //   if (scene.children[0].children[2] ) scene.children[0].children.splice(2, 1);
    //   if (scene.children[0].children[3]) scene.children[0].children.splice(3, 1);
    //   if (scene.children[0].children[4]) scene.children[0].children.splice(4, 1);
    // }
    
    useFrame((state, gl) => {
      if (scene.children[0].children[2] ) scene.children[0].children.splice(2, 1);
      if (scene.children[0].children[3]) scene.children[0].children.splice(3, 1);
      if (scene.children[0].children[4]) scene.children[0].children.splice(4, 1);
      //if(threeDTop != 0 && threeDTexture != 0 && threeDLeg != 0 && threeDColor != 0){
      controls.current.autoRotate = autoRotate;
      controls.current.enablePan = false;
      controls.current.enableDamping = true;
      controls.current.target.set(0, 0.5, 0);
      controls.current.enableRotate = autoRotate;
      controls.current.enabled = autoRotate;
      controls.current.rotateSpeed = rotateSpeed;
      controls.current.enableZoom = false;
      //controls.current.minDistance = controls.current.getDistance();
      if (!autoRotate) {
        controls.current.maxPolarAngle = polarAngle;
        controls.current.maxAzimuthAngle = azimuthAngle;
        controls.current.minPolarAngle = polarAngle;
        controls.current.minAzimuthAngle = azimuthAngle;
      }
      //if(threeDTop != 0 && threeDTexture != 0 && threeDLeg != 0 && threeDColor != 0){ 
        controls.current.update();
      //}
    });

    return (
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
      />
    );
  };
  
  {
    /* END OF FUNCTION */
  }
  const [lightPosition1, setLightPosition1] = useState([1.5, 1, 0]);
  const [lightPosition2, setLightPosition2] = useState([-1.5, 1, 0]);
  const [lightRotation, setLightRotation] = useState([0, 0, 0]);
  const [lightScale, setLightScale] = useState([1, 1, 1]);
  const [intensity, setIntensity] = useState(0.04);

  const handleLightPosition1 = (index, value) => {
    const data = [...lightPosition1];
    data[index] = value;
    setLightPosition1(data);
  };

  const handleLightPosition2 = (index, value) => {
    const data = [...lightPosition2];
    data[index] = value;
    setLightPosition2(data);
  };

  const handleLightRotation = (index, value) => {
    const data = [...lightRotation];
    data[index] = value;
    setLightRotation(data);
  };

  const handleLightScale = (index, value) => {
    const data = [...lightScale];
    data[index] = value;
    setLightScale(data);
  };

  function base64ToBlob(base64, mime) 
  {
      mime = mime || '';
      var sliceSize = 1024;
      var byteChars = window.atob(base64);
      var byteArrays = [];
  
      for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
          var slice = byteChars.slice(offset, offset + sliceSize);
  
          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
  
          var byteArray = new Uint8Array(byteNumbers);
  
          byteArrays.push(byteArray);
      }
  
      return new Blob(byteArrays, {type: mime});
  }

  const refreshToken = async (action) => {
    // Swal.fire({
    //   title: "",
    //   html: "Please Wait . . . ",
    //   timerProgressBar: true,
    //   allowOutsideClick: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    setAzimuthAngle(-0.772398469658455);
    setPolarAngle(1.2);
    setAutoRotate(false)
    setIsScreenShoot(true)
    setIsLoading(true)
    setTokenAccess();
    setExpireAccess();

    await dispatch(refreshTokenCustomer())
    .unwrap()
    .then(res => {
        const decoded = jwt_decode(res.token);
        setTokenAccess(res.token)
        setExpireAccess(decoded.exp)
        if(action) setUserAction(action)
    })
    .catch(err => {
        if (err) {
          if(action != 'cart') {
            navigate(`/login?code=${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}&action=${action}`, { replace: true });
          } else {
            navigate(`/login?code=${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}`, { replace: true });
          }
          
        }
        Swal.close();
    })
  }

  const saveImage = async (code, phone, token) => {
      setIsLoading(true)
      setIsScreenShoot(true)
      const canvas =  document.getElementsByTagName("canvas")[0];
      //const previewSS =  document.getElementById("previewSS");
      const screenshot = canvas.toDataURL("image/png");
      // previewSS.src = screenshot;
      var base64ImageContent = screenshot.replace(/^data:image\/(png|jpg);base64,/, "");
      var blob = base64ToBlob(base64ImageContent, 'image/png');  
      const data = {
        base64 : "",
        file : blob
      }
      return data
  }

  const handleAddWishlist = async (code, token, exp) => {
    let jsonData = await checkExpiredTokenCustomer(exp);
    if (jsonData[0].status_expired) {
      token = jsonData[0].data_token;
    }
    
    const cek = await axios.get(base_url + `/wishlist/get-detail-wishlist/?code=${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}&phone=${getLocalStorageValue("phone")}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if(!cek.data.success){
        jsonData = await checkExpiredTokenCustomer(exp);
        if (jsonData[0].status_expired) {
          token = jsonData[0].data_token;
        }
        const phone = getLocalStorageValue("phone");
        const file = saveImage(code, phone, token)
        file.then( async(file) => {
            const data = {
              phone: getLocalStorageValue("phone"),
              code,
              file : file.file
            };
            
            const response = await axios.post(`${base_url}/wishlist/add-wishlist`, data, {
              headers: {
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            });
            if(response.data.success) {
              setIsScreenShoot(false);
              setUserAction();
              setIsMyWishList(true)
              setSearchParams({ code: `${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}`});
              searchParams.delete("action");
              setIsLoading(false);
            }
            else{
              Swal.close();
              setIsLoading(false);
            }
        })
    }
    else{
        // const data = {
        //   phone: getLocalStorageValue("phone"),
        //   code : code.replace(/[+]/g, "")
        // }
        // const response = await axios.delete(`${base_url}/wishlist/delete-wishlist/?code=${data.code}&phone=${data.phone}`, {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        // });
        // if(response.data.success) {
        //   setIsScreenShoot(false);
        //   setUserAction();
        //   setIsMyWishList(false)
        //   setSearchParams({ code: `${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}`});
        //   searchParams.delete("action");
        //   setIsLoading(false);
        // }
        // else{
        //   Swal.close();
        //   setIsLoading(false);
        // }
        setIsScreenShoot(false);
        setUserAction();
        //setIsMyWishList(false)
        setSearchParams({ code: `${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}`});
        searchParams.delete("action");
        setIsLoading(false);
    }
  };

  const handleAddCart = async (code, token, exp) => {
    let jsonData = await checkExpiredTokenCustomer(exp);
    if (jsonData[0].status_expired) {
      token = jsonData[0].data_token;
    }

    const cek = await axios.get(base_url + `/cart/get-cart/?&option=detail&code=${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}&phone=${getLocalStorageValue("phone")}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if(!cek.data.success){
      jsonData = await checkExpiredTokenCustomer(exp);
      if (jsonData[0].status_expired) {
        token = jsonData[0].data_token;
      }
      const phone = getLocalStorageValue("phone");
      const file = saveImage(code, phone, token)
      file.then( async(file) => {
          const data = {
            phone: getLocalStorageValue("phone"),
            code,
            harga : hargaAsli ,
            harga_original : hargaAsli,
            file : file.file
          };
          
          const response = await axios.post(`${base_url}/cart/add-to-cart`, data, {
            headers: {
              "Content-type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          if(response.data.success) {
            setIsScreenShoot(false);
            setSearchParams({ code: `${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}`});
            searchParams.delete("action");
            setIsLoading(false);
            setUserAction();
            getJumlahKeranjang()

            Swal.fire({
              title: "Success",
              icon:"success",
              text : response.data.message,
              allowOutsideClick: false,
              confirmButtonColor:"#004441"
            });
          }
          else{
            Swal.close();
            setIsLoading(false);
          }
      })
    } else {
      const response = await axios.put(`${base_url}/cart/update-quantity/?code=${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}&phone=${getLocalStorageValue("phone")}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(response.data.success) {
        setIsScreenShoot(false);
        setSearchParams({ code: `${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}`});
        searchParams.delete("action");
        setUserAction();
        setIsLoading(false);

        Swal.fire({
          title: "Success",
          icon:"success",
          text : response.data.message,
          allowOutsideClick: false,
          confirmButtonColor:"#004441"
        });
      }
      else{
        Swal.close();
        setIsLoading(false);
      }

    }
  }

  const pdf = useRef();

  const handleShareToPDF = async (code, phone, token, exp) => {
      let jsonData = await checkExpiredTokenCustomer(exp);
      if (jsonData[0].status_expired) {
        const decoded = jwt_decode(jsonData[0].data_token);
        setTokenAccess(jsonData[0].data_token);
        setExpireAccess(decoded.exp);
      }
      Swal.close();
      window.open(`/convert-pdf?code=${code}&phone=${phone}`, "_BLANK");
  }
  
  const handleLogout = async () => {
      await dispatch(logoutCustomer())
      .unwrap()
      .then(res => {
         localStorage.removeItem("phone");
         window.location.reload();
      })
      .catch(err => {
          if (err) {
            console.log(err)
          }
      })
  }

  const ClearScene = () => {
    const {
      scene
    } = useThree();

    if(scene.children[0]){
      if (scene.children[0].children[2] ) scene.children[0].children.splice(2, 1);
      if (scene.children[0].children[3]) scene.children[0].children.splice(3, 1);
      if (scene.children[0].children[4]) scene.children[0].children.splice(4, 1);
    }

    useFrame((state, gl) => {
      if(scene.children[0]){
        if (scene.children[0].children[2] ) scene.children[0].children.splice(2, 1);
        if (scene.children[0].children[3]) scene.children[0].children.splice(3, 1);
        if (scene.children[0].children[4]) scene.children[0].children.splice(4, 1);
      }
    })

    return (
      <></>
    );
  }

  const BeforeLoad = () => {
    changeAutoRotate(1000);
    return <></>;
  };

  const changeAutoRotate = (timer) => {
    const timeout = setTimeout(() => {
      //&& form != 'setScale'
      if (autoRotate == false && threeDTop != 0 && threeDTexture != 0 && threeDLeg != 0 && threeDColor != 0 && scaleT && scaleB && !isScreenShoot && !isLoading ) {
        setAutoRotate(true);
      }
    }, timer);
  };

  const { active, progress, errors, item, total } = useProgress();
  function Loader() {
    if(progress == 100) setIsLoading(false)
    else setIsLoading(true)
    return (
      <Html center>
        {parseInt(progress / 2) + parseInt((progressGetData / 2).toFixed(0)) }%
      </Html>
    )
  }

  //dw

  const getJumlahKeranjang = async() => {
    const response = await axios.get(base_url + `/cart/get-cart/?phone=${getLocalStorageValue("phone")}`)
    setSumcart(response.data.data.length)
  }

  const openCart = async() => {
    navigate(`cart?code=${searchParams.get("code")}`, {replace:true})
  }

  const actionSetChoice = (param) => {
    if(param == false) {
      setChoicesteptwo('')
    }

    setChoicevariant(param)
  }


  useEffect(() => {
    if(getLocalStorageValue("phone")) {
      getJumlahKeranjang()
    }
  }, [])

  useEffect(() => {
    if(colors.length > 0){
      let data = [...colors];
      const fromIndex = data.findIndex((element) => element.id === colorId );
      const toIndex = Math.floor(colors.length / 2);
      const element = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, element);
      setColors(data);

      document.body.classList.add('overflow-hidden');
      document.body.classList.add('lg:overflow-scroll');
    }
    return
  },[colorId, colors.length])

  const height = window.innerHeight
  const sh = height.toString() + "px";
  return (
    <div className="pt-[45px] lg:max-h-[100vh] overflow-hidden">
      {(menu == "customer" || menu == "customer2") &&  (
        <section className="fixed z-[100] top-0 left-0 w-full flex justify-between items-start py-2 bg-white px-4 border-b-[1px] ">
            <img
              className="h-[30px] cursor-pointer"
              onClick={context.goPage1}
              src="/assets/icons/Logo.svg"
              alt=""
            />
            <div className="flex gap-4 justify-end">
              <div 
                className="relative cursor-pointer" 
                onClick={()=> {
                  navigate('/MyWishlist?code='+searchParams.get("code"), {replace:true})
                }}
              >
                <img
                  className="h-[27px] -mt-[2px]"
                  src="/assets/icons/Icon_heart_abu.svg"
                  alt="My Wishlist"
                  title="My Wishlist"
                  data-bs-toggle="tooltip"
                />
                <span className="absolute bottom-0 -right-[10px] h-5 aspect-square flex justify-center items-center p-1 text-white bg-black text-[10px] rounded-full">{context.sumWishlist}</span>
              </div>
              <div 
                className="relative cursor-pointer"
                onClick={openCart}
              >
                <img
                  src="/assets/icons/IconCartGray.svg"
                  alt="My Cart"
                  title="My Cart"
                  data-bs-toggle="tooltip"
                />
                <span className="absolute bottom-0 -right-[10px] h-5 aspect-square flex justify-center items-center p-1 text-white bg-black text-[10px] rounded-full">{tokenAccess == undefined ? 0 : sumCart}</span>
              </div>
              <div className="relative cursor-pointer">
                <div className="w-[25px] aspect-square rounded-full overflow-hidden border border-slate-100">
                  <img
                    onClick={() => {
                      if(!tokenAccess) navigate(`/login?code=${codeTop}${codeEdge}${codeSeaters}${codeMarblePattern}${codeMaterialBottom}${codeDesign}${codeColor}`, { replace: true });
                      if(tokenAccess) setIsOpenUser(!isOpenUser);
                    }}
                    className="object-cover"
                    src="/assets/images/DummyBlankProfile.jpg"
                    alt=""
                    title="Login User"
                    data-bs-toggle="tooltip"
                  />
                </div> 
                {/* </a> */}

                <ul
                  className={"min-w-full bg-white text-right font-jakarta md:text-sm text-xs rounded-lg shadow-lg absolute top-[27px] right-0 overflow-hidden transition-all duration-500 " + (isOpenUser === true ? "h-auto opacity-100 visible" : "h-0 opacity-0 invisible")}
                >
                  {tokenAccess && (
                    <>
                        <li className="mt-2 py-2 px-4 w-full block whitespace-nowrap text-slate-500">
                            Welcome, {getLocalStorageValue("phone")}
                        </li>
                        <hr/>
                        <li 
                          onClick={()=> {
                            navigate('/MyWishlist?code='+searchParams.get("code"), {replace:true})
                          }}
                          className="py-2 px-4 w-full block whitespace-nowrap text-black hover:bg-primary hover:text-white"
                        >
                          My Wishlist
                        </li>
                        <li 
                          onClick={()=> {
                            navigate('/my-orders?code='+searchParams.get("code"), {replace:true})
                          }}
                          className="py-2 px-4 w-full block whitespace-nowrap text-black hover:bg-primary hover:text-white"
                        >
                          My Orders
                        </li>

                        <li 
                          onClick={() => handleLogout() }
                          className="mb-2 py-2 px-4 w-full block whitespace-nowrap text-black hover:bg-primary hover:text-white"
                        >
                          Log Out
                        </li>
                    </>
                  )}
                  
                </ul>
              </div>
            </div>
        </section>
      )}

      {/* <div
        className={
          ((menu == "customer" || menu == "customer2") &&
            "md:h-[calc(100vh-45px)] sm:h-auto lg:h-[calc(100vh-45px)] overflow-hidden ") +
          "md:py-4 py-2 px-6 lg:flex lg:justify-between lg:gap-4 " +
          (menu == "editor" && "min-h-screen")
        }
      > */}
      <div
        className={
          ((menu == "customer" || menu == "customer2") &&
            "overflow-hidden relative") +
          "  lg:px-6 grid grid-cols-12 mini:grid-cols-1 midget:grid-cols-1 gap-0" +
          (menu == "editor" && "min-h-screen")
        }>
          {/** 3D RENDER */}
          {/* <div className="lg:h-full md:h-[43%] sm:h-[270px] h-[40%] xl:w-[85%] lg:w-[85%] lg:mx-0 mx-auto grid grid-cols-1 justify-center content-center relative rounded-[10px] overflow-hidden"> */}
          <div className="md:h-full sm:h-[200px] xl:col-span-8 lg:col-span-8 md:col-span-12 lg:mx-0  grid grid-cols-1 justify-center content-center relative overflow-hidden ">
            {(menu == "customer" || menu == "customer2") && message && message[0] == ("dimension" || "pattern") && (
              <div className="absolute z-[5] top-0 left-0 w-full h-full text-white lg:text-2xl md:text-xl text-lg flex items-center justify-center text-center p-2">
                {message[1]}
              </div>
            )} 

          {(menu == "customer" || menu == "customer2") && (
              <>
                {/* CART */}
                <div className={"fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[100] transition-all duration-500 " +  (context.isOpenCart === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                  <div className={"fixed h-[80%] xl:w-[75%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom font-jakarta md:text-sm text-xs " + (context.isOpenCart === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                    <CartCustomEnquiry/>
                  </div>
                </div>

                {/* FAQ */}
                <div className={"fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[100] transition-all duration-500 " + (isOpenFAQ === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                  <div className={"fixed h-[80%] xl:w-[55%] md:w-[50%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom font-jakarta md:text-sm text-xs " + (isOpenFAQ === true ? "opacity-100 visible" : "opacity-0 invisible")}>
                    <img
                      className="h-[24px] cursor-pointer mb-1 float-right clear-both"
                      onClick={() => setIsOpenFAQ(!isOpenFAQ)}
                      src="/assets/icons/IconCloseBlack.svg"
                      alt=""
                    />
                    <Faqknwl />
                  </div>
                </div>
                {/* GUIDELINES */}
                <div className="absolute top-2 left-2 right-2 z-20">
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1 flex-col items-star">
                      <img className="cursor-pointer w-[24px] h-[24px]" onClick={()=> {
                        changeToPage3(shapeId, selectedShape)
                      }} src="/assets/icons/IconArrowLeft.svg" alt=""
                      />
                    </div>
                    
                    <div className="flex items-center gap-3 ">
                      <img
                        className="h-[30px] cursor-pointer"
                        onClick={() => setIsOpenFAQ(!isOpenFAQ)}
                        src="/assets/icons/IconIdea.svg"
                        alt="FAQ's"
                        title="FAQ's"
                        data-bs-toggle="tooltip"
                        width={24}
                        height={24}
                      />
                      <img
                        className="h-[30px] cursor-pointer"
                        onClick={() => setIsOpenGuide(!isOpenGuide)}
                        src="/assets/icons/IconQuestion.svg"
                        alt="Guidelines"
                        title="Guidelines"
                        data-bs-toggle="tooltip"
                        width={24}
                        height={24}
                      />
                    </div>
                  </div>

                  <div
                    className={
                      "md:max-w-[calc(30vw+32px)] max-w-[clac(90vw+32px)] block ml-auto font-jakarta text-xs transition duration-500 " +
                      (isOpenGuide === true
                        ? 'max-h-[calc(25vh+32px)] relative p-4 bg-white cart-shadow mb-4 rounded-[10px] after:content-[""] after:absolute after:bottom-[-12px] after:right-0 after:w-[8px] after:h-[8px] after:bg-white after:border after:border-primary after:rounded-full before:content-[""] before:absolute before:bottom-[-20px] before:right-0 before:w-[4px] before:h-[4px] before:bg-white before:border before:border-primary before:rounded-full opacity-100 visible'
                        : "h-0 opacity-0 invisible")
                    }
                  >
                    <div className="md:max-w-[30vw] max-w-[90vw] max-h-[25vh] overflow-y-auto scrollbar-custom">
                        <h4 className="lg:text-base text-sm font-semibold underline text-center mb-2">
                          Guidelines
                        </h4>
                        <span className="font-semibold">Langkah Pertama</span>
                        <p className="mb-2">
                          Klik Table Top lalu muncul sub menu Shape dan anda dapat memilih bentuk meja yang anda inginkan. Kemudian pada sub menu Dimension anda dapat memilih ukuran meja yang anda inginkan. Terakhir, pada sub menu Marble Pattern, anda dapat memilih pattern yang anda inginkan.
                        </p>
                        <span className="font-semibold">Langkah Kedua</span>
                        <p className="mb-2">
                          Lalu lanjutkan pada menu Table Leg, anda akan melihat 2 sub menu. Pada sub menu Design anda dapat memilih bentuk kaki meja dan juga material dasarnya. Kemudian pada sub menu Color, anda dapat memilih warna dari kaki meja yang anda inginkan.
                        </p>
                        <span className="font-semibold">Langkah Ketiga</span>
                        <p className="mb-2">
                          Setelah memilih desain meja dengan dua menu sebelumnya, anda memiliki pilihan untuk menginput produk custom ini ke wishlist atau cart. Untuk menu Add to Wishlist ada pada tombol di pojok bawah kanan tombol sebelah kiri, Menu Add to Cart ada dipojok kanan bawah tombol sebelah kanan.  Sebelumnya, anda diminta untuk mengisi nomor Whatsapp aktif anda, lalu kami akan mengirimkan OTP ke Whatsapp yang anda daftarkan.
                        </p>
                        <span className="font-semibold">Langkah Keempat</span>
                        <p className="mb-2">
                          Jika anda memasukkan produk custom ke wishlist, anda dapat membagikan link yang berisi produk custom anda ke teman-teman anda. Anda juga dapat mendownload PDF yang berisi desain meja anda.
                        </p>
                        <span className="font-semibold">Langkah Kelima</span>
                        <p className="mb-2">
                          Jika anda ingin melakukan pembayaran, anda dapat memasukkan produk custom anda ke menu Add to Cart. Kemudian klik icon cart untuk melihat produk yang anda tambahkan ke Cart. Pilih produk yang anda ingin beli kemudian klik tombol “Checkout”. Kemudian anda akan diarahkan untuk mengisi identitas, alamat anda serta metode pembayaran yang akan anda gunakan, selanjutnya pilih “Checkout Process”. Selanjutnya pilih sesuai metode pembayaran yang anda pilih lalu pilih Pay. Maka pesanan anda akan diproses
                        </p>
                    </div>
                  </div>
                </div>
              </>
          )}
          <div className="absolute hidden lg:flex lg:bottom-[10vh] md:bottom-0 flex-row justify-between h-full w-full ">
                <div className="z-10 w-fit h-full  flex flex-col items-center justify-center ">
                  <div className="h-fit border border-solid border-transparent rounded bg-white opacity-75">
                      <ul className="flex flex-col gap-[15px] p-[10px] ">
                        {
                          dimensions.map((element, i) => {
                            return(
                                <li className={`flex flex-col  justify-center items-center font-martel cursor-pointer px-[20px] py-[5px] text-[12px] group
                                ${element.name !== selectedDimension ? "animate-border" : ""}
                                ${element.name !== selectedDimension ? "" : "box-active"}
                                ${element.name !== selectedDimension ? "rounded-[5px]" : "rounded-[5px] "}
                                ${element.name == selectedDimension ? "animate-fadeInBack" : ""}
                                `} key={i} onClick={selectDimension.bind(this, element.id, element.name, element.panjang, element.lebar, null, i, element.code, element.harga_kaki)}  >
                                  <img
                                    src={'../assets/img/2D/seaters/'+element.file} 
                                    title={element.name}
                                    data-bs-toggle="tooltip"
                                    alt={element.name}
                                    className={element.name === selectedDimension ? "icon-active " : "group-hover:opacity-[1] group-hover:animate-wiggle icon-inactive opacity-[0.3]"}
                                  />
                                 <span className={` ${element.name === selectedDimension ? "group-hover:text-white" : "group-hover:animate-wiggle"} `} >{element.name}</span>
                                </li>
                            )
                          })
                        }
                      </ul>
                  </div>
                </div>
                
                <div className="z-10 max-w-[100px] h-full ml-1 flex flex-col items-center justify-center lg:mt-[100px] md:mt-[30px] pr-3">
                  <div className="h-fit border border-solid border-transparent rounded bg-white opacity-75">
                      <ul className="flex flex-col gap-[15px] p-[5px] ">
                        {
                          shapes.map((element, i) => {
                            return(
                                <div className="relative flex flex-col items-center group">
                                  <li className={`flex flex-col justify-start items-center font-martel min-h-[100px] max-h-[100px] px-[20px] text-[12px] 
                                  ${element.name !== selectedShape && element.type === shapeType ? "animate-border" : ""}
                                  ${element.name !== selectedShape  ? "" : "box-active"}
                                  ${element.type === shapeType ? "cursor-pointer" : ""}
                                  ${
                                    element.type == shapeType ? element.name !== selectedShape ? "rounded-[5px] " 
                                    : "rounded-[5px] "
                                    : ""
                                  }
                                  ${element.name == selectedShape ? "animate-fadeInBack" : ""} text-center
                                  `} key={i} onClick={()=>{ if(element.type === shapeType) selectShape(element.id, element.type, element.name, element.code) }} >
                                    <img
                                      src={'../assets/img/2D/shape/'+element.file}
                                      title={element.name}
                                      data-bs-toggle="tooltip"
                                      alt={element.name}
                                      className={element.name === selectedShape ? "icon-active" : element.type === shapeType ? "icon-inactive group-hover:animate-wiggle opacity-[0.3] " : "icon-inactive opacity-[0.3]" }
                                    />
                                    <div className="">
                                      
                                    </div>
                                    <span className={` ${element.name === selectedShape ? "group-hover:text-white" : "group-hover:animate-wiggle"} `} >{element.name}</span>
                                  </li>
                                  {
                                    element.type !== shapeType && (
                                      <div className="absolute bottom-10 left-[-130px] z-[100] flex-col items-end justify-end hidden group-hover:flex h-full max-w-[150px]">
                                        <span className="relative p-2 text-[11px] leading-none text-white whitespace-no-wrap bg-primary shadow-lg rounded-md font-martel text-start">Variant Not Available</span>
                                      </div>
                                    )
                                  }
                                </div>
                            )
                          })
                        }
                      </ul>
                  </div>
                </div>

                <div className="z-[9] lg:fixed lg:left-1/4 lg:bottom-4 md:absolute md:w-full lg:w-fit md:bottom-0 flex flex-col justify-center items-center gap-2 overflow-hidden ">
                      <div className="flex justify-center items-center gap-5 bg-white opacity-75">
                        {
                          colors.map((element, i)=>{
                            return(
                              <div className="flex flex-col gap-2 justify-center items-center" >
                                <span className="font-martel text-[14px]">{element.name === selectedColor ? selectedColor : "" }</span>
                                <div className={`rounded-full w-[53px] h-[53px] cursor-pointer
                                ${element.name !== selectedColor ? "rounded-[5px]" : "rounded-[5px] "}
                                `} style={{backgroundImage: `url("${constants.protocol+constants.hostname}/assets/img/2D/color/${element.file}")` }} onClick={selectColor.bind(this, element.id, element.name, element.file, element.code)} ></div>
                              </div>
                            )
                          })
                        }
                      </div>
              </div>
            </div>
            
            <div className="lg:h-[calc(100vh)] md:h-[50vh] mini:h-[35vh] midget:h-[35vh] realtive w-full mini:px-6 mini:bg-[#7FFFD4] midget:px-6 midget:bg-[#7FFFD4] md:px-6 md:bg-[#7FFFD4] lg:bg-[#fff]">
              <Canvas className="h-full" camera={{ fov: (menu == "customer" || menu == "customer2") ? 60 : 50 }} ref={canvas} gl={{preserveDrawingBuffer: true}} >
                  <Suspense fallback={<Loader />}>
                      <Stage environment={null} lightMap={null} >
                          <Top
                          file={threeDTop}
                          texturefile={threeDTexture}
                          scale={1}
                          brightness={0}
                          position={[
                            positionT.position_x,
                            positionT.position_y,
                            positionT.position_z,
                          ]}
                          tx={scaleT.scale_x}
                          ty={scaleT.scale_y}
                          tz={scaleT.scale_z}
                          lightPosition1={lightPosition1}
                          lightPosition2={lightPosition2}
                          lightRotation={lightRotation}
                          lightScale={lightScale}
                          intensity={intensity}
                          shapeType={shapeType}
                          setIsLoading={setIsLoading}
                          
                          //BOTTOM
                          fileB={threeDLeg}
                          colorfile={threeDColor}
                          positionB={[
                            positionB.position_x,
                            positionB.position_y,
                            positionB.position_z,
                          ]}
                          bx={scaleB.scale_x}
                          by={scaleB.scale_y}
                          bz={scaleB.scale_z}
                          rectLightHeight={rectLightHeight}

                        />
                        <Bottom
                          file={threeDLeg}
                          colorfile={threeDColor}
                          // scale={1}
                          position={[
                            positionB.position_x,
                            positionB.position_y,
                            positionB.position_z,
                          ]}
                          bx={scaleB.scale_x}
                          by={scaleB.scale_y}
                          bz={scaleB.scale_z}
                          setIsLoading={setIsLoading}
                          fileT={threeDTop}
                          texturefile={threeDTexture}
                        />
                        <BeforeLoad />
                      </Stage>
                  </Suspense> 
                  <OrbitControls ref={controls} autoRotate={autoRotate} target={[0, 0.5, 0]} maxPolarAngle={!autoRotate ? polarAngle : 1.5} maxAzimuthAngle={!autoRotate ? azimuthAngle : Infinity}  minAzimuthAngle={!autoRotate ? azimuthAngle : Infinity} minPolarAngle={!autoRotate ? polarAngle : ""} enableZoom={true} rotateSpeed={0.5} enablePan={false} />
                  <ClearScene />
              </Canvas>

              <div className="hidden mini:flex midget:flex md:flex lg:hidden flex-col gap-[10px] items-end absolute bottom-[8%] right-0 padding-r-inherit padding-l-inherit">
                <div className={`choice-variant ${choiceVariant ? 'block' : 'hidden'}`}>
                  <ul className="flex flex-col items-end gap-[5px]">
                    <li onClick={() => setChoicesteptwo('color')}>
                      <div className="flex flex-row-reverse items-center">
                        <div className="flex flex-col gap-[5px] items-center justify-center">
                          <img src="./assets/color-icon.png" className="w-[24px] h-[24px]" />
                          <label className="font-martel text-[8px] tracking-[.4px]">Color</label>
                        </div>
                        
                        <div className={`gap-2 mr-2 ${choiceSteptwo == 'color' ? 'flex fadeku' : 'hidden'}`}>
                          {
                            colors.map((element, i)=>{
                              return(
                                <div className={`bg-white px-[5px] py-[5px] flex items-center gap-2 ${element.name == selectedColor ? 'border-solid border-[1px] border-black' : ''}`}>
                                  <div className={`rounded-full w-[25px] h-[25px] cursor-pointer
                                  `} style={{backgroundImage: `url("${constants.protocol+constants.hostname}/assets/img/2D/color/${element.file}")` }} onClick={selectColor.bind(this, element.id, element.name, element.file, element.code)} ></div>
                                  <label className="font-martel text-[8px]">{element.name}</label>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </li>
                    <li onClick={() => setChoicesteptwo('seaters')}>
                      <div className="flex flex-row-reverse">
                        <div className="flex flex-col gap-[5px] items-center justify-center">
                          <img src="./assets/seater-icon.png" className="w-[24px] h-[24px]" />
                          <label className="font-martel text-[8px] tracking-[.4px]">Seaters</label>
                        </div>

                        <div className={`gap-2 mr-2 ${choiceSteptwo == 'seaters' ? 'flex fadeku' : 'hidden'}`}>
                          {
                            dimensions.map((element, i) => {
                              return(
                                <div className={`bg-white px-[5px] py-[5px] flex flex-col items-center`} onClick={selectDimension.bind(this, element.id, element.name, element.panjang, element.lebar, null, i, element.code, element.harga_kaki)}>
                                  <img
                                    src={'../assets/img/2D/seaters/'+element.file} 
                                    title={element.name}
                                    data-bs-toggle="tooltip"
                                    alt={element.name}
                                    className={element.name === selectedDimension ? "icon-active w-[25px] h-[25px]" : "group-hover:opacity-[1] group-hover:animate-wiggle icon-inactive opacity-[0.3] w-[25px] h-[25px]"} 
                                  />
                                  <span className={`font-martel text-[8px] ${element.name === selectedDimension ? "group-hover:text-white" : "group-hover:animate-wiggle"} `} >{element.name}</span>
                                </div>
                              )
                            })
                          }
                        </div>

                      </div>
                    </li>
                    <li onClick={() => setChoicesteptwo('shape')}>
                      <div className="flex flex-row-reverse">
                        <div className="flex flex-col gap-[5px] items-center justify-center">
                          <img src="./assets/shape-icon.png" className="h-[15px]" />
                          <label className="font-martel text-[8px] tracking-[.4px]">Shape</label>
                        </div>

                        <div className={`gap-2 mr-2 ${choiceSteptwo == 'shape' ? 'flex fadeku' : 'hidden'}`}>

                          {
                            shapes.map((element, i) => {
                              return(
                                element.type !== shapeType
                                ? <Tooltip
                                    title="Variant not available"
                                    position="bottom"
                                    trigger="click"
                                    className="bg-white px-[5px] py-[5px] !flex flex-col items-center opacity-[50%]"
                                  >
                                      <img
                                        src={'../assets/img/2D/shape/'+element.file}
                                        title={element.name}
                                        data-bs-toggle="tooltip"
                                        alt={element.name}
                                        className={`${element.name === selectedShape ? "icon-active" : element.type === shapeType ? "icon-inactive group-hover:animate-wiggle opacity-[0.3] " : "icon-inactive opacity-[0.3]"} w-[25px] h-[25px]`}
                                      />

                                      <span className={`font-martel text-[8px] ${element.name === selectedShape ? "group-hover:text-white" : "group-hover:animate-wiggle"} `} >{element.name}</span>
                                  </Tooltip>
                                : <div className={`bg-white px-[5px] py-[5px] flex flex-col items-center`} onClick={()=>{ if(element.type === shapeType) selectShape(element.id, element.type, element.name, element.code)}}>
                                    <img
                                      src={'../assets/img/2D/shape/'+element.file}
                                      title={element.name}
                                      data-bs-toggle="tooltip"
                                      alt={element.name}
                                      className={`${element.name === selectedShape ? "icon-active" : element.type === shapeType ? "icon-inactive group-hover:animate-wiggle opacity-[0.3] " : "icon-inactive opacity-[0.3]"} w-[25px] h-[25px]`}
                                    />

                                    <span className={`font-martel text-[8px] ${element.name === selectedShape ? "group-hover:text-white" : "group-hover:animate-wiggle"} `} >{element.name}</span>
                                  </div>
                              )
                            })
                          }
                        </div>

                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col items-center gap-[5px]" onClick={() => actionSetChoice(!choiceVariant)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-category-2" width={24} height={24} viewBox="0 0 24 24" stroke-width={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14 4h6v6h-6z"></path>
                    <path d="M4 14h6v6h-6z"></path>
                    <circle cx={17} cy={17} r={3}></circle>
                    <circle cx={7} cy={7} r={3}></circle>
                  </svg>
                  <label className="font-martel text-[8px] tracking-[.4px]">Varian</label>
                </div>
              </div>

            </div>  
              {
                isLoading | isScreenShoot ? 
                  <div className="grid absolute bottom-0 left-0 w-full h-full content-center items-center bg-white opacity-40 z-40">
                    <LoadingSpinner  />
                  </div>
                : 
                <></>
              } 

            
          </div>
          {/* 3D RENDER */}
          
          {/* MENU */}
          {menu == "editor" && (
            <CustomEnquiryEditor
              form={form}
              showTopSegment={showTopSegment}
              setShowTopSegment={setShowTopSegment}
              setShowBottomSegment={setShowBottomSegment}
              showBottomSegment={showBottomSegment}
              showTopShape={showTopShape}
              setShowTopShape={setShowTopShape}
              showTopEdge={showTopEdge}
              setShowTopEdge={setShowTopEdge}
              showTopSeaters={showTopSeaters}
              setShowTopSeaters={setShowTopSeaters}
              showTopMarblePattern={showTopMarblePattern}
              setShowTopMarblePattern={setShowTopMarblePattern}
              showTopScale={showTopScale}
              setShowTopScale={setShowTopScale}
              showBottomScale={showBottomScale}
              setShowBottomScale={setShowBottomScale}
              showTopPosition={showTopPosition}
              setShowTopPosition={setShowTopPosition}
              showBottomPosition={showBottomPosition}
              setShowBottomPosition={setShowBottomPosition}
              showBottomMaterial={showBottomMaterial}
              setShowBottomMaterial={setShowBottomMaterial}
              showBottomSeaters={showBottomSeaters}
              setShowBottomSeaters={setShowBottomSeaters}
              showBottomColor={showBottomColor}
              setShowBottomColor={setShowBottomColor}
              shapes={shapes}
              edges={edges}
              dimensions={dimensions}
              materials={materials}
              designs={designs}
              colors={colors}
              setDimensions={setDimensions}
              marblePatterns={marblePatterns}
              setMarblePatterns={setMarblePatterns}
              selectedShape={selectedShape}
              setSelectedShape={setSelectedShape}
              selectedEdge={selectedEdge}
              setSelectedEdge={setSelectedEdge}
              selectedDimension={selectedDimension}
              setSelectedDimension={setSelectedDimension}
              selectedMarblePattern={selectedMarblePattern}
              setSelectedMarblePattern={setSelectedMarblePattern}
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              selectedDesign={selectedDesign}
              setSelectedDesign={setSelectedDesign}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectShape={selectShape}
              selectEdge={selectEdge}
              selectDimension={selectDimension}
              selectMarblePattern={selectMarblePattern}
              selectMaterial={selectMaterial}
              selectDesign={selectDesign}
              selectColor={selectColor}
              shapeType={shapeType}
              setShapeType={setShapeType}
              scaleT={scaleT}
              setScaleT={setScaleT}
              scaleB={scaleB}
              setScaleB={setScaleB}
              positionT={positionT}
              setPositionT={setPositionT}
              positionB={positionB}
              setPositionB={setPositionB}
              shapeId={shapeId}
              edgeId={edgeId}
              dimensionId={dimensionId}
              marblePatternId={marblePatternId}
              materialId={materialId}
              designId={designId}
              colorId={colorId}
              autoRotate={autoRotate}
              setAutoRotate={setAutoRotate}
              sizeEdited={sizeEdited}
              setSizeEdited={setSizeEdited}
            />
          )}

          {menu == "customer" && (
            <CustomEnquiryCustomer
              message = {message}
              hargaAsli = {hargaAsli}
              hargaDiskon = {hargaDiskon}
              clickable = {clickable}
              isLoading = {isLoading}
              setMessage={setMessage}
              isOpenTopTable={isOpenTopTable}
              setIsOpenTopTable={setIsOpenTopTable}
              isOpenEdge={isOpenEdge}
              setIsOpenEdge={setIsOpenEdge}
              isOpenDimension={isOpenDimension}
              setIsOpenDimension={setIsOpenDimension}
              bgDimension={bgDimension}
              setBgDimension={setBgDimension}
              isOpenMarblePattern={isOpenMarblePattern}
              setIsOpenMarblePattern={setIsOpenMarblePattern}
              bgMarblePattern={bgMarblePattern}
              setBgMarblePattern={setBgMarblePattern}
              isOpenLegTable={isOpenLegTable}
              setIsOpenLegTable={setIsOpenLegTable}
              isOpenDesign={isOpenDesign}
              setIsOpenDesign={setIsOpenDesign}
              bgDesign={bgDesign}
              setBgDesign={setBgDesign}
              isHideAccordionColor={isHideAccordionColor}
              setIsHideAccordionColor={setIsHideAccordionColor}
              isOpenColor={isOpenColor}
              setIsOpenColor={setIsOpenColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              showTopTable={showTopTable}
              showEdge={showEdge}
              showDimension={showDimension}
              showMarblePattern={showMarblePattern}
              showLegTable={showLegTable}
              showDesign={showDesign}
              showColor={showColor}
              shapes={shapes}
              edges={edges}
              dimensions={dimensions}
              marblePatterns={marblePatterns}
              materials={materials}
              designs={designs}
              colors={colors}
              setDimensions={setDimensions}
              setMarblePatterns={setMarblePatterns}
              selectedShape={selectedShape}
              setSelectedShape={setSelectedShape}
              selectedEdge={selectedEdge}
              setSelectedEdge={setSelectedEdge}
              selectedDimension={selectedDimension}
              setSelectedDimension={setSelectedDimension}
              selectedMarblePattern={selectedMarblePattern}
              setSelectedMarblePattern={setSelectedMarblePattern}
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              selectedDesign={selectedDesign}
              setSelectedDesign={setSelectedDesign}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectShape={selectShape}
              selectEdge={selectEdge}
              selectDimension={selectDimension}
              selectMarblePattern={selectMarblePattern}
              selectMaterial={selectMaterial}
              selectDesign={selectDesign}
              selectColor={selectColor}
              shapeType={shapeType}
              setShapeType={setShapeType}
              scaleT={scaleT}
              setScaleT={setScaleT}
              caleB={scaleB}
              setScaleB={setScaleB}
              positionT={positionT}
              setPositionT={setPositionT}
              positionB={positionB}
              setPositionB={setPositionB}
              shapeId={shapeId}
              edgeId={edgeId}
              dimensionId={dimensionId}
              marblePatternId={marblePatternId}
              materialId={materialId}
              designId={designId}
              colorId={colorId}
              autoRotate={autoRotate}
              setAutoRotate={setAutoRotate}
              priceTableTop={priceTableTop}
              priceTableLeg={priceTableLeg}
              refreshToken={refreshToken}
              setIsScreenShoot={setIsScreenShoot}
              isMyWishList={isMyWishList}
            />
          )}
          
          {menu == "customer2" && (
            <CustomEnquiryCustomer2
              showPattern={showPattern}
              setShowPattern={setShowPattern}
              threeDTexture = {threeDTexture}
              marblePatternDesc = {marblePatternDesc}
              designDesc = {designDesc}
              message = {message}
              hargaAsli = {hargaAsli}
              hargaDiskon = {hargaDiskon}
              clickable = {clickable}
              isLoading = {isLoading}
              setMessage={setMessage}
              isOpenTopTable={isOpenTopTable}
              setIsOpenTopTable={setIsOpenTopTable}
              isOpenEdge={isOpenEdge}
              setIsOpenEdge={setIsOpenEdge}
              isOpenDimension={isOpenDimension}
              setIsOpenDimension={setIsOpenDimension}
              bgDimension={bgDimension}
              setBgDimension={setBgDimension}
              isOpenMarblePattern={isOpenMarblePattern}
              setIsOpenMarblePattern={setIsOpenMarblePattern}
              bgMarblePattern={bgMarblePattern}
              setBgMarblePattern={setBgMarblePattern}
              isOpenLegTable={isOpenLegTable}
              setIsOpenLegTable={setIsOpenLegTable}
              isOpenDesign={isOpenDesign}
              setIsOpenDesign={setIsOpenDesign}
              bgDesign={bgDesign}
              setBgDesign={setBgDesign}
              isHideAccordionColor={isHideAccordionColor}
              setIsHideAccordionColor={setIsHideAccordionColor}
              isOpenColor={isOpenColor}
              setIsOpenColor={setIsOpenColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              showTopTable={showTopTable}
              showEdge={showEdge}
              showDimension={showDimension}
              showMarblePattern={showMarblePattern}
              showLegTable={showLegTable}
              showDesign={showDesign}
              showColor={showColor}
              shapes={shapes}
              edges={edges}
              dimensions={dimensions}
              marblePatterns={marblePatterns}
              materials={materials}
              designs={designs}
              colors={colors}
              setDimensions={setDimensions}
              setMarblePatterns={setMarblePatterns}
              selectedShape={selectedShape}
              setSelectedShape={setSelectedShape}
              selectedEdge={selectedEdge}
              setSelectedEdge={setSelectedEdge}
              selectedDimension={selectedDimension}
              setSelectedDimension={setSelectedDimension}
              selectedMarblePattern={selectedMarblePattern}
              setSelectedMarblePattern={setSelectedMarblePattern}
              selectedMaterial={selectedMaterial}
              setSelectedMaterial={setSelectedMaterial}
              selectedDesign={selectedDesign}
              setSelectedDesign={setSelectedDesign}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectShape={selectShape}
              selectEdge={selectEdge}
              selectDimension={selectDimension}
              selectMarblePattern={selectMarblePattern}
              selectMaterial={selectMaterial}
              selectDesign={selectDesign}
              selectColor={selectColor}
              shapeType={shapeType}
              setShapeType={setShapeType}
              scaleT={scaleT}
              setScaleT={setScaleT}
              caleB={scaleB}
              setScaleB={setScaleB}
              positionT={positionT}
              setPositionT={setPositionT}
              positionB={positionB}
              setPositionB={setPositionB}
              shapeId={shapeId}
              edgeId={edgeId}
              dimensionId={dimensionId}
              marblePatternId={marblePatternId}
              materialId={materialId}
              designId={designId}
              colorId={colorId}
              autoRotate={autoRotate}
              setAutoRotate={setAutoRotate}
              priceTableTop={priceTableTop}
              priceTableLeg={priceTableLeg}
              refreshToken={refreshToken}
              setIsScreenShoot={setIsScreenShoot}
              isMyWishList={isMyWishList}
            />
          )}

          {/* MENU */}
      </div>
    </div>
  );
};

export default ThreeDRender;

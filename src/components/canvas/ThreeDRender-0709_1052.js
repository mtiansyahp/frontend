import { useLayoutEffect, useEffect, useState, useRef, createRef, Suspense, useContext } from "react";
import axios from "axios";
import * as constants from "../../constants";
import { Canvas, useThree, useFrame, extend } from "@react-three/fiber";
import { Top, Bottom, CustomEnquiryEditor, CustomEnquiryCustomer } from "../../components";
import { BakeShadows, Stage, Html, useProgress, useTexture } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { createPopper, detectOverflow } from "@popperjs/core";
import "tw-elements";
import * as THREE from "three";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
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
import Faqknwl from "../faqknwl";

const base_url = constants.base_url;
// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const popcorn = document.querySelector("#popcorn");
const tooltip = document.querySelector("#tooltip");
createPopper(popcorn, tooltip);

const ThreeDRender = ({ menu, form }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  const [codeTop, setCodeTop] = useState();
  const [codeEdge, setCodeEdge] = useState();
  const [codeMarblePattern, setCodeMarblePattern] = useState();
  const [codeSeaters, setCodeSeaters] = useState();
  const [codeMaterialBottom, setCodeMaterialBottom] = useState();
  const [codeDesign, setCodeDesign] = useState();
  const [codeColor, setCodeColor] = useState();

  const [shapes, setShapes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [marblePatterns, setMarblePatterns] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [colors, setColors] = useState([]);
  const [shapeId, setShapeId] = useState(0);
  const [edgeId, setEdgeId] = useState(0);
  const [shapeType, setShapeType] = useState(0);
  const [dimensionId, setDimensionId] = useState(0);
  const [marblePatternId, setMarblePatternId] = useState(0);
  const [materialId, setMaterialId] = useState(0);
  const [designId, setDesignId] = useState(0);
  const [colorId, setColorId] = useState(0);
  const [priceTableTop, setPriceTableTop] = useState([]);
  const [priceTableLeg, setPriceTableLeg] = useState(0);
  const [selectedShape, setSelectedShape] = useState(0);
  const [selectedEdge, setSelectedEdge] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState(0);
  const [selectedMarblePattern, setSelectedMarblePattern] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [azimuthAngle, setAzimuthAngle] = useState(-0.772398469658455);
  const [polarAngle, setPolarAngle] = useState(1.2);
  const [distance, setDistance] = useState(10);
  const [autoRotate, setAutoRotate] = useState(false);
  const [timer, setTimer] = useState(1200);
  const controls = createRef();
  const canvas = useRef();

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
  const [isOpenFAQ1, setIsOpenFAQ1] = useState("");
  const [isOpenFAQ2, setIsOpenFAQ2] = useState("");
  const [isOpenFAQ3, setIsOpenFAQ3] = useState("");
  const [isOpenFAQ4, setIsOpenFAQ4] = useState("");

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
  
  {
    /* USE EFFECT */
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  },[])
  
  useEffect(() => {
    if (codeTop && codeEdge  && codeSeaters  && codeMarblePattern  && codeMaterialBottom  && codeDesign  && codeColor) {
        setSearchParams({ code: `${codeTop}+${codeEdge}+${codeSeaters}+${codeMarblePattern}+${codeMaterialBottom}+${codeDesign}+${codeColor}` });
    }
    if(searchParams.get("action")) setSearchParams({ code: `${codeTop}+${codeEdge}+${codeSeaters}+${codeMarblePattern}+${codeMaterialBottom}+${codeDesign}+${codeColor}`, action : searchParams.get("action") });
  }, [codeTop, codeEdge, codeSeaters, codeMarblePattern, codeMaterialBottom, codeDesign, codeColor]);

  useEffect(()=>{
    const cekWishList = async () => {
      if (codeTop && codeEdge  && codeSeaters  && codeMarblePattern  && codeMaterialBottom  && codeDesign  && codeColor) {
          const response = await axios.get(base_url + `/wishlist/get-detail-wishlist/?code=${codeTop}%2B${codeEdge}%2B${codeSeaters}%2B${codeMarblePattern}%2B${codeMaterialBottom}%2B${codeDesign}%2B${codeColor}&phone=${getLocalStorageValue("phone")}`);
          if(response.data.success) setIsMyWishList(true);
          else setIsMyWishList(false);
      }
    }
    cekWishList();
  },[searchParams, codeTop, codeEdge, codeSeaters, codeMarblePattern, codeMaterialBottom, codeDesign, codeColor])

  useEffect(() => {
    if(searchParams.get("action") && !userAction ){
        refreshToken(searchParams.get("action"))
        console.log("IM RUNNING", searchParams.get("action"))
    }
    else{
      setTimeout(()=>{
        if(userAction == "save" && azimuthAngle == -0.772398469658455 && polarAngle == 1.2 && tokenAccess && expireAccess && threeDTop != 0  && threeDLeg != 0 && threeDTexture != 0 && threeDColor != 0 ) {
          //setAutoRotate(false)
          handleAddWishlist(searchParams.get("code"), tokenAccess, expireAccess );
        }
        if(userAction == "share" && azimuthAngle == -0.772398469658455 && polarAngle == 1.2 && tokenAccess && expireAccess && threeDTop != 0  && threeDLeg != 0 && threeDTexture != 0 && threeDColor != 0) {
          //setAutoRotate(false)
          handleShareToPDF(searchParams.get("code"), getLocalStorageValue("phone"), tokenAccess, expireAccess );
        }
      }, parseInt(timer + 1000 ) )
      
    }
  },[userAction, azimuthAngle, polarAngle, tokenAccess, expireAccess, searchParams, threeDTop, threeDLeg, threeDTexture, threeDColor])

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
        tableDefault();
      }
      else{
        const code = searchParams.get("code");
        if (code) {
          let pecahCode = code.split("+");
          let topId;
          pecahCode.forEach(async (value, index) => {
            const response = await axios.get(base_url + "/item-code/get-item-code/?code=" + value);
            if (response.data.success) {
              const data = response.data.data;
              if (index == 0) {
                setCodeTop(value);
              } else if (index == 1) {
                setCodeEdge(value);
              } else if (index == 2) {
                setCodeSeaters(value)
              }
              else if (index == 3) {
                setCodeMarblePattern(value)
              }
              else if (index == 4) {
                setCodeMaterialBottom(value)
              }
              else if (index == 5) {
                setCodeDesign(value)
              }
              else if (index == 6) {
                setCodeColor(value)
              }
            }
          });
        }
      }
      //else doSearchParams();
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
    return response.data.data;
  }

  useEffect(
    function () {
      let get;
      let topId;
      setRectLightHeight(6);
      if (selectedShape == " . . . . . " || selectedShape == 0) {
        if (codeTop && shapes.length > 0) {
          get = getDataByCode(codeTop);
          get.then((data) => {
            setShapeId(data.id);
            setShapeType(data.type);
            setSelectedShape(data.name);
          });
        }
      } else if (selectedEdge == " . . . . . " || selectedEdge == 0) {
        if (codeEdge && edges.length > 0) {
          get = getDataByCode(codeEdge);
          get.then(async(data) => {
            const pecahCode = codeTop.split("T");
            const response = await axios.get(base_url + "/topthreed/get-by-top-edges/" + pecahCode[1] + "/" + data.id);
            const threeD = response.data.data.three_d_file
            setThreeDTop(threeD)
            setEdgeId(data.id);
            setSelectedEdge(data.name);
          });
        }
      } else if (selectedDimension == " . . . . . " || selectedDimension == 0) {
        if (codeSeaters && dimensions.length > 0) {
          get = getDataByCode(codeSeaters);
          get.then((data) => {
            setDimensionId(data.id);
            setSelectedDimension(data.name);
          });
        }
      } else if (selectedMarblePattern == " . . . . . " || selectedMarblePattern == 0) {
        if (codeMarblePattern && marblePatterns.length > 0) {
          get = getDataByCode(codeMarblePattern);
          get.then((data) => {
            setMarblePatternId(data.id);
            setSelectedMarblePattern(data.name);
            setThreeDTexture(data.texture)
          });
        }
      } else if (selectedMaterial == " . . . . . " || selectedMaterial == 0) {
        if (codeMaterialBottom && materials.length > 0) {
          get = getDataByCode(codeMaterialBottom);
          get.then((data) => {
            setMaterialId(data.id);
            setSelectedMaterial(data.name);
          });
        }
      } else if (selectedDesign == " . . . . . " || selectedDesign == 0) {
        if (codeDesign && designs.length > 0) {
          get = getDataByCode(codeDesign);
          get.then((data) => {
            setDesignId(data.id);
            setSelectedDesign(data.nama);
            setThreeDLeg(data.file_three_d);
            setPriceTableLeg(data.harga);
          });
        }
      } else if (selectedColor == " . . . . . " || selectedColor == 0) {
        if (codeColor && colors.length > 0) {
          get = getDataByCode(codeColor);
          get.then((data) => {
            setColorId(data.id);
            setSelectedColor(data.name);
            setThreeDColor(data.file)
          });
        }
      }
    },
    [
      codeTop,
      codeEdge,
      codeSeaters,
      codeMarblePattern,
      codeMaterialBottom,
      codeDesign,
      codeColor,
      selectedShape,
      selectedEdge,
      selectedDimension,
      selectedMarblePattern,
      selectedMaterial,
      selectedDesign,
      selectedColor,
      shapes,
      edges,
      dimensions,
      marblePatterns,
      materials,
      designs,
      colors,
    ]
  );

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
  useEffect(
    function () {
      if ((selectedMaterial == "Marble") & (selectedDesign !== " . . . . . ")) {
        setSelectedColor(selectedMarblePattern);
      }
    },
    [selectMaterial, selectedDesign]
  );

  useEffect(function () {
    async function tableOfShape() {
      const response = await axios.get(base_url + "/top");
      setShapes(response.data.data);
    }
    tableOfShape();
  }, []);

  useEffect(
    function () {
      async function tableOfEdge() {
        const response = await axios.get(base_url + "/topthreed/get-by-top/" + shapeId);
        setEdges(response.data.data);
      }
      if (shapeId != 0) tableOfEdge();
    },
    [shapeId]
  );

  useEffect(
    function () {
      async function tableOfDimension() {
        let response = await axios.get(base_url + "/seaters/get-by-type/" + shapeId);
        response.data.data.map((val, i) => {
          response.data.data[i].showForm = false;
        });
        setDimensions(response.data.data);
        //setAutoRotate(false);
      }
      if (shapeId != 0) tableOfDimension();
    },
    [selectedEdge]
  );

  useEffect(
    function () {
      async function tableOfMarblePattern() {
        const response = await axios.get(base_url + "/texture/get-texture-by-seaters/" + dimensionId);
        setMarblePatterns(response.data.data);
        const cookieMarblePatternId = cookies.get("marblePatternId");
        const marbles = response.data.data;
        let setFirstMarble = true;
        marbles.forEach((value)=>{
          const pecahCode = codeMarblePattern.split("P")
          if( value.id == pecahCode[1] ) setFirstMarble = false; 
        })
        // console.log(setFirstMarble)
        if(setFirstMarble){
          // setMarblePatternId(response.data.data[0].id);
          // setSelectedMarblePattern(response.data.data[0].name);
          // setThreeDTexture(response.data.data[0].texture);
          setCodeMarblePattern(response.data.data[0].code);
          // console.log(response.data.data[0].code)
        }
      }
      //if (!searchParams.get("code")) {
      //CEK TABLE DEFAULT
      // const cek = cekTableDefault(dimensionId);
      // cek.then(async (data) => {
      //   if (data.isUseDefault) {
      //     const response = await axios.get(base_url + "/texture/get-texture-by-seaters/" + dimensionId);
      //     setMarblePatterns(response.data.data);
      //     tableDefault();
      //   } else {
      //     if (dimensionId != 0) tableOfMarblePattern();
      //   }
      // });
      //CEK TABLE DEFAULT
      // } else {
      //   if (dimensionId != 0) tableOfMarblePattern();
      // }
      if (dimensionId != 0) tableOfMarblePattern();
    },
    [selectedDimension, dimensionId]
  );

  const idPatternDimension = marblePatternId + "/" + dimensionId;

  useEffect(
    function () {
      async function tableOfMaterial() {
        const response = await axios.get(base_url + "/material-bottom");
        setMaterials(response.data.data);
        //setAutoRotate(false);
      }
      tableOfMaterial();
    },
    [selectedMarblePattern]
  );

  useEffect(
    function () {
      async function tableOfPriceTableTop() {
        const response = await axios.get(base_url + "/texture/get-texture-by-id/" + idPatternDimension);
        setPriceTableTop(response.data.harga_jual_seaters);
        //setAutoRotate(false);
      }
      if (dimensionId != 0 && marblePatternId != 0) tableOfPriceTableTop();
    },
    [selectedDimension, selectedMarblePattern]
  );

  useEffect(
    function () {
      async function tableOfDesign() {
        const response = await axios.get(base_url + "/kaki/get-by-typetop-material/" + shapeType + "/" + materialId);
        setDesigns(response.data.data);
      }
      if (materialId != 0) tableOfDesign();
    },
    [selectedMaterial]
  );

  useEffect(
    function () {
      async function tableOfScaleT() {
        const response = await axios.get(base_url + "/topscale/get-top-scale-by-seaters-top/" + dimensionId + "/" + shapeType);
        if (response.data.success) {
          setScaleT(response.data.data);
        } else
          setScaleT({
            scale_x: 1,
            scale_y: 1,
            scale_z: 1,
          });
      }
      if (dimensionId != 0 && shapeType != 0) tableOfScaleT();

      async function tableOfScaleB() {
        const response = await axios.get(base_url + "/bottomscale/get-bottom-scale-by-seaters-kaki/" + dimensionId + "/" + designId);
        if (response.data.success) {
          setScaleB(response.data.data);
        } else if (menu == "editor") {
          setScaleB({
            scale_x: 1,
            scale_y: 1,
            scale_z: 1,
          });
        }
        //setAutoRotate(false);
      }
      if (dimensionId != 0 && designId != 0) tableOfScaleB();

      async function tableOfPositionT() {
        const response = await axios.get(base_url + "/topposition/get-top-position-by-seaters-top/" + dimensionId + "/" + shapeType);
        if (response.data.success) {
          setPositionT(response.data.data);
        } else
          setPositionT({
            position_x: 0,
            position_y: 0,
            position_z: 0,
          });
      }
      if (dimensionId != 0 && shapeType != 0) tableOfPositionT();

      async function tableOfPositionB() {
        const response = await axios.get(base_url + "/bottomposition/get-bottom-position-by-seaters-kaki/" + dimensionId + "/" + designId);
        if (response.data.success) {
          setPositionB(response.data.data);
        } else
          setPositionB({
            position_x: 0,
            position_y: 0,
            position_z: 0,
          });
        //setAutoRotate(false);
      }
      if (dimensionId != 0 && designId != 0) tableOfPositionB();
    },
    [selectedDimension, selectedDesign, shapeType]
  );

  useEffect(
    function () {
      async function tableOfColor() {
        const response = await axios.get(base_url + "/color/get-by-material/" + materialId);
        setColors(response.data.data);
      }
      if (materialId != 0) tableOfColor();
    },
    [selectedDesign]
  );

  // useEffect(() => {
  //     if(autoRotate) setAutoRotate(false);
  // },[threeDTop, threeDTexture, threeDLeg, threeDColor, scaleT, scaleB])

  async function tableDefault(newId) {
    if (menu == "editor") {
      Swal.fire({
        title: "",
        html: "Please Wait . . .",
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    let response;
    if (shapeId != 0) response = await axios.get(base_url + "/table-default/" + shapeId);
    else if (newId) response = await axios.get(base_url + "/table-default/" + newId);
    else response = await axios.get(base_url + "/table-default");
    //console.log(response.data.data[0]);
    const id_shape = response.data.data[0].top.id;
    const code_top = response.data.data[0].top.code;
    const shape_type = response.data.data[0].top.type;
    const id_edge = response.data.data[0].edge.id;
    const code_edge = response.data.data[0].edge.code;
    const id_dimension = response.data.data[0].seaters.id;
    const code_seaters = response.data.data[0].seaters.code;
    const id_marble_pattern = response.data.data[0].texture.id;
    const code_marble_pattern = response.data.data[0].texture.code;
    const id_material_bottom = response.data.data[0].material_bottom.id;
    const code_material_bottom = response.data.data[0].material_bottom.code;
    const id_design = response.data.data[0].kaki.id;
    const code_design = response.data.data[0].kaki.code;
    const id_color = response.data.data[0].color.id;
    const code_color = response.data.data[0].color.code;
    const three_d_top = response.data.data[0].topthreed.three_d_file;
    const three_d_texture = response.data.data[0].texture.texture;
    const three_d_leg = response.data.data[0].kaki.file_three_d;
    const three_d_color = response.data.data[0].color.file;
    const selected_shape = response.data.data[0].top.name;
    const selected_edge = response.data.data[0].edge.name;
    const selected_dimension = response.data.data[0].seaters.name;
    const selected_marble_pattern = response.data.data[0].texture.name;
    const selected_material = response.data.data[0].material_bottom.name;
    const selected_design = response.data.data[0].kaki.nama;
    const selected_color = response.data.data[0].color.name;
    const price_top = response.data.data[0].pricetop.harga_jual_seaters;
    const price_leg = response.data.data[0].kaki.harga;

    const cookieMarblePatternId = cookies.get("marblePatternId");
    const cookieDesignId = cookies.get("designId");
    const cookieColorId = cookies.get("colorId");

    // if (!searchParams.get("code")) {
    {
      /*setShapeId(id_shape);
    setEdgeId(id_edge);
    setShapeType(shape_type);
    setDimensionId(id_dimension);
    setMaterialId(id_material_bottom);
    setThreeDTop(three_d_top);
    setSelectedMarblePattern(selected_marble_pattern);
    setMarblePatternId(id_marble_pattern);
    setThreeDTexture(three_d_texture);
    if (typeof cookieMarblePatternId === "undefined" || typeof cookieMarblePatternId === "undefined" || !cookieMarblePatternId || cookieMarblePatternId === null) {
      // console.log("COOOKIE PATTERN IS UNDEFINED")
      setPriceTableLeg(price_leg);
    }
    if (typeof cookieDesignId === undefined || typeof cookieDesignId === "undefined" || !cookieDesignId || cookieDesignId === null) {
      // console.log("COOOKIE DESIGN IS UNDEFINED")
      setDesignId(id_design);
      setThreeDLeg(three_d_leg);
      setSelectedDesign(selected_design);
    }
    if (typeof cookieColorId === undefined || typeof cookieColorId === "undefined" || !cookieColorId || cookieColorId === null) {
      // console.log("COOOKIE COLOR IS UNDEFINED")
      setThreeDColor(three_d_color);
      setColorId(id_color);
      setSelectedColor(selected_color);
    }
    setSelectedShape(selected_shape);
    setSelectedEdge(selected_edge);
    setSelectedDimension(selected_dimension);
    setSelectedMaterial(selected_material);
    setPriceTableTop(price_top);
    //}
  */
    }
    //KOMBINASI CODE
    //if (!searchParams.get("code")) {
    setCodeTop(code_top);
    setCodeEdge(code_edge);
    setCodeSeaters(code_edge);
    setCodeSeaters(code_seaters);
    setCodeMaterialBottom(code_material_bottom);
    setCodeDesign(code_design);
    setCodeColor(code_color);
    setCodeMarblePattern(code_marble_pattern);
    //}
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
    setAutoRotate(false);
    setTimer(1500);
  }, [scaleT, scaleB, positionT, positionB]);

  {
    /* USE EFFECT */
  }

  {
    /* START FUNCTION */
  }
  {
    /* ON COMPONENT SELECTED FUNCTION */
  }
  async function selectShape(id, type, anything, code) {
    //const gl = new THREE.WebGLRenderer();
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setShapeId(id);
    setShapeType(type);
    setTimer(2500);
    // cookies.remove("marblePatternId");
    // cookies.remove("selectedMarblePattern");
    // cookies.remove("threeDTexture");
    // cookies.remove("designId");
    // cookies.remove("selectedDesign");
    // cookies.remove("threeDLeg");
    // cookies.remove("colorId");
    // cookies.remove("selectedColor");
    // cookies.remove("threeDColor");
    // cookies.remove("priceLeg");
    //if (!searchParams.get("code"))
    setSelectedShape(0)
    setRectLightHeight(0)
    setSelectedEdge(0)
    setSelectedMarblePattern(0)
    setSelectedMaterial(0)
    setSelectedDesign(0)
    setSelectedColor(0)
    setThreeDTop(0)
    setThreeDLeg(0)
    setThreeDTexture(0)
    setThreeDColor(0)
    setCodeTop(code);
  }

  async function selectEdge(id, anything, threeD, code) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setEdgeId(id);
    setSelectedEdge(anything);
    setDimensionId(0);
    // setMarblePatternId(0)
    setThreeDTop(threeD);
    setTimer(2500);
    setSelectedShape(0)
    setRectLightHeight(0)
    setSelectedEdge(0)
    setSelectedMarblePattern(0)
    setSelectedMaterial(0)
    setSelectedDesign(0)
    setSelectedColor(0)
    setThreeDTop(0)
    setThreeDLeg(0)
    setThreeDTexture(0)
    setThreeDColor(0)
    setCodeEdge(code);

  }

  async function selectDimension(id, anything, panjang, lebar, show, index, code) {
    // console.log(id, anything, panjang, lebar, show, index, code);
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setDimensionId(id);
    setSelectedDimension(anything);
    let data = dimensions;
    if (index) {
      dimensions.map((val, i) => {
        if (i == index) data[i].showForm = !data[i].showForm;
        else data[i].showForm = false;
      });
    }
    setDimensions(data);
    // setMarblePatternId(0)
    setTimer(2500);
    setSelectedShape(0)
    setRectLightHeight(0)
    setSelectedEdge(0)
    setSelectedMarblePattern(0)
    setSelectedMaterial(0)
    setSelectedDesign(0)
    setSelectedColor(0)
    setThreeDTop(0)
    setThreeDLeg(0)
    setThreeDTexture(0)
    setThreeDColor(0)
    setCodeSeaters(code);
  }

  async function selectMarblePattern(id, anything, threeD, code) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setMarblePatternId(id);
    setSelectedMarblePattern(anything);
    setThreeDTexture(threeD);
    setTimer(2500);
    cookies.set("marblePatternId", id);
    cookies.set("selectedMarblePattern", anything);
    cookies.set("threeDTexture", threeD);
    setSelectedShape(0)
    setRectLightHeight(0)
    setSelectedEdge(0)
    setSelectedMarblePattern(0)
    setSelectedMaterial(0)
    setSelectedDesign(0)
    setSelectedColor(0)
    setThreeDTop(0)
    setThreeDLeg(0)
    setThreeDTexture(0)
    setThreeDColor(0)
    setCodeMarblePattern(code);
  }

  async function selectMaterial(id, anything, code) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setMaterialId(id);
    setSelectedMaterial(anything);
    if (menu == "customer") setSelectedDesign(" . . . . . ");
    setDesignId(0);
    if (menu == "customer") setThreeDColor(0);
    setPriceTableLeg(0);
    setSelectedShape(0)
    setRectLightHeight(0)
    setSelectedEdge(0)
    setSelectedMarblePattern(0)
    setSelectedMaterial(0)
    setSelectedDesign(0)
    setSelectedColor(0)
    setThreeDTop(0)
    setThreeDLeg(0)
    setThreeDTexture(0)
    setThreeDColor(0)
    setCodeMaterialBottom(code);
  }

  async function selectDesign(id, price, anything, threeD, code) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setDesignId(id);
    setPriceTableLeg(price);
    setSelectedDesign(anything);
    setThreeDLeg(threeD);
    cookies.set("designId", id);
    cookies.set("selectedDesign", anything);
    cookies.set("priceTableLeg", price);
    cookies.set("threeDLeg", threeD);
    setSelectedShape(0)
    setRectLightHeight(0)
    setSelectedEdge(0)
    setSelectedMarblePattern(0)
    setSelectedMaterial(0)
    setSelectedDesign(0)
    setSelectedColor(0)
    setThreeDTop(0)
    setThreeDLeg(0)
    setThreeDTexture(0)
    setThreeDColor(0)
    setCodeDesign(code);
  }

  async function selectColor(id, anything, threeD, code) {
    if (controls.current) {
      setAzimuthAngle(controls.current.getAzimuthalAngle());
      setPolarAngle(controls.current.getPolarAngle());
    }
    setColorId(id);
    setSelectedColor(anything);
    setThreeDColor(threeD);
    cookies.set("colorId", id);
    cookies.set("selectedColor", anything);
    cookies.set("threeDColor", threeD);
    setSelectedShape(0)
    setRectLightHeight(0)
    setSelectedEdge(0)
    setSelectedMarblePattern(0)
    setSelectedMaterial(0)
    setSelectedDesign(0)
    setSelectedColor(0)
    setThreeDTop(0)
    setThreeDLeg(0)
    setThreeDTexture(0)
    setThreeDColor(0)
    setCodeColor(code);
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
    //gl.toneMappingExposure = 0.6;
    // new RGBELoader()
    //     .load(
    //         "/assets/img/2D/panorama/tes1.hdr",
    //         function (texture) {
    //             // texture.mapping = new THREE.EquirectangularReflectionMapping();
    //             scene.background = texture;
    //             scene.environtment = texture;
    //         }
    // );
    // gl.toneMapping = new THREE.ACESFilmicToneMapping;
    // gl.toneMappingExposure = 0.6;
    // gl.outputEncoding = new THREE.sRGBEncoding;
    // const light = new THREE.AmbientLight( 0x404040 ); // soft white light
    // scene.add( light );
    //console.log(gl);
    //gl.info.autoReset = false;
    //canvas.current.addEventListener('webglcontextlost', webGlLost, false);

    useFrame((state) => {
      if (scene.children[0].children[2]) scene.children[0].children.splice(2, 1);
      if (scene.children[0].children[3]) scene.children[0].children.splice(3, 1);
      if (scene.children[0].children[4]) scene.children[0].children.splice(4, 1);
      // console.log("Azimuth", controls.current.getAzimuthalAngle())
      // console.log("Polar", controls.current.getPolarAngle())
      //console.log(camera.position)
      //gl.info.reset();
      //console.log(gl.renderLists)
      controls.current.autoRotate = autoRotate;
      controls.current.enablePan = false;
      controls.current.enableDamping = true;
      controls.current.target.set(0, 0.5, 0);
      controls.current.enableRotate = autoRotate;
      controls.current.enabled = autoRotate;
      controls.current.rotateSpeed = rotateSpeed;
      if (!autoRotate) {
        controls.current.maxPolarAngle = polarAngle;
        controls.current.maxAzimuthAngle = azimuthAngle;
        controls.current.minPolarAngle = polarAngle;
        controls.current.minAzimuthAngle = azimuthAngle;
        controls.current.rotateSpeed = rotateSpeed;
        controls.current.enableDamping = true;
      }
      controls.current.rotateSpeed = rotateSpeed;
      controls.current.enableDamping = true;
      controls.current.update();
    });

    return (
      <orbitControls
        ref={controls}
        args={[camera, domElement, scene]}
        // maxPolarAngle={autoRotate   ? Number.INFINITY : polarAngle }
        // maxAzimuthAngle={autoRotate ? Number.INFINITY : azimuthAngle}
        // minPolarAngle={autoRotate   ? Number.INFINITY : polarAngle}
        // minAzimuthAngle={autoRotate ? Number.INFINITY : azimuthAngle }
      />
    );
  };
  const BeforeLoad = () => {
    changeAutoRotate();
    return <></>;
  };

  const changeAutoRotate = () => {
    const timeout = setTimeout(() => {
      //&& form != 'setScale'
      if (autoRotate == false && threeDTop != 0 && threeDTexture != 0 && threeDLeg != 0 && threeDColor != 0 && scaleT && scaleB) {
        setAutoRotate(true);
      }
    }, timer);
  };

  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>Please wait {parseInt(progress)} % </Html>;
  }

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
    Swal.fire({
      title: "",
      html: "Please Wait . . . ",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setAzimuthAngle(-0.772398469658455);
    setPolarAngle(1.2);
    setAutoRotate(false);
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
          //window.open("/login?"+searchParams)
          navigate(`/login?code=${codeTop}%2B${codeEdge}%2B${codeSeaters}%2B${codeMarblePattern}%2B${codeMaterialBottom}%2B${codeDesign}%2B${codeColor}&action=${action}`, { replace: true });
        }
        Swal.close();
    })
  }

  const saveImage = async (code, phone, token) => {
      const canvas =  document.getElementsByTagName("canvas")[0];
      const screenshot = canvas.toDataURL();
      var base64ImageContent = screenshot.replace(/^data:image\/(png|jpg);base64,/, "");
      var blob = base64ToBlob(base64ImageContent, 'image/png');  
      const data = {
        base64 : "",
        file : blob
      }

      // const response = await axios.post(`${base_url}/wishlist/coba-upload`, data, {
      //   headers: {
      //     "Content-type": "multipart/form-data",
      //   },
      // });
      return data;
  }

  const handleAddWishlist = async (code, token, exp) => {
    let jsonData = await checkExpiredTokenCustomer(exp);
    if (jsonData[0].status_expired) {
      const decoded = jwt_decode(jsonData[0].data_token);
      setTokenAccess(jsonData[0].data_token);
      setExpireAccess(decoded.exp);
    }

    const cek = await axios.get(base_url + `/wishlist/get-detail-wishlist/?code=${codeTop}%2B${codeEdge}%2B${codeSeaters}%2B${codeMarblePattern}%2B${codeMaterialBottom}%2B${codeDesign}%2B${codeColor}&phone=${getLocalStorageValue("phone")}`);
    if(!cek.data.success){
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
            // Swal.fire({
            //   title: "Info",
            //   icon: response.data.success ? "success" : "error",
            //   html: response.data.message,
            //   allowOutsideClick: false,
            // });
            setAutoRotate(true);
            setUserAction();
            if(response.data.success) setIsMyWishList(true)
            Swal.close();
            setSearchParams({ code: `${codeTop}+${codeEdge}+${codeSeaters}+${codeMarblePattern}+${codeMaterialBottom}+${codeDesign}+${codeColor}` });
        })
    }
    else{
        const data = {
          phone: getLocalStorageValue("phone"),
          code : code.replace(/[+]/g, "%2B")
        }
        const response = await axios.delete(`${base_url}/wishlist/delete-wishlist/?code=${data.code}&phone=${data.phone}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        if(response.data.success) setIsMyWishList(false)
        // console.log(response.data)
        Swal.close();
        setSearchParams({ code: `${codeTop}+${codeEdge}+${codeSeaters}+${codeMarblePattern}+${codeMaterialBottom}+${codeDesign}+${codeColor}` });
    }
  };

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
         //navigate(`/?code=${codeTop}%2B${codeEdge}%2B${codeSeaters}%2B${codeMarblePattern}%2B${codeMaterialBottom}%2B${codeDesign}%2B${codeColor}`, { replace: true });
         //window.location.href(`/?code=${codeTop}%2B${codeEdge}%2B${codeSeaters}%2B${codeMarblePattern}%2B${codeMaterialBottom}%2B${codeDesign}%2B${codeColor}`);
         window.location.reload();
      })
      .catch(err => {
          if (err) {
            console.log(err)
          }
      })
  }

  

  return (
    <>
      {/* <div className="lg:h-screen overflow-hidden p-1 lg:flex lg:justify-between"> */}
      {/** 3D RENDER */}
      {/* <div className={'lg:h-[calc(100vh-34px)] sm:h-[360px] h-[270px] lg:w-1/2 lg:my-auto lg:mx-0 grid grid-cols-1 justify-center content-center mx-auto relative shadow-[inset_0_-5px_20px_rgba(0,0,0,0.1)] rounded-[15px] ' + ((showBottomScale) === true ? 'sm:static fixed h-auto w-auto' : '')}> */}
      
      

      <div
        className={
          (menu == "customer" &&
            "md:h-screen sm:h-auto h-screen overflow-hidden ") +
          "md:p-4 p-2 lg:flex lg:justify-between lg:gap-4  " +
          (menu == "editor" && "min-h-screen")
        }
      >
        {/** 3D RENDER */}
        <div className="lg:h-full md:h-[43%] sm:h-[270px] h-[40%] lg:w-1/2 lg:mx-0 mx-auto grid grid-cols-1 justify-center content-center relative shadow-[inset_0_-5px_20px_rgba(0,0,0,0.1)] rounded-[5px] overflow-hidden">
          {menu == "customer" &&  (
            <section className="absolute z-[6] top-0 left-0 h-[50px] w-full flex justify-between items-center px-5 bg-transparent text-white">
                <div className="flex items-center gap-5">
                  <div>
                    <img
                      className="absolute top-2 left-2 h-[30px] z-10"
                      src="/assets/icons/Logo.svg"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <div className="flex gap-5 items-center cursor-pointer">
                    <div className="flex gap-0 items-center cursor-pointer">
                      {/* start */}
                      <div>
                        <div className="dropdown relative text-end">
                          <a
                            className="dropdown-toggle flex "
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="user--data2"
                          >
                              <div className="h-[30px] aspect-square rounded-full overflow-hidden">
                                <img
                                  className="w-full h-full object-cover"
                                  src="/assets/images/DummyBlankProfile.jpg"
                                  alt=""
                                />
                              </div>
                              
                              <h6 className="text-zinc-900 font-semibold text-sm py-2 px-4 block w-full whitespace-nowrap bg-transparent" onClick={()=>{
                                if(!tokenAccess)  navigate(`/login?code=${codeTop}%2B${codeEdge}%2B${codeSeaters}%2B${codeMarblePattern}%2B${codeMaterialBottom}%2B${codeDesign}%2B${codeColor}`, { replace: true });
                              }}>
                                Welcome, {tokenAccess ? getLocalStorageValue("phone") : " Click Here To Login" }
                              </h6>
                          </a>

                          <ul
                            className="dropdown-menu min-w-full absolute hidden bg-white text-base z-50 float-left py-2 list-none text-right rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none right-0 "
                            aria-labelledby="user--data2"
                          >
                            
                            <hr className="h-0 my-1 border border-solid border-t-0 border-gray-300 opacity-25" />
                            {tokenAccess && (
                              <>
                                  <li onClick={()=> {
                                    navigate('/MyWishlist', {replace:true})
                                  }}>
                                    <a
                                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-primary hover:text-white focus:text-white focus:bg-primary"
                                    >
                                      My Wishlist
                                    </a>
                                  </li>

                                  <li>
                                    <a
                                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-primary hover:text-white focus:text-white focus:bg-primary"
                                    >
                                      Edit Profile
                                    </a>
                                  </li>

                                  <li onClick={()=> {
                                    //navigate('/MyWishlist', {replace:true})
                                  }}>
                                    <a
                                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-primary hover:text-white focus:text-white focus:bg-primary"
                                    >
                                      Change Phone Number
                                    </a>
                                  </li>

                                  <li onClick={() => handleLogout() }>
                                    <a
                                      className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-primary hover:text-white focus:text-white focus:bg-primary"
                                    >
                                      Log Out
                                    </a>
                                  </li>
                              </>
                            )}
                            
                          </ul>
                        </div>
                      </div>
                      {/* end */}
                      
                    </div>
                  </div>
                </div>
            </section>
          )}
          {(threeDTop == 0) |
          (threeDTexture == 0) |
          (rectLightHeight == 0) |
          (threeDLeg == 0) |
          (threeDColor == 0) |
          (scaleT.scale_x == undefined) |
          (scaleT.scale_y == undefined) |
          (scaleT.scale_y == undefined) |
          (scaleB.scale_x == undefined) |
          (scaleB.scale_y == undefined) |
          (scaleB.scale_z == undefined) ? (
            <h1 className="w-full h-full sm:px-20 px-1 font-jakarta xl:text-3xl md:text-2xl text-xl tracking-[2px] uppercase text-center">
              Create your own design by yourself
            </h1>
          ) : (
            <div className="lg:h-[100vh] md:h-[43vh] sm:h-[270px] h-[40vh] w-full">
              {/* camera={{fov:45}} */}
              <Canvas camera={{ fov: 50 }} ref={canvas} gl={{ preserveDrawingBuffer: true }} >
                <Suspense fallback={<Loader />}>
                  <BeforeLoad />
                  {/* {autoRotate && (
                                        <Loader />
                                        )} */}

                  {/* <ambientLight intensity={0.1} color={"#4287f5"}/> */}

                  <Stage environment={null} lightMap={null}>
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
                      scale={1}
                      position={[
                        positionB.position_x,
                        positionB.position_y,
                        positionB.position_z,
                      ]}
                      bx={scaleB.scale_x}
                      by={scaleB.scale_y}
                      bz={scaleB.scale_z}
                    />
                  </Stage>
                  {/* <BakeShadows /> */}
                </Suspense>
                <CameraControl />
                {/* <OrbitControls autoRotate target={[0,1,0]} /> */}
              </Canvas>
            </div>
          )}

          {menu == "customer" && (
            <>
              {/* FAQ */}
              <div
                className={
                  "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[12] transition-all duration-500 " +
                  (isOpenFAQ === true
                    ? "opacity-100 visible"
                    : "opacity-0 invisible")
                }
              >
                <div
                  className={
                    "fixed h-[80%] xl:w-[35%] md:w-[50%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom font-jakarta md:text-sm text-xs " +
                    (isOpenFAQ === true
                      ? "opacity-100 visible"
                      : "opacity-0 invisible")
                  }
                >
                  <img
                    className="h-[20px] cursor-pointer mb-1"
                    onClick={() => setIsOpenFAQ(!isOpenFAQ)}
                    src="/assets/icons/IconCloseBlack.svg"
                  />
                  <h4 className="lg:text-base text-sm font-semibold underline text-center mb-2">
                    FAQ
                  </h4>
                  <div className="border border-[#B8BABD] bg-[#FFF3E5] mb-1">
                    <div
                      className="relative p-2 cursor-pointer flex justify-between gap-2"
                      onClick={() => setIsOpenFAQ1(!isOpenFAQ1)}
                    >
                      <p className="font-medium">
                        Apakah Estetico Home bisa melakukan pesanan khusus ?
                      </p>
                      <img
                        className="h-[20px]"
                        src={
                          isOpenFAQ1 === true
                            ? "/assets/icons/IconMinusOutline.svg"
                            : "/assets/icons/IconPlusOutline.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div
                      className={
                        isOpenFAQ1 === true
                          ? "px-4 pb-2 opacity-100 visible h-auto"
                          : "opacity-0 invisible h-0"
                      }
                    >
                      <p className="text-xs font-light">
                        Iya tentu saja, Estetico Home menyediakan website khusus
                        bagi konsumen setia Estetico Home untuk memiliki produk
                        impian yang sesuai dengan kepribadianmu.
                      </p>
                    </div>
                  </div>
                  <div className="border border-[#B8BABD] bg-[#FFF3E5] mb-1">
                    <div
                      className="relative p-2 cursor-pointer flex justify-between gap-2"
                      onClick={() => setIsOpenFAQ2(!isOpenFAQ2)}
                    >
                      <p className="font-medium">Apa itu Custom Enquiry ?</p>
                      <img
                        className="h-[20px]"
                        src={
                          isOpenFAQ2 === true
                            ? "/assets/icons/IconMinusOutline.svg"
                            : "/assets/icons/IconPlusOutline.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div
                      className={
                        isOpenFAQ2 === true
                          ? "px-4 pb-2 opacity-100 visible h-auto"
                          : "opacity-0 invisible h-0"
                      }
                    >
                      <p className="text-xs font-light">
                        Custom Enquiry adalah tempat dimana para konsumen setia
                        Estetico Home dapat membuat produk marmer sesuai dengan
                        keinginan para konsumen.
                      </p>
                    </div>
                  </div>
                  <div className="border border-[#B8BABD] bg-[#FFF3E5] mb-1">
                    <div
                      className="relative p-2 cursor-pointer flex justify-between gap-2"
                      onClick={() => setIsOpenFAQ3(!isOpenFAQ3)}
                    >
                      <p className="font-medium">
                        Bagaimana cara pemesanan Custom Enquiry ?
                      </p>
                      <img
                        className="h-[20px]"
                        src={
                          isOpenFAQ3 === true
                            ? "/assets/icons/IconMinusOutline.svg"
                            : "/assets/icons/IconPlusOutline.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div
                      className={
                        isOpenFAQ3 === true
                          ? "px-4 pb-2 opacity-100 visible h-auto"
                          : "opacity-0 invisible h-0"
                      }
                    >
                      <p className="text-xs font-light">
                        Kunjungi website https://custom.esteticohome.my.id/ lalu
                        kamu bisa memulai membuat produk impianmu.
                      </p>
                    </div>
                  </div>
                  <div className="border border-[#B8BABD] bg-[#FFF3E5] mb-1">
                    <div
                      className="relative p-2 cursor-pointer flex justify-between gap-2"
                      onClick={() => setIsOpenFAQ4(!isOpenFAQ4)}
                    >
                      <p className="font-medium">
                        Apakah saya bisa memesan pattern yang terlihat sama
                        seperti di website ?
                      </p>
                      <img
                        className="h-[20px]"
                        src={
                          isOpenFAQ4 === true
                            ? "/assets/icons/IconMinusOutline.svg"
                            : "/assets/icons/IconPlusOutline.svg"
                        }
                        alt=""
                      />
                    </div>
                    <div
                      className={
                        isOpenFAQ4 === true
                          ? "px-4 pb-2 opacity-100 visible h-auto"
                          : "opacity-0 invisible h-0"
                      }
                    >
                      <p className="text-xs font-light">
                        Karena kami menggunakan marmer asli, kamu tidak bisa
                        mendapatkan pola yang sama dengan yang ada di foto kita.
                        Tetapi bahan marmer yang sudah kamu pilih akan tetap
                        sama walaupun polanya berbeda, tapi itulah daya tariknya
                        marmer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* GUIDELINES */}
              <div className="absolute bottom-1 left-2 right-2 z-10">
                <div
                  className={
                    "md:max-w-[calc(30vw+32px)] max-w-[clac(90vw+32px)] block ml-auto font-jakarta text-xs transition duration-500 " +
                    (isOpenGuide === true
                      ? 'max-h-[calc(25vh+32px)] relative p-4 bg-white cart-shadow mb-4 rounded-[10px]  opacity-100 visible'
                      // ? 'max-h-[calc(25vh+32px)] relative p-4 bg-white cart-shadow mb-4 rounded-[10px] after:content-[""] after:absolute after:bottom-[-12px] after:right-0 after:w-[8px] after:h-[8px] after:bg-white after:border after:border-primary after:rounded-full before:content-[""] before:absolute before:bottom-[-20px] before:right-0 before:w-[4px] before:h-[4px] before:bg-white before:border before:border-primary before:rounded-full opacity-100 visible'
                      : "h-0 opacity-0 invisible")
                  }
                >
                  <div className="md:max-w-[30vw] max-w-[90vw] max-h-[25vh] overflow-y-auto scrollbar-custom">
                    <h4 className="lg:text-base text-sm font-semibold underline text-center mb-2">
                      Guidelines
                    </h4>
                    <span className="font-semibold">Step 1</span>
                    <p className="mb-2">
                      Click "Table Top" menu then select "Shape" for the table
                      shape you want. Then, select 'Dimension' as the dining
                      table size and finally select 'Marble Pattern' for the
                      dining table pattern that you like.
                    </p>
                    <span className="font-semibold">Step 2</span>
                    <p className="mb-2">
                      After complete “Table Top" menu, then click "Table Leg".
                      Then, click 'Design' appears for the choice of the desired
                      table leg shape. Next, select 'Color' as the color of the
                      table leg that suits your taste.
                    </p>
                    <span className="font-semibold">Step 3</span>
                    <p className="mb-2">
                      Finally, the price of the dining table that you have made
                      will appear according to your wishes. Then click "Call for
                      Inquiry" for final step.
                    </p>
                  </div>
                </div>
                <div className="flex mr-auto justify-center items-center content-center gap-3 p-2">
                  {/* <button
                    type="button"
                    className="bg-cyan-800 hover:bg-cyan-700 text-white p-2 rounded-md mb-2 ml-2"
                    onClick={() => handleAddWishlist()}
                    alt="Add To Wishlist"
                    title="Add To Wishlist"
                    data-bs-toggle="tooltip"
                  >
                    {" "}
                    Add To Wishlist{" "}
                  </button> */}
                  <img
                    className="h-[28px] cursor-pointer mb-1"
                    onClick={() => 
                      {
                        refreshToken("save")
                      }}
                    src={"/assets/icons/" + (isMyWishList ? "Icon_heart.svg" : "Icon_heart_abu.svg") }
                    alt="Add To Wishlist"
                    title="Add To Wishlist"
                    data-bs-toggle="tooltip"
                  />
                  {/* <img
                    className="h-[28px] cursor-pointer mb-1"
                    onClick={() => refreshToken("share")}
                    src="/assets/icons/Icon_PDF_blue.svg"
                    alt="Send me the PDF"
                    title="Send me the PDF"
                    data-bs-toggle="tooltip"
                  /> */}
                  <img
                    className="h-[30px] cursor-pointer mb-1"
                    onClick={() => setIsOpenFAQ(!isOpenFAQ)}
                    src="/assets/icons/IconFAQ.svg"
                    alt="FAQ's"
                    title="FAQ's"
                    data-bs-toggle="tooltip"
                  />
                  <img
                    className="h-[30px] cursor-pointer mb-1"
                    onClick={() => setIsOpenGuide(!isOpenGuide)}
                    src="/assets/icons/IconGuidelines.svg"
                    alt="Guidelines"
                    title="Guidelines"
                    data-bs-toggle="tooltip"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        {/* 3D RENDER */}
        {/* 
                <div className="lg:w-[43%] lg:pt-0 pt-4 mx-auto flex flex-col">
                    <p>POSITION 1 :</p>
                        <input type="text" placeholder="X" value={lightPosition1[0]} onInput={(e)=>{
                            handleLightPosition1(0, e.target.value)
                        }} />
                        <input type="text" placeholder="Y" value={lightPosition1[1]} onInput={(e)=>{
                            handleLightPosition1(1, e.target.value)
                        }} />
                        <input type="text" placeholder="Z" value={lightPosition1[2]} onInput={(e)=>{
                            handleLightPosition1(2, e.target.value)
                        }} />

                    <p>POSITION 2 :</p>
                        <input type="text" placeholder="X" value={lightPosition2[0]} onInput={(e)=>{
                            handleLightPosition2(0, e.target.value)
                        }} />
                        <input type="text" placeholder="Y" value={lightPosition2[1]} onInput={(e)=>{
                            handleLightPosition2(1, e.target.value)
                        }} />
                        <input type="text" placeholder="Z" value={lightPosition2[2]} onInput={(e)=>{
                            handleLightPosition2(2, e.target.value)
                        }} />  

                    <p>Intensity :</p>      
                        <input type="text" placeholder="X" value={intensity} onInput={(e)=>{
                            setIntensity(e.target.value)
                        }} />
                    <p>ROTATION :</p>
                        <input type="text" placeholder="X" value={lightRotation[0]} onInput={(e)=>{
                            handleLightRotation(0, e.target.value)
                        }} />
                        <input type="text" placeholder="Y" value={lightRotation[1]} onInput={(e)=>{
                            handleLightRotation(1, e.target.value)
                        }} />
                        <input type="text" placeholder="Z" value={lightRotation[2]} onInput={(e)=>{
                            handleLightRotation(2, e.target.value)
                        }} />  

                    <p>Scale :</p>
                        <input type="text" placeholder="X" value={lightScale[0]} onInput={(e)=>{
                            handleLightScale(0, e.target.value)
                        }} />
                        <input type="text" placeholder="Y" value={lightScale[1]} onInput={(e)=>{
                            handleLightScale(1, e.target.value)
                        }} />
                        <input type="text" placeholder="Z" value={lightScale[2]} onInput={(e)=>{
                            handleLightScale(2, e.target.value)
                        }} />
                </div>
                */}

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

            // codeTop={codeTop}
            // setCodeTop={setCodeTop}
            // codeEdge={codeEdge}
            // setCodeEdge= {setCodeEdge}
            // codeMarblePattern={codeMarblePattern}
            // setCodeMarblePattern={setCodeMarblePattern}
            // codeSeaters={codeSeaters}
            // setCodeSeaters={setCodeSeaters}
            // codeMaterialBottom={codeMaterialBottom}
            // setCodeMaterialBottom={setCodeMaterialBottom}
            // codeDesign={codeDesign}
            // setCodeDesign={setCodeDesign}
            // codeColor={codeColor}
            // setCodeColor={setCodeColor}
          />
        )}

        {/* MENU */}
      </div>
    </>
  );
};

export default ThreeDRender;

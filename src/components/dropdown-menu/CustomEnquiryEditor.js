import {useState, useEffect} from 'react' 
import * as constants from '../../constants'
import TopScaleDimension from '../../admin/custom-enquiry/shape-scale-dimension'
import BottomScaleDimension from '../../admin/custom-enquiry/leg-scale-dimension'
import { formatRupiah } from '../../utils'
import axios from 'axios'; 
import Swal from 'sweetalert2';
const base_url = constants.base_url;

const CustomEnquiryEditor = ({showTopSegment,setShowTopSegment,showBottomSegment,setShowBottomSegment,showTopShape,setShowTopShape, showTopEdge, setShowTopEdge, showTopSeaters, setShowTopSeaters, showTopMarblePattern, setShowTopMarblePattern, showTopScale, setShowTopScale,  showBottomScale, setShowBottomScale, showTopPosition, setShowTopPosition, showBottomPosition, setShowBottomPosition, showBottomMaterial, setShowBottomMaterial, showBottomSeaters, setShowBottomSeaters,showBottomColor, setShowBottomColor,selectedShape, setSelectedShape, selectedEdge, setSelectedEdge, selectedDimension, setSelectedDimension, selectedMarblePattern, setSelectedMarblePattern, selectedMaterial, setSelectedMaterial,selectedDesign, setSelectedDesign,selectedColor, setSelectedColor, scaleT, setScaleT , scaleB, setScaleB, positionT, setPositionT, positionB, setPositionB, selectShape, selectEdge, selectDimension, selectMaterial, selectDesign, selectColor, shapes, shapeType, edges, dimensions, designs, materials, colors, setDimensions, marblePatterns, setMarblePatterns, selectMarblePattern, setDimensionId, shapeId,edgeId,dimensionId,marblePatternId,materialId,designId,colorId,form,setAutoRotate,autoRotate, sizeEdited, setSizeEdited
}) => {
    const [checkedMainDefault, setCheckedMainDefault] = useState(false);

    useEffect(() => {
        cekMainDefault();
    },[shapeId])

    async function cekMainDefault() {
        const response = await axios.get(base_url + '/table-default');
        const id_shape = response.data.data[0].top.id;
        if(id_shape == shapeId) setCheckedMainDefault(true);
        else setCheckedMainDefault(false);
    }

    const handleSubmit = async () => {
        Swal.showLoading();
        const response  = await axios.get(base_url + '/table-default/current-other-default/'+ shapeId);
        if(!response.data.success && !checkedMainDefault) {
            Swal.fire({
                title: 'Info',
                text : 'The Main Default Table Has Not Been Set, Do You Want To Set This As Main Default Table?',
                icon : 'warning',
                showCancelButton: true,
                confirmButtonText: 'Continue',
                cancelButtonText: 'Cancel',
                cancelButtonColor: '#d33',
                allowOutsideClick : false
            }).then((result) => {
                if (result.isConfirmed) {
                  doSubmit(1);
                }
            })
        }
        else{
            doSubmit(0);
        }
    }

    const doSubmit = async (is_main_default) => {
        if(checkedMainDefault) is_main_default = 1;
        const newData = {
            id_top:shapeId,
            id_edge:edgeId,
            id_seaters:dimensionId,
            id_texture:marblePatternId,
            id_material_bottom:materialId,
            id_kaki:designId,
            id_color:colorId,
            is_default : is_main_default
        }

        try {
            const response = await axios.put(base_url + '/table-default/update-table-default/' + shapeId, newData)
            if(response.data.success) {
                Swal.fire({
                    title: 'Info',
                    text : response.data.message,
                    icon : 'success',
                    confirmButtonText: 'OK',
                    allowOutsideClick : false
                })
            } else {
                Swal.fire({
                    title: 'Info',
                    text : response.data.message,
                    icon : 'error',
                    confirmButtonText: 'OK',
                    allowOutsideClick : false
                })
            }
            cekMainDefault();
        } catch (err) {
            console.log("response", err) 
            Swal.fire({
                title: 'Info',
                text : err,
                icon : 'error',
                confirmButtonText: 'OK',
                allowOutsideClick : false
            })
        }
    }

    const handleSubmitScale = async (loading) => {
        Swal.fire({
            title: '',
            html: 'Please Wait . . .',
            timerProgressBar: true,
            allowOutsideClick : false,
            didOpen: () => {
              Swal.showLoading()
            }
        })
        let action = '';
        let response = await axios.get(base_url + '/topscale/get-top-size/' + dimensionId + '/' + shapeType)
        if(response.data.success) action = 'Updating';
        else action = 'Adding';
        const submitTop = doSubmitTopSize(action);
        submitTop.then( async(data)=>{
            console.log('data', data)
            let success = data.data.success;
            let message = data.data.message;
            if(success){
                response = await axios.get(base_url + '/bottomscale/get-bottom-size/' + dimensionId + '/' + designId)
                if(response.data.success) action = 'Updating';
                else action = 'Adding';
                const submitBottom = doSubmitBottomSize(action);
                submitBottom.then((data) => {
                    success = data.data.success;
                    message = data.data.message;
                    if(success && loading){
                        Swal.fire({
                            title: 'Info',
                            text : message,
                            icon : 'success',
                            confirmButtonText: 'OK',
                            allowOutsideClick : false
                        })
                    }
                    else if (loading){
                        Swal.fire({
                            title: 'Info',
                            text : message,
                            icon : 'error',
                            confirmButtonText: 'OK',
                            allowOutsideClick : false
                        })
                    }
                    else Swal.close();
                }); 
            }
            else{
                if(loading){
                    Swal.fire({
                        title: 'Info',
                        text : message,
                        icon : 'error',
                        confirmButtonText: 'OK',
                        allowOutsideClick : false
                    })
                }
            }
        })    
    }

    const doSubmitTopSize = async (action) => {
        const newData = {
            type_top   : shapeType, 
            id_seaters : dimensionId, 
            scale_x    : scaleT.scale_x,
            scale_y    : scaleT.scale_y,
            scale_z    : scaleT.scale_z,
            position_x : positionT.position_x,
            position_y : positionT.position_y,
            position_z : positionT.position_z,
        }
        try {
            let response;
            if(action == 'Updating'){
                response = await axios.put(base_url + '/topscale/update-top-size/' + scaleT.id, newData)
            }
            else {
                response = await axios.post(base_url + '/topscale/add-top-size/', newData)
            }
            return response;
        } catch (err) {
            console.log("response", err) 
            return {
                data : {
                    success : false,
                    message : err.message
                }
            };
        }
    }

    const doSubmitBottomSize = async (action) => {
        const newData = {
            id_kaki : designId,
            id_seaters : dimensionId,
            scale_x : scaleB.scale_x,
            scale_y : scaleB.scale_y,
            scale_z : scaleB.scale_z,
            position_x : positionB.position_x,
            position_y : positionB.position_y,
            position_z : positionB.position_z,
        }
        try {
            let response;
            if(action == 'Updating'){
                response = await axios.put(base_url + '/bottomscale/update-bottom-size/' + scaleB.id, newData)
            }
            else {
                response = await axios.post(base_url + '/bottomscale/add-bottom-size/', newData)
            }
            return response;
        } catch (err) {
            console.log("response", err) 
            return {
                data : {
                    success : false,
                    message : err.message
                }
            };
        }
    }

    return(
        <>
            <div className="lg:w-[43%] lg:pt-0 pt-4 mx-auto flex flex-col">
                {/* <div className='flex flex-col'> */}
                    {form == "setDefault" && (
                        <>
                            {/* FORM TABLE DEFAULT */}
                                <div>
                                    <div className='lg:block sm:flex sm:justify-between gap-2'>
                                        {/* TOP  */}
                                        <div className="relative w-full mb-2 ">
                                            {/* TITLE */}
                                                <div className={"relative h-[35px] px-4 pt-1 mb-1 border border-primary cursor-pointer after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showTopSegment === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                    setShowBottomMaterial(false);
                                                    setShowBottomSeaters(false);
                                                    setShowBottomColor(false);
                                                    setShowBottomColor(false);
                                                    setShowTopShape(false);
                                                    setShowTopPosition(false);
                                                    setShowTopSegment(!showTopSegment);
                                                }}>
                                                    <h4 className="font-jakarta text-md text-base font-medium tracking-[2px]">SET DEFAULT TABLE</h4>
                                                </div>
                                            {/* TITLE */}
                                            
                                            {/* TOP CONTENT */}
                                                <div className={"" + ((showTopSegment === true) ? "opacity-100 visible pl-4 py-2 h-auto" : "opacity-0 invisible h-0")}>
                                                    <div className='flex flex-col'>
                                                        {/* TOP SHAPE */}
                                                        <div className="sm:mb-2 bg-white">
                                                            <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showTopShape === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                                setShowBottomMaterial(false);
                                                                setShowBottomSeaters(false);
                                                                setShowBottomColor(false);
                                                                setShowBottomColor(false);
                                                                setShowTopShape(!showTopShape);
                                                                setShowTopEdge(false);
                                                                setShowTopSeaters(false);
                                                                setShowTopMarblePattern(false);
                                                            }}
                                                            >Shape <span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedShape}</span>
                                                            </div>
                                                            <div className={"border-x border-b border-primary " + (showTopSegment, showTopShape === true ? " opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                                <div className="lg:h-[calc(100vh-415px)] h-[220px] w-auto overflow-auto scrollbar-custom">
                                                                    {shapes.map(function(shape, index) { 
                                                                    return (
                                                                    <button className={"w-full text-left py-3 border-b border-[#D9D9D9] cursor-pointer lg:flex lg:justify-between hover:bg-[#FFF3E5] " + (shape.name == selectedShape ? "bg-[#FFF3E5]" : "bg-white")} key={index} onClick={selectShape.bind(this, shape.id, shape.type, shape.name, shape.code)} >
                                                                        <h6 className="font-lato md:text-sm text-xs tracking-[3%]">&nbsp; {shape.name}  &nbsp;</h6>
                                                                    </button>  
                                                                    )})}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* TOP SHAPE */}

                                                        {/* TOP EDGE */}
                                                        <div className="sm:mb-2 bg-white">
                                                            <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showTopEdge === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                                setShowBottomMaterial(false);
                                                                setShowBottomSeaters(false);
                                                                setShowBottomColor(false);
                                                                setShowBottomColor(false);
                                                                setShowTopEdge(!showTopEdge);
                                                                setShowTopShape(false);
                                                                setShowTopSeaters(false);
                                                                setShowTopMarblePattern(false);
                                                            }}
                                                            >Edges <span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedEdge}</span>
                                                            </div>
                                                            {selectedShape && (
                                                                <div className={"border-x border-b border-primary " + (showTopSegment, showTopEdge === true ? " opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                                    <div className="flex gap-4 flex-wrap justify-center font-lato md:text-sm text-xs tracking-[3%] pb-3">
                                                                        {edges.map(function(edges, index) {
                                                                            const three_d_file = edges.three_d_file
                                                                            edges = edges.Edge;
                                                                        return (
                                                                            <div className="cursor-pointer flex items-center gap-1" key={index} onClick={selectEdge.bind(this, edges.id, edges.name, three_d_file, edges.code)} >
                                                                            <span className={"h-3 w-3 rounded-full border outline outline-1 outline-black " + (edges.name == selectedEdge ? "bg-primary" : " bg-white")}></span> 
                                                                                <p>{edges.name}</p>
                                                                            </div>
                                                                        )})}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* TOP EDGE */}

                                                        {/* TOP SEATERS */}
                                                        <div className="sm:mb-2 bg-white">
                                                            <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showTopSeaters === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                                setShowBottomMaterial(false);
                                                                setShowBottomSeaters(false);
                                                                setShowBottomColor(false);
                                                                setShowBottomColor(false);
                                                                setShowTopSeaters(!showTopSeaters);
                                                                setShowTopEdge(false);
                                                                setShowTopShape(false);
                                                                setShowTopMarblePattern(false);
                                                            }}
                                                            >
                                                                Dimensions<span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedDimension}</span>
                                                            </div>

                                                            <div className={"border-x border-b border-primary " + (showTopSeaters === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                                {shapeType == 0  ? (
                                                                    <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom">
                                                                        {dimensions.map(function(dimension, index) {
                                                                        return (
                                                                            <button className={"w-full text-left pt-3 border-b border-[#D9D9D9] cursor-pointer flex justify-between hover:bg-[#FFF3E5] " + (dimension.name == selectedDimension ? "bg-[#FFF3E5]" : "bg-white")} key={index} onClick={selectDimension.bind(this, dimension.id, dimension.name, dimension.panjang, dimension.lebar, dimension.showForm, index, dimension.code, dimension.harga_kaki)} >
                                                                                <h6 className="font-lato md:text-sm text-xs tracking-[3%] mb-3">&nbsp; {dimension.name} &nbsp;</h6>
                                                                                <span className="self-end font-lato text-xs tracking-[3%] mb-1 text-[#8D8A8A]">&nbsp; Diameter {dimension.diameter + ' cm'}  &nbsp;</span>
                                                                            </button> 
                                                                        )})}
                                                                    </div>
                                                                ) : (
                                                                    <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom">
                                                                        {dimensions.map(function(dimension, index) {
                                                                            return ( 
                                                                                <button className={"w-full text-left pt-3 border-b border-[#D9D9D9] cursor-pointer flex justify-between hover:bg-[#FFF3E5] " + (dimension.name == selectedDimension ? "bg-[#FFF3E5]" : "bg-white")} key={index} onClick={selectDimension.bind(this, dimension.id, dimension.name, dimension.panjang, dimension.lebar, dimension.showForm, index, dimension.code, dimension.harga_kaki)} >
                                                                                    <h6 className="font-lato md:text-sm text-xs tracking-[3%] mb-3">&nbsp; {dimension.name} &nbsp;</h6>
                                                                                    <span className="self-end font-lato text-xs tracking-[3%] mb-1 text-[#8D8A8A]">&nbsp; {dimension.panjang + ' cm (P) x ' + dimension.lebar + ' cm (L)'}  &nbsp;</span>
                                                                                    
                                                                                </button> 
                                                                            )})
                                                                        }
                                                                    </div>
                                                                )}
                                                            </div>    
                                                        </div>
                                                        {/* TOP SEATERS */}

                                                        {/* TOP MARBLE PATTERN */}
                                                        <div className="sm:mb-2 bg-white">
                                                            <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showTopMarblePattern === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                                setShowBottomMaterial(false);
                                                                setShowBottomSeaters(false);
                                                                setShowBottomColor(false);
                                                                setShowBottomColor(false);
                                                                setShowTopMarblePattern(!showTopMarblePattern);
                                                                setShowTopEdge(false);
                                                                setShowTopSeaters(false);
                                                                setShowTopShape(false);
                                                            }}
                                                            >Marble Pattern <span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedMarblePattern}</span>
                                                            </div>

                                                            <div className={"border-x border-b border-primary " + (showTopSegment, showTopMarblePattern === true ? " opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                                <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom pb-2 grid md:grid-cols-3 grid-cols-2 gap-1 items-start">
                                                                    {marblePatterns.map(function(marblePattern, index) {
                                                                        return (
                                                                            <button className={"relative flex flex-col items-center cursor-pointer border " + (marblePattern.name == selectedMarblePattern ? "border-primary" : "border-white")} key={index} onClick={selectMarblePattern.bind(this, marblePattern.id, marblePattern.name, marblePattern.texture, marblePattern.code)}  >
                                                                            <img src={"/assets/img/2D/texture/"+marblePattern.texture} alt="" />
                                                                            <p className="font-lato text-xs text-center">{marblePattern.name}</p>
                                                                            <img className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[50%] " + (marblePattern.name == selectedMarblePattern ? "" : "hidden")} src="/assets/icons/IconChecklist.svg" alt="" />
                                                                            </button>  
                                                                    )})}
                                                                </div>    
                                                            </div>
                                                        </div>
                                                        {/* TOP MARBLE PATTERN */}

                                                        {/* BOTTOM MATERIAL & DESIGN */}
                                                        <div className="sm:mb-2 bg-white">
                                                            <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showBottomMaterial === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                                setShowBottomMaterial(!showBottomMaterial);
                                                                setShowBottomSeaters(false);
                                                                setShowBottomColor(false);
                                                                setShowBottomColor(false);
                                                                setShowTopMarblePattern(false);
                                                                setShowTopEdge(false);
                                                                setShowTopSeaters(false);
                                                                setShowTopShape(false);
                                                            }}
                                                            >Material & Design <span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedMaterial+ ' & ' + selectedDesign}</span>
                                                            </div>
                                                            <div className={"border-x border-b border-primary " + (showBottomSegment, showBottomMaterial === true ? " opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                                <div className="flex gap-4 flex-wrap justify-center font-lato md:text-sm text-xs tracking-[3%] pb-3"> 
                                                                    {materials.map(function(material, index) {
                                                                        return (
                                                                        <div className="cursor-pointer flex items-center gap-1" key={index} onClick={selectMaterial.bind(this, material.id, material.name, material.code)}>
                                                                            <span className={"h-3 w-3 rounded-full border outline outline-1 outline-black " + (material.name == selectedMaterial ? "bg-primary" : " bg-white")}></span> 
                                                                            <p>{material.name}</p>
                                                                        </div>
                                                                    )})}
                                                                </div>
                                                                {!selectedMaterial ? (
                                                                    <div className="lg:h-[calc(100vh-415px)] h-[220px] w-auto overflow-auto scrollbar-custom pb-2">
                                                                        <p className="font-lato md:text-sm text-xs tracking-[3%] mt-5" onClick={selectDesign.bind(this,' . . . . . ')}>&nbsp; Please choose the material first.. &nbsp; </p>
                                                                    </div>
                                                                    ) : (
                                                                    <div className="lg:h-[calc(100vh-415px)] h-[220px] w-auto overflow-auto scrollbar-custom pb-2 grid md:grid-cols-3 grid-cols-2 gap-1 items-start">
                                                                        {designs.map(function(design, index) {
                                                                        return (
                                                                            <button className={"relative flex flex-col items-center cursor-pointer border " + (design.nama == selectedDesign ? "border-primary" : "border-white")} key={index} onClick={selectDesign.bind(this, design.id, design.harga, design.nama, design.file_three_d, design.code)}  >
                                                                            <img src={"/assets/img/2D/kaki/"+design.thumbnail} alt="" />
                                                                            <p className="font-lato text-xs text-center">{design.nama}</p>
                                                                            <img className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[50%] " + (design.nama == selectedDesign ? "" : "hidden")} src="/assets/icons/IconChecklist.svg" alt="" />
                                                                            </button> 
                                                                        )})}
                                                                    </div>
                                                                )}  
                                                            </div>
                                                        </div>
                                                        {/* BOTTOM MATERIAL & DESIGN */}

                                                        {/* BOTTOM COLOR */}
                                                        <div className="sm:mb-2 bg-white">
                                                            <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showBottomColor === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                                    setShowBottomColor(!showBottomColor);
                                                                    setShowBottomMaterial(false);
                                                                    setShowBottomSeaters(false);
                                                                    setShowTopMarblePattern(false);
                                                                    setShowTopEdge(false);
                                                                    setShowTopSeaters(false);
                                                                    setShowTopShape(false);
                                                                }}
                                                                >
                                                                    Color <span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedColor}</span>
                                                            </div>

                                                            <div className={"border-x border-b border-primary " + (showBottomColor === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                                <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom">
                                                                    {colors.map(function(color, index) {
                                                                    return (
                                                                        <button className={"w-full text-left py-3 border-b border-[#D9D9D9] cursor-pointer lg:flex lg:justify-between hover:bg-[#FFF3E5] " + (color.name == selectedColor ? "bg-[#FFF3E5]" : "bg-white")} key={index} onClick={selectColor.bind(this, color.id, color.name, color.file, color.code)}  >
                                                                        <h6 className="font-lato md:text-sm text-xs tracking-[3%]">&nbsp; {color.name} &nbsp;</h6>
                                                                        </button>  
                                                                    )})}
                                                                </div>
                                                            </div>
                                                        </div>  
                                                        {/* BOTTOM COLOR */}
                                                    </div>
                                                </div> 
                                            {/* TOP CONTENT */}
                                        </div>
                                        {/* TOP  */}
                                    </div>

                                    {/* <div className="relative form-check w-full mb-3" onClick={()=> setCheckedShapeDefault(!checkedShapeDefault)}>
                                        <input className="form-check-input appreance-none h-4 w-4 border border-gray-300 rounded-sm-bg-white checked:bg-primary checked-border-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value={checkedShapeDefault} checked={checkedShapeDefault} onClick={()=> setCheckedShapeDefault(!checkedShapeDefault)} >
                                        </input>
                                        <h4 className="font-jakarta text-sm text-base font-medium tracking-[2px] cursor-pointer" onClick={()=> setCheckedShapeDefault(!checkedShapeDefault)} >Set As {selectedShape} Default</h4>
                                    </div> */}

                                    <div className="relative form-check w-full" onClick={()=> setCheckedMainDefault(!checkedMainDefault)}>
                                        <input className="form-check-input appreance-none h-4 w-4 border border-gray-300 rounded-sm-bg-white checked:bg-primary checked-border-primary focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" checked={checkedMainDefault} value={checkedMainDefault} onClick={()=> setCheckedMainDefault(!checkedMainDefault)}>
                                        </input>
                                        <h4 className="font-jakarta text-sm font-medium tracking-[2px] cursor-pointer" onClick={()=> setCheckedMainDefault(!checkedMainDefault)}>Set As Main Default</h4>
                                    </div>
                                    
                                    <div className="relative w-full mb-0">
                                        <button className='block ml-auto font-bold text-center text-xs border-[3px] border-white bg-primary text-white py-2 px-5 rounded-[15px]' onClick={() => handleSubmit()} >SAVE CHANGES</button>
                                    </div>
                                </div>    
                            {/*FORM TABLE DEFAULT */}
                        </>
                    )}

                    {form == "setScale" && (
                        <>
                            {/* FORM SCALE & POSITION */}
                            <div>
                                <div className='lg:block sm:flex sm:justify-between gap-2'>
                                    {/* TOP  */}
                                    <div className="relative w-full mb-2 ">
                                        {/* TITLE */}
                                        <div className={"relative h-[35px] px-4 pt-1 mb-1 border border-primary cursor-pointer after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showTopSegment === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                            setShowTopSegment(!showTopSegment);
                                            setShowTopShape(false);
                                            setShowTopScale(false);
                                            setShowBottomSegment(false);
                                            setShowBottomMaterial(false);
                                            setShowBottomScale(false);
                                        }}>
                                            <h4 className="font-jakarta text-md text-base font-medium tracking-[2px]">SET TABLE SCALE {/*& POSITION*/}</h4>
                                        </div>
                                        {/* TITLE */}

                                        {/* TOP CONTENT */}
                                        <div className={"" + ((showTopSegment === true) ? "opacity-100 visible pl-4 py-2 h-auto" : "opacity-0 invisible h-0")}>
                                            {/* TOP SHAPE */}
                                            <div className="sm:mb-2 bg-white">
                                                <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showTopShape === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                    setShowTopShape(!showTopShape);
                                                    setShowTopScale(false);
                                                }}
                                                >Shape <span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedShape}</span>
                                                </div>
                                                <div className={"border-x border-b border-primary " + (showTopSegment, showTopShape === true ? " opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                    <div className="lg:h-[calc(100vh-415px)] h-[220px] w-auto overflow-auto scrollbar-custom">
                                                        {shapes.map(function(shape, index) { 
                                                        return (
                                                        <button className={"w-full text-left py-3 border-b border-[#D9D9D9] cursor-pointer lg:flex lg:justify-between hover:bg-[#FFF3E5] " + (shape.name == selectedShape ? "bg-[#FFF3E5]" : "bg-white")} key={index} onClick={selectShape.bind(this, shape.id, shape.type, shape.name, shape.code)} >
                                                            <h6 className="font-lato md:text-sm text-xs tracking-[3%]">&nbsp; {shape.name}  &nbsp;</h6>
                                                        </button>  
                                                        )})}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* TOP SHAPE */}

                                            {/* TOP EDGE */}
                                                <div className="sm:mb-2 bg-white">
                                                    <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showTopEdge === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                        setShowTopEdge(!showTopShape);
                                                        setShowTopScale(false);
                                                    }}
                                                    >Edges <span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedEdge}</span>
                                                    </div>
                                                    {selectedShape && (
                                                        <div className={"border-x border-b border-primary " + (showTopSegment, showTopEdge === true ? " opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                            <div className="flex gap-4 flex-wrap justify-center font-lato md:text-sm text-xs tracking-[3%] pb-3">
                                                                {edges.map(function(edges, index) {
                                                                    const three_d_file = edges.three_d_file
                                                                    edges = edges.Edge;
                                                                return (
                                                                    <div className="cursor-pointer flex items-center gap-1" key={index} onClick={selectEdge.bind(this, edges.id, edges.name, three_d_file, edges.code)} >
                                                                    <span className={"h-3 w-3 rounded-full border outline outline-1 outline-black " + (edges.name == selectedEdge ? "bg-primary" : " bg-white")}></span> 
                                                                        <p>{edges.name}</p>
                                                                    </div>
                                                                )})}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            {/* TOP EDGE */}
                                            
                                            {/* TOP SEATERS */}
                                            <div className="sm:mb-2 bg-white">
                                                <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showTopScale === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                    setShowTopScale(!showTopScale);
                                                    setShowTopShape(false);
                                                }}
                                                >
                                                    Table Scale {/*& POSITION*/} <span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedDimension}</span>
                                                </div>

                                                <div className={"border-x border-b border-primary " + (showTopScale === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                    <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom">
                                                        {dimensions.map(function(dimension, index) {
                                                            return ( 
                                                                <div className="mb-3">
                                                                    <button className={"w-full text-left pt-3 border-b border-[#D9D9D9] cursor-pointer flex justify-between hover:bg-[#FFF3E5] " + (dimension.name == selectedDimension ? "bg-[#FFF3E5]" : "bg-white")} key={index} onClick={()=> {
                                                                        handleSubmitScale(false);
                                                                        selectDimension(dimension.id, dimension.name, dimension.panjang, dimension.lebar, dimension.showForm, index, dimension.code)
                                                                    }} >
                                                                        <h6 className="font-lato md:text-sm text-xs tracking-[3%] mb-3">&nbsp; {dimension.name} &nbsp;</h6>
                                                                        <span className="self-end font-lato text-xs tracking-[3%] mb-1 text-[#8D8A8A]">&nbsp; {shapeType == 0 ? dimension.diameter + ' cm' :  dimension.panjang + ' cm (P) x ' +  dimension.lebar + ' cm (L)' }  &nbsp;</span>
                                                                        
                                                                    </button> 
                                                                    <div className={"border-x border-b border-[#D9D9D9] " + (selectedDimension == dimension.name ? " opacity-100 visible p-3 h-auto" : "opacity-0 invisible max-h-0")}>
                                                                        <TopScaleDimension valueScaleX={scaleT.scale_x} valueScaleY={scaleT.scale_y} valueScaleZ={scaleT.scale_z} valuePositionX={positionT.position_x} valuePositionY={positionT.position_y} valuePositionZ={positionT.position_z} action = '' scaleT = {scaleT} setScaleT = {setScaleT} positionT = {positionT} setPositionT = {setPositionT} setAutoRotate={setAutoRotate} sizeEdited={sizeEdited} setSizeEdited = {setSizeEdited}  />
                                                                    </div>    
                                                                </div>
                                                            )})
                                                        }
                                                    </div>
                                                </div>    
                                            </div>
                                            {/* TOP SEATERS */}
                                        </div>    
                                    </div>    
                                    {/* TOP  */}


                                    {/* BOTTOM */}
                                    <div className='relative w-full mb-2'>
                                        {/* TITLE */}
                                        <div className={"relative h-[35px] px-4 pt-1 mb-1 border border-primary cursor-pointer after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showBottomSegment === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                            setShowTopSegment(false);
                                            setShowBottomSegment(!showBottomSegment);
                                        }}>
                                            <h4 className="font-jakarta text-md text-base font-medium tracking-[2px]">SET BOTTOM SCALE {/*& POSITION*/}</h4>
                                        </div>
                                        {/* TITLE */}

                                        {/* BOTTOM CONTENT */}
                                        <div className={"" + ((showBottomSegment === true) ? "opacity-100 visible pl-4 py-2 h-auto" : "opacity-0 invisible h-0")}>
                                            {/* BOTTOM MATERIAL & DESIGN */}
                                            <div className="sm:mb-2 bg-white">
                                                <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showBottomMaterial === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                    setShowBottomMaterial(!showBottomMaterial);
                                                    setShowBottomScale(false);
                                                }}
                                                >Material & Design <span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedMaterial+ ' & ' + selectedDesign}</span>
                                                </div>
                                                <div className={"border-x border-b border-primary " + (showBottomSegment, showBottomMaterial === true ? " opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                    <div className="flex gap-4 flex-wrap justify-center font-lato md:text-sm text-xs tracking-[3%] pb-3"> 
                                                        {materials.map(function(material, index) {
                                                            return (
                                                            <div className="cursor-pointer flex items-center gap-1" key={index} onClick={selectMaterial.bind(this, material.id, material.name)}>
                                                                <span className={"h-3 w-3 rounded-full border outline outline-1 outline-black " + (material.name == selectedMaterial ? "bg-primary" : " bg-white")}></span> 
                                                                <p>{material.name}</p>
                                                            </div>
                                                        )})}
                                                    </div>
                                                    {!selectedMaterial ? (
                                                        <div className="lg:h-[calc(100vh-415px)] h-[220px] w-auto overflow-auto scrollbar-custom pb-2">
                                                            <p className="font-lato md:text-sm text-xs tracking-[3%] mt-5" onClick={selectDesign.bind(this,' . . . . . ')}>&nbsp; Please choose the material first.. &nbsp; </p>
                                                        </div>
                                                        ) : (
                                                        <div className="lg:h-[calc(100vh-415px)] h-[220px] w-auto overflow-auto scrollbar-custom pb-2 grid md:grid-cols-3 grid-cols-2 gap-1 items-start">
                                                            {designs.map(function(design, index) {
                                                            return (
                                                                <button className={"relative flex flex-col items-center cursor-pointer border " + (design.nama == selectedDesign ? "border-primary" : "border-white")} key={index} onClick={selectDesign.bind(this, design.id, design.harga, design.nama, design.file_three_d, design.code)}>
                                                                <img src={"/assets/img/2D/kaki/"+design.thumbnail} alt="" />
                                                                <p className="font-lato text-xs text-center">{design.nama}</p>
                                                                <img className={"absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] scale-[50%] " + (design.nama == selectedDesign ? "" : "hidden")} src="/assets/icons/IconChecklist.svg" alt="" />
                                                                </button> 
                                                            )})}
                                                        </div>
                                                    )}  
                                                </div>
                                            </div>
                                            {/* BOTTOM MATERIAL & DESIGN */}

                                            {/* BOTTOM SEATERS */}
                                            <div className="sm:mb-2 bg-white">
                                                <div className={"relative px-4 py-1 border border-primary cursor-pointer font-jakarta text-sm leading-5 font-bold tracking-[3%] after:z-[3] after:content-[''] after:absolute after:right-[18px] after:w-[10px] after:h-[10px] after:border-t-2 after:border-l-2 " + (showBottomScale === true ? "text-white bg-primary after:top-[13px] after:border-white after:rotate-45" : "after:top-[10px] after:border-black after:rotate-[225deg]")} onClick={() => {
                                                    setShowBottomMaterial(false);
                                                    setShowBottomScale(!showBottomScale);
                                                }}
                                                >
                                                    Leg Scale {/*& POSITION*/}<span className="mr-4 font-lato text-xs tracking-[3%]"><br/>{selectedDimension}</span>
                                                </div>

                                                <div className={"border-x border-b border-primary " + (showBottomScale === true ? "opacity-100 visible p-3 h-auto" : "opacity-0 invisible h-0")}>
                                                    <div className="lg:h-[calc(100vh-383px)] h-[252px] w-auto overflow-auto scrollbar-custom">
                                                        {dimensions.map(function(dimension, index) {
                                                            return ( 
                                                                <div className="mb-3">
                                                                    <button className={"w-full text-left pt-3 border-b border-[#D9D9D9] cursor-pointer flex justify-between hover:bg-[#FFF3E5] " + (dimension.name == selectedDimension ? "bg-[#FFF3E5]" : "bg-white")} key={index} onClick={()=> {
                                                                        handleSubmitScale(false);
                                                                        selectDimension(dimension.id, dimension.name, dimension.panjang, dimension.lebar, dimension.showForm, index, dimension.code )
                                                                    }}>
                                                                        <h6 className="font-lato md:text-sm text-xs tracking-[3%] mb-3">&nbsp; {dimension.name} &nbsp;</h6>
                                                                        <span className="self-end font-lato text-xs tracking-[3%] mb-1 text-[#8D8A8A]">&nbsp; {shapeType == 0 ? dimension.diameter + ' cm' :  dimension.panjang + ' cm (P) x ' +  dimension.lebar + ' cm (L)' }  &nbsp;</span>
                                                                        
                                                                    </button> 
                                                                    <div className={"border-x border-b border-[#D9D9D9] " + (selectedDimension == dimension.name ? " opacity-100 visible p-3 h-auto" : "opacity-0 invisible max-h-0")}>
                                                                        <BottomScaleDimension valueScaleX={scaleB.scale_x} valueScaleY={scaleB.scale_y} valueScaleZ={scaleB.scale_z} valuePositionX={positionB.position_x} valuePositionY={positionB.position_y} valuePositionZ={positionB.position_z} action = '' scaleB = {scaleB} setScaleB = {setScaleB} positionB = {positionB} setPositionB = {setPositionB} setAutoRotate={setAutoRotate} autoRotate = {autoRotate} sizeEdited={sizeEdited} setSizeEdited = {setSizeEdited} />
                                                                    </div>    
                                                                </div>
                                                            )})
                                                        }
                                                    </div>
                                                </div>    
                                            </div>
                                            {/* BOTTOM SEATERS */}
                                        </div>  
                                        {/* BOTTOM CONTENT */}  
                                    </div>
                                    {/* BOTTOM */}
                                </div> 

                                <div className="relative w-full mb-0">
                                    <button className='block ml-auto font-bold text-center text-xs border-[3px] border-white bg-primary text-white py-2 px-5 rounded-[15px]' onClick={() => handleSubmitScale(true)} >SAVE CHANGES</button>
                                </div> 
                            </div>  
                            {/* FORM SCALE & POSITION */}
                        </>
                    )}

                {/* </div> */}
            </div>
        </>
    )
}

export default CustomEnquiryEditor;
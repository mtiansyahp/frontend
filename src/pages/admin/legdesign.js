import React, { useContext, useEffect, useState } from "react";
import {
  AddButton,
  SearchBar,
  LoadingSpinner,
  MiniButtonWithIcon,
  CurrencyInput,
} from "../../components";
import { formatRupiah } from "../../utils";
import { AdminContext } from "../../config/context/adminContext";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

import * as constants from "../../constants";

const Design = () => {
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [isOpenFormDesign, setIsOpenFormDesign] = useState(false);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [preview2D, setPreview2D] = useState("");
  const [preview3D, setPreview3D] = useState("");
  const [getImg, setGetImg] = useState("");
  const [isOpenModalViewImg, setIsOpenModalViewImg] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [grades, setGrades] = useState([]);
  const [paramImage, setParamImage] = useState(0);
  const [paramThree, setParamThree] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mataUang, setMataUang] = useState("USD");

  //Pagination
  const [designs, setDesigns] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const [formDesign, setFormDesign] = useState({
    nama: "",
    code: "",
    // ukuran: "",
    material: "",
    is_visible: "",
    harga: "",
    type_top: "",
    id_grade: "",
    three_d_file: "",
    two_d_file: "",
    deskripsi: "",
  });

  const handleChangeDesign = (e) => {
    e.preventDefault();

    let data = { ...formDesign };
    if(e.target.name == "deskripsi" && e.target.value.length == 301){

    }
    else data[e.target.name] = e.target.value;

    if (e.target.files) {
      data[e.target.name] = e.target.files[0];
    }
    if (e.target.name == "two_d_file") {
      setPreview2D(URL.createObjectURL(e.target.files[0]));
      setParamImage(1);
    }
    if (e.target.name == "three_d_file") {
      setPreview3D(e.target.files[0].name);
      setParamThree(1);
    }
    if (e.target.name == "harga") {
      if (e.target.value.replaceAll(".", "") < 10000) {
        setMataUang("USD");
      } else {
        setMataUang("IDR");
      }
    }
    
    setFormDesign(data);
  };

  const resetForm = () => {
    setIsOpenFormDesign(false);
    setMsgValidation([]);
    setSingleMsg("");
    setIsUpdate(false);
    setPreview2D("");
    setPreview3D("");
    setParamImage(0);
    setParamThree(0);
    setFormDesign({
      nama: "",
      code: "",
      // ukuran: '',
      material: "",
      is_visible: "",
      harga: "",
      type_top: "",
      id_grade: "",
      three_d_file: "",
      two_d_file: "",
      deskripsi: "",
    });
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  useEffect(function () {
    const search = document.getElementById("searchIpt");
    search.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("searchBtn").click();
      }
    });
  }, []);

  const findData = async (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  function handleViewImg(id) {
    setIsOpenModalViewImg(true);
    let data = [...designs];
    let foundData = data.find((design) => design.id === id);
    setPreview2D(foundData.file_two_d);
    setGetImg(foundData.file_two_d);
  }

  function handleEditForm(id) {
    setIsOpenFormDesign(true);
    setIsUpdate(true);
    setIdUpdate(id);
    let data = [...designs];
    let foundData = data.find((design) => design.id === id);
    setGetImg(foundData.file_two_d);
    setPreview3D(foundData.file_three_d);

    setFormDesign({
      nama: foundData.nama,
      code: foundData.code,
      // //   ukuran: foundData.ukuran,
      material: foundData.material,
      is_visible: foundData.is_visible,
      harga: formatRupiah(foundData.harga),
      type_top: foundData.type_top,
      id_grade: foundData.id_grade,
      three_d_file: foundData.file_three_d,
      two_d_file: foundData.file_two_d,
      deskripsi: foundData.deskripsi,
      param_image: paramImage,
      param_three: paramThree,
    });
  }

  const handleSubmitDesign = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newData = {
      nama: formDesign.nama,
      code: formDesign.code,
      // //   ukuran: formDesign.ukuran,
      material: formDesign.material,
      is_visible: formDesign.is_visible,
      harga: formDesign.harga.replaceAll(".", ""),
      type_top: formDesign.type_top,
      id_grade: formDesign.id_grade,
      three_d_file: formDesign.three_d_file,
      two_d_file: formDesign.two_d_file,
      deskripsi: formDesign.deskripsi,
      param_image: paramImage,
      param_three: paramThree,
    };

    if (!isUpdate) {
      await axios
        .post(base_url + "/kaki/add-leg", newData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          setLoading(false);

          if (response.data.success) {
            Swal.fire({
              icon: "success",
              text: response.data.message,
            });
            resetForm();
          } else {
            if (Array.isArray(response.data.message)) {
              setMsgValidation(response.data.message);
            } else {
              setMsgValidation([]);
              setSingleMsg(response.data.message);
            }
          }
        });
    } else {
      await axios
        .put(base_url + "/kaki/update-leg/" + idUpdate, newData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          setLoading(false);

          if (response.data.success) {
            Swal.fire({
              icon: "success",
              text: response.data.message,
            });
            resetForm();
          } else {
            if (Array.isArray(response.data.message)) {
              setMsgValidation(response.data.message);
            } else {
              setMsgValidation([]);
              setSingleMsg(response.data.message);
            }
          }
        });
    }

    getDesign();
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Ok",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsOpenFormDesign(true);
          setLoading(true);

          await axios
            .delete(base_url + "/kaki/delete-leg/" + id)
            .then((response) => {
              if (response.data.success) {
                setLoading(false);
                setIsOpenFormDesign(false);

                Swal.fire({
                  icon: "success",
                  text: response.data.message,
                });

                getDesign();
              }
            });
        } catch (err) {
          setLoading(false);
          setIsOpenFormDesign(false);
          Swal.fire("Maaf, data gagal dihapus", "", "error");
        }
      }
    });
  };

  const getDesign = async (e) => {
    const response = await axios.get(
      base_url +
        `/kaki/get-leg?search_query=${keyword}&page=${page}&limit=${limit}`
    );

    setDesigns(response.data.data.result);
    setPage(response.data.data.page);
    setPages(response.data.data.totalPage);
    setRows(response.data.data.totalRows);
  };

  const tableOfMaterial = async () => {
    const response = await axios.get(
      base_url + `/material-bottom/get-material-bottom`
    );
    setMaterials(response.data.data.result);
  };

  const tableOfGrade = async () => {
    const response = await axios.get(
      base_url + `/grade/get-all-grade`
    );
    setGrades(response.data.data);
  };

  useEffect(() => {
    getDesign();
  }, [keyword, page]);

  useEffect(() => {
    tableOfMaterial();
    tableOfGrade();
  }, []);

  return (
    <section
      className={
        "top-[50px] h-full relative p-5 bg-[#FFF3E5] " +
        (context.navResponsive == true
          ? "lg:ml-[230px] ml-[55px]"
          : "ml-[55px]")
      }
    >
      <div className="flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6">
        <SearchBar
          value={query}
          actionChange={(e) => setQuery(e.target.value)}
          action={findData}
          idIpt="searchIpt"
          idBtn="searchBtn"
        />
        <AddButton name="Add Design" action={() => setIsOpenFormDesign(true)} />
      </div>

      <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
        <table
          className="sm:w-full w-max border border-black"
          id="table--Leg__Design"
        >
          <thead>
            <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
              <th className="p-2" scope="col">
                No
              </th>
              <th className="p-2" scope="col">
                Image
              </th>
              <th className="p-2" scope="col">
                Name
              </th>
              {/* <th className="p-2" scope="col">
                Price
              </th> */}
              <th className="p-2" scope="col">
                Unique Code
              </th>
              <th className="p-2" scope="col">
                Visibility
              </th>
              <th className="p-2" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {designs.map(function (design, index) {
              return (
                <tr
                  className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                  key={index}
                >
                  <td className="p-2" data-label="No">
                    {index + 1}
                  </td>
                  <td className="p-2" data-label="Image">
                    <div
                      className="h-[25px] aspect-square overflow-hidden block m-auto cursor-pointer midget:mr-0"
                      onClick={() => handleViewImg(design.id)}
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={"../assets/img/2D/kaki/" + design.file_two_d}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="p-2" data-label="Name">
                    {design.nama}
                  </td>
                  {/* <td className="p-2" data-label="Price">
                    {design.harga < 10000 ? "$" : "Rp"}{" "}
                    {formatRupiah(design.harga)}
                  </td> */}
                  <td className="p-2" data-label="Unique Code">
                    {design.code}
                  </td>
                  <td className="p-2" data-label="Visible">
                    <img
                      className="block m-auto midget:mr-0"
                      src={
                        design.is_visible == 1
                          ? "/assets/icons/IconVisible.svg"
                          : "/assets/icons/IconInvisible.svg"
                      }
                      alt=""
                    />
                  </td>
                  <td className="p-2" data-label="ACtion">
                    <div className="flex gap-1 flex-wrap justify-center midget:justify-end">
                      <MiniButtonWithIcon
                        colorBorder="primary"
                        colorBg="primary"
                        colorText="white"
                        action={() => handleEditForm(design.id)}
                        img="/assets/icons/IconEdit.svg"
                        name="Edit"
                      />
                      {context.accessRights == 1 ? (
                        <button
                          className="flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                          onClick={() => handleDelete(design.id)}
                        >
                          <img
                            src="/assets/icons/IconClose.svg"
                            name="Delete"
                            alt=""
                          />
                          Delete
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="font-jakarta lg:text-base md:text-sm text-xs">
        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
      </p>

      <nav key={rows} role="navigation" aria-label="pagination">
        <ReactPaginate
          previousLabel={
            <img
              className="h-[30px] w-[30px] p-[11px] object-cover"
              src="/assets/icons/IconArrowLeft.svg"
              alt="Prev"
            />
          }
          nextLabel={
            <img
              className="h-[30px] w-[30px] p-[11px] object-cover rotate-180"
              src="/assets/icons/IconArrowLeft.svg"
              alt="Next"
            />
          }
          breakLabel={"..."}
          pageCount={pages}
          pageRangeDisplayed={2}
          onPageChange={changePage}
          containerClassName={"flex items-center justify-center"}
          pageClassName={
            "h-[30px] w-[30px] flex items-center justify-center border border-primary ml-[-1px]"
          }
          activeClassName={
            "h-[30px] w-[30px] flex items-center justify-center border border-primary ml-[-1px] bg-primary text-white"
          }
          pageLinkClassName={"font-jakarta lg:text-base md:text-sm text-xs"}
          previousClassName={
            "h-[30px] w-[30px] flex items-center justify-center border border-primary rounded-l-lg"
          }
          nextClassName={
            "h-[30px] w-[30px] flex items-center justify-center border border-primary ml-[-1px] rounded-r-lg"
          }
          previousLinkClassName={"font-jakarta lg:text-base md:text-sm text-xs"}
          nextLinkClassName={"font-jakarta lg:text-base md:text-sm text-xs"}
        />
      </nav>

      {/* FORM MODAL DESIGN */}
      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
          (isOpenFormDesign === true
            ? "opacity-100 visible"
            : "opacity-0 invisible")
        }
      >
        <form
          className={
            "fixed max-h-[100vh] xl:w-[45%] md:w-[70%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenFormDesign === true
              ? "opacity-100 visible"
              : "opacity-0 invisible")
          }
          onSubmit={handleSubmitDesign}
        >
          {!loading ? (
            <>
              <div
                className={
                  (msgValidation.length || singleMsg) &&
                  "font-jakarta md:text-sm text-xs self-start mb-3 px-3 py-1 border border-red-500 rounded-[5px] bg-red-50 font-semibold text-red-900"
                }
              >
                {msgValidation.length > 0 ? (
                  msgValidation.map((validation, index) => (
                    <p key={index}>{validation}</p>
                  ))
                ) : (
                  <p>{singleMsg}</p>
                )}
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Name*</span>
                <input
                  type="text"
                  value={formDesign.nama}
                  name="nama"
                  placeholder="Input design name"
                  onChange={handleChangeDesign}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Code*</span>
                <input
                  type="text"
                  value={formDesign.code}
                  name="code"
                  placeholder="Input design code"
                  onChange={handleChangeDesign}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              {/* <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
                                    <span>Size*</span> 
                                    <input
                                    type='number'
                                    // value={formDesign.ukuran}
                                    // name='ukuran'
                                    placeholder='Input design size'
                                    onChange={handleChangeDesign}
                                    className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
                                    />
                                </label> */}
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Material*</span>
                <select
                  name="material"
                  value={formDesign.material}
                  onChange={handleChangeDesign}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  {materials.map(function (material, index) {
                    return <option value={material.id}>{material.name}</option>;
                  })}
                </select>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Upload 2D Image*</span>
                <span className="flex flex-col col-span-2">
                  {preview2D ? (
                    <figure className="image is-128x128 cursor-pointer">
                      <img src={preview2D} alt="Preview_Image"
                      onClick={() => setIsOpenModalViewImg(true)} 
                      title="Preview Image"
                      data-bs-toggle="tooltip" />
                    </figure>
                  ) : isUpdate ? (
                    <figure className="image is-128x128 cursor-pointer">
                      <img
                        src={"../assets/img/2D/kaki/" + getImg}
                        alt="Preview_Image"
                        onClick={() => setIsOpenModalViewImg(true)}
                        title="Preview Image"
                        data-bs-toggle="tooltip"
                      />
                    </figure>
                  ) : (
                    ""
                  )}
                  <span className="relative ml-auto">
                    <input
                      type="file"
                      name="two_d_file"
                      onChange={handleChangeDesign}
                      accept="image/*"
                      className='w-[65px] rounded-[5px] after:absolute after:cursor-pointer after:top-0 after:right-0 after:p-1 after:h-full after:content-["Choose-File"] after:flex after:justify-center after:items-center after:font-jakarta after:md:text-sm after:text-xs after:font-light after:text-white after:bg-orange-600 after:rounded-[5px] col hover:after:bg-orange-500'
                    />
                  </span>
                  <input type="text" value={paramImage} className="hidden" />
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Upload GLTF File*</span>
                <span className="flex flex-col col-span-2">
                  {preview3D && (
                    <p className="mb-1 text-xs text-center">{preview3D}</p>
                  )}
                  <span className="relative ml-auto">
                    <input
                      type="file"
                      name="three_d_file"
                      onChange={handleChangeDesign}
                      // accept='image/*'
                      className='w-[65px] rounded-[5px] after:absolute after:cursor-pointer after:top-0 after:right-0 after:p-1 after:h-full after:content-["Choose-File"] after:flex after:justify-center after:items-center after:font-jakarta after:md:text-sm after:text-xs after:font-light after:text-white after:bg-orange-600 after:rounded-[5px] col hover:after:bg-orange-500'
                    />
                  </span>
                  <input type="text" value={paramThree} className="hidden" />
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3 relative hidden">
                <span>Price*</span>
                <input
                  // type='number'
                  value={0}
                  name="harga"
                  placeholder="Input the price"
                  onChange={(e) => handleChangeDesign(CurrencyInput(e))}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
                <span className="absolute inset-y-0 right-0 flex items-center px-3 font-jakarta md:text-sm text-xs font-light text-white bg-slate-700  rounded-tr-[5px] rounded-br-[5px]">
                  {mataUang}
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3 hidden">
                <span>Type of top*</span>
                <select
                  name="type_top"
                  value={formDesign.type_top}
                  onChange={handleChangeDesign}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value={1}>Choose one</option>
                  <option value={1}>Corner</option>
                  <option value={0}>No corner</option>
                </select>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Grade*</span>
                <select
                  name="id_grade"
                  value={formDesign.id_grade}
                  onChange={handleChangeDesign}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  {grades.map(function (grade, index) {
                    return <option value={grade.id}>{grade.name} -- ( {grade.type_top == 1 ? "Have Corner" : "No Corner" } )</option>;
                  })}
                </select>
              </div>
              
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-0">
                <span>Description</span>
                <textarea
                  type="text"
                  value={formDesign.deskripsi}
                  name="deskripsi"
                  placeholder="Input design description"
                  onChange={handleChangeDesign}
                  rows={5}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
                
              </div>

              <div className="font-jakarta lg:text-base md:text-sm text-xs flex flex-row justify-end mb-3">
                  <span className="text-end text-sm" >{formDesign.deskripsi.length}/300</span>
              </div>

              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Visibility*</span>
                <select
                  name="is_visible"
                  value={formDesign.is_visible}
                  onChange={handleChangeDesign}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  <option value={1}>Visible</option>
                  <option value={0}>Invisible</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end col-span-2">
                <span
                  className="flex items-center gap-2 border bg-red-700 hover:bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer"
                  onClick={resetForm}
                  title="Cancel"
                  data-bs-toggle="tooltip"
                >
                  <img src="/assets/icons/IconClose.svg" alt="Cancel" />
                  <p>Cancel</p>
                </span>
                <button
                  className="flex items-center gap-2 border bg-primary hover:bg-green-800 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white"
                  type="submit"
                  title="Save"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <img
                    className="scale-[65%]"
                    src="/assets/icons/IconCheckWhite.svg"
                    alt="Save"
                  />
                  <p>Save</p>
                </button>
              </div>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </form>
      </div>

      {/* MODAL VIEW IMAGE */}
      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] " +
          (isOpenModalViewImg === true
            ? "opacity-100 visible"
            : "opacity-0 invisible")
        }
      >
        <div
          className={
            "fixed max-h-[100vh] w-[75vw] midget:w-[90vw] top-[50vh] left-[35vw] translate-x-[-30%] midget:translate-x-[-33%] translate-y-[-50%] z-20 p-1 bg-white rounded-[5px] cart-shadow " +
            (isOpenModalViewImg === true
              ? "opacity-100 visible"
              : "opacity-0 invisible")
          }
        >
          <img
            className="cursor-pointer absolute top-2px midget:top-[3px] right-[3px] bg-white p-1 hover:bg-orange-500 hover:opacity-100 transition duration-300 ease-in-out"
            onClick={() => {
              setIsOpenModalViewImg(false);
              setPreview2D("");
            }}
            src="/assets/icons/IconCloseBlack.svg"
            alt="Close"
            title="CLose"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          />
          <img src={"../assets/img/2D/kaki/" +  (getImg ? getImg : preview2D)} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Design;
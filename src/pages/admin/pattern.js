import React, { useContext, useEffect, useState } from "react";
import {
  AddButton,
  SearchBar,
  MiniButtonWithIcon,
  LoadingSpinner,
  CurrencyInput,
} from "../../components";
import { formatRupiah, formatDollar } from "../../utils";
import { AdminContext } from "../../config/context/adminContext";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import "tw-elements";

import * as constants from "../../constants";

const Pattern = () => {
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [isOpenFormPattern, setIsOpenFormPattern] = useState(false);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [preview2D, setPreview2D] = useState("");
  const [getImg, setGetImg] = useState("");
  const [isOpenModalViewImg, setIsOpenModalViewImg] = useState(false);
  const [patternCategories, setPatternCategories] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [mataUang, setMataUang] = useState([]);

  //Pagination
  const [patterns, setPatterns] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const [formPattern, setFormPattern] = useState({
    name: "",
    code: "",
    id_kategori: "",
    panjang: "",
    lebar: "",
    harga_per_meter: "",
    harga_slab: "",
    is_visible: "",
    texture: "",
    deskripsi: "",
  });

  const handleChangePattern = (e) => {
    e.preventDefault();

    let data = { ...formPattern };
    if(e.target.name == "deskripsi" && e.target.value.length == 301){

    }
    else data[e.target.name] = e.target.value;

    if (e.target.files) {
      data[e.target.name] = e.target.files[0];
    }
    if (e.target.name == "texture") {
      setPreview2D(URL.createObjectURL(e.target.files[0]));
    }

    if (e.target.name == "harga_per_meter") {
      const temp = [...mataUang]
      if (e.target.value.replaceAll(".", "")  < 10000) {
        temp[0] = "USD"
        data[e.target.name] = CurrencyInput(e.target.value.replaceAll(".", ""));
      } else {
        temp[0] = "IDR"
        data[e.target.name] = CurrencyInput(e.target.value.replaceAll(".", ""));
      }
      setMataUang(temp);
    }

    if (e.target.name == "harga_slab") {
      const temp = [...mataUang]
      if (e.target.value.replaceAll(".", "")  < 10000) {
        temp[1] = "USD"
        data[e.target.name] = CurrencyInput(e.target.value.replaceAll(".", ""));
      } else {
        temp[1] = "USD"
        data[e.target.name] = CurrencyInput(e.target.value.replaceAll(".", ""));
      }
      setMataUang(temp);
    }

    setFormPattern(data);
  };

  const resetForm = () => {
    setIsOpenFormPattern(false);
    setMsgValidation([]);
    setSingleMsg("");
    setIsUpdate(false);
    setPreview2D("");
    setFormPattern({
      name: "",
      code: "",
      id_kategori: "",
      panjang: "",
      lebar: "",
      harga_per_meter: "",
      harga_slab: "",
      is_visible: "",
      texture: "",
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
    let data = [...patterns];
    let foundData = data.find((pattern) => pattern.id === id);
    setPreview2D(foundData.texture);
    setGetImg(foundData.texture);
  }

  function handleEditForm(id) {
    setIsOpenFormPattern(true);
    setIsUpdate(true);
    setIdUpdate(id);
    let data = [...patterns];
    let foundData = data.find((pattern) => pattern.id === id);
    setGetImg(foundData.texture);
    const temp = [...mataUang]
    const harga_per_meter = foundData.harga_per_meter.toString();
    const harga_slab = foundData.harga_slab.toString();
    if ((harga_per_meter.replaceAll(".", "") || harga_per_meter.replaceAll(",", ""))  < 10000) {
      temp[0] = "USD"
    } else {
      temp[0] = "IDR"
    }

    if ((harga_slab.replaceAll(".", "") || harga_slab.replaceAll(",", ""))  < 10000) {
      temp[1] = "USD"
    } else {
      temp[1] = "IDR"
    }
    setMataUang(temp)
    
    setFormPattern({
      name: foundData.name,
      code: foundData.code,
      id_kategori: foundData.id_kategori,
      panjang: foundData.panjang,
      lebar: foundData.lebar,
      harga_per_meter: parseInt(foundData.harga_per_meter) < 10000 ? formatDollar(foundData.harga_per_meter) : formatRupiah(foundData.harga_per_meter)  ,
      harga_slab: parseInt(foundData.harga_slab < 10000) ? formatDollar(foundData.harga_slab) : formatRupiah(foundData.harga_slab),
      is_visible: foundData.is_visible,
      texture: foundData.texture,
      deskripsi: foundData.deskripsi,
    });
  }

  const handleSubmitPattern = async (e) => {
    e.preventDefault();
    setLoading(true);
    let harga_per_meter = formPattern.harga_per_meter.replaceAll(".", "");
    let harga_slab = formPattern.harga_slab.replaceAll(".", "")
    
    let newData = {
      name: formPattern.name,
      code: formPattern.code,
      id_kategori: formPattern.id_kategori,
      panjang: formPattern.panjang,
      lebar: formPattern.lebar,
      harga_per_meter: harga_per_meter,
      harga_slab: harga_slab,
      is_visible: formPattern.is_visible,
      texture: formPattern.texture,
      deskripsi: formPattern.deskripsi,
    };

    if (!isUpdate) {
      // const harga = newData.harga_per_meter
      // console.log(harga.replaceAll('.', ''))
      await axios
        .post(base_url + "/texture/add-texture", newData, {
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
        .put(base_url + "/texture/update-texture/" + idUpdate, newData, {
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
    getPattern();
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
          setIsOpenFormPattern(true);
          setLoading(true);

          await axios
            .delete(base_url + "/texture/delete-texture/" + id)
            .then((response) => {
              if (response.data.success) {
                setLoading(false);
                setIsOpenFormPattern(false);

                Swal.fire({
                  icon: "success",
                  text: response.data.message,
                });

                getPattern();
              }
            });
        } catch (err) {
          setLoading(false);
          setIsOpenFormPattern(false);
          Swal.fire("Maaf, data gagal dihapus", "", "error");
        }
      }
    });
  };

  const getPattern = async (e) => {
    const response = await axios.get(
      base_url +
        `/texture/get-texture?search_query=${keyword}&page=${page}&limit=${limit}`
    );

    setPatterns(response.data.data.result);
    setPage(response.data.data.page);
    setPages(response.data.data.totalPage);
    setRows(response.data.data.totalRows);
  };

  const tableOfPatternCategory = async () => {
    const response = await axios.get(
      base_url + `/texture-category/get-texture-category`
    );
    setPatternCategories(response.data.data.result);
  };

  useEffect(() => {
    getPattern();
  }, [keyword, page]);

  useEffect(() => {
    tableOfPatternCategory();
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
        <AddButton
          name="Add Pattern"
          action={() => setIsOpenFormPattern(true)}
        />
      </div>

      <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
        <table
          className="sm:w-full w-max border border-black"
          id="table--Pattern"
        >
          <thead>
            <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
              <th className="p-2" scope="col">
                No
              </th>
              <th className="p-2" scope="col">
                Texture
              </th>
              <th className="p-2" scope="col">
                Name
              </th>
              <th className="p-2" scope="col">
                Length
              </th>
              <th className="p-2" scope="col">
                Width
              </th>
              <th className="p-2" scope="col">
                Price Slab
              </th>
              <th className="p-2" scope="col">
                Price / meters
              </th>
              <th className="p-2" scope="col">
                Unique Code
              </th>
              <th className="p-2">Visible</th>
              <th className="p-2" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {patterns.map(function (pattern, index) {
              return (
                <tr
                  className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                  key={index}
                >
                  <td className="p-2" data-label="No">
                    {index + 1}
                  </td>
                  <td className="p-2" data-label="Texture">
                    <div
                      className="h-[25px] aspect-square overflow-hidden block m-auto cursor-pointer midget:mr-0 "
                      onClick={() => handleViewImg(pattern.id)}
                    >
                      <img
                        className="w-full h-full object-cover hover:drop-shadow-lg"
                        src={"../assets/img/2D/texture/" + pattern.texture}
                        alt="Click to preview"
                        title="Click to preview"
                        data-bs-toggle="tooltip"
                      />
                    </div>
                  </td>
                  <td className="p-2" data-label="Name">
                    {pattern.name}
                  </td>
                  <td className="p-2" data-label="Length">
                    {pattern.panjang}
                  </td>
                  <td className="p-2" data-label="WIdth">
                    {pattern.lebar}
                  </td>
                  <td className="p-2" data-label="Price">
                    {pattern.harga_slab < 10000 ? "$" : "Rp"}{" "}
                    {pattern.harga_slab < 10000 ? formatDollar(pattern.harga_slab) : formatRupiah(pattern.harga_slab)}
                  </td>
                  <td className="p-2" data-label="Price">
                    {pattern.harga_per_meter < 10000 ? "$" : "Rp"}{" "}
                    {pattern.harga_per_meter < 10000 ? formatDollar(pattern.harga_per_meter) : formatRupiah(pattern.harga_per_meter)}
                  </td>
                  <td className="p-2" data-label="Unique Code">
                    {pattern.code}
                  </td>
                  <td className="p-2" data-label="Visible">
                    <img
                      className="block m-auto midget:mr-0"
                      src={
                        pattern.is_visible == 1
                          ? "/assets/icons/IconVisible.svg"
                          : "/assets/icons/IconInvisible.svg"
                      }
                      alt=""
                    />
                  </td>
                  <td className="p-2" data-label="Action">
                    <div className="flex gap-1 flex-wrap justify-center midget:justify-end">
                      <MiniButtonWithIcon
                        colorBorder="primary"
                        colorBg="primary"
                        colorText="white"
                        action={() => handleEditForm(pattern.id)}
                        img="/assets/icons/IconEdit.svg"
                        name="Edit"
                        className="hover:bg-green-800"
                      />
                      {context.accessRights == 1 ? (
                        <button
                          className="flex items-center gap-1 bg-red-700 hover:border-r-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                          onClick={() => handleDelete(pattern.id)}
                          alt="Delete"
                          title="Delete"
                          data-bs-toggle="tooltip"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
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

      {/* FORM MODAL TEXTURE */}
      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
          (isOpenFormPattern === true
            ? "opacity-100 visible"
            : "opacity-0 invisible")
        }
      >
        <form
          className={
            "fixed max-h-[100vh] xl:w-[45%] md:w-[70%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenFormPattern === true
              ? "opacity-100 visible"
              : "opacity-0 invisible")
          }
          onSubmit={handleSubmitPattern}
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
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-2 mb-3">
                <span>Name*</span>
                <input
                  type="text"
                  value={formPattern.name}
                  name="name"
                  placeholder="Input Pattern Name"
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-2 mb-3">
                <span>Code*</span>
                <input
                  type="text"
                  value={formPattern.code}
                  name="code"
                  placeholder="Input Pattern Code"
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3 relative">
                <span>Price (/m)*</span>
                <input
                  value={formPattern.harga_per_meter}
                  name="harga_per_meter"
                  placeholder="Input the price/m"
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
                <span className="absolute inset-y-0 right-0 flex items-center px-3 font-jakarta md:text-sm text-xs font-light text-white bg-slate-700  rounded-tr-[5px] rounded-br-[5px]">
                  {mataUang[0]}
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3 relative">
                <span>Price (slab)*</span>
                <input
                  value={formPattern.harga_slab}
                  name="harga_slab"
                  placeholder="Input the price slab"
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
                <span className="absolute inset-y-0 right-0 flex items-center px-3 font-jakarta md:text-sm text-xs font-light text-white bg-slate-700  rounded-tr-[5px] rounded-br-[5px]">
                  {mataUang[1]}
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3 relative">
                <span>Length*</span>
                <input
                  type="number"
                  value={formPattern.panjang}
                  name="panjang"
                  placeholder="Input the length"
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
                <span className="absolute inset-y-0 right-0 flex items-center px-4 font-jakarta md:text-sm text-xs font-light text-white bg-slate-700  rounded-tr-[5px] rounded-br-[5px]">
                  cm
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3 relative">
                <span>Width*</span>
                <input
                  type="number"
                  value={formPattern.lebar}
                  name="lebar"
                  placeholder="Input the width"
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
                <span className="absolute inset-y-0 right-0 flex items-center px-4 font-jakarta md:text-sm text-xs font-light text-white bg-slate-700 rounded-tr-[5px] rounded-br-[5px]">
                  cm
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Texture*</span>
                <span className="flex flex-col col-span-2">
                  {preview2D ? (
                    <figure className="image is-128x128 cursor-pointer">
                      <img src={preview2D} alt="Preview Image" 
                      onClick={() => setIsOpenModalViewImg(true)} 
                      title="Preview Image"
                      data-bs-toggle="tooltip"
                      />
                    </figure>
                  ) : isUpdate ? (
                    <figure className="image is-128x128 cursor-pointer">
                      <img
                        src={"../assets/img/2D/texture/" + getImg}
                        alt="Preview Image"
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
                      name="texture"
                      url={formPattern.texture}
                      onChange={handleChangePattern}
                      accept="image/*"
                      className='w-[65px] rounded-[5px] after:absolute after:cursor-pointer after:top-0 after:right-0 after:p-1 after:h-full after:content-["Choose-File"] after:flex after:justify-center after:items-center after:font-jakarta after:md:text-sm after:text-xs after:font-light after:text-white after:bg-orange-600 after:rounded-[5px] col hover:after:bg-orange-500'
                    />
                  </span>
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3 ">
                <span>Category*</span>
                <select
                  name="id_kategori"
                  value={formPattern.id_kategori}
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  {patternCategories.map(function (patternCategory, index) {
                    return (
                      <option value={patternCategory.id} key={index}>
                        {patternCategory.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-0">
                <span>Description</span>
                <textarea
                  type="text"
                  value={formPattern.deskripsi}
                  name="deskripsi"
                  placeholder="Input design description"
                  onChange={handleChangePattern}
                  rows={5}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
                
              </div>

              <div className="font-jakarta lg:text-base md:text-sm text-xs flex flex-row justify-end mb-3">
                  <span className="text-end text-sm" >{formPattern.deskripsi.length}/300</span>
              </div>

              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Visibility*</span>
                <select
                  name="is_visible"
                  value={formPattern.is_visible}
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  <option value={1}>Visible</option>
                  <option value={0}>Invisible</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <span
                  className="flex items-center gap-2 border bg-red-700 hover:bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer"
                  onClick={resetForm}
                  title="Cancel"
                  data-bs-toggle="tooltip"
                >
                  <img src="/assets/icons/IconClose.svg" />
                  <p>Cancel</p>
                </span>
                <button
                  className="flex items-center gap-2 border bg-primary hover:bg-green-800 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white"
                  type="submit"
                  title="Save"
                  data-bs-toggle="tooltip"
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
            "fixed max-h-[100vh] w-[70vw] midget:w-[90vw] top-[50vh] left-[35vw] translate-x-[-30%] midget:translate-x-[-33%] translate-y-[-50%] z-20 p-1 bg-white rounded-[5px] cart-shadow " +
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
          <img src={"../assets/img/2D/texture/" + (getImg ? getImg : preview2D)} />
        </div>
      </div>
    </section>
  );
};


export default Pattern;
import React, { useContext, useEffect, useState } from "react";
import {
  AddButton,
  SearchBar,
  MiniButtonWithIcon,
  LoadingSpinner,
  CurrencyInput,
} from "../../components";
import { formatRupiah } from "../../utils";
import { AdminContext } from "../../config/context/adminContext";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

import * as constants from "../../constants";

const Pattern = () => {
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [isOpenFormPattern, setIsOpenFormPattern] = useState(false);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [preview2D, setPreview2D] = useState("");
  const [patternCategories, setPatternCategories] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

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
    id_kategori: "",
    panjang: "",
    lebar: "",
    harga_per_meter: "",
    is_visible: "",
    texture: "",
  });

  const handleChangePattern = (e) => {
    e.preventDefault();

    let data = { ...formPattern };
    data[e.target.name] = e.target.value;
    if (e.target.files) {
      data[e.target.name] = e.target.files[0];
    }
    if (e.target.name == "texture") {
      setPreview2D(e.target.files[0].name);
    }

    setFormPattern(data);
  };

  const resetForm = () => {
    setIsOpenFormPattern(false);
    setMsgValidation([]);
    setIsUpdate(false);
    setFormPattern({
      name: "",
      id_kategori: "",
      panjang: "",
      lebar: "",
      harga_per_meter: "",
      is_visible: "",
      texture: "",
    });
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const findData = async (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  function handleEditForm(id) {
    setIsOpenFormPattern(true);
    setIsUpdate(true);
    setIdUpdate(id);
    let data = [...patterns];
    let foundData = data.find((pattern) => pattern.id === id);
    setPreview2D(foundData.texture);

    setFormPattern({
      name: foundData.name,
      id_kategori: foundData.id_kategori,
      panjang: foundData.panjang,
      lebar: foundData.lebar,
      harga_per_meter: foundData.harga_per_meter,
      is_visible: foundData.is_visible,
      texture: foundData.texture,
    });
  }

  const handleSubmitPattern = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newData = {
      name: formPattern.name,
      id_kategori: formPattern.id_kategori,
      panjang: formPattern.panjang,
      lebar: formPattern.lebar,
      harga_per_meter: formPattern.harga_per_meter.replaceAll(".", ""),
      is_visible: formPattern.is_visible,
      texture: formPattern.texture,
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
            // alert(response.data.message)
            Swal.fire({
              icon: "success",
              text: response.data.message,
            });
            resetForm();
          } else {
              if(Array.isArray(response.data.message)) {
                  setMsgValidation(response.data.message)
              } else {
                  setMsgValidation([])
                  setSingleMsg(response.data.message)
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
            // alert(response.data.message)
            Swal.fire({
              icon: "success",
              text: response.data.message,
            });
            resetForm();
          } else {
              if(Array.isArray(response.data.message)) {
                  setMsgValidation(response.data.message)
              } else {
                  setMsgValidation([])
                  setSingleMsg(response.data.message)
              }
          }
        });
    }

    getPattern();
  };

  const handleDelete = async (id) => {
    const answer = window.confirm("Are you sure to delete this pattern?");
    if (answer) {
      const response = await axios.delete(
        base_url + "/texture/delete-texture/" + id
      );

      if (response.data.success) {
        alert(response.data.message);
        getPattern();
      } else {
        alert(response.data.message);
      }
    } else {
      alert("Cancelled");
    }
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
          ? "lg:ml-[230px] md:ml-[183px] ml-[55px]"
          : "ml-[55px]")
      }
    >
      <div className="flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6">
        <SearchBar
          value={query}
          actionChange={(e) => setQuery(e.target.value)}
          action={findData}
        />
        <AddButton
          name="Add Pattern"
          action={() => setIsOpenFormPattern(true)}
        />
      </div>

      <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
        <table className="sm:w-full w-max border border-black">
          <thead>
            <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
              <th className="p-2">No</th>
              <th className="p-2">Texture</th>
              <th className="p-2">Name</th>
              <th className="p-2">Length</th>
              <th className="p-2">Width</th>
              <th className="p-2">Price</th>
              <th className="p-2">Unique Code</th>
              <th className="p-2">Visible</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {patterns.map(function (pattern, index) {
              return (
                <tr
                  className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                  key={index}
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <div className="h-[25px] aspect-square overflow-hidden block m-auto">
                      <img
                        className="w-full h-full object-cover"
                        src={"../assets/img/2D/texture/" + pattern.texture}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="p-2">{pattern.name}</td>
                  <td className="p-2">{pattern.panjang}</td>
                  <td className="p-2">{pattern.lebar}</td>
                  <td className="p-2">
                    {formatRupiah(pattern.harga_per_meter)}
                  </td>
                  <td className="p-2">{pattern.code}</td>
                  <td className="p-2">
                    <img
                      className="block m-auto"
                      src={
                        pattern.is_visible == 1
                          ? "/assets/icons/IconVisible.svg"
                          : "/assets/icons/IconInvisible.svg"
                      }
                      alt=""
                    />
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1 flex-wrap justify-center">
                      <MiniButtonWithIcon
                        colorBorder="primary"
                        colorBg="primary"
                        colorText="white"
                        action={() => handleEditForm(pattern.id)}
                        img="/assets/icons/IconEdit.svg"
                        name="Edit"
                      />
                      <button
                        className="flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                        onClick={() => handleDelete(pattern.id)}
                      >
                        <img src="/assets/icons/IconClose.svg" name="Delete" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p>
        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
      </p>

      <nav key={rows} role="navigation" aria-label="pagination">
        <ReactPaginate
          previousLabel={"< Prev"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          pageCount={pages}
          pageRangeDisplayed={2}
          onPageChange={changePage}
          containerClassName={"flex items-center justify-center"}
          pageClassName={"px-2 py-1 border border-white ml-[-1px]"}
          activeClassName={
            "px-2 py-1 border border-white ml-[-1px] bg-primary text-white"
          }
          pageLinkClassName={"page-link"}
          previousClassName={
            "px-2 py-1 border border-white rounded-l-lg bg-primary text-white"
          }
          nextClassName={
            "px-2 py-1 border border-white ml-[-1px] rounded-r-lg bg-primary text-white"
          }
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
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
            "fixed h-auto xl:w-[45%] md:w-[70%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenFormPattern === true
              ? "opacity-100 visible"
              : "opacity-0 invisible")
          }
          onSubmit={handleSubmitPattern}
        >
          {!loading ? (
            <>
              <div className={(msgValidation.length || singleMsg) && 'font-jakarta md:text-sm text-xs self-start mb-3 px-3 py-1 border border-red-500 rounded-[5px] bg-red-50 font-semibold text-red-900'}>
                {
                  (msgValidation.length > 0)
                  ? msgValidation.map((validation, index) => (
                    <p key={index}>{validation}</p>
                  ))
                  : <p>{singleMsg}</p>
                }
              </div>
              <label className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3">
                <span>Name*</span>
                <input
                  type="text"
                  value={formPattern.name}
                  name="name"
                  placeholder="Input Pattern Name"
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1"
                />
              </label>
              <label className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3 relative">
                <span>Price (/m)*</span>
                <input
                  value={formPattern.harga_per_meter}
                  name="harga_per_meter"
                  placeholder="Input the price/m"
                  onChange={(e) => handleChangePattern(CurrencyInput(e))}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1"
                />
                <select className="absolute inset-y-0 right-0 flex items-center p-1 font-jakarta md:text-sm text-xs font-light text-white bg-slate-700 rounded-tr-[5px] rounded-br-[5px]">
                  <option value="IDR">IDR</option>
                  <option value="USD">USD</option>
                </select>
              </label>
              <label className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3 relative">
                <span>Length*</span>
                <input
                  type="number"
                  value={formPattern.panjang}
                  name="panjang"
                  placeholder="Input the length"
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1"
                />
                <span className="absolute inset-y-0 right-0 flex items-center px-4 font-jakarta md:text-sm text-xs font-light text-white bg-slate-700  rounded-tr-[5px] rounded-br-[5px]">
                  cm
                </span>
              </label>
              <label className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3 relative">
                <span>Width*</span>
                <input
                  type="number"
                  value={formPattern.lebar}
                  name="lebar"
                  placeholder="Input the width"
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1"
                />
                <span className="absolute inset-y-0 right-0 flex items-center px-4 font-jakarta md:text-sm text-xs font-light text-white bg-slate-700 rounded-tr-[5px] rounded-br-[5px]">
                  cm
                </span>
              </label>
              <label className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3">
                <span>Texture*</span>
                <span className="flex flex-col">
                  {preview2D && (
                    <p className="mb-1 text-xs text-center">{preview2D}</p>
                  )}
                  <span className="relative ml-auto">
                    <input
                      type="file"
                      name="texture"
                      url={formPattern.texture}
                      onChange={handleChangePattern}
                      accept="image/*"
                      className='w-[65px] rounded-[5px] after:absolute after:cursor-pointer after:top-0 after:right-0 after:p-1 after:h-full after:content-["Choose-File"] after:flex after:justify-center after:items-center after:font-jakarta after:md:text-sm after:text-xs after:font-light after:text-white after:bg-slate-700 after:rounded-[5px]'
                    />
                  </span>
                </span>
              </label>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3">
                <span>Category*</span>
                <select
                  name="id_kategori"
                  value={formPattern.id_kategori}
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5"
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
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3">
                <span>Visibility*</span>
                <select
                  name="is_visible"
                  value={formPattern.is_visible}
                  onChange={handleChangePattern}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5"
                >
                  <option value="">Choose one</option>
                  <option value={1}>visible</option>
                  <option value={0}>invisible</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <span
                  className="flex items-center gap-2 border bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer"
                  onClick={resetForm}
                >
                  <img src="/assets/icons/IconClose.svg" alt="Cancel" />
                  <p>Cancel</p>
                </span>
                <button
                  className="flex items-center gap-2 border border-primary bg-primary rounded-[5px] py-1 px-4 font-jakarta text-xs text-white"
                  type="submit"
                >
                  <img
                    className="scale-[65%]"
                    src="/assets/icons/IconCheckWhite.svg"
                    alt=""
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
    </section>
  );
};

export default Pattern;

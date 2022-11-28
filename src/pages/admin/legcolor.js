import React, { useContext, useEffect, useState } from "react";
import {
  AddButton,
  SearchBar,
  MiniButtonWithIcon,
  LoadingSpinner,
} from "../../components";
import { formatRupiah } from "../../utils";
import { AdminContext } from "../../config/context/adminContext";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

import * as constants from "../../constants";

const LegColor = () => {
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [msgValidation, setMsgValidation] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [colorType, setColorType] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [preview2D, setPreview2D] = useState("");
  const [getImg, setGetImg] = useState("");
  const [isOpenModalViewImg, setIsOpenModalViewImg] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

  //Pagination
  const [color, setColor] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const [form, setForm] = useState({
    name: "",
    code: "",
    material: "",
    // color_type: "",
    is_visible: "",
    file_color: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    let data = { ...form };
    data[e.target.name] = e.target.value;
    if (e.target.files) {
      data[e.target.name] = e.target.files[0];
    }
    if (e.target.name == "file_color") {
      setPreview2D(URL.createObjectURL(e.target.files[0]));
    }

    setForm(data);
  };

  const resetForm = () => {
    setIsOpenForm(false);
    setMsgValidation([]);
    setPreview2D("");
    setIsUpdate(false);
    setForm({
      name: "",
      code: "",
      material: "",
      // color_type: "",
      is_visible: "",
      file_color: "",
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
    tableOfMaterial();
  }, []);

  const findData = async (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  function handleViewImg(id) {
    setIsOpenModalViewImg(true);
    let data = [...color];
    let foundData = data.find((dColor) => dColor.id === id);
    setPreview2D(foundData.file);
    setGetImg(foundData.file);
  }

  function handleEditForm(id) {
    setIsOpenForm(true);
    setIsUpdate(true);
    setIdUpdate(id);
    let data = [...color];
    let foundData = data.find((dColor) => dColor.id === id);
    setGetImg(foundData.file);

    setForm({
      name: foundData.name,
      code: foundData.code,
      material: foundData.material,
      // // color_type: foundData.id_color_type,
      is_visible: foundData.is_visible,
      file_color: foundData.file,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newData = {
      name: form.name,
      code: form.code,
      material: form.material,
      // // id_color_type: form.color_type,
      is_visible: form.is_visible,
      file_color: form.file_color,
    };

    if (!isUpdate) {
      await axios
        .post(base_url + "/color/add-color", newData, {
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
        .put(base_url + "/color/update-color/" + idUpdate, newData, {
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

    getColor();
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
          setIsOpenForm(true);
          setLoading(true);

          await axios
            .delete(base_url + "/color/delete-color/" + id)
            .then((response) => {
              if (response.data.success) {
                setLoading(false);
                setIsOpenForm(false);

                Swal.fire({
                  icon: "success",
                  text: response.data.message,
                });

                getColor();
              }
            });
        } catch (err) {
          setLoading(false);
          setIsOpenForm(false);
          Swal.fire("Maaf, data gagal dihapus", "", "error");
        }
      }
    });
  };

  const getColor = async (e) => {
    const response = await axios.get(
      base_url +
        `/color/get-color?search_query=${keyword}&page=${page}&limit=${limit}`
    );

    setColor(response.data.data.result);
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

  const getColorType = async () => {
    const response = await axios.get(base_url + `/color-type`);
    setColorType(response.data.data);
  };

  useEffect(() => {
    getColor();
  }, [keyword, page]);

  useEffect(() => {
    tableOfMaterial();
    getColorType();
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
        <AddButton name="Add Color" action={() => setIsOpenForm(true)} />
      </div>

      <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
        <table className="sm:w-full w-max border border-black" id="table--Leg__Color">
          <thead>
            <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
              <th className="p-2" scope="col">No</th>
              <th className="p-2" scope="col">Image</th>
              <th className="p-2" scope="col">Name</th>
              <th className="p-2" scope="col">Material</th>
              <th className="p-2" scope="col">Unique Code</th>
              <th className="p-2" scope="col">Visible</th>
              <th className="p-2" scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {color.map(function (dColor, index) {
              return (
                <tr
                  className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                  key={index}
                >
                  <td className="p-2" data-label="No">{index + 1}</td>
                  <td className="p-2" data-label="Image">
                    <div className="h-[25px] aspect-square overflow-hidden block m-auto mr-0 cursor-pointer" onClick={() => handleViewImg(dColor.id)}>
                      <img
                        className="w-full h-full object-cover"
                        src={"../assets/img/2D/color/" + dColor.file}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="p-2" data-label="Name">{dColor.name}</td>
                  <td className="p-2" data-label="NMaterial">
                    {dColor.material == 1 ? "Steel" : "Marble"}
                  </td>
                  <td className="p-2" data-label="Unique Code">{dColor.code}</td>
                  <td className="p-2" data-label="Visible">
                    <img
                      className="block m-auto nr-0"
                      src={
                        dColor.is_visible == 1
                          ? "/assets/icons/IconVisible.svg"
                          : "/assets/icons/IconInvisible.svg"
                      }
                      alt=""
                    />
                  </td>
                  <td className="p-2"  data-label="Action">
                    <div className="flex gap-1 flex-wrap justify-center">
                      <MiniButtonWithIcon
                        colorBorder="primary"
                        colorBg="primary"
                        colorText="white"
                        action={() => handleEditForm(dColor.id)}
                        img="/assets/icons/IconEdit.svg"
                        name="Edit"
                      />
                      {context.accessRights == 1 ? (
                        <button
                          className="flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                          onClick={() => handleDelete(dColor.id)}
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
          (isOpenForm === true ? "opacity-100 visible" : "opacity-0 invisible")
        }
      >
        <form
          className={
            "fixed max-h-[100vh] xl:w-[45%] md:w-[70%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenForm === true
              ? "opacity-100 visible"
              : "opacity-0 invisible")
          }
          onSubmit={handleSubmit}
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
                  value={form.name}
                  name="name"
                  placeholder="Input Color Name"
                  onChange={handleChange}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Code*</span>
                <input
                  type="text"
                  value={form.code}
                  name="code"
                  placeholder="Input Color Code"
                  onChange={handleChange}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Material*</span>
                <select
                  name="material"
                  value={form.material}
                  onChange={handleChange}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  {materials.map(function (material, index) {
                    return (
                      <option value={material.id} key={index}>
                        {material.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
                              <span>Color Type*</span>
                              <select
                              // name='color_type'
                              // value={form.color_type}
                              onChange={handleChange}
                              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
                              <option value=''>Choose one</option>
                              {colorType.map(function(dColorType, index) {
                                  return (
                                      <option value={dColorType.id} key={index}>{dColorType.name}</option>
                                  )})}
                              </select>
                          </div> */}
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Upload Color*</span>
                <span className="flex flex-col col-span-2">
                  {preview2D ? (
                    <figure className="image is-128x128">
                      <img src={preview2D} alt="Preview Image"
                      onClick={() => setIsOpenModalViewImg(true)} 
                      title="Preview Image"
                      data-bs-toggle="tooltip" />
                    </figure>
                  ) : isUpdate ? (
                    <figure className="image is-128x128 cursor-pointer">
                      <img
                        src={"../assets/img/2D/color/" + getImg}
                        alt="Preview Image"
                        onClick={() => setIsOpenModalViewImg(true)}
                        title="Preview Image"
                        data-bs-toggle="tooltip"
                      />
                    </figure>
                  ) : (
                    ""
                  )}
                  <span className="relative ml-auto col-span-2">
                    <input
                      type="file"
                      name="file_color"
                      url={form.file_color}
                      onChange={handleChange}
                      accept="image/*"
                      className='w-[65px] rounded-[5px] after:absolute after:cursor-pointer after:top-0 after:right-0 after:p-1 after:h-full after:content-["Choose-File"] after:flex after:justify-center after:items-center after:font-jakarta after:md:text-sm after:text-xs after:font-light after:text-white after:bg-orange-600 after:rounded-[5px] col hover:after:bg-orange-500'
                    />
                  </span>
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Visibility*</span>
                <select
                  name="is_visible"
                  value={form.is_visible}
                  onChange={handleChange}
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
                <button className="flex items-center gap-2 border bg-primary hover:bg-green-800 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white"
                title="Save"
                data-bs-toggle="tooltip">
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
            "fixed max-h-[100vh] w-[65vw] midget:w-[90vw] top-[50vh] left-[35vw] translate-x-[-30%] midget:translate-x-[-33%] translate-y-[-50%] z-20 p-1 bg-white rounded-[5px] cart-shadow " +
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
            data-bs-toggle="tooltip"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          />
          <img src={"../assets/img/2D/color/" + (getImg ? getImg : preview2D)} alt="" />
        </div>
      </div>
    </section>
  );
};

export default LegColor;

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
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import * as constants from "../../constants";

const TopAdmin = () => {
  const navigate = useNavigate();
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [isOpenFormShape, setIsOpenFormShape] = useState(false);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

  //Pagination
  const [shapes, setShapes] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [preview2D, setPreview2D] = useState("");
  const [getImg, setGetImg] = useState("");
  const [isOpenModalViewImg, setIsOpenModalViewImg] = useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "",
    is_visible: "",
    file: "",
  });

  const handleChangeForm = (e) => {
    e.preventDefault();
    let data = { ...form };
    data[e.target.name] = e.target.value;
    if (e.target.files) {
      data[e.target.name] = e.target.files[0];
    }
    if (e.target.name == "file") {
      setPreview2D(URL.createObjectURL(e.target.files[0]));
    }
    setForm(data);
  };

  const resetForm = () => {
    setIsOpenFormShape(false);
    setMsgValidation([]);
    setIsUpdate(false);
    setForm({
      name: "",
      code: "",
      type: "",
      is_visible: "",
      file: "",
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
  useEffect(function () {
    const search = document.getElementById("searchIpt");
    search.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("searchBtn").click();
      }
    });
  }, []);

  function handleEditForm(id) {
    setIsOpenFormShape(true);
    setIsUpdate(true);
    setIdUpdate(id);
    let data = [...shapes];
    let foundData = data.find((shape) => shape.id === id);
    setGetImg(foundData.file);
    setForm({
      name: foundData.name,
      code: foundData.code,
      type: foundData.type,
      is_visible: foundData.is_visible,
      file: foundData.file,
    });
  }

  const handleSubmitShape = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newData = {
      name: form.name,
      code: form.code,
      type: form.type,
      is_visible: form.is_visible,
      file: form.file,
    };

    if (!isUpdate) {
      await axios.post(base_url + "/top/add-top", newData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }).then((response) => {
        setLoading(false);

        if (response.data.success) {
          // alert(response.data.message);
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
        .put(base_url + "/top/update-top/" + idUpdate, newData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }).then((response) => {
          setLoading(false);

          if (response.data.success) {
            // alert(response.data.message);
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

    getShape();
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
          setIsOpenFormShape(true);
          setLoading(true);

          await axios
            .delete(base_url + "/top/delete-top/" + id)
            .then((response) => {
              if (response.data.success) {
                setLoading(false);
                setIsOpenFormShape(false);

                Swal.fire({
                  icon: "success",
                  text: response.data.message,
                });

                getShape();
              }
            });
        } catch (err) {
          setLoading(false);
          setIsOpenFormShape(false);
          Swal.fire("Maaf, data gagal dihapus", "", "error");
        }
      }
    });
  };

  const getShape = async (e) => {
    const response = await axios.get(
      base_url +
        `/top/get-top?search_query=${keyword}&page=${page}&limit=${limit}`
    );

    setShapes(response.data.data.result);
    setPage(response.data.data.page);
    setPages(response.data.data.totalPage);
    setRows(response.data.data.totalRows);
  };

  useEffect(() => {
    getShape();
  }, [keyword, page]);

  function handleDetailEdge(id) {
    let data = [...shapes];
    let foundData = data.find((shape) => shape.id === id);

    navigate("/admin/detail-edge-for-top", {
      state: { id: id, name: foundData.name },
    });
  }

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
        <AddButton name="Add Shape" action={() => setIsOpenFormShape(true)} />
      </div>

      <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
        <table
          className="sm:w-full w-max border border-black"
          id="table--Shape"
        >
          <thead>
            <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
              <th className="p-2" scope="col">
                No
              </th>
              <th className="p-2" scope="col">
                Name
              </th>
              <th className="p-2" scope="col">
                Have Corner
              </th>
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
            {shapes.map(function (shape, index) {
              return (
                <tr
                  className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                  key={index}
                >
                  <td className="p-2" data-label="No">
                    {index + 1}
                  </td>
                  <td className="p-2" data-label="Name">
                    {shape.name}
                  </td>
                  <td className="p-2" data-label="Have Corner">
                    {shape.type == 0 ? "No" : "Yes"}
                  </td>
                  <td className="p-2" data-label="Unique Code">
                    {shape.code}
                  </td>
                  <td className="p-2" data-label="Visibility">
                    <img
                      className="block m-auto midget:mr-0"
                      src={
                        shape.is_visible == 1
                          ? "/assets/icons/IconVisible.svg"
                          : "/assets/icons/IconInvisible.svg"
                      }
                      alt=""
                    />
                  </td>
                  <td className="p-2" data-label="Action">
                    <div className="flex gap-1 flex-wrap justify-center midget:justify-end">
                      <MiniButtonWithIcon
                        colorBorder="black"
                        colorBg="black"
                        colorText="white"
                        action={() => handleDetailEdge(shape.id)}
                        cssImg="scale-[60%]"
                        img="/assets/icons/IconEdge.svg"
                        name="Edge"
                      />
                      <MiniButtonWithIcon
                        colorBorder="primary"
                        colorBg="primary"
                        colorText="white"
                        action={() => handleEditForm(shape.id)}
                        img="/assets/icons/IconEdit.svg"
                        name="Edit"
                      />
                      {context.accessRights == 1 ? (
                        <button
                          className="flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                          onClick={() => handleDelete(shape.id)}
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

      {/* FORM MODAL SHAPE */}
      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
          (isOpenFormShape === true
            ? "opacity-100 visible"
            : "opacity-0 invisible")
        }
      >
        <form
          className={
            "fixed max-h-[100vh] xl:w-[45%] md:w-[70%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenFormShape === true
              ? "opacity-100 visible"
              : "opacity-0 invisible")
          }
          onSubmit={handleSubmitShape}
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
                  placeholder="Input the name"
                  onChange={handleChangeForm}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Code*</span>
                <input
                  type="text"
                  value={form.code}
                  name="code"
                  placeholder="Input the code"
                  onChange={handleChangeForm}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Have a corner ?*</span>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChangeForm}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </select>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Visibility*</span>
                <select
                  name="is_visible"
                  value={form.is_visible}
                  onChange={handleChangeForm}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  <option value={1}>Visible</option>
                  <option value={0}>Invisible</option>
                </select>
              </div>

              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Icon*</span>
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
                        src={"../assets/img/2D/shape/"+ getImg }
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
                      name="file"
                      url={form.file}
                      onChange={handleChangeForm}
                      accept="image/*"
                      className='w-[65px] rounded-[5px] after:absolute after:cursor-pointer after:top-0 after:right-0 after:p-1 after:h-full after:content-["Choose-File"] after:flex after:justify-center after:items-center after:font-jakarta after:md:text-sm after:text-xs after:font-light after:text-white after:bg-orange-600 after:rounded-[5px] col hover:after:bg-orange-500'
                    />
                  </span>
                </span>
              </div>

              <div className="flex gap-3 justify-end">
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
                  data-bs-toggle="tooltip"
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

export default TopAdmin;

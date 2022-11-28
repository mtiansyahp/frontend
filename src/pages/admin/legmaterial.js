import React, { useContext, useEffect, useState } from "react";
import { AddButton, SearchBar, MiniButtonWithIcon, LoadingSpinner } from "../../components";
import { AdminContext } from "../../config/context/adminContext";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

import * as constants from "../../constants";

const LegMaterial = () => {
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

  //Pagination
  const [materialbottom, setMaterialBottom] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const [form, setForm] = useState({
    name: "",
    code: "",
    is_visible: "",
  });

  const handleChangeForm = (e) => {
    let data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  const resetForm = () => {
    setIsOpenForm(false);
    setMsgValidation([]);
    setIsUpdate(false);
    setForm({
      name: "",
      code: "",
      is_visible: "",
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

  function handleEdit(id) {
    setIsOpenForm(true);
    setIsUpdate(true);
    setIdUpdate(id);
    let data = [...materialbottom];
    let foundData = data.find((matbtm) => matbtm.id === id);

    setForm({
      name: foundData.name,
      code: foundData.code,
      is_visible: foundData.is_visible,
    });
  }

  // CRUD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newData = {
      name: form.name,
      code: form.code,
      is_visible: form.is_visible,
    };

    if (!isUpdate) {
      await axios
        .post(base_url + "/material-bottom/add-material-bottom", newData, {
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
        .put(base_url + "/material-bottom/update-material-bottom/" + idUpdate, newData, {
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

    getMatrialBottom();
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

          await axios.delete(base_url + "/material-bottom/delete-material-bottom/" + id).then((response) => {
            if (response.data.success) {
              setLoading(false);
              setIsOpenForm(false);

              Swal.fire({
                icon: "success",
                text: response.data.message,
              });

              getMatrialBottom();
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

  const getMatrialBottom = async (e) => {
    const response = await axios.get(`${base_url}/material-bottom/get-material-bottom?search_query=${keyword}&page=${page}&limit=${limit}`);

    setMaterialBottom(response.data.data.result);
    setPage(response.data.data.page);
    setPages(response.data.data.totalPage);
    setRows(response.data.data.totalRows);
  };

  useEffect(() => {
    getMatrialBottom();
  }, [keyword, page]);
  return (
    <section className={"top-[50px] h-full relative p-5 bg-[#FFF3E5] " + (context.navResponsive == true ? "lg:ml-[230px] ml-[55px]" : "ml-[55px]")}>
      <div className="flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6">
        <SearchBar value={query} actionChange={(e) => setQuery(e.target.value)} action={findData} idIpt="searchIpt" idBtn="searchBtn" />
        <AddButton name="Add Material" action={() => setIsOpenForm(true)} />
      </div>

      <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
        <table className="sm:w-full w-max border border-black" id="table--Leg__Material">
          <thead>
            <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
              <th className="p-2" scope="col">
                No
              </th>
              <th className="p-2" scope="col">
                Name
              </th>
              <th className="p-2" scope="col">
                Unique Code
              </th>
              <th className="p-2" scope="col">
                Visible
              </th>
              <th className="p-2" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {materialbottom.map((matbtm, index) => (
              <tr className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal" key={index}>
                <td className="p-2" data-label="No">
                  {index + 1}
                </td>
                <td className="p-2" data-label="Name">
                  {matbtm.name}
                </td>
                <td className="p-2" data-label="Unique Code">
                  {matbtm.code}
                </td>
                <td className="p-2" data-label="Visible">
                  <img className="block m-auto midget:mr-0" src={matbtm.is_visible == 1 ? "../../assets/icons/IconVisible.svg" : "../../assets/icons/IconInvisible.svg"} alt="" />
                </td>
                <td className="p-2" data-label="Action">
                  <div className="flex gap-1 flex-wrap justify-center midget:justify-end">
                    <MiniButtonWithIcon colorBorder="primary" colorBg="primary" colorText="white" action={() => handleEdit(matbtm.id)} img="/assets/icons/IconEdit.svg" name="Edit" />
                    {context.accessRights == 1 ? (
                      <button className="flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white" onClick={() => handleDelete(matbtm.id)}>
                        <img src="/assets/icons/IconClose.svg" name="Delete" alt="" />
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-jakarta lg:text-base md:text-sm text-xs">
        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
      </p>

      <nav key={rows} role="navigation" aria-label="pagination">
        <ReactPaginate
          previousLabel={<img className="h-[30px] w-[30px] p-[11px] object-cover" src="/assets/icons/IconArrowLeft.svg" alt="Prev" />}
          nextLabel={<img className="h-[30px] w-[30px] p-[11px] object-cover rotate-180" src="/assets/icons/IconArrowLeft.svg" alt="Next" />}
          breakLabel={"..."}
          pageCount={pages}
          pageRangeDisplayed={2}
          onPageChange={changePage}
          containerClassName={"flex items-center justify-center"}
          pageClassName={"h-[30px] w-[30px] flex items-center justify-center border border-primary ml-[-1px]"}
          activeClassName={"h-[30px] w-[30px] flex items-center justify-center border border-primary ml-[-1px] bg-primary text-white"}
          pageLinkClassName={"font-jakarta lg:text-base md:text-sm text-xs"}
          previousClassName={"h-[30px] w-[30px] flex items-center justify-center border border-primary rounded-l-lg"}
          nextClassName={"h-[30px] w-[30px] flex items-center justify-center border border-primary ml-[-1px] rounded-r-lg"}
          previousLinkClassName={"font-jakarta lg:text-base md:text-sm text-xs"}
          nextLinkClassName={"font-jakarta lg:text-base md:text-sm text-xs"}
        />
      </nav>

      {/* MODAL FORM */}
      <div className={"fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " + (isOpenForm == true ? "opacity-100 visible" : "opacity-0 invisible")}>
        <form
          className={
            "fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenForm == true ? "opacity-100 visible" : "opacity-0 invisible")
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
                  name="name"
                  value={form.name}
                  onChange={handleChangeForm}
                  placeholder="Input Name"
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Code*</span>
                <input
                  name="code"
                  value={form.code}
                  onChange={handleChangeForm}
                  placeholder="Input Code"
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
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

              <div className="flex gap-3 justify-end col-span-2">
                <span className="flex items-center gap-2 border bg-red-700 hover:bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer" onClick={resetForm} title="Cancel" data-bs-toggle="tooltip">
                  <img src="/assets/icons/IconClose.svg" alt="Cancel" />
                  <p>Cancel</p>
                </span>
                <button className="flex items-center gap-2 border bg-primary hover:bg-green-800 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white" type="submit" title="Save" data-bs-toggle="tooltip">
                  <img className="scale-[65%]" src="/assets/icons/IconCheckWhite.svg" alt="" />
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


export default LegMaterial;
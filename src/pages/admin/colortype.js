import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AddButton, SearchBar, MiniButtonWithIcon, LoadingSpinner } from "../../components";
import { AdminContext } from "../../config/context/adminContext";
import axios from "axios";
import ReactPaginate from "react-paginate";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import * as constants from "../../constants";

const MySwal = withReactContent(Swal);

const ColorType = () => {
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false)

  //Pagination
  const [colorType, setColorType] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const [form, setForm] = useState({
    name: "",
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
    let data = [...colorType];
    let foundData = data.find((dcolorType) => dcolorType.id === id);

    setForm({
      name: foundData.name,
    });
  }

  // CRUD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    let newData = {
      name: form.name,
    };

    if (!isUpdate) {
      await axios
        .post(base_url + "/color-type/add-color-type", newData)
        .then((response) => {
          setLoading(false)

          if (response.data.success) {
            // alert(response.data.message);
            Swal.fire({
              icon: "success",
              text: response.data.message,
            });
            resetForm();
          } else {
            setMsgValidation(response.data.message);
          }
        });
    } else {
      await axios
        .put(base_url + "/color-type/update-color-type/" + idUpdate, newData)
        .then((response) => {
          setLoading(false)

          if (response.data.success) {
            // alert(response.data.message);
            Swal.fire({
              icon: "success",
              text: response.data.message,
            });
            resetForm();
            
          } else {
            setMsgValidation(response.data.message);
          }
        });
    }

    getColorType();
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
          setLoading(true)

          await axios.delete(
            base_url + "/color-type/delete-color-type/" + id
          ).then(response => {
            if (response.data.success) {
              setLoading(false)
              setIsOpenForm(false);

              Swal.fire({
                icon: "success",
                text: response.data.message,
              });

              getColorType();
            }
          });
        } catch (err) {
          setLoading(false)
          setIsOpenForm(false);
          Swal.fire("Maaf, data gagal dihapus", "", "error");
        }
      }
    });

  };

  const getColorType = async (e) => {
    const response = await axios.get(
      `${base_url}/color-type/get-color-type?search_query=${keyword}&page=${page}&limit=${limit}`
    );

    setColorType(response.data.data.result);
    setPage(response.data.data.page);
    setPages(response.data.data.totalPage);
    setRows(response.data.data.totalRows);
  };

  useEffect(() => {
    getColorType();
  }, [keyword, page]);

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
          idIpt="searchIpt"
          idBtn="searchBtn"
        />
        <AddButton name="Add Edge" action={() => setIsOpenForm(true)} />
      </div>

      <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
        <table className="sm:w-full w-max border border-black">
          <thead>
            <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
              <th className="p-2">No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {colorType.map((dcolorType, index) => (
              <tr
                className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                key={index}
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{dcolorType.name}</td>
                <td className="p-2">
                  <div className="flex gap-1 flex-wrap justify-center">
                    <MiniButtonWithIcon
                      colorBorder="primary"
                      colorBg="primary"
                      colorText="white"
                      action={() => handleEdit(dcolorType.id)}
                      img="/assets/icons/IconEdit.svg"
                      name="Edit"
                    />
                    <button
                      className="flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                      onClick={() => handleDelete(dcolorType.id)}
                    >
                      <img src="/assets/icons/IconClose.svg" name="Delete" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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

      {/* MODAL FORM */}
      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
          (isOpenForm == true ? "opacity-100 visible" : "opacity-0 invisible")
        }
      >
        <form
          className={
            "fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenForm == true ? "opacity-100 visible" : "opacity-0 invisible")
          }
          onSubmit={handleSubmit}
        >
          {
            (!loading)
            ? <>
                <div>
                  {msgValidation.length > 0 ? (
                    msgValidation.map((validation, index) => (
                      <p
                        className="font-jakarta text-base self-start mb-2"
                        key={index}
                      >
                        {validation}
                      </p>
                    ))
                  ) : (
                    <p className="font-jakarta text-base self-start mb-2">
                      {singleMsg}
                    </p>
                  )}
                </div>
                <label className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3">
                  <span>Name*</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChangeForm}
                    placeholder="Input Name"
                    className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1"
                  />
                </label>

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
            : <LoadingSpinner />
          }
        </form>
      </div>
    </section>
  );
};

export default ColorType;

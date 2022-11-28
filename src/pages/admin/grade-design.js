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

const GradeDesign = () => {
  const navigate = useNavigate();
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [isOpenFormGrade, setIsOpenFormGrade] = useState(false);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

  //Pagination
  const [grades, setGrades] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const [formGrade, setFormGrade] = useState({
    name: "",
    type_top: ""
  });

  const handleChangeGrade = (e) => {
    e.preventDefault();
    let data = { ...formGrade };
    data[e.target.name] = e.target.value;
    console.log(data[e.target.name])
    setFormGrade(data);
  };

  const resetForm = () => {
    setIsOpenFormGrade(false);
    setMsgValidation([]);
    setSingleMsg('')
    setIsUpdate(false);
    setFormGrade({
      name: "",
      type_top: ""
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
    setIsOpenFormGrade(true);
    setIsUpdate(true);
    setIdUpdate(id);
    let data = [...grades];
    let foundData = data.find((grade) => grade.id === id);

    setFormGrade({
      name: foundData.name,
      type_top: foundData.type_top
    });
  }

  const handleSubmitGrade = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newData = {
      name: formGrade.name,
      type_top: formGrade.type_top
    };

    if (!isUpdate) {
      await axios.post(base_url + "/grade/add-grade", newData).then((response) => {
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
        .put(base_url + "/grade/update-grade/" + idUpdate, newData)
        .then((response) => {
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

    getGrade();
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
          setIsOpenFormGrade(true);
          setLoading(true);

          await axios
            .delete(base_url + "/top/delete-top/" + id)
            .then((response) => {
              if (response.data.success) {
                setLoading(false);
                setIsOpenFormGrade(false);

                Swal.fire({
                  icon: "success",
                  text: response.data.message,
                });

                getGrade();
              }
            });
        } catch (err) {
          setLoading(false);
          setIsOpenFormGrade(false);
          Swal.fire("Maaf, data gagal dihapus", "", "error");
        }
      }
    });
  };

  const getGrade = async (e) => {
    const response = await axios.get(
      base_url +
        `/grade/get-grade?search_query=${keyword}&page=${page}&limit=${limit}`
    );

    setGrades(response.data.data.result);
    setPage(response.data.data.page);
    setPages(response.data.data.totalPage);
    setRows(response.data.data.totalRows);
  };

  useEffect(() => {
    getGrade();
  }, [keyword, page]);

  function handleDetailPrice(id) {
    let data = [...grades];
    let foundData = data.find((grade) => grade.id === id);

    navigate("/admin/detail-price-for-grade", {
      state: { id: id, name: foundData.name, type_top:foundData.type_top },
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
        <AddButton name="Add Grade" action={() => setIsOpenFormGrade(true)} />
      </div>

      <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
        <table
          className="sm:w-full w-max border border-black"
          id="table--Grade"
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {grades.map(function (grade, index) {
              return (
                <tr
                  className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                  key={index}
                >
                  <td className="p-2" data-label="No">
                    {index + 1}
                  </td>
                  <td className="p-2" data-label="Name">
                    {grade.name}
                  </td>
                  <td className="p-2" data-label="Name">
                    {grade.type_top != 0 ? "Yes" : "No"}
                  </td>
                  <td className="p-2" data-label="Action">
                    <div className="flex gap-1 flex-wrap justify-center midget:justify-end">
                      <MiniButtonWithIcon
                        colorBorder="black"
                        colorBg="black"
                        colorText="white"
                        action={() => handleDetailPrice(grade.id)}
                        cssImg="scale-[60%]"
                        img="/assets/icons/IconPrice.svg"
                        name="Price"
                      />
                      <MiniButtonWithIcon
                        colorBorder="primary"
                        colorBg="primary"
                        colorText="white"
                        action={() => handleEditForm(grade.id)}
                        img="/assets/icons/IconEdit.svg"
                        name="Edit"
                      />
                      {context.accessRights == 1 ? (
                        <button
                          className="flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                          onClick={() => handleDelete(grade.id)}
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

      {/* FORM MODAL GRADE */}
      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
          (isOpenFormGrade === true
            ? "opacity-100 visible"
            : "opacity-0 invisible")
        }
      >
        <form
          className={
            "fixed max-h-[100vh] xl:w-[45%] md:w-[70%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenFormGrade === true
              ? "opacity-100 visible"
              : "opacity-0 invisible")
          }
          onSubmit={handleSubmitGrade}
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
                  type_top="text"
                  value={formGrade.name}
                  name="name"
                  placeholder="Input the name"
                  onChange={handleChangeGrade}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Have a corner ?*</span>
                <select
                  name="type_top"
                  value={formGrade.type_top}
                  onChange={handleChangeGrade}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </select>
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
                  type_top="submit"
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

export default GradeDesign;

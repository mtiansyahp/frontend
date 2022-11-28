import React, { useContext, useEffect, useState } from "react";
import {
  AddButton,
  MiniButtonWithIcon,
  LoadingSpinner,
} from "../../components";
import { AdminContext } from "../../config/context/adminContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { formatRupiah } from "../../utils";
import * as constants from "../../constants";

const DetailPriceForGrade = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dimensions, setDimensions] = useState([])
  const [gradeDetail, setGradeDetail] = useState([])

  const [form, setForm] = useState({
    id_grade: location.state.id,
    id_seaters: "",
    harga: ""
  });

  const handleChange = (e) => {
    e.preventDefault();

    let data = { ...form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };

  const resetForm = () => {
    setIsOpenForm(false);
    setMsgValidation([]);
    setSingleMsg('');
    setIsUpdate(false);
    setForm({
      id_grade: location.state.id,
      id_seaters: "",
      harga: ""
    });
  };

  const handleEdit = async (id) => {
    setIsOpenForm(true);
    setIsUpdate(true);
    setIdUpdate(id);
    setMsgValidation([]);
    console.log("ID", id)
    let data = [...gradeDetail];
    let foundData = data.find((value) => value.id === id);

    setForm({
      id_grade: location.state.id,
      id_seaters: foundData.id_seaters,
      harga: foundData.harga
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newData = {
      id_grade: location.state.id,
      id_seaters: form.id_seaters,
      harga: form.harga
    };

    if (!isUpdate) {
      await axios
        .post(base_url + "/grade/add-grade-detail", newData, {
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
        .put(base_url + "/grade/update-grade-detail/" + idUpdate, newData, {
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

    getGradeDetail();
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
            .delete(base_url + "/grade/delete-grade-detail/" + id)
            .then((response) => {
              if (response.data.success) {
                setLoading(false);
                setIsOpenForm(false);

                Swal.fire({
                  icon: "success",
                  text: response.data.message,
                });

                getGradeDetail();
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

  const getDimensions = async (e) => {
    const response = await axios.get(`${base_url}/seaters/get-by-type-admin/${location.state.type_top}`);
    setDimensions(response.data.data);
  };

  const getGradeDetail = async (e) => {
    const response = await axios.get(`${base_url}/grade/get-grade-detail-by-type-top-grade/${location.state.type_top}/${location.state.id}`);
    setGradeDetail(response.data.data);
  };

  useEffect(() => {
    getDimensions();
    getGradeDetail();
  }, []);

  const handleCancelDetailPrice = () => {
    navigate("/admin/grade-design");
    setGradeDetail([]);
  };

  return (
    <section>
      <div className="fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500">
        <div className="fixed h-[80%] xl:w-[45%] md:w-[70%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow overflow-x-auto scrollbar-custom">
          <div className="flex justify-between items-center mb-5">
            <p className="font-jakarta lg:text-2xl md:text-xl text-lg font-bold">
              {location.state.name}
            </p>
            <img
              className="cursor-pointer hover:bg-orange-500"
              onClick={handleCancelDetailPrice}
              src="/assets/icons/IconCloseBlack.svg"
              title="Close"
              data-bs-toggle="tooltip"
              alt=""
            />
          </div>

          <AddButton name="Add Price" action={() => setIsOpenForm(true)} />
          <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mt-3">
            <table
              className="sm:w-full w-max border border-black"
              id="table--Rounded_Corner"
            >
              <thead>
                <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
                  <th className="p-2" scope="col">
                    No
                  </th>
                  <th className="p-2" scope="col">
                    Dimension
                  </th>
                  <th className="p-2" scope="col">
                    Price
                  </th>
                  <th className="p-2" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {gradeDetail.map((value, index) => (
                  <tr
                    className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                    key={index}
                  >
                    <td className="p-2" data-label="No">
                      {index + 1}
                    </td>
                    <td className="p-2" data-label="Dimension">
                      {value.name}
                    </td>
                    <td className="p-2" data-label="Price">
                      {formatRupiah(value.harga)} 
                    </td>
                    <td className="p-2" data-label="Action">
                      <div className="flex gap-1 flex-wrap justify-center midget:justify-end">
                        <MiniButtonWithIcon
                          colorBorder="primary"
                          colorBg="primary"
                          colorText="white"
                          action={() => handleEdit(value.id)}
                          img="/assets/icons/IconEdit.svg"
                          name="Edit"
                        />
                        {context.accessRights == 1 ? (
                          <button
                            className="flex items-center gap-1 bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                            onClick={() => handleDelete(value.id)}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FORM MODAL */}
      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
          (isOpenForm === true ? "opacity-100 visible" : "opacity-0 invisible")
        }
      >
        <form
          className={
            "fixed h-auto xl:w-[45%] md:w-[70%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-1 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
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
                  value={location.state.name}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                  disabled
                />
                
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Dimension*</span>
                <select
                  name="id_seaters"
                  value={form.id_seaters}
                  onChange={handleChange}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  {
                    dimensions.map((value, index) => {
                      return <option value={value.id} key={index}>{value.name}</option>
                    })
                  }
                </select>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Price*</span>
                <input
                  type="text"
                  value={form.harga}
                  name="harga"
                  placeholder="Input the name"
                  onChange={handleChange}
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-span-2"
                />
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

export default DetailPriceForGrade;

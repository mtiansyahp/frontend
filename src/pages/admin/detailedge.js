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

import * as constants from "../../constants";

const DetailEdge = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [edgeByTop, setEdgeByTop] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [preview3D, setPreview3D] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id_master_top: location.state.id,
    id_master_edge: "",
    three_d_file: "",
    is_visible: "",
  });

  const handleChange = (e) => {
    e.preventDefault();

    let data = { ...form };
    data[e.target.name] = e.target.value;
    if (e.target.files) {
      data[e.target.name] = e.target.files[0];
    }
    if (e.target.name == "three_d_file") {
      setPreview3D(e.target.files[0].name);
    }

    setForm(data);
  };

  const resetForm = () => {
    setIsOpenForm(false);
    setMsgValidation([]);
    setPreview3D("");
    setIsUpdate(false);
    setForm({
      id_master_top: location.state.id,
      id_master_edge: "",
      three_d_file: "",
      is_visible: "",
    });
  };

  const handleEdit = async (id) => {
    setIsOpenForm(true);
    setIsUpdate(true);
    setIdUpdate(id);
    let data = [...edgeByTop];
    let foundData = data.find((dEdgeByTop) => dEdgeByTop.id === id);
    setPreview3D(foundData.three_d_file);

    setForm({
      id_master_top: foundData.id_master_top,
      id_master_edge: foundData.id_master_edge,
      three_d_file: foundData.three_d_file,
      is_visible: foundData.is_visible,
    });
  };

  const handleSubmitPattern = async (e) => {
    e.preventDefault();
    setLoading(true);

    let newData = {
      id_master_top: form.id_master_top,
      id_master_edge: form.id_master_edge,
      three_d_file: form.three_d_file,
      is_visible: form.is_visible,
    };

    if (!isUpdate) {
      await axios
        .post(base_url + "/topthreed/add-top-threed", newData, {
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
        .put(base_url + "/topthreed/update-top-threed/" + idUpdate, newData, {
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

    getEdgeByTop();
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
            .delete(base_url + "/topthreed/delete-top-threed/" + id)
            .then((response) => {
              if (response.data.success) {
                setLoading(false);
                setIsOpenForm(false);

                Swal.fire({
                  icon: "success",
                  text: response.data.message,
                });

                getEdgeByTop();
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

  const getEdgeByTop = async (e) => {
    const response = await axios.get(
      `${base_url}/topthreed/get-by-top-admin/${location.state.id}`
    );
    setEdgeByTop(response.data.data);
  };

  const getEdges = async (e) => {
    const response = await axios.get(`${base_url}/edges/get-all-edges`);
    setEdges(response.data.data);
  };

  useEffect(() => {
    getEdgeByTop();
    getEdges();
  }, []);

  const handleCancelDetailEdge = () => {
    navigate("/admin/top-shape");
    setEdgeByTop([]);
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
              onClick={handleCancelDetailEdge}
              src="/assets/icons/IconCloseBlack.svg"
              title="Close"
              data-bs-toggle="tooltip"
            />
          </div>

          <AddButton name="Add Edge" action={() => setIsOpenForm(true)} />
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
                    Name
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
                {edgeByTop.map((dEdgeByTop, index) => (
                  <tr
                    className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                    key={index}
                  >
                    <td className="p-2" data-label="No">
                      {index + 1}
                    </td>
                    <td className="p-2" data-label="Name">
                      {dEdgeByTop.Edge.name}
                    </td>
                    <td className="p-2" data-label="Visibility">
                      <img
                        className="block m-auto midget:mr-0"
                        src={
                          dEdgeByTop.is_visible == 1
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
                          action={() => handleEdit(dEdgeByTop.id)}
                          img="/assets/icons/IconEdit.svg"
                          name="Edit"
                        />
                        {context.accessRights == 1 ? (
                          <button
                            className="flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                            onClick={() => handleDelete(dEdgeByTop.id)}
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

      {/* FORM MODAL TEXTURE */}
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
                <span>Upload GLTF*</span>
                <span className="flex flex-col col-span-2">
                  {preview3D && (
                    <p className="mb-1 text-xs text-center">{preview3D}</p>
                  )}
                  <span className="relative ml-auto">
                    <input
                      type="file"
                      name="three_d_file"
                      url={form.three_d_file}
                      onChange={handleChange}
                      className='w-[65px] rounded-[5px] after:absolute after:cursor-pointer after:top-0 after:right-0 after:p-1 after:h-full after:content-["Choose-File"] after:flex after:justify-center after:items-center after:font-jakarta after:md:text-sm after:text-xs after:font-light after:text-white after:bg-orange-600 after:rounded-[5px] col hover:after:bg-orange-500'
                    />
                  </span>
                </span>
              </div>
              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Edges*</span>
                <select
                  name="id_master_edge"
                  value={form.id_master_edge}
                  onChange={handleChange}
                  className="font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5 cursor-pointer hover:drop-shadow-lg col-span-2"
                >
                  <option value="">Choose one</option>
                  {edges.map(function (edge, index) {
                    return (
                      <option value={edge.id} key={index}>
                        {edge.name}
                      </option>
                    );
                  })}
                </select>
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

export default DetailEdge;

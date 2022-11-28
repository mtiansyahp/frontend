import React, { useContext, useEffect, useState } from "react";
import {
  AddButton,
  SearchBar,
  MiniButtonWithIcon,
  LoadingSpinner,
} from "../../components";
import { AdminContext } from "../../config/context/adminContext";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import "tw-elements";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import * as constants from "../../constants";
import RichTextEditor from 'react-rte';

// import Tiptap from "../../components/admin/tiptap";
// import Quillce from "../../components/admin/QuillCe";

const Kbce = () => {
  const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'}
    ],
    BLOCK_TYPE_DROPDOWN: [
      {label: 'Normal', style: 'unstyled'},
      {label: 'Heading Large', style: 'header-one'},
      {label: 'Heading Medium', style: 'header-two'},
      {label: 'Heading Small', style: 'header-three'}
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'}
    ]
  };
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [isOpenFormKnowledgeBase, setIsOpenFormKnowledgeBase] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

  //Pagination
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const [formKnowledgeBase, setFormKnowledgeBase] = useState({
    title: "",
    explanation: ""
  });

  const handleChangeForm = (e) => {
    let data = { ...formKnowledgeBase };
    data[e.target.name] = e.target.value;
    setFormKnowledgeBase(data);
  };

  const resetForm = () => {
    setIsOpenFormKnowledgeBase(false);
    setMsgValidation([]);
    setIsUpdate(false);
    setFormKnowledgeBase({
      title: "",
      explanation: ""
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

  function handleEditKnowledgeBase(id) {
    setIsOpenFormKnowledgeBase(true);
    setIsUpdate(true);
    setIdUpdate(id);
    let data = [...knowledgeBase];
    let foundData = data.find((knowledge_base) => knowledge_base.id === id);

    setFormKnowledgeBase({
      title: foundData.title,
      explanation: foundData.explanation,
    });
  }

  // CRUD
  const handleSubmitKnowledgeBase = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formKnowledgeBase.explanation)
    let newData = {
      title: formKnowledgeBase.title,
      explanation: formKnowledgeBase.explanation,
    };

    if (!isUpdate) {
      await axios
        .post(base_url + "/knowledge-base/add-knowledge-base", newData)
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
        .put(base_url + "/knowledge-base/update-knowledge-base/" + idUpdate, newData)
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

    getKnowledgeBase();
  };

  const handleDeleteKnowledgeBase = async (id) => {
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
          setIsOpenFormKnowledgeBase(true);
          setLoading(true);

          await axios
            .delete(base_url + "/knowledge-base/delete-knowledge-base/" + id)
            .then((response) => {
              if (response.data.success) {
                setLoading(false);
                setIsOpenFormKnowledgeBase(false);

                Swal.fire({
                  icon: "success",
                  text: response.data.message,
                });

                getKnowledgeBase();
              }
            });
        } catch (err) {
          setLoading(false);
          setIsOpenFormKnowledgeBase(false);
          Swal.fire("Maaf, data gagal dihapus", "", "error");
        }
      }
    });
  };

  const getKnowledgeBase = async (e) => {
    const response = await axios.get(
      `${base_url}/knowledge-base/get-knowledge-base?search_query=${keyword}&page=${page}&limit=${limit}`
    );

    setKnowledgeBase(response.data.data.result);
    setPage(response.data.data.page);
    setPages(response.data.data.totalPage);
    setRows(response.data.data.totalRows);
  };

  useEffect(() => {
    getKnowledgeBase();
  }, [keyword, page]);

  // Quill
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  const handleChangeEditor = (value) => {
    console.log(value.toString('html'))
    let data = { ...formKnowledgeBase };
    data["explanation"] = value;
    setFormKnowledgeBase(data);
  }

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
    }
  }
  /* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  const domExplanation = (value) => {
    console.log(value)
    return {__html: value};
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
        <AddButton name="Add Entry" action={() => setIsOpenFormKnowledgeBase(true)} />
      </div>

      <div className="overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3">
        <table className="sm:w-full w-max border border-black" id="table--kbce">
          <thead>
            <tr className="text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary">
              <th className="p-2" scope="col">
                No
              </th>
              <th className="p-2" scope="col">
                Title
              </th>
              {/* <th className="p-2" scope="col">
                Explanation
              </th> */}
              <th className="p-2" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {knowledgeBase.map((knowledge_base, index) => (
              <tr
                className="border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal"
                key={index}
              >
                <td className="p-2" data-label="No">
                  {index + 1}
                </td>
                <td className="p-2" data-label="No">
                  {knowledge_base.title}
                </td>
                {/* <td className="p-2" data-label="Name">
                    <div dangerouslySetInnerHTML={domExplanation(knowledge_base.explanation)} />
                </td> */}
                <td className="p-2" data-label="Action">
                  <div className="flex gap-1 flex-wrap justify-center midget:justify-end">
                    <MiniButtonWithIcon
                      colorBorder="primary"
                      colorBg="primary"
                      colorText="white"
                      action={() => handleEditKnowledgeBase(knowledge_base.id)}
                      img="/assets/icons/IconEdit.svg"
                      name="Edit"
                    />
                    {/* {context.accessRights == 1 ? (
                      ) : (
                        ""
                    )} */}
                      <button
                        className="flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white"
                        onClick={() => handleDeleteKnowledgeBase(knowledge_base.id)}
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

      {/* MODAL FORM USER */}
      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
          (isOpenFormKnowledgeBase == true
            ? "opacity-100 visible"
            : "opacity-0 invisible")
        }
      >
        <form
          className={
            "fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%]  top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 p-3 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenFormKnowledgeBase == true
              ? "opacity-100 visible"
              : "opacity-0 invisible")
          }
          onSubmit={handleSubmitKnowledgeBase}
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
                <span className="w-1/3">Title</span>
                <input
                  name="title"
                  value={formKnowledgeBase.title}
                  onChange={handleChangeForm}
                  placeholder="Input Title"
                  className="font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1 hover:drop-shadow-lg col-sp col-span-2"
                />
              </div>

              <div className="font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 gap-3 mb-3">
                <span>Explanation</span>
                  <ReactQuill
                    onChange={(e)=> {
                      let data = {...formKnowledgeBase};
                      data["explanation"] = e;
                      setFormKnowledgeBase(data)
                    }}
                    value={formKnowledgeBase.explanation}
                    modules={modules}
                    formats={formats}
                    className="flex-1 font-jakarta md:text-sm h-[300px] text-xs font-light placeholder:text-black rounded-[5px] p-1 hover:drop-shadow-lg col-sp col-span-2 overflow-y-none "
                    placeholder={"Input Explanation"}
                  />
              </div>

              <div className="flex gap-3 justify-end mt-[100px]">
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

export default Kbce;

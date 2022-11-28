import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../config/context/adminContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

import * as constants from "../../constants";

const Customers = () => {
  const base_url = constants.base_url;
  const context = useContext(AdminContext);
  const [msgValidation, setMsgValidation] = useState([]);
  const [singleMsg, setSingleMsg] = useState("");
  const [isOpenFormUser, setIsOpenFormUser] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState(0);
  const [loading, setLoading] = useState(false)

  //Pagination
  const [customer, setCustomer]  = useState([])
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");

  const [formUser, setFormUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChangeForm = (e) => {
    let data = { ...formUser };
    data[e.target.name] = e.target.value;
    setFormUser(data);
  };

  const resetForm = () => {
    setIsOpenFormUser(false);
    setMsgValidation([]);
    setIsUpdate(false);
    setFormUser({
      name: "",
      email: "",
      password: "",
    });
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  // useEffect(function () {
  //   const search = document.getElementById("searchIpt");
  //   search.addEventListener("keypress", function (e) {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       document.getElementById("searchBtn").click();
  //     }
  //   });
  // }, []);

  const findData = async (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  const getUsers = async (e) => {
    const response = await axios.get(
      `${base_url}/customer/get-customer`
    );

    setCustomer(response.data.data)

    // const response = await axios.get(
    //   `${base_url}/users/get-users?search_query=${keyword}&page=${page}&limit=${limit}`
    // );

    // setUsers(response.data.data.result);
    // setPage(response.data.data.page);
    // setPages(response.data.data.totalPage);
    // setRows(response.data.data.totalRows);
  };

  useEffect(() => {
    getUsers();
  }, [keyword, page]);

  return (
    <section
      className={
        "top-[50px] h-full relative p-5 bg-[#FFF3E5] " +
        (context.navResponsive == true
          ? "lg:ml-[230px] ml-[55px]"
          : "ml-[55px]")
      }
    >

      <div>

        {
          customer.map((dCust, index) => {
            return(

              <Link
                to='/admin/customer-activity'
                state={{  phone : dCust.phone,
                          total : dCust.total_orders + dCust.total_wishlist,
                          last_visit : dCust.last_login == null ? 'Unknown' : dCust.last_login,
                          last_ip : dCust.ip_address == null ? 'Unknown' : dCust.ip_address,
                          locate : dCust.lat == null ? 'Unknown' : dCust.lat
                }}
              >
                <div class="p-4 w-full text-center bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-5">
                  {/* <div className="flex">
                    <div className="grid grid-cols-5 gap-10">
                      <div className="flex text-left flex-col">
                        <p className="text-sm">Phone Number</p>
                        <p className="text-base font-bold">{dCust.phone}</p>
                      </div>
                      <div className="flex text-left flex-col">
                        <p className="text-sm">Total Enquiry</p>
                        <p className="text-base font-bold">{dCust.total_orders + dCust.total_wishlist}</p>
                      </div>
                      <div className="flex text-left flex-col">
                        <p className="text-sm">Last Visit</p>
                        <p className="text-base font-bold">{dCust.last_login == null ? 'Unknown' : dCust.last_login}</p>
                      </div>
                      <div className="flex text-left flex-col">
                        <p className="text-sm">Last Known IP</p>
                        <p className="text-base font-bold">{dCust.ip_address == null ? 'Unknown' : dCust.ip_address}</p>
                      </div>
                      <div className="flex text-left flex-col">
                        <p className="text-sm">Location</p>
                        <p className="text-base font-bold">{dCust.lat == null ? 'Unknown' : dCust.lat}</p>
                      </div>
                    </div>
                  </div> */}

                  <table className="w-1/2 text-sm text-left">
                    <thead className="font-normal">
                      <tr>
                        <td width={200}>Phone Number</td>
                        <td>Total Enquiry</td>
                        <td>Last Visit</td>
                        <td>Last Known IP</td>
                        <td>Location</td>
                      </tr>
                    </thead>
                    <tbody className="text-base font-bold">
                      <tr>
                        <td>{dCust.phone}</td>
                        <td>{dCust.total_orders + dCust.total_wishlist}</td>
                        <td>{dCust.last_login == null ? 'Unknown' : dCust.last_login}</td>
                        <td>{dCust.ip_address == null ? 'Unknown' : dCust.ip_address}</td>
                        <td>{dCust.lat == null ? 'Unknown' : dCust.lat}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Link>

            )
          })
        }

      </div>

      {/* <p className="font-jakarta lg:text-base md:text-sm text-xs">
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
      </nav> */}

      {/* MODAL FORM USER */}
      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
          (isOpenFormUser == true
            ? "opacity-100 visible"
            : "opacity-0 invisible")
        }
      >
        
      </div>
    </section>
  );
};

export default Customers;
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { createPopper, detectOverflow } from "@popperjs/core";
import { AdminContext } from "../../config/context/adminContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutAdmin } from '../../config/redux/reducer/auth-admin';

const popcorn = document.querySelector("#popcorn");
const tooltip = document.querySelector("#tooltip");
createPopper(popcorn, tooltip);

const HeaderAdmin = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isSideBar, setIsSideBar] = useState(true);
  const [titleLayout, setTitleLayout] = useState("");
  const context = useContext(AdminContext);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const goLeft = () => {
    setIsSideBar(!isSideBar);
    context.setNavResponsive(!context.navResponsive);
  };

  const changePage = (e, url, title) => {
    navigate(url);
    setTitleLayout(title);
  };

  const checkTitleLayout = () => {
    switch (pathname) {
      case "/admin":
        setTitleLayout("Dashboard");
        break;
      case "/admin/pattern":
        setTitleLayout("Pattern");
        break;
      case "/admin/top-shape":
        setTitleLayout("Top Shape");
        break;
      case "/admin/edge":
        setTitleLayout("Top Edge");
        break;
      case "/admin/seaters":
        setTitleLayout("Top Dimension");
        break;
      case "/admin/leg-design":
        setTitleLayout("Leg Design");
        break;
      case "/admin/leg-material":
        setTitleLayout("Leg Material");
        break;
      case "/admin/leg-color":
        setTitleLayout("Leg Color");
        break;
      // case "/admin/pattern-category":
      //   setTitleLayout("Pattern Category");
      //   break;
      // case "/admin/color-type":
      //   setTitleLayout("Color Type");
      //   break;
      case "/admin/users":
        setTitleLayout("Users");
        break;
      case "/admin/advanced-settings":
        setTitleLayout("Advanced Settings");
        break;
    }
  };

  useEffect(() => {
    checkTitleLayout();
    document.body.classList.add("relative", "min-h-screen", "bg-[#FFF3E5]");
  });

  const logout = async () => {
    dispatch(logoutAdmin())
    .unwrap()
    .then(res => {

      navigate("/login-admin")
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <section className="fixed z-[6] top-0 left-0 h-[50px] w-full flex justify-between items-center px-5 bg-primary text-white">
        <div className="flex items-center gap-5 lg:text-base md:text-sm text-xs">
          <img
            className={
              "w-6 ml-[-4px] cursor-pointer " +
              (isSideBar === true ? "" : "rotate-180")
            }
            src="/assets/icons/IconArrowWhiteCircle.svg"
            alt=""
            onClick={goLeft}
          />
          <div>
            <h2 className="font-jakarta md:text-base text-sm font-bold uppercase tracking-wide">
              {titleLayout}
            </h2>
            <p className="font-jakarta text-xs">Dashboard/MenuActive</p>
          </div>
        </div>
        <div>
          <div className="flex gap-5 items-center cursor-pointer">
            {/* NOTIFICATION */}
            {/* START */}

            <div>
              <div className="dropdown relative">
                <a
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="notification--data"
                >
                  <div className="h-[30px] aspect-square rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src="/assets/icons/IconNotifWhite.svg"
                      alt=""
                    />
                  </div>
                </a>
                <ul
                  className="dropdown-menu w-72 absolute hidden bg-white text-base z-50 float-right py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none right-0"
                  aria-labelledby="notification--data"
                >
                  <h6 className="text-zinc-900 font-semibold text-sm py-2 px-4 block w-full whitespace-nowrap  bg-gray-50">
                    NOTIFICATION
                  </h6>
                  <hr className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" />
                  <li>
                    <a
                      href="#"
                      className="flex py-3 px-4 border-b hover:bg-gray-100"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="w-11 h-11 rounded-full"
                          src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/bonnie-green.png"
                          alt="Jese image"
                        />
                        <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-fuchsia-600 rounded-full border border-white">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                            <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="pl-3 w-full">
                        <div className="text-gray-500 font-normal text-sm mb-1.5">
                          New message from{" "}
                          <span className="font-semibold text-gray-900">
                            Bonnie Green
                          </span>
                          : "Hey, what's up? All set for the presentation?"
                        </div>
                        <div className="text-xs font-medium text-fuchsia-500">
                          a few moments ago
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex py-3 px-4 border-b hover:bg-gray-100"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="w-11 h-11 rounded-full"
                          src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/leslie-livingston.png"
                          alt="Leslie image"
                        />
                        <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="pl-3 w-full">
                        <div className="text-gray-500 font-normal text-sm mb-1.5">
                          <span className="font-semibold text-gray-900">
                            Leslie Livingston
                          </span>{" "}
                          mentioned you in a comment:{" "}
                          <span className="font-medium text-teal-500" href="#">
                            @bonnie.green
                          </span>{" "}
                          what do you say?
                        </div>
                        <div className="text-xs font-medium text-fuchsia-500">
                          1 hour ago
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="inline-flex items-center ">
                        <svg
                          className="mr-2 w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                          <path
                            fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        View all
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* END */}
            <div className="flex gap-3 items-center cursor-pointer">
              {/* start */}
              <div>
                <div className="dropdown relative">
                  <a
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    id="user--data2"
                  >
                    <div className="h-[30px] aspect-square rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="/assets/images/DummyBlankProfile.jpg"
                        alt=""
                      />
                    </div>
                  </a>
                  <ul
                    className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none right-0"
                    aria-labelledby="user--data2"
                  >
                    <h6 className="text-zinc-900 font-semibold text-sm py-2 px-4 block w-full whitespace-nowrap bg-transparent">
                      Sign in as User 1
                    </h6>
                    <span className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900">
                      {context.name}
                    </span>
                    <hr className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" />
                    <li>
                      <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600"
                        href="#"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                        href="#"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                        href="#"
                      >
                        Something else here
                      </a>
                    </li>
                    <li>
                      <hr className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" />
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                        href="#" onClick={logout}
                      >
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end */}
            </div>
          </div>
        </div>
      </section>
      {/* side bar section*/}
      <section className="fixed z-[5] top-[50px] flex-shrink min-h-screen w-auto bg-primary font-jakarta text-white">
        <ul>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin" ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={(e) => changePage(e, "/admin", "Dashboard")}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminDashboard.svg"
              alt="Dashboard"
              title="Dashboard"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Dashboard
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/pattern"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/pattern", "Pattern")}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminTopPattern.svg"
              alt="Top Pattern"
              title="Top Pattern"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Pattern
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/top-shape"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/top-shape", "Top Shape")}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminTopShape.svg"
              alt="Top Shape"
              title="Top Shape"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Top Shape
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/edge"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/edge", "Top Edge")}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminTopEdge.svg"
              alt="Top Edge"
              title="Top Edge"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Top Edge
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/seaters"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/seaters", "Top Dimension")}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminTopDimension.svg"
              alt="Top Dimension"
              title="Top Dimension"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Top Dimension
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/leg-design"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/leg-design", "Leg Design")}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminLegDesign.svg"
              alt="Leg Design"
              title="Leg Design"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Leg Design
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/leg-material"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) =>
              changePage(e, "/admin/leg-material", "Leg Material")
            }
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminLegMaterial.svg"
              alt="Leg Material"
              title="Leg Material"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Leg Material
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/leg-color"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/leg-color", "Leg Color")}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminLegColor.svg"
              alt="Leg Color"
              title="Leg Color"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Leg Color
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/custom-table-default"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) =>
              changePage(e, "/admin/custom-table-default", "Custom Table Default")
            }
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminCustomTable.svg"
              alt="Custom Table Default"
              title="Custom Table Default"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Custom Table Default
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/table-sizing"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) =>
              changePage(e, "/admin/table-sizing", "Table Sizing")
            }
          >
            <img
              className="w-4"
              src="/assets/icons/IconScale.svg"
              alt="Table Sizing"
              title="Table Sizing"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Table Sizing
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/users"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/users", "Users")}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminUser.svg"
              alt="User"
              title="User"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Users
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/advanced-settings"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) =>
              changePage(e, "/admin/advanced-settings", "Advanced Settings")
            }
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminSetting.svg"
              alt="Advanced Settings"
              title="Advanced Settings"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Advanced Settings
            </span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default HeaderAdmin;

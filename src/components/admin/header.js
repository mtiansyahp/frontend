import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { createPopper, detectOverflow } from "@popperjs/core";
import { AdminContext } from "../../config/context/adminContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logoutAdmin } from "../../config/redux/reducer/auth-admin";

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
  const dispatch = useDispatch();

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
      case "/admin/grade-design":
        setTitleLayout("Grade Design");
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
      case "/admin/customers":
        setTitleLayout("Customers");
        break;
      case "/admin/users":
        setTitleLayout("Users");
        break;
      case "/admin/advanced-settings":
        setTitleLayout("Advanced Settings");
        break;
      case "/admin/faqce":
        setTitleLayout("FAQ");
        break;
      case "/admin/kbce":
        setTitleLayout("Knowledge Base");
        break;
      case "/admin/order-history":
          setTitleLayout("Order History");
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
      .then((res) => {
        navigate("/login-admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section className="fixed z-[6] top-0 left-0 h-[50px] w-full flex justify-between items-center px-5 bg-primary text-white">
        <div className="flex items-center gap-5">
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
                      Sign in as {context.name}
                    </h6>
                    <hr className="h-0 my-1 border border-solid border-t-0 border-gray-300 opacity-25" />
                    <li>
                      <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                        href="#"
                      >
                        Settings
                      </a>
                    </li>
                    <li></li>
                    <li>
                      <a
                        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-zinc-900 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
                        href="#"
                        onClick={logout}
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
      <section className="fixed z-[5] top-[50px] flex-shrink h-screen w-auto bg-primary font-jakarta text-white overflow-auto pb-[50px]">
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
              (pathname == "/admin/grade-design"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/grade-design", "Grade Design")}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminLegDesign.svg"
              alt="Grade Design"
              title="Grade Design"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Grade Design
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
              changePage(
                e,
                "/admin/custom-table-default",
                "Custom Table Default"
              )
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
              (pathname == "/admin/customers"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/customers", "Customers")}
          >
            <img
              className="w-4"
              src="/assets/icons/Icon_Customer.svg"
              alt="Customers"
              title="Customers"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Customers
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/orders-history"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/orders-history", "Order History")}
          >
            <img
              className="w-4"
              src="/assets/icons/Icon_Customer.svg"
              alt="Customers"
              title="Customers"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Order History
            </span>
          </li>
          {/* <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/PdfWishList"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) =>
              changePage(e, "/admin/PdfWishList", "PdfWishList")
            }
          >
            <img
              className="w-4"
              src="/assets/icons/Icon_PDF.svg"
              alt="Pdf Wish List"
              title="Pdf Wish List"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
            Pdf Wish List
            </span>
          </li> */}
          {/* <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/WishList"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) =>
              changePage(e, "/admin/WishList", "WishList")
            }
          >
            <img
              className="w-4"
              src="/assets/icons/Icon_Wishlist.svg"
              alt="Wish List"
              title="Wish List"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
            Wish List
            </span>
          </li> */}
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
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/faqce"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) => changePage(e, "/admin/faqce", "FAQ's")}
          >
            <img
              className="w-4"
              src="/assets/icons/Icon_FAQ.svg"
              alt="FAQ's"
              title="FAQ's"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              FAQ's
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (pathname == "/admin/kbce"
                ? "font-bold bg-[#05625E]"
                : "font-light")
            }
            onClick={(e) =>
              changePage(e, "/admin/kbce", "Knowledge Base")
            }
          >
            <img
              className="w-4"
              src="/assets/icons/Icon_KB.svg"
              alt="Knowledge Base"
              title="Knowledge Base"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Knowledge Base
            </span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default HeaderAdmin;
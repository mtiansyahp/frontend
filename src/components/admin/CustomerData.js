import { useState, useEffect } from "react";
import "tw-elements";

import TotalVisitor from "./TotalVisitor";
import FavLeg from "./FavLeg";
import FavPattern from "./FavPattern";
import TotalEnquiry from "./TotalEnquiry";
import axios from "axios";
import * as constants from '../../constants'
const base_url = constants.base_url

export default function CustomerData() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [range, setRange] = useState(0);
  const [totalVisitor, setTotalVisitor] = useState();
  const [totalWishlist, setTotalWishlist] = useState();
  const [favPattern, setFavPattern] = useState();
  const [favLeg, setFavLeg] = useState();

  useEffect(() => {
    const getVisitor = async () =>{
      const response = await axios.get(base_url+"/visitor/get-count-visitor/"+range);
      setTotalVisitor(response.data.data);
    }
    getVisitor()

    const getWishlist = async () =>{
      const response = await axios.get(base_url+"/wishlist/get-count-wishlist/"+range);
      setTotalWishlist(response.data.data);
    }
    getWishlist()

    const getFavPattern = async () =>{
      const response = await axios.get(base_url+"/wishlist/get-fav-pattern/"+range);
      setFavPattern(response.data.data[0]);
    }
    getFavPattern()

    const getFavLeg = async () =>{
      const response = await axios.get(base_url+"/wishlist/get-fav-leg/"+range);
      setFavLeg(response.data.data[0]);
    }
    getFavLeg()
  },[range])

  const [showAccordion, setShowAccordion] = useState(true);

  return (
    <>
      <div className={"accordion max-h-[480px]"} id="accordionCustomerData" >
        <div className={"accordion-item " + showAccordion ? "h-full" : ""  } >
          <h2 className="accordion-header mb-0" id="CD">
            <button
              className="accordion-button relative flex font-bold items-center w-full p-2 text-base text-gray-800 text-left bg-white border-0 rounded-none transition tracking-wide uppercase focus:outline-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCustomerData"
              aria-expanded="false"
              aria-controls="collapseCustomerData"
              onClick={()=> setShowAccordion(!showAccordion)}
            >
              <h3 className="midget:text-md lg:text-lg font-bold text-slate uppercase">
                Customer Data
              </h3>
            </button>
          </h2>
          
          <div
            id="collapseCustomerData"
            className="accordion-collapse collapse show "
            aria-labelledby="CD"
            data-bs-parent="#accordion"
          >
            <div className="accordion-body p-2 font-jakarta md:text-sm text-xs bg-white h-full overflow-auto">
              <ul
                className="nav nav-tabs flex flex-row sm:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 bg-primary"
                id="tabs-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <a
                    href="#tabs-today"
                    className={
                      "text-lime-800 nav-link block font-bold text-xs leading-tight uppercase p-3 hover:bg-green-800 hover:text-white hover:rounded-tl-md focus:bg-green-800 base:text-lime-900" +
                      (selectedTab == 0
                        ? " font-bold bg-[#05625E]"
                        : " font-light ")
                    }
                    id="tabs-today-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-today"
                    role="tab"
                    aria-controls="tabs-today"
                    aria-selected="true"
                    onClick={() => {
                      setSelectedTab(0)
                      setRange(0)
                    }}
                  >
                    Today
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    href="#tabs-week"
                    className={
                      "text-lime-800 nav-link block font-bold text-xs leading-tight uppercase p-3 hover:bg-green-800 hover:text-white hover:rounded-tl-md focus:bg-green-800 base:text-lime-900" +
                      (selectedTab == 1
                        ? " font-bold bg-[#05625E]"
                        : " font-light ")
                    }
                    id="tabs-week-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-week"
                    role="tab"
                    aria-controls="tabs-week"
                    aria-selected="false"
                    onClick={() => {
                      setSelectedTab(1)
                      setRange(7)
                    }}
                  >
                    Last week
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    href="#tabs-month"
                    className={
                      "text-lime-800 nav-link block font-bold text-xs leading-tight uppercase p-3 hover:bg-green-800 hover:text-white hover:rounded-tl-md focus:bg-green-800 base:text-lime-900" +
                      (selectedTab == 2
                        ? " font-bold bg-[#05625E]"
                        : " font-light ")
                    }
                    id="tabs-month-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-month"
                    role="tab"
                    aria-controls="tabs-month"
                    aria-selected="false"
                    onClick={() => {
                      setSelectedTab(2)
                      setRange(30)
                    }}
                  >
                    Last 30 Days
                  </a>
                </li>
              </ul>
              {/* Tab 1 */}
              <div className="tab-content" id="tabs-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="tabs-today"
                  role="tabpanel"
                  aria-labelledby="tabs-today-tab"
                >
                  <ul>
                    <li>
                      <TotalVisitor totalVisitor={totalVisitor} />
                    </li>
                    <li>
                      <TotalEnquiry totalWishlist={totalWishlist} />
                    </li>
                    <li>
                      <FavPattern favPattern={favPattern} />
                    </li>
                    <li>
                      <FavLeg favLeg={favLeg}  />
                    </li>
                  </ul>
                </div>
                {/* Tab 2 */}
                <div
                  className="tab-pane fade"
                  id="tabs-week"
                  role="tabpanel"
                  aria-labelledby="tabs-week-tab"
                >
                  <ul>
                    <li>
                      <TotalVisitor totalVisitor={totalVisitor} />
                    </li>
                    <li>
                      <TotalEnquiry totalWishlist={totalWishlist} />
                    </li>
                    <li>
                      <FavPattern favPattern={favPattern} />
                    </li>
                    <li>
                      <FavLeg favLeg={favLeg}  />
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="tabs-month"
                  role="tabpanel"
                  aria-labelledby="tabs-month-tab"
                >
                  <ul>
                    <li>
                      <TotalVisitor totalVisitor={totalVisitor} />
                    </li>
                    <li>
                      <TotalEnquiry totalWishlist={totalWishlist} />
                    </li>
                    <li>
                      <FavPattern favPattern={favPattern} />
                    </li>
                    <li>
                      <FavLeg favLeg={favLeg} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

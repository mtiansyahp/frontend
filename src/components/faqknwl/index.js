import { useState } from "react";
import "tw-elements";

import FaqCe from "./faq";
import Knwl from "./knwl";

export default function Faqknwl() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <>
    
      <ul
        className="nav nav-tabs flex gap-1 flex-wrap list-none mb-4 justify-center"
        id="tabs-tab-faqknwl"
        role="tablist"
      >
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-faq"
            className={
              (selectedTab == 0 ? "font-bold bg-green-800 text-white" : "font-light text-lime-800 bg-[#FFF3E5]")+"  block font-bold lg:text-base md:text-sm text-xs leading-tight uppercase py-2 px-10  hover:bg-green-800 rounded-lg hover:text-white"
            }
            onClick={() => setSelectedTab(0)}
            id="tabs-faq-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-faq"
            role="tab"
            aria-controls="tabs-faq"
            aria-selected={selectedTab == 0 ? 'true' : 'false' }
          >
            FAQ
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href="#tabs-knwl"
            className={
              (selectedTab == 1 ? "font-bold bg-green-800 text-white" : "font-light text-lime-800 bg-[#FFF3E5] ")+"  block font-bold lg:text-base md:text-sm text-xs leading-tight uppercase py-2 px-10  hover:bg-green-800 rounded-lg hover:text-white"
            }
            onClick={() => setSelectedTab(1)}
            data-bs-toggle="pill"
            data-bs-target="#tabs-knwl"
            role="tab"
            aria-controls="tabs-knwl"
            
            aria-selected={selectedTab == 1 ? 'true' : 'false' }
          >
            Knowledge Base
          </a>
        </li>
      </ul>
      
      <div className="tab-content" id="tabs-tabContent">
        <div
          className="tab-pane fade show active"
          id="tabs-faq"
          role="tabpanel"
          aria-labelledby="tabs-faq-tab"
        >
          <FaqCe />
        </div>
        <div
          className="tab-pane fade"
          id="tabs-knwl"
          role="tabpanel"
          aria-labelledby="tabs-knwl-tab"
        >
          <Knwl />
        </div>
      </div>
    </>
  );
}

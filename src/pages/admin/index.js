import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  VisitorCharts,
  CustomerActivity,
} from "../../components/";

import CustomerData from "../../components/admin/CustomerData";
import MarblePattern from "../../components/admin/MarblePattern";

import { AdminContext } from "../../config/context/adminContext";

import * as constants from "../../constants";

const Dashboard = () => {
  const base_url = constants.base_url;
  const context = useContext(AdminContext);

  return (
    <section
      className={
        "top-[50px] h-full relative p-5 " +
        (context.navResponsive == true
          ? "lg:ml-[230px] ml-[55px]"
          : "ml-[55px]")
      }
    >
      <div className="grid grid-cols-1 gap-3 mb-5 w-full xl:grid-cols-2 pb-7">
        <CustomerData />
        <CustomerActivity />
        
        <VisitorCharts />
        <MarblePattern />
      </div>
      
      {/* <div className="grid grid-cols-1 gap-3 mb-5 w-full xl:grid-cols-2 ">
        <VisitorCharts />
        <MarblePattern />
      </div> */}
    </section>
  );
};

export default Dashboard;
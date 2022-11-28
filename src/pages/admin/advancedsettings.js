import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AddButton, SearchBar, MiniButtonWithIcon, SpareCutting, ExchangeRate, PriceDeviation } from '../../components';

import { AdminContext } from '../../config/context/adminContext';
import axios from "axios";
import ReactPaginate from "react-paginate";

import * as constants from "../../constants"

const AdvancedSettings = () => {

    const base_url = constants.base_url;
    const context = useContext(AdminContext)

    return (
        <section className={"top-[50px] h-full relative p-5 bg-[#FFF3E5] " + (context.navResponsive == true ? "lg:ml-[230px] ml-[55px]" : "ml-[55px]") }>
            <div className="grid grid-cols-1 gap-6 mb-6 w-full sm-grid-cols:1 md:grid-cols-2 xl:grid-cols-3 bg-white shadow-lg shadow-gray-200 rounded-md p-2 ">
                <div>
                    <PriceDeviation />
                </div>
                <div>
                    <SpareCutting />
                </div>
                <div>
                    <ExchangeRate />
                </div>
            </div>
        </section>
    )
}

export default AdvancedSettings
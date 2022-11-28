import React, { useContext } from "react";
import {ThreeDRender} from '../../components'
import { AdminContext } from "../../config/context/adminContext";

const TableSizing = ({form}) => {
    const context = useContext(AdminContext)

    return(
        <section className={"top-[50px] h-full relative bg-[#FFF3E5] " + (context.navResponsive == true ? "lg:ml-[230px] ml-[55px]" : "ml-[55px]") }>
            <ThreeDRender menu = {"editor"} form={form} />
        </section>
    )
}

export default TableSizing;
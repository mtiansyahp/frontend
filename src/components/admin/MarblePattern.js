import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { createPopper, detectOverflow } from "@popperjs/core";
import axios from "axios";
import * as constants from '../../constants'
import { formatRupiah } from "../../utils/formatter";
const base_url = constants.base_url

const popcorn = document.querySelector("#popcorn");
const tooltip = document.querySelector("#tooltip");
const hostName = constants.hostname;
const protocol = constants.protocol;
const port = constants.port;

createPopper(popcorn, tooltip);

export default function MarblePattern() {
  const [marblePattern, setMarblePattern] = useState();
  useEffect(() => {
      const getMarblePattern = async () =>{
        const response = await axios.get(base_url+"/texture/get-last-texture/"+6);
        setMarblePattern(response.data.data);
      }
      getMarblePattern()
  },[])

  const [showAccordion, setShowAccordion] = useState(true);

  return (
    <>
      <div className={"accordion max-h-[480px]" }  id="marblePattern">
        <div className={"accordion-item " + showAccordion ? "h-full" : ""  }>
          <h2 className="accordion-header mb-0" id="marblePatternOne">
            <button
              className="
                accordion-button
                relative
                flex
                items-center
                w-full
                p-2
                text-base text-gray-800 text-left
                bg-white
                border-0
                rounded-none
                transition
                focus:outline-none
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              onClick={()=> setShowAccordion(!showAccordion)}
            >
              <h3 className="midget:text-md lg:text-lg font-bold text-slate uppercase">
                Marble Pattern
              </h3>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show bg-white h-full overflow-auto scrollbar-custom"
            aria-labelledby="marblePatternOne"
            data-bs-parent="#marblePattern"
          >
            <div className="accordion-body p-2 grid xl:grid-cols-2 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 font-jakarta md:text-sm text-xs ">
              {marblePattern &&
                marblePattern.map((value, i) => {
                  return (
                    <div className="flex xl:flex-row flex-col gap-y-2 rounded-lg overflow-hidden bg-gray-400 text-white" key={i}>
                      <img className="xl:w-[40%] w-full h-[140px] object-cover" src={`${protocol}${hostName}${port}/assets/img/2D/texture/${value.texture}`} alt="" />
                      <div className="xl:w-[60%] w-full p-2 flex flex-col ">
                        <p className="font-semibold">{value.name}</p>
                        <p className="font-light text-xs"> ({value.code})</p>
                        <p className="font-light text-xs">{value.panjang} Cm x {value.lebar} Cm</p>
                        <p className="font-semibold mt-auto text-right">Rp. {formatRupiah(value.harga_per_meter)},-</p>
                      </div>
                    </div>
                  )
                })
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

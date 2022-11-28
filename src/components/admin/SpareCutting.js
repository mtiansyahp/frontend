import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { LoadingSpinner } from "../../components";
import axios from "axios";
import Swal from "sweetalert2";

import * as constants from "../../constants"

export default function SpareCutting() {

  const base_url = constants.base_url;
  const [spareCutting, setSpareCutting] = useState(0)
  const [msgValidation, setMsgValidation] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)

  const applyCutting = async (e) => {
    e.preventDefault();
    setIsOpenModal(true)

    await axios.put(`${base_url}/waste-part/update-waste/1`, {'size' : spareCutting})
    .then(response => {
      setIsOpenModal(false)
      
      if(response.data.success) {
        Swal.fire({
          icon: "success",
          text: response.data.message,
        });
      } else {
        setMsgValidation(response.data.message)
      }
    })
  }

  const getSpareCutting = async() => {
    const response = await axios.get(`${base_url}/waste-part/get-waste/1`)
    setSpareCutting(response.data.data.size)
  }

  useEffect(() => {
    getSpareCutting()
  }, [])

  return (
    <>
      <h1 className="text-xl font-bold">Spare Cutting</h1>
      <p className="mb-2">Ukuran toleransi pada slab marble</p>
      <label className="relative  w-1/2">
        <br />
        {
            (msgValidation.length > 0)
            ? msgValidation.map((validation, index) => (
                <p className='font-jakarta text-base self-start mb-2' key={index}>{validation}</p>
                ))
            : ''
        }
        <div class="flex space-x-4">
          <div class="flex rounded-md overflow-hidden">
            <input
              className="w-full rounded-tl-md rounded-bl-md pr-2 border pl-2"
              value={spareCutting}
              onChange={(e) => setSpareCutting(e.target.value)}
            />
            <div class="bg-primary text-white p-2 text-lg font-semibold">
              cm
            </div>
          </div>
        </div>
        <div class="flex space-x-2 justify-left mt-4">
          <a
            class="cursor-pointer bg-lime-900 hover:bg-lime-700 text-orange-100 py-2 px-4 rounded inline-flex items-center"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            data-mdb-ripple-centered="true"
            onClick={applyCutting}
          >
            <img src="/assets/icons/Icon_Admin__Check.svg" />
            <span className="ml-2">Apply</span>
          </a>
        </div>
      </label>

      <div
        className={
          "fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 " +
          (isOpenModal == true ? "opacity-100 visible" : "opacity-0 invisible")
        }
      >
        <form className={
            "fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom " +
            (isOpenModal == true
              ? "opacity-100 visible"
              : "opacity-0 invisible")
          }>
          <LoadingSpinner />
        </form>
      </div>
    </>
  );
}

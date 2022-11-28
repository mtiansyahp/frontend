import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { AdminContext } from "../../config/context/adminContext";
import "tw-elements";

export default function Wistlish() {
  const context = useContext(AdminContext);
  const navigate = useNavigate();
  return (
    <>
      <section
        className={
          "top-[50px] h-full relative p-5 bg-[#FFF3E5] " +
          (context.navResponsive == true
            ? "lg:ml-[230px] ml-[55px]"
            : "ml-[55px]")
        }
      >
        <div className="container mx-auto w-full m-2 p-2">
          <button onClick={() => navigate(-1)}>{"<<"} Go back</button>
          <h1 className="text-center text-2xl uppercase font-bold mb-4">
            Wishlist
          </h1>
          <p>Product on Wishlist</p>
        </div>
        <div className="container mx-auto w-full m-2 p-2 border bg-orange-100 rounded-md">
          <div className="border-b-2 border-white-500 mb-2">
            <p className="text-right text-lg">P1T7B365431392</p>
          </div>
          <div className="flex sm:flex-row flex-col gap-4 p-2">
            <div className="basis-1/4 bg-red">
              <img src="https://cdn.glitch.global/f4cbaf8d-f8fd-46f3-8905-7156bf0e84b7/type%20x%20beige_gold.front.jpg?v=1661855798397" />
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="text-sm inline-block px-7 py-3 leading-snug bg-green-600 text-white font-medium uppercase hover:bg-green-700 focus:bg-green-700 active:bg-red-800 transition duration-150 ease-in-out mb-4 w-full rounded-b-lg"
                >
                  Add To Cart &gt;
                </button>
              </div>
            </div>
            <div className="basis-1/4">
              <h4 className="text-lg font-bold">Table top</h4>
              <ul>
                <li>
                  <strong>Shape</strong>: Rectangle, Slim
                </li>
                <li>
                  <strong>Dimension</strong> : 6 Seaters
                </li>
                <li>
                  <strong>Marble Pattern</strong> : Mont Platino Jaya 8
                </li>
              </ul>
            </div>
            <div className="basis-1/4 bg-orange">
              <h4 className="text-lg font-bold">Table Leg</h4>
              <ul>
                <li>Design : Type x</li>
                <li>Color : Gold Doff</li>
              </ul>
            </div>
            <div className="basis-1/4 bg-slate"></div>
          </div>

          <div className="flex sm:flex-row flex-col gap-3 pt-3">
            <div className="basis-1/2 text-right">
              <p>Price : 22.700.000,-</p>
              <p>Estimated Working Time 17 - 21 Days</p>
            </div>
            <div className="basis-1/2">
              <div className="flex items-center justify-center">
                <div
                  className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
                  role="group"
                >
                  <button
                    type="button"
                    className="rounded-l inline-block px-10 p-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="inline-block px-8 p-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    className="rounded-r inline-block px-6 p-2.5 bg-slate-600 text-white font-medium text-xs leading-tight uppercase hover:bg-slate-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-slate-800 transition duration-150 ease-in-out"
                    data-bs-toggle="modal"
                    data-bs-target="#shareList"
                  >
                    Save {"&"} Share
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        {/* Modal 1 */}
        <div
          class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
          id="shareList"
          tabindex="-1"
          aria-labelledby="exampleModalCenterTitle"
          aria-modal="true"
          role="dialog"
        >
          <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div class="modal-header flex flex-shrink-0 items-center p-4 border-b border-gray-200 rounded-t-md">
                <h5
                  class="text-xl font-medium leading-normal text-center text-gray-800"
                  id="exampleModalScrollableLabel"
                >
                  Save and Share Wishlist
                </h5>
                <button
                  type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body relative p-4">
                <div class="flex items-center justify-center gap-10">
                  <button data-bs-toggle="modal" data-bs-target="#confirmEmail">
                    <img
                      src="https://cdn.glitch.global/f4cbaf8d-f8fd-46f3-8905-7156bf0e84b7/IconWishlist-email.svg?v=1661747055782"
                      class="h-20"
                    />
                  </button>
                  <button>
                    <img
                      src="https://cdn.glitch.global/f4cbaf8d-f8fd-46f3-8905-7156bf0e84b7/IconWishlist-wa.svg?v=1661747316561"
                      class="h-20"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal 2 */}
        <div
          class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
          id="confirmEmail"
          tabindex="-1"
          aria-labelledby="exampleModalCenterTitle"
          aria-modal="true"
          role="dialog"
        >
          <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
            <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div class="modal-header flex flex-shrink-0 items-center p-4 border-b border-gray-200 rounded-t-md">
                
                <button
                  type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body relative p-4">
                <div class="flex items-center justify-center gap-10">
                <p
                  class=" leading-normal text-center justify-center text-gray-800  clear-both"
                  id="exampleModalScrollableLabel"
                >
                  Kirim ke email <br />
user@gmail.com ?
                </p>
                  <button class="rounded-lg bg-red-800 hover:bg-red-600 p-4 text-white">
                    Tidak
                  </button>
                  <button class="rounded-lg bg-cyan-600 hover:bg-cyan-400 p-4 text-white">
                    Oke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CustomerActivity() {
  return (
    <>
      <div className="bg-white shadow-lg shadow-gray-200 rounded-md p-2 ">
        <div className="flex justify-between items-center bg-primary rounded-tl-lg rounded-tr-lg">
          <div className="p-2">
            <h3 className="midget:text-md lg:text-2xl font-bold text-white">
              Customer Activity
            </h3>
            <span className="text-base font-normal text-white">
              5 new activity
            </span>
          </div>
          <div className="flex-shrink-0 p-2">
            <a
              href="#"
              className="p-2 text-sm font-medium text-white rounded-lg hover:bg-lime-600"
            >
              More detail >
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          {/* <table className="table-auto min-w-full border border-spacing-y-px-2 scrollbar-custom bg-white overflow-hidden">
            <thead>
              <tr className="border border-spacing-p bg-slate-300 text-slate-700 flex flex-col flex-no wrap sm:table-row">
                <th className="p-2">Mobile Number</th>
                <th className="p-2">Date/Time</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-500">
              <tr className="border-t-[2px] border-blue-900 bg-neutral-100">
                <td className="p-2">+6287845643110</td>
                <td className="p-2">03-08-2022 / 13:50</td>
                <td className="p-2">
                  <a
                    href="#"
                    className="hover:text-blue p-1 px-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    More detail
                  </a>
                </td>
              </tr>
              <tr className="bg-crema">
                <td className="p-2">+6287845643112</td>
                <td className="p-2">03-08-2022 / 13:40</td>
                <td className="p-2">
                  <a
                    href="#"
                    className="hover:text-blue p-1 px-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    More detail
                  </a>
                </td>
              </tr>
              <tr className="bg-neutral-100">
                <td className="p-2">+6281344543110</td>
                <td className="p-2">03-08-2022 / 14:50</td>
                <td className="p-2">
                  <a
                    href="#"
                    className="hover:text-blue p-1 px-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    More detail
                  </a>
                </td>
              </tr>
              <tr className="bg-crema">
                <td className="p-2">+6281344543110</td>
                <td className="p-2">03-08-2022 / 14:50</td>
                <td className="p-2">
                  <a
                    href="#"
                    className="hover:text-blue p-1 px-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    More detail
                  </a>
                </td>
              </tr>
              <tr className="bg-neutral-100">
                <td className="p-2">+6287845643245</td>
                <td className="p-2">03-08-2022 / 16:50</td>
                <td className="p-2">
                  <a
                    href="#"
                    className="hover:text-blue p-1 px-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    More detail
                  </a>
                </td>
              </tr>
            </tbody>
          </table> */}
          <table
            id="table-customer__activity"
            class="table-auto min-w-full border border-spacing-y-px-2 scrollbar-custom bg-white overflow-hidden"
          >
            <thead>
              <tr class="border border-spacing-p bg-slate-300 text-slate-700">
                <th scope="col">Mobile Number</th>
                <th scope="col">Date/Time</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-500">
              <tr class="border-t-[2px] border-blue-900 bg-neutral-100">
                <td data-label="Mobile Number" class="p-2">
                  +6287845643110
                </td>
                <td data-label="Access Date" class="p-2">
                  04/01/2016
                </td>
                <td data-label="CTA" class="p-2">
                  <a
                    href="#"
                    class="hover:text-blue p-1 px-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    More detail
                  </a>
                </td>
              </tr>
              <tr class="border border-spacing-p bg-slate-300 text-slate-700">
                <td scope="row" data-label="Mobile Number">
                  +6287845643199
                </td>
                <td data-label="Access Date">03/01/2016</td>
                <td data-label="CTA">
                  <a
                    href="#"
                    class="hover:text-blue p-1 px-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    More detail
                  </a>
                </td>
              </tr>
              <tr class="border-t-[2px] border-blue-900 bg-neutral-100">
                <td scope="row" data-label="Mobile Number">
                  +6287845643110
                </td>
                <td data-label="Access Date">03/01/2016</td>
                <td data-label="CTA">
                  <a
                    href="#"
                    class="hover:text-blue p-1 px-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    More detail
                  </a>
                </td>
              </tr>
              <tr class="border border-spacing-p bg-slate-300 text-slate-700">
                <td scope="row" data-label="Mobile Number">
                  +6287845643256
                </td>
                <td data-label="Access Date">02/01/2016</td>
                <td data-label="CTA">
                  <a
                    href="#"
                    class="hover:text-blue p-1 px-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
                  >
                    More detail
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="flex align-baseline mb-0">
          <div>
            <div className="dropdown relative">
              <a
                className="
                        dropdown-toggle
                        px-6
                        py-2.5
                        bg-slate-400
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-slate-700 hover:shadow-lg
                        focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-slate-800 active:shadow-lg active:text-white
                        transition
                        duration-150
                        ease-in-out
                        flex
                        items-center
                        whitespace-nowrap
                      "
                href="#"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Last 7 Days
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="caret-down"
                  className="w-2 ml-2"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                  ></path>
                </svg>
              </a>
              <ul
                className="
                    dropdown-menu
                    min-w-max
                    absolute
                    hidden
                    bg-white
                    text-base
                    z-50
                    float-left
                    py-2
                    list-none
                    text-left
                    rounded-lg
                    shadow-lg
                    mt-1
                    m-0
                    bg-clip-padding
                    border-none
                  "
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <a
                    className="
                dropdown-item
                text-sm
                py-2
                px-4
                font-normal
                block
                w-full
                whitespace-nowrap
                bg-transparent
                text-gray-700
                hover:bg-gray-100
              "
                    href="#"
                  >
                    Yesterday
                  </a>
                </li>
                <li>
                  <a
                    className="
                dropdown-item
                text-sm
                py-2
                px-4
                font-normal
                block
                w-full
                whitespace-nowrap
                bg-transparent
                text-gray-700
                hover:bg-gray-100
              "
                    href="#"
                  >
                    Last 7 days
                  </a>
                </li>
                <li>
                  <a
                    className="
                dropdown-item
                text-sm
                py-2
                px-4
                font-normal
                block
                w-full
                whitespace-nowrap
                bg-transparent
                text-gray-700
                hover:bg-gray-100
              "
                    href="#"
                  >
                    Last 30 days
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

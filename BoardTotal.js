import Pattern from "./pattern";

export default function BoardTotal() {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 p-2 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 h-full">
        <div>
          <h2>Board Total</h2>
        </div>
        <div>
          {/* Column 1 */}
          <div className="bg-crema rounded-[5px]  h-full">
            <div className="cart-shadow p-2 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold  h-full">
              <div className="flex justify-between items-center mb-5">
                <p>Top</p>
                <img
                  className="h-[37px]"
                  src="/assets/icons/IconAdminTopDimension_green.svg"
                  alt=""
                />
              </div>
              <ul  role="list" className="divide-y divide-gray-200">
                <li className="flex justify-between items-center py-3 sm:py-4">
                  <span className="text-[#8A8787] font-normal">Pattern</span>
                  <span>12</span>
                </li>
                <li className="flex justify-between items-center py-3 sm:py-4">
                  <span className="text-[#8A8787] font-normal">Dimension</span>
                  <span>10</span>
                </li>
                <li className="flex justify-between items-center py-3 sm:py-4">
                  <span className="text-[#8A8787] font-normal">Shape</span>
                  <span>3</span>
                </li>
                <li className="flex justify-between items-center py-3 sm:py-4">
                  <span className="text-[#8A8787] font-normal">Edge</span>
                  <span>3</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {/* Column 2 */}
          <div className="bg-crema rounded-[5px] h-full">
            <div className="cart-shadow p-2 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold h-full">
              <div className="flex justify-between items-center mb-5">
                <p>Leg Design</p>
                <img
                  className="h-[37px]"
                  src="/assets/icons/IconDasLeg_green.svg"
                  alt=""
                />
              </div>
              <ul role="list" className="divide-y divide-gray-200">
                <li className="flex justify-between items-center py-3 sm:py-4">
                  <span className="text-[#8A8787] font-normal">Design</span>
                  <span>3</span>
                </li>
                <li className="flex justify-between items-center py-3 sm:py-4">
                  <span className="text-[#8A8787] font-normal">Color</span>
                  <span>3</span>
                </li>
                <li className="flex justify-between items-center py-4">
                  <span className="text-[#8A8787] font-normal">Material</span>
                  <span>3</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          {/* Column 3 */}
          <div className="bg-crema rounded-[5px] h-full">
            <div className="cart-shadow p-2 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold h-full">
              <div className="flex justify-between items-center mb-5">
                <p>Category</p>
                <img
                  className="h-[37px]"
                  src="/assets/icons/IconDasCategory_green.svg"
                  alt=""
                />
              </div>
              <ul role="list" className="divide-y divide-gray-200">
                <li className="flex justify-between items-center py-4">
                  <span className="text-[#8A8787] font-normal">Marble</span>
                  <span>3</span>
                </li>
                <li className="flex justify-between items-center py-4">
                  <span className="text-[#8A8787] font-normal">Marble</span>
                  <span>3</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

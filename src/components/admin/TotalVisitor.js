export default function TotalVisitor({totalVisitor}) {
  return (
    <>
      <div className="bg-white rounded-md p-2 ">
        <div className="flex items-center">
          <div className="inline-flex flex-shrink-0 justify-center items-center p-3 rounded-lg shadow-md shadow-gray-300">
            <img
              className="h-[37px]"
              src="/assets/icons/Icon_Admin__Visitor.svg"
              alt=""
            />
          </div>
          <div className="flex-shrink-0 ml-2">
            <h3 className="midget:text-sm lg:text-lg font-bold leading-none text-gray-900 mb-4">
              Total Visitor
            </h3>
            <p className="break-all ">
              {totalVisitor > 0 ? totalVisitor+" Visit " : "There Is No Any Visitor"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

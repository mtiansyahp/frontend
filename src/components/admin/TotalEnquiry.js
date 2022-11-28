export default function TotalEnquiry({totalWishlist}) {
  return (
    <>
      <div className="bg-white rounded-md p-2 ">
        <div className="flex items-center">
          <div className="inline-flex flex-shrink-0 justify-center items-center p-3 rounded-lg shadow-md shadow-gray-300">
            <img
              className="h-[37px]"
              src="/assets/icons/Icon_Admin__Enquiry.svg"
              alt=""
            />
          </div>
          <div className="flex-shrink-0 ml-2">
            <h3 className="midget:text-sm lg:text-lg font-bold leading-none text-gray-900 mb-4">
              Total Enquiry
            </h3>
            <p className="break-all ">
              {totalWishlist > 0 ? totalWishlist +" Enquiry" : "There Is No Any Enquiry"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
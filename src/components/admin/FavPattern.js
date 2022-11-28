export default function FavPattern({favPattern}) {
    return (
      <>
        <div className="bg-white rounded-md p-2 ">
          <div className="flex items-center">
            <div className="inline-flex flex-shrink-0 justify-center items-center p-3 rounded-lg shadow-md shadow-gray-300">
              <img
                className="h-[37px]"
                src="/assets/icons/IconAdminTopPattern_green.svg"
                alt=""
              />
            </div>
            <div className="flex-shrink-0 ml-2">
              <h3 className="midget:text-sm lg:text-lg font-bold leading-none text-gray-900 mb-4">
                Favorite Pattern
              </h3>
              <p>
                {favPattern ? favPattern.name : "There Is No Favorite Pattern"}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
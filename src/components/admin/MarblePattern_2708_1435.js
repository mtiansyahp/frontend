export default function MarblePattern() {
    return (
      <>
        <div class="accordion" id="marblePattern">
          <div class="accordion-item bg-white border border-gray-200">
            <h2 class="accordion-header mb-0" id="marblePatternOne">
              <button
                class="
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
              >
                <h3 class="midget:text-md lg:text-2xl font-bold text-slate uppercase">
                  Marble Pattern
                </h3>
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="marblePatternOne"
              data-bs-parent="#marblePattern"
            >
              <div class="accordion-body p-1">
                <div class="container mx-auto bg-grey text-left">
                  <div class="flex">
                    <div class="w-1/2 p-1 midget:w-full">
                      {/* <div class="flex justify-center">
                        <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg p-2">
                          <img
                            class="max-h-36"
                            src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                            alt=""
                          />
                          <div class="p-6 pt-0 flex flex-col justify-start">
                            <ul class="text-gray-700 text-base mb-4 text-left">
                              <li>Pegasus P-001</li>
                              <li>143cm x 270cm</li>
                              <li>Rp. 1.812.000,00</li>
                              <li>
                                <button
                                  type="button"
                                  class="inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Edit
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> */}
                      <div class="flex">
                        <div class="bg-white w-max h-60 rounded shadow-md flex card text-grey-darkest">
                          <img class="w-1/3 h-auto rounded-l-sm p-2" src="https://bit.ly/2EApSiC" alt="Room Image" />
                          <div class="w-2/3 flex flex-col">
                            <div class="p-2 pb-0 flex-1">
                              <h3 class="font-light mb-1 text-grey-darkest">Tower Hotel</h3>
                              <div class="text-xs flex items-center mb-4">
                                <i class="fas fa-map-marker-alt mr-1 text-grey-dark"></i>
                                Soho, London
                              </div>
                              <span class="text-3xl text-grey-darkest">£63.00</span>
  
                            </div>
                            <div class=" p-3 flex items-center justify-between">
                              <button class="border-solid border-2 border-indigo-600 p-2">
                                Visible
                              </button>
                              <button class="border-solid border-2 border-indigo-600 p-2">
                                Edit
                              </button>
  
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-1/2 p-1 midget:w-full">
                      {/* <div class="flex justify-center">
                        <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg p-2">
                          <img
                            class="max-h-36"
                            src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                            alt=""
                          />
                          <div class="p-6 pt-0 flex flex-col justify-start">
                            <ul class="text-gray-700 text-base mb-4 text-left">
                              <li>Pegasus P-001</li>
                              <li>143cm x 270cm</li>
                              <li>Rp. 1.812.000,00</li>
                              <li>
                                <button
                                  type="button"
                                  class="inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Edit
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> */}
                      <div class="flex">
                        <div class="bg-white w-max h-60 rounded shadow-md flex card text-grey-darkest">
                          <img class="w-1/3 h-auto rounded-l-sm p-2" src="https://bit.ly/2EApSiC" alt="Room Image" />
                          <div class="w-2/3 flex flex-col">
                            <div class="p-2 pb-0 flex-1">
                              <h3 class="font-light mb-1 text-grey-darkest">Tower Hotel</h3>
                              <div class="text-xs flex items-center mb-4">
                                <i class="fas fa-map-marker-alt mr-1 text-grey-dark"></i>
                                Soho, London
                              </div>
                              <span class="text-3xl text-grey-darkest">£63.00</span>
  
                            </div>
                            <div class=" p-3 flex items-center justify-between">
                              <button class="border-solid border-2 border-indigo-600 p-2">
                                Visible
                              </button>
                              <button class="border-solid border-2 border-indigo-600 p-2">
                                Edit
                              </button>
  
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex m-2">
                    <div class="w-1/2 p-1">
                      <div class="flex justify-center">
                        <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg p-2">
                          <img
                            class="max-h-36"
                            src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                            alt=""
                          />
                          <div class="p-6 pt-0 flex flex-col justify-start">
                            <ul class="text-gray-700 text-base mb-4 text-left">
                              <li>Pegasus P-001</li>
                              <li>143cm x 270cm</li>
                              <li>Rp. 1.812.000,00</li>
                              <li>
                                <button
                                  type="button"
                                  class="inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Edit
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-1/2 p-1">
                      <div class="flex justify-center">
                        <div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg p-2">
                          <img
                            class="max-h-36"
                            src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                            alt=""
                          />
                          <div class="p-6 pt-0 flex flex-col justify-start">
                            <ul class="text-gray-700 text-base mb-4 text-left">
                              <li>Pegasus P-001</li>
                              <li>143cm x 270cm</li>
                              <li>Rp. 1.812.000,00</li>
                              <li>
                                <button
                                  type="button"
                                  class="inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                  Edit
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
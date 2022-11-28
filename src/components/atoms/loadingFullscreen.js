import { TailSpin } from  'react-loader-spinner'

export default function LoadingFullScreen() {
  
    return (
        <div class="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
            <span class="text-green-500 opacity-75 top-1/2 my-0 mx-auto relative w-0 h-0 flex justify-center">
                <TailSpin
                    height="80"
                    width="80"
                    color="#004441"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </span>
        </div>
    )
  }
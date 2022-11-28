import { TailSpin } from  'react-loader-spinner'

export default function LoadingSpinner() {
  
    return (
        <div className='flex justify-center'>
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
        </div>
    )
  }
import { TailSpin } from  'react-loader-spinner'

export default function Customloading({height, width, color}) {
  
    return (
        <div className='flex justify-center'>
            <TailSpin
                height={height}
                width={width}
                color={color}
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}
  
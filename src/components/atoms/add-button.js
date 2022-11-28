import { Link } from "react-router-dom";
import 'tw-elements'

export default function AddButton({action, name}) {
  
  return (
      <button className='flex items-center gap-2 border border-primary rounded-[5px] py-1 px-4 font-jakarta lg:text-base md:text-sm text-xs text-primary bg-white' onClick={action}>
        <img src='/assets/icons/IconPlusPrimary.svg' alt='' />
        <p>{name}</p>
      </button>
  )
}

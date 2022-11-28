export default function MiniButtonEdit({action, cssImg, img, name}) {
  
  return (
    <button className='flex items-center gap-1 border border-red-600 bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white' onClick={action}>
      <img className={cssImg} src={img} alt='' />
      <p>{name}</p>
    </button>
  )
}

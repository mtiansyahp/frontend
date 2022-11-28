export default function MiniButtonWithIcon({colorBorder, colorBg, colorText, action, cssImg, img, name}) {
  
  return (
    <button className={'flex items-center gap-1 border border-' + colorBorder + ' bg-' + colorBg + ' rounded-[5px] py-1 px-2 font-jakarta text-xs text-' + colorText} onClick={action}>
      <img className={cssImg} src={img} alt='' />
      <p>{name}</p>
    </button>
  )
}

const SearchBar = ({value, actionChange, action, idIpt, idBtn}) => {

  return (
      <div className='flex items-center gap-4 border border-black bg-white rounded-[5px] py-1 px-4'>
        <input
        type='text'
        id={idIpt}
        placeholder='Search..'
        className='font-jakarta lg:text-base md:text-sm text-xs placeholder:text-black w-[90%] border-none outline-none'
        value={value}
        onChange={actionChange}
        />
        <img className='cursor-pointer' id={idBtn} onClick={action} src='/assets/icons/IconSearch.svg' alt='' />
      </div>
  )
}

export default SearchBar
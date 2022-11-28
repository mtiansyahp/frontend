import { useState, useEffect } from "react";
import SearchBar from "../atoms/search-bar"
import axios from 'axios';
import * as constants from "../../constants";

const base_url = constants.base_url;

export default function Knwl() {
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [search, setSearch] = useState()
  const [foundData, setFoundData] = useState(false)
  const [isOpen, setIsOpen] = useState([])

  useEffect(() => {
      const getKnowledgeBase = async () => {
        let params = search;
        if(!search) params = '';
        let array = [];
        knowledgeBase.map((value)=> {
          array.push({
            id : value.id, 
            isOpen : value.isOpen
          });
        })
        const response = await axios.get(`${base_url}/knowledge-base/get-all-knowledge-base?search_query=${params}&data=${encodeURIComponent(JSON.stringify(array))}`);
        const data = response.data.result;
        

        if(data && data.length > 0 ) {
          setFoundData(true)
          setKnowledgeBase(data);
        }
        else setFoundData(false);
      }
      getKnowledgeBase();
  },[search])

  const changeToDOM = (value) => {
    //console.log(value)
    return {__html: value};
  }

  const actionSearch = (e) => {
    const value = e.target.value;
    setSearch(value)
  }

  return (
    <>
      <div className="xl:w-[40%] md:w-[60%] w-full block ml-auto mt-6 mb-3">
        <SearchBar actionChange = {actionSearch} />
      </div>
      <h1 className="lg:text-base text-sm font-semibold text-center uppercase  clear-both mb-2">Knowledge Base</h1>
      <p className="text-center mb-6">
        Jika Anda bingung untuk FAQ, silahkan hubungi ke tech@esteticohome.com
        atau ke +62 822 7338 6665 
      </p>
      {foundData && 
        knowledgeBase.map(
            (value, i)=>{
              return(
                <div className="border border-[#B8BABD] bg-[#FFF3E5] mb-1" key={i} >
                  <div
                    className="relative p-2 cursor-pointer flex justify-between gap-2"
                    onClick={() => {
                      let data = [...isOpen];
                      data[i] = !data[i];
                      setIsOpen(data);
                    }}
                  >
                      
                    <p className="font-medium">
                      {value.title}
                    </p>
                    <img
                      className="h-[20px]"
                      src={
                        isOpen[i] === true
                          ? "/assets/icons/IconMinusOutline.svg"
                          : "/assets/icons/IconPlusOutline.svg"
                      }
                      alt=""
                    /> 
                  </div>
    
                  <div
                    className={
                      isOpen[i] === true
                        ? "px-4 pb-2 opacity-100 visible h-auto"
                        : "opacity-0 invisible h-0"
                    }
                  >
                    <div dangerouslySetInnerHTML={changeToDOM(value.explanation)} className="text-xs font-light" ></div>
                  </div>
                </div>
              )
        })
    }
    </>
  );
}

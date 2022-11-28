import { useState, useEffect } from "react";
import SearchBar from "../atoms/search-bar"
import axios from 'axios';
import * as constants from "../../constants";

const base_url = constants.base_url;
export default function FaqCe() {
  const [faq, setFAQ] = useState([]);
  const [search, setSearch] = useState()
  const [foundData, setFoundData] = useState(false)

  useEffect(() => {
      const getFAQ = async () => {
        let params = search;
        if(!search) params = '';
        let array = [];
        faq.map((value)=> {
          array.push({
            id : value.id, 
            isOpen : value.isOpen
          });
        })
        
        const response = await axios.get(`${base_url}/faq/get-all-faq?search_query=${params}&data=${encodeURIComponent(JSON.stringify(array))}`);
        const data = response.data.result;
        
        // data.forEach((value,index) => {
        //     if(data[index].isOpen != "undefined" && data[index].isOpen != undefined ){}
        //     else data[index].isOpen = false;
        // });

        //console.log(data)
        
        if(data.length > 0 ) {
          setFoundData(true)
          setFAQ(data);
        }
        else setFoundData(false);
      }
      getFAQ();
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
      <div className="xl:w-[40%] md:w-[60%] w-full block ml-auto mt-6 mb-3 ">
        <SearchBar actionChange = {actionSearch} />
      </div>
      <h1 className="lg:text-base text-sm font-semibold text-center uppercase  clear-both mb-2">Frequently Ask Questions</h1>
      <p className="text-center mb-6">
        Jika Anda bingung untuk FAQ, silahkan hubungi ke tech@esteticohome.com
        atau ke +62 822 7338 6665 
      </p>
      {foundData && 
          faq.map(
              (value, i)=>{
                return(
                  <div className="border border-[#B8BABD] bg-[#FFF3E5] mb-1" key={i}>
                    <div
                      className="relative p-2 cursor-pointer flex justify-between gap-2"
                      onClick={() => {
                        let data = [...faq];
                        data[i].isOpen = !data[i].isOpen;
                        setFAQ(data);
                      }}
                    >
                        
                      <p className="font-medium">
                        {value.question}
                      </p>
                      <img
                        className="h-[20px]"
                        src={
                          value.isOpen === true
                            ? "/assets/icons/IconMinusOutline.svg"
                            : "/assets/icons/IconPlusOutline.svg"
                        }
                        alt=""
                      /> 
                    </div>
      
                    <div
                      className={
                        value.isOpen === true
                          ? "px-4 pb-2 opacity-100 visible h-auto"
                          : "opacity-0 invisible h-0"
                      }
                    >
                      <div dangerouslySetInnerHTML={changeToDOM(value.answer)} className="text-xs font-light" ></div>
                    </div>
                  </div>
                )
          })
      }
      
    </>
  );
}

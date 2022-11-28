import React, { useContext, useEffect, useRef, useState } from 'react'
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { AdminContext } from '../../config/context/adminContext';
import axios from "axios";
import * as constants from '../../constants'
import moment from 'moment';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      text: "Visitor & Wishlist",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July", 'August', 'September', 'October', 'November', 'December'];

const base_url = constants.base_url

export default function VisitorChart() {
  const [visitor, setVisitor] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [wishlist, setWishlist] = useState([0,0,0,0,0,0,0,0,0,0,0,0]);
  const [year, setYear] = useState(moment().format('YYYY'));
  const [data, setData] = useState({
      labels,
      datasets: [
        {
          label: "Visitor",
          data: [],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Wishlist",
          data: [],
          borderColor: "rgb(255, 153, 0)",
          backgroundColor: "rgb(255, 153, 0, 0.5)",
        },
      ],
  });
  
  useEffect(() => {
      // const data = [...wishlist]  
      // const data1 = [...visitor]
      // const getWishlist = async (month) => {
      //   const response = await axios.get(`${base_url}/wishlist/get-count-wishlist-by-month?year=${year}&month=${month}`);
      //   const val = response.data.data[0].total;
      //   //setWishlist([...wishlist, val])
      //   //setWishlist((oldArray) => oldArray.concat(val))
      //   //setWishlist(current => [...current, val]);
      //   if(val > 0){
      //     await Promise.all(
      //       data.forEach((value, index) => {
      //         if(index == (month-1) ){
      //           data[index] = val;
      //         } 
      //       })
      //     )
      //     setWishlist(data);
      //   }
      // }

      // const getVisitor = async (month) => {
      //   const response = await axios.get(`${base_url}/visitor/get-count-visitor-by-month?year=${year}&month=${month}`);
      //   const val = response.data.data[0].total;
      //   //setVisitor([...visitor, val])
      //   //setVisitor((oldArray) => oldArray.concat(val))
      //   //setVisitor(current => [...current, val]);
      //   if(val > 0){
      //     await Promise.all(
      //       data1.map((value, index) => {
      //         if(index == (month-1) ){
      //           data1[index] = val;
      //         } 
      //       })
      //     )
      //     setVisitor(data1);
      //   }
      // }

      // if(year){
      //   for(let i = 1; i<=12; i++){
      //     getWishlist(i);
      //     getVisitor(i);
      //   }
      // }
      const getWishlist = async (month) => {
        const response = await axios.get(`${base_url}/wishlist/get-count-wishlist-by-month?year=${year}&month=${month}`);
        setWishlist(response.data.data)
      }
      const getVisitor = async (month) => {
        const response = await axios.get(`${base_url}/visitor/get-count-visitor-by-month?year=${year}&month=${month}`);
        setVisitor(response.data.data)
      }

      getWishlist();
      getVisitor();
  },[year])

  useEffect(()=> {
      if(visitor.length > 0 && wishlist.length > 0){
        setData({
          labels,
          datasets: [
            {
              label: "Visitor",
              data: visitor,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Enquires",
              data: wishlist,
              borderColor: "rgb(255, 153, 0)",
              backgroundColor: "rgb(255, 153, 0, 0.5)",
            },
          ],
        });
      }
  },[visitor, wishlist])

  const [showAccordion, setShowAccordion] = useState(true);
  const chart = useRef();

  useEffect(() => {
    if (chart?.current) {
      //chart.current.chartInstance.destroy();
      //chart.current.remove()
      //console.log(chart.current.config._config.data.datasets)
      
    }
  },[chart])

  
  return (
      <div className={"accordion max-h-[480px]"} id="accordionCharts" >
        <div className={"accordion-item " + showAccordion ? "h-full" : ""  }>
          <h2 className="accordion-header mb-0" id="Charts">
            <button
              className="accordion-button relative flex items-center w-full p-2 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCharts"
              aria-expanded="false"
              aria-controls="collapseCharts"
              onClick={()=> setShowAccordion(!showAccordion)}
            >
              <h3 className="midget:text-md lg:text-lg font-bold text-slate uppercase">
                Visitor & Customer Enquires
              </h3>
            </button>
          </h2>
          <div
            id="collapseCharts"
            className="accordion-collapse collapse show bg-white h-full overflow-auto pt-3"
            aria-labelledby="Charts"
            data-bs-parent="#accordionCharts"
          >
            <div className="accordion-body p-2 font-jakarta md:text-sm text-xs h-full">
                <div className="overflow-x-auto h-full">
                  {
                    data.datasets.length > 0 && (
                      <Line options={options} data={data} ref={chart} className="h-full" />
                    )
                  }
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}

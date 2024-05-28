'use client'
import {get, ref} from "firebase/database"
import { useDebugValue, useEffect, useState } from "react";
import {database} from "./firebase.js"
import {Navbar} from "./components/navbar/Navbar.jsx"
import {InputSection} from "./components/input/InputSection.jsx"

import sebastianData from './sebastian_data.json'
import LitersPerMinuteChart from './components/charts/chartTable.js';
import LitersPerMinutePieChart from './components/charts/pieTable.js';
import { InputField } from './components/input/InputField';
import Image from 'next/image';
import profilePic from './media/leakSymbol.png'



export default function Home() {
  const [selectedTimestamp, setSelectedTimestamp] = useState("");
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });


    const timestamps =  sebastianData.Dorms.ISR['1stFloor']['g7n86YA00mUvlqFpsCMUwKN1X0U2'];
    const timestampArray = Object.keys(timestamps).map(key => timestamps[key].map(entry => {
      const entries = timestamps[key];

      return entries.map(entry => {
        const date = new Date(entry.timestamp * 1000);
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // You can adjust the format as needed
      });
    })).flat();

    const [selectedDay, setSelectedDay] = useState("");
    const [dayOptions, setDayOptions] = useState("");



    // const [dorms, setDorms] = useState([]);

   return (
    <main className="flex  min-h-screen bg-white" style={{ paddingTop: '80px' }}> 
      <Navbar /> 
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex-1">
          <InputSection setSelectedDay={setSelectedDay} />
        </div>
        
        <div className="flex-1 flex flex-col items-start"> {/* Container for charts */}
          <LitersPerMinuteChart selectedDay={selectedDay} />

          <div className="flex justify-start items-start"> {/* New row for Pie Chart and Image */}
            <div className="flex-1">
              <LitersPerMinutePieChart selectedDay={selectedDay} />
            </div>
            <div className="flex-1">
              <Image
                src={profilePic}
                width={250}
                height={250}
                alt="Leak symbol"
                title="Leak Detection"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
import { useState, useEffect } from 'react'
import { InputField } from './InputField'
import LitPerMinuteChart from '@/app/components/charts/chartTable';
import jsonData from '../../sebastian_data.json'; 
const floorData = jsonData.Dorms?.ISR['1stFloor']['g7n86YA00mUvlqFpsCMUwKN1X0U2'];

function getDayOptionsData() {
    // Assuming jsonData is correctly loaded and contains the necessary structure
    const floorData = jsonData.Dorms?.ISR['1stFloor']['g7n86YA00mUvlqFpsCMUwKN1X0U2'];
    // const selectedShowerData = floorData[selectedShower];
    const timestamps = [];

    Object.keys(floorData).forEach(shower => {
        // floorData[shower].forEach(entry => {
            const date = new Date(shower * 1000);
            const formattedTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


            // if (!timestamps.includes(formattedTime)) {
            //     timestamps.push(formattedTime); // Ensure unique dates
            // } 
            timestamps.push(formattedTime);
          // });


      });
    
    console.log()

    return timestamps;
}

export const InputSection = ( {setSelectedDay}, { setDayOptions }) => {

  const [dormList, setDormList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [selectedDorm, setSelectedDorm] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  // const days = getDayOptionsData().timestamps;
  // const [selectedDay, setSelectedDay] = useState("");

  // no dependency means it will only run on first load
  useEffect(() => {
    
    //fetch dorm information 
    setDormList(["ISR", "Wasaja", "Townsend"])

    //fetch floor information 
    setFloorList(["1", "2", "3"])

    // fetch day info
    const days = getDayOptionsData();
    setDayList(days)
    // setDayList([days])

    
  }, [])

  return (
    <section className="container mx-auto flex flex-col justify-center items-center">
        <InputField dataList={dormList} setData={setSelectedDorm} label="DORM" />
        <InputField dataList={floorList} setData={setSelectedFloor} label="FLOOR" />
        <InputField dataList={dayList} setData={setSelectedDay} label="DAY" />
    </section>
  )
}


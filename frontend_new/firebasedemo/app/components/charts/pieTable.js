import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

import jsonData from '../../sebastian_data.json'; 

function prepareChartData(selectedDay) {
    // const floorData = jsonData.Dorms?.ISR['1stFloor']['g7n86YA00mUvlqFpsCMUwKN1X0U2'];
    // let selectedShowerData;
    // let pieData;

    // // Convert keys to date strings and find the match
    // const dataKey = Object.keys(floorData).find(key => {
    //     const date = new Date(parseInt(key) * 1000);
    //     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` === selectedDay;
    // });

    // if (dataKey) {
    //     selectedShowerData = floorData[dataKey];
    // } else {
    //     return { labels: [], datasets: [] }; // Handle the case where no data matches
    // }

    // const timestamps = [];
    // const litPerMinValues = [];
    
    

    // selectedShowerData.forEach(entry => {
    //     const date = new Date(entry.timestamp * 1000);
    //     const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //     const formattedData = entry.
    //     timestamps.push(formattedTime);
    //     litPerMinValues.push(entry.litPerMin);

    // });

    // return {
    //     labels: timestamps,
    //     datasets: [
    //         {
    //           label: '# of Votes',
    //           data: formattedData,
    //           backgroundColor: [
    //             'rgba(255, 99, 132, 0.2)',
    //             'rgba(54, 162, 235, 0.2)',
    //             'rgba(255, 206, 86, 0.2)',
    //             'rgba(75, 192, 192, 0.2)',
    //             'rgba(153, 102, 255, 0.2)',
    //             'rgba(255, 159, 64, 0.2)',
    //           ],
    //           borderColor: [
    //             'rgba(255, 99, 132, 1)',
    //             'rgba(54, 162, 235, 1)',
    //             'rgba(255, 206, 86, 1)',
    //             'rgba(75, 192, 192, 1)',
    //             'rgba(153, 102, 255, 1)',
    //             'rgba(255, 159, 64, 1)',
    //           ],
    //           borderWidth: 1,
    //         },
    //       ]
    // };

    const floorData = jsonData.Dorms?.ISR['1stFloor']['g7n86YA00mUvlqFpsCMUwKN1X0U2'];
    const daySums = {};

    Object.keys(floorData).forEach(day => {
        floorData[day].forEach(entry => {
            const date = new Date(entry.timestamp * 1000);
            const formattedDate =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            
            if (!daySums[formattedDate]) {
                daySums[formattedDate] = 0;
            }
            daySums[formattedDate] += entry.litPerMin;
        });
    });


    const labels = Object.keys(daySums);
    const data = Object.values(daySums);

    return {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                ],
            borderWidth: 1
        }]
    };

}

export default function LitPerMinutePieChart ( { selectedDay } ) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    
    const chartOptions = {
        responsive: true,
        plugins: {
            // legend: { position: 'top' },
        }
    }
    

    useEffect (() => {
        const data = prepareChartData(selectedDay);
        setChartData(data);

    }, [selectedDay])

    

      return (
        <div style={{ width: '400px', height: '400px' }}>
            <h2>{'Pie'}</h2>
            <Pie data={chartData} options={chartOptions}/>
        </div>

        )


}


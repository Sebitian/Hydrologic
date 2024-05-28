import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';

// Register the components Chart.js needs to render your chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

// get data from json file 
import jsonData from '../../sebastian_data.json'; 

// Initialize chartData state with a default structure that includes empty arrays for labels and datasets


function prepareChartData(selectedDay) {

    const floorData = jsonData.Dorms?.ISR['1stFloor']['g7n86YA00mUvlqFpsCMUwKN1X0U2'];
    let selectedShowerData;

    // Convert keys to date strings and find the match
    const dataKey = Object.keys(floorData).find(key => {
        const date = new Date(parseInt(key) * 1000);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` === selectedDay;
    });

    if (dataKey) {
        selectedShowerData = floorData[dataKey];
    } else {
        return { labels: [], datasets: [] }; // Handle the case where no data matches
    }

    const timestamps = [];
    const litPerMinValues = [];
    

    selectedShowerData.forEach(entry => {
        const date = new Date(entry.timestamp * 1000);
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        timestamps.push(formattedTime);
        litPerMinValues.push(entry.litPerMin);
    });

    return {
        labels: timestamps,
        datasets: [{
            label: `Shower Instance on ${selectedDay}`,
            data: litPerMinValues,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

}

export default function LitPerMinuteChart( { selectedDay }) {
    // console.log(selectedDay);

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {

        const data = prepareChartData(selectedDay);
        setChartData(data);
        
    }, [selectedDay]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }, 
            title: {
                display: true,
                text: 'Liters Per Minute for First Shower Instance'
            }
        }, 
        scales: {
            x: {
                type: 'category',
                title: {
                    dispaly: true,
                    text: 'Time'
                }
            },
            y: {
                type: 'linear',
                title: {
                    display: true, 
                    text: 'Liters per Minute'
                }, 
                beginAtZero: true
            }
        }
    }

    return (
        <div style={{ width: '800px', height: '450px' }}>
           <h2>{chartData.datasets[0]?.label || "Loading Chart Data..."}</h2>
             <Line options={options} data={chartData} />
        </div>
    );

}
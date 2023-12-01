import React, { useEffect } from 'react';
import
{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Container } from '@mantine/core';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const BarChart = (props) =>
{
    const { low, high, time, } = props
    const options = {
        responsive: true,
        scales: {

            x: {

                grid: {
                    display: false
                },
                beginAtZero: true
            },
            y: {
                ticks: {
                    stepSize: 2
                },
                // min: 0,
                // max: 30,
            },
        },
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Machine_Name',
            },
        },
    };

    const labels = time;
    // const labels = [1, 2, 3, 4, 5, 6]
    // const faker1 = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 8, 9, 10, 11, 12, 13, 14, 15, 8, 9, 10, 11, 12, 13, 14, 15]
    // const faker2 = [6, 5, 4, 3, 2, 1, 8, 9, 10, 11, 12, 13, 14, 15]

    const data = {
        labels,
        datasets: [

            {
                label: 'Low',
                // data: [1, 2, 3, 4,],
                data: low,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'High',
                // data: [7, 6, 5, 4,],
                data: high,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };


    return (<Container p={16} h={'22rem'} fluid>
        <Bar style={{ width: '100%' }} options={options} data={data} />
    </Container>

    )
}

export default BarChart;

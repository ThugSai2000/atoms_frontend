import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Filler,
    Legend
)

const LineChartComponent = () =>
{

    const options = {
        reponsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Title Name"
            },
        },

    }
    return (
        <Line options={options} />
    )
}

export default LineChartComponent

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const DoughnutChart = () =>
{
    const chartRef = useRef(null)

    useEffect(() =>
    {
        const ctx = document.getElementById('myChart');

        // Check if a chart instance exists, and if so, destroy it
        if (chartRef.current)
        {
            chartRef.current.destroy();
        }

        // Create a new chart instance and store it in the ref
        chartRef.current = new Chart(ctx, {
            type: 'doughnut',

            data: {
                labels: ['Run Time', 'Down Time', 'Idle Time'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 20],
                    borderWidth: 0,
                    borderRadius: [0, 0, 0],
                    backgroundColor: ['#50CD89', '#F1416C', '#E4E6EF']
                }]
            },
            options: {
                maintainAspectRatio: false,
                aspectRatio: 1, // Set the aspect ratio to 1 for a square chart
                responsive: true, // Make the chart responsive
                width: '200px', // Set the desired width in pixels
                height: '200px',
                cutoutPercentage: 0,
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            padding: 30,

                        },
                        position: 'bottom',

                    },


                },
                cutout: '70%',

                radius: 100
            },



        });
    }, []);

    return (
        <div id="chartContainer" style={{ width: '25rem', height: '20rem', }}>
            <canvas id="myChart"></canvas>
        </div>
    )
}

export const LineChart1 = () =>
{
    const chartRef = useRef(null)

    useEffect(() =>
    {
        const ctx = document.getElementById('temperatureChart');

        // Check if a chart instance exists, and if so, destroy it
        if (chartRef.current)
        {
            chartRef.current.destroy();
        }

        // Create a new chart instance and store it in the ref
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1:30', '2:00', '1:30', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00',],
                datasets: [{
                    label: '# of Votes',
                    data: [150, 101, 140, 110, 148, 125, 151, 225, 120],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                aspectRatio: 1, // Set the aspect ratio to 1 for a square chart
                responsive: true, // Make the chart responsive
                width: '200px', // Set the desired width in pixels
                height: '200px',
                scales: {
                    x: {
                        display: true,
                        beginAtZero: true,
                        min: 0,
                        max: 20

                    },
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 350
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                },
            },

        });
    }, []);

    return (
        <div id="chartContainer" style={{ width: '25rem', height: '23rem', }}>
            <canvas id="temperatureChart"></canvas>
        </div>

    )
}
export const LineChart2 = () =>
{
    const chartRef = useRef(null)

    useEffect(() =>
    {
        const ctx = document.getElementById('humidityChart');

        // Check if a chart instance exists, and if so, destroy it
        if (chartRef.current)
        {
            chartRef.current.destroy();
        }

        // Create a new chart instance and store it in the ref
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1:30', '2:00', '1:30', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00'],
                datasets: [{
                    label: '# of Votes',
                    data: [150, 101, 140, 110, 148, 125, 151, 70, 301],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                aspectRatio: 2, // Set the aspect ratio to 1 for a square chart

                scales: {
                    x: {
                        display: true,
                        beginAtZero: true,


                    },
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 350
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    }
                },

            },
        });
    }, []);

    return (

        <div id="chartContainer" style={{ width: '25rem', height: '23rem', }}>
            <canvas id="humidityChart"></canvas>
        </div>
    )
}


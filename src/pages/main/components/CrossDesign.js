import { Chart as ChartJs, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from "react-chartjs-2";
import { useStatistic } from '../../../hooks/useStatistic';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { useGetDate } from '../../../hooks/useGetDateTime';
ChartJs.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const CrossDesign = ({levelAir}) => {
    const labels = [0, 1, 2, 3, 5, 7, 9, 10]
    const datasets = [
        [8], [8,3], [3], [1], [0], [0.5], [8], [8]
    ]
    const datassets2 = [levelAir, levelAir, levelAir, levelAir, levelAir, levelAir, levelAir, levelAir,]
    const combinedDataset = labels.map((label, index) => {
        const values = datasets[index] || []; // If no values, use an empty array
        return values.map(value => ({ x: label.toString(), y: value }));
    }).flat();

    const data = {
        labels: labels.map(label => label.toString()),
        datasets: [
            {
                label: "Level Air",
                data: datassets2,
                borderColor: 'rgb(35,211,237)',
                pointRadius: 3,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: 'black',
                pointHoverBorderColor: 'rgba(0,0,0,0.3)',
                pointHoverBorderWidth: 10,
                backgroundColor: (context) => {
                    if(!context.chart.chartArea){
                        return;
                    }
                    const {ctx, data, chartArea: {top, bottom}} = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, 'rgba(64,211,237,0.3)');
                    gradientBg.addColorStop(1, 'rgba(64,211,237,1)')
                    return gradientBg;
                },
                fill: true,
            },
            {
                label: "Bingkai Tanggul",
                data: combinedDataset,
                borderColor: 'rgb(235,236,238)',
                pointRadius: 0,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: 'black',
                pointHoverBorderColor: 'rgba(0,0,0,0.3)',
                pointHoverBorderWidth: 10,
                backgroundColor: (context) => {
                    if(!context.chart.chartArea){
                        return;
                    }
                    const {ctx, data, chartArea: {top, bottom}} = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, 'rgba(235,236,238)');
                    gradientBg.addColorStop(1, 'rgba(235,236,238)')
                    return gradientBg;
                },
                fill: true,
            },
        ]
    }

    const options = {
        maintainAspectRatio: false,
        mouseLine: {
            color: 'black'
        },
        plugins: {
            legend: {
                labels:{
                    boxHeight: 1,
                    font: { family: "'Poppins', 'sans-serif'"}
                },
                align: 'end'
            },
        },
        tooltip:{
            enabled: true,
            callbacks: {
                label: function (context) {
                    return 'Amount: ' + context.formattedValue;
                }
            },
            mode: "index"
        },
        scales: {
            y: {
                title:{ 
                    display: true,
                    text: 'Tinggi Air (m)',
                    color: 'black'
                },
                suggestedMax: Math.max(...data.datasets[0].data) + 2,
                suggestedMin: 0,
                grid: {
                    color: 'rgba(0,0,0,.05)',
                },
                border: {
                    display: false
                },
                ticks: {
                    stepSize: 0.5,
                    tickBorderDash: [8, 4],
                }
            },
            x: {
                display: false
            }
        }
    }

    return ( 
        <div className="">
            <p className="text-xs font-medium text-left mt-3">Visualisasi air dengan tanggul</p>
            <div className="h-[200px]">
                {<Line data={data} options={options}></Line>}
            </div>
        </div>
    );
}
 
export default CrossDesign;
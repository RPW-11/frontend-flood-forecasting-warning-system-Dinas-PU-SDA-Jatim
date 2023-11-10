import { Chart as ChartJs, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from "react-chartjs-2";
ChartJs.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);
const Graph = () => {
    const data = {
        labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        datasets: [{
            label: "Ketinggian Air (m)",
            data: Array.from({length: 24}, () => Math.floor(Math.random() * 40)),
            borderColor: 'orange',
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
                gradientBg.addColorStop(0, 'rgba(255,165,3, 1)');
                gradientBg.addColorStop(0.3, 'rgba(255,165,3, 0.5)');
                gradientBg.addColorStop(1, 'rgba(255,165,3, 0)')
                return gradientBg;
            },
            tension: 0.1,
            fill: true,
        }]
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
                suggestedMax: Math.max(...data.datasets[0].data) + 10,
                suggestedMin: 0,
                grid: {
                    color: 'rgba(0,0,0,.05)',
                },
                ticks: {
                    stepSize: 2,
                    font: { family: "'Poppins', 'sans-serif'"},
                    tickBorderDash: [8, 4],
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { family: "'Poppins', 'sans-serif'"}
                }
            }
        }
    }

    return ( 
        <div className="h-full">
            <div className="h-[360px]">
                <Line data={data} options={options}></Line>
            </div>
        </div>
     );
}
 
export default Graph;
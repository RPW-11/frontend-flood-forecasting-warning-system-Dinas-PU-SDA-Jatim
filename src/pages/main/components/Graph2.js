import { Chart as ChartJs, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from "react-chartjs-2";
ChartJs.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const Graph2 = () => {
    const data = {
        labels: [0,1],
        datasets: [
            {
                label: "Elevasi Muka Air (m)",
                data: [60, 60],
                borderColor: 'rgb(35,211,237)',
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'black',
                pointHoverBorderColor: 'rgba(0,0,0,0.3)',
                pointHoverBorderWidth: 5,
                backgroundColor: (context) => {
                    if(!context.chart.chartArea){
                        return;
                    }
                    const {ctx, data, chartArea: {top, bottom}} = context.chart;
                    const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                    gradientBg.addColorStop(0, 'rgba(167,231,255,1)');
                    gradientBg.addColorStop(0.3, 'rgba(167,231,255, .7)');
                    gradientBg.addColorStop(1, 'rgba(167,231,255, .2)')
                    return gradientBg;
                },
                tension: 0.1,
                fill: true,
            }
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
                suggestedMax: Math.max(...data.datasets[0].data),
                suggestedMin: 0,
                grid: {
                    display: false
                },
                ticks: {
                    stepSize: 80,
                }
            },
            x: {
                border: {display: false},
                grid: {
                    display: false,
                },
                ticks: {
                    display: false
                }
            }
        }
    }
    return ( 
        <div className="">
            <div className="h-[100px]">
                <Line data={data} options={options}></Line>
            </div>
        </div>
     );
}
 
export default Graph2;
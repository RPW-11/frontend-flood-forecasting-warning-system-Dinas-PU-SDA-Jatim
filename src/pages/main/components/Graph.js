import { Chart as ChartJs, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from "react-chartjs-2";
import { useStatistic } from '../../../hooks/useStatistic';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { useGetDate } from '../../../hooks/useGetDateTime';
import Loading from '../../../components/Loading';
ChartJs.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);
const Graph = ({params, setters}) => {
    const [aktualData, setAktualData] = useState([]);
    const [prediksiData, setPrediksiData] = useState([]);
    const [dates, setDates] = useState([]);

    const { getChartData, isLoading, error } = useStatistic();
    const { getTime } = useGetDate();
    const { model, daerah, periode } = params;
    const { user } = useAuthContext();

    const data = {
        labels: dates.map(date => {return getTime(date)}),
        datasets: [
            {
                label: "Aktual",
                data: aktualData,
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
                    gradientBg.addColorStop(0, 'rgba(35,211,237,1)');
                    gradientBg.addColorStop(0.3, 'rgba(35,211,237,.5)');
                    gradientBg.addColorStop(1, 'rgba(35,211,237,0)')
                    return gradientBg;
                },
                tension: 0.1,
                fill: true,
            },
            {
                label: "Prediksi",
                data: prediksiData,
                borderColor: 'rgb(247,91,2)',
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
                    gradientBg.addColorStop(0, 'rgba(247,91,2,1)');
                    gradientBg.addColorStop(0.3, 'rgba(247,91,2,.5)');
                    gradientBg.addColorStop(1, 'rgba(247,91,2,0)')
                    return gradientBg;
                },
                tension: 0.1,
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
                suggestedMax: 5,
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
                title:{ 
                    display: true,
                    text: 'Periode Waktu',
                    color: 'black'
                },
                grid: {
                    display: false
                },
                border: {
                    display: false
                },
            }
        }
    }

    useEffect(() => {
        const handleLoadChartData = async () => {
            const token = user ? user.authorization.token : 'def'
            const res = await getChartData(token, daerah.toLowerCase() === "dhompo" ? "LSTM" : "GRU", daerah, periode);
            let tempPred = []
            let tempAct = []
            let tempDate = []
            let aktual = "Tidak ada"
            let prediksi = "Tidak ada"
            if(res) {
                res.data.map(item => {
                    if (item.aktual) {
                        aktual = item.aktual
                    }
                    if (item.prediksi) {
                        prediksi = item.prediksi
                    }
                    tempAct.push(item.aktual); tempPred.push(item.prediksi); tempDate.push(item.tanggal)
                })
    
                setDates(tempDate); setAktualData(tempAct); setPrediksiData(tempPred)
                setters.setAktualAir(aktual); setters.setPrediksiAir(prediksi); setters.setChartData(res.data)
            }
        }
        handleLoadChartData();
    },[model, daerah, periode])

    return ( 
        <div className="h-full">
            <div className="h-[250px]">
                {isLoading ? <Loading size={'30px'} color='#000000'/> : <Line data={data} options={options}></Line>}
            </div>
        </div>
     );
}
 
export default Graph;
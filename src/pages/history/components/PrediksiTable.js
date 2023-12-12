import { useGetDate } from "../../../hooks/useGetDateTime";
import { useEffect, useState } from "react";
import { useGetData } from "../../../hooks/useGetData";
import Loading from "../../../components/Loading";
import {BsChevronLeft, BsChevronRight, BsFillCalendarDayFill, BsFillClockFill} from "react-icons/bs"

const PrediksiTable = ({user}) => {
    const buttonStyle = {
        disbaled: 'p-1 rounded-full border bg-zinc-100 text-zinc-400',
        enabled: 'p-1 rounded-full border hover:bg-zinc-200'
    }
    const [prediksi, setPrediksi] = useState(null);
    const [totalLength, setTotalLength] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const {getDate, getTime} = useGetDate();
    const {getPredictionHistory, isLoading, error} = useGetData();
    
    const handleLoadPredictionHistory = async () => {
        const token = user ? user.authorization.token : 'def'
        const data = await getPredictionHistory(token, pageIndex * 10, 10);
        if(data) {
            setPrediksi(data.data.history);
            setTotalLength(data.data.total_count);
            console.log(data);
        }
    }

    useEffect(() => {
        handleLoadPredictionHistory();

    }, [pageIndex])

    if(prediksi){
        return ( 
            <div className="my-8">
                <div className="rounded-lg min-w-[1000px] border grid grid-cols-12 overflow-hidden text-sm bg-white shadow">
                    <div className="col-span-1 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold">ID</div>
                    <div className="col-span-2 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold"><BsFillCalendarDayFill className="mr-2"/>Tangal</div>
                    <div className="col-span-1 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold"><BsFillClockFill className='mr-2'/>Jam</div>
                    <div className="col-span-2 flex items-center px-5 text-left  bg-blue-100 py-2 font-semibold">TMA Purwodadi LSTM (m)</div>
                    <div className="col-span-1 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold">TMA Purwodadi GRU (m)</div>
                    <div className="col-span-1 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold">TMA Purwodadi TCN (m)</div>
                    <div className="col-span-2 flex items-center px-5 text-left  bg-blue-100 py-2 font-semibold">TMA Dhompo LSTM (m)</div>
                    <div className="col-span-1 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold">TMA Dhompo GRU (m)</div>
                    <div className="col-span-1 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold">TMA Dhompo TCN (m)</div>

                    {
                        prediksi.map((item, i) => (
                            <div className="col-span-12 grid grid-cols-12" key={i}>
                                <div className="col-span-1 px-5 text-left border-t py-2">{item.id}</div>
                                <div className="col-span-2 px-5 text-left border-t py-2">{getDate(item.predicted_for_time)}</div>
                                <div className="col-span-1 px-5 text-left border-t py-2">{getTime(item.predicted_for_time)}</div>
                                <div className="col-span-2 px-5 text-left border-t py-2">{item.prediksi_level_muka_air_purwodadi_lstm}</div>
                                <div className="col-span-1 px-5 text-left border-t py-2">{item.prediksi_level_muka_air_purwodadi_gru}</div>
                                <div className="col-span-1 px-5 text-left border-t py-2">{item.prediksi_level_muka_air_purwodadi_tcn}</div>
                                <div className="col-span-2 px-5 text-left border-t py-2">{item.prediksi_level_muka_air_dhompo_lstm}</div>
                                <div className="col-span-1 px-5 text-left border-t py-2">{item.prediksi_level_muka_air_dhompo_gru}</div>
                                <div className="col-span-1 px-5 text-left border-t py-2">{item.prediksi_level_muka_air_dhompo_tcn}</div>
                            </div>
                        ))
                    }

                    <div className="col-span-12 border-t p-2">
                        <div className="flex items-center">
                            <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex===0} className={`${pageIndex===0 ? buttonStyle.disbaled : buttonStyle.enabled} mr-2`}><BsChevronLeft/></button>
                            <button onClick={() => setPageIndex(pageIndex + 1)} disabled={pageIndex === Math.floor(totalLength/10)} className={`${pageIndex === Math.floor(totalLength/10) ? buttonStyle.disbaled : buttonStyle.enabled} mr-5`}><BsChevronRight/></button>
                            <p className="text-sm">
                                Displaying {`${pageIndex*10 + 1} - ${prediksi.length < (pageIndex+1)*10 ? (pageIndex*10+prediksi.length%10): (pageIndex+1)*10} `} out of {totalLength}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
    else if (isLoading){
        return (
            <Loading size={'30px'}/>
        )
    }
    else if(error){
        return (
            <div className="text-red-700">
                {error && error.response.data.message}
            </div>
        )
    }
    
}
 
export default PrediksiTable;
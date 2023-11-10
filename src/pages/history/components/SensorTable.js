import { useGetDate } from "../../../hooks/useGetDateTime";
import { useEffect, useState } from "react";
import { useGetData } from "../../../hooks/useGetData";
import {BsChevronLeft, BsChevronRight, BsFillCalendarDayFill, BsFillClockFill, BsGraphUp} from "react-icons/bs"

const SensorTable = ({user}) => {
    const buttonStyle = {
        disbaled: 'p-1 rounded-full border bg-zinc-100 text-zinc-400',
        enabled: 'p-1 rounded-full border hover:bg-zinc-200'
    }
    const [sensorData, setSensorData] = useState(null);
    const [totalLength, setTotalLength] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const {getDate, getTime} = useGetDate();
    const {getSensorHistory, isLoading, error} = useGetData();
    
    const handleLoadSensorData = async () => {
        const data = await getSensorHistory(user.authorization.token, pageIndex * 10, 10);
        setSensorData(data.data.history);
        setTotalLength(data.data.total_count)
        console.log(data);
    }

    useEffect(() => {
        handleLoadSensorData();

    }, [pageIndex])

    if(sensorData)
        return ( 
            <div className="my-8">
                <div className="rounded-lg min-w-[1000px] border grid grid-cols-12 overflow-hidden text-sm bg-white shadow">
                    <div className="col-span-1 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold">ID</div>
                    <div className="col-span-2 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold"><BsFillCalendarDayFill className="mr-2"/>Tangal</div>
                    <div className="col-span-1 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold"><BsFillClockFill className='mr-2'/>Jam</div>
                    <div className="col-span-2 flex items-center px-5 text-left  bg-blue-100 py-2 font-semibold">CH Cendono (m)</div>
                    <div className="col-span-2 flex items-center px-5 text-left  border-blue-500 bg-blue-100 py-2 font-semibold">CH Lawang (m)</div>
                    <div className="col-span-2 flex items-center px-5 text-left  bg-blue-100 py-2 font-semibold">LMA Purwodadi (m)</div>
                    <div className="col-span-2 flex items-center px-5 text-left  bg-blue-100 py-2 font-semibold">LMA Dhompo (m)</div>

                    {
                        sensorData.map((item, i) => (
                            <div className="col-span-12 grid grid-cols-12" key={i}>
                                <div className="col-span-1 px-5 text-left border-t py-2">{item.id}</div>
                                <div className="col-span-2 px-5 text-left border-t py-2">{getDate(item.tanggal)}</div>
                                <div className="col-span-1 px-5 text-left border-t py-2">{getTime(item.tanggal)}</div>
                                <div className="col-span-2 px-5 text-left border-t py-2">{item.curah_hujan_cendono}</div>
                                <div className="col-span-2 px-5 text-left border-t py-2">{item.curah_hujan_lawang}</div>
                                <div className="col-span-2 px-5 text-left border-t py-2">{item.level_muka_air_purwodadi}</div>
                                <div className="col-span-2 px-5 text-left border-t py-2">{item.level_muka_air_dhompo}</div>
                            </div>
                        ))
                    }

                    <div className="col-span-4 border-t p-2">
                        <div className="flex items-center">
                            <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex===0} className={`${pageIndex===0 ? buttonStyle.disbaled : buttonStyle.enabled} mr-2`}><BsChevronLeft/></button>
                            <button onClick={() => setPageIndex(pageIndex + 1)} disabled={pageIndex === Math.floor(totalLength/10)} className={`${pageIndex === Math.floor(totalLength/10) ? buttonStyle.disbaled : buttonStyle.enabled} mr-5`}><BsChevronRight/></button>
                            <p className="text-sm">
                                Displaying {`${pageIndex*10 + 1} - ${sensorData.length < (pageIndex+1)*10 ? (pageIndex*10+sensorData.length%10): (pageIndex+1)*10} `} out of {totalLength}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        );
}
 
export default SensorTable;
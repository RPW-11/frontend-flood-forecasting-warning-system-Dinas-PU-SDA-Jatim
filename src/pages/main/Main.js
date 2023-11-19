import ElevasiMukaAir from "./components/ElevasiMukaAir";
import LevelMukaAir from "./components/LevelMukaAir";
import Status from "./components/Status";
import Graph from "./components/Graph";
import Graph2 from "./components/Graph2";
import AdminFeature from "./components/AdminFeature";
import { AiOutlineLineChart } from "react-icons/ai";
import { AiOutlineControl } from "react-icons/ai";
import { IoStatsChart, IoLocationOutline } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { MdEngineering } from "react-icons/md";
import { FaHandsClapping } from "react-icons/fa6";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGetDate } from "../../hooks/useGetDateTime";
const Main = () => {
    const currentDate = new Date()
    const [isPeriod, setIsPeriod] = useState(false)
    const [period, setPeriod] = useState(1)
    const [model, setModel] = useState('GRU')
    const [stasiun, setStasiun] = useState('Dhompo')
    const [isStation, setIsStation] = useState(false)
    const [isModel, setIsModel] = useState(false)

    const [aktualAir, setAktualAir] = useState(1)
    const [prediksiAir, setPrediksiAir] = useState(1)
    const [limitAir, setLimitAir] = useState([null, null])

    
    const { user } = useAuthContext();
    const { getDayName } = useGetDate();

    console.log("air pred", prediksiAir);

    const getStatus = (value) => {
        return value <= limitAir[0] ? "Aman" : value > limitAir[0] && value < limitAir[1] ? "Siaga" : value >= limitAir[1] ? "Bahaya" : "Undefined"
    }

    const stateHandler = (val) => {
        setPeriod(val)
        setIsPeriod(false)
    }

    const modelHandler = (val) => {
        setModel(val)
        setIsModel(false)
    }

    const stationHandler = (val) => {
        setStasiun(val)
        setIsStation(false)
        setPeriod(1)
    }

    const getChartParams = () => {
        return {
            model,
            daerah: stasiun,
            periode: period
        }
    }

    return ( 
        <div className="overflow-auto text-black 2xl:px-[50px] h-full">
            <div className="text-left flex items-center mb-5">
                <div>
                    <div className="flex items-center">
                        <p className="font-bold text-xl mr-2">Hi, {user && user.user.nama}</p>
                        <FaHandsClapping/>
                    </div>
                    <p className="text-zinc-500 text-sm">Selamat memonitor air sungai!</p>
                </div>
                <div className="rounded-md text-sm border shadow px-3 py-1 ml-7 min-w-[150px]">
                    <p className="text-zinc-500 text-xs">Tanggal</p>
                    <p className="font-medium">{getDayName(currentDate) + ', ' + currentDate.toISOString().slice(0, 10)}</p>
                </div>
            </div>
            <div className="grid grid-rows-12">
                <div className="row-span-1 flex">
                    <div className="rounded-md border p-5 mr-3 bg-white w-fit shadow">
                        <div className="flex items-center">
                            <div className="rounded-full p-2 border border-neutral-900">
                                <IoStatsChart />
                            </div>
                            <p className="font-semibold ml-3">Perkembangan Air Sungai {stasiun} Aktual</p>
                        </div>
                        <p className="font-light text-xs text-left mt-3">Informasi kondisi sungai saat ini</p>
                        <div className="flex mt-3 text-left ">
                            <div className="flex items-center">
                                <Status value={getStatus(aktualAir)}/>
                                <div className="ml-3"><ElevasiMukaAir value={60}/></div>
                                <div className="ml-3"><LevelMukaAir value={aktualAir}/></div>
                            </div>
                        </div>
                        <div>
                            <Graph2/>
                        </div>
                    </div>
                    <div className="rounded-md border p-5 shadow w-full">
                        <div className="flex items-center">
                            <div className="rounded-full items-center p-2 border border-black">
                                <AiOutlineControl/>
                            </div>
                            <p className="font-bold text-left ml-3">Konfigurasi Prediksi</p>
                        </div>
                        <p className="font-light text-xs text-left mt-3">Atur komponen prediksi dengan menekan tombol pada masing-masing opsi konfigurasi.</p>
                        <div className="flex flex-wrap mt-3">
                            <div className="relative text-left w-[150px] rounded-lg px-3 py-2 bg-purple-100">
                                <div className="flex items-center">
                                    <IoLocationOutline/>
                                    <p className="text-sm font-semibold ml-1">Stasiun</p>
                                </div>
                                <div onClick={() => setIsStation(!isStation)} 
                                className="flex font-base items-center cursor-pointer my-1 bg-purple-200 hover:bg-purple-300 rounded-md px-2 py-1 text-sm">{stasiun}</div>
                                {isStation && <ul className="z-10 text-left text-sm absolute overflow-hidden bg-white top-20 right-0 w-full rounded-lg shadow border">
                                        <li onClick={() => stationHandler('Dhompo')} className="py-2 px-5 cursor-pointer hover:bg-zinc-500">Dhompo</li>
                                        <li onClick={() => stationHandler('Purwodadi')} className="py-2 px-5 cursor-pointer hover:bg-zinc-500">Purwodadi</li>
                                    </ul>}
                            </div>
                            <div className="relative text-left w-[150px] rounded-lg px-3 py-2 bg-blue-100 ml-3">
                                <div className="flex items-center">
                                    <MdEngineering/>
                                    <p className="text-sm font-semibold ml-1">Model</p>
                                </div>
                                <div onClick={() => setIsModel(!isModel)} 
                                className="flex font-base items-center cursor-pointer my-1 bg-blue-200 hover:bg-blue-300 rounded-md px-2 py-1 text-sm">
                                    {model}
                                </div>
                                {isModel && <ul className="z-10 text-left text-sm absolute overflow-hidden bg-white top-20 right-0 w-full rounded-lg shadow border">
                                    <li onClick={() => modelHandler('GRU')} className="p-2 cursor-pointer hover:bg-zinc-500">GRU</li>
                                    <li onClick={() => modelHandler('LSTM')} className="p-2 cursor-pointer hover:bg-zinc-500">LSTM</li>
                                    <li onClick={() => modelHandler('TCN')} className="p-2 cursor-pointer hover:bg-zinc-500">TCN</li>
                                </ul>}
                            </div>
                            <div className="relative text-left w-[150px] rounded-lg px-3 py-2 bg-lime-100 ml-3">
                                <div className="flex items-center">
                                    <IoIosTimer />
                                    <p className="text-sm font-semibold ml-1">Periode</p>
                                </div>
                                <div onClick={() => setIsPeriod(!isPeriod)} 
                                className="flex font-base items-center cursor-pointer my-1 bg-lime-200 hover:bg-lime-300 rounded-md px-2 py-1 text-sm">
                                    {period} Jam
                                </div>
                                {isPeriod && <ul className="z-10 text-left text-sm absolute overflow-hidden bg-white top-20 right-0 w-full rounded-lg shadow border">
                                    <li onClick={() => stateHandler(1)} className="p-2 cursor-pointer hover:bg-zinc-500">1 Jam</li>
                                    <li onClick={() => stateHandler(2)} className="p-2 cursor-pointer hover:bg-zinc-500">2 Jam</li>
                                    <li onClick={() => stateHandler(3)} className="p-2 cursor-pointer hover:bg-zinc-500">3 Jam</li>
                                    {stasiun === 'Dhompo' && <li onClick={() => stateHandler(4)} className="p-2 cursor-pointer hover:bg-zinc-500">4 Jam</li>}
                                    {stasiun === 'Dhompo' && <li onClick={() => stateHandler(5)} className="p-2 cursor-pointer hover:bg-zinc-500">5 Jam</li>}
                                </ul>}
                            </div> 
                        </div>
                        {user && <AdminFeature user={user} currentStasiun={stasiun} setLimitAir={setLimitAir}/>}
                    </div>
                </div>
                <div className="row-span-2 my-3 border rounded-md p-5 shadow">
                    <div className="">
                        <div className="flex items-center">
                            <div className="rounded-full border border-black p-2">
                                <AiOutlineLineChart/>
                            </div>
                            <p className="font-semibold ml-3">Prediksi Perkembangan Air Sungai {stasiun}</p>
                        </div>
                        <p className="font-light text-xs text-left mt-3">Informasi kondisi sungai yang akan datang berdasarkan konfigurasi prediksi.</p>
                        <div className="flex mt-3 text-left ">
                            <div className="flex items-center">
                                <Status value={getStatus(prediksiAir)}/>
                                <div className="ml-3"><ElevasiMukaAir value={12.5}/></div>
                                <div className="ml-3"><LevelMukaAir value={prediksiAir}/></div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <Graph params={getChartParams()} setters={{setAktualAir, setPrediksiAir}}/>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Main;
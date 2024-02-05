import ElevasiMukaAir from "./components/ElevasiMukaAir";
import LevelMukaAir from "./components/LevelMukaAir";
import Status from "./components/Status";
import Graph from "./components/Graph";
import Graph2 from "./components/Graph2";
import CrossDesign from "./components/CrossDesign";
import { AiOutlineLineChart } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { AiOutlineControl } from "react-icons/ai";
import { IoStatsChart } from "react-icons/io5";
import { IoIosTimer } from "react-icons/io";
import { MdEngineering } from "react-icons/md";
import { FaHandsClapping, FaTableCells } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useGetDate } from "../../hooks/useGetDateTime";
import { useNavigate, useParams } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
const Main = () => {
    const currentDate = new Date()
    const { stasiun } = useParams();
    const navigate = useNavigate();
    const [isPeriod, setIsPeriod] = useState(false)
    const [period, setPeriod] = useState(1)
    const [model, setModel] = useState('LSTM')
    const [isModel, setIsModel] = useState(false)
    const [limitAir, setLimitAir] = useState([-1, -1])
    const [showImage, setShowImage] = useState(false)

    const [aktualAir, setAktualAir] = useState(null)
    const [prediksiAir, setPrediksiAir] = useState(null)
    const [chartData, setChartData] = useState([]);


    
    const { user } = useAuthContext();
    const { getStasiunLimitAir, isLoading, error } = useGetData();
    const { getDayName, getTime } = useGetDate();

    

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
    

    useEffect(() => {
        if (stasiun !== 'Dhompo' && stasiun !== 'Purwodadi') {
            navigate('/not-found')
        }
        const id = stasiun === 'Dhompo' ? 1 : 2
        getStasiunLimitAir("rand", id).then(res => {
            const {batas_air_siaga, batas_air_awas} = res.data || [-1, -1]
            setLimitAir([batas_air_siaga, batas_air_awas])
        }).catch()
    }, [])

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
                    <div className="rounded-md border p-5 mr-3 bg-white w-fit 2xl:w-full shadow">
                        <div className="flex items-center">
                            <div className="rounded-full p-2 border border-neutral-900">
                                <IoStatsChart />
                            </div>
                            <p className="font-semibold ml-3">Perkembangan Air Sungai {stasiun} Aktual</p>
                        </div>
                        <p className="font-light text-xs text-left mt-3">Informasi kondisi sungai saat ini</p>
                        <div className="flex mt-3 text-left ">
                            <div className="flex items-center">
                                <Status value={getStatus(aktualAir ? aktualAir : -1)}/>
                                <div className="ml-3"><ElevasiMukaAir value={60}/></div>
                                <div className="ml-3"><LevelMukaAir value={aktualAir}/></div>
                            </div>
                        </div>
                        <div>
                            <CrossDesign levelAir={aktualAir}/>
                        </div>
                    </div>
                    {!showImage ? <div className="rounded-md border p-5 shadow w-full relative">
                        <div className="absolute top-1 right-1 flex items-center">
                            <p className="text-xs italic">Klik icon untuk melihat gambar</p>
                            <div onClick={() => setShowImage(!showImage)}
                            className="p-1 mx-1 cursor-pointer hover:bg-gray-200 rounded-full">
                                <CiImageOn />
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="rounded-full items-center p-2 border border-black">
                                <AiOutlineControl/>
                            </div>
                            <p className="font-bold text-left ml-3">Konfigurasi Prediksi</p>
                        </div>
                        <p className="font-light text-xs text-left mt-3">Atur komponen prediksi dengan menekan tombol pada masing-masing opsi konfigurasi.</p>
                        <div className="flex flex-wrap mt-3">
                            {/* <div className="relative text-left w-[150px] rounded-lg px-3 py-2 bg-blue-100 ml-3">
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
                            </div> */}
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
                        <CrossDesign levelAir={prediksiAir}/>
                    </div> : 
                    <div className="rounded-md border p-5 shadow w-full relative">
                        <div className="absolute top-1 right-1 flex items-center">
                            <p className="text-xs italic">Klik icon untuk sembunyikan gambar</p>
                            <div onClick={() => setShowImage(!showImage)}
                            className="p-1 mx-1 cursor-pointer hover:bg-gray-200 rounded-full">
                                <CiImageOn />
                            </div>
                        </div>
                        <p className="font-semibold text-sm text-left">Gambar Sungai Stasiun {stasiun}</p>
                        <div className="rounded-lg overflow-hidden m-3">
                            <img src="/ffwsview/Gambar_sungai.jpeg" alt="" className="w-full h-full object-contain"/>
                        </div>
                    </div>
                    }
                </div>
                <div className="flex">
                    <div className="row-span-2 my-3 border rounded-md p-5 shadow w-2/3">
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
                                    <Status value={getStatus(prediksiAir ? prediksiAir : -1)}/>
                                    <div className="ml-3"><ElevasiMukaAir value={12.5}/></div>
                                    <div className="ml-3"><LevelMukaAir value={prediksiAir}/></div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <Graph params={{model,daerah: stasiun,periode: period}} setters={{setAktualAir, setPrediksiAir, setChartData}}/>
                        </div>
                    </div>
                    <div className="row-span-2 my-3 ml-3 border rounded-md p-5 shadow w-1/3">
                        <div className="flex items-center">
                            <div className="rounded-full border border-black p-2">
                                <FaTableCells/>
                            </div>
                            <p className="font-semibold ml-3">Tabel Prediksi Perkembangan Air Sungai {stasiun}</p>
                        </div>
                        <div className="grid grid-cols-9 w-full border mt-5 rounded-lg max-h-[350px] text-sm shadow overflow-auto">
                            <div className="col-span-3 font-semibold py-2 border-b h-fit text-sm">Jam</div>
                            <div className="col-span-3 font-semibold py-2 border-b h-fit">Aktual</div>
                            <div className="col-span-3 font-semibold py-2 border-b h-fit">Prediksi</div>

                            {chartData.map(item => 
                                <div className="col-span-9 grid grid-cols-9" key={item.tanggal}>
                                    <div className="col-span-3 py-1 border-b text-sm">{getTime(item.tanggal)}</div>
                                    <div className="col-span-3 py-1 border-b text-sm">{item.aktual}</div>
                                    <div className="col-span-3 py-1 border-b text-sm">{item.prediksi}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Main;
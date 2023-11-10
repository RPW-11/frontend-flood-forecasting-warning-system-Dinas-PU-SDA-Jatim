import ElevasiMukaAir from "./components/ElevasiMukaAir";
import LevelMukaAir from "./components/LevelMukaAir";
import Status from "./components/Status";
import Graph from "./components/Graph";
import Graph2 from "./components/Graph2";
import {BsChevronDown} from 'react-icons/bs';
import { useState } from "react";
const Main = () => {
    const currentDate = new Date()
    const [isPeriod, setIsPeriod] = useState(false)
    const [period, setPeriod] = useState('1 hari')
    const [model, setModel] = useState('GRU')
    const [stasiun, setStasiun] = useState('Gubeng')
    const [isStation, setIsStation] = useState(false)
    const [isModel, setIsModel] = useState(false)

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
    }

    return ( 
        <div className="h-full overflow-auto text-neutral-900">
            <div className="grid grid-rows-6 h-full">
                <div className="row-span-4 py-3">
                    <div className="grid grid-cols-6 h-full">
                        <div className="rounded-md border col-span-2 p-5 mr-3 bg-white">
                            <p className="font-bold text-2xl text-left mb-5">Konfigurasi</p>
                            <div className="flex items-center relative justify-between">
                                <p className="">Stasiun</p>
                                <div onClick={() => setIsStation(!isStation)} 
                                className="flex font-medium items-center rounded-md bg-zinc-200 h-fit cursor-pointer hover:bg-zinc-500 p-1 text-sm w-[100px] justify-center">{stasiun} <BsChevronDown className="text-bold ml-3"/></div>
                                {isStation && <ul className="z-10 text-left text-sm absolute overflow-hidden bg-white top-10 right-0 w-[100px] rounded-lg shadow border">
                                        <li onClick={() => stationHandler('Gubeng')} className="py-2 px-5 cursor-pointer hover:bg-zinc-500">Gubeng</li>
                                        <li onClick={() => stationHandler('Waru')} className="py-2 px-5 cursor-pointer hover:bg-zinc-500">Waru</li>
                                        <li onClick={() => stationHandler('Konoha')} className="py-2 px-5 cursor-pointer hover:bg-zinc-500">Konoha</li>
                                    </ul>}
                            </div>
                            <div className="flex relative justify-between my-3">
                                <p className="">Model</p>
                                <div onClick={() => setIsModel(!isModel)} className="flex font-medium items-center rounded-md bg-zinc-200 h-fit cursor-pointer hover:bg-zinc-500 p-1 text-sm w-[100px] justify-center">
                                    {model} <BsChevronDown className="text-bold ml-2"/>
                                </div>
                                {isModel && <ul className="z-10 text-left text-sm absolute overflow-hidden bg-white top-10 right-0 w-[100px] rounded-lg shadow border">
                                    <li onClick={() => modelHandler('GRU')} className="p-2 cursor-pointer hover:bg-zinc-500">GRU</li>
                                    <li onClick={() => modelHandler('LSTM')} className="p-2 cursor-pointer hover:bg-zinc-500">LSTM</li>
                                    <li onClick={() => modelHandler('TCN')} className="p-2 cursor-pointer hover:bg-zinc-500">TCN</li>
                                </ul>}
                            </div>
                            <div className="relative mb-2 flex justify-between">
                                <p>Prediksi</p>
                                <div onClick={() => setIsPeriod(!isPeriod)} className="flex font-medium items-center rounded-md bg-zinc-200 h-fit cursor-pointer hover:bg-zinc-500 p-1 text-sm w-[100px] justify-center">
                                    {period} <BsChevronDown className="text-bold ml-2"/>
                                </div>
                                {isPeriod && <ul className="z-10 text-left text-sm absolute overflow-hidden bg-white top-10 right-0 w-[100px] rounded-lg shadow border">
                                    <li onClick={() => stateHandler('1 Hari')} className="p-2 cursor-pointer hover:bg-zinc-500">1 Hari</li>
                                    <li onClick={() => stateHandler('3 Hari')} className="p-2 cursor-pointer hover:bg-zinc-500">3 Hari</li>
                                    <li onClick={() => stateHandler('5 Hari')} className="p-2 cursor-pointer hover:bg-zinc-500">5 Hari</li>
                                </ul>}
                            </div> 
                            <div className="mt-10">
                                <p className="my-2 font-medium text-left">Elevasi Muka Air di Stasiun {stasiun}</p>
                                <Graph2/>
                            </div>
                        </div>
                        <div className="col-span-4 rounded-md border ml-3 p-5 bg-white">
                            <p className="text-2xl font-bold text-left">Monitoring muka air di Stasiun {stasiun}</p>
                            <Graph/>
                        </div>
                    </div>
                </div>
                <div className="row-span-2 py-3">
                    <div className="grid grid-cols-2">
                        <div className="col-span-1 rounded-md text-left p-5 border mr-3 bg-white">
                            <p className="font-bold mb-5 text-xl">Kondisi Saat Ini</p>
                            <div className="flex items-center">
                                <LevelMukaAir value={6.31}/>
                                <ElevasiMukaAir value={17.89}/>
                                <Status value={'Bahaya'}/>
                            </div>
                        </div>
                        <div className="col-span-1 rounded-md text-left p-5 border ml-3 bg-white">
                            <p className="font-bold mb-5 text-xl">Kondisi Prediksi</p>
                            <div className="flex items-center">
                                <LevelMukaAir value={6.31}/>
                                <ElevasiMukaAir value={17.89}/>
                                <Status value={'Siaga'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Main;
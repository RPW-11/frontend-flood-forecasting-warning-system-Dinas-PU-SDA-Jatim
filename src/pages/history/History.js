import SensorTable from "./components/SensorTable";
import PrediksiTable from "./components/PrediksiTable";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams, useNavigate } from "react-router-dom";
const History = () => {
    const [isSensor, setIsSensor] = useState(true);
    const [isClicking, setIsClicking] = useState(false);
    const { stasiun } = useParams();
    const navigate = useNavigate();
    const handleClick = (cb) => {
        cb();
        setIsClicking(false);
    }

    const {user} = useAuthContext();

    useEffect(() => {
        if (stasiun !== 'Cendono' && stasiun !== 'Lawang') {
            navigate('/not-found')
        }
    }, [])

    
    return ( 
        <div className="p-10 bg-white rounded-md text-left">
            <p className="text-3xl font-bold text-left">History Hasil</p>
            <div className="flex items-center relative w-fit">
                <p className="text-lg mr-[100px]">Pilih Jenis History</p>
                <button onClick={() => {setIsClicking(!isClicking)}} className="px-5 py-1 rounded-lg hover:bg-zinc-400 bg-zinc-200 font-bold my-5">{isSensor ? 'Sensor' : 'Prediksi'}</button>
                {isClicking && <div className="w-fit absolute rounded-lg overflow-hidden bg-white right-0 top-[60px] border">
                    <p onClick={() => handleClick(() => setIsSensor(false))}className="py-2 hover:bg-zinc-200 px-5 cursor-pointer">Prediksi</p>
                    <p onClick={() => handleClick(() => setIsSensor(true))}className="py-2 hover:bg-zinc-200 px-5 cursor-pointer">Sensor</p>
                </div>}
            </div>
            {isSensor ? <SensorTable user={user} stasiun={stasiun}/> : <PrediksiTable user={user}/>}
        </div>
    );
}
 
export default History;
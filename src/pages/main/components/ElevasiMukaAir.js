import { IoMdClock } from "react-icons/io";
import { useGetDate } from "../../../hooks/useGetDateTime";
import { useEffect, useState } from "react";
const ElevasiMukaAir = () => {
    const [time, setTime] = useState(new Date());
    const { getDayName, getTime } = useGetDate()

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalID);
    }, []); 
    
    return ( 
        <div className="bg-white border p-3 text-left rounded-lg whitespace-nowrap">
            <div className="flex items-center">
                <div>
                    <p className="text-sm">{getDayName(time) + ', ' + time.toISOString().slice(0, 10)}</p>
                    <p className="text-2xl font-bold">
                        {getTime(time)}
                    </p>
                </div>
                <div className="rounded-full border ml-5">
                    <IoMdClock size={40}/>
                </div>
            </div>
        </div>
     );
}
 
export default ElevasiMukaAir;
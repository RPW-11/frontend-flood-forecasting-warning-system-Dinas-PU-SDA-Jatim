import { IoIosWater } from "react-icons/io";
const ElevasiMukaAir = ({value}) => {
    return ( 
        <div className="bg-white border p-3 text-left rounded-lg whitespace-nowrap">
            <div className="flex items-center">
                <div>
                    <p className="text-sm">Elevasi Muka Air</p>
                    <p className="text-2xl font-bold">
                        {value} <s className="no-underline text-base font-light">SHVP</s>
                    </p>
                </div>
                <div className="rounded-full p-2 border ml-5">
                    <IoIosWater size={20} className="text-cyan-400"/>
                </div>
            </div>
        </div>
     );
}
 
export default ElevasiMukaAir;
import { FaWater } from "react-icons/fa";
const LevelMukaAir = ({value}) => {
    return ( 
        <div className="p-3 text-left rounded-lg bg-white border whitespace-nowrap">
            <div className="flex items-center">
                <div>
                    <p className="text-sm">Tinggi Muka Air</p>
                    <p className="text-2xl font-bold">
                        {value} <s className="no-underline text-base font-light">m</s>
                    </p>
                </div>
                <div className="rounded-full p-2 border ml-5">
                    <FaWater size={20} className="text-cyan-400"/>
                </div>
            </div>
        </div>
     );
}
 
export default LevelMukaAir;
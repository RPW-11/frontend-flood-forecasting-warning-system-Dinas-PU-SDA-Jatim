import { FaCheck } from "react-icons/fa";

const Status = ({value}) => {
    const colorMap = {
        'Aman': 'text-green-700 border bg-white p-3 text-left rounded-lg',
        'Siaga': 'text-white bg-yellow-700 p-3 text-left rounded-lg',
        'Bahaya': 'bg-red-700 text-white p-3 text-left rounded-lg'
    }
    return ( 
        <div className={`${colorMap[value]} min-w-[120px]`}>
            <div className="flex items-center">
                <div>
                    <p className="text-sm">Status</p>
                    <p className="text-2xl font-bold">
                        {value}
                    </p>
                </div>
                <div className="rounded-full p-2 border ml-5">
                    <FaCheck size={20}/>
                </div>
            </div>
        </div>
     );
}
 
export default Status;
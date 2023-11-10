const Status = ({value}) => {
    const colorMap = {
        'Aman': 'text-blue-700 border bg-white shadow p-3 text-left rounded-lg',
        'Siaga': 'text-white bg-orange-700 p-3 text-left rounded-lg',
        'Bahaya': 'bg-red-700 text-white p-3 text-left rounded-lg'
    }
    return ( 
        <div className={`${colorMap[value]} w-full mx-1`}>
            <p className="">Status</p>
            <p className="text-2xl font-bold">
                {value}
            </p>
        </div>
     );
}
 
export default Status;
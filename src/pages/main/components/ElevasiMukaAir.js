const ElevasiMukaAir = ({value}) => {
    return ( 
        <div className="bg-lime-400 p-3 text-left rounded-lg h-full w-full mx-1">
            <p className="">Elevasi Muka Air</p>
            <p className="text-2xl font-bold">
                {value} <s className="no-underline text-base font-light">SHVP</s>
            </p>
        </div>
     );
}
 
export default ElevasiMukaAir;
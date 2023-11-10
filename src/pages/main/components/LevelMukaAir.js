const LevelMukaAir = ({value}) => {
    return ( 
        <div className="p-3 text-left text-white rounded-lg bg-neutral-900 w-full mx-1">
            <p className="">Level Muka Air</p>
            <p className="text-2xl font-bold">
                {value} <s className="no-underline text-base font-light">m</s>
            </p>
        </div>
     );
}
 
export default LevelMukaAir;
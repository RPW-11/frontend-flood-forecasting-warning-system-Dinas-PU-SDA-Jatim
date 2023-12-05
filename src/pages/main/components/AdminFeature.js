import { IoWarningOutline, IoCloseCircle} from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useGetData } from "../../../hooks/useGetData";
const AdminFeature = ({user, currentStasiun, setLimitAir}) => {
    const adminRole = Number(process.env.REACT_APP_ADMIN_ROLE);
    const [currentFeature, setCurrentFeature] = useState(null)
    const [limitSiaga, setLimitSiaga] = useState(1)
    const [limitAwas, setLimitAwas] = useState(1)
    const [stationInformation, setStationInformation] = useState(null)

    const { getStasiunLimitAir, updateLimitAir, error } = useGetData();

    const handleApply = async () => {
        const res = await updateLimitAir(user.authorization.token, {
            id: stationInformation.id,
            new_batas_air_siaga: limitSiaga,
            new_batas_air_awas: limitAwas
        })
        if(res) {
            setStationInformation(res.data)
            setLimitAwas(res.data.batas_air_awas)
            setLimitSiaga(res.data.batas_air_siaga)
            setLimitAir([res.data.batas_air_siaga, res.data.batas_air_awas])
        }

        setCurrentFeature(null)
    }

    const handleChange = (e) => {
        if (currentFeature === 'siaga') {
            setLimitSiaga(e.target.value)
        }
        else {
            setLimitAwas(e.target.value)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            const res = await getStasiunLimitAir(user.authorization.token);
            if(res) {
                const statiunData = res.data.find((item) => item.nama_pos === currentStasiun.toLowerCase())
                setLimitAir ([statiunData.batas_air_siaga, statiunData.batas_air_awas])
                setLimitAwas(statiunData.batas_air_awas)
                setLimitSiaga(statiunData.batas_air_siaga)
                setStationInformation(statiunData)
            }
        }
        loadData()
    }, [currentStasiun])

    return ( 
        <div className="">
            <p className="font-medium text-sm text-left mt-3">Admin Setting <s className="no-underline text-zinc-500 italic">{(user && user.user.role !== adminRole) && '(Anda bukan seorang Admin)'}</s></p>
            <p className="font-light text-xs text-left mt-2">Atur limit bahaya air dengan memasukkan nilai yang sesuai.</p>
            <div className="flex items-center">
                <div className={`relative text-left w-[150px] rounded-lg px-3 py-2 ${user && user.user.role === adminRole ? 'bg-orange-100' : 'bg-zinc-100'} mt-3`}>
                    <div className="flex items-center">
                        <IoWarningOutline />
                        <p className={`text-sm font-semibold ml-1 ${user.user.role !== adminRole && 'text-zinc-500'}`}>Limit Air Siaga</p>
                    </div>
                    {user && <div onClick={() => {(user.user.role === adminRole) && setCurrentFeature("siaga")}} 
                        className={user.user.role === adminRole ? 
                        `flex font-base items-center my-1 bg-orange-200 cursor-pointer hover:bg-orange-300 rounded-md px-2 py-1 text-sm` : 
                        `flex font-base items-center my-1 bg-zinc-200 rounded-md px-2 py-1 text-sm text-zinc-500`}>
                            {limitSiaga} meter
                        </div>}
                </div>
                <div className={`relative text-left w-[150px] rounded-lg px-3 py-2 ml-3 ${user && user.user.role === adminRole ? 'bg-red-100' : 'bg-zinc-100'} mt-3`}>
                    <div className="flex items-center">
                        <MdErrorOutline />
                        <p className={`text-sm font-semibold ml-1 ${user.user.role !== adminRole && 'text-zinc-500'}`}>Limit Air Awas</p>
                    </div>
                    {user && <div onClick={() => {(user.user.role === adminRole) && setCurrentFeature("awas")}} 
                        className={user.user.role === adminRole ? 
                        `flex font-base items-center my-1 bg-red-200 cursor-pointer hover:bg-red-300 rounded-md px-2 py-1 text-sm` : 
                        `flex font-base items-center my-1 bg-zinc-200 rounded-md px-2 py-1 text-sm text-zinc-500`}>
                            {limitAwas} meter
                        </div>}
                </div>
                <p className="text-red-700 text-xs">{error && error.response.data.message}</p>
            </div>

            {currentFeature && 
                (
                    <div className="fixed bg-gray-900/25 m-auto h-screen w-screen left-0 top-0 flex justify-center items-center">
                        <div className="relative rounded-lg p-5 bg-white">
                            <IoCloseCircle onClick={() => setCurrentFeature(null)}
                            className="top-1 right-1 absolute cursor-pointer hover:text-blue-700" size={20}/>
                            <p className="">Masukkan nilai limit air {currentFeature}</p>
                            <input value={currentFeature === 'siaga' ? limitSiaga : limitAwas} onChange={handleChange}
                            type="number" className="m-auto rounded-md bg-zinc-200 px-3 py-1 mt-3 outline-none border w-full"/>
                            <button onClick={handleApply}
                            className="rounded-full w-full bg-black text-white mt-3">Apply</button>
                        </div>
                    </div>
                )
            }
        </div>
     );
}
 
export default AdminFeature;
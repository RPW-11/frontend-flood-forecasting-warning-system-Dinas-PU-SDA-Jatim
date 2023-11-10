import { useState, useEffect } from "react";
import {AiFillHome,AiOutlineHistory} from "react-icons/ai";
import {LuLayoutDashboard} from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
    const [states, setStates] = useState([true, false, false])
    const location = useLocation();
    const styleIncative = 'text-zinc-500'
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const {logout} = useLogout();

    const stateHandler = (location, i) => {
        const newStates = states.map((_, ind) => ind === i)
        setStates(newStates)
        navigate(location)
    }

    const handleLogout = () => {
        logout(user.authorization.token);
    }

    useEffect(() => {
        const mapButton = [
            "/" === location.pathname ? true : false,
            "/dashboard" === location.pathname ? true : false,
            "/history" === location.pathname ? true : false,
        ]
        setStates(mapButton);
    }, [location])

    return ( 
        <div className="h-screen w-[250px] p-7 bg-neutral-900 text-white flex flex-col">
            <div className="flex-initial text-left">
                <p className="font-light">SELAMAT DATANG</p>
                <p className="font-semibold my-2">{user && user.user.nama}</p>
            </div>
            <div className="flex flex-col justify-between flex-auto">
                <ul className="py-5 mt-[70px]">
                    <li onClick={() => stateHandler('/',0)} className={`${!states[0] && styleIncative} flex items-center w-full cursor-pointer`}><AiFillHome className="mr-2"/>Utama</li>
                    <li onClick={() => stateHandler('/dashboard',1)} className={`${!states[1] && styleIncative} flex items-center w-full cursor-pointer`}><LuLayoutDashboard className="mr-2"/>Dashboard</li>
                    <li onClick={() => stateHandler('/history',2)} className={`${!states[2] && styleIncative} flex items-center w-full cursor-pointer`}><AiOutlineHistory className="mr-2"/>History</li>
                </ul>
                <div className="">
                    {user && <button onClick={handleLogout} className="rounded-md text-zinc-300 w-full bg-red-700 hover:text-white font-medium text-sm py-1">LOGOUT</button>}
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;
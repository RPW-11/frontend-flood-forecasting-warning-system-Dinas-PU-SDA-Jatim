import { useState, useEffect } from "react";
import {AiFillHome,AiOutlineHistory} from "react-icons/ai";
import {LuLayoutDashboard} from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
    const [states, setStates] = useState([true, false, false])
    const location = useLocation();
    const styleIncative = 'text-zinc-500 font-medium hover:bg-zinc-200'
    const styleActive = 'text-black font-medium bg-zinc-200'
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
        <div className="h-screen w-[250px] py-7 px-5 bg-white flex flex-col border-r">
            <div className="flex flex-col flex-auto">
                <p className="text-zinc-500 font-semibold text-xs text-left">MENU UTAMA</p>
                <ul className="py-3">
                    <li onClick={() => stateHandler('/',0)} className={`${!states[0] ? styleIncative : styleActive} flex items-center w-full cursor-pointer px-3 py-1 rounded-lg my-1 `}><AiFillHome className="mr-2"/>Utama</li>
                    <li onClick={() => stateHandler('/dashboard',1)} className={`${!states[1] ? styleIncative : styleActive} flex items-center w-full cursor-pointer px-3 py-1 rounded-lg my-1 `}><LuLayoutDashboard className="mr-2"/>Dashboard</li>
                    <li onClick={() => stateHandler('/history',2)} className={`${!states[2] ? styleIncative : styleActive} flex items-center w-full cursor-pointer px-3 py-1 rounded-lg my-1 `}><AiOutlineHistory className="mr-2"/>History</li>
                </ul>
                <div className="">
                    {user && <button onClick={handleLogout} className="rounded-md text-zinc-300 w-full bg-red-700 hover:text-white font-medium text-sm py-1">LOGOUT</button>}
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import Loading from "../../components/Loading";

const Auth = () => {
    const [isSigningup, setIsSigningup] = useState(false);
    const [isHiding, setIsHiding] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, register, isLoading, error} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        // call the api
        const res = await login(email, password);
        setEmail(''); setPassword('');
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        // call the api
        const res = await register(username, email, password);
        setUsername(''); setEmail(''); setPassword('');
        setIsSigningup(false);
    }

    return ( 
        <div className="flex font-sans justify-center items-center w-screen h-screen bg-neutral-900">
            <div className="bg-white rounded-lg p-5 shadow border lg:w-1/2 grid grid-cols-2">
                <div className="col-span-1 pl-5 pr-10 m-auto">
                    <div className="rounded-lg overflow-hidden border">
                        <img className="object-cover w-full h-full"
                        src="https://st2.depositphotos.com/2922133/7310/v/450/depositphotos_73109519-stock-illustration-businessman-with-graph.jpg" alt="" />
                    </div>
                </div>
                <div className="col-span-1 py-3">
                    <p className="text-2xl font-bold text-neutral-900 font-serif py-3">{isSigningup ? 'Daftar terlebih dahulu.' : 'Login terlebih dahulu.'}</p>
                    <form onSubmit={isSigningup ? handleRegister : handleLogin} className="my-7">
                        <p className="text-red-700 text-center text-sm">{error}</p>
                        {isSigningup && (
                            <>
                                <label className="block text-sm font-semibold mt-7">U S E R N A M E</label>
                                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Masukkan username" className="focus:border-neutral-900 outline-none text-sm border-b w-full py-1"/>
                            </>
                        )}
                        <label className="block text-sm font-semibold mt-7">E M A I L</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Masukkan email" className="focus:border-neutral-900 outline-none text-sm border-b w-full py-1"/>
                        <label className="block text-sm font-semibold mt-7">P A S S W O R D</label>
                        <div className="relative">
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type={isHiding ? "password" : "text"} placeholder="Masukkan password" className="focus:border-neutral-900 outline-none text-sm border-b w-full py-1"/>
                            {isHiding ? <AiFillEye onClick={() => setIsHiding(false)} className="absolute top-2 bottom-0 right-1 cursor-pointer"/> : <AiFillEyeInvisible onClick={() => setIsHiding(true)} className="absolute top-2 bottom-0 right-1 cursor-pointer"/>}
                        </div>
                        <button className="p-2 font-bold rounded-full text-center bg-neutral-900 text-white w-full mt-5 m-auto">{isLoading ? <Loading size={'30px'}/> : isSigningup ? 'SIGN UP' : 'LOGIN'}</button>
                    </form>
                    <p className="text-center text-sm">{isSigningup ? 'Sudah memiliki akun? Login' : 'Belum memiliki akun? Daftar'} <s onClick={() => setIsSigningup(!isSigningup)} className="cursor-pointer no-underline font-bold hover:underline">disini</s></p>
                </div>
            </div>
        </div>
     );
}
 
export default Auth;
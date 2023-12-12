import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await api.post('/login', {
                email: email.trim(),
                password: password.trim()
            })
            dispatch({ type: 'LOGIN', payload: res.data });
            localStorage.setItem('user', JSON.stringify(res.data));
            setIsLoading(false);
            navigate('/');
            return res.data;
        } catch (error) {
            setError(error.response.data.message);
            setIsLoading(false);
            console.log(error);
            return null;
        }
    }

    const register = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await api.post('/register', {
                nama: username.trim(),
                email: email.trim(),
                password: password.trim()
            })
            setIsLoading(false);
            return res.data;
        } catch (error) {
            console.log("error occured", error);
            setError(error.response.data.message);
            setIsLoading(false);
            return null;
        }
    }

    const logout = async (token) => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await api.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setIsLoading(false);
            return res.data;
        } catch (error) {
            console.log("error occured", error);
            setError(error.response.data.message);
            setIsLoading(false);
            return null;
        }
    }

    return {login, register, logout, isLoading, error};
}
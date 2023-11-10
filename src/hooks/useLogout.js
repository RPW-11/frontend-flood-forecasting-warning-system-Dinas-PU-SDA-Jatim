import { useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const logout = (token) => {
        setIsLoading(true);
        setError(null);
        try {
            api.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({ type: 'LOGOUT'});
            localStorage.removeItem('user');
            setIsLoading(false);
            navigate('/auth');
        } catch (error) {
            setError(error.response.data.message);
            setIsLoading(false);
            return null;
        }
    }

    return {logout, isLoading, error};
}
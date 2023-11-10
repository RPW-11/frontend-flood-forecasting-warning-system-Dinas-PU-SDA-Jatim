import api from "../api"
import { useState } from "react";
export const useGetData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSensorHistory = async (token, offset, limit) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`/getHistory?offset=${offset}&limit=${limit}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setIsLoading(false)
            return res.data
        } catch (error) {
            setError(error)
            setIsLoading(false)
            console.log(error)
            return null;
        }
    }

    const getPredictionHistory = async (token, offset, limit) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`/getHistoryPrediction?offset=${offset}&limit=${limit}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setIsLoading(false)
            return res.data
        } catch (error) {
            setError(error)
            setIsLoading(false)
            console.log(error)
            return null;
        }
    }

    return {getSensorHistory, getPredictionHistory, isLoading, error}

}
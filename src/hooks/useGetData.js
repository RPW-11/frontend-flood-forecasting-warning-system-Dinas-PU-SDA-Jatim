import api from "../api"
import { useState } from "react";
export const useGetData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getSensorHistory = async (token='def', offset, limit, daerah) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`/getHistory?daerah=${daerah.toLowerCase()}&offset=${offset}&limit=${limit}`, {
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

    const getPredictionHistory = async (token='def', offset, limit) => {
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

    const getStasiunLimitAir = async (token='def', stasiunId) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`/getStasiunAirInfo?id=${stasiunId}`, {
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

    const updateLimitAir = async (token='def', body) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await api.patch(`/updateBatasAirStasiun`, body, {
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

    return {getSensorHistory, getPredictionHistory, getStasiunLimitAir, updateLimitAir, isLoading, error}

}
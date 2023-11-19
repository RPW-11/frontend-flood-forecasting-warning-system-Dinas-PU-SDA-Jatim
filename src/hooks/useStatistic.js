import api from "../api"
import { useState } from "react";
export const useStatistic = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getChartData = async (token, model, daerah, periode) => {
        setIsLoading(true)
        setError(null)

        try {
            // const url = 
            console.log(model, daerah, periode);
            const res = await api.get(`/getChartData?model=${model.toLowerCase()}&daerah=${daerah.toLowerCase()}&periode=${periode}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data);
            setIsLoading(false)
            return res.data
        } catch (error) {
            console.log(error);
            setError(error);
            setIsLoading(false)
            return
        }
    }

    return {getChartData, isLoading, error}

}
import api from "../api"
import { useState } from "react";
export const useAdmin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllUsers = async (token) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await api.get(`/getAllKontak`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setIsLoading(false)
            return res.data
        } catch (error) {
            setError(error.response.data.message)
            setIsLoading(false)
            console.log(error)
            return null;
        }
    }

    const addKontak = async (token, nama_kontak, no_telp) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await api.post(`/addKontak`, {nama_kontak, no_telp}, {
                headers: {Authorization: `Bearer ${token}`}
            });
            setIsLoading(false)
            return res.data
        } catch (error) {
            console.log(error)
            console.log(error.response.data.data.no_telp[0]);
            setError(error.response.data.data.no_telp[0])
            setIsLoading(false)
            return null;
        }
    }

    const updateKontak = async (token, new_nama_kontak, new_no_telp, id) => {
        setIsLoading(true)
        setError(null)
        try {
            const res = await api.patch(`/updateKontakInfo`, {id, new_nama_kontak, new_no_telp}, {
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

    return {getAllUsers, addKontak, updateKontak, isLoading, error}

}
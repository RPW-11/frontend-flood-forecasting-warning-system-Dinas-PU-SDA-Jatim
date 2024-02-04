import { useEffect, useState } from "react";
import { useAdmin } from "../../../hooks/useAdmin";
import Modal from "../../../components/Modal";

const UserTable = ({user}) => {
    const [users, setUsers] = useState([])
    const [update, setUpdate] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState(null);

    const { getAllUsers, addKontak, updateKontak, isLoading, error } = useAdmin();
    const handleLoadUser = async () => {
        const res = await getAllUsers(user.authorization.token)
        if (res) {
            setUsers(res.data)
        }
    }

    const handleOpenModal = (state, userinfo=null) => {
        setOpenModal(true)
        if (state === 'add') {
            setModalType(<Modal component={<FormUser nama={null} nohp={null} type={"TAMBAH"} handler={handleAddKontak} error={error}/>} close={() => setOpenModal(false)}
            message="Masukkan informasi pada form di bawah" modalTitle="Tambah Kontak"/>)
        } else {
            setModalType(<Modal component={<FormUser nama={userinfo.nama} nohp={userinfo.nohp} id={userinfo.id} type={"UPDATE"} handler={handleUpdateKontak} error={error}/>}
            close={() => setOpenModal(false)}
            message="Masukkan informasi pada form di bawah" modalTitle="Update Kontak"/>)
        }
    }

    const handleAddKontak = async (nama, no_hp) => {
        const res = await addKontak(user.authorization.token, nama, no_hp);
        if (res) {
            setUpdate(true);
            setOpenModal(false);
            return "sucess"
        }
        return "Nomor harus dalam format Indonesia (+62)"
    }

    const handleUpdateKontak = async (nama, no_hp, id) => {
        const res = await updateKontak(user.authorization.token, nama, no_hp, id)
        if (res) {
            setUpdate(true);
            setOpenModal(false);
            return "sucess"
        }
        return "Nomor harus dalam format Indonesia (+62)"
    }

    useEffect(() => {
        handleLoadUser()
        setUpdate(false)
    }, [update])

    return (
        <div className="text-left">
            {/*{openModal && modalType}*/}
            {/*<p className="font-semibold text-xl text-left my-3">Tabel Kontak</p>*/}
            {/*<button onClick={() => handleOpenModal('add')}*/}
            {/*className="text-sm rounded-md bg-black hover:bg-gray-700 text-white text-center px-5 py-1">Tambah Kontak</button>*/}
            {/*<div className="grid grid-cols-10 my-3 border rounded-lg shadow text-center">*/}
            {/*    <div className="col-span-1 font-semibold py-2 text-sm border-b">ID</div>*/}
            {/*    <div className="col-span-3 font-semibold py-2 text-sm border-b">Nama</div>*/}
            {/*    <div className="col-span-3 font-semibold py-2 text-sm border-b">Nomor Telepon</div>*/}
            {/*    <div className="col-span-3 font-semibold py-2 text-sm border-b">Aksi</div>*/}

            {/*    {users.map(item => (*/}
            {/*        <div className="col-span-10 grid grid-cols-10" key={item.id}>*/}
            {/*            <div className="col-span-1 border-b text-sm py-1">{item.id}</div>*/}
            {/*            <div className="col-span-3 border-b text-sm py-1">{item.nama_kontak}</div>*/}
            {/*            <div className="col-span-3 border-b text-sm py-1">{item.no_telp}</div>*/}
            {/*            <div className="col-span-3 border-b text-sm py-1 flex-wrap flex justify-center">*/}
            {/*                <button onClick={() => handleOpenModal('update', {nama:item.nama_kontak, nohp:item.no_telp, id: item.id})}*/}
            {/*                className="text-sm rounded-md bg-black hover:bg-gray-700 text-white text-center px-5 py-1">Edit</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
     );
}

const FormUser = ({nama, nohp, id, type, handler}) => {
    const [name, setName] = useState(nama ? nama: '')
    const [hp, setHp] = useState(nohp ? nohp : '')
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        let res = null;
        if (handler && type === 'TAMBAH') {
            res = await handler(name, hp);
        } else if (handler && type === 'UPDATE') {
            res = await handler(name, hp, id)
        }
        if (res !== 'sucess') {
            setError(res)
        }
    }
    return (
        <div className="">
            <form className="my-3">
                <label className="block">Nama</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="border border-black px-3 py-1 rounded-lg w-full"/>
                <label className="block">No Hp</label>
                <label className="block text-sm italic mb-1">Nomor telepon harus berawalan +62</label>
                <input value={hp} onChange={(e) => setHp(e.target.value)} type="text" className="border border-black px-3 py-1 rounded-lg w-full"/>
            </form>
            <p className="text-xs italic text-red-700 text-center mb-2">{error}</p>
            <button onClick={handleSubmit}
            className="px-5 py-1 text-sm font-semibold my-1 bg-black text-white rounded-lg hover:bg-gray-700">{type}</button>
        </div>
    )
}

export default UserTable;
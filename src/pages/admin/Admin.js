import { useAuthContext } from "../../hooks/useAuthContext";
import AdminFeature from "./component/AdminFeature";
import UserTable from "./component/UserTable";
import Modal from "../../components/Modal";
const Admin = () => {
    const { user } = useAuthContext();
    return ( 
        <div className="">
            {user && <AdminFeature user={user}/>}
            {user && <UserTable user={user}/>}
        </div>
     );
}
 
export default Admin;
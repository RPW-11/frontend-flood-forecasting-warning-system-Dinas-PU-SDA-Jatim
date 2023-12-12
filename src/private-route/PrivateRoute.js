import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <Navigate to={'/auth'}/>
    } else if (user.user.role !== Number(process.env.REACT_APP_ADMIN_ROLE)) {
        return <Navigate to={'/not-found'}/>
    }
    return children;
}
 
export default PrivateRoute;
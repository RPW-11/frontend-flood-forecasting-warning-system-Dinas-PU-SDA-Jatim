import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? children : children //<Navigate to={'/auth'}/>;
}
 
export default PrivateRoute;
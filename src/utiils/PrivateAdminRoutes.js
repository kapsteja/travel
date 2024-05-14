import { Outlet, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";


const PrivateAdminRoutes = () => {
    let auth = {'token': false}
    const user = useSelector((state) => state.admin)

    return(
        user  | JSON.parse(localStorage.getItem("user"))?.role == "admin" ?  <Outlet/>: <Navigate to="/"/> 
    )
}

export default PrivateAdminRoutes

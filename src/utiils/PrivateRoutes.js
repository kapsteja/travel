import { Outlet, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";


const PrivateRoutes = () => {
    let auth = {'token': false}
    const user = useSelector((state) => state.user)

    return(
        JSON.parse(localStorage.getItem("user"))?.role == "user" ||  JSON.parse(localStorage.getItem("user"))?.role == "admin" || JSON.parse(localStorage.getItem("user"))?.role == "zoneAdmin" || JSON.parse(localStorage.getItem("user"))?.role == "vendor"? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes

import { Outlet, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";


const PrivateZoneAdmin = () => {
    let auth = {'token': false}
    const user = useSelector((state) => state.zoneAdmin)

    return(
        user  | JSON.parse(localStorage.getItem("user"))?.role == "zoneAdmin" ?  <Outlet/>: <Navigate to="/"/> 
    )
}

export default PrivateZoneAdmin

import React from "react";
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux'





const Sidecomponent = () => {
    const user = useSelector((state) => state.user)
    // const admin = useSelector((state) => state.admin)
    const onlyForUser =  user.loggedIn | JSON.parse(localStorage.getItem("user"))?.role == 'user' &&  <>
        <li><Link to="/Profile"><i className="fa fa-sign-out"></i>Profile</Link></li>
                <li><Link to="/Bookings"><i className="fa fa-sign-out"></i>Bookings</Link></li>
                <li><Link to="/Trips"><i className="fa fa-sign-out"></i>Trips</Link></li>
    </>
    const forAdmin =
    JSON.parse(localStorage.getItem("user"))?.role == 'admin' && <>
     <li><Link to="/Profile"><i className="fa fa-sign-out"></i>Profile</Link></li>
                <li><Link to="/Bookings"><i className="fa fa-sign-out"></i>Bookings</Link></li>
                <li><Link to="/Trips"><i className="fa fa-sign-out"></i>Trips</Link></li>
    <li><Link to="/Drivers"><i className="fa fa-user"></i>Drivers</Link></li>
                <li><Link to="/Admin"><i className="fa fa-user"></i>Admin</Link></li>
                <li><Link to="/User"><i className="fa fa-user"></i>User</Link></li>
                <li><Link to="/Vehicles"><i className="fa fa-calendar"></i>Vehicles</Link></li>
                <li><Link to="/Zones"><i className="fa fa-car"></i>Zones</Link></li>
                 <li><Link to="/Search-history"><i className="fa fa-sign-out"></i>Search History</Link></li>

                 </>

    const zoneAdmin =JSON.parse(localStorage.getItem("user"))?.role == 'zoneAdmin' && <>
    <li><Link to="/Profile"><i className="fa fa-sign-out"></i>Profile</Link></li>
                <li><Link to="/Bookings"><i className="fa fa-sign-out"></i>Bookings</Link></li>
                <li><Link to="/Trips"><i className="fa fa-sign-out"></i>Trips</Link></li>
                <li><Link to="/Drivers"><i className="fa fa-user"></i>Drivers</Link></li>
                <li><Link to="/User"><i className="fa fa-user"></i>User</Link></li>
                <li><Link to="/Vehicles"><i className="fa fa-calendar"></i>Vehicles</Link></li>
    </>
    const vendor = JSON.parse(localStorage.getItem("user"))?.role == 'vendor' && <>
    <li><Link to="/Profile"><i className="fa fa-sign-out"></i>Profile</Link></li>
        <li><Link to="/Vehicles"><i className="fa fa-calendar"></i>Vehicles</Link></li>
        <li><Link to="/Bookings"><i className="fa fa-sign-out"></i>Bookings</Link></li>
                <li><Link to="/Trips"><i className="fa fa-sign-out"></i>Trips</Link></li>
    </>
    return (

        <div>
            <ul>


            <li><Link to="/Profile"><i className="fa fa-sign-out"></i>Profile</Link></li>
                <li><Link to="/Bookings"><i className="fa fa-sign-out"></i>Bookings</Link></li>
                <li><Link to="/Trips"><i className="fa fa-sign-out"></i>Trips</Link></li>
    <li><Link to="/Drivers"><i className="fa fa-user"></i>Drivers</Link></li>
                <li><Link to="/Admin"><i className="fa fa-user"></i>Admin</Link></li>
                <li><Link to="/User"><i className="fa fa-user"></i>User</Link></li>
                <li><Link to="/Vehicles"><i className="fa fa-calendar"></i>Vehicles</Link></li>
                <li><Link to="/Zones"><i className="fa fa-car"></i>Zones</Link></li>
                 <li><Link to="/Search-history"><i className="fa fa-sign-out"></i>Search History</Link></li>

                
                 {/* {onlyForUser}
                 {forAdmin}
                 {zoneAdmin}
                {vendor} */}

                 
               
                
                
            </ul>
        </div>

    )
}
export default Sidecomponent

// import React from "react";
// import { Link } from 'react-router-dom';

// const Sidecomponent = () => {
//     return (
//         <div>
//             <ul>
//                 <li className="dropdown">
//                     <a href="#" className="dropdown-toggle" data-toggle="dropdown">
//                         <i className="fa fa-users"></i> Users <b className="caret"></b>
//                     </a>
//                     <ul className="dropdown-menu">
//                         <li><Link to="/Drivers"><i className="fa fa-user"></i> Drivers</Link></li>
//                         <li><Link to="/Admin"><i className="fa fa-user"></i> Admin</Link></li>
//                     </ul>
//                 </li>
//                 <li><Link to="/Vehicles"><i className="fa fa-calendar"></i> Vehicles</Link></li>
//                 <li><Link to="/Zones"><i className="fa fa-car"></i> Zones</Link></li>
//                 <li><Link to="/Bookings"><i className="fa fa-sign-out"></i> Bookings</Link></li>
//                 <li><Link to="/Trips"><i className="fa fa-sign-out"></i> Trips</Link></li>
//                 <li><Link to="/Search-history"><i className="fa fa-sign-out"></i> Search History</Link></li>
//                 <li><Link to="/Profile"><i className="fa fa-sign-out"></i> Profile</Link></li>
//             </ul>
//         </div>
//     )
// }

// export default Sidecomponent;



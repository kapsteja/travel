
import React from 'react';






import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import './App.css';
import Home from './components/Home';
import User from './components/Dashboard/User';

import Dashboard from './components/Dashboard';
import Drivers from './components/Dashboard/Drivers';
import Vehicles from './components/Dashboard/Vehicles';
import Zones from './components/Dashboard/Zones';
import Admin from './components/Dashboard/Admin';
import Ourfleet from './components/Ourfleet';
import PrivateRoutes from './utiils/PrivateRoutes';

import { useDispatch, useSelector } from "react-redux";
import PrivateAdminRoutes from './utiils/PrivateAdminRoutes';
import PrivateZoneAdmin from './utiils/PrivatZoneAdminRoute';

















const App = () => {


  const onSuccess = (response) => {

    // Handle successful login (e.g., set user state, redirect, etc.)
  };

  const onFailure = (error) => {

    // Handle failed login
  };


  const dispatch = useDispatch();



  return (
    <Router>
      <LoadScript
        googleMapsApiKey="AIzaSyAL9K2tfUIeuX0SkO2EZ4Ig55gbtPeZs-c"
        libraries={['places']}
      >


        <Routes>

          <Route path="/" element={<Home />}></Route>

          <Route path='Login' element={<Login />} />
         


          {/* <Route
            element={<PrivateRoutes />}> */}
            {/* <Route path="/Dashboard" element={<Dashboard />}></Route> */}
          {/* </Route> */}



          {/* <Route */}
        {/* // element={<PrivateZoneAdmin />}> */}
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          
          {/* <Route path="Vehicles" element={<Vehicles />} /> */}
          <Route path="User" element={<User />} />
          
          <Route path="Ourfleet" element={<Ourfleet />} />
        {/* </Route> */}
        
          {/* <Route
          element={<PrivateAdminRoutes />}> */}
          {/* <Route path="/Dashboard" element={<Dashboard />}></Route> */}
           <Route path="Drivers" element={<Drivers />} />
          <Route path="Vehicles" element={<Vehicles counter="4" />} />
         

          <Route path="Zones" element={<Zones />} />
          <Route path="Admin" element={<Admin />} />
          {/* <Route path="User" element={<User />} /> */}
          
          {/* <Route path="Ourfleet" element={<Ourfleet />} /> */}
          {/* </Route> */}


         










          
        </Routes>


































      </LoadScript>
    </Router>


  );
};


export default App;


import React, { useState } from "react"
import { Link } from "react-router-dom";

import { Modal } from 'react-bootstrap';



import Sidecomponent from "./Sidecomponent"

import Header from "../Header"
import Footer from "../Footer"
import axios from "axios";








const Zones = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPricingFields, setShowPricingFields] = useState(false);
    
    const [formData, setFormData] = useState({
        zoneName: '',
        zoneAdmin: '',
        geofenceRadius: '',
        vehicleType: '',
        pricePerKm: ''

    });
   



    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(formData);
        axios.post('http://127.0.0.1:5000/createZone', {zoneName: formData.zoneName}).then(e => console.log(e.data))
        closeModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const closeModal = () => {
        setIsModalOpen(false);

        setFormData({
            zoneName: '',
            geofenceRadius: '',
            zoneAdmin: '',
            vehicleType: '',
            pricePerHour: ''
        });
        setShowPricingFields(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    const togglePricingFields = (event) => {
        event.preventDefault();
        setShowPricingFields(!showPricingFields);
    };


  
    

























    return (


        <div>

            <h1>
                Zones
            </h1>

            <div>
                <Header />
            </div>








            <div className="no-bottom no-top zebra" id="content">
                <div id="top"></div>


                <section id="subheader" className="jarallax text-light">
                    <img src="images/background/14.jpg" className="jarallax-img" alt="" />
                    <div className="center-y relative text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h1>Dashboard</h1>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="section-cars" className="bg-gray-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 mb30">
                                <div className="card p-4 rounded-5">

                                    <Sidecomponent />







                                    {/* <ul className="menu-col">
                                        <li><a href="" className="active"><i className="fa fa-home"></i>Dashboard</a></li>
                                       <li><Link to="/Drivers" className="menu-item"  >Drivers</Link></li>
                                        <li><a href="account-booking.html"><i className="fa fa-calendar"></i>vehicles</a></li>
                                        <li><a href="account-favorite.html"><i className="fa fa-car"></i>zones</a></li>
                                        <li><a href="login.html"><i className="fa fa-sign-out"></i>Bookings</a></li>
                                        <li><a href="account-favorite.html"><i className="fa fa-car"></i>Trips</a></li>

                                        <li><a href="login.html"><i className="fa fa-sign-out"></i>Search histroy</a></li>

                                        <li><a href="login.html"><i className="fa fa-sign-out"></i>Profile</a></li>
                                    </ul> */}
                                </div>
                            </div>

                            <div className="col-lg-9">
                                <div className="row">


                                    <div className=" col-lg-12 text-end  btn-main pull-right">



                                        <button onClick={openModal} className="btn btn-primary" style={{ backgroundColor: '#007bff' }}>Add Zone</button>
                                        <Modal show={isModalOpen} onHide={closeModal} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Zone</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body style={{ width: '100%' }}>
                                                <form onSubmit={handleFormSubmit} >
                                                    <div className='d-flex flex-row justify-content-around'>

                                                        <div className="m-1" style={{ width: '50%' }}>

                                                            <div className="form-group">
                                                                <label htmlFor="zoneName">Zone Name:</label>
                                                                <input
                                                                    type="text"
                                                                    id="zoneName"
                                                                    name="zoneName"
                                                                    value={formData.zoneName}
                                                                    onChange={handleChange}
                                                                    className="form-control"
                                                                    placeholder="Enter Zone Name"
                                                                    required
                                                                />
                                                            </div>




                                                            <div className="form-group">



                                                                <label htmlFor="geofenceRadius">Geofence Radius :</label>
                                                                <input
                                                                    type="text"
                                                                    id="geofenceRadius"
                                                                    name="geofenceRadius"
                                                                    value={formData.geofenceRadius}
                                                                    onChange={handleChange}
                                                                    className="form-control"
                                                                    placeholder="Enter Geofence Radius"
                                                                    required
                                                                />
                                                            </div>

                                                            {showPricingFields && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="vehicleType">Vehicle Type:</label>
                                            <input
                                                type="text"
                                                id="vehicleType"
                                                name="vehicleType"
                                                value={formData.vehicleType}
                                                onChange={handleFormChange}
                                                className="form-control"
                                                placeholder="Enter Vehicle Type"
                                                required
                                            />
                                        </div> 
                                        <div className="form-group">
                                            <label htmlFor="pricePerHour">Price Per Hour:</label>
                                            <input
                                                type="number"
                                                id="pricePerHour"
                                                name="pricePerHour"
                                                value={formData.pricePerHour}
                                                onChange={handleFormChange}
                                                className="form-control"
                                                placeholder="Enter Price Per Hour"
                                                required
                                            />
                                        </div>
                                    </>
                                )}







                                                        </div>
                                                        <div className="m-1" style={{ width: '50%' }}>

                                                            {/* <div className="form-group">
                                                                <label htmlFor="zoneAdmin">Zone Admin</label>
                                                                <input
                                                                    type="text"
                                                                    id="zoneAdmin"
                                                                    name="zoneAdmin"
                                                                    value={formData.zoneAdmin}
                                                                    onChange={handleChange}
                                                                    className="form-control"
                                                                    placeholder="Enter Zone Admin"
                                                                    required
                                                                />
                                                            </div> */}
                                                            <div className="text-center">

                                                                <button type="submit" className="btn btn-primary  m-2" style={{ backgroundColor: '#007bff' }}>Submit</button>


                                                            </div>


                                                        </div>



                                                    </div>







                                                    {/* Add other form fields similarly */}

                                                </form>

                                                <p className="text-center">
                                                    <a href="#" onClick={togglePricingFields}>Add Pricing</a>
                                                </p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                {/* Footer content */}
                                            </Modal.Footer>
                                        </Modal>



                                      
 



                                    </div>













                                    <div className="col-lg-3 col-6 mb25 order-sm-1">
                                        <div className="card p-4 rounded-5">
                                            <div className="symbol mb40">
                                                <i className="fa id-color fa-2x fa-calendar-check-o"></i>
                                            </div>
                                            <span className="h1 mb0">03</span>
                                            <span className="text-gray">Upcoming Orders</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-6 mb25 order-sm-1">
                                        <div className="card p-4 rounded-5">
                                            <div className="symbol mb40">
                                                <i className="fa id-color fa-2x fa-tags"></i>
                                            </div>
                                            <span className="h1 mb0">12</span>
                                            <span className="text-gray">Coupons</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-6 mb25 order-sm-1">
                                        <div className="card p-4 rounded-5">
                                            <div className="symbol mb40">
                                                <i className="fa id-color fa-2x fa-calendar"></i>
                                            </div>
                                            <span className="h1 mb0">58</span>
                                            <span className="text-gray">Total Orders</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-6 mb25 order-sm-1">
                                        <div className="card p-4 rounded-5">
                                            <div className="symbol mb40">
                                                <i className="fa id-color fa-2x fa-calendar-times-o"></i>
                                            </div>
                                            <span className="h1 mb0">24</span>
                                            <span className="text-gray">Cancel Orders</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card p-4 rounded-5 mb25">
                                    <h4>My Recent Orders</h4>

                                    <table className="table de-table">
                                        <thead>
                                            <tr>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Order ID</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Car Name</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Pick Up Location</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Drop Off Location</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Pick Up Date</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Return Date</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Status</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span className="d-lg-none d-sm-block">Order ID</span><div className="badge bg-gray-100 text-dark">#01236</div></td>
                                                <td><span className="d-lg-none d-sm-block">Car Name</span><span className="bold">Jeep Renegade</span></td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Location</span>New York</td>
                                                <td><span className="d-lg-none d-sm-block">Drop Off Location</span>Los Angeles</td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Date</span>March 2, 2023</td>
                                                <td><span className="d-lg-none d-sm-block">Return Date</span>March 10, 2023</td>
                                                <td><div className="badge rounded-pill bg-success">completed</div></td>
                                            </tr>
                                            <tr>
                                                <td><span className="d-lg-none d-sm-block">Order ID</span><div className="badge bg-gray-100 text-dark">#01263</div></td>
                                                <td><span className="d-lg-none d-sm-block">Car Name</span><span className="bold">Mini Cooper</span></td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Location</span>San Fransisco</td>
                                                <td><span className="d-lg-none d-sm-block">Drop Off Location</span>Chicago</td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Date</span>March 8, 2023</td>
                                                <td><span className="d-lg-none d-sm-block">Return Date</span>March 10, 2023</td>
                                                <td><div className="badge rounded-pill bg-danger">cancelled</div></td>
                                            </tr>
                                            <tr>
                                                <td><span className="d-lg-none d-sm-block">Order ID</span><div className="badge bg-gray-100 text-dark">#01245</div></td>
                                                <td><span className="d-lg-none d-sm-block">Car Name</span><span className="bold">Ferrari Enzo</span></td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Location</span>Philadelphia</td>
                                                <td><span className="d-lg-none d-sm-block">Drop Off Location</span>Washington</td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Date</span>March 6, 2023</td>
                                                <td><span className="d-lg-none d-sm-block">Return Date</span>March 10, 2023</td>
                                                <td><div className="badge rounded-pill bg-warning">scheduled</div></td>
                                            </tr>
                                            <tr>
                                                <td><span className="d-lg-none d-sm-block">Order ID</span><div className="badge bg-gray-100 text-dark">#01287</div></td>
                                                <td><span className="d-lg-none d-sm-block">Car Name</span><span className="bold">Hyundai Staria</span></td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Location</span>Kansas City</td>
                                                <td><span className="d-lg-none d-sm-block">Drop Off Location</span>Houston</td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Date</span>March 13, 2023</td>
                                                <td><span className="d-lg-none d-sm-block">Return Date</span>March 10, 2023</td>
                                                <td><div className="badge rounded-pill bg-success">completed</div></td>
                                            </tr>
                                            <tr>
                                                <td><span className="d-lg-none d-sm-block">Order ID</span><div className="badge bg-gray-100 text-dark">#01216</div></td>
                                                <td><span className="d-lg-none d-sm-block">Car Name</span><span className="bold">Toyota Rav 4</span></td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Location</span>Baltimore</td>
                                                <td><span className="d-lg-none d-sm-block">Drop Off Location</span>Sacramento</td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Date</span>March 7, 2023</td>
                                                <td><span className="d-lg-none d-sm-block">Return Date</span>March 10, 2023</td>
                                                <td><div className="badge rounded-pill bg-warning">scheduled</div></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card p-4 rounded-5">
                                    <h4>My Favorites</h4>
                                    <div className="spacer-10"></div>
                                    <div className="de-item-list no-border mb30">
                                        <div className="d-img">
                                            <img src="images/cars/jeep-renegade.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="d-info">
                                            <div className="d-text">
                                                <h4>Jeep Renegade</h4>
                                                <div className="d-atr-group">
                                                    <ul className="d-atr">
                                                        <li><span>Seats:</span>4</li>
                                                        <li><span>Luggage:</span>2</li>
                                                        <li><span>Doors:</span>4</li>
                                                        <li><span>Fuel:</span>Petrol</li>
                                                        <li><span>Horsepower:</span>500</li>
                                                        <li><span>Engine:</span>3000</li>
                                                        <li><span>Drive:</span>4x4</li>
                                                        <li><span>Type:</span>Hatchback</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-price">
                                            Daily rate from <span>$265</span>
                                            <a className="btn-main" href="car-single.html">Rent Now</a>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>

                                    <div className="de-item-list no-border mb30">
                                        <div className="d-img">
                                            <img src="images/cars/bmw-m5.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="d-info">
                                            <div className="d-text">
                                                <h4>BMW M2</h4>
                                                <div className="d-atr-group">
                                                    <ul className="d-atr">
                                                        <li><span>Seats:</span>4</li>
                                                        <li><span>Luggage:</span>2</li>
                                                        <li><span>Doors:</span>4</li>
                                                        <li><span>Fuel:</span>Petrol</li>
                                                        <li><span>Horsepower:</span>500</li>
                                                        <li><span>Engine:</span>3000</li>
                                                        <li><span>Drive:</span>4x4</li>
                                                        <li><span>Type:</span>Hatchback</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-price">
                                            Daily rate from <span>$244</span>
                                            <a className="btn-main" href="car-single.html">Rent Now</a>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>

                                    <div className="de-item-list no-border mb30">
                                        <div className="d-img">
                                            <img src="images/cars/ferrari-enzo.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="d-info">
                                            <div className="d-text">
                                                <h4>Ferarri Enzo</h4>
                                                <div className="d-atr-group">
                                                    <ul className="d-atr">
                                                        <li><span>Seats:</span>4</li>
                                                        <li><span>Luggage:</span>2</li>
                                                        <li><span>Doors:</span>4</li>
                                                        <li><span>Fuel:</span>Petrol</li>
                                                        <li><span>Horsepower:</span>500</li>
                                                        <li><span>Engine:</span>3000</li>
                                                        <li><span>Drive:</span>4x4</li>
                                                        <li><span>Type:</span>Hatchback</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-price">
                                            Daily rate from <span>$167</span>
                                            <a className="btn-main" href="car-single.html">Rent Now</a>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>


            <a href="#" id="back-to-top"></a>


            <div>
                <Footer />
            </div>


        </div>












    )

}
export default Zones
import React, { Component } from 'react'
import axios from 'axios';

import { Modal, Pagination } from 'react-bootstrap';
import Sidecomponent from "./Sidecomponent"
import Drivers from './Drivers';
import Header from "../Header"
import Footer from "../Footer";
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { connect } from 'react-redux'


class Vehicles extends Component  {
    // componentDidMount() {
    //     axios.get('http://127.0.0.1:5000/getZones').then(re => this.setState((prevData) => ({
    //         ...prevData,
    //         zones: re.data,
    //     })))
    // }
    constructor(props){
            super(props);

            this.state = {
            // drivers: [],
            pageNumber:0,
            imgUrl: [],
        progresspercent: 0,
        isModalOpen: false,
        rcCertificate: null,
        permitCertificate: null,
        fitnessCertificate: null,
        insuranceCertificate: null,
        pollutionCertificate: null,
        zone: '',
        vehicleName: '',
        vehicleModel: "",
        vehicleType:"",
        driver: "",
        added: "",
        registerNumber:"",
        make: "",
        zones: [],
        capacity: '',
        mileage: '',
        costPerKm: '',
        costPerHour: '',
        ownerType: "",
        vendors: [],
        drivers: [],
        vendor: "",
        driver: "",
        rcCertificateUrl: '',
        permitCertificateUrl: "",
        fitnessCertificateUrl: "",
        insuranceCertificateUrl: "",
        pollutionCertificateUrl : "",
        brand: ""
         }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:5000/getZones').then(re => this.setState({zones: re.data}))
        axios.get('http://127.0.0.1:5000/getVendors').then(re => this.setState({vendors: re.data}))
        axios.get('http://127.0.0.1:5000/getDrivers').then(re => this.setState({drivers: re.data}))
    }
  



     handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(this.state)
        if(this.state.pageNumber < 5) {
        this.setState(prevData => ({
            ...prevData,
            pageNumber: prevData.pageNumber + 1
          }))
        }
        if (this.state.pageNumber == 1) {
            const file = this.state.rcCertificate
            const storageRef = ref(storage, `cars/${this.state.registerNumber}/rcCertificates/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progresspercent: progress});
      },
      (error) => {
        alert(error);
      },
      async()=> {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.setState(prevData => ({
            ...prevData,
            rcCertificateUrl: downloadURL
          }))
         
        });
        }
        );

    }
    if (this.state.pageNumber == 2) {
        const file = this.state.permitCertificate
            const storageRef = ref(storage, `cars/${this.state.registerNumber}/permitCertificates/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progresspercent: progress});
      },
      (error) => {
        alert(error);
      },
      async()=> {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.setState(prevData => ({
            ...prevData,
            permitCertificateUrl: downloadURL
          }))
         
        });
        }
        );
    } 

    if (this.state.pageNumber == 3) {
        const file = this.state.fitnessCertificate
            const storageRef = ref(storage, `cars/${this.state.registerNumber}/fitnessCertificates/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progresspercent: progress});
      },
      (error) => {
        alert(error);
      },
      async()=> {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.setState(prevData => ({
            ...prevData,
            fitnessCertificateUrl: downloadURL
          }))
         
        });
        }
        );
    } 
    if (this.state.pageNumber == 4) {
        const file = this.state.pollutionCertificate
            const storageRef = ref(storage, `cars/${this.state.registerNumber}/pollutionCertificates/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progresspercent: progress});
      },
      (error) => {
        alert(error);
      },
      async()=> {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.setState(prevData => ({
            ...prevData,
            pollutionCertificateUrl: downloadURL
          }))
         
        });
        }
        );
    } 

    if (this.state.pageNumber == 5) {
        const file = this.state.insuranceCertificate
            const storageRef = ref(storage, `cars/${this.state.registerNumber}/insuranceCertificate/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progresspercent: progress});
      },
      (error) => {
        alert(error);
      },
      async()=> {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.setState(prevData => ({
            ...prevData,
            insuranceCertificateUrl: downloadURL
          }))
         
        });
        }
        );

        this.closeModal()

        setTimeout(() => {
                const bodyData = {vehicleName: this.state.vehicleName, vehicleModel: this.state.vehicleModel, vehicleType: this.state.vehicleType, brand:this.state.brand, capacity: this.state.capacity, mileage:this.state.mileage, zone:this.state.zone, ownerType: this.state.ownerType == "Vendor" ? this.state.vendor : "Adminstrator", costPerHour: this.state.costPerHour, driverId: this.state.driver, 
                addedBy: this.state.added, rcCertificateUrl:this.state.rcCertificateUrl, permitCertificateUrl:this.state.permitCertificateUrl, fitnessCertificateUrl: this.state.fitnessCertificateUrl,
                insuranceCertificateUrl:this.state.insuranceCertificateUrl, pollutionCertificateUrl:this.state.pollutionCertificateUrl}
               
                axios.post('http://127.0.0.1:5000/createVehicle', {Body: bodyData})
                      .then(e => console.log(e))
                // console.log(this.state)
                this.setState({pageNumber: 0})
               
             },2500)
    }
        
    //     const files = [this.state.drivingLicense, this.state.addressProof, this.state.profilePhoto]
    //     files.map(f => {
    //         if(!f) return
    //         const storageRef = ref(storage, `files/${f.name}`)
    //         const uploadTask = uploadBytesResumable(storageRef, f);

    //         uploadTask.on("state_changed",
    //   (snapshot) => {
    //     const progress =
    //       Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //     this.setState({progresspercent: progress});
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    //   async()=> {
    //     await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         this.setState(prevData => ({
    //         ...prevData,
    //         imgUrl: [...this.state.imgUrl, downloadURL]
    //       }))
         
    //     });
        
    
    //   }
    // );
    //     })
    //     setTimeout(() => {
    //         const bodyData = {firstName: this.state.firstName, lastName: this.state.lastName, mobile: this.state.mobile, email:this.state.email, drivingPhoto: this.state.imgUrl[2], imgUrl:this.state.imgUrl[0], zone:this.state.zone, altNumber: this.state.altNumber, licenseNumber: this.state.licenseNumber, profilePic: this.state.imgUrl[1]}
    //    if(this.state.userType == "vendor") {
    //     axios.post('http://127.0.0.1:5000/createVendor', {Body: bodyData})
    //           .then(e => console.log(e))
    //    } else {
    //     axios.post('http://127.0.0.1:5000/createZoneAdmin', {Body: bodyData})
    //     .then(e => console.log(e))
    //    }
    //  },5000)

    //     if (!file) return;
    //     const storageRef = ref(storage, `files/${file.name}`);
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     uploadTask.on("state_changed",
    //   (snapshot) => {
    //     const progress =
    //       Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    //     this.setState({progresspercent: progress});
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       this.setState({imgUrl: downloadURL})
    //       axios.post('http://127.0.0.1:5000/createVendor', {firstName: this.state.firstName, lastName: this.state.lastName, mobile: this.state.mobile, email:this.state.email, imgUrl:this.state.imgUrl, zone:this.state.zone, altNumber: this.state.altNumber, licenseNumber: this.state.licenseNumber})
    //       .then(e => console.log(e))
    //     });
    //   }
    // );

        // console.log(imgUrl);
        
        console.log(this.state)
    };

     handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevData => ({
            ...prevData,
             [name]: value,
            
            
        }));
        console.log(this.state)
    };
     handleUploadChange = (e, fieldName) => {
        // Handle file upload for the specified fieldName
        this.setState((prevData) => ({
            ...prevData,
            [fieldName]: e.target.files[0],
            
        }));
        console.log(this.state)
    };



     closeModal = () => {
        this.setState({isModalOpen: false});
    };

     openModal = () => {
        this.setState({isModalOpen:true});
    };









 



render() {
    const zone = this.state.zones?.map(e => <option value={e["$oid"]} key={e.zone_name}>{e.zone_name}</option>)
    const driver = this.state.drivers?.map(e => <option value={e["$oid"]} key={e.firstname}>{e.firstname}</option>)
    const vendor = this.state.vendors?.map(e => <option value={e["$oid"]} key={e.lastname}>{e.firstname} {e.lastname}</option>)
    const rcInput = <div>
    <div className="form-group m-1">
        <label htmlFor="rcCertificate">RC Certificate:</label>
        <input
            type="file"
            id="rcCertificate"
            name="rcCertificate"
            onChange={(e) => this.handleUploadChange(e, 'rcCertificate')}
            className="form-control-file"
            required
        />
    </div>
    
    
    {/* Add more file upload fields as needed */}
</div>
const permitInput = <div className="form-group m-1">
        <label htmlFor="permitCertificate">Permit Certificate:</label>
        <input
            type="file"
            id="permitCertificate"
            name="permitCertificate"
            onChange={(e) => this.handleUploadChange(e, 'permitCertificate')}
            className="form-control-file"
            required
        />
    </div>
const FitnessInput = <div className="form-group m-1">
<label htmlFor="fitnessCertificate">Fitness Certificate:</label>
<input
    type="file"
    id="fitnessCertificate"
    name="fitnessCertificate"
    onChange={(e) => this.handleUploadChange(e, 'fitnessCertificate')}
    className="form-control-file"
    required
/>
</div>
const InsuranceInput = <div className="form-group m-1">
<label htmlFor="insuranceCertificate">Insurance Certificate:</label>
<input
    type="file"
    id="insuranceCertificate"
    name="insuranceCertificate"
    onChange={(e) => this.handleUploadChange(e, 'insuranceCertificate')}
    className="form-control-file"
    required
/>
</div>

const pollutionInput = <div className="form-group m-1">
<label htmlFor="pollutionCertificate">Pollution Certificate:</label>
<input
    type="file"
    id="pollutionCertificate"
    name="pollutionCertificate"
    onChange={(e) => this.handleUploadChange(e, 'pollutionCertificate')}
    className="form-control-file"
    required
/>
</div>



const formInputs = <div className='d-flex flex-row justify-content-center flex-container' style={{flexWrap: "wrap" }}>
<div className="form-group">
    <label htmlFor="vehicleName">Vehicle Name:</label>
    <input
        type="text"
        id="vehicleName"
        name="vehicleName"
        value={this.state.vehicleName}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter vehicle name"
        required
    />
</div>
<div className="form-group">
    <label htmlFor="vehicleModel">Vehicle Model:</label>
    <input
        type="text"
        id="vehicleModel"
        name="vehicleModel"
        value={this.state.vehicleModel}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter vehicle model"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="brand">Brand:</label>
    <input
        type="text"
        id="brand"
        name="brand"
        value={this.state.brand}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter Brand name"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="vehicleType">Vehicle type:</label>
    <div className="custom-select">
        <select
            id="vehicleType"
            name="vehicleType"
            value={this.state.vehicleType}
            onChange={this.handleChange}
            className="form-control"
            required
        >
            <option value="">select vehicle Type</option>
           <option value={"Car"}>Car</option>
           <option value={"Van"}>Van</option>
           <option value={"Hatchback"}>Hatchback</option>
           <option value={"Sedan"}>Sedan</option>
           <option value={"SUV"}>SUV</option>
           <option value={"MUV"}>MUV</option>
           <option value={"Luxury"}>Luxury</option>
           <option value={"Bus"}>Bus</option>
           

            {/* Add more options as needed */}
        </select>
    </div>
</div>

<div className="form-group">
    <label htmlFor="driver">Driver:</label>
    <div className="custom-select">
        <select
            id="driver"
            name="driver"
            value={this.state.driver}
            onChange={this.handleChange}
            className="form-control"
            required
        >
            <option value="">Select Driver</option>
           {driver}
            {/* Add more options as needed */}
        </select>
    </div>
</div>



<div className="form-group">
    <label htmlFor="added">Added by:</label>
    <div className="custom-select">
        <select
            id="added"
            name="added"
            value={this.state.added}
            onChange={this.handleChange}
            className="form-control"
            required
        >
            <option value="">select Added by</option>
           <option value={"Admin"}>Admin</option>
           <option value={"Manager"}>Manager</option>
            {/* Add more options as needed */}
        </select>
    </div>
</div>


<div className="form-group">
    <label htmlFor="registerNumber">Registration Number:</label>
    <input
        type="text"
        id="registerNumber"
        name="registerNumber"
        value={this.state.registerNumber}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter Registration Number"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="make">Make:</label>
    <input
        type="text"
        id="make"
        name="make"
        value={this.state.make}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter Make"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="capacity">capacity:</label>
    <input
        type="text"
        id="capacity"
        name="capacity"
        value={this.state.capacity}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter Capacity"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="mileage">Mileage:</label>
    <input
        type="text"
        id="mileage"
        name="mileage"
        value={this.state.mileage}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter Mileage"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="costPerKm">cost per km:</label>
    <input
        type="text"
        id="costPerKm"
        name="costPerKm"
        value={this.state.costPerKm}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter cost per Km"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="costPerHour">cost per hour:</label>
    <input
        type="text"
        id="costPerHour"
        name="costPerHour"
        value={this.state.costPerHour}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter cost per Hour"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="zone">Zone:</label>
    <div className="custom-select">
        <select
            id="zone"
            name="zone"
            value={this.state.zone}
            onChange={this.handleChange}
            className="form-control"
            required
        >
            <option value="">Select Zone</option>
           {zone}
            {/* Add more options as needed */}
        </select>
    </div>
</div>

<div className="form-group">
    <label htmlFor="ownerType">Owner type:</label>
    <div className="custom-select">
        <select
            id="ownerType"
            name="ownerType"
            value={this.state.ownerType}
            onChange={this.handleChange}
            className="form-control"
            required
        >
            <option value="">Select Owner type</option>
           <option value={"Administrator"}>Administrator</option>
           <option value={"Vendor"}>Vendor</option>
            {/* Add more options as needed */}
        </select>
    </div>
</div>
{this.state.ownerType == "Vendor" && <div>
<label htmlFor="vendor">Vendors:</label>
    <div className="custom-select">
        <select
            id="vendor"
            name="vendor"
            value={this.state.vendor}
            onChange={this.handleChange}
            className="form-control"
            required
        >
            <option value="">Select Vendor</option>
           {vendor}
            {/* Add more options as needed */}
        </select>
    </div>
    </div>}







</div>
    return (
        <div>


            <h1>
                Vehicles
            </h1>

            <div>
                <Header />
            </div>
            <div>
                
                {/* Pass drivers data as a prop to the Driver component */}
                {/* <Drivers drivers={this.state.drivers} /> */}
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



                                        <button onClick={this.openModal} className="btn btn-primary" style={{ backgroundColor: '#007bff' }}>Add Vehicle</button>
                                        <Modal show={this.state.isModalOpen} onHide={this.closeModal} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Vehicle</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body style={{ width: '100%' }}>
                                    
                                                <form onSubmit={this.handleFormSubmit} >
                                                    
                                                    
{this.state.pageNumber == 0 && formInputs}
{this.state.pageNumber == 1 && rcInput}
{this.state.pageNumber == 2 && permitInput }
{this.state.pageNumber == 3 && FitnessInput} 
{this.state.pageNumber == 4 && pollutionInput}
{this.state.pageNumber == 5 && InsuranceInput}



                                                    

                                                    {/* {uploading} */}
                                                    {/* Add other form fields similarly */}
                                                    <div className="text-center">

<button type="submit" className="btn btn-primary  m-2" style={{ backgroundColor: '#007bff' }}>Submit</button>


</div>
                                                </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                {/* Footer content */}
                                                {/* <button onClick={() => this.setState((prev) => this.state.pageNumber < 1 && prev.pageNumber + 1)} className="btn btn-primary" style={{ backgroundColor: '#007bff' }}>Next</button> */}
                                                {/* <button onClick={() => this.setState((prev) => {return {...prev, pageNumber: prev.pageNumber + 1 }})} className="btn btn-primary" style={{ backgroundColor: '#007bff' }}>back</button> */}
                                            </Modal.Footer>
                                        </Modal>

                                        {/* <p className="counter_title">Counter: {this.props.counter}</p> */}
      {/* <button className="button" onClick={this.props.increment}>
        Increment
      </button>
      <button className="button" onClick={this.props.decrement}>
        Decrement
      </button> */}


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
}

// const mapStateToProps = (state) => ({
//     counter: state.counter.counter
//     //  Use 'counter: state.counter.counter' and replace the above line if you are using combineReducers to ensure that 'counter' matches the correct key in your store.
//   });
  
//   const mapDispatchToProps = (dispatch) => ({
//     increment: () => dispatch({ type: "INCREMENT" }),
//     decrement: () => dispatch({ type: "DECREMENT" })
//   });

export default Vehicles

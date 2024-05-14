import React, { Component } from 'react'
import axios from 'axios';

import { Modal, Pagination } from 'react-bootstrap';

import Sidecomponent from "./Sidecomponent"
import Header from "../Header"
import Footer from "../Footer";
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { async } from '@firebase/util';


class Drivers extends Component  {
    // componentDidMount() {
    //     axios.get('http://127.0.0.1:5000/getZones').then(re => this.setState((prevData) => ({
    //         ...prevData,
    //         zones: re.data,
    //     })))
    // }
    constructor(props){
            super(props);

            this.state = {
            pageNumber:0,
            imgUrl: [],
        zones: [],
            driversByZone: {},
            loading: true,
        // drivers: [] ,
        progresspercent: 0,
        isModalOpen: false,
        firstName: '',
        lastName: '',
        mobile: '',
        altNumber: '',
        email: '',
        zone: '',
        licenseNumber: '',
        userType: "",
        drivingLicense: null,
        idproofPhoto: null,
        addressProof:null,
        pancardPhot: null,
        zones: [],
        idProofUrl: '',
        pancardPhotUrl: '',
        drivingLicenseUrl: '',
        addressProofUrl: ''
         }
    }

    // componentDidMount() {
    //     // Fetch zones
    //     axios.get('http://127.0.0.1:5000/getZones').then(re => this.setState({zones: re.data}))
    
    //     // Fetch drivers
    //     axios.get('http://127.0.0.1:5000/getDrivers').then(re => this.setState({drivers: re.data}))
    // }
  
    componentDidMount() {
        // Fetch drivers first
        axios.get('http://127.0.0.1:5000/getDrivers')
            .then(response => {
                const drivers = response.data;
                const driversByZone = {};
                // Organize drivers by zone
                drivers.forEach(driver => {
                    if (!driversByZone[driver.zone]) {
                        driversByZone[driver.zone] = [driver];
                    } else {
                        driversByZone[driver.zone].push(driver);
                    }
                });
                // Once drivers are organized by zone, fetch zones
                axios.get('http://127.0.0.1:5000/getZones')
                    .then(response => {
                        const zones = response.data;
                        // Update state with zones and organized drivers
                        this.setState({ zones, driversByZone, loading: false });
                    })
                    .catch(error => {
                        console.error('Error fetching zones:', error);
                        this.setState({ loading: false });
                    });
            })
            .catch(error => {
                console.error('Error fetching drivers:', error);
                this.setState({ loading: false });
            });
    }


    



     handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log(this.state)
        if(this.state.pageNumber < 4) {
        this.setState(prevData => ({
            ...prevData,
            pageNumber: prevData.pageNumber + 1
            
          }))
        }
        if (this.state.pageNumber == 1) {
            const file = this.state.drivingLicense
            const storageRef = ref(storage, `drivingLicense/${file.name}`)
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
            drivingLicenseUrl: downloadURL
          }))
         
        });
        }
        );

    }
    if (this.state.pageNumber == 2) {
        const file = this.state.idproofPhoto
            const storageRef = ref(storage, `driverIdproofs/${file.name}`)
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
            idProofUrl: downloadURL
          }))
         
        });
        }
        );
    } 

    if (this.state.pageNumber == 3) {
        const file = this.state.addressProof
            const storageRef = ref(storage, `driverAddressProofs/${file.name}`)
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
            addressProofUrl: downloadURL
          }))
         
        });
        }
        );
    } 

    if (this.state.pageNumber == 4) {
        const file = this.state.pancardPhot
            const storageRef = ref(storage, `driverPancardPhotos/${file.name}`)
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
            pancardPhotUrl: downloadURL
          }))
         
        });
        }
        );
        this.closeModal()
        setTimeout(() => {
                const bodyData = {firstName: this.state.firstName, lastName: this.state.lastName, mobile: this.state.mobile, email:this.state.email, drivingPhoto: this.state.drivingLicenseUrl, imgUrl:this.state.idProofUrl, zone:this.state.zone, altNumber: this.state.altNumber, licenseNumber: this.state.licenseNumber, pan: this.state.pancardPhotUrl, addressProof: this.state.addressProofUrl}
               
                axios.post('http://127.0.0.1:5000/createDriver', {Body: bodyData})
                      .then(e => console.log(e))
               
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
        // this.closeModal()
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

    const { zones, driversByZone, loading } = this.state;
   

    
   
    const zone = this.state.zones?.map(e => <option value={e["$oid"]} key={e["$oid"]}>{e.zone_name}</option>)
    const uploading = <div>
    <div className="form-group m-1">
        <label htmlFor="drivingLicense">Driving License:</label>
        <input
            type="file"
            id="drivingLicense"
            name="drivingLicense"
            onChange={(e) => this.handleUploadChange(e, 'drivingLicense')}
            className="form-control-file"
            required
        />
    </div>
    
    
    {/* Add more file upload fields as needed */}
</div>
const addressProofInput = <div className="form-group m-1">
        <label htmlFor="addressProof">Address Proof:</label>
        <input
            type="file"
            id="addressProof"
            name="addressProof"
            onChange={(e) => this.handleUploadChange(e, 'addressProof')}
            className="form-control-file"
            required
        />
    </div>
const panCardInput = <div className="form-group m-1">
<label htmlFor="pancardPhot">PAN card:</label>
<input
    type="file"
    id="pancardPhot"
    name="pancardPhot"
    onChange={(e) => this.handleUploadChange(e, 'pancardPhot')}
    className="form-control-file"
    required
/>
</div>
const idProofInput = <div className="form-group m-1">
<label htmlFor="idproofPhoto">Id proof:</label>
<input
    type="file"
    id="idproofPhoto"
    name="idproofPhoto"
    onChange={(e) => this.handleUploadChange(e, 'idproofPhoto')}
    className="form-control-file"
    required
/>
</div>



const formInputs = <div className='d-flex flex-row justify-content-center flex-container' style={{flexWrap: "wrap" }}>
<div className="form-group">
    <label htmlFor="firstName">First Name:</label>
    <input
        type="text"
        id="firstName"
        name="firstName"
        value={this.state.firstName}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter first name"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="lastName">Last Name:</label>
    <input
        type="text"
        id="lastName"
        name="lastName"
        value={this.state.lastName}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter last name"
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
    <label htmlFor="mobile">mobile:</label>
    <input
        type="text"
        id="mobile"
        name="mobile"
        value={this.state.mobile}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter mobile"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="email">Email:</label>
    <input
        type="text"
        id="email"
        name="email"
        value={this.state.email}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter Email"
        required
    />
</div>
<div className="form-group">
    <label htmlFor="licenseNumber">licenseNumber:</label>
    <input
        type="text"
        id="licenseNumber"
        name="licenseNumber"
        value={this.state.licenseNumber}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter license Number"
        required
    />
</div>

<div className="form-group">
    <label htmlFor="altNumber">Alternate mobile:</label>
    <input
        type="text"
        id="altNumber"
        name="altNumber"
        value={this.state.altNumber}
        onChange={this.handleChange}
        className="form-control"
        placeholder="Enter alternate mobile"
        required
    />
</div>
</div>
    return (
        <div>


            <h1>
                Drivers
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



                                        <button onClick={this.openModal} className="btn btn-primary" style={{ backgroundColor: '#007bff' }}>Add Driver</button>
                                        <Modal show={this.state.isModalOpen} onHide={this.closeModal} centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Driver</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body style={{ width: '100%' }}>
                                    
                                                <form onSubmit={this.handleFormSubmit} >
                                                    
                                                    
{this.state.pageNumber == 0 && formInputs}
{this.state.pageNumber == 1 && uploading}
{this.state.pageNumber == 2 && idProofInput }
{this.state.pageNumber == 3 && addressProofInput} 
{this.state.pageNumber == 4 && panCardInput}



                                                    

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
                                    {/* <h4>Drivers</h4> */}

                                    <table className="table de-table">
                                    <div>
              
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Zone</th>
                                <th>Driver Names</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loop through zones */}
                            {zones.map(zone => (
                                <tr key={zone.id}>
                                    <td>{zone.zone_name}</td>
                                    <td>
                                        <ul>
                                            {/* Loop through drivers in the current zone */}
                                            {driversByZone[zone.zone_name] &&
                                                driversByZone[zone.zone_name].map(driver => (
                                                    <li key={driver.id}>
                                                        {driver.firstName} {driver.lastName}
                                                    </li>
                                                ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>


  

</table>































                                    <table className="table de-table">
                                        <thead>
                                            <tr>
                                                {/* <th scope="col"><span className="text-uppercase fs-12 text-gray">Driver</span></th> */}
                                                {/* <th scope="col"><span className="text-uppercase fs-12 text-gray">Car Name</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Pick Up Location</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Drop Off Location</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Pick Up Date</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Return Date</span></th>
                                                <th scope="col"><span className="text-uppercase fs-12 text-gray">Status</span></th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><span className="d-lg-none d-sm-block">Order ID</span><div className="badge bg-gray-100 text-dark">
                                                {/* <div>
           
            {this.state.drivers.map(driver => (
                <div key={driver.id}>{driver.firstname}</div>
            ))}
        </div> */}
 
                                                    
                                                    
                                                    
                                                    
                                                    </div></td>
                                                {/* <td><span className="d-lg-none d-sm-block">Car Name</span><span className="bold">Jeep Renegade</span></td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Location</span>New York</td>
                                                <td><span className="d-lg-none d-sm-block">Drop Off Location</span>Los Angeles</td>
                                                <td><span className="d-lg-none d-sm-block">Pick Up Date</span>March 2, 2023</td>
                                                <td><span className="d-lg-none d-sm-block">Return Date</span>March 10, 2023</td>
                                                <td><div className="badge rounded-pill bg-success">completed</div></td> */}
                                            </tr>
                                            {/* <tr>
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
                                            </tr> */}
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


export default Drivers

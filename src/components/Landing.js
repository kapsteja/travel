import React, { useEffect, useState } from 'react';
import '../css/style.css';
import '../css/mdb.min.css';
import '../css/plugins.css';
import '../css/coloring.css';
import '../css/colors/scheme-01.css';
import OwlCarousel from 'react-owl-carousel';
import Header from './Header';
import { GoogleLogin } from 'react-google-login';
import PlacesAutocomplete from 'react-places-autocomplete';
import { gapi } from "gapi-script";
import axios from 'axios';
// import '../js/plugins.js';
// import '../js/designesia.js';


{/* <head>
    
    
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" id="bootstrap" />
    <link href="css/mdb.min.css" rel="stylesheet" type="text/css" id="mdb" />
    <link href="css/plugins.css" rel="stylesheet" type="text/css" />
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <link href="css/coloring.css" rel="stylesheet" type="text/css" />
    <link id="colors" href="css/colors/scheme-01.css" rel="stylesheet" type="text/css" />
</head> */}

const LandingPage = ({ onSuccess, onFailure }) => {
    const [userData, setUserData] = useState(null); // State to store user data
    const [location, setLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [distance, setDistance] = useState(null);
  
  
    useEffect(() => {
      function start() {
        gapi.client.init({
          clientId: "382428617221-8lok26sd8k7otp54qd9mlel226cr66eg.apps.googleusercontent.com", // Replace with your client ID
          scope: 'email',
        });
      }
  
      gapi.load('client:auth2', start);
    }, []);
  
    const handleSuccess = (response) => {
      console.log('Login successful: ', response.profileObj);
      setUserData(response.profileObj);
      onSuccess(response);
    };
  
    const handleFailure = (error) => {
      console.error('Login failed: ', error);
      onFailure(error);
    };
  
    const handleLocationChange = (value) => {
      setLocation(value);
      setDistance(null);
    };
  
    const handleDestinationChange = async (value) => {
      setDestination(value);
      setDistance(null);
      if (location && destination) {
        try {
          const response = await axios.get(
            `api/distancematrix/json?units=metric&origins=${encodeURIComponent(location)}&destinations=${encodeURIComponent(destination)}&key=AIzaSyAL9K2tfUIeuX0SkO2EZ4Ig55gbtPeZs-c`
          );
  
          const distanceText = response.data.rows[0].elements[0].distance.text;
          const durationText = response.data.rows[0].elements[0].duration.text;
          setDistance({ distance: distanceText, duration: durationText });
        } catch (error) {
          console.error('Error calculating distance:', error);
        }
      }
  
  
    };
    return (
        
  
<section >

    <div id="wrapper">
        
        <div id="de-preloader"></div>
        
        <Header />
        {/* <header className="transparent scroll-light has-topbar">
            <div id="topbar" className="topbar-dark text-light">
                <div className="container">
                    <div className="topbar-left xs-hide">
                        <div className="topbar-widget">
                            <div className="topbar-widget"><a href="#"><i className="fa fa-phone"></i>+208 333 9296</a></div>
                            <div className="topbar-widget"><a href="#"><i className="fa fa-envelope"></i>contact@rentaly.com</a></div>
                            <div className="topbar-widget"><a href="#"><i className="fa fa-clock-o"></i>Mon - Fri 08.00 - 18.00</a></div>
                        </div>
                    </div>
                
                    <div className="topbar-right">
                        <div className="social-icons">
                            <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                            <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                            <a href="#"><i className="fa fa-youtube fa-lg"></i></a>
                            <a href="#"><i className="fa fa-pinterest fa-lg"></i></a>
                            <a href="#"><i className="fa fa-instagram fa-lg"></i></a>
                        </div>
                    </div>  
                    <div className="clearfix"></div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="de-flex sm-pt10">
                            <div className="de-flex-col">
                                <div className="de-flex-col">
                                    <div id="logo">
                                        <a href="index.html">
                                            <img className="logo-1" src={require("../images/logo-light.png")} alt="" />
                                            <img className="logo-2" src={require("../images/logo.png")} alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="de-flex-col header-col-mid">
                                <ul id="mainmenu">
                                    <li><a className="menu-item" href="index.html">Home</a>
                                        <ul>
                                            <li><a className="menu-item new" href="02_dark-index-1.html">Homepage 1 Dark</a></li>
                                            <li><a className="menu-item new" href="02_dark-index-2.html">Homepage 2 Dark</a></li>
                                            <li><a className="menu-item" href="index.html">Homepage Main</a></li>
                                            <li><a className="menu-item" href="index-2.html">Homepage 2</a></li>
                                            <li><a className="menu-item" href="index-3.html">Homepage 3</a></li>
                                            <li><a className="menu-item" href="index-4.html">Homepage 4</a></li>
                                            <li><a className="menu-item" href="index-5.html">Homepage 5</a></li>
                                            <li><a className="menu-item" href="index-6.html">Homepage 6</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="menu-item" href="cars.html">Cars</a>
                                        <ul>
                                            <li><a className="menu-item" href="cars.html">Cars List 1</a></li>
                                            <li><a className="menu-item" href="02_dark-cars.html">Cars List 1 Dark</a></li>
                                            <li><a className="menu-item" href="cars-list.html">Cars List 2</a></li>
                                            <li><a className="menu-item" href="02_dark-cars-list.html">Cars List 2 Dark</a></li>
                                            <li><a className="menu-item" href="car-single.html">Cars Single</a></li>
                                            <li><a className="menu-item" href="02_dark-car-single.html">Cars Single Dark</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="menu-item" href="quick-booking.html">Booking</a>
                                        <ul>
                                            <li><a className="menu-item new" href="quick-booking.html">Quick Booking</a></li>
                                            <li><a className="menu-item" href="booking.html">Booking</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="menu-item" href="account-dashboard.html">My Account</a>
                                        <ul>
                                            <li><a className="menu-item" href="account-dashboard.html">Dashboard</a></li>
                                            <li><a className="menu-item" href="account-profile.html">My Profile</a></li>
                                            <li><a className="menu-item" href="account-booking.html">My Orders</a></li>
                                            <li><a className="menu-item" href="account-favorite.html">My Favorite Cars</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="menu-item" href="#">Pages</a>
                                        <ul>
                                            <li><a className="menu-item" href="about.html">About Us</a></li>
                                            <li><a className="menu-item" href="contact.html">Contact</a></li>
                                            <li><a className="menu-item" href="login.html">Login</a></li>
                                            <li><a className="menu-item" href="register.html">Register</a></li>
                                            <li><a className="menu-item" href="404.html">Page 404</a></li>
                                        </ul>
                                    </li>
                                    <li><a className="menu-item" href="#">News</a>
                                        <ul>
                                            <li><a className="menu-item" href="news-standart-right-sidebar.html">News Standard</a>
                                                <ul>
                                                    <li><a className="menu-item" href="news-standart-right-sidebar.html">Right Sidebar</a></li>
                                                    <li><a className="menu-item" href="news-standart-left-sidebar.html">Left Sidebar</a></li>
                                                    <li><a className="menu-item" href="news-standart-no-sidebar.html">No Sidebar</a></li>
                                                </ul>
                                            </li>
                                            <li><a className="menu-item" href="news-grid-right-sidebar.html">News Grid</a>
                                                <ul>
                                                    <li><a className="menu-item" href="news-grid-right-sidebar.html">Right Sidebar</a></li>
                                                    <li><a className="menu-item" href="news-grid-left-sidebar.html">Left Sidebar</a></li>
                                                    <li><a className="menu-item" href="news-grid-no-sidebar.html">No Sidebar</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a className="menu-item" href="#">Elements</a>
                                        <ul>
                                            <li><a className="menu-item" href="preloader.html">Preloader</a></li>
                                            <li><a className="menu-item" href="icon-boxes.html">Icon Boxes</a></li>
                                            <li><a className="menu-item" href="badge.html">Badge</a></li>
                                            <li><a className="menu-item" href="counters.html">Counters</a></li>
                                            <li><a className="menu-item" href="gallery-popup.html">Gallery Popup</a></li>
                                            <li><a className="menu-item" href="icons-elegant.html">Icons Elegant</a></li>
                                            <li><a className="menu-item" href="icons-etline.html">Icons Etline</a></li>
                                            <li><a className="menu-item" href="icons-font-awesome.html">Icons Font Awesome</a></li>
                                            <li><a className="menu-item" href="map.html">Map</a></li>
                                            <li><a className="menu-item" href="modal.html">Modal</a></li>
                                            <li><a className="menu-item" href="popover.html">Popover</a></li>
                                            <li><a className="menu-item" href="tabs.html">Tabs</a></li>
                                            <li><a className="menu-item" href="tooltips.html">Tooltips</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="de-flex-col">
                                <div className="menu_side_area">
                                    <a href="login.html" className="btn-main">Sign In</a>
                                    <span id="menu-btn"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header> */}
        <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section id="section-hero" aria-label="section" className="jarallax">
                <img src={require("../images/background/1.jpg")} className="jarallax-img" alt="" />
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 text-light">
                            <div className="spacer-double"></div>
                            <div className="spacer-double"></div>
                            <h1 className="mb-2">Looking for a <span className="id-color">vehicle</span>? You're at the right place.</h1>
                            <div className="spacer-single"></div>
                        </div>

                        <div className="col-lg-12">
                            <div className="spacer-single sm-hide"></div>
                            <div className="p-4 rounded-3 shadow-soft" data-bgcolor="#ffffff">
                                

                                <form name="contactForm" id='contact_form' method="post">
                                    <div id="step-1" className="row">
                                        <div className="col-lg-6 mb30">
                                            <h5>What is your vehicle type?</h5>

                                            <div className="de_form de_radio row g-3">
                                                <div className="radio-img col-lg-3 col-sm-3 col-6">
                                                    <input id="radio-1a" name="Car_Type" type="radio" placeholder="Residential" defaultChecked={true} />
                                                    <label htmlFor="radio-1a"><img src={require("../images/select-form/car.png")} alt="" />Car</label>
                                                </div>

                                                <div className="radio-img col-lg-3 col-sm-3 col-6">
                                                    <input id="radio-1b" name="Car_Type" type="radio" placeholder="Office" />
                                                    <label htmlFor="radio-1b"><img src={require("../images/select-form/van.png")} alt="" />Van</label>
                                                </div>

                                                <div className="radio-img col-lg-3 col-sm-3 col-6">
                                                    <input id="radio-1c" name="Car_Type" type="radio" placeholder="Commercial" />
                                                    <label htmlFor="radio-1c"><img src={require("../images/select-form/minibus.png")} alt="" />Minibus</label>
                                                </div>

                                                <div className="radio-img col-lg-3 col-sm-3 col-6">
                                                    <input id="radio-1d" name="Car_Type" type="radio" placeholder="Retail" />
                                                    <label htmlFor="radio-1d"><img src={require("../images/select-form/sportscar.png")} alt="" />Prestige</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="row">
                                                <div className="col-lg-6 mb20">
                                                    <h5>Pick Up Location</h5>
                                                    <input type="text" name="PickupLocation"  placeholder="Enter your pickup location" id="autocomplete" autoComplete="off" className="form-control"
                                                      onFocus={handleLocationChange}
                                                     />
                                                    
                                                    
                                                    <div className="jls-address-preview jls-address-preview--hidden">
                                                        <div className="jls-address-preview__header">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb20">
                                                    <h5>Drop Off Location</h5>
                                                    <input type="text" name="DropoffLocation"  placeholder="Enter your dropoff location" id="autocomplete2" autoComplete="off" className="form-control" />
                                                    {/* onFocus="geolocate()" */}
                                                    <div className="jls-address-preview jls-address-preview--hidden">
                                                        <div className="jls-address-preview__header">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb20">
                                                    <h5>Pick Up Date & Time</h5>
                                                    <div className="date-time-field">
                                                        <input type="text" id="date-picker" name="Pick Up Date" placeholder="" />
                                                        <select name="Pick Up Time" id="pickup-time">
                                                            {/* <option defaultValue disabled value="Select time">Time</option>
                                                            <option value="00:00">00:00</option>
                                                            <option value="00:30">00:30</option>
                                                            <option value="01:00">01:00</option>
                                                            <option value="01:30">01:30</option>
                                                            <option value="02:00">02:00</option>
                                                            <option value="02:30">02:30</option>
                                                            <option value="03:00">03:00</option>
                                                            <option value="03:30">03:30</option>
                                                            <option value="04:00">04:00</option>
                                                            <option value="04:30">04:30</option>
                                                            <option value="05:00">05:00</option>
                                                            <option value="05:30">05:30</option>
                                                            <option value="06:00">06:00</option>
                                                            <option value="06:30">06:30</option>
                                                            <option value="07:00">07:00</option>
                                                            <option value="07:30">07:30</option>
                                                            <option value="08:00">08:00</option>
                                                            <option value="08:30">08:30</option>
                                                            <option value="09:00">09:00</option>
                                                            <option value="09:30">09:30</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option>
                                                            <option value="20:00">20:00</option>
                                                            <option value="20:30">20:30</option>
                                                            <option value="21:00">21:00</option>
                                                            <option value="21:30">21:30</option>
                                                            <option value="22:00">22:00</option>
                                                            <option value="22:30">22:30</option>
                                                            <option value="23:00">23:00</option>
                                                            <option value="23:30">23:30</option> */}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 mb20">
                                                    <h5>Return Date & Time</h5>
                                                    <div className="date-time-field">
                                                        <input type="text" id="date-picker-2" name="Collection Date" placeholder="" />
                                                        <select name="Collection Time" id="collection-time">
                                                            {/* <option defaultValue disabled value="Select time">Time</option>
                                                            <option value="00:00">00:00</option>
                                                            <option value="00:30">00:30</option>
                                                            <option value="01:00">01:00</option>
                                                            <option value="01:30">01:30</option>
                                                            <option value="02:00">02:00</option>
                                                            <option value="02:30">02:30</option>
                                                            <option value="03:00">03:00</option>
                                                            <option value="03:30">03:30</option>
                                                            <option value="04:00">04:00</option>
                                                            <option value="04:30">04:30</option>
                                                            <option value="05:00">05:00</option>
                                                            <option value="05:30">05:30</option>
                                                            <option value="06:00">06:00</option>
                                                            <option value="06:30">06:30</option>
                                                            <option value="07:00">07:00</option>
                                                            <option value="07:30">07:30</option>
                                                            <option value="08:00">08:00</option>
                                                            <option value="08:30">08:30</option>
                                                            <option value="09:00">09:00</option>
                                                            <option value="09:30">09:30</option>
                                                            <option value="10:00">10:00</option>
                                                            <option value="10:30">10:30</option>
                                                            <option value="11:00">11:00</option>
                                                            <option value="11:30">11:30</option>
                                                            <option value="12:00">12:00</option>
                                                            <option value="12:30">12:30</option>
                                                            <option value="13:00">13:00</option>
                                                            <option value="13:30">13:30</option>
                                                            <option value="14:00">14:00</option>
                                                            <option value="14:30">14:30</option>
                                                            <option value="15:00">15:00</option>
                                                            <option value="15:30">15:30</option>
                                                            <option value="16:00">16:00</option>
                                                            <option value="16:30">16:30</option>
                                                            <option value="17:00">17:00</option>
                                                            <option value="17:30">17:30</option>
                                                            <option value="18:00">18:00</option>
                                                            <option value="18:30">18:30</option>
                                                            <option value="19:00">19:00</option>
                                                            <option value="19:30">19:30</option>
                                                            <option value="20:00">20:00</option>
                                                            <option value="20:30">20:30</option>
                                                            <option value="21:00">21:00</option>
                                                            <option value="21:30">21:30</option>
                                                            <option value="22:00">22:00</option>
                                                            <option value="22:30">22:30</option>
                                                            <option value="23:00">23:00</option>
                                                            <option value="23:30">23:30</option> */}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
            


            
                                        </div>

                                        <div className="col-lg-12">
                                            <input type='submit' id='send_message' placeholder='Find a Vehicle' className="btn-main pull-right" />
                                        </div>

                                    </div>
                                    
                                </form>
                            </div>
                        </div>

                        <div className="spacer-double"></div>

                        <div className="row">
                            <div className="col-lg-12 text-light">
                                <div className="container-timeline">
                                    <ul>
                                        <li>
                                            <h4>Choose a vehicle</h4>
                                            <p>Unlock unparalleled adventures and memorable journeys with our vast fleet of vehicles tailored to suit every need, taste, and destination.</p>
                                        </li>
                                        <li>
                                            <h4>Pick location &amp; date</h4>
                                            <p>Pick your ideal location and date, and let us take you on a journey filled with convenience, flexibility, and unforgettable experiences.</p>
                                        </li>
                                        <li>
                                            <h4>Make a booking</h4>
                                            <p>Secure your reservation with ease, unlocking a world of possibilities and embarking on your next adventure with confidence.</p>
                                        </li>
                                        <li>
                                            <h4>Sit back &amp; relax</h4>
                                            <p>Hassle-free convenience as we take care of every detail, allowing you to unwind and embrace a journey filled comfort.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section aria-label="section" className="pt40 pb40 text-light" data-bgcolor="#111111">
                <div className="wow fadeInRight d-flex">
                  <div className="de-marquee-list">
                    <div className="d-item">
                      <span className="d-item-txt">SUV</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Hatchback</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Crossover</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Convertible</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Sedan</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Sports Car</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Coupe</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Minivan</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Station Wagon</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Truck</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Minivans</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Exotic Cars</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                     </div>
                  </div>

                  <div className="de-marquee-list">
                    <div className="d-item">
                      <span className="d-item-txt">SUV</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Hatchback</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Crossover</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Convertible</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Sedan</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Sports Car</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Coupe</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Minivan</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Station Wagon</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Truck</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Minivans</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                      <span className="d-item-txt">Exotic Cars</span>
                      <span className="d-item-display">
                        <i className="d-item-dot"></i>
                      </span>
                     </div>
                  </div>
                </div>
            </section>

            <section aria-label="section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 offset-lg-3 text-center">
                            <h2>Our Features</h2>
                            <p>Discover a world of convenience, safety, and customization, paving the way for unforgettable adventures and seamless mobility solutions.</p>
                            <div className="spacer-20"></div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-lg-3">
                            <div className="box-icon s2 p-small mb20 wow fadeInRight" data-wow-delay=".5s">
                                <i className="fa bg-color fa-trophy"></i>
                                <div className="d-inner">
                                    <h4>First class services</h4>
                                    Where luxury meets exceptional care, creating unforgettable moments and exceeding your every expectation.
                                </div>
                            </div>
                            <div className="box-icon s2 p-small mb20 wow fadeInL fadeInRight" data-wow-delay=".75s">
                                <i className="fa bg-color fa-road"></i>
                                <div className="d-inner">
                                    <h4>24/7 road assistance</h4>
                                     Reliable support when you need it most, keeping you on the move with confidence and peace of mind.
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <img src={require("../images/misc/car.png")} alt="" className="img-fluid wow fadeInUp" />
                        </div>

                        <div className="col-lg-3">
                            <div className="box-icon s2 d-invert p-small mb20 wow fadeInL fadeInLeft" data-wow-delay="1s">
                                <i className="fa bg-color fa-tag"></i>
                                <div className="d-inner">
                                    <h4>Quality at Minimum Expense</h4>
                                     Unlocking affordable brilliance with elevating quality while minimizing costs for maximum value.
                                </div>
                            </div>
                            <div className="box-icon s2 d-invert p-small mb20 wow fadeInL fadeInLeft" data-wow-delay="1.25s">
                                <i className="fa bg-color fa-map-pin"></i>
                                <div className="d-inner">
                                    <h4>Free Pick-Up & Drop-Off</h4>
                                     Enjoy free pickup and drop-off services, adding an extra layer of ease to your car rental experience.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-light jarallax">
                <img src={require("../images/background/2.jpg")} className="jarallax-img" alt="" />
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInRight">
                            <h2>We offer customers a wide range of <span className="id-color">commercial cars</span> and <span className="id-color">luxury cars</span> for any occasion.</h2>
                        </div>
                        <div className="col-lg-6 wow fadeInLeft">
                            At our car rental agency, we believe that everyone deserves to experience the pleasure of driving a reliable and comfortable vehicle, regardless of their budget. We have curated a diverse fleet of well-maintained cars, ranging from sleek sedans to spacious SUVs, all at competitive prices. With our streamlined rental process, you can quickly and conveniently reserve your desired vehicle. Whether you need transportation for a business trip, family vacation, or simply want to enjoy a weekend getaway, we have flexible rental options to accommodate your schedule.
                        </div>
                    </div>
                    <div className="spacer-double"></div>
                    <div className="row text-center">
                        <div className="col-md-3 col-sm-6 mb-sm-30">
                            <div className="de_count transparent text-light wow fadeInUp">
                                <h3 className="timer" data-to="15425" data-speed="3000">0</h3>
                                Completed Orders
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-sm-30">
                            <div className="de_count transparent text-light wow fadeInUp">
                                <h3 className="timer" data-to="8745" data-speed="3000">0</h3>
                                Happy Customers
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-sm-30">
                            <div className="de_count transparent text-light wow fadeInUp">
                                <h3 className="timer" data-to="235" data-speed="3000">0</h3>
                                Vehicles Fleet
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-sm-30">
                            <div className="de_count transparent text-light wow fadeInUp">
                                <h3 className="timer" data-to="15" data-speed="3000">0</h3>
                                Years Experience
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section-cars">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 offset-lg-3 text-center">
                            <h2>Our Vehicle Fleet</h2>
                            <p>Driving your dreams to reality with an exquisite fleet of versatile vehicles for unforgettable journeys.</p>
                            <div className="spacer-20"></div>
                        </div>

                        <div id="items-carousel" className="owl-carousel wow fadeIn">

                            <div className="col-lg-12">
                                <div className="de-item mb30">
                                    <div className="d-img">
                                        <img src={require("../images/cars/jeep-renegade.jpg")} className="img-fluid" alt=""/>
                                    </div>
                                    <div className="d-info">
                                        <div className="d-text">
                                            <h4>Jeep Renegade</h4>
                                            <div className="d-item_like">
                                                <i className="fa fa-heart"></i><span>74</span>
                                            </div>
                                            <div className="d-atr-group">
                                                {/* <span className="d-atr"><img src={require("../images/icons/1.svg")} alt="" />5</span>
                                                <span className="d-atr"><img src={require("../images/icons/2.svg")} alt="" />2</span>
                                                <span className="d-atr"><img src={require("../images/icons/3.svg")} alt="" />4</span>
                                                <span className="d-atr"><img src={require("../images/icons/4.svg")} alt="" />SUV</span> */}
                                            </div>
                                            <div className="d-price">
                                                Daily rate from <span>$265</span>
                                                <a className="btn-main" href="car-single.html">Rent Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="de-item mb30">
                                    <div className="d-img">
                                        <img src={require("../images/cars/bmw-m5.jpg")} className="img-fluid" alt="" />
                                    </div>
                                    <div className="d-info">
                                        <div className="d-text">
                                            <h4>BMW M2</h4>
                                            <div className="d-item_like">
                                                <i className="fa fa-heart"></i><span>36</span>
                                            </div>
                                            <div className="d-atr-group">
                                                {/* <span className="d-atr"><img src={require("../images/icons/1-green.svg")} alt="" />5</span>
                                                <span className="d-atr"><img src={require("../images/icons/2-green.svg")} alt="" />2</span>
                                                <span className="d-atr"><img src={require("../images/icons/3-green.svg")} alt="" />4</span>
                                                <span className="d-atr"><img src={require("../images/icons/4-green.svg")} alt="" />Sedan</span> */}
                                            </div>
                                            <div className="d-price">
                                                Daily rate from <span>$244</span>
                                                <a className="btn-main" href="car-single.html">Rent Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="de-item mb30">
                                    <div className="d-img">
                                        <img src={require("../images/cars/ferrari-enzo.jpg")} className="img-fluid" alt="" />
                                    </div>
                                    <div className="d-info">
                                        <div className="d-text">
                                            <h4>Ferarri Enzo</h4>
                                            <div className="d-item_like">
                                                <i className="fa fa-heart"></i><span>85</span>
                                            </div>
                                            <div className="d-atr-group">
                                                {/* <span className="d-atr"><img src={require("../images/icons/1-green.svg")} alt="" />5</span>
                                                <span className="d-atr"><img src={require("../images/icons/2-green.svg")} alt="" />2</span>
                                                <span className="d-atr"><img src={require("../images/icons/3-green.svg")} alt="" />4</span>
                                                <span className="d-atr"><img src={require("../images/icons/4-green.svg")} alt="" />Exotic Car</span> */}
                                            </div>
                                            <div className="d-price">
                                                Daily rate from <span>$167</span>
                                                <a className="btn-main" href="car-single.html">Rent Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="de-item mb30">
                                    <div className="d-img">
                                        <img src={require("../images/cars/ford-raptor.jpg")} className="img-fluid" alt="" />
                                    </div>
                                    <div className="d-info">
                                        <div className="d-text">
                                            <h4>Ford Raptor</h4>
                                            <div className="d-item_like">
                                                <i className="fa fa-heart"></i><span>59</span>
                                            </div>
                                            <div className="d-atr-group">
                                                {/* <span className="d-atr"><img src={require("../images/icons/1-green.svg")} alt="" />5</span>
                                                <span className="d-atr"><img src={require("../images/icons/2-green.svg")} alt="" />2</span>
                                                <span className="d-atr"><img src={require("../images/icons/3-green.svg")} alt="" />4</span>
                                                <span className="d-atr"><img src={require("../images/icons/4-green.svg")} alt="" />Truck</span> */}
                                            </div>
                                            <div className="d-price">
                                                Daily rate from <span>$147</span>
                                                <a className="btn-main" href="car-single.html">Rent Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="de-item mb30">
                                    <div className="d-img">
                                        <img src={require("../images/cars/mini-cooper.jpg")} className="img-fluid" alt="" />
                                    </div>
                                    <div className="d-info">
                                        <div className="d-text">
                                            <h4>Mini Cooper</h4>
                                            <div className="d-item_like">
                                                <i className="fa fa-heart"></i><span>19</span>
                                            </div>
                                            <div className="d-atr-group">
                                                {/* <span className="d-atr"><img src={require("../images/icons/1-green.svg")} alt="" />5</span>
                                                <span className="d-atr"><img src={require("../images/icons/2-green.svg")} alt="" />2</span>
                                                <span className="d-atr"><img src={require("../images/icons/3-green.svg")} alt="" />4</span>
                                                <span className="d-atr"><img src={require("../images/icons/4-green.svg")} alt="" />Hatchback</span> */}
                                            </div>
                                            <div className="d-price">
                                                Daily rate from <span>$238</span>
                                                <a className="btn-main" href="car-single.html">Rent Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="de-item mb30">
                                    <div className="d-img">
                                        <img src={require("../images/cars/vw-polo.jpg")} className="img-fluid" alt="" />
                                    </div>
                                    <div className="d-info">
                                        <div className="d-text">
                                            <h4>VW Polo</h4>
                                            <div className="d-item_like">
                                                <i className="fa fa-heart"></i><span>79</span>
                                            </div>
                                            <div className="d-atr-group">
                                                {/* <span className="d-atr"><img src={require("../images/icons/1-green.svg")} alt="" />5</span>
                                                <span className="d-atr"><img src={require("../images/icons/2-green.svg")} alt="" />2</span>
                                                <span className="d-atr"><img src={require("../images/icons/3-green.svg")} alt="" />4</span>
                                                <span className="d-atr"><img src={require("../images/icons/4-green.svg")} alt="" />Hatchback</span> */}
                                            </div>
                                            <div className="d-price">
                                                Daily rate from <span>$106</span>
                                                <a className="btn-main" href="car-single.html">Rent Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <section className="text-light jarallax" aria-label="section">
                <img src={require("../images/background/3.jpg")} alt="" className="jarallax-img"/>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-3">
                        <h1>Let's Your Adventure Begin</h1>
                        <div className="spacer-20"></div>
                    </div>
                    <div className="col-md-3">
                        <i className="fa fa-trophy de-icon mb20"></i>
                        <h4>First Class Services</h4>
                        <p>Where luxury meets exceptional care, creating unforgettable moments and exceeding your every expectation.</p>
                    </div>
                    <div className="col-md-3">
                        <i className="fa fa-road de-icon mb20"></i>
                        <h4>24/7 road assistance</h4>
                        <p>Reliable support when you need it most, keeping you on the move with confidence and peace of mind.</p>
                    </div>
                    <div className="col-md-3">
                        <i className="fa fa-map-pin de-icon mb20"></i>
                        <h4>Free Pick-Up & Drop-Off</h4>
                        <p>Enjoy free pickup and drop-off services, adding an extra layer of ease to your car rental experience.</p>
                    </div>
                </div>
                </div>
            </section>

            <section id="section-news">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 offset-lg-3 text-center">
                            <h2>Latest News</h2>
                            <p>Breaking news, fresh perspectives, and in-depth coverage - stay ahead with our latest news, insights, and analysis.</p>
                            <div className="spacer-20"></div>
                        </div>
                        
                        <div className="col-lg-4 mb10">
                            <div className="bloglist s2 item">
                                <div className="post-content">
                                    <div className="post-image">
                                        <div className="date-box">
                                            <div className="m">10</div>
                                            <div className="d">MAR</div>
                                        </div>
                                        <img alt="" src={require("../images/news/pic-blog-1.jpg")} className="lazy" />
                                    </div>
                                    <div className="post-text">                         
                                        <h4><a href="news-single.html">Enjoy Best Travel Experience<span></span></a></h4>
                                        <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur.</p>
                                        <a className="btn-main" href="#">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                                
                        <div className="col-lg-4 mb10">
                            <div className="bloglist s2 item">
                                <div className="post-content">
                                    <div className="post-image">
                                        <div className="date-box">
                                            <div className="m">12</div>
                                            <div className="d">MAR</div>
                                        </div>
                                        <img alt="" src={require("../images/news/pic-blog-2.jpg")} className="lazy" />
                                    </div>
                                    <div className="post-text">                           
                                        <h4><a href="news-single.html">The Future of Car Rent<span></span></a></h4>
                                        <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur.</p>
                                        <a className="btn-main" href="#">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                                
                        <div className="col-lg-4 mb10">
                            <div className="bloglist s2 item">
                                <div className="post-content">
                                    <div className="post-image">
                                        <div className="date-box">
                                            <div className="m">14</div>
                                            <div className="d">MAR</div>
                                        </div>
                                        <img alt="" src={require("../images/news/pic-blog-3.jpg")} className="lazy" />
                                    </div>
                                    <div className="post-text">                            
                                        <h4><a href="news-single.html">Holiday Tips For Backpacker<span></span></a></h4>
                                        <p>Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur.</p>
                                        <a className="btn-main" href="#">Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section-testimonials" className="no-top no-bottom">
                <div className="container-fluid">
                    <div className="row g-2 p-2 align-items-center">

                        <div className="col-md-4">
                            <div className="de-image-text">
                                <div className="d-text">
                                    <div className="d-quote id-color"><i className="fa fa-quote-right"></i></div>
                                    <h4>Excellent Service! Car Rent Service!</h4>
                                    <blockquote>
                                       I have been using Rentaly for my Car Rental needs for over 5 years now. I have never had any problems with their service. Their customer support is always responsive and helpful. I would recommend Rentaly to anyone looking for a reliable Car Rental provider.
                                       <span className="by">Stepanie Hutchkiss</span>
                                   </blockquote>
                                </div> 
                                <img src={require("../images/testimonial/1.jpg")} className="img-fluid" alt="" />
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="de-image-text">
                                <div className="d-text">
                                    <div className="d-quote id-color"><i className="fa fa-quote-right"></i></div>
                                    <h4>Excellent Service! Car Rent Service!</h4>
                                    <blockquote>
                                       We have been using Rentaly for our trips needs for several years now and have always been happy with their service. Their customer support is Excellent Service! and they are always available to help with any issues we have. Their prices are also very competitive.
                                       <span className="by">Jovan Reels</span>
                                   </blockquote>
                                </div>
                                <img src={require("../images/testimonial/2.jpg")} className="img-fluid" alt="" />
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className="de-image-text">
                                <div className="d-text">
                                    <div className="d-quote id-color"><i className="fa fa-quote-right"></i></div>
                                    <h4>Excellent Service! Car Rent Service!</h4>
                                    <blockquote>
                                       Endorsed by industry experts, Rentaly is the Car Rental solution you can trust. With years of experience in the field, we provide fast, reliable and secure Car Rental services.
                                       <span className="by">Kanesha Keyton</span>
                                   </blockquote>
                                </div>
                                <img src={require("../images/testimonial/3.jpg")} className="img-fluid" alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="section-faq">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h2>Have Any Questions?</h2>
                            <div className="spacer-20"></div>
                        </div>
                    </div>
                    <div className="row g-custom-x">
                        <div className="col-md-6 wow fadeInUp">
                            <div className="accordion secondary">
                                <div className="accordion-section">
                                    <div className="accordion-section-title" data-tab="#accordion-1">
                                        How do I get started with Car Rental?
                                    </div>
                                    <div className="accordion-section-content" id="accordion-1">
                                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                    </div>
                                    <div className="accordion-section-title" data-tab="#accordion-2">
                                        Can I rent a car with a debit card??
                                    </div>
                                    <div className="accordion-section-content" id="accordion-2">
                                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                    </div>
                                    <div className="accordion-section-title" data-tab="#accordion-3">
                                        What kind of Car Rental do I need?
                                    </div>
                                    <div className="accordion-section-content" id="accordion-3">
                                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-6 wow fadeInUp">
                            <div className="accordion secondary">
                                <div className="accordion-section">
                                    <div className="accordion-section-title" data-tab="#accordion-b-4">
                                        What is a rental car security deposit?
                                    </div>
                                    <div className="accordion-section-content" id="accordion-b-4">
                                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                    </div>
                                    <div className="accordion-section-title" data-tab="#accordion-b-5">
                                        Can I cancel or modify my reservation?
                                    </div>
                                    <div className="accordion-section-content" id="accordion-b-5">
                                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                    </div>
                                    <div className="accordion-section-title" data-tab="#accordion-b-6">
                                        Is it possible to extend my rental period?
                                    </div>
                                    <div className="accordion-section-content" id="accordion-b-6">
                                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="section-call-to-action" className="bg-color-2 pt60 pb60 text-light">
                <div className="container">
                    <div className="container">
                    <div className="row">

                        <div className="col-lg-4 offset-lg-2">
                            <span className="subtitle text-white">Call us for further information</span>
                            <h2 className="s2">Rentaly customer care is here to help you anytime.</h2>
                        </div>

                        <div className="col-lg-4 text-lg-center text-sm-center">
                            <div className="phone-num-big">
                                <i className="fa fa-phone"></i>
                                <span className="pnb-text">
                                    Call Us Now
                                </span>
                                <span className="pnb-num">
                                    1 200 333 800
                                </span>
                            </div>
                            <a href="#" className="btn-main">Contact Us</a>
                        </div>
                    </div>
                </div>
                </div>
            </section>
            
        </div>
        <a href="#" id="back-to-top"></a>
        <footer className="text-light">
            <div className="container">
                <div className="row g-custom-x">
                    <div className="col-lg-3">
                        <div className="widget">
                            <h5>About Rentaly</h5>
                            <p>Where quality meets affordability. We understand the importance of a smooth and enjoyable journey without the burden of excessive costs. That's why we have meticulously crafted our offerings to provide you with top-notch vehicles at minimum expense.</p>
                        </div>
                    </div>
                    
                    <div className="col-lg-3">
                        <div className="widget">
                            <h5>Contact Info</h5>
                            <address className="s1">
                                <span><i className="id-color fa fa-map-marker fa-lg"></i>08 W 36th St, New York, NY 10001</span>
                                <span><i className="id-color fa fa-phone fa-lg"></i>+1 333 9296</span>
                                <span><i className="id-color fa fa-envelope-o fa-lg"></i><a href="mailto:contact@example.com">contact@example.com</a></span>
                                <span><i className="id-color fa fa-file-pdf-o fa-lg"></i><a href="#">Download Brochure</a></span>
                            </address>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <h5>Quick Links</h5>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="widget">
                                    <ul>
                                        <li><a href="#">About</a></li>
                                        <li><a href="#">Blog</a></li>
                                        <li><a href="#">Careers</a></li>
                                        <li><a href="#">News</a></li>
                                        <li><a href="#">Partners</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="widget">
                            <h5>Social Network</h5>
                            <div className="social-icons">
                                <a href="#"><i className="fa fa-facebook fa-lg"></i></a>
                                <a href="#"><i className="fa fa-twitter fa-lg"></i></a>
                                <a href="#"><i className="fa fa-linkedin fa-lg"></i></a>
                                <a href="#"><i className="fa fa-pinterest fa-lg"></i></a>
                                <a href="#"><i className="fa fa-rss fa-lg"></i></a>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="de-flex">
                                <div className="de-flex-col">
                                    <a href="index.html">
                                        Copyright 2024 - Rentaly by Designesia
                                    </a>
                                </div>
                                <ul className="menu-simple">
                                    <li><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
       
    </div>
    
    

</section>

)
}

export default LandingPage;

/* global grecaptcha */






import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Modal, Button } from 'react-bootstrap';
import OTPInput from 'react-otp-input';
import PhoneInput from "react-phone-input-2"
import 'react-phone-input-2/lib/style.css'
import { useDispatch } from 'react-redux'
import userAction from '../actions/actions'
import { json, useNavigate } from 'react-router-dom';
import Login from './Login';

import { signInWithPhoneNumber, RecaptchaVerifier, signOut } from 'firebase/auth';

import { auth } from '../firebase';







import { Link } from 'react-router-dom';

import '../css/style.css';
import '../css/mdb.min.css';
import '../css/plugins.css';
import '../css/coloring.css';
import '../css/colors/scheme-01.css';
import { gapi } from "gapi-script";
// import axios from 'axios';


const Header = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    
    // const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState("");


    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [user, setUser] = useState(null)
    const [confirmationResult, setConfirmationResult] = useState(null);


    // const [error, setError] = useState(false);




    const navigate = useNavigate()






    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch()

    // const [confirmationResult, setConfirmationResult] = useState(null);

    const logOut = () => {
        if (userData || JSON.parse(localStorage.getItem("user"))) {
            signOut(auth).then(() => {

                setUserData(null)
                dispatch(userAction.logOut())
                localStorage.clear();
                navigate('/')


            })
            return
        }

        navigate('/login')

    };



    const openLoginModal = (event) => {
        event.preventDefault()
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (otpValue) => {
        if (otpValue.length <= 6) {
            setOtp(otpValue);
        }

    };

    const handleGoogleSuccess = (response) => {
        console.log('Google login successful: ', response);
        closeModal();

        setUserData(
            response.profileObj
        )


        // You can add more fields as nee); // Close the modal after successful login
    };


    const handleGoogleFailure = (error) => {
        console.error('Google login failed: ', error);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };



    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

    }



    useEffect(() => {
        function start() {
            // gapi.client.init({
            //     clientId: "382428617221-8lok26sd8k7otp54qd9mlel226cr66eg.apps.googleusercontent.com",
            //     scope: 'email',
            // });
        }
        // gapi.load('client:auth2', start);
        JSON.parse(localStorage.getItem("user")) && setUserData(JSON.parse(localStorage.getItem("user")))
    }, []);


    const handleOTPSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container');
        const formatPh = '+' + phoneNumber;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                setConfirmationResult(confirmationResult);
                setShowOtp(true);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const handleOTPVerify = () => {
        setLoading(true);
        if (confirmationResult) {
            confirmationResult.confirm(otp)
                .then((res) => {
                    setUser(res.user);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            console.error("Confirmation result is not defined.");
            setLoading(false);
        }
    };





    const renderInput = (index) => {
        return (
            <input
                key={`otp-${index}`}

                onChange={(e) => handleChange(e.target.value)}
                autoFocus={index === 0 ? true : false}
                className="otp-input"
            />
        );
    };














































    return (
        <div id="wrapper">

            {/* <div id="de-preloader"></div> */}

            <header className="transparent scroll-light has-topbar fixed-top">
                <div id="topbar" className="topbar-dark text-light">
                    <div className="container">
                        <div className="topbar-left xs-hide">
                            <div className="topbar-widget">
                                <div className="topbar-widget"><a href="#"><i className="fa fa-phone"></i>+91 9493 555 253</a></div>
                                <div className="topbar-widget"><a href="#"><i className="fa fa-envelope"></i>contact@viharicabs.com</a></div>
                                <div className="topbar-widget"><a href="#"><i className="fa fa-clock-o"></i>24*7 (Sun - Sat)</a></div>
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
                                            <Link to="/"><h2 className="companylogo">Vihari Cabs</h2></Link>
                                            {/* <a href="index.html">
                                            <img className="logo-1" src={require("../images/logo-light.png")} alt="" />
                                            <img className="logo-2" src={require("../images/logo.png")} alt="" />
                                        </a> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="de-flex-col header-col-mid">
                                    <ul id="mainmenu">
                                        <li><Link to="/" className="menu-item">Home</Link>
                                            {/* <ul>
                                                <li><a className="menu-item new" href="02_dark-index-1.html">Homepage 1 Dark</a></li>
                                                <li><a className="menu-item new" href="02_dark-index-2.html">Homepage 2 Dark</a></li>
                                                <li><a className="menu-item" href="index.html">Homepage Main</a></li>
                                                <li><a className="menu-item" href="index-2.html">Homepage 2</a></li>
                                                <li><a className="menu-item" href="index-3.html">Homepage 3</a></li>
                                                <li><a className="menu-item" href="index-4.html">Homepage 4</a></li>
                                                <li><a className="menu-item" href="index-5.html">Homepage 5</a></li>
                                                <li><a className="menu-item" href="index-6.html">Homepage 6</a></li>
                                            </ul> */}
                                        </li>
                                        <li><a className="menu-item" href="cars.html">Cars</a>
                                            {/* <ul>
                                                <li><a className="menu-item" href="cars.html">Cars List 1</a></li>
                                                <li><a className="menu-item" href="02_dark-cars.html">Cars List 1 Dark</a></li>
                                                <li><a className="menu-item" href="cars-list.html">Cars List 2</a></li>
                                                <li><a className="menu-item" href="02_dark-cars-list.html">Cars List 2 Dark</a></li>
                                                <li><a className="menu-item" href="car-single.html">Cars Single</a></li>
                                                <li><a className="menu-item" href="02_dark-car-single.html">Cars Single Dark</a></li>
                                            </ul> */}
                                        </li>
                                        {/* <li><a className="menu-item" href="quick-booking.html">Booking</a>
                                            <ul>
                                                <li><a className="menu-item new" href="quick-booking.html">Quick Booking</a></li>
                                                <li><a className="menu-item" href="booking.html">Booking</a></li>
                                            </ul>
                                        </li> */}
                                        <li><a className="menu-item" href="account-dashboard.html">My Account</a>
                                            <ul>
                                                <li><Link to="/Dashboard" className="menu-item" href="account-dashboard.html" onClick={openLoginModal}>Dashboard</Link>
                                                    <Modal show={isLoginModalOpen} onHide={closeLoginModal}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Login</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>



                                                            





                                                            <Login />
                                                        </Modal.Body>
                                                    </Modal>


                                                </li>
                                                <li><a className="menu-item" href="account-profile.html">My Profile</a></li>
                                                <li><a className="menu-item" href="account-booking.html">My Orders</a></li>
                                                <li><a className="menu-item" href="account-favorite.html">My Favorite Cars</a></li>
                                            </ul>
                                        </li>

                                        <li><Link to="/Ourfleet" className="menu-item">Our Fleet</Link>

                                        </li>
                                        {/* <li><a className="menu-item" href="#">Pages</a>
                                            <ul>
                                                <li><a className="menu-item" href="about.html">About Us</a></li>
                                                <li><a className="menu-item" href="contact.html">Contact</a></li>
                                                <li><a className="menu-item" href="login.html">Login</a></li>
                                                <li><a className="menu-item" href="register.html">Register</a></li>
                                                <li><a className="menu-item" href="404.html">Page 404</a></li>
                                            </ul>
                                        </li> */}
                                        {/* <li><a className="menu-item" href="#">News</a>
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
                                        </li> */}
                                        {/* <li><a className="menu-item" href="#">Elements</a>
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
                                        </li> */}
                                    </ul>
                                </div>
                                <div className="de-flex-col">
                                    <div className="menu_side_area">

                                        <p onClick={logOut} style={{ cursor: "pointer" }}>{userData ? "Welcome" : "Login"} {userData?.DisplayName}!</p>

                                        {/* {localStorage.getItem("user")} */}

                                    </div>


                                    <Modal show={isModalOpen} onHide={closeModal} centered>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Login</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form onSubmit={handleFormSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" id="email" value={email} onChange={handleEmailChange} required />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password:</label>
                                                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
                                                </div>

                                            
                                                <div id="recaptcha-container"></div>
                                                {user ? (
                                                    <h2>Login successful</h2>
                                                ) : (
                                                    <div>
                                                        {showOtp ? (
                                                            <div>
                                                                <OTPInput
                                                                    value={otp}
                                                                    onChange={handleChange}
                                                                    OTPLength={6}
                                                                    otpType="number"
                                                                    disabled={false}
                                                                    autoFocus
                                                                    renderInput={renderInput}
                                                                    className="otp-input"
                                                                />
                                                                <button onClick={handleOTPVerify}>Verify OTP</button>
                                                                {loading && <span>Loading...</span>}
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <PhoneInput country={"in"} value={phoneNumber} onChange={setPhoneNumber} />
                                                                <button onClick={handleOTPSubmit}>Send OTP</button>
                                                                {loading && <cgSpinner size={20} className="mt-1 animatespin" />}
                                                            </>
                                                        )}
                                                    </div>
                                                )}










                                                

                                            </form>
                                            <p>or</p>
                                            <GoogleLogin
                                                clientId="382428617221-8lok26sd8k7otp54qd9mlel226cr66eg.apps.googleusercontent.com"
                                                buttonText="Sign in with Google"
                                                onSuccess={handleGoogleSuccess}
                                                onFailure={handleGoogleFailure}
                                                cookiePolicy={'single_host_origin'}
                                            />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            
                                        </Modal.Footer>
                                    </Modal>












                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header;
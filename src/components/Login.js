


import React, { useEffect, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import PlacesAutocomplete from 'react-places-autocomplete';
import { gapi } from "gapi-script";
import axios from 'axios';
import {Modal} from 'react-bootstrap'
import { auth, signInWithGooglePopup } from '../firebase';


import { useDispatch, useSelector } from "react-redux";
import userActions from '../actions/actions'
import { Navigate, redirect, Redirect } from 'react-router'
import { useNavigate } from 'react-router-dom';

import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'


const Login = ({ onSuccess, onFailure }) => {
  const [userData, setUserData] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [email, setEmail] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [showSignIn, setShowSignIn] = useState(false)

  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  
  const [showVerifyInput, setShowVerifyInput] = useState(false)
  const [verifyCode, setVerifyCode] = useState(null)
  // const [otp, setOtp] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  


  const user = useSelector((state) => state.user)

  const dispatch = useDispatch();

  const navigate = useNavigate();


  // console.log(phoneNumber)
  useEffect(() => {
    function start() {
      // gapi.client.init({
      //   clientId: "382428617221-8lok26sd8k7otp54qd9mlel226cr66eg.apps.googleusercontent.com", // Replace with your client ID
      //   scope: 'email',
      // });
      user.loggedIn && redirect('/')
    }

    gapi.load('client:auth2', start);
    // setUpRecaptcha();
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

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
    setUserData(response.user)
    dispatch(userActions.setUser({displayName
      : 
      response.user.displayName,
      email
      : 
      response.user.email,
      emailVerified
      : 
      response.user.emailVerified,
      isAnonymous
      : 
      response.user.isAnonymous,
    photoUrl:
  response.user.photoURL,
phoneNumber: response.user.phoneNumber}))
const userLogged = {DisplayName:
response.user.displayName,
email:
response.user.email,
loggedIn: 
user.loggedIn,
isAnonymous:
response.user.isAnonymous,
photoUrl:
response.user.photoURL,
phoneNumber: response.user.phoneNumber}
localStorage.clear()
localStorage.setItem("user", JSON.stringify(userLogged))


user.user.phoneNumber ? navigate('/') : setIsModalOpen(true)
// 
    
}

const handlePhoneNumber = (e) => {
  setPhoneNumber(e.target.value);
};

const handleVerify = (e) => {
  setVerifyCode(e.target.value)
}

const submitOTP = () => {
  if(verifyCode?.length === 6) {
    let confirmationResult = window.confirmationResult
    confirmationResult.confirm(verifyCode).then((result) => {
      if(showSignIn) {
        axios.post('http://127.0.0.1:5000/checkCustomer', {phoneNumber: phoneNumber}).then(re => {
          if(re.status === 400) {
            alert("you are not registered please SignUp first")
            navigate('/login')
            return 
          } else {
            // console.log(re.data)
            if(re.data.role === 'admin') {
              // alert("you are admin")
              dispatch(userActions.admin(re.data))
              const adminLogged = {
                DisplayName: re.data.firstname + " " + re.data.lastname,
                role: "admin",
                loggedIn: true
              }
              localStorage.setItem("user", JSON.stringify(adminLogged))
              navigate('/Dashboard')
              return 
            } else if(re.data.role === 'zoneAdmin') {
              localStorage.clear()
              dispatch(userActions.zoneAdmin(re.data))
              const zoneAdminLogged = {
                DisplayName: re.data.firstname + " " + re.data.lastname,
                role: "zoneAdmin",
                loggedIn: true,
               
              }
              localStorage.clear()
              localStorage.setItem("user", JSON.stringify(zoneAdminLogged))
              navigate('/Dashboard')
              return
            }
            else if(re.data.role === 'vendor') {
              localStorage.clear()
              dispatch(userActions.vendor(re.data))
              const vendorLogged = {
                DisplayName: re.data.firstname + " " + re.data.lastname,
                role: "vendor",
                loggedIn: true,
               
              }
              localStorage.clear()
              localStorage.setItem("user", JSON.stringify(vendorLogged))
              navigate('/Dashboard')
              return
            }
            dispatch(userActions.setUser({
              firstName: re.data.firstname,
        lastName: re.data.lastname,
        email: re.data.email,
        phoneNumber: re.data.mobile,
        displayName: re.data.firstname + " " + re.data.lastname,
        role:'user'
            }))
            const userLogged = {
              loggedIn: true,
              role: 'user',
              DisplayName: re.data.firstname + " " + re.data.lastname
            }
            localStorage.setItem("user", JSON.stringify(userLogged))
            navigate('/')
          }
        })
        return
      }
      dispatch(userActions.setUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        displayName: firstName + " " + lastName
      }))
      // setTimeout(()=> {cal
      //   console.log(user)
      // }, 1000)
      const userLogged = {
        loggedIn: true,
        DisplayName: firstName + " " + lastName
      }
      localStorage.setItem("user", JSON.stringify(userLogged))
      console.log(user)
      axios.post('http://127.0.0.1:5000/createCustomer', {firstName: firstName, lastName: lastName, email:email, phoneNumber: phoneNumber}).then(re => {
        if (re.data == "working....") {
          navigate('/')
        } 
        alert(re.data)
        return
      })
     
    }).catch((error) => {
      console.log(error)
    })
  }
}

const closeModal = () => {
  setIsModalOpen(false);
};

const handleEmail = (e) => {
 setEmail(e.target.value)
}
const handleFirstName = (e) => {

  setFirstName(e.target.value)
}
const handleLastName = (e) => {
  setLastName(e.target.value)
}


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

const generateRecaptcha = () => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      console.log(response)
    }
  });
}

  const handleFormSubmit = async(e) => {
    // e.preventDefault();
    console.log(userData)
    // alert(phoneNumber.length)
    if(phoneNumber.length >= 13) {
    generateRecaptcha()
    setShowVerifyInput(true)
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult
      console.log(confirmationResult)
    }).catch((error) => {
      console.log(error)  
    })
  }


}

const verifyInput = showVerifyInput && (<div><label htmlFor="verify">verification code:</label>
<input type="number" id="verify" value={verifyCode} onChange={handleVerify} required placeholder='put 6 digit verification code'/>
<div className="col-lg-6">
                        <a className="btn-sc btn-fullwidth mb10" onClick={submitOTP} href="#"><img src="../images/svg/google_icon.svg" alt="" />submitOTP</a>
                      </div></div>)
                    
const singInInput = showSignIn && (
  <div>
    <div className="field-set">
                        <input type="text" name="phoneNumber" id="phoneNumber" className="form-control" placeholder="Your number" onChange={handlePhoneNumber}/><br/>
                        <div className="col-lg-6">
                        <a className="btn-sc btn-fullwidth mb10" onClick={() => showVerifyInput ? submitOTP() : handleFormSubmit()} href="#"><img src="../images/svg/google_icon.svg" alt="" />submitOTP</a>
                      </div>
                      </div>
                      
  </div>
)
return (
  <section>
      <Modal show={isModalOpen} onHide={closeModal} centered>
          <Modal.Header closeButton>
              <Modal.Title>NO number Detected, Please provide Number</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number:</label>
                      <input
                          type="text"
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={handlePhoneNumber}
                          required
                          placeholder="Phone number with country code"
                      />
                  </div>
                  {verifyInput}
              </form>
              <p>or</p>
          </Modal.Body>
          <Modal.Footer>{/* Footer content */}</Modal.Footer>
      </Modal>

      <div className="v-center">
          <div className="container">
              <div className="row align-items-center">
                  <div className="col-lg-4 offset-lg-4">
                      <div className="padding40 rounded-3 shadow-soft" data-bgcolor="#ffffff">
                          <form id="form_register" className="form-border" onSubmit={handleFormSubmit}>
                              {!showSignIn && (
                                  <>
                                      <div className="field-set">
                                          <input
                                              type="text"
                                              name="phoneNumber"
                                              id="phoneNumber"
                                              className="form-control"
                                              placeholder="Your number"
                                              onChange={handlePhoneNumber}
                                          />
                                      </div>
                                      <div className="field-set">
                                          <input
                                              type="text"
                                              name="firstName"
                                              id="firstName"
                                              className="form-control"
                                              placeholder="Your first Name"
                                              onChange={handleFirstName}
                                          />
                                      </div>
                                      <div className="field-set">
                                          <input
                                              type="text"
                                              name="lastName"
                                              id="lastName"
                                              className="form-control"
                                              placeholder="Your last Name"
                                              onChange={handleLastName}
                                          />
                                      </div>
                                      <div className="field-set">
                                          <input
                                              type="email"
                                              name="email"
                                              id="email"
                                              className="form-control"
                                              placeholder="Your email"
                                              onChange={handleEmail}
                                          />
                                      </div>
                                      <div id="submit">
                                          <input
                                              type="submit"
                                              id="send_message"
                                              value="Sign Up"
                                              className="btn-main btn-fullwidth rounded-3"
                                              onClick={handleFormSubmit}
                                          />
                                      </div>
                                      {verifyInput}
                                  </>
                              )}
                              {!verifyInput ? singInInput : verifyInput}
                              <div className="sign-in-button" id="sign-in-button"></div>
                          </form>
                          <div className="col-lg-6">
                              <a
                                  className="btn-sc btn-fullwidth mb10"
                                  onClick={() => {
                                      setShowSignIn((prev) => !prev);
                                      if (showVerifyInput) setShowVerifyInput(false);
                                  }}
                                  href="#"
                              >
                                  <img src="../images/svg/google_icon.svg" alt="" /> Sign {showSignIn ? 'up' : 'in'}
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
);

//   return (








    
//     <section>



//       <Modal show={isModalOpen} onHide={closeModal} centered>
//                                         <Modal.Header closeButton>
//                                             <Modal.Title>NO number Detected, Please provide Number</Modal.Title>
//                                         </Modal.Header>
//                                         <Modal.Body>
//                                             <form onSubmit={handleFormSubmit}>
//                                               <div className="form-group">
//                                                     <label htmlFor="email">Phone Number:</label>
//                                                     <input type="text" id="email" value={phoneNumber} onChange={handlePhoneNumber} required  placeholder='phone number with country code'/>

                                                    
//                                                 </div>
//                                                 {verifyInput }
                                               
                                                

                                                


                                                




                                               

//                                             </form>
//                                             <p>or</p>
                                           
//                                         </Modal.Body>
//                                         <Modal.Footer>
//                                             {/* Footer content */}
//                                         </Modal.Footer>
//                                     </Modal>


//                                     <div className="v-center">
//             <div className="container">
//               <div className="row align-items-center">
//                 <div className="col-lg-4 offset-lg-4">
//                   <div className="padding40 rounded-3 shadow-soft" data-bgcolor="#ffffff">
//                     {/* <h4>Login</h4>
//                     <div className="spacer-10"></div> */}
//                     <form id="form_register" className="form-border">
//                       {!showSignIn && <>
//                         <div className="field-set">
//                         <input type="text" name="phoneNumber" id="phoneNumber" className="form-control" placeholder="Your number" onChange={handlePhoneNumber}/>
//                       </div>
//                       <div className="field-set">
//                         <input type="text" name="firstName" id="firstName" className="form-control" placeholder="Your first Name" onChange={handleFirstName}/>
//                       </div>
//                       <div className="field-set">
//                         <input type="text" name="lastName" id="lastName" className="form-control" placeholder="Your last Name" onChange={handleLastName}/>
//                       </div>
//                       <div className="field-set">
//                         <input type='email' name="email" id="email" className="form-control" placeholder="Your email" onChange={handleEmail}/>
//                       </div>
//                       <div id="submit">
//                         <input type="submit" id="send_message" value="Sign Up" className="btn-main btn-fullwidth rounded-3" onClick={handleFormSubmit}/>
//                       </div>

//                       {verifyInput}
// </>}                  
//                         {!verifyInput ? singInInput: verifyInput}
                      
//                       <div className="sign-in-button" id='sign-in-button'></div>
//                     </form>
                   
//                     <div className="col-lg-6">
//                         <a className="btn-sc btn-fullwidth mb10" onClick={() => {setShowSignIn((prev) => !prev); if (showVerifyInput) setShowVerifyInput(false)}} href="#"><img src="../images/svg/google_icon.svg" alt="" />Sign {showSignIn ? "up" : "in"}</a>
//                       </div>
                   
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          

      
//     </section>



//   );
};







export default Login;



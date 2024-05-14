import React, { useEffect, useState } from "react";

import PlacesAutocomplete from "react-places-autocomplete";
import { gapi } from "gapi-script";
import axios from "axios";
import "../css/style.css";
import "../css/mdb.min.css";
import "../css/plugins.css";
import "../css/coloring.css";
import "../css/colors/scheme-01.css";
import "../css/custom.css";
import Header from "./Header";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import { event } from "jquery";

const Home = ({ onSuccess, onFailure }) => {
  const [location, setLocation] = useState("");
  const [stop, setStop] = useState("");
  const [destination, setDestination] = useState("");
  const [roundDestination, setRoundDestination] = useState("");
  const [distance, setDistance] = useState(null);
  const [tripDate, setTripDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour1, setSelectedHour1] = useState(0);
  const [selectedMinute1, setSelectedMinute1] = useState(0);
  const [date, setDate] = useState(new Date());
  const [selectedHour2, setSelectedHour2] = useState(0);
  const [selectedMinute2, setSelectedMinute2] = useState(0);
  const [tripType, setTripType] = useState("oneWay");

  const [roundTripDistance, setRoundTripDistance] = useState("");

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "382428617221-8lok26sd8k7otp54qd9mlel226cr66eg.apps.googleusercontent.com", // Replace with your client ID
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    if (selectedDate) {
      // Calculate return date
      const dateTime = new Date(selectedDate.getTime() + 6 * 60 * 60 * 1000);
      setDate(dateTime);
      // Add 6 hours
    }
  }, [selectedDate]);

  const handleLocationChange = (value) => {
    setLocation(value);
    setDistance(null);
  };
  const handleStopChange = (value) => {
    setStop(value);

    setRoundTripDistance(null);
  };

  const handleChange = (date) => {
    setSelectedDate(date);

    calculateTimeDifference();
  };

  const handleTripTypeChange = (newTripType) => {
    setTripType(newTripType);
  };

  const handleHourChange = (event) => {
    setSelectedHour(parseInt(event.target.value));
  };
  const handleMinuteChange = (event) => {
    setSelectedMinute(parseInt(event.target.value));
  };

  const handleHourChange1 = (event) => {
    setSelectedHour1(parseInt(event.target.value));
  };

  const handleMinuteChange1 = (event) => {
    setSelectedMinute1(parseInt(event.target.value));
  };

  const handletripDate = (date) => {
    setTripDate(date);
  };

  // const newDate = new Date(selectedDate.getTime() + 6 * 60 * 60 * 1000); // Add 6 hours
  // setDate(date);

  const newDate = (date) => {
    setDate(date);
    calculateTimeDifference();
  };

  const handleHourChange2 = (event) => {
    setSelectedHour2(parseInt(event.target.value));
  };

  const handleMinuteChange2 = (event) => {
    setSelectedMinute2(parseInt(event.target.value));
  };

  const calculateTimeDifference = () => {
    if (selectedDate && date) {
      const dateTime1 = new Date(selectedDate);
      dateTime1.setHours(selectedHour1);
      dateTime1.setMinutes(selectedMinute1);

      const dateTime2 = new Date(date);
      dateTime2.setHours(selectedHour2);
      dateTime2.setMinutes(selectedMinute2);

      const differenceMs = Math.abs(dateTime2 - dateTime1);
      const differenceMinutes = Math.round(differenceMs / (1000 * 60)); // Round to the nearest integer
      if (differenceMinutes < 60) {
        return `${differenceMinutes} minute${
          differenceMinutes !== 1 ? "s" : ""
        }`;
      } else {
        const hours = Math.floor(differenceMinutes / 60);
        const remainingMinutes = differenceMinutes % 60;
        return `${hours} hour${
          hours !== 1 ? "s" : ""
        } ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
      }
    }
    return null;
  };

  const handleDestinationChange = async (value) => {
    setDestination(value);
    setDistance(null);
    await fetchDistanceAndDuration();
  };

  // const handleDestinationChange = async (value) => {
  //     setDestination(value);
  //     setDistance(null);

  //     if (location && destination) {
  //         try {
  //             const response = await axios.get(
  //                 `api/distancematrix/json?units=metric&origins=${encodeURIComponent(
  //                     location
  //                 )}&destinations=${encodeURIComponent(
  //                     destination
  //                 )}&key=AIzaSyAL9K2tfUIeuX0SkO2EZ4Ig55gbtPeZs-c`
  //             );
  //             console.log("Distance API Response:", response);

  //             const rowData = response.data.rows[0];
  //             if (rowData && rowData.elements && rowData.elements.length > 0) {
  //                 const element = rowData.elements[0];
  //                 if (element && element.distance && element.duration) {
  //                     const distanceText = element.distance.text;
  //                     const durationText = element.duration.text;
  //                     setDistance({ distance: distanceText, duration: durationText });
  //                 } else {
  //                     console.error(
  //                         "Invalid response format: Missing distance or duration"
  //                     );
  //                 }
  //             } else {
  //                 console.error("Invalid response format: Missing rows or elements");
  //             }
  //         } catch (error) {
  //             console.error("Error calculating distance:", error);
  //         }
  //     }
  // };//important

  const fetchDistanceAndDuration = async () => {
    try {
      const response = await axios.get(
        `api/distancematrix/json?units=metric&origins=${encodeURIComponent(
          location
        )}&destinations=${encodeURIComponent(
          destination
        )}&key=AIzaSyAL9K2tfUIeuX0SkO2EZ4Ig55gbtPeZs-c`
      );

      const rowData = response.data.rows[0];
      if (rowData && rowData.elements && rowData.elements.length > 0) {
        const element = rowData.elements[0];
        if (element && element.distance && element.duration) {
          const distanceText = element.distance.text;
          const durationText = element.duration.text;
          setDistance({ distance: distanceText, duration: durationText });
        } else {
          console.error(
            "Invalid response format: Missing distance or duration"
          );
        }
      } else {
        console.error("Invalid response format: Missing rows or elements");
      }
    } catch (error) {
      console.error("Error calculating distance:", error);
    }
  };

  const handleroundDestinationChange = async (value) => {
    setRoundDestination(value);
    setRoundTripDistance(null);

    if (stop && roundDestination) {
      try {
        const responseToDestination = await axios.get(
          `api/distancematrix/json?units=metric&origins=${encodeURIComponent(
            stop
          )}&destinations=${encodeURIComponent(
            roundDestination
          )}&key=AIzaSyAL9K2tfUIeuX0SkO2EZ4Ig55gbtPeZs-c`
        );

        const responseToOrigin = await axios.get(
          `api/distancematrix/json?units=metric&origins=${encodeURIComponent(
            roundDestination
          )}&destinations=${encodeURIComponent(
            stop
          )}&key=AIzaSyAL9K2tfUIeuX0SkO2EZ4Ig55gbtPeZs-c`
        );

        const distanceToDestination = parseDistanceResponse(
          responseToDestination
        );
        const distanceToOrigin = parseDistanceResponse(responseToOrigin);

        const roundTripDistanceInMeters =
          distanceToDestination + distanceToOrigin;
        const roundTripDistanceInKilometers = roundTripDistanceInMeters / 1000; // Convert meters to kilometers
        setRoundTripDistance(roundTripDistanceInKilometers);
      } catch (error) {
        console.error("Error calculating distance:", error);
      }
    }
  };

  const parseDistanceResponse = (response) => {
    if (
      response &&
      response.data &&
      response.data.rows &&
      response.data.rows.length > 0
    ) {
      const rowData = response.data.rows[0];
      if (rowData && rowData.elements && rowData.elements.length > 0) {
        const element = rowData.elements[0];
        if (element && element.distance && element.distance.value) {
          return element.distance.value;
        } else {
          console.error("Invalid response format: Missing distance value");
          return 0;
        }
      } else {
        console.error("Invalid response format: Missing elements");
        return 0;
      }
    } else {
      console.error("Invalid response format: Missing data or rows");
      return 0;
    }
  };

  const handleTripSubmit = async (event) => {
    await fetchDistanceAndDuration();

    let payload = {};

    if (tripType === "oneWay") {
      // Construct trip start datetime from tripDate, selectedHour, and selectedMinute
      const trip_start_datetime = new Date(tripDate);
      trip_start_datetime.setHours(selectedHour);
      trip_start_datetime.setMinutes(selectedMinute);

      payload = {
        trip_type: "oneWay",
        origin_zone: location,
        destination: destination,

        travel_date: tripDate,

        trip_start_datetime: trip_start_datetime.toISOString(),
        trip_end_datetime: null,

        vehicle_type: "",
        total_distance_calculated: distance?.distance,
        trip_duration: distance?.duration,
        user_id: "",
      };
    } else if (tripType === "roundTrip") {
      await handleroundDestinationChange(roundDestination);

      const timeDifference = calculateTimeDifference();

      // Construct trip start and end datetime for round trip
      const trip_start_datetime = new Date(selectedDate);
      trip_start_datetime.setHours(selectedHour1);
      trip_start_datetime.setMinutes(selectedMinute1);

      const trip_end_datetime = new Date(date);
      trip_end_datetime.setHours(selectedHour2);
      trip_end_datetime.setMinutes(selectedMinute2);

      payload = {
        trip_type: "roundTrip",
        origin_zone: stop,
        destination: roundDestination,
        travel_date: selectedDate,
        trip_start_datetime: trip_start_datetime.toISOString(),
        trip_end_datetime: trip_end_datetime.toISOString(),
        vehicle_type: "",
        total_distance_calculated: distance?.distance,
        trip_duration: timeDifference,
        user_id: "",
      };
    }

    try {
      const saveResponse = await axios.post("/api/save-trip-data", payload);

      console.log("Data saved successfully:", saveResponse.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }

    event.preventDefault();
  };

  return (
    <>
      <Header />

     

      
<slider>
        <slide>Out Station Cabs</slide>
        <slide>Airport Pickups</slide>
        <slide>Destination Trip </slide>
        <slide>Family Tour Packages </slide>
      </slider>
      <div className="" id="content">

        <section>
        
      <div className="col-lg-12 search-overlay">
        {/* <div className="spacer-single sm-hide"></div> */}
        <div className="text-center" data-bgcolor="#ffffff">
          <form name="contactForm" id="contact_form" method="post">
            <div className="col-lg-12 mb30">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      tripType === "oneWay" ? "active" : ""
                    }`}
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#oneWay"
                    type="button"
                    role="tab"
                    aria-controls="oneWay"
                    aria-selected={tripType === "oneWay"}
                    onClick={() => handleTripTypeChange("oneWay")}
                  >
                    <strong>One way</strong>
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      tripType === "roundTrip" ? "active" : ""
                    }`}
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#roundTrip"
                    type="button"
                    role="tab"
                    aria-controls="roundTrip"
                    aria-selected={tripType === "roundTrip"}
                    onClick={() => handleTripTypeChange("roundTrip")}
                  >
                   <strong>Round Trip</strong> 
                  </button>
                </li>
              </ul>

              {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                    <li className="nav-item" role="presentation">
                                                        <button
                                                            className="nav-link active"
                                                            id="home-tab"
                                                            data-bs-toggle="tab"
                                                            data-bs-target="#oneWay"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="home"
                                                            aria-selected="true"
                                                            

                                                        >
                                                            One way
                                                        </button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button
                                                            className="nav-link"
                                                            id="profile-tab"
                                                            data-bs-toggle="tab"
                                                            data-bs-target="#roundTrip"
                                                            type="button"
                                                            role="tab"
                                                            aria-controls="profile"
                                                            aria-selected="false"
                                                           
                                                        >
                                                            Round Trip
                                                        </button>
                                                    </li>
                                                    
                                                </ul> */}
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="oneWay"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="container">
                    <div className="d-flex search-box">
                      <div className="flex-item">
                      <h5>Pick Up Location</h5>
                        <PlacesAutocomplete
                          value={location}
                          onChange={handleLocationChange}
                          onSelect={handleLocationChange}
                          searchOptions={{ types: ["(cities)"] }}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: "Enter Pickup location",
                                  className:
                                    "location-pickupinput location-search-input",
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                        {/* <input type="text" name="PickupLocation" onFocus={handleLocationChange} placeholder="Enter your pickup location" id="autocomplete" autoComplete="off" className="form-control"/> */}

                        <div className="jls-address-preview jls-address-preview--hidden">
                          <div className="jls-address-preview__header"></div>
                        </div>
                      </div>

                      <div className="flex-item">
                      <h5>Drop Off Location</h5>
                        <PlacesAutocomplete
                          value={destination}
                          onChange={handleDestinationChange}
                          onSelect={handleDestinationChange}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: "Enter DropOff Location",
                                  className:
                                    "location-dropinput destination-search-input",
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>

                              <div>
                                {distance && (
                                  <div>
                                    <p>Distance: {distance.distance}</p>
                                    <p>Duration: {distance.duration}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>

                        {/* <input type="text" name="DropoffLocation" onFocus={handleDestinationChange} placeholder="Enter your dropoff location" id="autocomplete2" autoComplete="off" className="form-control"/> */}

                        <div className="jls-address-preview jls-address-preview--hidden">
                          <div className="jls-address-preview__header"></div>
                        </div>
                      </div>

                      <div className="flex-item">
                      <h5>Travel Date & Time</h5>
                        <div className="date-time-field">
                          <div className="date-picker-container">
                            <DatePicker
                              selected={tripDate}
                              minDate={new Date()} // Set minDate to restrict selecting past dates
                              dateFormat="MMMM d, yyyy"
                              onChange={handletripDate}
                            />
                          </div>
                          <div className="time-picker-container">
                            <select
                              value={selectedHour}
                              onChange={handleHourChange}
                            >
                              {[...Array(24).keys()].map((hour) => (
                                <option key={hour} value={hour}>
                                  {`${hour}`.padStart(2, "0")}
                                </option>
                              ))}
                            </select>
                            <select
                              value={selectedMinute}
                              onChange={handleMinuteChange}
                            >
                              {[...Array(12).keys()].map((minute) => (
                                <option key={minute * 5} value={minute * 5}>
                                  {minute * 5 === 0
                                    ? "00"
                                    : (minute * 5).toString().padStart(2, "0")}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex-item buttonposition">
                        <button onClick={handleTripSubmit} className="button">
                        <h6>Find a viehcle</h6>
                        </button>
                      </div>
                      {/* <div className="col-lg-4">
                                                                    <p>Travel Date & Time</p>
                                                                    <div className="date-time-field">
                                                                        <DatePicker
                                                                            selected={tripDate}
                                                                            
                                                                            minDate={new Date()} // Set minDate to restrict selecting past dates
                                                                            dateFormat="MMMM d, yyyy"
                                                                            onChange={handletripDate}
                                                                        />
                                                                       
                                                                        <select
                                                                            value={selectedHour}
                                                                            onChange={handleHourChange}
                                                                        >
                                                                            {[...Array(24).keys()].map((hour) => (
                                                                                <option key={hour} value={hour}>
                                                                                    {`${hour}`.padStart(2, "0")}
                                                                                </option>
                                                                            ))}
                                                                        </select>

                                                                        <select
                                                                            value={selectedMinute}
                                                                            onChange={handleMinuteChange}
                                                                        >
                                                                            {[...Array(12).keys()].map((minute) => (
                                                                                <option
                                                                                    key={minute * 5}
                                                                                    value={minute * 5}
                                                                                >
                                                                                    {minute * 5 === 0
                                                                                        ? "00"
                                                                                        : (minute * 5)
                                                                                            .toString()
                                                                                            .padStart(2, "0")}
                                                                                </option>
                                                                            ))}
                                                                        </select>

                                                                    </div>
                                                                </div> */}
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="roundTrip"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="container">
                    <div className="d-flex search-box">
                      <div className="flex-item">
                      <h5>Pick Up Location</h5>
                        <PlacesAutocomplete
                          value={stop}
                          // onChange={handleStopChange}
                          onChange={(value) => {
                            setStop(value);
                          }}
                          onSelect={handleStopChange}
                          searchOptions={{ types: ["(cities)"] }}
                          className="form-control"
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input type="text"
                                {...getInputProps({
                                  placeholder: "Enter Pickup location",
                                  className:
                                    "form-control location-pickupinput location-search-input",
                                })}
                              />

                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                        {/* <input type="text" name="PickupLocation" onFocus={handleLocationChange} placeholder="Enter your pickup location" id="autocomplete" autoComplete="off" className="form-control"/> */}

                        <div className="jls-address-preview jls-address-preview--hidden">
                          <div className="jls-address-preview__header"></div>
                        </div>
                      </div>
                      <div className="flex-item">
                      <h5>Drop Off Location</h5>
                        <PlacesAutocomplete
                          value={roundDestination}
                          onChange={(value) => {
                            setRoundDestination(value);
                          }}
                          // onChange={handleroundDestinationChange}
                          onSelect={handleroundDestinationChange}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input type="text"
                                {...getInputProps({
                                  placeholder: "Enter DropOff Location",
                                  className:
                                    "form-control location-dropinput destination-search-input",
                                })}
                              />

                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>

                        {/* <input type="text" name="DropoffLocation" onFocus={handleDestinationChange} placeholder="Enter your dropoff location" id="autocomplete2" autoComplete="off" className="form-control"/> */}

                        <div className="jls-address-preview jls-address-preview--hidden">
                          <div className="jls-address-preview__header"></div>
                        </div>
                      </div>
                      
                      <div className="flex-item">
                        
                      <h5>Pick Up Date & Time</h5>
                        <div className="date-time-field d-flex1">
                          <DatePicker
                            selected={selectedDate}
                            onChange={handleChange}
                            minDate={selectedDate}
                            dateFormat="MMMM d, yyyy"
                            className="flex-item"
                          />

                          <select
                            value={selectedHour1}
                            onChange={handleHourChange1}
                            className="flex-item"
                          >
                            {[...Array(24).keys()].map((hour) => (
                              <option key={hour} value={hour}>
                                {`${hour}`.padStart(2, "0")}
                              </option>
                            ))}
                          </select>

                          {/* First input field for minutes */}
                          <select
                            value={selectedMinute1}
                            onChange={handleMinuteChange1}
                            className="flex-item"
                          >
                            {[...Array(12).keys()].map((minute) => (
                              <option key={minute * 5} value={minute * 5}>
                                {minute * 5 === 0
                                  ? "00"
                                  : (minute * 5).toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex-item">
                        <h5>Return Date & Time</h5>
                        <div className="date-time-field">
                          <DatePicker
                            selected={date}
                            // onChange={() => { }}

                            onChange={newDate}
                            dateFormat="MMMM d, yyyy "
                            minDate={selectedDate}
                          />

                          <select
                            value={selectedHour2}
                            onChange={handleHourChange2}
                          >
                            {[...Array(24).keys()].map((hour) => (
                              <option key={hour} value={hour}>
                                {`${hour}`.padStart(2, "0")}
                              </option>
                            ))}
                          </select>

                          {/* Second input field for minutes */}
                          <select
                            value={selectedMinute2}
                            onChange={handleMinuteChange2}
                          >
                            {[...Array(12).keys()].map((minute) => (
                              <option key={minute * 5} value={minute * 5}>
                                {minute * 5 === 0
                                  ? "00"
                                  : (minute * 5).toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex-item buttonposition">
                        <button className="button" onClick={handleTripSubmit}>
                         <h6> Find a viehcle</h6>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-6 searchresult">
                    {roundTripDistance !== "" && (
                      <div>
                        <p>
                          Round Trip Distance:{" "}
                          {Number(roundTripDistance).toFixed(2)} km
                        </p>
                      </div>
                    )}

                    {selectedDate && date && (
                      <p>Time difference: {calculateTimeDifference()} </p>
                    )}
                  </div> */}
                  <div></div>
                </div>
                {/* <div className="tab-pane fade" id="hourly" role="tabpanel" aria-labelledby="contact-tab">.contact..</div> */}
              </div>
            </div>
            {/* <div className="col-lg-5 mb30">
                                                <h5>What is your vehicle type?</h5>

                                                <div className="de_form de_radio row g-3">
                                                    <div className="radio-img col-lg-3 col-sm-3 col-6">
                                                        <input id="radio-1a" name="Car_Type" type="radio" value="Residential" checked="checked" />
                                                        <label htmlFor="radio-1a"><img src={require("../images/select-form/car.png")} alt="" />Car</label>
                                                    </div>

                                                    <div className="radio-img col-lg-3 col-sm-3 col-6">
                                                        <input id="radio-1b" name="Car_Type" type="radio" value="Office" />
                                                        <label htmlFor="radio-1b"><img src={require("../images/select-form/van.png")} alt="" />Van</label>
                                                    </div>

                                                    <div className="radio-img col-lg-3 col-sm-3 col-6">
                                                        <input id="radio-1c" name="Car_Type" type="radio" value="Commercial" />
                                                        <label htmlFor="radio-1c"><img src={require("../images/select-form/minibus.png")} alt="" />Minibus</label>
                                                    </div>

                                                    <div className="radio-img col-lg-3 col-sm-3 col-6">
                                                        <input id="radio-1d" name="Car_Type" type="radio" value="Retail" />
                                                        <label htmlFor="radio-1d"><img src={require("../images/select-form/sportscar.png")} alt="" />Prestige</label>
                                                    </div>
                                                </div>
                                            </div> */}
          </form>
        </div>
      </div>

     
        </section>
        <div className="spacer-single"></div>
        {/* <div id="top"></div> */}
        <section
          id="section-hero"
          aria-label="section"
       
        >

            
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12 text-light">
                <div className="spacer-double"></div>
                <div className="spacer-double"></div>
                <h1 className="mb-2 text-center">
                  Looking to hire a <span className="id-color">cab</span>?
                  You're at the right place.
                </h1>
              </div>

              <div></div>
            </div>

            <div className="spacer-single"></div>
            <div className="container bg-white">
              <div className="row d-flex flex-row justify-content-center">
                <div className="col-lg-4">
                  <div>
                    <img
                      src={require("../images/cars/bentley.jpg")}
                      alt=""
                      height={200}
                    />
                  </div>
                </div>

                <div className="col-lg-8">
                  <div class="col-9 col-lg-5 order-0 order-lg-1">
                    <div class="row d-flex flex-row justify-content-around">
                      <div className="col-lg-6 col-12 order-0 order-lg-0 ">
                        <div class="row">
                          <div class="col-11">
                            <div class="vehicle-value-prop">
                              <h4>Prime Sedan</h4>

                              <div class="selected-pill">
                                <i class="fa fa-check"></i>Selected
                              </div>
                              <div class="vehicle-badge">Recommended</div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="vehicle-rating">
                              <span>4.9</span>
                              <span class="vehicle-rating-stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                              </span>
                            </div>
                          </div>
                          <div class="col-12">
                            <div>
                              <span class="learn-more-text">
                                Learn More &nbsp;
                                <i
                                  class="fa fa-info-circle"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div>
                          </div>
                          <div class="col-lg-4 col-10 order-2 order-lg-1 hide-mobile">
                            <div class="row">
                              <div class="col-12">
                                <div class="vehicle-value-prop darker">
                                  <i class="fa fa-user-o value-prop-img"></i>
                                  <span>Seats 4 people</span>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="vehicle-value-prop darker">
                                  <i class="fa fa-suitcase value-prop-img"></i>
                                  <span>Fits 4 medium suitcases</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12 show-mobile"></div>
                        </div>
                      </div>
                      <div class="col-lg-1 col-10 order-1 order-lg-1 hide-mobile">
                        <div class="row">
                          <div class="col-12">
                            <div class="vehicle-value-prop">
                              <img
                                class="lozad"
                                data-src="/static/frontend_v2/images/value_props_icons/professionalism.png"
                                alt=""
                                src="/static/frontend_v2/images/value_props_icons/professionalism.png"
                                data-loaded="true"
                              />
                              <span>Professionalism</span>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="vehicle-value-prop">
                              <img
                                class="lozad"
                                data-src="/static/frontend_v2/images/icons/meet_and_greet_color.png"
                                alt=""
                                src="/static/frontend_v2/images/icons/meet_and_greet_color.png"
                                data-loaded="true"
                              />
                              <span>Meet &amp; greet at the spot</span>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="vehicle-value-prop">
                              <img
                                class="lozad"
                                data-src="/static/frontend_v2/images/icons/wait_color.png"
                                alt=""
                                src="/static/frontend_v2/images/icons/wait_color.png"
                                data-loaded="true"
                              />
                              <span>Free Waiting Time</span>
                            </div>
                          </div>
                          <div class="col-lg-6 col-12 order-3 order-md-3 hide-mobile">
                            <div className="col-lg-4 col-md-6 col-12 d-flex flex-row justify-content-between">
                              <div>
                                <div
                                  title=""
                                  class="price one-way-info col-lg-5 col-md-3 col-12"
                                >
                                  <span class="price-addon one-way-info">
                                    One way price:
                                  </span>
                                  <p class="cijena_modifikator blue-price">
                                    EUR 34.90
                                  </p>
                                  <p className="cijena_prekrizeno blue-price">
                                    EUR 38.80
                                  </p>
                                </div>
                              </div>

                              <div class="col-lg-6 col-md-6 col-12 early-bird-price-notice m-4">
                                <p>Don’t miss out!</p>
                                <p>Few spots left at our special rates.</p>
                              </div>
                            </div>

                            <div class="booked-past-hour">
                              30 vehicles booked in the last 24 hours!
                            </div>
                            <div class="col-12 cta-container">
                              <a>
                                <button
                                  class="cta-button step-go_to"
                                  data-go_to="2"
                                  type="button"
                                >
                                  Select Economy Sedan &amp; Continue
                                  <i class="fa fa-chevron-right"></i>
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div class="row vehicle-list">
                <div class="vehicle-list-arrow vehicle-prev"></div>
                <div className="vehicle-list-container d-flex flex-row justify-content-around">
                  <div class="vehicle col-lg-4 col-12 order-0 bg-white p-5 m-1">
                    <div class="row vehicle-row">
                      <div class="col-12 col-lg-12 col-md-12">
                        <a>
                          <div class="vehicle-badge "> Travel in Style</div>
                          <div class="selected-pill">
                            <i class="fa fa-check"></i>Selected
                          </div>
                          <div class="col-12 vehicle-img">
                            <img
                              data-src="/static/modular/img/vehicles/eu/fv2/standard_smart.jpg"
                              class="lozad"
                              alt=""
                              src={require("../images/cars/lexus.jpg")}
                              height={100}
                              data-loaded="true"
                            />
                          </div>
                          <div class="col-sm-12 col-8">
                            <h4 class="vehicle-name">Hatchback</h4>
                          </div>
                          <div class="col-12">
                            <div class="row">
                              <div class="col-sm-12 col-8">
                                <div class="vehicle-rating">
                                  <span>4.9</span>
                                  <span class="vehicle-rating-stars">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                  </span>
                                  <span class="vehicle-rating-count">
                                    103 reviews
                                  </span>
                                </div>
                              </div>
                              <div class="col-12 learn-more-cont">
                                <div
                                  class="learn-more"
                                  data-target_vozilo="Luxury Standard"
                                  data-vozilo_maska="Premium Sedan"
                                  data-opis_vozila="Premium sedan is an experience on its own. A perfect choice for small groups who like to travel in style."
                                  data-modeli_vozila="Mercedes Benz E-class, BMW 5 Series or similar."
                                  data-slika_src="/static/modular/img/vehicles/eu/fv2/luxury.jpg"
                                >
                                  <span class="learn-more-text">
                                    Learn More &nbsp;
                                    <i
                                      class="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="vehicle-value-prop darker">
                                  <i class="fa fa-user-o value-prop-img"></i>
                                  <span>Seats 3 people</span>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="vehicle-value-prop darker">
                                  <i class="fa fa-suitcase value-prop-img"></i>
                                  <span>Fits 3 medium suitcases</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div title="" class="price one-way-info">
                              <span class="price-addon one-way-info">
                                One way price:
                              </span>
                              <span class="cijena_modifikator">EUR 36.90</span>
                            </div>
                          </div>
                          <div class="col-12 cta-container">
                            <button class="cta-button " type="button">
                              Choose this vehicle
                              <i class="fa fa-chevron-right"></i>
                            </button>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="vehicle col-lg-4 col-12 order-1 bg-white p-5 m-1">
                    <div class="row vehicle-row">
                      <div class="col-12 col-lg-12 col-md-12">
                        <a>
                          <div class="vehicle-badge "> Extra Comfort</div>
                          <div class="selected-pill">
                            <i class="fa fa-check"></i>Selected
                          </div>
                          <div class="col-12 vehicle-img">
                            <img
                              data-src="/static/modular/img/vehicles/eu/fv2/minibus.jpg"
                              class="lozad"
                              alt=""
                              src={require("../images/cars/mini-cooper.jpg")}
                              height={100}
                              data-loaded="true"
                            />
                          </div>
                          <div class="col-sm-12 col-8">
                            <h4 class="vehicle-name">Premium SUV</h4>
                          </div>
                          <div class="col-12">
                            <div class="row">
                              <div class="col-sm-12 col-8">
                                <div class="vehicle-rating">
                                  <span>4.9</span>
                                  <span class="vehicle-rating-stars">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                  </span>
                                  <span class="vehicle-rating-count">
                                    103 reviews
                                  </span>
                                </div>
                              </div>
                              <div class="col-12 learn-more-cont">
                                <div
                                  class="learn-more"
                                  data-target_vozilo="Minibus"
                                  data-vozilo_maska="Economy Van"
                                  data-opis_vozila="Economy van is an excellent choice for bigger groups who want the best value and comfort for their money."
                                  data-modeli_vozila="Opel Vivaro, Renault Trafic or similar."
                                  data-slika_src="/static/modular/img/vehicles/eu/fv2/minibus.jpg"
                                >
                                  <span class="learn-more-text">
                                    Learn More &nbsp;
                                    <i
                                      class="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="vehicle-value-prop darker">
                                  <i class="fa fa-user-o value-prop-img"></i>
                                  <span>Seats 8 people</span>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="vehicle-value-prop darker">
                                  <i class="fa fa-suitcase value-prop-img"></i>
                                  <span>Fits 8 medium suitcases</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div title="" class="price one-way-info">
                              <span class="price-addon one-way-info">
                                One way price:
                              </span>
                              <span class="cijena_modifikator">EUR 50.90</span>
                              {/* <span class="cijena_prekrizeno">EUR 56.60</span> */}
                            </div>
                            {/* <div title="" class="price two-way-info">
                              <span class="price-addon two-way-info">
                                Two way price:
                              </span>
                              <span class="cijena_modifikator">EUR 101.80</span>
                              <span class="cijena_prekrizeno">EUR 113.20</span>
                            </div> */}
                          </div>
                          <div class="col-12 cta-container">
                            <button class="cta-button " type="button">
                              Choose this vehicle
                              <i class="fa fa-chevron-right"></i>
                            </button>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="vehicle col-lg-4 col-12 order-1 bg-white p-5 m-1">
                    <div class="row vehicle-row">
                      <div class="col-12 col-lg-12 col-md-12">
                        <a>
                          <div class="vehicle-badge "> Style &amp; Comfort</div>
                          <div class="selected-pill">
                            <i class="fa fa-check"></i>Selected
                          </div>
                          <div class="col-12 vehicle-img">
                            <img
                              data-src="/static/modular/img/vehicles/eu/fv2/minibus_smart.jpg"
                              class="lozad"
                              alt=""
                              src={require("../images/cars/toyota-rav.jpg")}
                              height={100}
                              data-loaded="true"
                            />
                          </div>
                          <div class="col-sm-12 col-8">
                            <h4 class="vehicle-name">MUV Comfort</h4>
                          </div>
                          <div class="col-12">
                            <div class="row">
                              <div class="col-sm-12 col-8">
                                <div class="vehicle-rating">
                                  <span>4.9</span>
                                  <span class="vehicle-rating-stars">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                  </span>
                                  <span class="vehicle-rating-count">
                                    103 reviews
                                  </span>
                                </div>
                              </div>
                              <div class="col-12 learn-more-cont">
                                <div
                                  class="learn-more"
                                  data-target_vozilo="Luxury Minibus"
                                  data-vozilo_maska="Premium Van"
                                  data-opis_vozila="Premium van category perfectly combines comfort, style and value to create a one-of-a-kind experience."
                                  data-modeli_vozila="Mercedes Benz V-class, Honda Odyssey or similar."
                                  data-slika_src="/static/modular/img/vehicles/eu/fv2/minibus_smart.jpg"
                                >
                                  <span class="learn-more-text">
                                    Learn More &nbsp;
                                    <i
                                      class="fa fa-info-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="vehicle-value-prop darker">
                                  <i class="fa fa-user-o value-prop-img"></i>
                                  <span>Seats 8 people</span>
                                </div>
                              </div>
                              <div class="col-12">
                                <div class="vehicle-value-prop darker">
                                  <i class="fa fa-suitcase value-prop-img"></i>
                                  <span>Fits 8 medium suitcases</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div title="" class="price one-way-info">
                              <span class="price-addon one-way-info">
                                One way price:
                              </span>
                              <span class="cijena_modifikator">EUR 53.90</span>
                            </div>
                          </div>
                          <div class="col-12 cta-container">
                            <button class="cta-button " type="button">
                              Choose this vehicle
                              <i class="fa fa-chevron-right"></i>
                            </button>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="vehicle-list-arrow vehicle-next"></div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="section"
          className="pt40 pb40 text-light"
          data-bgcolor="#111111"
        >
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
              <div className="clearfix"></div>
              <div className="col-lg-3">
                <div
                  className="box-icon s2 p-small mb20 wow fadeInRight"
                  data-wow-delay=".5s"
                >
                  <i className="fa bg-color fa-trophy"></i>
                  <div className="d-inner">
                    <h4>First class services</h4>
                    Where luxury meets exceptional care, creating unforgettable
                    moments and exceeding your every expectation.
                  </div>
                </div>
                <div
                  className="box-icon s2 p-small mb20 wow fadeInL fadeInRight"
                  data-wow-delay=".75s"
                >
                  <i className="fa bg-color fa-road"></i>
                  <div className="d-inner">
                    <h4>24/7 road assistance</h4>
                    Reliable support when you need it most, keeping you on the
                    move with confidence and peace of mind.
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <img
                  src={require("../images/misc/car.png")}
                  alt=""
                  className="img-fluid wow fadeInUp"
                />
              </div>

              <div className="col-lg-3">
                <div
                  className="box-icon s2 d-invert p-small mb20 wow fadeInL fadeInLeft"
                  data-wow-delay="1s"
                >
                  <i className="fa bg-color fa-tag"></i>
                  <div className="d-inner">
                    <h4>Quality at Minimum Expense</h4>
                    Unlocking affordable brilliance with elevating quality while
                    minimizing costs for maximum value.
                  </div>
                </div>
                <div
                  className="box-icon s2 d-invert p-small mb20 wow fadeInL fadeInLeft"
                  data-wow-delay="1.25s"
                >
                  <i className="fa bg-color fa-map-pin"></i>
                  <div className="d-inner">
                    <h4>Free Pick-Up & Drop-Off</h4>
                    Enjoy free pickup and drop-off services, adding an extra
                    layer of ease to your car rental experience.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        



        <section id="section-news">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 offset-lg-3 text-center">
                <h2>Latest News</h2>
                <p>
                  Breaking news, fresh perspectives, and in-depth coverage -
                  stay ahead with our latest news, insights, and analysis.
                </p>
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
                      <img
                        alt=""
                        src={require("../images/news/pic-blog-1.jpg")}
                        className="lazy"
                      />
                    </div>
                    <div className="post-text">
                      <h4>
                        <a href="news-single.html">
                          Enjoy Best Travel Experience<span></span>
                        </a>
                      </h4>
                      <p>
                        Dolore officia sint incididunt non excepteur ea mollit
                        commodo ut enim reprehenderit cupidatat labore ad
                        laborum consectetur.
                      </p>
                      <a className="btn-main" href="#">
                        Read More
                      </a>
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
                      <img
                        alt=""
                        src={require("../images/news/pic-blog-2.jpg")}
                        className="lazy"
                      />
                    </div>
                    <div className="post-text">
                      <h4>
                        <a href="news-single.html">
                          The Future of Car Rent<span></span>
                        </a>
                      </h4>
                      <p>
                        Dolore officia sint incididunt non excepteur ea mollit
                        commodo ut enim reprehenderit cupidatat labore ad
                        laborum consectetur.
                      </p>
                      <a className="btn-main" href="#">
                        Read More
                      </a>
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
                      <img
                        alt=""
                        src={require("../images/news/pic-blog-3.jpg")}
                        className="lazy"
                      />
                    </div>
                    <div className="post-text">
                      <h4>
                        <a href="news-single.html">
                          Holiday Tips For Backpacker<span></span>
                        </a>
                      </h4>
                      <p>
                        Dolore officia sint incididunt non excepteur ea mollit
                        commodo ut enim reprehenderit cupidatat labore ad
                        laborum consectetur.
                      </p>
                      <a className="btn-main" href="#">
                        Read More
                      </a>
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
                    <div className="d-quote id-color">
                      <i className="fa fa-quote-right"></i>
                    </div>
                    <h4>Excellent Service! Car Rent Service!</h4>
                    <blockquote>
                      I have been using Rentaly for my Car Rental needs for over
                      5 years now. I have never had any problems with their
                      service. Their customer support is always responsive and
                      helpful. I would recommend Rentaly to anyone looking for a
                      reliable Car Rental provider.
                      <span className="by">Stepanie Hutchkiss</span>
                    </blockquote>
                  </div>
                  <img
                    src={require("../images/testimonial/1.jpg")}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="de-image-text">
                  <div className="d-text">
                    <div className="d-quote id-color">
                      <i className="fa fa-quote-right"></i>
                    </div>
                    <h4>Excellent Service! Car Rent Service!</h4>
                    <blockquote>
                      We have been using Rentaly for our trips needs for several
                      years now and have always been happy with their service.
                      Their customer support is Excellent Service! and they are
                      always available to help with any issues we have. Their
                      prices are also very competitive.
                      <span className="by">Jovan Reels</span>
                    </blockquote>
                  </div>
                  <img
                    src={require("../images/testimonial/2.jpg")}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="de-image-text">
                  <div className="d-text">
                    <div className="d-quote id-color">
                      <i className="fa fa-quote-right"></i>
                    </div>
                    <h4>Excellent Service! Car Rent Service!</h4>
                    <blockquote>
                      Endorsed by industry experts, Rentaly is the Car Rental
                      solution you can trust. With years of experience in the
                      field, we provide fast, reliable and secure Car Rental
                      services.
                      <span className="by">Kanesha Keyton</span>
                    </blockquote>
                  </div>
                  <img
                    src={require("../images/testimonial/3.jpg")}
                    className="img-fluid"
                    alt=""
                  />
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
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-1"
                    >
                      How do I get started with Car Rental?
                    </div>
                    <div className="accordion-section-content" id="accordion-1">
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-2"
                    >
                      Can I rent a car with a debit card??
                    </div>
                    <div className="accordion-section-content" id="accordion-2">
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-3"
                    >
                      What kind of Car Rental do I need?
                    </div>
                    <div className="accordion-section-content" id="accordion-3">
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 wow fadeInUp">
                <div className="accordion secondary">
                  <div className="accordion-section">
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-b-4"
                    >
                      What is a rental car security deposit?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-b-4"
                    >
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-b-5"
                    >
                      Can I cancel or modify my reservation?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-b-5"
                    >
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio.
                      </p>
                    </div>
                    <div
                      className="accordion-section-title"
                      data-tab="#accordion-b-6"
                    >
                      Is it possible to extend my rental period?
                    </div>
                    <div
                      className="accordion-section-content"
                      id="accordion-b-6"
                    >
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="section-call-to-action"
          className="bg-color-2 pt60 pb60 text-light"
        >
          <div className="container">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 offset-lg-2">
                  <span className="subtitle text-white">
                    Call us for further information
                  </span>
                  <h2 className="s2">
                    Rentaly customer care is here to help you anytime.
                  </h2>
                </div>

                <div className="col-lg-4 text-lg-center text-sm-center">
                  <div className="phone-num-big">
                    <i className="fa fa-phone"></i>
                    <span className="pnb-text">Call Us Now</span>
                    <span className="pnb-num">1 200 333 800</span>
                  </div>
                  <a href="#" className="btn-main">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;

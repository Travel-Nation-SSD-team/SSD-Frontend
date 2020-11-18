import React, { useEffect, useState } from "react";
import http from "../../common-http";
import UserProfile from "views/Pages/UserProfile";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Packages() {
  const history = useHistory();

  UserProfile.getRole();
  if (UserProfile.getRole() != "user") {
    history.push("/login");
  }
  const [bookings, setBookings] = useState([]);
  const [packages, setPackages] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [packageId, setPackageId] = useState(null);
  const [hotelId, setHotelId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
    getBooking();
    getHotelName();
  }, []);

  const INITIAL_STATE = {
    email: "",
    booking_confirmation: "",
    mobile: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const { email, booking_confirmation, mobile, username } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const loadData = async () => {
    const res = await http.get("packages");
    setPackages(res.data);
    setPackageId(res.data[0].package_id);
    console.log(res.data[0]);
  };

  const getHotelName = async () => {
    const hotel = await http.get("hotels/");
    setHotel(hotel.data);
    setHotelId(hotel.data[0].hotel_id);
    console.log(hotel.data[0]);
  };

  const handleFormSubmit = async (e, package_id, hotel_id) => {
    const booking = {
      package_id: packageId,
      email,
      hotel_id: hotelId,
      booking_confirmation: "Pending",
      mobile,
      username: UserProfile.getUsername(),
    };
    e.preventDefault();

    const res = await http.post("bookings", booking);
    console.log(res.data);
    setFormState(INITIAL_STATE);
    setAlertSuccess(true);
  };

  const getBooking = async () => {
    const res = await http.get("bookings");
    const bookings = res.data.filter(
      (book) => book.username === UserProfile.getUsername()
    );
    setBookings(bookings);
  };

  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);

  return (
    <>
      {UserProfile.getRole() == "user" ? (
        <UserNavbar />
      ) : UserProfile.getRole() == "admin" ? (
        <AdminNavbar />
      ) : (
        <IndexNavbar />
      )}
      <div className="main">
        <div className="section text-center">
          <h2 className="title">
            <b>BOOK YOUR PACKAGE</b>
          </h2>
          <Alert color="success" isOpen={alertSuccess}>
            <Container>
              <Button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertSuccess(false)}
              >
                <i className="nc-icon nc-simple-remove" />
              </Button>
              <span>Booking Successful</span>
            </Container>
          </Alert>
          <Form className="admin-form" color="dark">
            <label className="labeltext">Select the package</label>
            <Container>
              <select
                className="dropdown"
                onChange={(e) => {
                  setPackageId(e.target.value);
                }}
              >
                {packages.map((packag) => (
                  <option value={packag.package_id}>
                    {packag.package_name}
                  </option>
                ))}
              </select>
            </Container>
            <label className="labeltext">Select the hotel</label>
            <Container>
              <select
                className="dropdown"
                onChange={(e) => {
                  setHotelId(e.target.value);
                }}
              >
                {hotel.map((hotel) => (
                  <option value={hotel.hotel_id}>{hotel.hotel_name}</option>
                ))}
              </select>
              <div></div>
            </Container>
            <label className="labeltext">Your Email</label>
            <Input
              type="text"
              name="email"
              className="inputbooking"
              onChange={onInputChange}
              value={email}
            />
            <label className="labeltext">Your Mobile Number</label>
            <Input
              type="text"
              name="mobile"
              className="inputbooking"
              onChange={onInputChange}
              value={mobile}
            />
            <label className="labeltext"></label>
            <Button
              block
              className="btn-admin mb-2"
              color="primary"
              disabled={isEditing}
              onClick={handleFormSubmit}
            >
              Book Now
            </Button>
          </Form>
          <label></label>
          <h6 className="title">
            <b>Your Bookings</b>
          </h6>
          <label></label>
          <label></label>
          <label></label>
          {bookings.map((booking) => (
            <Container key={booking.booking_id}>
              <div className="list-group">
                <a className="list-group-item">
                  <b>Booking status - {booking.booking_confirmation}</b>
                </a>
              </div>
            </Container>
          ))}
        </div>
      </div>
      <DemoFooter />
    </>
  );
}

export default Packages;

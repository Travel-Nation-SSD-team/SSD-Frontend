import React, { useEffect, useState } from "react";
import http from "../../common-http";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [packageName, setPackageName] = useState("");
  const [alertDelete, setAlertDelete] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertUpdate, setAlertUpdate] = React.useState(false);
  const [alertUpdateSuccess, setAlertUpdateSuccess] = React.useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const INITIAL_STATE = {
    booking_id: "",
    package_id: "",
    booking_confirmation: "",
    email: "",
    hotel_id: "",
    mobile: "",
    username: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const {
    booking_id,
    package_id,
    booking_confirmation,
    email,
    hotel_id,
    mobile,
    username,
  } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleUpdateBooking = async () => {
    // update booking
    if (isEditing) {
      await http.put(`bookings/${booking_id}`, formState);
      setFormState(INITIAL_STATE);
      setHotelName("");
      setPackageName("");
      loadData();
      setIsEditing(false);
    }
  };

  async function handleDeleteBooking() {
    //  delete a booking
    if (isEditing) {
      await http.delete(`bookings/${booking_id}`);
      setFormState(INITIAL_STATE);
      setHotelName("");
      setPackageName("");
      loadData();
      setIsEditing(false);
    }
  }

  const setBookingForEdit = async (booking) => {
    setIsEditing(true);

    await getHotelNameAndPackageName(booking.hotel_id, booking.package_id);

    // populate data
    setFormState({
      ...formState,
      booking_id: booking.booking_id,
      package_id: booking.package_id,
      booking_confirmation: booking.booking_confirmation,
      email: booking.email,
      hotel_id: booking.hotel_id,
      mobile: booking.mobile,
      username: booking.username,
    });
  };

  const getHotelNameAndPackageName = async (hotelId, packageId) => {
    const hotel = await http.get(`hotels/${hotelId}`);
    setHotelName(hotel.data.hotel_name);
    const packageName = await http.get(`packages/${packageId}`);
    setPackageName(packageName.data.package_name);
  };

  const loadData = async () => {
    const res = await http.get("bookings");
    setBookings(res.data);
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
      <AdminNavbar />

      <div className="main">
        <div className="section text-center">
          <h2 className="title">
            <b>BOOKINGS</b>
          </h2>
          {bookings.map((booking) => (
            <Container
              key={booking.booking_id}
              onClick={() => setBookingForEdit(booking)}
            >
              <div className="list-group">
                <a className="list-group-item" type="submit">
                  <b>
                    {booking.booking_id}
                    {" - "}
                    {booking.username}
                    {" - "}
                    {booking.booking_confirmation}
                  </b>
                </a>
              </div>
              <div></div>
            </Container>
          ))}
        </div>
        <div className="main">
          <div className="section text-center">
            <Form className="admin-form" color="dark">
              <label className="labeltext">Booking Confirmation</label>
              <div></div>
              <select
                name="booking_confirmation"
                className="dropdown"
                onChange={onInputChange}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
              </select>
              <div></div>
              <label className="labeltext">Package</label>
              <Input type="text" value={packageName} />
              <label className="labeltext">Hotel</label>
              <Input type="text" value={hotelName} />
              <label className="labeltext">User Email</label>
              <Input
                type="text"
                name="email"
                onChange={onInputChange}
                value={email}
              />
              <label className="labeltext">User Mobile</label>
              <Input
                type="text"
                name="mobile"
                className="mb-2"
                onChange={onInputChange}
                value={mobile}
              />
              <label className="labeltext">Username</label>
              <Input
                type="text"
                name="username"
                className="mb-2"
                onChange={onInputChange}
                value={username}
              />
              <div></div>
              <Button
                block
                className="btn-admin mb-2"
                color="primary"
                disabled={!isEditing}
                onClick={() => setAlertUpdate(true)}
              >
                Update
              </Button>
              <Button
                block
                className="btn-admin"
                color="danger"
                disabled={!isEditing}
                onClick={() => setAlertDelete(true)}
              >
                Delete
              </Button>
              {isEditing && (
                <Button
                  block
                  className="btn-admin"
                  color="light"
                  onClick={() => {
                    setIsEditing(false);
                    setFormState(INITIAL_STATE);
                    setHotelName("");
                    setPackageName("");
                  }}
                >
                  Cancel
                </Button>
              )}
              <label className="labeltext"></label>
              <Alert color="danger" isOpen={alertUpdate}>
                <Container>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setAlertUpdate(false)}
                  >
                    No
                  </Button>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      handleUpdateBooking();
                      setAlertUpdate(false);
                      setAlertUpdateSuccess(true);
                    }}
                  >
                    Yes
                  </Button>
                  <span>Are you sure you want to Update?</span>
                </Container>
              </Alert>
              <Alert color="success" isOpen={alertUpdateSuccess}>
                <Container>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setAlertUpdateSuccess(false)}
                  >
                    <i className="nc-icon nc-simple-remove" />
                  </Button>
                  <span>Booking Updated Successfully</span>
                </Container>
              </Alert>
              <Alert color="danger" isOpen={alertDelete}>
                <Container>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setAlertDelete(false)}
                  >
                    No
                  </Button>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      handleDeleteBooking();
                      setAlertDelete(false);
                      setAlertSuccess(true);
                    }}
                  >
                    Yes
                  </Button>
                  <span>Are you sure you want to delete?</span>
                </Container>
              </Alert>
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
                  <span>Booking Deleted Successfully</span>
                </Container>
              </Alert>
            </Form>
          </div>
        </div>
      </div>

      <DemoFooter />
    </>
  );
}

export default Bookings;

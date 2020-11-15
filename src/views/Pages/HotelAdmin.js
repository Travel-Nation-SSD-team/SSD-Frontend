import React, { useEffect, useState } from "react";
import http from "../../common-http";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [alertInsert, setAlertInsert] = React.useState(false);
  const [alertInsertSuccess, setAlertInsertSuccess] = React.useState(false);
  const [alertDelete, setAlertDelete] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertUpdate, setAlertUpdate] = React.useState(false);
  const [alertUpdateSuccess, setAlertUpdateSuccess] = React.useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const INITIAL_STATE = {
    hotel_id: "",
    hotel_name: "",
    hotel_image: "",
    hotel_address: "",
    rooms_available: "",
    hotel_location: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const {
    hotel_id,
    hotel_name,
    hotel_image,
    hotel_address,
    rooms_available,
    hotel_location,
  } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleInsertHotel = async () => {
    const hotel = formState;
    delete formState.hotel_id;

    await http.post("hotels", hotel);
    setFormState(INITIAL_STATE);
    loadData();
  };

  const handleUpdateHotel = async () => {
    // update hotel
    if (isEditing) {
      await http.put(`hotels/${hotel_id}`, formState);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  };

  async function handleDeleteHotel() {
    //  delete a hotel
    if (isEditing) {
      await http.delete(`hotels/${hotel_id}`);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  }

  const setHotelForEdit = (hotel) => {
    setIsEditing(true);
    // populate data
    setFormState({
      ...formState,
      hotel_id: hotel.hotel_id,
      hotel_name: hotel.hotel_name,
      hotel_image: hotel.hotel_image,
      hotel_location: hotel.hotel_location,
      hotel_address: hotel.hotel_address,
      rooms_available: hotel.rooms_available,
    });
  };

  const loadData = async () => {
    const res = await http.get("hotels");
    setHotels(res.data);
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
            <b>HOTELS</b>
          </h2>
          {hotels.map((hotel) => (
            <Container
              key={hotel.hotel_id}
              onClick={() => setHotelForEdit(hotel)}
            >
              <div className="list-group">
                <a className="list-group-item" type="submit">
                  <b>{hotel.hotel_name}</b>
                </a>
              </div>
              <div></div>
            </Container>
          ))}
        </div>
        <div className="main">
          <div className="section text-center">
            <Form className="admin-form" color="dark">
              {/* <label className="labeltext">Hotel Id</label>
              <Input type="text" /> */}
              <label className="labeltext">Hotel Name</label>
              <Input
                type="text"
                name="hotel_name"
                onChange={onInputChange}
                value={hotel_name}
              />
              <label className="labeltext">Image Source</label>
              <Input
                type="textarea"
                name="hotel_image"
                onChange={onInputChange}
                value={hotel_image}
              />
              <label className="labeltext">Hotel Location</label>
              <Input
                required
                type="text"
                name="hotel_location"
                onChange={onInputChange}
                value={hotel_location}
              />
              <label className="labeltext">Hotel Address</label>
              <Input
                type="text"
                name="hotel_address"
                onChange={onInputChange}
                value={hotel_address}
              />
              <label className="labeltext">Rooms Available</label>
              <Input
                type="number"
                name="rooms_available"
                className="mb-2"
                onChange={onInputChange}
                value={rooms_available}
              />
              <div></div>
              <Button
                block
                className="btn-admin mb-2"
                color="success"
                disabled={isEditing}
                onClick={() => setAlertInsert(true)}
              >
                Insert
              </Button>
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
                  }}
                >
                  Cancel
                </Button>
              )}
              <label className="labeltext"></label>
              <Alert color="danger" isOpen={alertInsert}>
                <Container>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setAlertInsert(false)}
                  >
                    No
                  </Button>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => {
                      handleInsertHotel();
                      setAlertInsert(false);
                      setAlertInsertSuccess(true);
                    }}
                  >
                    Yes
                  </Button>
                  <span>Are you sure you want add this record?</span>
                </Container>
              </Alert>
              <Alert color="success" isOpen={alertInsertSuccess}>
                <Container>
                  <Button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setAlertInsertSuccess(false)}
                  >
                    <i className="nc-icon nc-simple-remove" />
                  </Button>
                  <span>Hotel Inserted Successfully</span>
                </Container>
              </Alert>
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
                      handleUpdateHotel();
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
                  <span>Hotel Updated Successfully</span>
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
                      handleDeleteHotel();
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
                  <span>Hotel Deleted Successfully</span>
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

export default Hotels;

import React, { useEffect, useState } from "react";
import http from "../../common-http";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Locations() {
  const [locations, setLocations] = useState([]);
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
    location_id: "",
    location_name: "",
    location_image: "",
    location_district: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const {
    location_id,
    location_name,
    location_image,
    location_district,
  } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleInsertLocation = async () => {
    const location = formState;
    delete formState.location_id;

    await http.post("locations", location);
    setFormState(INITIAL_STATE);
    loadData();
  };

  const handleUpdateLocation = async () => {
    // update location
    if (isEditing) {
      await http.put(`locations/${location_id}`, formState);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  };

  async function handleDeleteLocation() {
    //  delete a location
    if (isEditing) {
      await http.delete(`locations/${location_id}`);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  }

  const setLocationForEdit = (location) => {
    setIsEditing(true);
    // populate data
    setFormState({
      ...formState,
      location_id: location.location_id,
      location_name: location.location_name,
      location_image: location.location_image,
      location_district: location.location_district,
    });
  };

  const loadData = async () => {
    const res = await http.get("locations");
    setLocations(res.data);
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
            <b>LOCATIONS</b>
          </h2>
          {locations.map((location) => (
            <Container
              key={location.location_id}
              onClick={() => setLocationForEdit(location)}
            >
              <div className="list-group">
                <a className="list-group-item" type="submit">
                  <b>{location.location_name}</b>
                </a>
              </div>
              <div></div>
            </Container>
          ))}
        </div>
        <div className="main">
          <div className="section text-center">
            <Form className="admin-form" color="dark">
              <label className="labeltext">Location Name</label>
              <Input
                type="text"
                name="location_name"
                onChange={onInputChange}
                value={location_name}
              />
              <label className="labeltext">Image Source</label>
              <Input
                type="textarea"
                name="location_image"
                onChange={onInputChange}
                value={location_image}
              />
              <label className="labeltext">Location District</label>
              <Input
                required
                type="text"
                name="location_district"
                onChange={onInputChange}
                value={location_district}
              />
              <label className="labeltext"></label>
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
                      handleInsertLocation();
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
                  <span>Location Inserted Successfully</span>
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
                      handleUpdateLocation();
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
                  <span>Location Updated Successfully</span>
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
                      handleDeleteLocation();
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
                  <span>Location Deleted Successfully</span>
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

export default Locations;

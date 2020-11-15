import React, { useEffect, useState } from "react";
import http from "../../common-http";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Packages() {
  const [packages, setPackages] = useState([]);
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
    package_id: "",
    package_name: "",
    package_image: "",
    package_description: "",
    package_activities: "",
    package_locations: "",
    package_Days: "",
    package_participants: "",
    package_price: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const {
    package_id,
    package_name,
    package_image,
    package_description,
    package_activities,
    package_locations,
    package_Days,
    package_participants,
    package_price,
  } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleInsertPackage = async () => {
    const packag = formState;
    delete formState.package_id;

    await http.post("packages", packag);
    setFormState(INITIAL_STATE);
    loadData();
  };

  const handleUpdatePackage = async () => {
    // update package
    if (isEditing) {
      await http.put(`packages/${package_id}`, formState);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  };

  async function handleDeletePackage() {
    //  delete a package
    if (isEditing) {
      await http.delete(`packages/${package_id}`);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  }

  const setPackageForEdit = (packag) => {
    setIsEditing(true);
    // populate data
    setFormState({
      ...formState,
      package_id: packag.package_id,
      package_name: packag.package_name,
      package_image: packag.package_image,
      package_description: packag.package_description,
      package_activities: packag.package_activities,
      package_locations: packag.package_locations,
      package_Days: packag.package_Days,
      package_participants: packag.package_participants,
      package_price: packag.package_price,
    });
  };

  const loadData = async () => {
    const res = await http.get("packages");
    setPackages(res.data);
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
            <b>PACKAGES</b>
          </h2>

          {packages.map((packag) => (
            <Container
              key={packag.package_id}
              onClick={() => setPackageForEdit(packag)}
            >
              <div className="list-group">
                <a className="list-group-item" type="submit">
                  <b>{packag.package_name}</b>
                </a>
              </div>
              <div></div>
            </Container>
          ))}
        </div>
        <div className="main">
          <div className="section text-center">
            <Form className="admin-form" color="dark">
              <label className="labeltext">Package Name</label>
              <Input
                type="text"
                name="package_name"
                onChange={onInputChange}
                value={package_name}
              />
              <label className="labeltext">Image Source</label>
              <Input
                type="textarea"
                name="package_image"
                onChange={onInputChange}
                value={package_image}
              />
              <label className="labeltext">Package Description</label>
              <Input
                required
                type="textarea"
                name="package_description"
                onChange={onInputChange}
                value={package_description}
              />
              <label className="labeltext">Package Activities</label>
              <Input
                type="text"
                name="package_activities"
                onChange={onInputChange}
                value={package_activities}
              />
              <label className="labeltext">Package Locations</label>
              <Input
                type="text"
                name="package_locations"
                className="mb-2"
                onChange={onInputChange}
                value={package_locations}
              />
              <label className="labeltext">Package Days</label>
              <Input
                type="number"
                name="package_Days"
                className="mb-2"
                onChange={onInputChange}
                value={package_Days}
              />
              <label className="labeltext">Package Participants</label>
              <Input
                type="number"
                name="package_participants"
                className="mb-2"
                onChange={onInputChange}
                value={package_participants}
              />
              <label className="labeltext">Package Price</label>
              <Input
                type="number"
                name="package_price"
                className="mb-2"
                onChange={onInputChange}
                value={package_price}
              />
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
                      handleInsertPackage();
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
                  <span>Package Inserted Successfully</span>
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
                      handleUpdatePackage();
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
                  <span>Package Updated Successfully</span>
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
                      handleDeletePackage();
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
                  <span>Package Deleted Successfully</span>
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

export default Packages;

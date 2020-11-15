import React, { useEffect, useState } from "react";
import http from "../../common-http";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [alertDelete, setAlertDelete] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertUpdate, setAlertUpdate] = React.useState(false);
  const [alertUpdateSuccess, setAlertUpdateSuccess] = React.useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const INITIAL_STATE = {
    inquiry_id: "",
    inquiry_body: "",
    user_email: "",
    user_mobile: "",
    inquiry_answer: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const {
    inquiry_id,
    inquiry_body,
    user_email,
    user_mobile,
    inquiry_answer,
  } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleUpdateInquiry = async () => {
    // update booking
    if (isEditing) {
      await http.put(`inquiries/${inquiry_id}`, formState);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  };

  async function handleDeleteInquiry() {
    //  delete a booking
    if (isEditing) {
      await http.delete(`inquiries/${inquiry_id}`);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  }

  const setBookingForEdit = async (inquiry) => {
    setIsEditing(true);

    // populate data
    setFormState({
      ...formState,
      inquiry_id: inquiry.inquiry_id,
      inquiry_body: inquiry.inquiry_body,
      user_email: inquiry.user_email,
      user_mobile: inquiry.user_mobile,
      inquiry_answer: inquiry.inquiry_answer,
    });
  };

  const loadData = async () => {
    const res = await http.get("inquiries");
    setInquiries(res.data);
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
            <b>INQUIRIES</b>
          </h2>
          {inquiries.map((inquiry) => (
            <Container
              key={inquiry.inquiry_id}
              onClick={() => setBookingForEdit(inquiry)}
            >
              <div className="list-group">
                <a className="list-group-item" type="submit">
                  <b>
                    {inquiry.user_email}
                    {" - "}
                    {inquiry.inquiry_body}
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
              <label className="labeltext">User Email</label>
              <Input
                type="text"
                name="user_email"
                onChange={onInputChange}
                value={user_email}
              />
              <label className="labeltext">User Mobile</label>
              <Input
                type="text"
                name="user_mobile"
                className="mb-2"
                onChange={onInputChange}
                value={user_mobile}
              />
              <label className="labeltext">Inquiry</label>
              <Input
                type="textarea"
                name="inquiry_body"
                className="mb-2"
                onChange={onInputChange}
                value={inquiry_body}
              />
              <label className="labeltext">Answer</label>
              <Input
                type="textarea"
                name="inquiry_answer"
                className="mb-2"
                onChange={onInputChange}
                value={inquiry_answer}
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
                      handleUpdateInquiry();
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
                  <span>Inquiry Updated Successfully</span>
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
                      handleDeleteInquiry();
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
                  <span>Inquiry Deleted Successfully</span>
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

export default Inquiries;

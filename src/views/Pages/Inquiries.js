import React, { useEffect, useState } from "react";
import http from "../../common-http";
import UserProfile from "views/Pages/UserProfile";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Inquiries() {
  UserProfile.getRole();
  const [inquiries, setInquiries] = useState([]);
  const [alertSuccess, setAlertSuccess] = React.useState(false);

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

  const handleInsertInquiry = async () => {
    const inquiry = formState;
    delete formState.inquiry_id;

    await http.post("inquiries", inquiry);
    loadData();
    setAlertSuccess(true);
    setFormState(INITIAL_STATE);
  };

  const setFeedbackForEdit = (inquiry) => {
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
            <b>INQUIRIES</b>
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
              <span>Inquiry Submitted Successfully</span>
            </Container>
          </Alert>
          <div className="main">
            <div className="section text-center">
              <Form className="admin-form" color="dark">
                <label className="labeltext">Email</label>
                <Input
                  type="text"
                  name="user_email"
                  onChange={onInputChange}
                  value={user_email}
                />
                <label className="labeltext">Mobile</label>
                <Input
                  type="text"
                  name="user_mobile"
                  onChange={onInputChange}
                  value={user_mobile}
                />
                <label className="labeltext">
                  Provide your inquiry or question
                </label>
                <Input
                  type="textarea"
                  name="inquiry_body"
                  onChange={onInputChange}
                  value={inquiry_body}
                />
                <label className="labeltext"></label>
                <Button
                  block
                  className="btn-admin"
                  color="primary"
                  onClick={handleInsertInquiry}
                >
                  Ask Inquiry/Question
                </Button>

                <Button
                  block
                  className="btn-admin"
                  color="light"
                  onClick={() => {
                    setFormState(INITIAL_STATE);
                  }}
                >
                  Cancel
                </Button>
              </Form>
            </div>
          </div>
          <label></label>
          <label></label>
          <label></label>
          <h6 className="title">
            <b>Frequently asked questions/Inquiries</b>
          </h6>
          {inquiries.map((inquiry) => (
            <Container
              key={inquiry.inquiry_id}
              onClick={() => setFeedbackForEdit(inquiry)}
            >
              <div className="list-group">
                <a className="list-group-inquiry" type="submit">
                  <b>
                    <label className="labelinquiry">
                      Inquiry : {inquiry.inquiry_body}
                    </label>
                    <label className="labelanswer">
                      {inquiry.inquiry_answer}
                    </label>
                  </b>
                </a>
                <label className="labeltext"></label>
              </div>
              <div></div>
            </Container>
          ))}
        </div>
      </div>

      <DemoFooter />
    </>
  );
}

export default Inquiries;

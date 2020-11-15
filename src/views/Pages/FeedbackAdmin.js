import React, { useEffect, useState } from "react";
import http from "../../common-http";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [alertDelete, setAlertDelete] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const INITIAL_STATE = {
    feedback_id: "",
    feedback_comment: "",
    feedback_level: "",
    package_name: "",
    username: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const {
    feedback_id,
    feedback_comment,
    feedback_level,
    package_name,
    username,
  } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const setFeedbackForEdit = (feedback) => {
    setIsEditing(true);
    // populate data
    setFormState({
      ...formState,
      feedback_id: feedback.feedback_id,
      feedback_comment: feedback.feedback_comment,
      feedback_level: feedback.feedback_level,
      package_name: feedback.package_name,
      username: feedback.username,
    });
  };

  const loadData = async () => {
    const res = await http.get("feedbacks");
    setFeedbacks(res.data);
  };

  async function handleDeleteFeedback() {
    //  delete a feedback
    if (isEditing) {
      await http.delete(`feedbacks/${feedback_id}`);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  }

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
            <b>FEEDBACKS</b>
          </h2>
          {feedbacks.map((feedback) => (
            <Container
              key={feedback.feedback_id}
              onClick={() => setFeedbackForEdit(feedback)}
            >
              <div className="list-group">
                <a className="list-group-item" type="submit">
                  <b>
                    {feedback.package_name}
                    {" - "}
                    {feedback.username}
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
              <label className="labeltext">Username</label>
              <Input
                type="text"
                name="username"
                onChange={onInputChange}
                value={username}
              />
              <label className="labeltext">Feedback Comment</label>
              <Input
                type="text"
                name="feedback_comment"
                onChange={onInputChange}
                value={feedback_comment}
              />
              <label className="labeltext">Rating</label>
              <Input
                type="number"
                name="feedback_level"
                onChange={onInputChange}
                value={feedback_level}
              />
              <label className="labeltext">Package</label>
              <Input
                required
                type="text"
                name="package_name"
                onChange={onInputChange}
                value={package_name}
              />
              <label className="labeltext"></label>
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
                      handleDeleteFeedback();
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
                  <span>Feedback Deleted Successfully</span>
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

export default Feedbacks;

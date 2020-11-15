import React, { useEffect, useState } from "react";
import http from "../../common-http";
import { useHistory } from "react-router-dom";
import UserProfile from "views/Pages/UserProfile";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Feedbacks() {
  const history = useHistory();

  UserProfile.getRole();
  if (UserProfile.getRole() != "user") {
    history.push("/login");
  }
  const [feedbacks, setFeedbacks] = useState([]);
  const [packages, setPackages] = useState([]);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [rating, setRating] = useState(1);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const INITIAL_STATE = {
    feedback_id: "",
    feedback_comment: "",
    package_name: "",
    username: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const { feedback_id, feedback_comment, package_name, username } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleInsertFeedback = async () => {
    const feedback = {
      feedback_id: feedback_id,
      feedback_comment: feedback_comment,
      package_name: package_name,
      username: UserProfile.getUsername(),
    };
    feedback.feedback_level = rating;
    delete formState.feedback_id;

    await http.post("feedbacks", feedback);
    loadData();
    setAlertSuccess(true);
    setFormState(INITIAL_STATE);
  };

  const setFeedbackForEdit = (feedback) => {
    // populate data
    setFormState({
      ...formState,
      feedback_id: feedback.feedback_id,
      feedback_comment: feedback.feedback_comment,
      package_name: feedback.package_name,
      username: feedback.username,
    });
  };

  const loadData = async () => {
    const res = await http.get("feedbacks");
    setFeedbacks(res.data);
  };
  const getPackageName = async () => {
    const res = await http.get("packages");
    setPackages(res.data);
  };
  getPackageName();

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
            <b>FEEDBACKS</b>
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
              <span>Feedback Submitted Successfully</span>
            </Container>
          </Alert>
          <div className="main">
            <div className="section text-center">
              <Form className="admin-form" color="dark">
                <label className="labeltext">Feedback Comment</label>
                <Input
                  type="textarea"
                  name="feedback_comment"
                  onChange={onInputChange}
                  value={feedback_comment}
                />
                <label className="labeltext">Rating</label>
                <div class="ratings">
                  <Button
                    color="primary"
                    onClick={() => {
                      setRating(1);
                    }}
                  >
                    1
                  </Button>
                  <label className="labeltext"></label>
                  <Button
                    color="primary"
                    onClick={() => {
                      setRating(2);
                    }}
                  >
                    2
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      setRating(3);
                    }}
                  >
                    3
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      setRating(4);
                    }}
                  >
                    4
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      setRating(5);
                    }}
                  >
                    5
                  </Button>
                </div>
                <label className="labeltext">Select the package</label>
                <Container>
                  <select
                    name="package_name"
                    className="dropdown"
                    onChange={onInputChange}
                  >
                    {packages.map((packag) => (
                      <option value={packag.package_name} name="package_name">
                        {packag.package_name}
                      </option>
                    ))}
                  </select>
                </Container>
                <label className="labeltext"></label>
                <Button
                  block
                  className="btn-admin"
                  color="primary"
                  onClick={handleInsertFeedback}
                >
                  Give Feedback
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
          {feedbacks.map((feedback) => (
            <Container
              key={feedback.feedback_id}
              onClick={() => setFeedbackForEdit(feedback)}
            >
              <div className="list-group">
                <a className="list-group-feedback" type="submit">
                  <b>
                    <label className="labelfeedbackname">
                      Pacakage Name : {feedback.package_name}
                    </label>
                    <label className="labelfeedbackuser">
                      {feedback.username}
                    </label>
                    <label className="labelfeedbackrating">
                      : {feedback.feedback_level} Star Rating
                    </label>
                  </b>
                  <div></div>
                  <label className="labelfeedbackcomment">
                    {feedback.feedback_comment}
                  </label>
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

export default Feedbacks;

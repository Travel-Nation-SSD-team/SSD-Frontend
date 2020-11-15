import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import http from "../../common-http";

// reactstrap components
import {
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/ExamplesNavbar.js";

function Register() {
  const [error, setError] = useState(null);
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const INITIAL_STATE = {
    name: "",
    age: "",
    nationality: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const {
    name,
    age,
    nationality,
    email,
    mobile,
    username,
    password,
    confirmPassword,
    role,
  } = formState;
  const isInvalid = password !== confirmPassword;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const history = useHistory();
  const handleFormSubmit = async (e) => {
    const user = {
      name,
      age,
      nationality,
      email,
      mobile,
      username,
      password,
      role: "user",
    };

    e.preventDefault();
    try {
      const res = await http.post("auth/signup", user);
      history.push("/login");
    } catch (e) {
      setError("Username or Password Already Exist");
      console.log(e);
    }
  };

  return (
    <>
      <IndexNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/Hike.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <pre>{process.env.REACT_APP_TEST}</pre>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register" color="dark">
                <h3 className="title mx-auto">Become a Traveller</h3>
                <Form className="register-form" onSubmit={handleFormSubmit}>
                  <label>Name</label>
                  <Input
                    name="name"
                    placeholder="Name"
                    type="text"
                    required
                    onChange={onInputChange}
                  />
                  <label>Age</label>
                  <Input
                    name="age"
                    placeholder="Age"
                    required
                    type="Number"
                    onChange={onInputChange}
                  />
                  <label>Nationality</label>
                  <Input
                    name="nationality"
                    placeholder="Nationality"
                    required
                    type="text"
                    onChange={onInputChange}
                  />
                  <label>Email</label>
                  <Input
                    name="email"
                    placeholder="Email"
                    required
                    type="text"
                    onChange={onInputChange}
                  />
                  <label>Mobile Number</label>
                  <Input
                    name="mobile"
                    placeholder="Mobile"
                    required
                    type="text"
                    onChange={onInputChange}
                  />
                  <label>Username</label>
                  <Input
                    name="username"
                    placeholder="Username"
                    required
                    type="text"
                    onChange={onInputChange}
                  />
                  <label>Password</label>
                  <Input
                    name="password"
                    placeholder="Password"
                    required
                    type="password"
                    onChange={onInputChange}
                  />
                  <label>Confirm password</label>
                  <Input
                    name="confirmPassword"
                    placeholder="Confirm password"
                    required
                    type="password"
                    onChange={onInputChange}
                  />
                  <Button
                    disabled={isInvalid}
                    block
                    className="btn-round"
                    color="dark"
                    type="submit"
                  >
                    Register
                  </Button>
                  {error != null ? <div> {error}</div> : null}
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Register;

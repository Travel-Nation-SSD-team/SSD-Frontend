import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import http from "../../common-http";
import UserProfile from "views/Pages/UserProfile";

// reactstrap components
import {
  Button,
  Label,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { isForOfStatement } from "typescript";

function Login() {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });

  const INITIAL_STATE = {
    username: "",
    password: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const { username, password } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const history = useHistory();

  const handleFormSubmit = async (e) => {
    const user = {
      username,
      password,
    };

    e.preventDefault();

    try {
      const res = await http.post("auth/signin", user);
      setFormState(INITIAL_STATE);
      setUsers(res.data);

      if (res.data.roles == "ROLE_ADMIN") {
        UserProfile.setRole("admin");
        history.push("/admin");
      } else if (res.data.roles == "ROLE_USER") {
        UserProfile.setRole("user");
        UserProfile.setUsername(res.data.username);
        history.push("/bookings");
      }
    } catch (e) {
      setError("Invalid username or password");
      console.log(e);
    }
  };

  return (
    <>
      <IndexNavbar />
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/snowhike.jpg") + ")",
        }}
      >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4" color="dark">
              <Card className="card-login ml-auto mr-auto" color="dark">
                <h3 className="title mx-auto">Welcome Traveller</h3>
                <Form
                  className="register-form"
                  color="dark"
                  onSubmit={handleFormSubmit}
                >
                  <label>Username</label>
                  <Input
                    placeholder="Username"
                    type="text"
                    name="username"
                    required
                    onChange={onInputChange}
                  />
                  <label>Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    required
                    onChange={onInputChange}
                  />
                  <Button
                    block
                    className="btn-round"
                    color="dark"
                    type="submit"
                  >
                    Login
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

export default Login;

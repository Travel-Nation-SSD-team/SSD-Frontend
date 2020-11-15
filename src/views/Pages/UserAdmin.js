import React, { useEffect, useState } from "react";
import http from "../../common-http";

// reactstrap components
import { Button, Container, Form, Input, Alert } from "reactstrap";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Users() {
  const [users, setUsers] = useState([]);
  const [alertInsert, setAlertInsert] = React.useState(false);
  const [alertInsertSuccess, setAlertInsertSuccess] = React.useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const INITIAL_STATE = {
    user_id: "",
    username: "",
    name: "",
    email: "",
    age: "",
    mobile: "",
    nationality: "",
    password: "",
    role: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const {
    user_id,
    username,
    name,
    email,
    age,
    mobile,
    nationality,
    password,
    role,
  } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleInsertUser = async () => {
    const user = {
      username,
      name,
      email,
      age,
      mobile,
      nationality,
      password,
      role: "admin",
    };
    delete formState.user_id;

    await http.post("auth/signup", user);
    setFormState(INITIAL_STATE);
    loadData();
  };

  const handleUpdateUser = async () => {
    // update user
    if (isEditing) {
      await http.put(`users/${user_id}`, formState);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  };

  async function handleDeleteUser() {
    //  delete a user
    if (isEditing) {
      await http.delete(`users/${user_id}`);
      setFormState(INITIAL_STATE);
      loadData();
      setIsEditing(false);
    }
  }

  const setUserForEdit = (user) => {
    setIsEditing(true);
    // populate data
    setFormState({
      ...formState,
      user_id: user.user_id,
      username: user.username,
      name: user.name,
      email: user.email,
      age: user.age,
      mobile: user.mobile,
      nationality: user.nationality,
      password: user.password,
    });
  };

  const loadData = async () => {
    const res = await http.get("users");
    setUsers(res.data);
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
            <b>Users</b>
          </h2>
          {users.map((user) => (
            <Container key={user.user_id} onClick={() => setUserForEdit(user)}>
              <div className="list-group">
                <a className="list-group-item" type="submit">
                  <b>{user.username}</b>
                </a>
              </div>
              <div></div>
            </Container>
          ))}
        </div>
        <div className="main">
          <div className="section text-center">
            <Form className="admin-form" color="dark">
              <label className="labeltext">Name</label>
              <Input
                type="text"
                name="name"
                onChange={onInputChange}
                value={name}
              />
              <label className="labeltext">Email</label>
              <Input
                type="text"
                name="email"
                onChange={onInputChange}
                value={email}
              />
              <label className="labeltext">Mobile</label>
              <Input
                required
                type="text"
                name="mobile"
                onChange={onInputChange}
                value={mobile}
              />
              <label className="labeltext">Age</label>
              <Input
                type="text"
                name="age"
                onChange={onInputChange}
                value={age}
              />
              <label className="labeltext">Nationality</label>
              <Input
                type="text"
                name="nationality"
                className="mb-2"
                onChange={onInputChange}
                value={nationality}
              />
              <label className="labeltext">Username</label>
              <Input
                type="text"
                name="username"
                className="mb-2"
                onChange={onInputChange}
                value={username}
              />
              <label className="labeltext">Password</label>
              <Input
                type="text"
                name="password"
                className="mb-2"
                onChange={onInputChange}
                value={password}
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
                onClick={handleUpdateUser}
              >
                Update
              </Button>
              <Button
                block
                className="btn-admin"
                color="danger"
                disabled={!isEditing}
                onClick={handleDeleteUser}
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
                      handleInsertUser();
                      setAlertInsert(false);
                      setAlertInsertSuccess(true);
                    }}
                  >
                    Yes
                  </Button>
                  <span>Are you sure you want add this user as admin?</span>
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
                  <span>admin user Inserted Successfully</span>
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

export default Users;

import React, { useEffect, useState } from "react";
import UserProfile from "views/Pages/UserProfile";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Container, Form, Input } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Admin() {
  const history = useHistory();

  UserProfile.getRole();
  if (UserProfile.getRole() != "admin") {
    history.push("/login");
  }

  async function hoteladmin() {
    history.push("/hoteladmin");
  }
  async function locationadmin() {
    history.push("/locationadmin");
  }
  async function packageadmin() {
    history.push("/packageadmin");
  }
  async function bookingadmin() {
    history.push("/bookingadmin");
  }
  async function feedbackadmin() {
    history.push("/feedbackadmin");
  }
  async function inquiryadmin() {
    history.push("/inquiryadmin");
  }
  async function useradmin() {
    history.push("/useradmin");
  }

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });

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
            <b>ADMIN PANEL</b>
          </h2>
          <Container>
            <div class="list-group">
              <a
                class="list-group-item"
                tag={Link}
                type="button"
                onClick={() => hoteladmin()}
              >
                <b>Hotels</b>
              </a>
              <a
                class="list-group-item"
                tag={Link}
                type="button"
                onClick={() => locationadmin()}
              >
                <b>Locations</b>
              </a>
              <a
                class="list-group-item"
                tag={Link}
                type="button"
                onClick={() => packageadmin()}
              >
                <b>Packages</b>
              </a>
              <a
                class="list-group-item"
                tag={Link}
                type="button"
                onClick={() => bookingadmin()}
              >
                <b>Bookings</b>
              </a>
              <a
                class="list-group-item"
                tag={Link}
                type="button"
                onClick={() => feedbackadmin()}
              >
                <b>Feedbacks</b>
              </a>
              <a
                class="list-group-item"
                tag={Link}
                type="button"
                onClick={() => inquiryadmin()}
              >
                <b>Inquiry</b>
              </a>
              <a
                class="list-group-item"
                tag={Link}
                type="button"
                onClick={() => useradmin()}
              >
                <b>Admin users</b>
              </a>
            </div>
            <div></div>
          </Container>
        </div>
      </div>

      <DemoFooter />
    </>
  );
}

export default Admin;

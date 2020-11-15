import React from "react";
import UserProfile from "views/Pages/UserProfile";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AboutusHeader from "components/Headers/AboutusHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Aboutus() {
  UserProfile.getRole();
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
      <AboutusHeader />
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Know about us</h2>
                <h5 className="description">
                  Don't hesitate to contact us anytime. we are always available
                  for you.
                </h5>
                <br />
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="3">
                <div className="info"></div>
                <div className="description">
                  <h4 className="title">Contact us</h4>
                  <p className="description">Mobile -: 0766470982</p>
                </div>
              </Col>
              <Col md="3">
                <div className="info"></div>
                <div className="description">
                  <h4 className="title">Email us</h4>
                  <p>Travelnation@gmail.com</p>
                </div>
              </Col>
              <Col md="3">
                <div className="info"></div>
                <div className="description">
                  <h4 className="title">Address</h4>
                  <p>296 1/2, Galle road, Colombo 06</p>
                </div>
              </Col>
              <Col md="3">
                <div className="info"></div>
                <div className="description">
                  <h4 className="title">Follow us</h4>
                  <p>@travelnation</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <DemoFooter />
    </>
  );
}

export default Aboutus;

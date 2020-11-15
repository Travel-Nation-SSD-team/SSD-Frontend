import React from "react";
import UserProfile from "views/Pages/UserProfile";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import LocationHeader from "components/Headers/LocationHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Location() {
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
      <LocationHeader />
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Explore the Heavenly Island</h2>
                <h5 className="description">
                  With us you will get the chance to explore and experience the
                  beautiful Island like never before
                </h5>
                <br />
                <Button className="btn-round" color="info" href="/packages">
                  Book Now
                </Button>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-album-2" />
                  </div>
                  <div className="description">
                    <h4 className="title">Amazing Locations</h4>
                    <p className="description">
                      You will be reaching amazing location which you will love
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-bulb-63" />
                  </div>
                  <div className="description">
                    <h4 className="title">Activities You love</h4>
                    <p>
                      With us you can experience activities is locations you
                      always dreamt of
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-chart-bar-32" />
                  </div>
                  <div className="description">
                    <h4 className="title">Care and Support</h4>
                    <p>
                      Our guide will always guide, care and support you to
                      ensure you have great experience, fun and protection
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-sun-fog-29" />
                  </div>
                  <div className="description">
                    <h4 className="title">Make memories</h4>
                    <p>
                      Finally you will make memories which you will discuss with
                      everyone life long
                    </p>
                  </div>
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

export default Location;

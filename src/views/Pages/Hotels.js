import React from "react";
import UserProfile from "views/Pages/UserProfile";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import HotelHeader from "components/Headers/HotelHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Hotel() {
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
      <HotelHeader />
      <div className="main">
        <div className="section text-center">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                <h2 className="title">Our hotels offer you</h2>
                <h5 className="description">
                  When booking our packages according to the locations You have
                  various hotel options to select, where you can stay and enjoy
                  delicious meals
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
                    <h4 className="title">High Class Rooms</h4>
                    <p className="description">
                      Luxury and comfortable rooms with 24/7 Support
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
                    <h4 className="title">Delicious Meals</h4>
                    <p>
                      Our best chefs brings you the tastier food you will ever
                      have
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
                    <h4 className="title">Pool and Bar</h4>
                    <p>enjoy your leasure time in our pools and bar with DJ</p>
                  </div>
                </div>
              </Col>
              <Col md="3">
                <div className="info">
                  <div className="icon icon-info">
                    <i className="nc-icon nc-sun-fog-29" />
                  </div>
                  <div className="description">
                    <h4 className="title">Beautiful Views</h4>
                    <p>
                      Each rooms gives you natural sunlight and extraordinary
                      views
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

export default Hotel;

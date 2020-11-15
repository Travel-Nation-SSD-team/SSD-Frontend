import React, { useEffect, useState } from "react";
import http from "../../common-http";
import UserProfile from "views/Pages/UserProfile";
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Container, Form, Input } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Packages() {
  UserProfile.getRole();
  const [packages, setPackages] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const INITIAL_STATE = {
    package_id: "",
    package_name: "",
    package_image: "",
    package_description: "",
    package_activities: "",
    package_locations: "",
    package_Days: "",
    package_participants: "",
    package_price: "",
  };

  const [formState, setFormState] = useState(INITIAL_STATE);
  const {
    package_id,
    package_name,
    package_image,
    package_description,
    package_activities,
    package_locations,
    package_Days,
    package_participants,
    package_price,
  } = formState;

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const setPackageForEdit = (packag) => {
    setIsEditing(true);
    // populate data
    setFormState({
      ...formState,
      package_id: packag.package_id,
      package_name: packag.package_name,
      package_image: packag.package_image,
      package_description: packag.package_description,
      package_activities: packag.package_activities,
      package_locations: packag.package_locations,
      package_Days: packag.package_Days,
      package_participants: packag.package_participants,
      package_price: packag.package_price,
    });
  };

  const loadData = async () => {
    const res = await http.get("packages");
    setPackages(res.data);
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
            <b>PACKAGES</b>
          </h2>
          {packages.map((packag) => (
            <Container
              key={packag.package_id}
              onClick={() => setPackageForEdit(packag)}
            >
              <div className="list-group">
                <a className="list-group-package">
                  <label className="labelpackagename">
                    <b>{packag.package_name}</b>
                  </label>
                  <div></div>
                  <label className="labelpackagedescription">
                    <b>{packag.package_description}</b>
                  </label>
                  <img src={packag.package_image} className="package-img" />
                  <div></div>
                  <b>
                    <label className="labelpackageDays">
                      Package Days - {packag.package_Days}
                    </label>
                    <label className="labelpackageparticipants">
                      Maximum Participants - {packag.package_participants}
                    </label>
                    <label className="labelpackageprice">
                      Package Price - LKR. {packag.package_price}
                    </label>
                  </b>
                </a>
                <div></div>
                <label className="labeltext"></label>
                <Button
                  block
                  className="btn-package mb-2"
                  color="primary"
                  to="/bookings"
                  tag={Link}
                >
                  Book Now
                </Button>
              </div>
              <div></div>
              <label className="labeltext"></label>
            </Container>
          ))}
        </div>
      </div>

      <DemoFooter />
    </>
  );
}

export default Packages;

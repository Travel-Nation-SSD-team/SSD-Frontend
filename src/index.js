import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// pages
import Index from "views/Home.js";
import NucleoIcons from "views/NucleoIcons.js";
import ProfilePage from "views/Pages/ProfilePage.js";
import Login from "views/Pages/Login.js";
import Hotels from "views/Pages/Hotels.js";
import Locations from "views/Pages/Location.js";
import Register from "views/Pages/Register.js";
import HotelAdmin from "views/Pages/HotelAdmin.js";
import LocationAdmin from "views/Pages/LocationAdmin.js";
import PackageAdmin from "views/Pages/PackageAdmin.js";
import BookingAdmin from "views/Pages/BookingAdmin.js";
import UserAdmin from "views/Pages/UserAdmin.js";
import FeedbackAdmin from "views/Pages/FeedbackAdmin.js";
import InquiryAdmin from "views/Pages/InquiryAdmin.js";
import Feedback from "views/Pages/Feedback.js";
import Inquiries from "views/Pages/Inquiries.js";
import Packages from "views/Pages/Packages.js";
import Bookings from "views/Pages/Booking.js";
import Admin from "views/Pages/Admin.js";
import Aboutus from "views/Pages/Aboutus.js";

// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/Homepage" render={(props) => <Index {...props} />} />
      <Route
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      />
      <Route path="/Hotels" render={(props) => <Hotels {...props} />} />
      <Route path="/Locations" render={(props) => <Locations {...props} />} />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      <Route path="/hoteladmin" render={(props) => <HotelAdmin {...props} />} />
      <Route path="/inquiries" render={(props) => <Inquiries {...props} />} />
      <Route path="/feedback" render={(props) => <Feedback {...props} />} />
      <Route
        path="/inquiryadmin"
        render={(props) => <InquiryAdmin {...props} />}
      />
      <Route
        path="/feedbackadmin"
        render={(props) => <FeedbackAdmin {...props} />}
      />
      <Route
        path="/locationadmin"
        render={(props) => <LocationAdmin {...props} />}
      />
      <Route path="/bookings" render={(props) => <Bookings {...props} />} />
      <Route path="/packages" render={(props) => <Packages {...props} />} />
      <Route path="/useradmin" render={(props) => <UserAdmin {...props} />} />
      <Route
        path="/packageadmin"
        render={(props) => <PackageAdmin {...props} />}
      />
      <Route
        path="/bookingadmin"
        render={(props) => <BookingAdmin {...props} />}
      />
      <Route path="/admin" render={(props) => <Admin {...props} />} />
      <Route path="/Login" render={(props) => <Login {...props} />} />
      <Route path="/Signup" render={(props) => <Register {...props} />} />
      <Route path="/aboutus" render={(props) => <Aboutus {...props} />} />
      <Redirect to="/Homepage" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

import React from "react";
import UserProfile from "views/Pages/UserProfile";

// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import UserNavbar from "components/Navbars/UserNavbar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function Index() {
  UserProfile.getRole();

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
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
      <IndexHeader />
      <div className="main">
        <DemoFooter />
      </div>
    </>
  );
}

export default Index;

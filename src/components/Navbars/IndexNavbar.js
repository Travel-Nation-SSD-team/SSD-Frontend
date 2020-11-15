import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand data-placement="bottom" to="/index" tag={Link}>
            Travel Nation
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink data-placement="bottom" href="/Signup">
                <i /> Sign up
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" href="/Login">
                <i /> Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" href="/packages">
                <i /> Packages
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" href="/inquiries">
                <i /> Inquires
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" href="/Hotels">
                <i /> Hotels
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink data-placement="bottom" href="/Locations">
                <i /> Locations
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/aboutus">
                <i /> About Us
              </NavLink>
            </NavItem>
            <NavItem></NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;

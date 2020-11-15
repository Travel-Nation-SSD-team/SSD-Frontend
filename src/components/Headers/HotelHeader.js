
import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import HotelCarousel from "views/index-sections/HotelCarousel.js";

// core components

function LandingPageHeader() {

  
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
     
      <div className="main">
        <div>
       
        </div>
        <HotelCarousel />
      </div>
    </>

  );
}

export default LandingPageHeader;

import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import GalleryCarousel from "views/index-sections/GalleryCarousel.js";

// core components

function AboutusHeader() {
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
        <div></div>
        <GalleryCarousel />
      </div>
    </>
  );
}

export default AboutusHeader;

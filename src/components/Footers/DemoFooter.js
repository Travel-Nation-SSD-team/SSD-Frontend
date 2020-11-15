
import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

function DemoFooter() {
  return (
    <footer className="footer dark-footer" color="dark">
      <Container>
        <Row>
          <nav className="footer-nav" color="dark">
           
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, Travel Nation
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default DemoFooter;

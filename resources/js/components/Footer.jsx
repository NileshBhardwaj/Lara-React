import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Footer() {
    return (
        <div className="footer">
        <div className="text-center p-3" >
      © 2024 Copyright
      </div>
      </div>
    );
}

export default Footer;

const rootElement = document.getElementById("footer");
const root = createRoot(rootElement);

root.render(<Footer />);

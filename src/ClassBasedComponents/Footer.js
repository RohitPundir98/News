import React, { Component } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Footer extends Component {
  // Constructor to initialize state
  constructor(props) {
    super(props);
    // Set initial state with loading set to true
    this.state = {
      loading: true,
    };
  }

  // Lifecycle method to simulate loading completion after a delay
  componentDidMount() {
    // Simulate loading completion after 2 seconds (adjust as needed)
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  render() {
    return (
      <footer
        className="container-fluid text-center"
        style={{
          background: "#333",
          color: "white",
          padding: "20px 0",
          width: "100%",
        }}
      >
        {/* Content section */}
        <div className="row">
          <div className="col">
            <h4>Connect with me:</h4>
          </div>
        </div>
        {/* Instagram link */}
        <div className="row">
          <div className="col">
            <a
              href="https://www.instagram.com/rohit_.pundir/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              {/* Instagram icon with gradient background */}
              <i
                className="fab fa-instagram"
                style={{
                  background:
                    "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)",
                  color: "white",
                  padding: "2px 2.5px",
                  marginRight: "4px",
                  borderRadius: "5px",
                }}
              ></i>
              Instagram
            </a>
          </div>
          {/* Email link */}
          <div className="col">
            <a
              href="mailto:rohit01pundir@email.com"
              style={{
                color: "red",
                textDecoration: "none",
              }}
            >
              {/* Email icon with gradient background */}
              <i
                className="far fa-envelope"
                style={{
                  padding: "2px 2.5px",
                  marginRight: "4px",
                  borderRadius: "5px",
                  background: "linear-gradient(45deg, #2C3E50, #3498DB)",
                  color: "white",
                }}
              ></i>{" "}
              Email
            </a>
          </div>
          {/* GitHub link */}
          <div className="col">
            <a
              href="https://github.com/RohitPundir98"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "red",
                textDecoration: "none",
              }}
            >
              {/* GitHub icon with gradient background */}
              <i
                className="fab fa-github"
                style={{
                  padding: "2px 2.5px",
                  marginRight: "4px",
                  borderRadius: "5px",
                  background: "linear-gradient(45deg, #24292E, #4183C4)",
                  color: "white",
                }}
              ></i>{" "}
              GitHub
            </a>
          </div>
          {/* Portfolio link */}
          <div className="col">
            <a
              href="https://your-portfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "red",
                textDecoration: "none",
              }}
            >
              {/* Portfolio icon (briefcase) with gradient background */}
              <i
                className="fas fa-briefcase"
                style={{
                  padding: "2px 2.5px",
                  marginRight: "4px",
                  borderRadius: "5px",
                  background: "linear-gradient(45deg, #3498DB, #9B59B6)",
                  color: "white",
                }}
              ></i>{" "}
              Portfolio
            </a>
          </div>
        </div>
        {/* Footer text */}
        <div className="row mt-3">
          <div className="col">
            <p style={{ fontSize: "12px" }}>
              © {new Date().getFullYear()} Made with Love{" "}
              <span style={{ color: "red", fontSize: "14px" }}> &#9829; </span>
              Rohit Pundir. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

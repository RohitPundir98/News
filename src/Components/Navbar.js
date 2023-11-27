import React from "react";
import { Link } from "react-router-dom";

// Function-based component 'Navbar'
const Navbar = ({ onCountryChange }) => {
  // Event handler for country change
  const handleCountryChange = (event) => {
    // Get the selected country from the event
    const selectedCountry = event.target.value;
    // Call the onCountryChange prop function with the selected country
    onCountryChange(selectedCountry);
  };

  // JSX to render the component
  return (
    <>
      {/* Navigation bar with dark background */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          {/* Brand link to the general category */}
          <Link className="navbar-brand" to="/general">
            News Monkey
          </Link>
          {/* Toggle button for collapsed navigation on small screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navigation links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Link to the Business category */}
              <li className="nav-item">
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              {/* Link to the Sports category */}
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              {/* Link to the Science category */}
              <li className="nav-item">
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              {/* Link to the Health category */}
              <li className="nav-item">
                <Link className="nav-link" to="/health">
                  Health
                </Link>
              </li>
              {/* Link to the Technology category */}
              <li className="nav-item">
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
              {/* Link to the Entertainment category */}
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              {/* Dropdown for selecting the country */}
              <li className="nav-item">
                <select className="form-select bg-dark text-light" onChange={handleCountryChange}>
                  <option value="in">India</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  {/* Add more options for other countries as needed */}
                </select>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

// Export the Navbar component as the default export
export default Navbar;

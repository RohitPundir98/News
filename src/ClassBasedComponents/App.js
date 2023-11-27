// Import necessary modules from React and React Router
import React, { Component, useEffect } from "react";
// React Top LOADING BAR
import LoadingBar from "react-top-loading-bar";
// Import your custom components
import News from "./Components/News";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
// import router
import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
  } from "react-router-dom";

// Home component to handle initial redirection
const Home = () => {
  // Access the navigate function from React Router
  const navigate = useNavigate();

  // useEffect hook to perform actions when the component mounts
  useEffect(() => {
    // Redirect to the default route ('/general') when the component mounts
    navigate("/general");
  }, [navigate]);

  // The Home component doesn't render anything, hence 'return null'
  return null;
};

// Main App component
class App extends Component {
  // Constructor to initialize the component's state
  constructor(props) {
    super(props);
    // Initial state with a default country value
    this.state = {
      country: "in", // Default country is 'in'
    };
  }

  // Handler function to update the country in the state
  handleCountryChange = (selectedCountry) => {
    this.setState({ country: selectedCountry });
  };

  // Top Lodinig Bar
  state = {
    progress: 0,
  };
  
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  // Render method to render the component
  render() {
    return (
      <div className="bg-dark">
      <div className="container">
      // Use the Router component to enable routing in the application
      <Router>
        {/* Outer container with a dark background */}
        {/* <div className=""> */}
          {/* Render the Navbar component and pass the handler function as a prop */}
          <Navbar onCountryChange={this.handleCountryChange} />
          <LoadingBar
          height={4}
          color='#f11946'
          progress={this.state.progress}
          />
          {/* Routes component to define different routes */}
          <Routes>
            {/* Default route that renders the Home component and redirects to '/general' */}
            <Route path="/" element={<Home />} />

            {/* Route for the 'general' category, rendering the News component with specific props */}
            <Route
              path="/general"
              element={
                <News setProgress={this.setProgress} 
                  key={"gen"}
                  category={"general"}
                  country={this.state.country}
                  pageSize={this.pageSize}
                />
              }
            />

            {/* Similar routes for other categories */}
            <Route
              path="/business"
              element={
                <News setProgress={this.setProgress} 
                  key={"bus"}
                  category={"business"}
                  country={this.state.country}
                  pageSize={this.pageSize}
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News setProgress={this.setProgress} 
                  key={"sp"}
                  category={"sports"}
                  country={this.state.country}
                  pageSize={this.pageSize}
                />
              }
            />
            <Route
              path="/science"
              element={
                <News setProgress={this.setProgress} 
                  key={"sc"}
                  category={"science"}
                  country={this.state.country}
                  pageSize={this.pageSize}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News setProgress={this.setProgress} 
                  key={"tech"}
                  category={"technology"}
                  country={this.state.country}
                  pageSize={this.pageSize}
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News setProgress={this.setProgress} 
                  key={"ent"}
                  category={"entertainment"}
                  country={this.state.country}
                  pageSize={this.pageSize}
                />
              }
            />
            <Route
              path="/health"
              element={
                <News setProgress={this.setProgress} 
                  key={"heal"}
                  category={"health"}
                  country={this.state.country}
                  pageSize={this.pageSize}
                />
              }
            />
          </Routes>

          {/* Render the Footer component at the bottom of the page */}
        {/* </div> */}
      </Router>
      </div>
          <Footer />
          </div>
    );
  }
}

// Export the App component as the default export
export default App;
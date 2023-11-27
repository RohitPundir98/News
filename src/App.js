import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import LoadingBar from "react-top-loading-bar";
import News from "./Components/News";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/general");
  }, [navigate]);

  return null;
};

const App = () => {
  const [country, setCountry] = useState("in");
  const [progress, setProgress] = useState(0);

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
  };

  return (
    <div className="bg-dark">
      <div className="container">
        <Router>
          <Navbar onCountryChange={handleCountryChange} />
          <LoadingBar height={4} color="#f11946" progress={progress} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/general"
              element={
                <News
                  setProgress={setProgress}
                  key={"gen"}
                  category={"general"}
                  country={country}
                  pageSize={9} // Set your default pageSize value here
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  setProgress={setProgress}
                  key={"bus"}
                  category={"business"}
                  country={country}
                  pageSize={9}
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  setProgress={setProgress}
                  key={"sp"}
                  category={"sports"}
                  country={country}
                  pageSize={9}
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  setProgress={setProgress}
                  key={"sc"}
                  category={"science"}
                  country={country}
                  pageSize={9}
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  setProgress={setProgress}
                  key={"tech"}
                  category={"technology"}
                  country={country}
                  pageSize={9}
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={setProgress}
                  key={"ent"}
                  category={"entertainment"}
                  country={country}
                  pageSize={9}
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  setProgress={setProgress}
                  key={"heal"}
                  category={"health"}
                  country={country}
                  pageSize={9}
                />
              }
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;

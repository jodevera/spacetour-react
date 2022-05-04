import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home";
import Destination from "./components/Pages/Destination";
import Crew from "./components/Pages/Crew";
import Discover from "./components/Pages/Discover";
import Technology from "./components/Pages/Technology";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const pageHome = "pageHome";
  const pageDest = "pageDest";
  const pageCrew = "pageCrew";
  const pageTech = "pageTech";
  const pageDisc = "pageDisc";

  const [bgStatus, setBgStatus] = useState(pageHome);

  const pathname = window.location.pathname;
  const [currentUrl, setCurrentUrl] = useState();

  useEffect(() => {
    setCurrentUrl(pathname);
  }, [pathname]);

  console.log(pathname);

  useEffect(() => {
    if (currentUrl === "/destination") {
      setBgStatus(pageDest);
    } else if (currentUrl === "/technology") {
      setBgStatus(pageTech);
    } else if (currentUrl === "/crew") {
      setBgStatus(pageCrew);
    } else if (currentUrl === "/") {
      setBgStatus(pageHome);
    } else if (currentUrl === "/discover") {
      setBgStatus(pageDisc);
    }
  }, [currentUrl]);

  return (
    <Router>
      <div className={"container " + bgStatus}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/crew" element={<Crew />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/discover" element={<Discover />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

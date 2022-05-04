import "./styles/home.css";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const handleRefresh = () => {
    // by calling this method react re-renders the component
    this.setState({});
  };
  return (
    <>
      <div className="homeContainer">
        <div className="landingText">
          <div className="homeText1 heading5">SO, YOU WANT TO TRAVEL TO</div>
          <div className="homeText2 heading1">SPACE</div>
          <div className="homeText3 bodytext">
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </div>
        </div>
        <div className="exploreContainer">
          <Link
            onClick={handleRefresh}
            className="exploreLink"
            to="/destination"
          >
            <div className="explore">EXPLORE</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;


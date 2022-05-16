import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/destination/logo.svg";
import hamburger from "../../assets/destination/icon-hamburger.svg";
import close from "../../assets/destination/icon-close.svg";

const Navbar = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width to state
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const hideNav = {
      transform: "translateX(100%)",
    };

    const showIcon = {
      display: "inline-block",
    };

    const hideIcon = {
      display: "none",
    };

    const changeWindow = () => {
      setNavStatus(hideNav);
    };

    if (windowSize.width <= "480") {
      setHbStatus(showIcon);
      changeWindow();
      setCloseStatus(hideIcon);
    } else if (windowSize.width > "480") {
      changeWindow();
      setHbStatus(hideIcon);
      setCloseStatus(hideIcon);
    }
  }, [windowSize]);

  const showNav = {
    transform: "translateX(0%)",
    display: "block",
  };

  const showIcon2 = {
    display: "inline-block",
  };

  const hideIcon2 = {
    display: "none",
  };
  const hideNav2 = {
    transform: "translateX(100%)",
  };
  const [navStatus, setNavStatus] = useState(hideNav2);

  const [hbStatus, setHbStatus] = useState(showNav);

  const [closeStatus, setCloseStatus] = useState();

  const clickHB = () => {
    setCloseStatus(showIcon2);
    setHbStatus(hideIcon2);
    setNavStatus(showNav);
  };

  const clickClose = () => {
    setCloseStatus(hideIcon2);
    setHbStatus(showIcon2);
    setNavStatus(hideNav2);
  };

  const clickNav = () => {
    setNavStatus(hideNav2);
    setCloseStatus(hideIcon2);
    setHbStatus(showIcon2);
  };

  const handleRefresh = () => {
    // by calling this method react re-renders the component
    this.setState({});
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="horizontal-line-header">
          <hr />
        </div>
        <div className="horizontal-line-overlap">
          <hr />
        </div>
        <nav className="navMain">
          <ul className="navLinks">
            <li className="navtext">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "navLink" + (isActive ? " selected" : " unselected")
                }
                onClick={handleRefresh}
              >
                <span className="bullet">00</span>&nbsp;HOME
              </NavLink>
            </li>
            <li className="navtext">
              <NavLink
                to="/destination"
                className={({ isActive }) =>
                  "navLink" + (isActive ? " selected" : " unselected")
                }
                onClick={handleRefresh}
              >
                <span className="bullet">01</span>&nbsp;DESTINATION
              </NavLink>
            </li>
            <li className="navtext">
              <NavLink
                to="/crew"
                className={({ isActive }) =>
                  "navLink" + (isActive ? " selected" : " unselected")
                }
                onClick={handleRefresh}
              >
                <span className="bullet">02</span>&nbsp;CREW
              </NavLink>
            </li>
            <li className="navtext">
              <NavLink
                to="/technology"
                className={({ isActive }) =>
                  "navLink" + (isActive ? " selected" : " unselected")
                }
                onClick={handleRefresh}
              >
                <span className="bullet">03</span>&nbsp;TECHNOLOGY
              </NavLink>
            </li>
            <li className="navtext">
              <NavLink
                to="/discover"
                className={({ isActive }) =>
                  "navLink" + (isActive ? " selected" : " unselected")
                }
                onClick={handleRefresh}
              >
                <span className="bullet">04</span>&nbsp;DISCOVER
              </NavLink>
            </li>
          </ul>
        </nav>
        <div style={hbStatus} className="hamburger">
          <img
            onClick={() => clickHB()}
            className="icon-img"
            src={hamburger}
            alt="hamburger"
          />
        </div>
        <div style={closeStatus} className="exit">
          <img
            onClick={() => clickClose()}
            className="icon-img"
            src={close}
            alt="close"
          />
        </div>
      </div>
      <div style={navStatus} className="mobNavContainer">
        <nav className="mobNavMain">
          <div className="mobNavBullets">
            <span className="mobNavBullet">00</span>
            <span className="mobNavBullet">01</span>
            <span className="mobNavBullet">02</span>
            <span className="mobNavBullet">03</span>
            <span className="mobNavBullet">04</span>
          </div>
          <ul className="mobNavLinks">
            <li onClick={() => clickNav()} className="mobNavText">
              <NavLink to="/" onClick={handleRefresh}>
                HOME
              </NavLink>
            </li>
            <li onClick={() => clickNav()} className="mobNavText">
              <NavLink to="/destination" onClick={handleRefresh}>
                DESTINATION
              </NavLink>
            </li>
            <li onClick={() => clickNav()} className="mobNavText">
              <NavLink to="/crew" onClick={handleRefresh}>
                CREW
              </NavLink>
            </li>
            <li onClick={() => clickNav()} className="mobNavText">
              <NavLink to="/technology" onClick={handleRefresh}>
                TECHNOLOGY
              </NavLink>
            </li>
            <li onClick={() => clickNav()} className="mobNavText">
              <NavLink to="/discover" onClick={handleRefresh}>
                DISCOVER
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

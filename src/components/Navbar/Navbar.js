import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/destination/logo.svg';
import hamburger from '../../assets/destination/icon-hamburger.svg';
import close from '../../assets/destination/icon-close.svg';


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
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
        
    },[]);

    useEffect(() => {
        
        if (windowSize.width <= '480') {
            setHbStatus(showIcon);
            changeWindow();
            setCloseStatus(hideIcon);

        }
        else if (windowSize.width > '480') {
            changeWindow();
            setHbStatus(hideIcon);
            setCloseStatus(hideIcon);

        }
        
    },[windowSize]);

    
    const showNav = {
        transform: 'translateX(0%)',
        display: 'block'
    };

    const hideNav = {
        transform: 'translateX(100%)',
    }

    const showIcon = {
        display: 'inline-block'
    }

    const hideIcon = {
        display: 'none'
    }

    const [navStatus, setNavStatus] = useState(hideNav);

    const [hbStatus, setHbStatus] = useState(showNav);

    const [closeStatus, setCloseStatus] = useState();

    const clickHB = () => {
        setCloseStatus(showIcon);
        setHbStatus(hideIcon);
        setNavStatus(showNav);
    }

    const clickClose = () => {
        setCloseStatus(hideIcon);
        setHbStatus(showIcon);
        setNavStatus(hideNav);
    }

    const clickNav = () => {
        setNavStatus(hideNav);
        setCloseStatus(hideIcon);
        setHbStatus(showIcon);
    }

    const changeWindow = () => {
        setNavStatus(hideNav);
    }

    const handleRefresh = () => {
        // by calling this method react re-renders the component
        this.setState({});
    };
    return (
        <>
            <div className = "header">
                <div className = "logo"><img src = {logo} alt = "logo"/></div>
                <div className = 'horizontal-line-header'><hr /></div>
                <div className = 'horizontal-line-overlap'><hr /></div>
                <nav className  = "navMain">
                    <ul className  = "navLinks">
                        <li className  = "navtext">
                            <Link to = "/" onClick = { handleRefresh }><span className = "navLink"><span className = "bullet">00</span>&nbsp;HOME</span></Link>
                        </li>
                        <li className  = "navtext">
                            <Link to = "/destination" onClick = { handleRefresh }><span className = "navLink"><span className = "bullet">01</span>&nbsp;DESTINATION</span></Link>
                        </li>
                        <li className  = "navtext">
                            <Link to = "/crew" onClick = { handleRefresh }><span className = "navLink"><span className = "bullet">02</span>&nbsp;CREW</span></Link>
                        </li>
                        <li className  = "navtext">
                            <Link to = "/technology" onClick = { handleRefresh }><span className = "navLink"><span className = "bullet">03</span>&nbsp;TECHNOLOGY</span></Link>
                        </li>
                    </ul> 
                </nav>
                <div style = {hbStatus} className = "hamburger">
                   <img onClick = { () => clickHB() } className = "icon-img" src = {hamburger} alt = "hamburger"/>
                </div>
                <div style = {closeStatus} className = "exit">
                   <img onClick = { () => clickClose() } className = "icon-img" src = {close} alt = "close"/>
                </div>
            </div>
            <div style = {navStatus} className = "mobNavContainer">
                <nav className  = "mobNavMain">
                    <div className = "mobNavBullets">
                        <span className = "mobNavBullet">00</span>
                        <span className = "mobNavBullet">01</span>
                        <span className = "mobNavBullet">02</span>
                        <span className = "mobNavBullet">03</span>
                        <span className = "mobNavBullet">04</span>
                    </div>
                    <ul className  = "mobNavLinks">
                        <li onClick = { () => clickNav() }className  = "mobNavText">
                            <Link to = "/" onClick = { handleRefresh }>HOME</Link>
                        </li>
                        <li onClick = { () => clickNav()} className  = "mobNavText">
                            <Link to = "/destination" onClick = { handleRefresh }>DESTINATION</Link>
                        </li>
                        <li onClick = { () => clickNav()} className  = "mobNavText">
                            <Link to = "/crew" onClick = { handleRefresh }>CREW</Link>
                        </li>
                        <li onClick = { () => clickNav()} className  = "mobNavText">
                            <Link to = "/technology" onClick = { handleRefresh }>TECHNOLOGY</Link>
                        </li>
                        <li onClick = { () => clickNav()} className  = "mobNavText">
                            <Link to = "/discover" onClick = { handleRefresh }>DISCOVERY</Link>
                        </li>
                    </ul> 
                </nav>
            </div>
        </>
        
    );
};

export default Navbar;
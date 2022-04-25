import React, { useEffect, useState } from "react";
import './styles/discover.css';
import chevronImg from '../../assets/destination/down-chevron.svg';

const Discover = () => {
    const showSearch = {
        transform: 'translateY(0%)',
        display: 'block'
    };
    const hideSearch = {
        transform: 'translateY(100%)',
    };
    const hideChev = {
        display: 'none'
    }
    const showChev = {
        display: 'block'
    }
    const [searchStatus, setSearchStatus] = useState(hideSearch);
    const [upChevStatus, setUpChevStatus] = useState(showChev);
    const [downChevStatus, setDownChevStatus] = useState(hideChev);

    const clickUpChevron = () => {
        setSearchStatus(showSearch);
        setUpChevStatus(hideChev);
        setDownChevStatus(showChev);
    }

    const clickDownChevron = () => {
        setSearchStatus(hideSearch);
        setUpChevStatus(showChev);
        setDownChevStatus(hideChev);
    }

    const API_URL = "http://localhost:3500/launches";

    const [launches, setLaunches] = useState([])
    const [launchFlightNumber, setLaunchFlightNumber] = useState();
    const [rocketName, setRocketName] = useState();
    const [rocketType, setRocketType] = useState();
    const [launchDate, setLaunchDate] = useState();

    const displayLaunches = (launch) => {
        const launchTemp = launches.find(x => x.flight_number === launch);
        setLaunchFlightNumber(launchTemp.flight_number);
        setRocketName(launchTemp.rocket.rocket_name);
        setRocketType(launchTemp.rocket.rocket_type);
        setLaunchDate(launchTemp.launch_date_local);
    };

    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                const response = await fetch(API_URL);
                const listLaunches = await response.json();
                setLaunches(listLaunches);
            } catch (err) {
                console.log(err.stack)
            }
        }

        (async () => await fetchLaunches())();
    }, [])

    return(
        <>
            <div className = "subtitle heading5"><span className = "number">04</span>&nbsp;REVISIT YOUR JOURNIES</div>
            <div className = "discoverContainer">
                <div className = "discoverText heading3">
                    DISCOVER SPACE MISSIONS
                </div>
                <div className  = "discoverIcon">
                    <img onClick = { () => clickUpChevron() } className = "discoverChevUpSrc" id = "destImg" src = {chevronImg} style = {upChevStatus} alt = "chevron" />
                    <img onClick = { () => clickDownChevron() } className = "discoverChevDownSrc" id = "destImg" src = {chevronImg} style = {downChevStatus} alt = "chevron" />
                </div>  
            </div>
            <div className = "discoverSearch" style = {searchStatus}>
                <div className = "discoverInputs">
                    <div className = "discoverInputContainer">
                        <div className = "discoverSearchInput">
                            <label for = "keyword" className = "discoverLabel bodytext">Keywords</label>
                            <input className = "discoverTextBox" id = "keyword" type = "text" placeholder = "eg Falcon"/>
                        </div>
                        <div className = "discoverSearchInput">
                            <label for = "launchpad" className = "discoverLabel bodytext">Launchpad</label>
                            <input className = "discoverTextBox" id = "launchpad" type = "text" />
                        </div>
                        <div className = "discoverSearchInput">
                            <label for = "minyear" className = "discoverLabel bodytext">Min. Year</label>
                            <input className = "discoverTextBox" id = "minyear" type = "text" />
                        </div>
                        <div className = "discoverSearchInput">
                            <label for = "maxyear" className = "discoverLabel bodytext">Max. Year</label>
                            <input className = "discoverTextBox" id = "maxyear" type = "text" />
                        </div>
                        <div className = "discoverButtonContainer">
                            <span>&nbsp;</span><br/>
                            <button className = "discoverApplyButton bodytext">Apply</button>
                        </div>
                        
                    </div>
                </div>
                <div className = "discoverResults">
                    <div className = "launchText">
                        <div className = "rocketInfo">
                            <span className = "heading5 rocketName">Falcon 9&nbsp;-&nbsp;</span><span className = "heading5 rocketType">Echostar 105</span>
                            <br/>
                            <span className = "rocketDateLabel bodytext">Launched: 11th Octorber 2017 at 6:53pm from Kennedy Space Center Launch Complex 39A</span>
                        </div>
                        <div className = "flightNumberContainer">
                            <span className = "heading5 flightNumber">#49</span>
                            <br/>
                            <span className = "rocketDateLabel bodytext">Flight Number</span>
                        </div>

                    </div>
                    <div className = "launchButtonContainer">
                        <button className = "launchButton bodytext">Reddit Campaign</button>
                        <button className = "launchButton bodytext">Reddit Launch</button>
                        <button className = "launchButton bodytext">Reddit Media</button>
                        <button className = "launchButton bodytext">Press Kit</button>
                        <button className = "launchButton bodytext">Article</button>
                        <button className = "launchButton bodytext">Watch Video</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Discover;
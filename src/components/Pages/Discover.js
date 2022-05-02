import React, { useEffect, useState, useRef } from "react";
import './styles/discover.css';
import chevronImg from '../../assets/destination/down-chevron.svg';



const Discover = () => {

    //setup APIs

    const LAUNCH_URL = "http://localhost:3500/launches";
    const LAUNCHPAD_URL = "http://localhost:3600/launchpads";
    const [launches, setLaunches] = useState([])
    const [launchPads, setLaunchPads] = useState([])
    
    //get launch API Response

    useEffect(() => {
        const fetchLaunches = async () => {
            try {
                const response = await fetch(LAUNCH_URL);
                const listLaunches = await response.json();
                setLaunches(listLaunches);
            } catch (err) {
                console.log(err.stack)
            }
        }
        (async () => await fetchLaunches())();
    }, [])
    //get launchpad API Response

    useEffect(() => {
        const fetchLaunchPads = async () => {
            try {
                const responseLP = await fetch(LAUNCHPAD_URL);
                const listLaunchPads = await responseLP.json();
                setLaunchPads(listLaunchPads);
            } catch (err) {
                console.log(err.stack)
            }
        }
        (async () => await fetchLaunchPads())();
    }, [])

    //scroll to search container

    const launchRef = useRef(null);

    const handleClick = () => {
        launchRef.current.scrollIntoView({ behavior: "smooth" });
    }


    //keyword filter

    const [keyword, setKeyword] = useState("");
    const [lpFilter, setLpFilter] = useState("");

    const handleKeywordChange = event => {
        setKeyword(event.target.value)
    };

    const handleLPChange = event => {
        setLpFilter(event.target.value)
    };

    const lowercasedKeyword = keyword.toString().toLowerCase();
    const lowercasedLpFilter = lpFilter.toString().toLowerCase();

    console.log("keyword: " + lowercasedKeyword);
    console.log("launchpad: " + lowercasedLpFilter);

    const filteredLaunches = launches.filter(launch => {

        return(
            //KEYWORD FILTER
            (//check launch array
            Object.keys(launch).some(key =>
                typeof launch[key] === "string" && (launch[key].toLowerCase().includes(lowercasedKeyword))) ||
            //check rocket attributes
            Object.keys(launch.rocket).some(key =>
                typeof launch.rocket[key] === "string" && (launch.rocket[key].toLowerCase().includes(lowercasedKeyword)))  ||
            //check payloads
            Object.keys(launch.payloads).some(key =>
                typeof launch.payloads[key] === "string" && (launch.payloads[key].toLowerCase().includes(lowercasedKeyword)))  ||
            //check launchpads while matching with launchpad API
            Object.keys(launch.launch_site).some(key =>
                typeof launch.launch_site[key] === "string" && (launchPads.filter((launchpad) => launch?.launch_site?.site_id === launchpad?.id)[0]?.full_name.toLowerCase().includes(lowercasedKeyword)))) &&
            
            //LAUNCHPAD FILTER
            //check launchpads via launchpad filter    
            Object.keys(launch.launch_site).some(key =>
                typeof launch.launch_site[key] === "string" && (launchPads.filter((launchpad) => launch?.launch_site?.site_id === launchpad?.id)[0]?.full_name.toLowerCase().includes(lowercasedLpFilter)))
        );
    });

    //get no. of missions
    var noOfMissions = filteredLaunches.length;

    
    return(
        <>
            <div className = "subtitle heading5"><span className = "number">04</span>&nbsp;REVISIT YOUR JOURNIES</div>
            <div className = "discoverContainer">
                <div className = "discoverText heading3">
                    DISCOVER SPACE MISSIONS
                </div>
                <div className  = "discoverIcon">
                    <img onClick = { () => handleClick() } className = "discoverChevDownSrc" id = "destImg" src = {chevronImg} alt = "chevron" />
                </div>  
            </div>
            <div className = "discoverSearch" ref = {launchRef}>
                <div className = "discoverInputContainer">
                    <div className = "discoverSearchInput">
                        <label for = "keyword" className = "discoverLabel bodytext">Keywords</label>
                        <input className = "discoverTextBox" id = "keyword" type = "text" placeholder = "eg Falcon" onChange = {handleKeywordChange}/>
                    </div>
                    <div className = "discoverSearchInput">
                        <label for = "launchpad" className = "discoverLabel bodytext">Launchpad</label>
                        <select className = "discoverTextBox" id = "launchpad" type = "text" onChange = {handleLPChange}>
                            {launchPads.map((launchpad) => (
                                <option value = {launchpad.full_name}>
                                    {launchpad.full_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className = "discoverSearchInput">
                        <label for = "minyear" className = "discoverLabel bodytext">Min Year</label>
                        <input className = "discoverTextBox" id = "minyear" type = "text" />
                    </div>
                    <div className = "discoverSearchInput">
                        <label for = "maxyear" className = "discoverLabel bodytext">Max Year</label>
                        <input className = "discoverTextBox" id = "maxyear" type = "text" />
                    </div>
                    <div className = "discoverButtonContainer">
                        <span>&nbsp;</span><br/>
                        <button className = "discoverApplyButton bodytext">Apply</button>
                    </div>
                </div>
                <div className = "noOfMissionsContainer bodytext"><span>Showing {noOfMissions} Missions</span></div>
                {filteredLaunches.map((launch, x) => (
                <div key = {x}>
                    {launch.payloads.map((payload, y) => (
                        <div className = "discoverResults" key = {y}>
                            <div className = "launchText">
                                <div className = "launchIconContainer">
                                    <img className = "launchIconSrc" src = {launch.links.mission_patch} alt = "patch"/>
                                </div>
                                <div className = "rocketInfo">
                                    <span className = "heading5 rocketName">{launch.rocket.rocket_name}&nbsp;-&nbsp;</span><span className = "heading5 rocketType">{payload.payload_id}</span>
                                    <br/>
                                        <span className = "rocketDateLabel bodytext">Launched <b>{launch.launch_date_local}</b> from <span>{launchPads.filter((launchpad) => launch?.launch_site?.site_id === launchpad?.id)[0]?.full_name}</span></span>
                                </div>
                                <div className = "flightNumberContainer">
                                    <span className = "heading5 flightNumber">#{launch.flight_number}</span>
                                    <br/>
                                    <span className = "rocketDateLabel bodytext">Flight Number</span>
                                </div>
                            </div>
                            <div className = "launchButtonContainer">
                                <a href =  {launch.links.reddit_campaign} target = "_blank" rel = "noreferrer">
                                    <button className = "launchButton bodytext">Reddit Campaign</button>
                                </a>
                                <a href =  {launch.links.reddit_launch} target = "_blank" rel = "noreferrer">
                                    <button className = "launchButton bodytext">Reddit Launch</button>
                                </a>
                                <a href =  {launch.links.reddit_media} target = "_blank" rel = "noreferrer">
                                    <button className = "launchButton bodytext">Reddit Media</button>
                                </a>
                                <a href =  {launch.links.presskit} target = "_blank" rel = "noreferrer">
                                    <button className = "launchButton bodytext">Press Kit</button>
                                </a>
                                <a href =  {launch.links.article_link} target = "_blank" rel = "noreferrer">
                                    <button className = "launchButton bodytext">Article</button>
                                </a>
                                <a href =  {launch.links.video_link} target = "_blank" rel = "noreferrer">
                                    <button className = "launchButton bodytext">Watch Video</button>
                                </a>  
                            </div>
                        </div>
                    ))}
                </div>
                ))}
                <div className = "backToTopContainer" onClick = { () => handleClick() }><span>Back to top</span></div>
                
            </div>
        </>
    );
}
export default Discover;
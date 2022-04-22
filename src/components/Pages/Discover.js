import React, { useState } from "react";
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
                            <input id = "keyword" type = "text" />
                        </div>
                        <div className = "discoverSearchInput">
                            <label for = "launchpad" className = "discoverLabel bodytext">Launchpad</label>
                            <input id = "launchpad" type = "text" />
                        </div>
                        <div className = "discoverSearchInput">
                            <label for = "minyear" className = "discoverLabel bodytext">Min. Year</label>
                            <input id = "minyear" type = "text" />
                        </div>
                        <div className = "discoverSearchInput">
                            <label for = "maxyear" className = "discoverLabel bodytext">Max. Year</label>
                            <input id = "maxyear" type = "text" />
                        </div>
                        <button className = "discoverApplyButton bodytext">Apply</button>
                    </div>
                </div>
                <div className = "discoverResults">
                    
                </div>
            </div>
        </>
    );
}
export default Discover;
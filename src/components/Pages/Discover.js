import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import "./styles/discover.css";
import logo from "../../assets/destination/logo.svg";
import {} from "react-dom/test-utils";
import { MissionCard as Card } from "./elements/MissionCard.js";
import { MissionSearch as Search } from "./elements/MissionSearch.js";
import chevronImg from "../../assets/destination/down-chevron.svg";
import { years as yearList } from "../../data/years.js";

const Discover = () => {
  //setup APIs
  //npx json-server -p 3500 -w src/data/launches.json
  //npx json-server -p 3600 -w src/data/launchpads.json

  const LAUNCH_URL = "http://localhost:3500/launches";
  const LAUNCHPAD_URL = "http://localhost:3600/launchpads";
  const [launches, setLaunches] = useState([]);
  const [launchPads, setLaunchPads] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);

  //get launch API Response

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await fetch(LAUNCH_URL);
        const listLaunches = await response.json();
        setLaunches(listLaunches);
        setFilteredLaunches(listLaunches);
      } catch (err) {
        console.log(err.stack);
      }
    };
    (async () => await fetchLaunches())();
  }, []);

  //get launchpad API Response

  useEffect(() => {
    const fetchLaunchPads = async () => {
      try {
        const responseLP = await fetch(LAUNCHPAD_URL);
        const listLaunchPads = await responseLP.json();
        setLaunchPads(listLaunchPads);
      } catch (err) {
        console.log(err.stack);
      }
    };
    (async () => await fetchLaunchPads())();
  }, []);

  //scroll to search component

  let launchRef = useRef();

  function handleClick(ref) {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  //keyword filter

  const [keyword, setKeyword] = useState("");
  const [lpFilter, setLpFilter] = useState("");
  const [minYearFilter, setMinYearFilter] = useState(0);
  const [maxYearFilter, setMaxYearFilter] = useState(3000);
  const [maxYearValue, setMaxYearValue] = useState();
  const [minYearValue, setMinYearValue] = useState();

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleLPChange = (event) => {
    setLpFilter(event.target.value);
  };
  const handleMinYearChange = (event) => {
    setMinYearFilter(event.target.value);
    setMinYearValue(event.target.value);
    if (event.target.value > maxYearFilter) {
      setMaxYearValue("--");
      setMaxYearFilter(3000);
    }
  };

  const handleMaxYearChange = (event) => {
    setMaxYearFilter(event.target.value);
    setMaxYearValue(event.target.value);
    if (event.target.value < minYearFilter) {
      setMinYearValue("--");
      setMinYearFilter(0);
    }
  };

  //APPLY SEARCH ON CLICK

  const handleApply = () => {
    //lowercase keywords
    const lowercasedKeyword = keyword.toString().toLowerCase();
    const lowercasedLpFilter = lpFilter.toString().toLowerCase();

    const tempFilteredLaunches = launches.filter((launch) => {
      //convert dates to year
      var rawDate = new Date(launch.launch_date_local);
      var rawYear = rawDate.getFullYear();

      return (
        //KEYWORD FILTER
        //check launch array
        (Object.keys(launch).some(
          (key) =>
            typeof launch[key] === "string" &&
            launch[key].toLowerCase().includes(lowercasedKeyword)
        ) ||
          //check rocket attributes
          Object.keys(launch.rocket).some(
            (key) =>
              typeof launch.rocket[key] === "string" &&
              launch.rocket[key].toLowerCase().includes(lowercasedKeyword)
          ) ||
          //check payloads
          Object.keys(launch.payloads).some(
            (key) =>
              typeof launch.payloads[key] === "string" &&
              launch.payloads[key].toLowerCase().includes(lowercasedKeyword)
          ) ||
          //check launchpads while matching with launchpad API
          Object.keys(launch.launch_site).some(
            (key) =>
              typeof launch.launch_site[key] === "string" &&
              launchPads
                .filter(
                  (launchpad) => launch?.launch_site?.site_id === launchpad?.id
                )[0]
                ?.full_name.toLowerCase()
                .includes(lowercasedKeyword)
          )) &&
        //LAUNCHPAD FILTER
        //check launchpads via launchpad filter
        Object.keys(launch.launch_site).some(
          (key) =>
            typeof launch.launch_site[key] === "string" &&
            launchPads
              .filter(
                (launchpad) => launch?.launch_site?.site_id === launchpad?.id
              )[0]
              ?.full_name.toLowerCase()
              .includes(lowercasedLpFilter)
        ) &&
        //YEAR FILTER
        //min year
        Object.keys(launch.launch_date_local).some(
          () => rawYear >= minYearFilter
        ) &&
        //max year
        Object.keys(launch.launch_date_local).some(
          () => rawYear <= maxYearFilter
        )
      );
    });

    setFilteredLaunches(tempFilteredLaunches);
  };

  //get no. of missions
  var noOfMissions = filteredLaunches.length;

  const isSuccessful = (bool) => {
    if (bool === false) {
      return (
        <>
          <br />
          <span className="heading5 launchSuccess">Failed Mission</span>
        </>
      );
    }
  };

  const displayImg = (imgsrc) => {
    return (
      <div className="launchIconContainer">
        <img
          className="launchIconSrc"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = logo;
          }}
          src={imgsrc}
          alt="patch"
        />
      </div>
    );
  };
  const displayImgMob = (imgsrc) => {
    return (
      <div className="launchIconContainerMob">
        <img
          className="launchIconSrc"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = logo;
          }}
          src={imgsrc}
          alt="patch"
        />
      </div>
    );
  };

  const hasImg = (x) => {
    return displayImg(x.links.mission_patch);
  };
  const hasImgMob = (x) => {
    return displayImgMob(x.links.mission_patch);
  };

  const hasRedditCampaign = (x) => {
    if (
      x.links.hasOwnProperty("reddit_campaign") === true &&
      x.links.reddit_campaign !== null
    ) {
      return (
        <a href={x.links.reddit_campaign} target="_blank" rel="noreferrer">
          <button className="launchButton bodytext">Reddit Campaign</button>
        </a>
      );
    }
  };
  const hasRedditLaunch = (x) => {
    if (
      x.links.hasOwnProperty("reddit_launch") === true &&
      x.links.reddit_launch !== null
    ) {
      return (
        <a href={x.links.reddit_launch} target="_blank" rel="noreferrer">
          <button className="launchButton bodytext">Reddit Launch</button>
        </a>
      );
    }
  };
  const hasRedditMedia = (x) => {
    if (
      x.links.hasOwnProperty("reddit_media") === true &&
      x.links.reddit_media !== null
    ) {
      return (
        <a href={x.links.reddit_media} target="_blank" rel="noreferrer">
          <button className="launchButton bodytext">Reddit Media</button>
        </a>
      );
    }
  };
  const hasPresskit = (x) => {
    if (
      x.links.hasOwnProperty("presskit") === true &&
      x.links.presskit !== null
    ) {
      return (
        <a href={x.links.presskit} target="_blank" rel="noreferrer">
          <button className="launchButton bodytext">Presskit</button>
        </a>
      );
    }
  };
  const hasArticleLink = (x) => {
    if (
      x.links.hasOwnProperty("article_link") === true &&
      x.links.article_link !== null
    ) {
      return (
        <a href={x.links.article_link} target="_blank" rel="noreferrer">
          <button className="launchButton bodytext">Article</button>
        </a>
      );
    }
  };
  const hasVideoLink = (x) => {
    if (
      x.links.hasOwnProperty("video_link") === true &&
      x.links.video_link !== null
    ) {
      return (
        <a href={x.links.video_link} target="_blank" rel="noreferrer">
          <button className="launchButton bodytext">Video</button>
        </a>
      );
    }
  };
  //DISPLAY COMPONENTS
  return (
    <>
      <div className="subtitle heading5">
        <span className="number">04</span>&nbsp;REVISIT YOUR JOURNIES
      </div>
      <div className="discoverContainer">
        <div className="discoverText heading3">DISCOVER SPACE MISSIONS</div>
        <div className="discoverIcon">
          <img
            onClick={() => handleClick(launchRef)}
            className="discoverChevDownSrc"
            id="destImg"
            src={chevronImg}
            alt="chevron"
          />
        </div>
      </div>
      <div ref={launchRef}></div>
      <Search
        keywordChange={handleKeywordChange}
        launchpadChange={handleLPChange}
        launchpadList={launchPads.map((launchpad) => (
          <option value={launchpad.full_name}>{launchpad.full_name}</option>
        ))}
        minYrChange={handleMinYearChange}
        minYrValue={minYearValue}
        maxYrChange={handleMaxYearChange}
        maxYrValue={maxYearValue}
        years={yearList.map((year) => (
          <option value={year.minvalue}>{year.name}</option>
        ))}
        apply={handleApply}
      />
      <div className="noOfMissionsContainer bodytext">
        <span>Showing {noOfMissions} Missions</span>
      </div>
      {filteredLaunches.map((launch, x) => (
        <div>
          {launch.payloads.map((payload, y) => (
            <div className="discoverResults" key={"launch" + x + "payload" + y}>
              <Card
                key={y}
                missionPatch={hasImg(launch)}
                missionPatchMob={hasImgMob(launch)}
                successText={isSuccessful(launch.launch_success)}
                flightNumber={launch.flight_number}
                payloadID={payload.payload_id}
                rocketName={launch.rocket.rocket_name}
                launchDate={moment(launch.launch_date_local)
                  .utc()
                  .format("Do MMMM YYYY")}
                launchTime={moment(launch.launch_date_local)
                  .utc()
                  .format("H:mm")}
                launchLocation={
                  launchPads.filter(
                    (launchpad) =>
                      launch?.launch_site?.site_id === launchpad?.id
                  )[0]?.full_name
                }
                buttonRedditCamp={hasRedditCampaign(launch)}
                buttonRedditLaunch={hasRedditLaunch(launch)}
                buttonRedditMed={hasRedditMedia(launch)}
                buttonPresskit={hasPresskit(launch)}
                buttonArticle={hasArticleLink(launch)}
                buttonVideo={hasVideoLink(launch)}
              />
            </div>
          ))}
        </div>
      ))}
      <div className="backToTopContainer">
        <span onClick={() => handleClick(launchRef)}>Back to top</span>
      </div>
    </>
  );
};
export default Discover;

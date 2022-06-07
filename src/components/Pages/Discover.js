import React, { useEffect, useState, useRef } from "react";
import "./styles/discover.css";
import chevronImg from "../../assets/destination/down-chevron.svg";
import logo from "../../assets/destination/logo.svg";
import {} from "react-dom/test-utils";
import { MissionCard as Mission } from "./elements/MissionCard.js";

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

  //scroll to search container

  const launchRef = useRef(null);

  const handleClick = () => {
    launchRef.current.scrollIntoView({ behavior: "smooth" });
  };

  //keyword filter

  const yearList = [
    {
      name: "--",
      minvalue: 0,
      maxvalue: 3000,
    },
    {
      name: "2006",
      minvalue: 2006,
      maxvalue: 2006,
    },
    {
      name: "2007",
      minvalue: 2007,
      maxvalue: 2007,
    },
    {
      name: "2008",
      minvalue: 2008,
      maxvalue: 2008,
    },
    {
      name: "2009",
      minvalue: 2009,
      maxvalue: 2009,
    },
    {
      name: "2010",
      minvalue: 2010,
      maxvalue: 2010,
    },
    {
      name: "2011",
      minvalue: 2011,
      maxvalue: 2011,
    },
    {
      name: "2012",
      minvalue: 2012,
      maxvalue: 2012,
    },
    {
      name: "2013",
      minvalue: 2013,
      maxvalue: 2013,
    },
    {
      name: "2014",
      minvalue: 2014,
      maxvalue: 2014,
    },
    {
      name: "2015",
      minvalue: 2015,
      maxvalue: 2015,
    },
    {
      name: "2016",
      minvalue: 2016,
      maxvalue: 2016,
    },
    {
      name: "2017",
      minvalue: 2017,
      maxvalue: 2017,
    },
    {
      name: "2018",
      minvalue: 2018,
      maxvalue: 2018,
    },
    {
      name: "2019",
      minvalue: 2019,
      maxvalue: 2019,
    },
    {
      name: "2020",
      minvalue: 2020,
      maxvalue: 2020,
    },
    {
      name: "2021",
      minvalue: 2021,
      maxvalue: 2021,
    },
    {
      name: "2022",
      minvalue: 2022,
      maxvalue: 2022,
    },
  ];

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

  //convert date to readable string
  const convertDate = (dateTime) => {
    var rawDate = new Date(dateTime);
    var year = rawDate.getFullYear();
    var month = rawDate.getMonth() + 1;
    var day = rawDate.getDate();
    var hour = rawDate.getUTCHours();
    var minute = rawDate.getUTCMinutes();
    var convertedMonth;
    var convertedDay;
    var convertedHour;
    var convertedMinute;

    //convert month
    if (month === 1) {
      convertedMonth = "January";
    } else if (month === 2) {
      convertedMonth = "February";
    } else if (month === 3) {
      convertedMonth = "March";
    } else if (month === 4) {
      convertedMonth = "April";
    } else if (month === 5) {
      convertedMonth = "May";
    } else if (month === 6) {
      convertedMonth = "June";
    } else if (month === 7) {
      convertedMonth = "July";
    } else if (month === 8) {
      convertedMonth = "August";
    } else if (month === 9) {
      convertedMonth = "September";
    } else if (month === 10) {
      convertedMonth = "October";
    } else if (month === 11) {
      convertedMonth = "November";
    } else if (month === 12) {
      convertedMonth = "December";
    }

    //convert date
    if (day === 1) {
      convertedDay = "1st";
    } else if (day === 2) {
      convertedDay = "2nd";
    } else if (day === 3) {
      convertedDay = "3rd";
    } else if (day >= 4 && day <= 20) {
      convertedDay = day + "th";
    } else if (day === 21) {
      convertedDay = "21st";
    } else if (day === 22) {
      convertedDay = "22nd";
    } else if (day === 23) {
      convertedDay = "23rd";
    } else if (day >= 24 && day <= 30) {
      convertedDay = day + "th";
    } else if (day === 31) {
      convertedDay = "31st";
    }

    //convert minute
    if (minute <= 9) {
      convertedMinute = "0" + minute;
    } else convertedMinute = minute;

    //convert hour
    if (hour <= 9) {
      convertedHour = "0" + hour;
    } else convertedHour = hour;

    var convertedDate =
      convertedDay +
      " " +
      convertedMonth +
      " " +
      year +
      " at " +
      convertedHour +
      ":" +
      convertedMinute;
    return convertedDate;
  };

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

  return (
    <>
      <div className="subtitle heading5">
        <span className="number">04</span>&nbsp;REVISIT YOUR JOURNIES
      </div>
      <div className="discoverContainer">
        <div className="discoverText heading3">DISCOVER SPACE MISSIONS</div>
        <div className="discoverIcon">
          <img
            onClick={handleClick}
            className="discoverChevDownSrc"
            id="destImg"
            src={chevronImg}
            alt="chevron"
          />
        </div>
      </div>
      <div className="discoverSearch" ref={launchRef}>
        <div className="discoverInputContainer">
          <div className="discoverSearchInput">
            <label for="keyword" className="discoverLabel bodytext">
              Keywords
            </label>
            <input
              className="discoverTextBox"
              id="keyword"
              type="text"
              placeholder="eg Falcon"
              onChange={handleKeywordChange}
            />
          </div>
          <div className="discoverSearchInput">
            <label for="launchpad" className="discoverLabel bodytext">
              Launchpad
            </label>
            <select
              className="discoverTextBox"
              id="launchpad"
              type="text"
              onChange={handleLPChange}
            >
              {launchPads.map((launchpad) => (
                <option value={launchpad.full_name}>
                  {launchpad.full_name}
                </option>
              ))}
            </select>
          </div>
          <div className="discoverSearchInput">
            <label for="minyear" className="discoverLabel bodytext">
              Min&nbsp;Year
            </label>
            <select
              className="discoverTextBox"
              id="minyear"
              type="text"
              onChange={handleMinYearChange}
              value={minYearValue}
            >
              {yearList.map((year) => (
                <option value={year.minvalue}>{year.name}</option>
              ))}
            </select>
          </div>
          <div className="discoverSearchInput">
            <label for="maxyear" className="discoverLabel bodytext">
              Max&nbsp;Year
            </label>
            <select
              className="discoverTextBox"
              id="maxyear"
              type="text"
              onChange={handleMaxYearChange}
              value={maxYearValue}
            >
              {yearList.map((year) => (
                <option value={year.maxvalue}>{year.name}</option>
              ))}
            </select>
          </div>
          <div className="discoverButtonContainer">
            <span>&nbsp;</span>
            <br />
            <button
              className="discoverApplyButton bodytext"
              type="submit"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
        <div className="noOfMissionsContainer bodytext">
          <span>Showing {noOfMissions} Missions</span>
        </div>
        {filteredLaunches.map((launch, x) => (
          <div>
            {launch.payloads.map((payload, y) => (
              <div
                className="discoverResults"
                key={"launch" + x + "payload" + y}
              >
                <Mission
                  key={y}
                  missionPatch={hasImg(launch)}
                  missionPatchMob={hasImgMob(launch)}
                  successText={isSuccessful(launch.launch_success)}
                  flightNumber={launch.flight_number}
                  payloadID={payload.payload_id}
                  rocketName={launch.rocket.rocket_name}
                  launchDate={convertDate(launch.launch_date_local)}
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
        <div className="backToTopContainer" onClick={() => handleClick()}>
          <span>Back to top</span>
        </div>
      </div>
    </>
  );
};
export default Discover;

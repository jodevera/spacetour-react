import React, { useState } from "react";
import "./styles/destination.css";
import moonImg from "../../assets/destination/image-moon.png";
import marsImg from "../../assets/destination/image-mars.png";
import europaImg from "../../assets/destination/image-europa.png";
import titanImg from "../../assets/destination/image-titan.png";

const Destination = () => {
  const destObj = [
    {
      id: "moon",
      title: "MOON",
      image: moonImg,
      desc: "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
      avgTime: "384,400KM",
      eTT: "3 DAYS",
    },
    {
      id: "mars",
      title: "MARS",
      image: marsImg,
      desc: "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
      avgTime: "225 MIL. KM",
      eTT: "9 MONTHS",
    },
    {
      id: "europa",
      title: "EUROPA",
      image: europaImg,
      desc: "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
      avgTime: "628 MIL. KM",
      eTT: "3 YEARS",
    },
    {
      id: "titan",
      title: "TITAN",
      image: titanImg,
      desc: "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
      avgTime: "1.6 BIL. KM",
      eTT: "7 YEARS",
    },
  ];

  const [title, setTitle] = useState("MOON");
  const [img, setImg] = useState(moonImg);
  const [desc, setDesc] = useState(
    "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites."
  );
  const [avg, setAvg] = useState("384,400KM");
  const [ett, setEtt] = useState("3 DAYS");

  const selected = "destSelect";
  const unselected = "destUnselect";

  const [destMoonStatus, setDestMoonStatus] = useState(selected);
  const [destMarsStatus, setDestMarsStatus] = useState(unselected);
  const [destEuroStatus, setDestEuroStatus] = useState(unselected);
  const [destTitanStatus, setDestTitanStatus] = useState(unselected);

  const setDestination = (destination) => {
    const destTemp = destObj.find((x) => x.id === destination);
    setTitle(destTemp.title);
    setImg(destTemp.image);
    setDesc(destTemp.desc);
    setAvg(destTemp.avgTime);
    setEtt(destTemp.eTT);
    if (destination === "moon") {
      setDestMoonStatus(selected);
      setDestMarsStatus(unselected);
      setDestEuroStatus(unselected);
      setDestTitanStatus(unselected);
    } else if (destination === "mars") {
      setDestMoonStatus(unselected);
      setDestMarsStatus(selected);
      setDestEuroStatus(unselected);
      setDestTitanStatus(unselected);
    } else if (destination === "europa") {
      setDestMoonStatus(unselected);
      setDestMarsStatus(unselected);
      setDestEuroStatus(selected);
      setDestTitanStatus(unselected);
    } else if (destination === "titan") {
      setDestMoonStatus(unselected);
      setDestMarsStatus(unselected);
      setDestEuroStatus(unselected);
      setDestTitanStatus(selected);
    }
  };

  return (
    <>
      <div className="subtitle heading5">
        <span className="number">01</span>&nbsp;PICK YOUR DESTINATION
      </div>
      <div className="destinationContainer">
        <div className="destinationImage">
          <img
            className="destinationImgSrc"
            id="destImg"
            src={img}
            alt="Moon"
          />
        </div>
        <div className="destinationText">
          <div className="destinationButtons">
            <ul className="destinationNavLinks">
              <li
                onClick={() => setDestination("moon")}
                className={"destinationNavText " + destMoonStatus}
              >
                MOON
              </li>
              <li
                onClick={() => setDestination("mars")}
                className={"destinationNavText " + destMarsStatus}
              >
                MARS
              </li>
              <li
                onClick={() => setDestination("europa")}
                className={"destinationNavText " + destEuroStatus}
              >
                EUROPA
              </li>
              <li
                onClick={() => setDestination("titan")}
                className={"destinationNavText " + destTitanStatus}
              >
                TITAN
              </li>
            </ul>
          </div>
          <div className="destinationName heading2">{title}</div>
          <div className="destinationDesc bodytext">{desc}</div>
          <div className="horizontal-line">
            <hr />
          </div>
          <div className="destinationStats">
            <div className="destinationAvgDist">
              <span className="destinationLabel subheading2">
                AVG. DISTANCE
              </span>
              <span id="destAve" className="destinationVal subheading1">
                {avg}
              </span>
            </div>
            <div className="destinationETT">
              <span className="destinationLabel subheading2">
                EST. TRAVEL TIME
              </span>
              <span id="destTravel" className="destinationVal subheading1">
                {ett}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Destination;

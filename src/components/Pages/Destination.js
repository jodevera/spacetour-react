import React, { useState } from "react";
import "./styles/destination.css";
import { destinations as destObj } from "../../data/destinations.js";


const Destination = () => {

  //set default destination to be displayed
  const defaultDestination = destObj.find( ({ id }) => id === "moon");

  const [title, setTitle] = useState(defaultDestination.title);
  const [img, setImg] = useState(defaultDestination.image);
  const [desc, setDesc] = useState(defaultDestination.desc);
  const [avg, setAvg] = useState(defaultDestination.avgTime);
  const [ett, setEtt] = useState(defaultDestination.eTT);

  const selected = "destSelect";
  const unselected = "destUnselect";

  const [destMoonStatus, setDestMoonStatus] = useState(selected);
  const [destMarsStatus, setDestMarsStatus] = useState(unselected);
  const [destEuroStatus, setDestEuroStatus] = useState(unselected);
  const [destTitanStatus, setDestTitanStatus] = useState(unselected);

  const setDestination = (destination) => {
    //set temp to match destination with an element
    const destTemp = destObj.find( (x) => x.id === destination);

    setTitle(destTemp.title);
    setImg(destTemp.image);
    setDesc(destTemp.desc);
    setAvg(destTemp.avgTime);
    setEtt(destTemp.eTT);

    switch (destination) {
      case "moon":
        setDestMoonStatus(selected);
        setDestMarsStatus(unselected);
        setDestEuroStatus(unselected);
        setDestTitanStatus(unselected);
        break;
      case "mars":
        setDestMoonStatus(unselected);
        setDestMarsStatus(selected);
        setDestEuroStatus(unselected);
        setDestTitanStatus(unselected);
        break;
      case "europa":
        setDestMoonStatus(unselected);
        setDestMarsStatus(unselected);
        setDestEuroStatus(selected);
        setDestTitanStatus(unselected);
        break
      case "titan":
        setDestMoonStatus(unselected);
        setDestMarsStatus(unselected);
        setDestEuroStatus(unselected);
        setDestTitanStatus(selected);
        break;
      default:
        setDestMoonStatus(selected);
        setDestMarsStatus(unselected);
        setDestEuroStatus(unselected);
        setDestTitanStatus(unselected);
        break;
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
            alt={title}
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

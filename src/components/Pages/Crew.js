import React, { useState } from "react";
import "./styles/crew.css";
import { crewMembers as crewObj } from "../../data/crews.js"


const Crew = () => {
  
  //set default crew to be displayed
  const defaultCrew = crewObj.find( ({ id }) => id === "douglas");

  const [name, setName] = useState(defaultCrew.name);
  const [img, setImg] = useState(defaultCrew.image);
  const [pos, setPos] = useState(defaultCrew.position);
  const [desc, setDesc] = useState(defaultCrew.desc);

  const selected = "crewSelect";
  const unselected = "crewUnselect";

  const [crewDougStatus, setCrewDougStatus] = useState(selected);
  const [crewMarkStatus, setCrewMarkStatus] = useState(unselected);
  const [crewVictStatus, setCrewVictStatus] = useState(unselected);
  const [crewAnouStatus, setCrewAnouStatus] = useState(unselected);

  const setCrew = (crew) => {

    const crewTemp = crewObj.find((x) => x.id === crew);

    setName(crewTemp.name);
    setImg(crewTemp.image);
    setPos(crewTemp.position);
    setDesc(crewTemp.desc);
    switch (crew) {
      case "douglas":
        setCrewDougStatus(selected);
        setCrewMarkStatus(unselected);
        setCrewVictStatus(unselected);
        setCrewAnouStatus(unselected);
        break;
      case "mark":
        setCrewDougStatus(unselected);
        setCrewMarkStatus(selected);
        setCrewVictStatus(unselected);
        setCrewAnouStatus(unselected);
        break;
      case "victor":
        setCrewDougStatus(unselected);
        setCrewMarkStatus(unselected);
        setCrewVictStatus(selected);
        setCrewAnouStatus(unselected);
        break;
      case "anousheh":
        setCrewDougStatus(unselected);
        setCrewMarkStatus(unselected);
        setCrewVictStatus(unselected);
        setCrewAnouStatus(selected);
        break;
      default:
        setCrewDougStatus(selected);
        setCrewMarkStatus(unselected);
        setCrewVictStatus(unselected);
        setCrewAnouStatus(unselected);
        break;
    }
  };

  return (
    <>
      <div className="subtitle heading5">
        <span className="number">02</span>&nbsp;MEET YOUR CREW
      </div>
      <div className="crewContainer">
        <div className="crewText">
          <div className="crewTitle heading4">{pos}</div>
          <div className="crewName heading3">{name}</div>
          <div className="crewDesc bodytext">{desc}</div>
          <div className="crewButtons">
            <div
              className={"circle " + crewDougStatus}
              onClick={() => setCrew("douglas")}
            ></div>
            <div
              className={"circle " + crewMarkStatus}
              onClick={() => setCrew("mark")}
            ></div>
            <div
              className={"circle " + crewVictStatus}
              onClick={() => setCrew("victor")}
            ></div>
            <div
              className={"circle " + crewAnouStatus}
              onClick={() => setCrew("anousheh")}
            ></div>
          </div>
        </div>
        <div className="crewImage">
          <img className="crewImgSrc" id="crewImg" src={img} alt="Moon" />
        </div>
      </div>
    </>
  );
};

export default Crew;

import React, { useState, useEffect } from "react";
import "./styles/tech.css";
import { technologies as techObj } from "../../data/technologies.js";


const Technology = () => {
  //set default tech to be displayed
  const defaultTech = techObj.find( ({ id }) => id === "vehicle");

  const [title, setTitle] = useState(defaultTech.title);
  const [imgPort, setImgPort] = useState(defaultTech.portImage);
  const [imgLand, setImgLand] = useState(defaultTech.landImage);
  const [desc, setDesc] = useState(defaultTech.desc);

  const selected = "techSelect";
  const unselected = "techUnselect";

  const [techVehicleStatus, setTechVehicleStatus] = useState(selected);
  const [techSpaceportStatus, setTechSpaceportStatus] = useState(unselected);
  const [techCapsuleStatus, setTechCapsuleStatus] = useState(unselected);

  const setTech = (tech) => {
    
    const techTemp = techObj.find((x) => x.id === tech);

    setTitle(techTemp.title);
    setImgPort(techTemp.portImage);
    setImgLand(techTemp.landImage);
    setDesc(techTemp.desc);

    switch (tech) {
      case "vehicle":
        setTechVehicleStatus(selected);
        setTechSpaceportStatus(unselected);
        setTechCapsuleStatus(unselected);
        break;
      case "spaceport":
        setTechVehicleStatus(unselected);
        setTechSpaceportStatus(selected);
        setTechCapsuleStatus(unselected);
        break;
      case "capsule":
        setTechVehicleStatus(unselected);
        setTechSpaceportStatus(unselected);
        setTechCapsuleStatus(selected);
        break;
      default:
        setTechVehicleStatus(selected);
        setTechSpaceportStatus(unselected);
        setTechCapsuleStatus(unselected);
        break;
    }
  };

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

  const [landStatus, setLandStatus] = useState();
  const [portStatus, setPortStatus] = useState();

  useEffect(() => {
    const hideImg = {
        display: "none",
      };
      const showImg = {
        display: "block",
      };
    if (windowSize.width <= "1024") {
      setLandStatus(showImg);
      setPortStatus(hideImg);
    } else if (windowSize.width > "1024") {
      setLandStatus(hideImg);
      setPortStatus(showImg);
    }
  }, [windowSize]);

  return (
    <>
      <div className="subtitle heading5">
        <span className="number">03</span>&nbsp;SPACE LAUNCH 101
      </div>
      <div className="techContainer">
        <div className="techButtonsAndText">
          <div className="techButtons">
            <div
              className={"techButton heading4 " + techVehicleStatus}
              onClick={() => setTech("vehicle")}
            >
              1
            </div>
            <div
              className={"techButton heading4 " + techSpaceportStatus}
              onClick={() => setTech("spaceport")}
            >
              2
            </div>
            <div
              className={"techButton heading4 " + techCapsuleStatus}
              onClick={() => setTech("capsule")}
            >
              3
            </div>
          </div>
          <div className="techText">
            <div className="techSub bodytext">THE TECHNOLOGY...</div>
            <div className="techName heading3">{title}</div>
            <div className="techDesc bodytext">{desc}</div>
          </div>
        </div>
        <div className="techImage">
          <img
            style={portStatus}
            className="techImgPortSrc"
            id="techImg"
            src={imgPort}
            alt="techimage"
          />
          <img
            style={landStatus}
            className="techImgLandSrc"
            id="techImg"
            src={imgLand}
            alt="techimage"
          />
        </div>
      </div>
    </>
  );
};

export default Technology;

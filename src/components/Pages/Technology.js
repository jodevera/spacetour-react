import React, { useState, useEffect } from "react";
import './styles/destination.css';

import './styles/tech.css';
import capsuleImgLand from '../../assets/destination/image-space-capsule-landscape.jpg';
import capsuleImgPort from '../../assets/destination/image-space-capsule-portrait.jpg';
import spaceportImgLand from '../../assets/destination/image-spaceport-landscape.jpg';
import spaceportImgPort from '../../assets/destination/image-spaceport-portrait.jpg';
import vehicleImgLand from '../../assets/destination/image-launch-vehicle-landscape.jpg';
import vehicleImgPort from '../../assets/destination/image-launch-vehicle-portrait.jpg';

const Technology = () => {
    const techObj = [
        { id: 'vehicle', title: 'LAUNCH VEHICLE', landImage: vehicleImgLand, portImage: vehicleImgPort, desc: "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!" },
        { id: 'spaceport', title: 'SPACEPORT', landImage: spaceportImgLand, portImage: spaceportImgPort, desc: "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch." },
        { id: 'capsule', title: 'SPACE CAPSULE', landImage: capsuleImgLand, portImage: capsuleImgPort, desc: "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained." }
    ]
    
    const [title, setTitle] = useState("LAUNCH VEHICLE");
    const [imgPort, setImgPort] = useState(vehicleImgPort);
    const [imgLand, setImgLand] = useState(vehicleImgLand);
    const [desc, setDesc] = useState("A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!");

    const selected = "techSelect";
    const unselected = "techUnselect";

    const [techVehicleStatus, setTechVehicleStatus] = useState(selected);
    const [techSpaceportStatus, setTechSpaceportStatus] = useState(unselected);
    const [techCapsuleStatus, setTechCapsuleStatus] = useState(unselected);

    const setTech = (tech) => {
        const techTemp = techObj.find(x => x.id === tech);
        setTitle(techTemp.title);
        setImgPort(techTemp.portImage);
        setImgLand(techTemp.landImage);
        setDesc(techTemp.desc);
        if (tech === "vehicle") {
            setTechVehicleStatus(selected);
            setTechSpaceportStatus(unselected);
            setTechCapsuleStatus(unselected);
        } else if (tech === "spaceport") {
            setTechVehicleStatus(unselected);
            setTechSpaceportStatus(selected);
            setTechCapsuleStatus(unselected);
        } else if (tech === "capsule") {
            setTechVehicleStatus(unselected);
            setTechSpaceportStatus(unselected);
            setTechCapsuleStatus(selected);
        }
    };

    const hideImg = {
        display: 'none'
    }
    const showImg = {
        display: 'block'
    }

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

    const [landStatus, setLandStatus] = useState();
    const [portStatus, setPortStatus] = useState();

    useEffect(() => {
        
        if (windowSize.width <= '1024') {
            setLandStatus(showImg);
            setPortStatus(hideImg);
        }
        else if (windowSize.width > '1024') {
            setLandStatus(hideImg);
            setPortStatus(showImg);
        }
        
    },[windowSize]);

    return (
        <>
            <div className = "subtitle heading5"><span className = "number">03</span>&nbsp;SPACE LAUNCH 101</div>
            <div className = "techContainer">
                <div className = "techButtonsAndText">
                    <div className = "techButtons">
                        <div className = {"techButton heading4 " + techVehicleStatus} onClick = { () => setTech("vehicle") }>1</div>
                        <div className = {"techButton heading4 " + techSpaceportStatus} onClick = { () => setTech("spaceport") }>2</div>
                        <div className = {"techButton heading4 " + techCapsuleStatus} onClick = { () => setTech("capsule") }>3</div>
                    </div>
                    <div className  = "techText">
                        <div className = 'techSub bodytext'>THE TECHNOLOGY...</div>
                        <div className = 'techName heading3'>{title}</div>
                        <div className = 'techDesc bodytext'>{desc}</div>
                    </div>
                </div>
                <div className = "techImage">
                    <img style = {portStatus} className = "techImgPortSrc" id = "techImg" src = {imgPort} alt = "techimage" />
                    <img style = {landStatus} className = "techImgLandSrc" id = "techImg" src = {imgLand} alt = "techimage" />
                </div>
            </div>
            
        </>

    );
};

export default Technology;
import React, { useState, useEffect } from "react";
import './styles/destination.css';

import './styles/crew.css';
import anoImg from '../../assets/destination/image-anousheh-ansari.png';
import dougImg from '../../assets/destination/image-douglas-hurley.png';
import markImg from '../../assets/destination/image-mark-shuttleworth.png';
import vicImg from '../../assets/destination/image-victor-glover.png';

const Crew = () => {
    const crewObj = [
        { id: 'douglas', name: 'DOUGLAS HURLEY', image: dougImg, desc: 'Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.', position: 'COMMANDER' },
        { id: 'mark', name: 'MARK SHUTTLEWORTH', image: markImg, desc: 'Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.', position: 'FLIGHT ENGINEER' },
        { id: 'victor', name: 'VICTOR GLOVER', image: vicImg, desc: 'Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.', position: 'PILOT' }, 
        { id: 'anousheh', name: 'ANOUSHEH ANSARI', image: anoImg, desc: 'Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.', position: 'MISSION SPECIALIST' } 
    ]
    
    const [name, setName] = useState('DOUGLAS HURLEY');
    const [img, setImg] = useState(dougImg);
    const [pos, setPos] = useState('COMMANDER');
    const [desc, setDesc] = useState('Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.');

    const selected = "crewSelect";
    const unselected = "crewUnselect";

    const [crewDougStatus, setCrewDougStatus] = useState(selected);
    const [crewMarkStatus, setCrewMarkStatus] = useState(unselected);
    const [crewVictStatus, setCrewVictStatus] = useState(unselected);
    const [crewAnouStatus, setCrewAnouStatus] = useState(unselected);
    
    const setCrew= (crew) => {
        const crewTemp = crewObj.find(x => x.id === crew);
        setName(crewTemp.name);
        setImg(crewTemp.image);
        setPos(crewTemp.position);
        setDesc(crewTemp.desc);
        if (crew === "douglas") {
            setCrewDougStatus(selected);
            setCrewMarkStatus(unselected);
            setCrewVictStatus(unselected);
            setCrewAnouStatus(unselected);
        } else if (crew === "mark") {
            setCrewDougStatus(unselected);
            setCrewMarkStatus(selected);
            setCrewVictStatus(unselected);
            setCrewAnouStatus(unselected);
        } else if (crew === "victor") {
            setCrewDougStatus(unselected);
            setCrewMarkStatus(unselected);
            setCrewVictStatus(selected);
            setCrewAnouStatus(unselected);
        } else if (crew === "anousheh") {
            setCrewDougStatus(unselected);
            setCrewMarkStatus(unselected);
            setCrewVictStatus(unselected);
            setCrewAnouStatus(selected);
        }
    };
    

    return (
        <>
            <div className = "subtitle heading5"><span className = "number">02</span>&nbsp;MEET YOUR CREW</div>
            <div className = "crewContainer">
                <div className  = "crewText">
                    <div className = 'crewTitle heading4'>{pos}</div>
                    <div className = 'crewName heading3'>{name}</div>
                    <div className = 'crewDesc bodytext'>{desc}</div>
                    <div className = "crewButtons">
                        <div className = {"circle " + crewDougStatus} onClick = { () => setCrew("douglas") }>
                        </div>
                        <div className = {"circle " + crewMarkStatus} onClick = { () => setCrew("mark") }>
                        </div>
                        <div className = {"circle " + crewVictStatus} onClick = { () => setCrew("victor") }>
                        </div>
                        <div className = {"circle " + crewAnouStatus} onClick = { () => setCrew("anousheh") }>
                        </div>
                    </div>
                </div>
                <div className = "crewImage">
                    <img className = "crewImgSrc" id = "crewImg" src = {img} alt = "Moon" />
                </div>
            </div>
            
        </>

    );
};

export default Crew;
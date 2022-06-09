import capsuleImgLand from "../assets/destination/image-space-capsule-landscape.jpg";
import capsuleImgPort from "../assets/destination/image-space-capsule-portrait.jpg";
import spaceportImgLand from "../assets/destination/image-spaceport-landscape.jpg";
import spaceportImgPort from "../assets/destination/image-spaceport-portrait.jpg";
import vehicleImgLand from "../assets/destination/image-launch-vehicle-landscape.jpg";
import vehicleImgPort from "../assets/destination/image-launch-vehicle-portrait.jpg";

export const technologies = [
  {
    id: "vehicle",
    title: "LAUNCH VEHICLE",
    landImage: vehicleImgLand,
    portImage: vehicleImgPort,
    desc: "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
  },
  {
    id: "spaceport",
    title: "SPACEPORT",
    landImage: spaceportImgLand,
    portImage: spaceportImgPort,
    desc: "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
  },
  {
    id: "capsule",
    title: "SPACE CAPSULE",
    landImage: capsuleImgLand,
    portImage: capsuleImgPort,
    desc: "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
  },
];
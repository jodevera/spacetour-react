import moonImg from "../assets/destination/image-moon.png";
import marsImg from "../assets/destination/image-mars.png";
import europaImg from "../assets/destination/image-europa.png";
import titanImg from "../assets/destination/image-titan.png";

export const destinations = [
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

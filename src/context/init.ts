import { createContext } from 'react';
import image1 from '../assets/Levels/1/LVL-1.jpg';
import lvl1Target1Gta from '../assets/Levels/1/targets/Gta.png';
import lvl1Target2Kratos from '../assets/Levels/1/targets/Kratos.png';
import lvl1Target3PrinceOfPersia from '../assets/Levels/1/targets/PrinceOfPersia.png';
import lvl2Target2Kirby from '../assets/Levels/1/targets/Kirby.webp';
import level2 from '../assets/Levels/2/LVL-2.jpg';
import lvl2Target1Fox from '../assets/Levels/2/targets/Fox.webp';
import lvl2Target2Bomb from '../assets/Levels/2/targets/Bomb.webp';
import level3 from '../assets/Levels/3/LVL-3.jpg';
import lvl3Target1Crash from '../assets/Levels/3/targets/Crash.webp';
import lvl3Target2LaraCroft from '../assets/Levels/3/targets/LaraCroft.png';
import lvl3Target3Spyro from '../assets/Levels/3/targets/Spyro.webp';

const ImagesContext = createContext([
  {
    image: image1,
    alt: 'Playstation 2 theme level',
    id: 1,
    dimensions: { width: 1082, height: 1600 },
    highScore: 0,
    targets: [
      { x: 727, y: 851, image: lvl1Target1Gta, found: false },
      { x: 258, y: 854, image: lvl1Target2Kratos, found: false },
      { x: 840, y: 679, image: lvl1Target3PrinceOfPersia, found: false },
    ],
  },
  {
    image: level2,
    alt: 'Nintendo theme level',
    id: 2,
    dimensions: { width: 1082, height: 1600 },
    highScore: 0,
    targets: [
      { x: 163, y: 635, image: lvl2Target1Fox, found: false },
      { x: 774, y: 1005, image: lvl2Target2Bomb, found: false },
      { x: 915, y: 1108, image: lvl2Target2Kirby, found: false },
    ],
  },
  {
    image: level3,
    alt: 'Playstation theme level',
    id: 3,
    dimensions: { width: 1082, height: 1600 },
    highScore: 0,
    targets: [
      { x: 610, y: 950, image: lvl3Target1Crash, found: false },
      { x: 358, y: 830, image: lvl3Target2LaraCroft, found: false },
      { x: 172, y: 580, image: lvl3Target3Spyro, found: false },
    ],
  },
]);

export default ImagesContext;

import { createContext } from 'react';
import image1 from '../assets/Levels/1/LVL-1.jpg';
import lvl1Target1Toad from '../assets/Levels/1/targets/Toad.webp';
import lvl1Target2Kirby from '../assets/Levels/1/targets/Kirby.webp';
import lvl1TargetDiddyKong from '../assets/Levels/1/targets/DiddyKong.webp';

const ImagesContext = createContext([
  {
    image: image1,
    alt: 'Nintendo theme level',
    id: 1,
    dimensions: { width: 1080, height: 2340 },
    targets: [
      { x: 378, y: 1410 },
      { x: 170, y: 1070 },
      { x: 510, y: 1351 },
    ],
    targetImages: [lvl1Target1Toad, lvl1Target2Kirby, lvl1TargetDiddyKong],
  },
]);

export default ImagesContext;

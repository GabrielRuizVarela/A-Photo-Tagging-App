import { createContext } from 'react';
import image1 from '../assets/pierre-roussel-wii-phone2.jpg';

const ImagesContext = createContext([
  {
    image: image1,
    id: 1,
    dimensions: { width: 1080, height: 2340 },
    targets: [{ x: 208, y: 714 }, { x: 405, y: 509 }],
  },
]);

export default ImagesContext;

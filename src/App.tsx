/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import './App.css';
import styled from 'styled-components';
import ImagesContext from './context/init';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
// interface ContextInterface {
//   image: string;
//   dimensions: {
//     width: number;
//     height: number;
//   };
//   targets: {
//     x: number;
//     y: number;
//   }[];
// }

const getNormalizeTargetCoord = (
  e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  targets: { x: number; y: number }[],
  dimensions: { width: number; height: number },
) =>
  targets.map((target) => ({
    x: (target.x * e.currentTarget.width) / dimensions.width,
    y: (target.y * e.currentTarget.height) / dimensions.height,
  }));

const getClickCoord = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
  const { x, y } = e.currentTarget.getBoundingClientRect();
  const elementX = e.clientX - x;
  const elementY = e.clientY - y;
  return { x: elementX, y: elementY };
};

const checkIfMatch = (
  clickCoord: { x: number; y: number },
  targets: { x: number; y: number }[],
) =>
  targets.some((target) => {
    const tolerance = 0.1;
    return (
      Math.abs(target.x - clickCoord.x) < target.x * tolerance &&
      Math.abs(target.y - clickCoord.y) < target.y * tolerance
    );
  });

function App() {
  const images = useContext(ImagesContext);
  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const normalizeTargetCoord = getNormalizeTargetCoord(
      e,
      images[0].targets,
      images[0].dimensions,
    );

    const clickCoord = getClickCoord(e);
    
    console.log(checkIfMatch(clickCoord, normalizeTargetCoord));
  };

  return (
    <div className="App">
      <StyledImage
        src={images[0].image}
        alt="image"
        onClick={(event) => {
          handleClick(event);
        }}
      />
      {/* <img src={images} alt="pierre-roussel-wii-phone2" onClick={handleClick} /> */}
    </div>
  );
}

export default App;

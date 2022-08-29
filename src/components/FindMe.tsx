import React, { useState } from 'react';
import styled from 'styled-components';
import ClickBox from './ClickBox';

const StyledImage = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

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

function FindMe({
  image,
  targets,
  dimensions,
  targetImages,
}: {
  image: string;
  targets: { x: number; y: number }[];
  dimensions: { width: number; height: number };
  targetImages: string[];
}) {
  const [clickBoxVisible, setClickBoxVisible] = useState(false);
  const [clickCoord, setClickCoord] = useState({ x: 0, y: 0 });
  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const normalizeTargetCoord = getNormalizeTargetCoord(
      e,
      targets,
      dimensions,
    );
    // if click outside of target, hide clickbox
    const clickOnImg = getClickCoord(e);
    if (checkIfMatch(clickOnImg, normalizeTargetCoord)) {
      setClickCoord(clickOnImg);
      setClickBoxVisible(true);
    } else {
      setClickBoxVisible(false);
    }
    console.log(checkIfMatch(clickOnImg, normalizeTargetCoord));
  };

  return (
    <>
      <StyledImage
        src={image}
        alt={image}
        onClick={(event) => {
          handleClick(event);
        }}
      />
      <ClickBox
        targetImages={targetImages}
        visible={clickBoxVisible}
        clickCoord={clickCoord}
      />
    </>
  );
}

export default FindMe;

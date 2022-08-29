import React, { useCallback, useState } from 'react';
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
  targets: { x: number; y: number; image: string }[],
  dimensions: { width: number; height: number },
) =>
  targets.map((target) => ({
    x: (target.x * e.currentTarget.width) / dimensions.width,
    y: (target.y * e.currentTarget.height) / dimensions.height,
    image: target.image,
  }));

const getClickCoord = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
  const { x, y } = e.currentTarget.getBoundingClientRect();
  const elementX = e.clientX - x;
  const elementY = e.clientY - y;
  return { x: elementX, y: elementY };
};

const checkMatch = (
  clickCoord: { x: number; y: number },
  targets: { x: number; y: number; image: string }[],
) =>
  targets.find((target) => {
    const tolerance = 0.1;
    return (
      Math.abs(target.x - clickCoord.x) < target.x * tolerance &&
      Math.abs(target.y - clickCoord.y) < target.y * tolerance
    );
  });

function FindMe({
  LvlImage,
  targets,
  dimensions,
}: {
  LvlImage: string;
  targets: { x: number; y: number; image: string }[];
  dimensions: { width: number; height: number };
}) {
  const [targetsState, setTargetsState] = useState(
    targets.map((target) => ({
      x: target.x,
      y: target.y,
      image: target.image,
      found: false,
    })),
  );
  const [clickBoxVisible, setClickBoxVisible] = useState(false);
  const [clickCoord, setClickCoord] = useState({ x: 100, y: 100, image: '' });

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const normalizeTargetCoord = getNormalizeTargetCoord(
      e,
      targetsState,
      dimensions,
    );
    const clickOnImg = getClickCoord(e);
    const match = checkMatch(clickOnImg, normalizeTargetCoord);
    // if click outside of e.currenttarget, hide clickbox
    // if (clickBoxRef.current !== e.currentTarget) {
      //   setClickBoxVisible(false);
      //   console.log('ref?');
    // }
    if (match) {
      setClickCoord(match);
      setClickBoxVisible(true);
    } else {
      setClickBoxVisible(false);
    }
  };

  const handleClickBox = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>) => {
      e.stopPropagation();
      if (e.currentTarget.id === clickCoord.image) {
        setTargetsState((prevState) =>
          prevState.map((target) => {
            if (target.image === clickCoord.image) {
              // console.log(target);
              return { ...target, found: true };
            }
            return target;
          }),
        );
      }
    },
    [clickCoord],
  );

  return (
    <>
      <StyledImage
        src={LvlImage}
        alt={LvlImage}
        onClick={(event) => {
          handleClick(event);
        }}
      />
      <ClickBox
        handleClickBox={handleClickBox}
        targets={targetsState}
        visible={clickBoxVisible}
        clickCoord={clickCoord}
      />
    </>
  );
}

export default FindMe;

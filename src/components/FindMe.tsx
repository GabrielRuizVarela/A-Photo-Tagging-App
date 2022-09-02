import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import ClickBox from './ClickBox';
import RightBar from './RightBar';
import LeftBar from './LeftBar';
import ImagesContext from '../context/init';

const StyledImage = styled(motion.img)`
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

function FindMe() {
  const images = useContext(ImagesContext);
  const { image, id, targets, dimensions } = images[0];

  const [targetsState, setTargetsState] = useState(targets);
  const [clickBoxVisible, setClickBoxVisible] = useState(false);
  const [clickCoord, setClickCoord] = useState({ x: 100, y: 100, image: '' });
  const [score, setScore] = useState(0);
  const [LvlImage, setLvlImage] = useState(image);

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

  const controls = useAnimationControls();

  const handleClickBox = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>) => {
      e.stopPropagation();
      if (e.currentTarget.id === clickCoord.image) {
        // if some match
        if (
          targetsState.find((target) => target.image === e.currentTarget.id)
        ) {
          setTargetsState((prevState) =>
            prevState.map((target) => {
              if (target.image === clickCoord.image) {
                setClickBoxVisible(false);
                return { ...target, found: true };
              }
              // todo: animate: shake clickbox if wrong target

              return target;
            }),
          );
        }
      } else {
        controls.start({
          x: [0, 5, -5, 5, -5, 5, -5, 0],
        });
      }
    },
    [clickCoord],
  );

  const controlImgAnimation = useAnimationControls();
  useEffect(() => {
    if (targetsState.every((target) => target.found)) {
      // stop timer
      controlImgAnimation.start({
        // border: '4px solid green',
        filter: 'hue-rotate(720deg)',
        transition: { duration: 1.5 },
      });
      const posibleScore = parseInt(
        document.getElementById('time')?.textContent || '0',
        10,
      );
      if (posibleScore > score) {
        setScore(posibleScore);
      }
    }
  }, [targetsState]);

  const [reset, setReset] = useState(false);
  const resetLevel = () => {
    setTargetsState(targets);
    setReset((prevState) => !prevState);
    controlImgAnimation.start({
      filter: 'hue-rotate(0deg)',
    });
  };

  const selectLevel = useCallback((e) => {
    const lvl = e.currentTarget.id;
    const lvlImage = images.find((img) => img.id === Number(lvl));
    console.log(lvlImage);
    if (lvlImage) {
      setLvlImage(lvlImage.image);
      setTargetsState(lvlImage.targets);
      setReset((prevState) => !prevState);
    }
  }, []);

  return (
    <>
      <LeftBar selectLevel={selectLevel} />
      <StyledImage
        onClick={(event) => {
          handleClick(event);
        }}
        animate={controlImgAnimation}
        src={LvlImage}
        alt={LvlImage}
      />
      <motion.div
        animate={controls}
        style={{ width: '100%', position: 'absolute' }}
      >
        <ClickBox
          handleClickBox={handleClickBox}
          targets={targetsState}
          visible={clickBoxVisible}
          clickCoord={clickCoord}
        />
      </motion.div>
      <RightBar
        targets={targetsState}
        score={score}
        reset={reset}
        selectLevel={selectLevel}
      />
      {targetsState.every((target) => target.found) && (
        <button
          type="button"
          onClick={resetLevel}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            padding: '1rem',
            borderRadius: '1rem',
            border: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
          }}
        >
          Reset Level
        </button>
      )}
    </>
  );
}

export default FindMe;

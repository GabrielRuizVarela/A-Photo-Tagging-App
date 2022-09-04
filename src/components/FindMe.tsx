import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion, useAnimationControls } from 'framer-motion';
import ClickBox from './ClickBox';
import RightBar from './RightBar';
import LeftBar from './LeftBar';
import ImagesContext from '../context/init';

const theme = [
  {
    // 53	47	124
    primary: 'white',
    secondary: 'rgb(53, 47, 124)',
  },
  {
    primary: 'white',
    secondary: 'rgb(178, 42, 40)',
  },
  {
    primary: 'white',
    secondary: 'rgb(202, 233, 234)',
  },
];

const StyledImage = styled(motion.img)`
  position: relative;
  /* z-index: 100; */
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  justify-self: center;
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
  const initContext = useContext(ImagesContext);

  const [levelState, setLevelState] = useState(initContext[0]);

  const [clickBoxVisible, setClickBoxVisible] = useState(false);
  const [clickCoord, setClickCoord] = useState({ x: 100, y: 100, image: '' });
  const [themeState, setThemeState] = useState(1);
  const [reset, setReset] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const index = initContext.filter((elem) => {
      if (elem.image === levelState.image) {
        return elem;
      }
    });
    const normalizeTargetCoord = getNormalizeTargetCoord(
      e,
      levelState.targets,
      index[0].dimensions,
    );
    const clickOnImg = getClickCoord(e);
    const match = checkMatch(clickOnImg, normalizeTargetCoord);
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
          levelState.targets.find(
            (target) => target.image === e.currentTarget.id,
          )
        ) {
          setLevelState((prevState) => {
            const newTargets = prevState.targets.map((target) => {
              if (target.image === clickCoord.image) {
                return { ...target, found: true };
              }
              return target;
            });
            return { ...prevState, targets: newTargets };
          });
          // setTargetsState((prevState) =>
          //   prevState.map((target) => {
          //     if (target.image === clickCoord.image) {
          //       setClickBoxVisible(false);
          //       return { ...target, found: true };
          //     }
          //     return target;
          //   }),
          // );
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
    if (levelState.targets.every((target) => target.found)) {
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
      if (posibleScore > levelState.highScore) {
        setLevelState((prevState) => ({
          ...prevState,
          highScore: posibleScore,
        }));
      }
    }
  }, [levelState.targets]);

  const resetLevel = () => {
    // setTargetsState(targets);
    // setLevelState(initContext[themeState - 1 || 0]);
    setLevelState((prevState) => ({
      ...prevState,
      targets: prevState.targets.map((target) => ({ ...target, found: false })),
    }));
    setReset((prevState) => !prevState);
    controlImgAnimation.start({
      filter: 'hue-rotate(0deg)',
    });
  };

  const selectLevel = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>) => {
      const lvl = Number(e.currentTarget.id);
      const lvlImage = initContext.find((img) => img.id === lvl);
      if (lvlImage) {
        setThemeState(Number(lvl));
        // setTargetsState(lvlImage.targets);
        setLevelState(initContext[lvl - 1]);
        setReset((prevState) => !prevState);
      }
    },
    [],
  );

  return (
    <ThemeProvider theme={theme[themeState - 1]}>
      <LeftBar selectLevel={selectLevel} />
      <StyledImage
        onClick={(event) => {
          handleClick(event);
        }}
        animate={controlImgAnimation}
        src={levelState.image}
        alt={levelState.image}
      />
      <motion.div
        animate={controls}
        style={{ width: '100%', position: 'absolute' }}
      >
        <ClickBox
          handleClickBox={handleClickBox}
          targets={levelState.targets}
          visible={clickBoxVisible}
          clickCoord={clickCoord}
        />
      </motion.div>
      <RightBar
        targets={levelState.targets}
        score={levelState.highScore}
        reset={reset}
      />
      {levelState.targets.every((target) => target.found) && (
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
    </ThemeProvider>
  );
}

export default FindMe;

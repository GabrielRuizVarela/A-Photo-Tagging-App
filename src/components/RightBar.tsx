import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import Timer from './Timer';

const StyledRightBar = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  width: 16%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  /* font-size: auto; */
  * {
    overflow-wrap: anywhere;
    font-size: 90%;
  }
  background-color: ${({ theme }) => theme.primary};
  img {
    width: 50%;
    height: auto;
    aspect-ratio: 1 / 1;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    font-size: 0.6rem;
    gap: 0.5rem;
    padding: 0.4rem;
    /* align-items: flex-start; */
    img {
      width: 20%;
    }
    p {
      text-align: center;
    }
    position: static;
    width: 100%;
    height: auto;
  }
`;

const StyledImg = styled(motion.img)<{ readonly found: boolean }>`
  opacity: ${({ found }) => (found ? '0.4' : '1')};
  transition: all 0.5s ease;
`;

interface RightBarInterface {
  readonly targets: { x: number; y: number; image: string; found: boolean }[];
  readonly score: number;
  readonly reset: boolean;
}

function RightBar(props: RightBarInterface) {
  const { targets, score, reset } = props;
  // if all target found then stop the timer
  const allFound = targets.every((target) => target.found);
  return (
    <StyledRightBar>
      <AnimatePresence>
        <p>Find Me: </p>
        {targets.map((target) => (
          <StyledImg
            found={target.found}
            key={target.image}
            id={target.image}
            src={target.image}
            alt={target.image}
            animate={{ y: 0, x: 0, transition: { duration: 0.2 } }}
            initial={{ y: '-100%' }}
          />
        ))}
        <Timer allFound={allFound} score={score} reset={reset} />
      </AnimatePresence>
    </StyledRightBar>
  );
}

export default RightBar;

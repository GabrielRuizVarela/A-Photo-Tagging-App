import React from 'react';
import styled from 'styled-components';
import Timer from './Timer';

const StyledRightBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${({ theme }) => theme.primary};
  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
  }
  `;

const StyledImg = styled.img<{ readonly found: boolean }>`
  opacity: ${({ found }) => (found ? '0.4' : '1')};
  transition: all 0.5s ease;
`;

interface RightBarInterface {
  readonly targets: { x: number; y: number; image: string; found: boolean }[];
}

function RightBar(props: RightBarInterface) {
  const { targets } = props;
  // if all target found then stop the timer
  const allFound = targets.every((target) => target.found);
  return (
    <StyledRightBar>
      <p>Find Me: </p>
      {targets.map((target) => (
        <StyledImg
          found={target.found}
          key={target.image}
          id={target.image}
          src={target.image}
          alt={target.image}
        />
      ))}
      <Timer allFound={allFound} />
    </StyledRightBar>
  );
}

export default RightBar;

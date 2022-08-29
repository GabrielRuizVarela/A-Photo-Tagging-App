import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface StyleClickBoxInterface {
  readonly visible: boolean;
  readonly clickCoord: { x: number; y: number };
}

const StyledClickBox = styled.div<StyleClickBoxInterface>`
  position: absolute;
  display: ${({ visible }) => (visible ? 'grid' : 'none')};
  /* grid-template-rows: auto; */
  /* grid-template-columns: 2rem; */
  width: 10%;
  height: auto;
  background-color: ${({ theme }) => theme.secondary};
  gap: 0.5rem;
  padding: 0.5rem;
  top: ${({ clickCoord }) => clickCoord.y}px;
  left: calc(${({ clickCoord }) => clickCoord.x}px + 1rem);
  img {
    width: 100%;
    height: 100%;
  }
  /* width: 3rem; */
  /* height: 50px; */
`;
interface ClickBoxInterface {
  readonly targets: { x: number; y: number; image: string; found: boolean }[];
  readonly clickCoord: { x: number; y: number };
  readonly visible: boolean;
  handleClickBox: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

function ClickBox(props: ClickBoxInterface) {
  const { targets, visible, clickCoord, handleClickBox } = props;
  const [parent] = useAutoAnimate({
    duration: 200,
    disrespectUserMotionPreference: true, // TODO: remove this, remember you have reduce animation in the OS
  });

  return (
    <StyledClickBox visible={visible} clickCoord={clickCoord} ref={parent}>
      {targets.map((target) =>
        !target.found ? (
          <img
            onClick={(event) => handleClickBox(event)}
            role="presentation"
            key={target.image}
            id={target.image}
            src={target.image}
            alt={target.image}
          />
        ) : null,
      )}
    </StyledClickBox>
  );
}

export default ClickBox;

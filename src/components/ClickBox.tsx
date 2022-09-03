import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { AnimatePresence, motion } from 'framer-motion';

interface StyleClickBoxInterface {
  readonly visible: boolean;
  readonly clickCoord: { x: number; y: number };
}

const StyledClickBox = styled(motion.div)<StyleClickBoxInterface>`
  position: absolute;

  display: grid;
  width: 5%;
  height: auto;
  background-color: ${({ theme }) => theme.primary};
  gap: 0.5rem;
  padding: 0.5rem;
  top: ${({ clickCoord }) => clickCoord.y}px;
  left: calc(${({ clickCoord }) => clickCoord.x}px + 10%);
  opacity: 0.7;
  img {
    width: 100%;
    height: 100%;
  }
`;
interface ClickBoxInterface {
  readonly targets: { x: number; y: number; image: string; found: boolean }[];
  readonly clickCoord: { x: number; y: number };
  readonly visible: boolean;
  handleClickBox: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

const variants = {
  visible: { visibility: 'visible', opacity: 0.7, x: 0 },
  hidden: {
    visibility: 'hidden',
    opacity: 0,
    x: 10,
    transition: { delay: 0.1 },
  },
};

function ClickBox(props: ClickBoxInterface) {
  const { targets, visible, clickCoord, handleClickBox } = props;

  return (
    <StyledClickBox
      animate={visible ? 'visible' : 'hidden'}
      variants={variants}
      // transition={{ delay: 0.5 }}
      visible={visible}
      clickCoord={clickCoord}
    >
      <AnimatePresence>
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
      </AnimatePresence>
    </StyledClickBox>
  );
}

export default ClickBox;

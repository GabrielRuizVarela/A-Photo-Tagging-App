import React from 'react';
import styled from 'styled-components';

interface StyleClickBoxInterface {
  readonly visible: boolean;
  readonly clickCoord: { x: number; y: number };
}

const StyledClickBox = styled.div<StyleClickBoxInterface>`
  position: absolute;
  display: ${({ visible }) => (visible ? 'grid' : 'none')};
  grid-template-rows: auto;
  grid-template-columns: 3rem;
  background-color: ${({ theme }) => theme.secondary};
  padding: 2rem;
  top: ${({ clickCoord }) => clickCoord.y}px;
  left: ${({ clickCoord }) => clickCoord.x}px;
  img {
    width: 100%;
    height: 100%;
  }
  /* width: 3rem; */
  /* height: 50px; */
`;

function ClickBox({
  targetImages,
  visible,
  clickCoord,
}: {
  targetImages: string[];
  visible: boolean;
  clickCoord: { x: number; y: number };
}) {
  return (
    <StyledClickBox visible={visible} clickCoord={clickCoord}>
      {targetImages.map((image) => (
        <img key={image} id={image} src={image} alt={image} />
      ))}
    </StyledClickBox>
  );
}

export default ClickBox;

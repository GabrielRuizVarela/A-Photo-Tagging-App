import React, { useContext } from 'react';
import styled from 'styled-components';
import ImagesContext from '../context/init';

const StyledNavbar = styled.nav`
  display: grid;
  padding: 1rem;
  grid-template-columns: 1fr;
  position: fixed;
  z-index: 1;
  left: 0;
  width: 16%;
  height: 100%;
  justify-content: center;
  align-items: center;
  justify-items: center;
  background-color: ${({ theme }) => theme.primary};
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
  overflow: scroll;
  img {
    border: 1px solid ${({ theme }) => theme.secondary};
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

function NavBar({
  selectLevel,
}: {
  selectLevel: (event: React.MouseEvent<HTMLImageElement>) => void;
}) {
  const images = useContext(ImagesContext);
  return (
    <StyledNavbar>
      {images.map((image) => (
        <div key={image.id}>
          <img
            role="presentation"
            onClick={(e) => selectLevel(e)}
            id={String(image.id)}
            src={image.image}
            alt={image.alt}
          />
        </div>
      ))}
    </StyledNavbar>
  );
}

export default NavBar;

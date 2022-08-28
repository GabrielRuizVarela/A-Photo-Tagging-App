import React, { useContext } from 'react';
import styled from 'styled-components';
import ImagesContext from '../context/init';

const StyledNavbar = styled.nav`
  display: grid;
  padding: 1rem;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: start;
  background-color: #000;
  border-bottom: 1px solid #e6e6e6;
  overflow: scroll;
  img {
    border: 1px solid white;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

function NavBar() {
  const images = useContext(ImagesContext);
  return (
    <StyledNavbar>
      {images.map((image) => (
        <div key={image.id}>
          <img src={image.image} alt={image.alt} />
        </div>
      ))}
    </StyledNavbar>
  );
}

export default NavBar;

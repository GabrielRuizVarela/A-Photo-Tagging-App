import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ImagesContext from '../context/init';

const StyledNavbar = styled(motion.nav)`
  display: grid;
  padding: 1rem;
  grid-template-columns: 1fr;
  position: fixed;
  z-index: 300;
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
    border: 0.1rem solid ${({ theme }) => theme.secondary};
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    cursor: pointer;
    box-shadow: 2px 2px 0.5rem 0.1rem ${({ theme }) => theme.secondary};
  }
  @media (max-width: 768px) {
    overflow: hidden;
    align-content: center;
    grid-auto-flow: column;
    padding: 0.2rem;
    justify-content: space-around;
    gap: 0.5rem;
    grid-template-columns: repeat(3, minmax(10px, 50px));
    height: 4rem;
    position: static;
    font-size: 0.6rem;
    width: 100%;
    /* gap: 0.5rem; */
  }
`;

function NavBar({
  selectLevel,
}: {
  // eslint-disable-next-line no-unused-vars
  selectLevel: (event: React.MouseEvent<HTMLImageElement>) => void;
}) {
  const images = useContext(ImagesContext);
  return (
    <StyledNavbar>
      {images.map((image) => (
        <div key={image.id}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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

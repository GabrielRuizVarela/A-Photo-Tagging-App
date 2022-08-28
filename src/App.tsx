import React, { useContext } from 'react';
// import './App.css';
// import styled from 'styled-components';
import ImagesContext from './context/init';
import FindMe from './components/FindMe';
import Navbar from './components/LeftBar';

// interface ContextInterface {
//   image: string;
//   dimensions: {
//     width: number;
//     height: number;
//   };
//   targets: {
//     x: number;
//     y: number;
//   }[];
// }

function App() {
  const images = useContext(ImagesContext);
  const { image, id, targets, dimensions } = images[0];
  return (
    <div className="App">
      <Navbar />
      <FindMe
        key={id}
        image={image}
        targets={targets}
        dimensions={dimensions}
      />
    </div>
  );
}

export default App;

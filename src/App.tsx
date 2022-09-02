import React, { useContext } from 'react';
// import './App.css';
// import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import ImagesContext from './context/init';
import FindMe from './components/FindMe';

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
const theme = {
  1: {
    primary: 'rgb(202, 233, 234)',
    secondary: 'rgb(75,31,35)',
  },
};

function App() {
  const images = useContext(ImagesContext);
  const { image, id, targets, dimensions } = images[0];

  return (
    <ThemeProvider theme={theme[1]}>
      <div className="App">
        <FindMe
          image={image}
          key={id}
          targets={targets}
          dimensions={dimensions}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

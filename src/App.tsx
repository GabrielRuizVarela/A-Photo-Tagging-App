import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import styled from 'styled-components';
import { initializeApp } from 'firebase/app';
import FindMe from './components/FindMe';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDmWWqcIFgPhpM-Dl71EcvXqK7wda60za8',
  authDomain: 'find-me-app-6259a.firebaseapp.com',
  projectId: 'find-me-app-6259a',
  storageBucket: 'find-me-app-6259a.appspot.com',
  messagingSenderId: '426366546662',
  appId: '1:426366546662:web:1b308fd1a6ec36d303c127',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* <div className="App"> */}
        {/* <FindMe /> */}
        <Route path="/" element={<FindMe />} />
        {/* </div> */}
      </Routes>
    </HashRouter>
  );
}

export default App;

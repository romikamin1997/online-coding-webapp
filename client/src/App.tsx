import React from '@testing-library/react';
import './App.css';
import Lobby from './pages/Lobby.tsx';
import Coditor from './pages/SharedCoditor.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />}></Route>
        <Route path="/coditor" element={<Coditor />} />
      </Routes>
    </Router>
  );
}

export default App;

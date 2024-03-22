import React from '@testing-library/react';
import './App.css';
import Lobby from './pages/Lobby';
import Coditor from './pages/SharedCoditor';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route name="home" path="/" element={<Lobby />}></Route>
        <Route name="coditor" path="/coditor" element={<Coditor />} />
      </Routes>
    </Router>
  );
}

export default App;

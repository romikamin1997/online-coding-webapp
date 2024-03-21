import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';

import SERVERADDR from '../common';

function Lobby() {
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    axios.get(SERVERADDR + 'code-block-titles')
      .then(function (response) {
        setTitles(response.data)
      })
      .catch(function (error) {
        console.error(error)
      });
  }, [])

  return (
    <div className="Lobby">
      <header className="Lobby-header">
        <p>
          Choose code block
        </p>
        <ul>
          {titles.map((title) => (
            <p key={title}>{title}</p>
          ))}
        </ul>
      </header>
    </div>
  );
}


export default Lobby;
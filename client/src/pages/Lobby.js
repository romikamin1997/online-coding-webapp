import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';

import { SERVER_ADDR, GET_TITLES_ENDPOINT } from '../common';

function Lobby() {
  const [titles, setTitles] = useState([]);

  // useEffect with no dependencies would let us have a similar behavior to
  // componentDidMount and only fetch the code block titles once
  useEffect(() => {
    axios.get(SERVER_ADDR + GET_TITLES_ENDPOINT)
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
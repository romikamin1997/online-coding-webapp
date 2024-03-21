import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';

import { SERVER_ADDR, GET_CODE_BLOCKS_ENDPOINT } from '../common';

function Lobby() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  // useEffect with no dependencies would let us have a similar behavior to
  // componentDidMount and only fetch the code block titles and code fields once
  useEffect(() => {
    axios.get(SERVER_ADDR + GET_CODE_BLOCKS_ENDPOINT)
      .then(function (response) {
        setCodeBlocks(response.data)
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
          {codeBlocks.map((data) => (
            <p key={data}>{data.title}</p>
          ))}
        </ul>
      </header>
    </div>
  );
}


export default Lobby;
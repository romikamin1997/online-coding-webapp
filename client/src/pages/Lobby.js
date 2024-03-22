import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
        <h1>
          Choose code block
        </h1>
        <ul>
          {codeBlocks.map((block) => (
            <li key={block.title}>
              <Link to="/coditor" state={{title: block.title, code: block.code }}>{block.title}</Link>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}


export default Lobby;
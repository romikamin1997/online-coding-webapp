import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { SERVER_ADDR, GET_CODE_BLOCKS_ENDPOINT } from '../common.tsx';


function Lobby() {
  const [codeBlocks, setCodeBlocks] = useState<Array<{title: string, code: string, solution: string}>>([]);

  // useEffect with no dependencies would let us have a similar behavior to
  // componentDidMount of a class component and only fetch the code block
  // titles and code fields once upon mounting
  useEffect(() => {
    // Sending a get request to the server to fetch all code block templates
    const endpoint = SERVER_ADDR + GET_CODE_BLOCKS_ENDPOINT
    console.debug(`Sending request to ${endpoint}`)
    axios.get(SERVER_ADDR + GET_CODE_BLOCKS_ENDPOINT)
      .then(function (response) {
        // Update the current codeBlocks to the response retrieved from the server 
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
            // https://reactrouter.com/en/main/hooks/use-location#locationstate
            // We're leveraging the fact that the location object is stateful and 
            // passed into the routed component
            <li key={block.title}>
              <Link to="/coditor" state={{title: block.title, code: block.code, solution: block.solution }}>{block.title}</Link>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}


export default Lobby;
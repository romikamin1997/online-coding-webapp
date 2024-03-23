// Shared code editor componenet
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

function HomeBtn() {
    return <nav className='nav'>
        <Link to="/">Home</Link>
    </nav>
} 

export default function Coditor() {
    const location = useLocation()
    const [code, setCode] = useState(location.state.code)
    
    // CLIENT SOCKET -------------------
    useEffect(() => { 
        const socket = io("http://localhost:3001")
        
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        return () => {
            socket.disconnect()
            
        }
    }, [])

    

    return (
        <div className="row">
            <HomeBtn></HomeBtn>
            <div className="col-10">
                <h1>Direct Code</h1>
                <fieldset>
                    <legend><span style={{ fontSize: 16, fontWeight: 'bold' }}>Write your code for {location.state.title}:</span>
                    </legend>
                    <Editor
                        value={code}
                        highlight={code => highlight(
                            code,
                            languages.js
                        )}
                        padding={10}
                        readOnly={false}
                        onValueChange={(changeCode) => { setCode(changeCode) }}
                    />
                </fieldset>
            </div>
        </div>
    );
}



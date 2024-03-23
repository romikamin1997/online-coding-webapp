// Shared code editor componenet
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { SERVER_ADDR } from '../common';

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
    const [socket, setSocket] = useState()
    const [isMentor, setIsMentor] = useState(false)


    // CLIENT SOCKET -------------------
    useEffect(() => {
        const socketVar = io(SERVER_ADDR)
        setSocket(socketVar)
        // We're using socketVar becuse setSocket is async and we won't
        // necessarily have `socket` initialized for the following lines
        socketVar.on('client-connected', (countAndCode) => {
            setIsMentor(countAndCode.count == 0)
            if (countAndCode.code !== ""){
                setCode(countAndCode.code)
            }
        })
        socketVar.on('update-code', (changeCode) => {
            setCode(changeCode)
        })

        return () => {
            console.log("disconnecting!")
            socketVar.disconnect()
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
                        readOnly={isMentor}
                        onValueChange={(changeCode) => {
                            setCode(changeCode)
                            socket.emit("update-code", changeCode)
                        }}
                    />
                </fieldset>
            </div>
        </div>
    );
}


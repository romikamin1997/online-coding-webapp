// Shared code editor componenet
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
import { Link } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import { SERVER_ADDR } from '../common.tsx';
import Popup from 'reactjs-popup';


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
    // Get the location object create by the Link component that redirected 
    // to the current component
    const location = useLocation()
    // The current state of code is initialize to the value of the code
    // from the location object state.
    // React will re-render Coditor component, every time we change code with setCode
    const [code, setCode] = useState(location.state.code)
    // Having socket in the component state lets us access it as part of the Editor component
    const [socket, setSocket] = useState<Socket>()
    // Having isMentor in the component state lets us decide if the editor should be readonly.
    // The setter is used upon the client connection to the server socket as we recieve the 
    // amount of connected clients to the socket and by this we can determine if the current
    // client is the mentor or some student.
    const [isMentor, setIsMentor] = useState(false)
    // Helpers to maintain the Popup component
    const [open, setOpen] = useState(false)
    const closePopup = () => { setOpen(false) }

    const solution = location.state.solution


    // CLIENT SOCKET -------------------
    useEffect(() => {
        const socketVar = io(SERVER_ADDR)
        setSocket(socketVar)
        // We're using socketVar becuse setSocket is async and we won't
        // necessarily have `socket` initialized for the following lines
        socketVar.on('client-connected', (countAndCode) => {
            // Update isMentor to true if he is the first client to connect to the server 
            setIsMentor(countAndCode.count === 0)
            // Check if there is additional code to render upon connection.
            // That is, if the server already have some code updated by another client
            // then new connected clients will render the latest code maintained by the server.
            if (countAndCode.code !== "") {
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
                            socket!.emit("update-code", changeCode)
                            // Once the student achieved the right solution
                            // display the smiley popup!
                            if (changeCode === solution) {
                                setOpen(true)
                            }
                        }}
                    />
                </fieldset>
            </div>
            <Popup open={open} closeOnDocumentClick onClose={closePopup}>
                <div className="modal">
                    <img className="smiley-image" src={require("../assets/smiley.jpg")} alt={"Smiley Face"} />
                </div>
            </Popup>
        </div>
    );
}


// Shared code editor componenet
import React from 'react';
import { useLocation } from 'react-router-dom';
import Editor from 'react-simple-code-editor';
// eslint-disable-next-line no-unused-vars
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/default.css'

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

function HomeBtn() {
    return <nav className='nav'>
        <a href='/' className="home">Home</a>
    </nav>
} 

function Coditor() {
    const location = useLocation()
    const [code, setCode] = React.useState(location.state.code)

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
                        highlight={code =>  hljs.highlight(
                            code,
                            { language: 'javascript' }
                        ).value}
                        padding={10}
                        readOnly={false}
                        onValueChange={(changeCode) => { setCode(changeCode) }}
                    />
                </fieldset>
            </div>
        </div>
    );
}

export default Coditor;


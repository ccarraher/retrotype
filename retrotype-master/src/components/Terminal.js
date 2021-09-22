import React, { useState } from 'react'
import Output from './Output';
import Input from './Input';

export default function Terminal() {
    const [output, setOutput] = useState([]);
    return (
        <>
            <Output output={output}/>
            <Input setOutput={setOutput}/>
        </>
    )
}

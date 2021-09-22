import React,{useState, useEffect} from 'react'

export default function Timer(props) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const {correctWords, startCounting, setOutput, playing} = props;
    useEffect(() => {
        let id
        if(startCounting) {
            id = setInterval(() => {
                setTimeElapsed(oldTime => oldTime + 1)
            }, 1000);
        }

        return () => {
            clearInterval(id)
            setTimeElapsed(0);
        }
    }, [startCounting])
    const minutes = (timeElapsed/60);
    return (
        <div className="timer">
            <h1>{timeElapsed < 10 ? `00:0${timeElapsed}` : `00:${timeElapsed}`} SEC</h1>
            <h1>{((correctWords/minutes) || 0).toFixed(2)} WPM</h1>
        </div>
    )
}

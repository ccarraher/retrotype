import React,{useRef, useState, useEffect} from 'react'
import WordMemo from './Word';
import Timer from './Timer';

const getPrompt = () => {
    const string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra odio cursus, aliquet sem sed, tincidunt felis.`
    return string.split(' ');
}

export default function Input({setOutput}) {
    // State
    const [userInput, setUserInput] = useState([]);
    const [playInput, setPlayInput] = useState('');
    const [playing, setPlaying] = useState(false);
    const [activeWordIndex, setActiveWordIndex] = useState(0);
    const [correctWordArray, setCorrectWordArray] = useState([]);
    const [startCounting, setStartCounting] = useState(false);
    const string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra odio cursus, aliquet sem sed, tincidunt felis. Sed id lectus nisl. Duis vitae magna sed massa laoreet pulvinar at egestas libero. Phasellus malesuada blandit convallis. Etiam dignissim leo a blandit vestibulum. In porta tempor scelerisque. Maecenas dapibus magna ut pharetra mattis. Vivamus egestas, ante quis tincidunt rhoncus, tortor diam tincidunt tortor, eget congue turpis nisi et leo. Maecenas quis elementum elit. In fermentum neque dui, viverra aliquam arcu sodales tincidunt. Nam molestie quam velit, eu maximus lectus consequat ut. Etiam non dictum nunc. Phasellus euismod efficitur libero, sed mollis enim luctus non."
    // Refs 
    const prompt = useRef(getPrompt());
    const inputEl = useRef(null);
    // Functions
    const parseCommand = (input) => {
        if (input.startsWith('play') === true) {
            setPlaying(true);
        } else if (input.startsWith('echo') === true) {
            const myArray = input.split(" ");
            const commandExecuted = myArray.shift();
            setOutput(lastOutput => [...lastOutput, myArray.join(' ')]);
        } else if (input.startsWith('clear') === true) {
            setOutput([])
        } else if (input.startsWith('help') === true) {
            setOutput(lastOutput => [...lastOutput, <><p>----------HELP----------</p><p>help - displays all available commands</p><p>clear - clears the screen</p><p>echo INSERT TEXT HERE - outputs the text you add after echo</p><p>play - start your typing race</p><p>------------------------</p></>])
        } else {
            setOutput(lastOutput => [...lastOutput, 'ERROR: COMMAND NOT FOUND'])
        }
    }
    const processInput = (value) => {
        if(activeWordIndex === prompt.current.length) {
            return 
            //stop
        }
        if(!startCounting && playing) {
            setStartCounting(true);
        }
        if (value.endsWith(' ') && playing) {
            //user finished typing a word
            setPlayInput('');
            const word = value.trim()
            // Correct Word
            setCorrectWordArray(data => {
                const newResult = [...data];
                newResult[activeWordIndex] = word === prompt.current[activeWordIndex]
                return newResult
            })
            if(word === prompt.current[activeWordIndex]) {
                setActiveWordIndex(index => index + 1)
            }
            if(activeWordIndex === prompt.current.length - 1) {
                //Overflow
                setStartCounting(false);
                setPlayInput('');
                inputEl.current.value = ""
                setPlaying(false);
                setActiveWordIndex(0);
                setCorrectWordArray([]);
                return
            }
        } else {
            setPlayInput(value);
        }
    }

    return (
        <>
            <p>{playing && prompt.current.map((word, index) => {
                return <WordMemo text={word} active={index === activeWordIndex} correct={correctWordArray[index]}/>
            })}</p>
            <Timer startCounting={startCounting} correctWords={correctWordArray.filter(Boolean).length} setOutput={setOutput} playing={playing}/>
            <div>
                <span>{`>>>`}</span>
                    <input 
                        id="input" 
                        type="text"  
                        autoFocus
                        onKeyPressCapture={(e) => {
                            if(e.key === 'Enter') {
                                e.preventDefault();
                                setUserInput(prevArray => [...prevArray, e.target.value]);
                                parseCommand(e.target.value);
                            }
                        }}
                        onKeyPress={(e) => {
                            if(e.key === "Enter") {
                                inputEl.current.value = '';
                            }
                        }}
                        onChange={(e) => processInput(e.target.value)}
                        ref={inputEl}
                        value={playing ? playInput : undefined}
                    />
            </div>
        </>
    )
}

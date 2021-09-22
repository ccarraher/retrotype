import logo from './logo.svg';
import './App.css';
import Terminal from './components/Terminal';

function App() {
  return (
    <div id="monitor">
      <div id="bezel">
        <div id="crt" className="off"> 
          <div className="scanline"></div>
          <pre>{` 
██████  ███████ ████████ ██████   ██████      ████████ ██    ██ ██████  ███████
██   ██ ██         ██    ██   ██ ██    ██        ██     ██  ██  ██   ██ ██      
██████  █████      ██    ██████  ██    ██        ██      ████   ██████  █████   
██   ██ ██         ██    ██   ██ ██    ██        ██       ██    ██      ██      
██   ██ ███████    ██    ██   ██  ██████         ██       ██    ██      ███████ 
            `}
          </pre> <br></br>
          <span id="starter">Retro Type: The Terminal Type Racing Game</span><br></br>
          <span id="starter">Fake Copyright (c) 2021 Conner Carraher Inc, All rights reserved.</span><br></br>
          <span id="starter">Retro Type is not a registered trademark of Conner Carraher Inc.</span><br></br>
          <a href="https://github.com/ccarraher/retrotype">https://github.com/ccarraher/retrotype</a><br></br><br></br>
          <Terminal />
        </div>
      </div>
    </div>
  );
}

export default App;

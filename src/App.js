import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';

function App() {
  return (
    <div id="monitor">
      <div id="bezel">
        <div id="crt" class="off" onClick="handleClick(event)"> 
          <div class="scanline"></div>
          <Header />
        </div>
      </div>
    </div>
  );
}

export default App;

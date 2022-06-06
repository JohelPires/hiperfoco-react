
import { useState } from 'react';
import './App.scss';
import Footer from './Footer';
import NavBar from './NavBar';
import Main from './pages/Main';
import Sobre from './pages/Sobre';


// TO-DO: 
// MAKE IT RESPONSIVE
// MAY-BE ADD SOME SVG BACKGROUND TO EACH MODULE, LIKE A CLOCK IN POMODORO, ETC



function App() {

const [sobre, setSobre] = useState(true)
function toggleSobre() {
  setSobre((prevSobre) => !prevSobre)
}


  return (
    <div className="App">
      <NavBar 
        setSobre = {setSobre}
        toggleSobre = {toggleSobre}
      />
      <Main />
      {sobre && <Sobre toggleSobre = {toggleSobre}/>}
      <Footer />
    </div>
  );
}

export default App;

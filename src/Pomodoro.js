import React from 'react'
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs'

function Pomodoro() {

    const [focoHoje, setFocoHoje] = React.useState({
        pomoCount: 0,
        pomoTempo: 1500,
        pausaCurta: 300,
        pausaLonga: 900
    })

    const PomoTempo = 5 //  1500 = 25 minutos

    const [counter, setCounter] = React.useState(PomoTempo)

    // Counter Status:
    // 'parado', 'pomo', 'pausaCurta', 'pausaLonga'
    // pomoCount:
    // 0 = parado
    // 1 = Foco
    // 2 = pausa curta
    // 3 = Foco
    // 4 = pausa curta
    // 5 = Foco
    // 6 = pausa curta
    // 7 = Foco
    // 8 = pausa longa

    // TO-DO: 
    // - stop button: sets pomoCount to 0, asks for confirmation


    const [counterStatus, setCounterStatus] = React.useState('parado')
    const [counterPlayPause, setCounterPlayPause] = React.useState(false)
    const [pomoCount, setPomoCount] = React.useState(0)
    

    let intervalID

    React.useEffect(() => {
        const timer = 
            counterPlayPause && setInterval(() => setCounter(counter - 1), 1000);

        if (counter === 0){
            // PLAY SOUND, CHANGE BG COLOR, ETC.

            
            
            
            
            setCounterStatus((prev) => {
                if (pomoCount % 2 !== 0 && pomoCount < 7){
                    setCounter(3) // mudar para pausa curta: setCounter(pausaCurta)
                    return 'Pausa curta'
                } else if (pomoCount % 2 === 0 && pomoCount < 7){
                    setCounter(5) // Mudar para tempo de foco
                    return 'Foco'
                } else if (pomoCount === 7){
                    setCounter(4) // Mudar para pausa longa
                    return 'Pausa Longa'
                } else if (pomoCount > 7) {
                    setPomoCount(1)
                    setCounter(5) //Mudar para tempo de foco
                    return 'Foco'
                }                
            })

            setPomoCount(prevPomoCount => prevPomoCount + 1)

            // set counter to the short pause value
        }
        return () => clearInterval(timer);
      }, [counter, counterStatus]);

    function toggle() {
        if (pomoCount === 0){
            setPomoCount(1)
            setCounterStatus('Foco')
        } // Significa o início da contagem. Depois disso a contagem é gerenciada dentro do useEffect.
        setCounterPlayPause((prevStat) => !prevStat)
    }

    console.log(pomoCount)

    function minutos(sec){

        let segundos
        
        if (sec%60 === 0){
           segundos = '00' 
        } else if (sec%60 < 10) {
            segundos = '0' + sec%60

        } else {
            segundos = sec%60
        }
        
        
        
        return Math.floor(sec/60) + ':' + segundos //.slice(0,2)

    }

    console.log(pomoCount)
    // console.log(minutos(1500))
    // console.log(minutos(1499))

  return (
    <div className='pomodoro'>
        <h1>{minutos(counter)}</h1>
        <h3>{counterStatus}</h3>
        <div onClick={toggle} className='play-pause'>{counterPlayPause ? <BsPauseCircle /> : <BsPlayCircle />}</div>
        {/* <div onClick={stop} className='play-pause'><BsPlayCircle /></div> */}
    </div>
  )
}

export default Pomodoro
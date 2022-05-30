import React from 'react'
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs'

function Pomodoro() {

    const [focoHoje, setFocoHoje] = React.useState({
        pomoCount: 0,
        tempoPomoAtual: '25:00'
    })

    const PomoTempo = 1500 //25 minutos

    const [counter, setCounter] = React.useState(PomoTempo)
    const [counterStatus, setCounterStatus] = React.useState(false)

    let intervalID

    React.useEffect(() => {
        const timer =
          counterStatus && counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
      }, [counter, counterStatus]);

    function toggle() {
        setCounterStatus((prevStat) => !prevStat)
    }

    function minutos(sec){

        const segundos = sec%60 + '0'
        
        return Math.floor(sec/60) + ':' + segundos.slice(0,2)

    }


    console.log(minutos(1500))
    console.log(minutos(1499))

  return (
    <div className='pomodoro'>
        <h1>{minutos(counter)}</h1>
        <div onClick={toggle} className='play-pause'>{counterStatus ? <BsPauseCircle /> : <BsPlayCircle />}</div>
        {/* <div onClick={stop} className='play-pause'><BsPlayCircle /></div> */}
    </div>
  )
}

export default Pomodoro
import React from 'react'
import useSound from 'use-sound'
import bell from './temple_bell.mp3'
import {
  BsPauseCircle,
  BsPlayCircle,
  BsSkipForwardCircle,
  BsStopCircle,
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from 'react-icons/bs'
import PomoCountBar from './PomoCountBar'

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
// - Change states to one single state. See if it's necessary
// - Clean up the code and use the variables for the tempos.
// - colocar as mudanças de cores.
// - Local storage para gravar os dados e estatísticas
// - fix the unique key warning

// - dividir em componentes: um para o pomodoro em si, outro para estatisticas.
// - graphs and animations

// - colocar o marcador de pomodoros feitos: .... ....

function Pomodoro() {
  // const [focoHoje, setFocoHoje] = React.useState({
  //     pomoCompletas: 0,  // Número de ciclos completos de 1 foco e uma pausa curta.
  //     tempoDeFoco: 1500, //1500 = 25 minutos
  //     pausaCurta: 300, //300 = 5 minutos
  //     pausaLonga: 900 //900 = 15 minutos
  // })
  const focoHoje = {
    pomoCompletas: 0, // Número de ciclos completos de 1 foco e uma pausa curta.
    tempoDeFoco: 1500, //1500 = 25 minutos
    pausaCurta: 300, //300 = 5 minutos
    pausaLonga: 900, //900 = 15 minutos
  }

  // CONTADOR DE SEGUNDOS
  const [counter, setCounter] = React.useState(focoHoje.tempoDeFoco)

  const [counterStatus, setCounterStatus] = React.useState('parado')
  const [counterPlayPause, setCounterPlayPause] = React.useState(false)
  const [pomoCount, setPomoCount] = React.useState(0)
  const [play] = useSound(bell)
  const [pomoCompletas, setPomoCompletas] = React.useState(0)

  // let intervalID

  React.useEffect(() => {
    const timer =
      counterPlayPause && setInterval(() => setCounter(counter - 1), 1000)

    if (counter === 0) {
      // PLAY SOUND, CHANGE BG COLOR, ETC.
      play()

      setCounterStatus((prev) => {
        if (pomoCount % 2 !== 0 && pomoCount < 7) {
          // CONCLUIU UM FOCO
          setCounter(focoHoje.pausaCurta) // mudar para pausa curta: setCounter(pausaCurta)
          const updatePromoCompletas = pomoCompletas + 1
          setPomoCompletas(updatePromoCompletas)
          return 'Pausa curta - Relaxe'
        } else if (pomoCount % 2 === 0 && pomoCount < 7) {
          setCounter(focoHoje.tempoDeFoco) // Mudar para tempo de foco
          return 'Foco no trabalho'
        } else if (pomoCount === 7) {
          setCounter(focoHoje.pausaLonga) // Mudar para pausa longa
          const updatePromoCompletas = pomoCompletas + 1
          setPomoCompletas(updatePromoCompletas)
          return 'Pausa Longa - Vá tomar um café!'
        } else if (pomoCount > 7) {
          setPomoCount(1)
          setCounter(focoHoje.tempoDeFoco) //Mudar para tempo de foco
          return 'Foco no trabalho'
        }
      })

      setPomoCount((prevPomoCount) => prevPomoCount + 1)
    }
    return () => clearInterval(timer)
  }, [counter, counterPlayPause])

  function toggle() {
    if (pomoCount === 0) {
      setPomoCount(1)
      setCounterStatus('Foco no trabalho')
      play()
    } // Significa o início da contagem. Depois disso a contagem é gerenciada dentro do useEffect.
    setCounterPlayPause((prevStat) => !prevStat)
  }

  function minutos(sec) {
    let segundos
    if (sec % 60 === 0) {
      segundos = '00'
    } else if (sec % 60 < 10) {
      segundos = '0' + (sec % 60)
    } else {
      segundos = sec % 60
    }
    return Math.floor(sec / 60) + ':' + segundos //.slice(0,2)
  }

  if (pomoCompletas > 8) {
    setPomoCompletas(0)
  }

  return (
    <div className='pomodoro'>
      <h2>Pomodoro timer</h2>
      <div className='time-config-container'>
        <div className='break-container'>
          <p id='break-label'>Break Length</p>
          <div className='time_controllers'>
            <BsFillArrowDownSquareFill
              id='break-decrement'
              onClick={(e) => handleIncDec(e)}
            />
            <p>5</p>
            <BsFillArrowUpSquareFill
              id='break-increment'
              onClick={(e) => handleIncDec(e)}
            />
          </div>
        </div>
        <div className='session-container'>
          <p id='session-label'>Session Length</p>
          <div className='time_controllers'>
            <BsFillArrowUpSquareFill
              id='session-decrement'
              onClick={(e) => handleIncDec(e)}
            />
            <p>25</p>
            <BsFillArrowDownSquareFill
              id='session-increment'
              onClick={(e) => handleIncDec(e)}
            />
          </div>
        </div>
        <div className='longbreak-container'>
          <p id='long-break'>Long Break</p>
          <div className='time_controllers'>
            <BsFillArrowUpSquareFill
              id='longpause-decrement'
              onClick={(e) => handleIncDec(e)}
            />
            <p>15</p>
            <BsFillArrowDownSquareFill
              id='longpause-increment'
              onClick={(e) => handleIncDec(e)}
            />
          </div>
        </div>
      </div>
      <h1>{minutos(counter)}</h1>
      <h3>{counterStatus}</h3>
      <PomoCountBar pomoCompletas={pomoCompletas} />
      <div onClick={toggle} className='play-pause'>
        {counterPlayPause ? <BsPauseCircle /> : <BsPlayCircle />}
      </div>
    </div>
  )
}

export default Pomodoro

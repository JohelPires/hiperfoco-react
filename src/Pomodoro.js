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
  BsArrowDownSquare,
  BsArrowUpShort,
  BsArrowDownShort,
  BsArrowUpSquare,
} from 'react-icons/bs'
import PomoCountBar from './PomoCountBar'

function Pomodoro() {
  // const focoHoje = {
  //   pomoCompletas: 0, // Número de ciclos completos de 1 foco e uma pausa curta.
  //   tempoDeFoco: 1500, //1500 = 25 minutos
  //   pausaCurta: 300, //300 = 5 minutos
  //   pausaLonga: 900, //900 = 15 minutos
  // }
  const [focoHoje, setFocoHoje] = React.useState({
    pomoCompletas: 0, // Número de ciclos completos de 1 foco e uma pausa curta.
    tempoDeFoco: 1500, //1500 = 25 minutos
    pausaCurta: 300, //300 = 5 minutos
    pausaLonga: 900, //900 = 15 minutos
  })

  // CONTADOR DE SEGUNDOS
  const [counter, setCounter] = React.useState(focoHoje.tempoDeFoco)

  const [counterStatus, setCounterStatus] = React.useState('parado')
  const [counterPlayPause, setCounterPlayPause] = React.useState(false)
  const [pomoCount, setPomoCount] = React.useState(0)
  const [play] = useSound(bell)
  const [pomoCompletas, setPomoCompletas] = React.useState(0)

  // let intervalID
  React.useEffect(() => {
    console.log(focoHoje)
    setCounter(focoHoje.tempoDeFoco)
  }, [focoHoje])

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

  function handleIncDec(e) {
    let update
    switch (e.target.id) {
      case 'break-decrement':
        focoHoje.pausaCurta > 60 &&
          setFocoHoje((prevFoco) => ({
            ...prevFoco,
            pausaCurta: prevFoco.pausaCurta - 60,
          }))
        break
      case 'break-increment':
        focoHoje.pausaCurta < 3600 &&
          setFocoHoje((prevFoco) => ({
            ...prevFoco,
            pausaCurta: prevFoco.pausaCurta + 60,
          }))
        break

      case 'session-decrement':
        focoHoje.tempoDeFoco > 60 &&
          setFocoHoje((prevFoco) => ({
            ...prevFoco,
            tempoDeFoco: prevFoco.tempoDeFoco - 60,
          }))
        break
      case 'session-increment':
        focoHoje.tempoDeFoco < 3600 &&
          setFocoHoje((prevFoco) => ({
            ...prevFoco,
            tempoDeFoco: prevFoco.tempoDeFoco + 60,
          }))
        // setCounter(update)
        break

      case 'longpause-decrement':
        focoHoje.pausaLonga > 60 &&
          setFocoHoje((prevFoco) => ({
            ...prevFoco,
            pausaLonga: prevFoco.pausaLonga - 60,
          }))
        break
      case 'longpause-increment':
        // update = focoHoje.pausaLonga + 60
        setFocoHoje((prevFoco) => ({
          ...prevFoco,
          pausaLonga: prevFoco.pausaLonga + 60,
        }))
        break

      default:
        break
    }
    // console.log(focoHoje)
  }
  function resetSession(e) {
    setFocoHoje({
      pomoCompletas: 0, // Número de ciclos completos de 1 foco e uma pausa curta.
      tempoDeFoco: 1500, //1500 = 25 minutos
      pausaCurta: 300, //300 = 5 minutos
      pausaLonga: 900, //900 = 15 minutos
    })
    setCounter(focoHoje.tempoDeFoco)
    setCounterStatus('parado')
    setCounterPlayPause(false)
    setPomoCount(0)
    setPomoCompletas(0)
  }

  if (pomoCompletas > 8) {
    setPomoCompletas(0)
  }

  return (
    <div className='pomodoro'>
      <h2>Pomodoro timer</h2>
      <h1 id='time-left'>{minutos(counter)}</h1>
      <h3 id='timer-label'>{counterStatus}</h3>
      <PomoCountBar pomoCompletas={pomoCompletas} />
      <div style={{ display: 'flex', gap: '20px' }}>
        <div id='start_stop' onClick={toggle} className='play-pause'>
          {counterPlayPause ? <BsPauseCircle /> : <BsPlayCircle />}
        </div>
        <div id='reset' onClick={resetSession} className='play-pause'>
          <BsStopCircle />
        </div>
      </div>
      <div className='time-config-container'>
        <div className='break-container'>
          <p className='config-label' id='break-label'>
            Break Length
          </p>
          <div className='time_controllers'>
            <BsArrowDownShort
              className='arrow-btn'
              id='break-decrement'
              onClick={(e) => handleIncDec(e)}
            />
            <p id='break-length'>{focoHoje.pausaCurta / 60}</p>
            <BsArrowUpShort
              className='arrow-btn'
              id='break-increment'
              onClick={(e) => handleIncDec(e)}
            />
          </div>
        </div>
        <div className='session-container'>
          <p className='config-label' id='session-label'>
            Session Length
          </p>
          <div className='time_controllers'>
            <BsArrowDownShort
              className='arrow-btn'
              id='session-decrement'
              onClick={(e) => handleIncDec(e)}
            />
            <p id='session-length'>{focoHoje.tempoDeFoco / 60}</p>
            <BsArrowUpShort
              className='arrow-btn'
              id='session-increment'
              onClick={(e) => handleIncDec(e)}
            />
          </div>
        </div>
        <div className='longbreak-container'>
          <p className='config-label' id='long-break'>
            Long Break
          </p>
          <div className='time_controllers'>
            <BsArrowDownShort
              className='arrow-btn'
              id='longpause-decrement'
              onClick={(e) => handleIncDec(e)}
            />
            <p id='longbreak-length'>{focoHoje.pausaLonga / 60}</p>
            <BsArrowUpShort
              className='arrow-btn'
              id='longpause-increment'
              onClick={(e) => handleIncDec(e)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pomodoro

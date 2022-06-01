import React from 'react'
import useSound from 'use-sound'
import bell from './temple_bell.mp3'
import { BsPauseCircle, BsPlayCircle } from 'react-icons/bs'
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

    const [focoHoje, setFocoHoje] = React.useState({
        pomoCompletas: 0,  // Número de ciclos completos de 1 foco e uma pausa curta.
        tempoDeFoco: 5,//1500,
        pausaCurta: 3,//300,
        pausaLonga: 4//900
    })


    // CONTADOR DE SEGUNDOS
    const [counter, setCounter] = React.useState(focoHoje.tempoDeFoco)

    const [counterStatus, setCounterStatus] = React.useState('parado')
    const [counterPlayPause, setCounterPlayPause] = React.useState(false)
    const [pomoCount, setPomoCount] = React.useState(0)
    const [play] = useSound(bell)
    const [pomoCompletas, setPomoCompletas] = React.useState(0)

    let intervalID

    React.useEffect(() => {
        const timer =
            counterPlayPause && setInterval(() => setCounter(counter - 1), 1000);

        if (counter === 0) {
            // PLAY SOUND, CHANGE BG COLOR, ETC.
            play()

            setCounterStatus((prev) => {
                if (pomoCount % 2 !== 0 && pomoCount < 7) { // CONCLUIU UM FOCO
                    setCounter(focoHoje.pausaCurta) // mudar para pausa curta: setCounter(pausaCurta)
                    const updatePromoCompletas = pomoCompletas + 1
                    setPomoCompletas(updatePromoCompletas)
                    return 'Pausa curta'
                } else if (pomoCount % 2 === 0 && pomoCount < 7) {
                    setCounter(focoHoje.tempoDeFoco) // Mudar para tempo de foco
                    return 'Foco'
                } else if (pomoCount === 7) {
                    setCounter(focoHoje.pausaLonga) // Mudar para pausa longa
                    const updatePromoCompletas = pomoCompletas + 1
                    setPomoCompletas(updatePromoCompletas)
                    return 'Pausa Longa'
                } else if (pomoCount > 7) {
                    setPomoCount(1)
                    setCounter(focoHoje.tempoDeFoco) //Mudar para tempo de foco
                    return 'Foco'
                }
            })

            setPomoCount(prevPomoCount => prevPomoCount + 1)

        }
        return () => clearInterval(timer);
    }, [counter, counterPlayPause]);

    function toggle() {
        if (pomoCount === 0) {
            setPomoCount(1)
            setCounterStatus('Foco')
            play()
        } // Significa o início da contagem. Depois disso a contagem é gerenciada dentro do useEffect.
        setCounterPlayPause((prevStat) => !prevStat)
    }


    function minutos(sec) {
        let segundos
        if (sec % 60 === 0) {
            segundos = '00'
        } else if (sec % 60 < 10) {
            segundos = '0' + sec % 60

        } else {
            segundos = sec % 60
        }
        return Math.floor(sec / 60) + ':' + segundos //.slice(0,2)
    }

    for (let i = 0; i < 8; i++){

    }



    return (
        <div className='pomodoro'>
            <h1>{minutos(counter)}</h1>
            <h3>{counterStatus}</h3>
            <PomoCountBar 
                pomoCount={pomoCompletas}
            />
            <div onClick={toggle} className='play-pause'>{counterPlayPause ? <BsPauseCircle /> : <BsPlayCircle />}</div>
        </div>
    )
}

export default Pomodoro
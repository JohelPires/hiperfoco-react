import React from 'react'

function PomoCountBar(props) {

    const n = [...Array(4).keys()]

    const elements = n.map(i => {

        if (props.pomoCount > i) {
            return <div className='umfoco concluido'></div>
        } else {
            return <div className='umfoco'></div>
        }
        
    })
    const elements2 = n.map(i => {

        if (props.pomoCount > i+4) {
            return <div className='umfoco concluido'></div>
        } else {
            return <div className='umfoco'></div>
        }
        
    })

  return (

    <div className='counter-container'>
        {/* <div className='umfoco concluido'></div>
        <div className='umfoco atual'></div>
        <div className='umfoco'></div>
        <div className='umfoco'></div>
        <div className="space"></div>
        <div className='umfoco'></div>
        <div className='umfoco'></div>
        <div className='umfoco'></div>
        <div className='umfoco'></div> */}
        {/* <h5>{props.pomoCount}</h5> */}

        {elements}<div className="space"></div>{elements2}

    </div> 

  )
}

export default PomoCountBar
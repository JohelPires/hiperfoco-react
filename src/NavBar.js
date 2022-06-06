import React from 'react'
// import { BsGearFill } from 'react-icons/bs'

function NavBar(props) {



  return (
    <nav className='navbar'>
        <h1>hiperfoco</h1>
        <div className='menu-items'>
            <h3 onClick={props.toggleSobre}>Sobre</h3>
            <h3>Configurar</h3>
        </div>
    </nav>
  )
}

export default NavBar
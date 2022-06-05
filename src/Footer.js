import React from 'react'

function Footer() {

const data = new Date()

  return (
    <div className='footer'>Copyright &#169; {data.getFullYear()} Johel Pires</div>
  )
}

export default Footer
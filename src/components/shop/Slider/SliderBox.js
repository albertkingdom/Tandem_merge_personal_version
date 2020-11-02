import React, { useEffect, useState } from 'react'

export default function SliderBox({
  handletype,
  title,
  isHoverOnWhich,
  onHover,
  onLeave,
}) {
  const [isMouseEnter, setIsMouseEnter] = useState(false)

  //   const activebox = {
  //     background: 'white',
  //     opacity: '80%',
  //     transform: 'scale(0.7)',
  //     transition: 'all 0.5s ease-in-out',
  //   }
  let activebox
  if (isMouseEnter && isHoverOnWhich === title) {
    activebox = {
      background: 'white',
      opacity: '80%',
      transform: 'scale(0.7)',
      transition: 'all 0.5s ease-in-out',
    }
  } else if (isHoverOnWhich) {
    activebox = { background: 'white', opacity: '50%', transform: 'scale(0.8)' }
  } else {
    activebox = null
  }
  return (
    <div
      className="p-0 col col-lg-4 col-6 flex-grow-1"
      onMouseEnter={() => {
        setIsMouseEnter(true)
      }}
      onMouseOver={onHover}
      onMouseLeave={() => setIsMouseEnter(false)}
      onMouseOut={onLeave}
    >
      <div
        className="sbox-s position-relative"
        style={activebox}
        // onMouseEnter={() => handleIsHoverOnWhich('123')}
        // onMouseLeave={onLeave}
      >
        <button onClick={handletype}>{title}</button>
      </div>
    </div>
  )
}

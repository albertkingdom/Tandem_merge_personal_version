import React, { useEffect, useState, useRef } from 'react'

import '../../../css/shop.scss'
import SliderBox from './SliderBox'

const background_list = [
  '/images/shop/bigImage/17_Super Mega Baseball 2_0.jpg',
  '/images/shop/bigImage/11_Overcooked! 2_14.jpg',
  '/images/shop/bigImage/7_CODE VEIN_7.jpg',
  '/images/shop/bigImage/3_Grand Theft Auto V_47.jpg',
  "/images/shop/bigImage/40_Assassin's Creed® Odyssey_2.jpg",
  '/images/shop/bigImage/MoToGP.jpg',
]

function Slider({ handletype }) {
  const [isHoverOnWhich, setIsHoverOnWhich] = useState('')
  const backgroundRef = useRef(null)

  useEffect(() => {
    const [pic1, pic2, pic3, pic4, pic5, pic6] = background_list

    // console.log(backgroundRef)
    switch (isHoverOnWhich) {
      case '運動':
        backgroundRef.current.style.backgroundImage = `url('${pic1}')`

        return
      case '休閒':
        backgroundRef.current.style.backgroundImage = `url('${pic2}')`

        return
      case '血腥':
        backgroundRef.current.style.backgroundImage = `url('${pic3}')`

        return
      case '冒險':
        backgroundRef.current.style.backgroundImage = `url('${pic4}')`

        return
      case '動作':
        backgroundRef.current.style.backgroundImage = `url('${pic5}')`

        return
      case '競速':
        backgroundRef.current.style.backgroundImage = `url('${pic6}')`

        return
      default:
        backgroundRef.current.style.backgroundImage = ''
    }
  }, [isHoverOnWhich])

  return (
    <>
      <div className="s-slider-box d-flex h5" ref={backgroundRef}>
        <SliderBox
          handletype={() => handletype(5)}
          title="運動"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => setIsHoverOnWhich('運動')}
          onLeave={() => setIsHoverOnWhich('')}
        />

        <SliderBox
          handletype={() => handletype(1)}
          title="休閒"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => setIsHoverOnWhich('休閒')}
          onLeave={() => setIsHoverOnWhich('')}
        />

        <SliderBox
          handletype={() => handletype(3)}
          title="血腥"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => setIsHoverOnWhich('血腥')}
          onLeave={() => setIsHoverOnWhich('')}
        />

        <SliderBox
          handletype={() => handletype(4)}
          title="冒險"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => setIsHoverOnWhich('冒險')}
          onLeave={() => setIsHoverOnWhich('')}
        />

        <SliderBox
          handletype={() => handletype(2)}
          title="動作"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => setIsHoverOnWhich('動作')}
          onLeave={() => setIsHoverOnWhich('')}
        />

        <SliderBox
          handletype={() => handletype(6)}
          title="競速"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => setIsHoverOnWhich('競速')}
          onLeave={() => setIsHoverOnWhich('')}
        />
      </div>
    </>
  )
}

export default Slider

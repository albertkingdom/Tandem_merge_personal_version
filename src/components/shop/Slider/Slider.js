import React, { useState } from 'react'

import '../../../css/shop.scss'
import styles from './Slider.module.css'
import SliderBox from './SliderBox'

const background_list = [
  '/images/shop/bigImage/17_Super Mega Baseball 2_0.jpg',
  '/images/shop/bigImage/11_Overcooked! 2_14.jpg',
  '/images/shop/bigImage/7_CODE VEIN_7.jpg',
  '/images/shop/bigImage/3_Grand Theft Auto V_47.jpg',
  '/images/shop/bigImage/40_Assassins Creed Odyssey_2.jpg',
  '/images/shop/bigImage/MoToGP.jpg',
]

function Slider({ handletype }) {
  const [isHoverOnWhich, setIsHoverOnWhich] = useState('')

  const [backgroundSelect, setBackgroundSelect] = useState() //for background selecting

  return (
    <>
      <div className="s-slider-box d-flex flex-wrap h5">
        {/* div for background of s-slider-box */}
        {[0, 1, 2, 3, 4, 5].map(item => (
          <div
            className={`${styles.sliderBackground} ${
              backgroundSelect === item ? `${styles.active}` : ''
            }`}
            style={{ backgroundImage: `url('${background_list[item]}')` }}
          ></div>
        ))}

        <SliderBox
          handletype={() => handletype(5)}
          title="運動"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => {
            setIsHoverOnWhich('運動')
            setBackgroundSelect(0)
          }}
          onLeave={() => {
            setIsHoverOnWhich('')
            setBackgroundSelect()
          }}
        />

        <SliderBox
          handletype={() => handletype(1)}
          title="休閒"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => {
            setIsHoverOnWhich('休閒')
            setBackgroundSelect(1)
          }}
          onLeave={() => {
            setIsHoverOnWhich('')
            setBackgroundSelect()
          }}
        />

        <SliderBox
          handletype={() => handletype(3)}
          title="血腥"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => {
            setIsHoverOnWhich('血腥')
            setBackgroundSelect(2)
          }}
          onLeave={() => {
            setIsHoverOnWhich('')
            setBackgroundSelect()
          }}
        />

        <SliderBox
          handletype={() => handletype(4)}
          title="冒險"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => {
            setIsHoverOnWhich('冒險')
            setBackgroundSelect(3)
          }}
          onLeave={() => {
            setIsHoverOnWhich('')
            setBackgroundSelect()
          }}
        />

        <SliderBox
          handletype={() => handletype(2)}
          title="動作"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => {
            setIsHoverOnWhich('動作')
            setBackgroundSelect(4)
          }}
          onLeave={() => {
            setIsHoverOnWhich('')
            setBackgroundSelect()
          }}
        />

        <SliderBox
          handletype={() => handletype(6)}
          title="競速"
          isHoverOnWhich={isHoverOnWhich}
          onHover={() => {
            setIsHoverOnWhich('競速')
            setBackgroundSelect(5)
          }}
          onLeave={() => {
            setIsHoverOnWhich('')
            setBackgroundSelect()
          }}
        />
      </div>
    </>
  )
}

export default Slider

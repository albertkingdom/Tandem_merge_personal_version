import React, { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import $ from 'jquery'
import '../../css/shop.scss'

function Slider(props) {
  useEffect(() => {
    const background_list = [
      '/images/shop/bigImage/17_Super Mega Baseball 2_0.jpg',
      '/images/shop/bigImage/1_MONSTER HUNTER_ WORLD_2.jpg',
      '/images/shop/bigImage/1_MONSTER HUNTER_ WORLD_3.jpg',
      '/images/shop/bigImage/1_MONSTER HUNTER_ WORLD_4.jpg',
      '/images/shop/bigImage/1_MONSTER HUNTER_ WORLD_5.jpg',
    ]
    console.log(background_list[0])
    let index = 0
    $('.sbox-s')
      .mouseenter(function() {
        $(this)
          .css({ background: 'white', opacity: '80%', transform: 'scale(0.7)' })
          .parent()
          .siblings()
          .find('.sbox-s')
          .css({ background: 'white', opacity: '50%', transform: 'scale(0.8)' })

        //目前是第幾個sbox-s
        index = $(this).index('.sbox-s')
        // console.log($(this).parent().children().find('.sbox-s'))
        // console.log('sbox-s mouseenter')
        console.log(index)
        $('.box').css(
          'background-image',
          'url("' + background_list[index] + '")'
        )
      })
      .mouseleave(function() {
        $(this).css({
          background: 'white',
          opacity: '50%',
          transform: 'scale(0.8)',
        })
        $('.box').css(
          'background-image',
          "url('/images/shop/bigImage/1_MONSTER HUNTER_ WORLD_0.jpg')"
        )
      })
    // $('.sbox').mouseleave(function() {
    //   $('.sbox-s').css({ transform: 'scale(1)' })
      
    // })
    $('.box').mouseleave(function() {
      $('.sbox-s').css({ transform: 'scale(1)' })
      
    })
  }, [])
  // console.log('目前樣式',props.type)
  return (
    <>
      <div className="box d-flex">
        <div className="p-0 col col-lg-4 col-sm-6 flex-grow-1">
          <div className="sbox-s position-relative">
            <Link onClick={()=>props.handletype(2)} to={{ search: `type=2` }}>運動</Link>
            <h2>運動</h2>
          </div>
        </div>
        <div className="p-0 col col-lg-4 col-sm-6 flex-grow-1">
          <div className="sbox-s position-relative">
            <h2>休閒</h2>
          </div>
        </div>
        <div className="p-0 col col-lg-4 col-sm-6 flex-grow-1">
          <div className="sbox-s position-relative">
            <h2>血腥</h2>
          </div>
        </div>
        <div className="p-0 col col-lg-4 col-sm-6 flex-grow-1">
          <div className="sbox-s position-relative">
            <h2>冒險</h2>
          </div>
        </div>
        <div className="p-0 col col-lg-4 col-sm-6 flex-grow-1">
          <div className="sbox-s position-relative">
            <h2>動作</h2>
          </div>
        </div>
        <div className="p-0 col col-lg-4 col-sm-6 flex-grow-1">
          <div className="sbox-s position-relative">
            <h2>競速</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Slider

import React, { Component } from 'react'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import { NavLink } from 'react-router-dom'
import '../../css/owl.scss'
function Carousell() {
  return (
    <>
      <OwlCarousel
        items={1}
        className="owl-theme mt-4"
        loop
        autoplay={true}
        autoplayHoverPause={true}
        autoHeight={true}
        autoplayTimeout={2000}
      >
        <NavLink to="#">
          <div>
            <img className="img" src={'/assets/img/black_friday_sale.jpg'} />
          </div>
        </NavLink>
        <NavLink to="#">
          <div>
            <img className="img" src={'/assets/img/hades.jpg'} />
          </div>
        </NavLink>
        <NavLink to="#">
          <div>
            <img className="img" src={'/assets/img/zombie.jpg'} />
          </div>
        </NavLink>
        <NavLink to="#">
          <div>
            <img className="img" src={'/assets/img/EncoreSale.jpg'} />
          </div>
        </NavLink>
      </OwlCarousel>
    </>
  )
}

export default Carousell

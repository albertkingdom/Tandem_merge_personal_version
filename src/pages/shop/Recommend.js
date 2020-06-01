import React, { useState, useEffect } from 'react'
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
} from 'react-icons/ai'
import { Link, withRouter } from 'react-router-dom'
function Recommend(props) {
  const [index, setIndex] = useState(0)
  let clickcount = index
  function toLeft() {
    if (clickcount <= 1) {
      clickcount++
    }
    console.log(clickcount)
    document.querySelector('.s-recommend-row').style.left = `-${clickcount *
      400}px`
  }
  function toRight() {
    if (clickcount > 0) {
      clickcount--
    }
    console.log(clickcount)
    document.querySelector('.s-recommend-row').style.left = `-${clickcount *
      400}px`
  }
  const recommend = (
    <>
      <div className="d-flex justify-content-center my-5 ">
        <div className="s-recommend col-12 px-5 py-3">
          <button
            id="toLeft"
            style={{
              // zIndex: 99,
              position: 'absolute',
              height: '90%',
              left: '0px',
              // top: '120px',
              backgroundColor: 'transparent',
              border: 'none',
            }}
            onClick={() => toLeft()}
          >
            <AiOutlineCaretLeft style={{ fontSize: '30px', color: 'black' }} />
          </button>
          <button
            id="toRight"
            style={{
              zIndex: 99,
              position: 'absolute',
              height: '90%',
              right: '0px',
              // top: '120px',
              backgroundColor: 'transparent',
              border: 'none',
            }}
            onClick={() => toRight()}
          >
            <AiOutlineCaretRight style={{ fontSize: '30px', color: '' }} />
          </button>
          <h4 className="text-center">推薦商品</h4>
          <div className="" style={{ overflow: 'hidden' }}>
            <div
              className="d-flex s-recommend-row mx-5 px-2"
              style={{ transition: '.5s' }}
            >
              <div className="s-recommend-pic">
                <Link to="/product/1">
                  <img
                    className="img-fluid"
                    src="/images/shop/small_Img/1_Shadowverse CCG.jpg"
                    alt=""
                    // onClick={() => props.changeurl(1)}
                  />
                </Link>
              </div>
              <div className="s-recommend-pic">
                <Link to="/product/6">
                  <img
                    className="img-fluid"
                    src="/images/shop/small_Img/6_MOBIUS FINAL FANTASY.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="s-recommend-pic">
                <Link to="/product/218">
                  <img
                    className="img-fluid"
                    src="/images/shop/small_Img/2_NBA 2K20.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="s-recommend-pic">
                <Link to="/product/76">
                  <img
                    className="img-fluid"
                    src="/images/shop/small_Img/26_DOOM.jpg"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  return <>{recommend}</>
}

export default Recommend

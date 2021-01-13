import React, { useState, useRef } from 'react'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import '../../css/shop.scss'
import styles from './Recommend.module.scss'

function Recommend(props) {
  const [index, setIndex] = useState(0)
  const myRef = useRef(null)

  function toNext() {
    let previndex = index
    if (index < 2) {
      setIndex(prev => prev + 1)
      myRef.current.style.left = `-${(previndex + 1) * 420}px`
    } else {
      setIndex(0)
      previndex = 0
      myRef.current.style.left = `0px`
    }
  }
  function toPrevious() {
    let previndex = index
    if (index > 0) {
      setIndex(prev => prev - 1)
      myRef.current.style.left = `-${(previndex - 1) * 420}px`
    } else {
      setIndex(2)
      // previndex = 2
      myRef.current.style.left = `-820px`
    }
  }
  const recommend = (
    <>
      <div className="s-recommend col-12 px-5 py-3">
        <button id="toPrevious" onClick={() => toPrevious()}>
          <AiOutlineCaretLeft style={{ fontSize: '30px', color: 'black' }} />
        </button>
        <button id="toNext" onClick={() => toNext()}>
          <AiOutlineCaretRight style={{ fontSize: '30px', color: '' }} />
        </button>
        <h4 className="text-center">推薦商品</h4>
        <div className={styles.window}>
          <ul
            className="d-flex s-recommend-row "
            style={{ transition: '.5s' }}
            ref={myRef}
          >
            <li className="s-recommend-pic">
              <Link to="/product/1">
                <img
                  className="img-fluid"
                  src="/images/shop/small_Img/1_Shadowverse CCG.jpg"
                  alt=""
                />
              </Link>
            </li>
            <li className="s-recommend-pic">
              <Link to="/product/6">
                <img
                  className="img-fluid"
                  src="/images/shop/small_Img/6_MOBIUS FINAL FANTASY.jpg"
                  alt=""
                />
              </Link>
            </li>
            <li className="s-recommend-pic">
              <Link to="/product/218">
                <img
                  className="img-fluid"
                  src="/images/shop/small_Img/2_NBA 2K20.jpg"
                  alt=""
                />
              </Link>
            </li>
            <li className="s-recommend-pic">
              <Link to="/product/76">
                <img
                  className="img-fluid"
                  src="/images/shop/small_Img/26_DOOM.jpg"
                  alt=""
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
  return <>{recommend}</>
}

export default Recommend

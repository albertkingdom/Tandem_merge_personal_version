import React, { useState, useEffect, useRef } from 'react'
import { withRouter, NavLink, Switch, Route, Link } from 'react-router-dom'
import Config from './Config'

import Comment2 from './Comment2'
import Recommend from './Recommend'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineArrowsAlt,
} from 'react-icons/ai'
import '../../css/shop.scss'
import Swal from 'sweetalert2' //sweetalert2
import $ from 'jquery'
import Lightbox from 'react-image-lightbox' //lightbox
import 'react-image-lightbox/style.css' //lightbox

import {
  updateAzenToLocalStorage,
  addAzenToDatabase,
  cancelAzenToDatabase,
  updateCartToLocalStorage,
} from '../../components/shop/Functions/Function'

function Product(props) {
  const [myproduct, setMyproduct] = useState([])
  const [configORcomment, setCofigORcomment] = useState(1) //1:建議配備, 2:留言板
  const [whoAzen, setWhoAzen] = useState('') //記錄此商品被那些mbId收藏，從商品database撈出的資料

  const [mbLikeThisProduct, setMbLikeThisProduct] = useState(false)

  const [photoIndex, setPhotoIndex] = useState(0) //lightbox
  const [isOpen, setIsOpen] = useState(false) //lightbox
  const [mbAzen_arr_state, setMbAzen_arr_state] = useState([]) //按讚顯示
  const [lightBoxImgArray, setLightBoxImgArray] = useState([]) //大圖路徑
  let productId = props.match.params.type

  useEffect(() => {
    //fetch database product撈所有資料(不分類)
    async function getDataFromServer() {
      const request = new Request(
        'http://localhost:6001/product/' + productId,
        {
          method: 'GET',
          credentials: 'include',
        }
      )
      const response = await fetch(request)
      const data = await response.json()

      setMyproduct(data.rows[0])

      setWhoAzen(JSON.parse(data.rows[0].memberFavoriteId))

      // console.log(data.rows)
    }
    getDataFromServer()
  }, [productId])

  //一開始複製一份LoginUserData的Azen，set到Local的Azen值、setMbAzen_arr_state
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('LoginUserData')) !== null) {
      if (localStorage.getItem('Azen') == null) {
        let mbAzen_str = JSON.parse(localStorage.getItem('LoginUserData'))
          .mbAzen
        mbAzen_str = mbAzen_str.replace('[', '').replace(']', '')
        let mbAzen_arr = mbAzen_str.split(',')
        // const currentLocalAzen = JSON.parse(localStorage.getItem('Azen')) || []
        localStorage.setItem('Azen', JSON.stringify(mbAzen_arr))
        setMbAzen_arr_state(mbAzen_arr)
      } else {
        const currentLocalAzen = JSON.parse(localStorage.getItem('Azen'))
        setMbAzen_arr_state(currentLocalAzen)
      }
    } else {
      localStorage.removeItem('Azen') //如果登出就刪掉localstorage Azen
    }
  }, [])
  //點商品小圖=>展示大圖
  function clickTochangePic(e) {
    // console.log('this is',e)
    let newAttr = e.getAttribute('src')
    // console.log(newAttr)
    document.querySelector('.s-bigImg img').setAttribute('src', newAttr)
    // e.style.border = '1px solid orange'
    // console.log($(e))
  }
  //點到的小圖加上邊框
  // useEffect(() => {
  //   $('.s-smallImg li img').click(function() {
  //     $(this)
  //       .css('border', '2px solid orange')
  //       .parent('li')
  //       .siblings()
  //       .children()
  //       .css('border', '0px')
  //   })
  // }, [])

  useEffect(() => {
    //處理小圖檔名，組合成大圖檔名
    let bigImgarray = []
    let oldname = String(myproduct.itemImg)
    // oldname.toString()
    let newname = oldname.split('.')
    // console.log(newname[0])
    for (let i = 0; i <= 3; i++) {
      bigImgarray.push(`/images/shop/bigImage/` + newname[0] + '_' + i + `.jpg`)
    }
    console.log(bigImgarray)
    setLightBoxImgArray(bigImgarray)
  }, [myproduct])

  useEffect(() => {
    //儲存瀏覽歷程記錄至localstorage
    function addToHistory() {
      const currentHistory =
        JSON.parse(localStorage.getItem('browse-history')) || []

      //沒有在history裡就加入
      if (currentHistory.indexOf(`${productId}`) === -1) {
        const newHistory = [...currentHistory, productId]
        localStorage.setItem('browse-history', JSON.stringify(newHistory))
      }
    }
    addToHistory()
  }, [productId])

  return (
    <>
      <div>
        {isOpen && (
          <Lightbox
            mainSrc={lightBoxImgArray[photoIndex]}
            nextSrc={
              lightBoxImgArray[(photoIndex + 1) % lightBoxImgArray.length]
            }
            prevSrc={
              lightBoxImgArray[
                (photoIndex + lightBoxImgArray.length - 1) %
                  lightBoxImgArray.length
              ]
            }
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + lightBoxImgArray.length - 1) %
                  lightBoxImgArray.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % lightBoxImgArray.length)
            }
          />
        )}
      </div>
      <div className="d-flex flex-wrap container">
        <div className="col col-12 col-md-6 my-5">
          <div
            className="text-center s-bigImg"
            style={{ position: 'relative' }}
          >
            <img
              className="img-fluid"
              src={`/images/shop/small_Img/${myproduct.itemImg}`}
              alt=""
            />
            <button
              type="button"
              style={{
                position: 'absolute',
                right: '0px',
                backgroundColor: 'transparent',
                border: '0px',
              }}
              onClick={() => setIsOpen(true)}
            >
              <AiOutlineArrowsAlt
                style={{ color: 'white', fontSize: '24px' }}
              />
            </button>
          </div>
          <ul className="list-unstyled d-flex justify-content-center s-smallImg mt-3">
            {lightBoxImgArray.map((img, index) => {
              return (
                <li
                  key={index}
                  onClick={e => clickTochangePic(e.target)}
                  style={{ margin: '5px' }}
                >
                  <img className="img-fluid mx-1" src={img} alt="" />
                </li>
              )
            })}
          </ul>
        </div>
        <div className="col col-sm-12 col-md-6 my-5">
          <div className="d-flex">
            <span className="p">NT$:</span>
            <h2>{myproduct.itemPrice}</h2>
          </div>

          <h3>{myproduct.itemName}</h3>
          <p style={{ minHeight: '150px' }}>{myproduct.itemIntro}</p>
          <div className="row">
            {mbAzen_arr_state.indexOf(`${myproduct.itemId}`) === -1 ? (
              <button
                type="button"
                className="btn btn-outline-info mx-2 s-btn-common col-5 col-md-4"
                onClick={() => {
                  if (
                    JSON.parse(localStorage.getItem('LoginUserData')) !== null
                  ) {
                    addAzenToDatabase({
                      userId: JSON.parse(localStorage.getItem('LoginUserData'))
                        .mbId,
                      likeproductId: myproduct.itemId,
                    })
                    setMbLikeThisProduct(true)
                    updateAzenToLocalStorage(myproduct.itemId)
                    setMbAzen_arr_state(prevazenlist => [
                      ...prevazenlist,
                      `${myproduct.itemId}`,
                    ])
                  } else {
                    Swal.fire('請先登入!')
                  }
                }}
              >
                <AiOutlineHeart
                  style={{ color: '#F9A451', fontSize: '24px' }}
                />
                加入收藏清單
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-info mx-2 s-btn-common col-5 col-md-4"
                style={{ backgroundColor: '#79cee2', color: 'white' }}
                onClick={() => {
                  updateAzenToLocalStorage(myproduct.itemId)
                  setMbLikeThisProduct(false)
                  cancelAzenToDatabase({
                    userId: JSON.parse(localStorage.getItem('LoginUserData'))
                      .mbId,
                    unlikeproductId: myproduct.itemId,
                  })
                  setMbAzen_arr_state(prevazenlist =>
                    prevazenlist.filter(id => id !== `${myproduct.itemId}`)
                  )
                }}
              >
                <AiFillHeart style={{ color: '#F9A451', fontSize: '24px' }} />
                已加入收藏
              </button>
            )}
            <button
              type="button"
              className="btn btn-outline-info mx-2 s-btn-common col-5 col-md-4"
              onClick={() =>
                updateCartToLocalStorage({
                  id: myproduct.itemId,
                  name: myproduct.itemName,
                  amount: 1,
                  price: myproduct.itemPrice,
                  img: myproduct.itemImg,
                })
              }
            >
              <AiOutlineShoppingCart
                style={{ color: '#F9A451', fontSize: '24px' }}
              />
              加入購物車
            </button>
          </div>
          <div className="row h5 m-2">有{whoAzen.length}人收藏此遊戲</div>
          <div className="row mt-2 h6">
            <div className="col-3 ">發行商:</div>
            <div className="col-7 ">{myproduct.vName}</div>
          </div>
          <div className="row h6">
            <div className="col-3 ">發行日期: </div>
            <div className="col-4 ">{myproduct.itemDate}</div>
          </div>
          <div className="row h6">
            <div className="col-3 ">遊戲類別:</div>
            <div className="col-4 ">{myproduct.categoryName}</div>
          </div>
        </div>
      </div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <button
            className={[
              'section-select',
              configORcomment === 1 ? 'active' : '',
            ].join(' ')}
            onClick={() => {
              setCofigORcomment(1)
            }}
          >
            建議配備
          </button>
        </li>
        <li className="nav-item">
          <button
            className={[
              'section-select',
              configORcomment === 2 ? 'active' : '',
            ].join(' ')}
            onClick={() => {
              setCofigORcomment(2)
            }}
          >
            留言評論
          </button>
        </li>
      </ul>
      <div className="">
        {configORcomment === 1 ? <Config /> : <Comment2 props={myproduct} />}
      </div>
      <div className="container">
        <Recommend />
      </div>
    </>
  )
}

export default withRouter(Product)

import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Config from './Config'
import CommentList from './CommentList'
import Recommend from './Recommend'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineArrowsAlt,
} from 'react-icons/ai'
import '../../css/shop.scss'
import Swal from 'sweetalert2' //sweetalert2

import Lightbox from 'react-image-lightbox' //lightbox
import 'react-image-lightbox/style.css' //lightbox

import {
  updateAzenToLocalStorage,
  addAzenToDatabase,
  cancelAzenToDatabase,
  updateCartToLocalStorage,
} from '../../components/shop/Functions/Function'
import useLoginStatus from '../../components/shop/customHook/useLoginStatus'
import {
  getAzenListfromStorage,
  addAzenIdToRedux,
  removeAzenIdFromRedux,
} from '../../actions/SazenActions'
import { increaseCartCount } from '../../actions/ScartActions'

function Product(props) {
  const isLogin = useLoginStatus() //custom hook

  const [myproduct, setMyproduct] = useState([])
  const [configORcomment, setCofigORcomment] = useState(1) //1:建議配備, 2:留言板
  const [whoAzen, setWhoAzen] = useState('') //記錄此商品被那些mbId收藏，從商品database撈出的資料
  const [photoIndex, setPhotoIndex] = useState(0) //lightbox
  const [isOpen, setIsOpen] = useState(false) //lightbox
  const [lightBoxImgArray, setLightBoxImgArray] = useState([]) //大圖路徑

  const dispatch = useDispatch()
  //user按讚相關
  const reduxAzenList = useSelector(state => state.SuserAzen.list)
  const reduxAzenStatus = useSelector(
    state => state.SuserAzen.isGetDataFromStorage
  )

  let productId = props.match.params.id

  useEffect(() => {
    //fetch database product撈所有資料(不分類)
    async function getDataFromServer() {
      try {
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
      } catch (error) {
        console.log(error)
      }

      // console.log(data.rows)
    }
    getDataFromServer()
  }, [productId])

  useEffect(() => {
    //確認redux內有無按讚清單
    if (isLogin) {
      if (!reduxAzenStatus) {
        //if isGetDataFrom.. 是false，沒有從localstorage抓資料到redux
        dispatch(getAzenListfromStorage())
      }
    }
  }, [dispatch, isLogin, reduxAzenStatus])
  //點商品小圖=>展示大圖
  function clickTochangePic(e) {
    // console.log('this is',e)
    let newAttr = e.getAttribute('src')
    // console.log(newAttr)
    document.querySelector('.s-bigImg img').setAttribute('src', newAttr)
    // e.style.border = '1px solid orange'
    // console.log($(e))
  }

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

    setLightBoxImgArray(bigImgarray)
  }, [myproduct])

  useEffect(() => {
    //儲存瀏覽歷程記錄至localstorage
    function addToHistory() {
      let currentHistory =
        JSON.parse(localStorage.getItem('browse-history')) || []
      // console.log('product id', typeof +productId)

      //沒有在history裡就加入
      if (
        currentHistory.filter(item => item.itemId === +productId).length === 0
      ) {
        // const newHistory = [...currentHistory, myproduct]
        currentHistory.push(myproduct)

        localStorage.setItem('browse-history', JSON.stringify(currentHistory))
      }
    }
    if (myproduct.length !== 0) {
      addToHistory()
    }
  }, [productId, myproduct])

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
            {reduxAzenList.indexOf(`${myproduct.itemId}`) === -1 ? (
              <button
                type="button"
                className="btn btn-outline-info mx-2 s-btn-common col-5 col-md-4"
                onClick={() => {
                  if (isLogin) {
                    addAzenToDatabase({
                      userId: JSON.parse(localStorage.getItem('LoginUserData'))
                        .mbId,
                      likeproductId: myproduct.itemId,
                    })
                    updateAzenToLocalStorage(myproduct.itemId)
                    dispatch(addAzenIdToRedux(myproduct.itemId))
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
                  cancelAzenToDatabase({
                    userId: JSON.parse(localStorage.getItem('LoginUserData'))
                      .mbId,
                    unlikeproductId: myproduct.itemId,
                  })

                  dispatch(removeAzenIdFromRedux(myproduct.itemId))
                }}
              >
                <AiFillHeart style={{ color: '#F9A451', fontSize: '24px' }} />
                已加入收藏
              </button>
            )}
            <button
              type="button"
              className="btn btn-outline-info mx-2 s-btn-common col-5 col-md-4"
              onClick={() => {
                updateCartToLocalStorage({
                  id: myproduct.itemId,
                  name: myproduct.itemName,
                  amount: 1,
                  price: myproduct.itemPrice,
                  img: myproduct.itemImg,
                })
                dispatch(increaseCartCount(myproduct.itemId))
              }}
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
        {configORcomment === 1 ? (
          <Config />
        ) : (
          <CommentList props={myproduct} productId={productId} />
        )}
      </div>
      <div className="container">
        <Recommend />
      </div>
    </>
  )
}

export default withRouter(Product)

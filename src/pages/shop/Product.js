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

// import Lightbox from 'react-image-lightbox' //lightbox
// import 'react-image-lightbox/style.css' //lightbox
import LightboxForImage from '../../components/shop/LightboxForImage'
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
  const { isLogin } = useLoginStatus() //custom hook

  const [myproduct, setMyproduct] = useState([])
  const [configORcomment, setCofigORcomment] = useState(1) //1:建議配備, 2:留言板
  const [whoAzen, setWhoAzen] = useState('') //記錄此商品被那些mbId收藏，從商品database撈出的資料

  const [isLightboxOpen, setIsLightboxOpen] = useState(false) //lightbox
  const [lightBoxImgArray, setLightBoxImgArray] = useState([]) //大圖路徑
  const mainImgRef = useRef(null)
  const dispatch = useDispatch()
  const handleOpenLightbox = value => {
    setIsLightboxOpen(value)
  }
  //user按讚相關
  const reduxAzenList = useSelector(state => state.SuserAzen.list)
  const reduxAzenStatus = useSelector(
    state => state.SuserAzen.isGetDataFromStorage
  )
  const handleCancelAzen = productId => {
    updateAzenToLocalStorage(productId)
    dispatch(removeAzenIdFromRedux(productId))
    cancelAzenToDatabase({
      userId: JSON.parse(localStorage.getItem('LoginUserData')).mbId,
      unlikeproductId: productId,
    })
  }
  const handleAzen = productId => {
    if (isLogin) {
      addAzenToDatabase({
        userId: JSON.parse(localStorage.getItem('LoginUserData')).mbId,
        likeproductId: productId,
      })
      updateAzenToLocalStorage(productId)

      dispatch(addAzenIdToRedux(productId))
    } else {
      Swal.fire('請先登入')
    }
  }
  let productId = props.match.params.id
  //點商品小圖=>展示大圖
  function clickTochangePic(event) {
    let newAttr = event.target.getAttribute('src')
    mainImgRef.current.src = newAttr
  }

  useEffect(() => {
    //fetch database product撈所有資料(不分類)
    async function getDataFromServer() {
      try {
        const request = new Request(
          `http://localhost:6001/product/${productId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        )
        const response = await fetch(request)
        const data = await response.json()

        setMyproduct(data.rows[0])
        setWhoAzen(data.rows[0].memberFavoriteId)
      } catch (error) {
        console.log(error)
      }

      // console.log(data.rows)
    }
    getDataFromServer()
  }, [productId])

  useEffect(() => {
    //確認redux內有無按讚清單
    if (isLogin && !reduxAzenStatus) {
      //if isGetDataFrom.. 是false，沒有從localstorage抓資料到redux
      dispatch(getAzenListfromStorage())
    }
  }, [dispatch, isLogin, reduxAzenStatus])

  useEffect(() => {
    //處理小圖檔名，組合成大圖檔名

    if (myproduct.itemImg) {
      const bigImgarray = Array.from(Array(4).keys()).map(
        item =>
          `/images/shop/bigImage/${myproduct.itemImg.split('.')[0]}_${item}.jpg`
      )
      setLightBoxImgArray(bigImgarray)
    }
  }, [myproduct])

  useEffect(() => {
    //儲存瀏覽歷程記錄至localstorage
    function addToHistory() {
      const productId = props.match.params.id
      let currentHistory =
        JSON.parse(localStorage.getItem('browse-history')) || []
      const uniqueId = [...new Set(currentHistory.map(item => item.itemId))]

      !uniqueId.includes(+productId) && currentHistory.push(myproduct)

      localStorage.setItem('browse-history', JSON.stringify(currentHistory))
    }
    if (myproduct.length !== 0) {
      addToHistory()
    }
  }, [productId, myproduct, props.match.params.id])

  useEffect(() => {
    let start = 0
    const timerId = setInterval(() => {
      // console.log('123')
      mainImgRef.current.src = lightBoxImgArray[start++ % 4]
    }, 2500)
    return () => clearInterval(timerId)
  }, [lightBoxImgArray])

  return (
    <>
      <div>
        {isLightboxOpen && (
          <LightboxForImage
            lightBoxImgArray={lightBoxImgArray}
            handleOpenLightbox={handleOpenLightbox}
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
              ref={mainImgRef}
            />
            <button
              type="button"
              style={{
                position: 'absolute',
                right: '0px',
                backgroundColor: 'transparent',
                border: '0px',
              }}
              onClick={() => setIsLightboxOpen(true)}
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
                  onClick={clickTochangePic}
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
            {!reduxAzenList.includes(`${myproduct.itemId}`) ? (
              <button
                type="button"
                className="btn btn-outline-info mx-2 s-btn-common col-5 col-md-4"
                onClick={() => handleAzen(myproduct.itemId)}
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
                onClick={() => handleCancelAzen(myproduct.itemId)}
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
            className={`section-select ${
              configORcomment === 1 ? 'active' : ''
            }`}
            onClick={() => {
              setCofigORcomment(1)
            }}
          >
            建議配備
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`section-select ${
              configORcomment === 2 ? 'active' : ''
            }`}
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
          <CommentList productId={productId} />
        )}
      </div>
      <div className="container">
        <Recommend />
      </div>
    </>
  )
}

export default withRouter(Product)

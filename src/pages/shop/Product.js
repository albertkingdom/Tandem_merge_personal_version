import React, { useState, useEffect } from 'react'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import Config from './Config'
// import Comment from './Comment'
import Comment2 from './Comment2'
import Recommend from './Recommend'
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiOutlineArrowsAlt,
} from 'react-icons/ai'
import '../../css/shop.scss'
import Swal from 'sweetalert2' //sweetalert2
import $ from 'jquery'
import Lightbox from 'react-image-lightbox' //lightbox
import 'react-image-lightbox/style.css' //lightbox
import unazen from './unazen' //取消按讚

function Product(props) {
  const [myproduct, setMyproduct] = useState([])
  const [configORcomment, setCofigORcomment] = useState(1)
  //購物車,與Productlist.js共用
  const [mycart, setMycart] = useState([])
  console.log(props)
  const productId = props.match.params.type
  console.log(productId)
  const [like, setlike] = useState('') //記錄此商品被那些mbId收藏
  const [howmanylike, setHowmanylike] = useState(0) //有多少人收藏
  const [mbLikeThisProduct, setMbLikeThisProduct] = useState(false)
  const [defaultPic, setDefaultPic] = useState('')
  const [photoIndex, setPhotoIndex] = useState(0) //lightbox
  const [isOpen, setIsOpen] = useState(false) //lightbox
  const [mbAzen_arr_state, setMbAzen_arr_state] = useState([]) //按讚顯示
  const handleDisplay = value => {
    setCofigORcomment(value)
  }
  //  加入購物車,與Productlist.js共用
  async function updateCartToLocalStorage(value) {
    // setDataLoading(true)
    // Swal.fire({
    //   html: `商品名稱:${myproduct.itemName}成功加入購物車`,
    //   timer: 2000,
    // }).then(r => {
    //   window.location.reload()
    // })
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    let arr = []
    currentCart.forEach(element => {
      arr.push(element.id == value.id)
    })
    if (arr.indexOf(true) == -1) {
      const newCart = [...currentCart, value]
      localStorage.setItem('cart', JSON.stringify(newCart))
      setMycart(newCart)
    }
    Swal.fire({
      html: `商品名稱:${myproduct.itemName}成功加入購物車`,
      timer: 2000,
    }).then(r => {
      window.location.reload()
    })
    //設定資料
    // setMycart(newCart)
  }
  //fetch database product撈所有資料(不分類)
  async function getDataFromServer() {
    const request = new Request('http://localhost:6001/product/' + productId, {
      method: 'GET',
      credentials: 'include',
    })
    const response = await fetch(request)
    const data = await response.json()

    setMyproduct(data.rows[0])
    let picUrl = JSON.stringify(myproduct)

    console.log('pic', picUrl)
    // console.log(typeof(myproduct))
    setDefaultPic(data.rows[0].itemImg)

    setlike(data.rows[0].memberFavoriteId)

    // console.log(data.rows)
  }
  useEffect(() => {
    getDataFromServer()
  }, [])

  useEffect(() => {
    getDataFromServer()
  }, [productId])

  console.log('myproduct資訊=', myproduct)
  const url = props.match.url
  const path = props.match.path
  console.log('url', props.match)
  //以下，將database儲存的收藏此商品id=[1,2,3,4]轉成length
  let wholike = { ...myproduct }
  console.log('wholike', Array.from(String(wholike.memberFavoriteId)))
  console.log(String(String(wholike.memberFavoriteId).replace(/([[]|])/gm, '')))
  console.log('wholike_toarr', [wholike.memberFavoriteId])
  let wholike2 = "'" + wholike.memberFavoriteId + "'"
  // let wholike2 = [wholike.memberFavoriteId]

  wholike2 = wholike2.split(',')
  console.log('wholike2', wholike2)
  //以上，將database儲存的收藏此商品id=[1,2,3,4]轉成length

  //商品加入收藏
  async function addToLike() {
    const request = new Request('http://localhost:6001/product/addtolike', {
      method: 'POST',
      body: JSON.stringify({
        userId: JSON.parse(localStorage.getItem('LoginUserData')).mbId,
        likeproductId: myproduct.itemId,
      }),
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()

    console.log('加入收藏', data)
    if (data.r.affectedRows == 1) {
      Swal.fire('商品成功加入收藏!').then(result => {
        window.location.reload() //重新整理頁面
      })
    }
  }
  //從localstorage撈出登入者是否喜歡目前商品
  useEffect(() => {
    console.log('like', like)
    let likedisplay = like.slice(0) //copy like state
    // console.log('likedisplay',likedisplay)
    let likedisplay2 = likedisplay.replace('[', '').replace(']', '') //取代"[]""
    let likedisplay2_arr = likedisplay2.split(',') //轉成arr
    if (JSON.parse(localStorage.getItem('LoginUserData')) !== null) {
      if (
        JSON.parse(localStorage.getItem('LoginUserData'))
          .mbAzen.replace(/([[]|])/gm, '')
          .split(',')
          .indexOf(productId) == -1
      ) {
        setMbLikeThisProduct(false)
      } else {
        setMbLikeThisProduct(true)
      }

      let mbId = JSON.parse(localStorage.getItem('LoginUserData')).mbId
      if (likedisplay2_arr.indexOf(`${mbId}`) !== -1) {
        setMbLikeThisProduct(true)
      }
    }

    // console.log('mbId',mbId)
    // console.log(likedisplay2_arr)

    //設定有多少人收藏此商品. NEED TO BE FIXED!!!!!!!
    if (likedisplay2_arr[0] !== '') {
      setHowmanylike(likedisplay2_arr.length)
    }
  }, [like])
  //處理按讚顯示，點按讚愛心變色，但重新整理會失效，除非更新LOCALSTORAGE的登入資訊
  function azen(ID) {
    // let mbAzen_str = JSON.parse(localStorage.getItem('LoginUserData')).mbAzen
    // mbAzen_str = mbAzen_str.replace('[', '').replace(']', '')
    // let mbAzen_arr = mbAzen_str.split(',')
    const currentLocalAzen = JSON.parse(localStorage.getItem('Azen')) || []
    let newMbAzen_arr = [...currentLocalAzen]
    if (newMbAzen_arr.indexOf(`${ID}`) !== -1) {
      let remove_arr = newMbAzen_arr.filter(id => id !== `${ID}`)
      setMbAzen_arr_state(remove_arr)
      localStorage.setItem('Azen', JSON.stringify(remove_arr))
    } else {
      newMbAzen_arr.push(`${ID}`)
      setMbAzen_arr_state(newMbAzen_arr)
      localStorage.setItem('Azen', JSON.stringify(newMbAzen_arr))
    }
    // console.log('mbAzen_arr', mbAzen_arr)
  }
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
  useEffect(() => {
    $('.s-smallImg li img').click(function() {
      $(this)
        .css('border', '2px solid orange')
        .parent('li')
        .siblings()
        .children()
        .css('border', '0px')
    })
  }, [])

  //處理小圖檔名，組合成大圖檔名
  let bigImgarray = []
  let oldname = String(myproduct.itemImg)
  // oldname.toString()
  let newname = oldname.split('.')
  // console.log(newname[0])
  for (let i = 0; i <= 3; i++) {
    bigImgarray.push(newname[0] + '_' + i)
  }
  console.log(bigImgarray)

  //瀏覽歷程記錄
  function addToHistory() {
    const currentHistory =
      JSON.parse(localStorage.getItem('browse-history')) || []

    //沒有在history裡就加入
    if (currentHistory.indexOf(`${productId}`) == -1) {
      const newHistory = [...currentHistory, productId]
      localStorage.setItem('browse-history', JSON.stringify(newHistory))
    }

    // localStorage.setItem('browse-history', productId)
  }
  useEffect(() => {
    addToHistory()
  }, [])
  //設定lightbox大圖array，將原本bigImgarray加上路徑
  let images = []
  bigImgarray.forEach(function(pic) {
    images.push(`/images/shop/bigImage/` + pic + `.jpg`)
  })
  return (
    <>
      <div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
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
            {bigImgarray.map((img, index) => {
              return (
                <li
                  key={index}
                  onClick={e => clickTochangePic(e.target)}
                  style={{ margin: '5px' }}
                >
                  <img
                    className="img-fluid mx-1"
                    src={`/images/shop/bigImage/${img}.jpg`}
                    alt=""
                  />
                </li>
              )
            })}
            {/* <li>
              <img
                className=" img-fluid"
                src={`/images/shop/small_img/${myproduct.itemImg}`}
                alt=""
              />
            </li>
            <li>
              <img
                className=""
                src="https://via.placeholder.com/100x100"
                alt=""
              />
            </li>
            <li>
              <img
                className=""
                src="https://via.placeholder.com/100x100"
                alt=""
              />
            </li>
            <li>
              <img
                className=""
                src="https://via.placeholder.com/100x100"
                alt=""
              />
            </li> */}
            {/* <li>
              <img
                className=""
                src="https://via.placeholder.com/100x100"
                alt=""
              />
            </li> */}
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
            {mbAzen_arr_state.indexOf(`${myproduct.itemId}`) == -1 ? (
              <button
                type="button"
                className="btn btn-outline-info mx-2 s-btn-common col-5 col-md-4"
                onClick={() => {
                  if (
                    JSON.parse(localStorage.getItem('LoginUserData')) !== null
                  ) {
                    addToLike()
                    setMbLikeThisProduct(true)
                    azen(myproduct.itemId)
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
                  azen(myproduct.itemId)
                  setMbLikeThisProduct(false)
                  unazen({
                    userId: JSON.parse(localStorage.getItem('LoginUserData'))
                      .mbId,
                    unlikeproductId: myproduct.itemId,
                  })
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
          <div className="row h5 m-2">有{howmanylike}人收藏此遊戲</div>
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
          <NavLink
            className="nav-link h5"
            to="#"
            onClick={() => {
              handleDisplay(1)
            }}
            style={{ marginBottom: '0px' }}
          >
            建議配備
          </NavLink>
          {configORcomment == 1 ? (
            <div
              style={{
                borderBottom: '2px solid #79cee2',
                width: '75%',
                position: 'relative',
                left: '12px',
                top: '20px',
                // marginBottom: '5px',
              }}
            ></div>
          ) : (
            ''
          )}
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link h5"
            to="#"
            onClick={() => {
              handleDisplay(2)
            }}
            style={{ marginBottom: '0px' }}
          >
            留言評論
          </NavLink>
          {configORcomment == 2 ? (
            <div
              style={{
                borderBottom: '2px solid #79cee2',
                width: '75%',
                position: 'relative',
                left: '12px',
                top: '20px',
              }}
            ></div>
          ) : (
            ''
          )}
        </li>
      </ul>
      <div className="">
        {configORcomment === 1 ? <Config /> : <Comment2 props={myproduct} />}
      </div>
      <div className="container">
        {
          <Recommend
            changeurl={url => {
              props.history.push(`/product/${url}`)
            }}
          />
        }
      </div>
      {/* <Switch>
        <Route path={`${path}/:id?/config/12`}>
          <Config />
        </Route>
        <Route path={`${path}/:type?/:id?`}>
          <Comment />
        </Route>
      </Switch> */}
    </>
  )
}

export default withRouter(Product)

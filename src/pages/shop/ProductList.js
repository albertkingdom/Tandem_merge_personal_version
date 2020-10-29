import React, { useState, useEffect } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import Slider from '../../components/shop/Slider'
import Filterbar from '../../components/shop/Filterbar'

// import '../../css/styles.scss'
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiFillHeart,
} from 'react-icons/ai'
import '../../css/shop.scss'
import Swal from 'sweetalert2'

import {
  updateAzenToLocalStorage,
  addAzenToDatabase,
  cancelAzenToDatabase,
  updateCartToLocalStorage,
} from '../../components/shop/Functions/Function'
import Pagination from '../../components/shop/Pagination'
import FilterDisplay from '../../components/shop/FilterDisplay'

function ProductList(props) {
  const [mycart, setMycart] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [myproduct, setMyproduct] = useState([])
  const [type, setType] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(1)
  const [typeURL, setTypeURL] = useState(0)
  const [vendor, setVendor] = useState('V000')
  const [price, setPrice] = useState(9999)
  const [orderBy, setOrderBy] = useState('itemId')
  const [mbAzen_arr_state, setMbAzen_arr_state] = useState([])

  const searchParams = new URLSearchParams(props.location.search)

  useEffect(() => {
    //fetch database product撈所有資料(有分類)
    async function getClassifiedDataFromServer(page) {
      let request = undefined

      //新分頁方法
      if (type !== 0 || vendor !== 'V000' || price !== '') {
        request = new Request(
          'http://localhost:6001/product/search/' +
            type +
            '/' +
            vendor +
            '/' +
            price +
            '/' +
            orderBy +
            '/' +
            currentpage,
          {
            method: 'GET',
            credentials: 'include',
          }
        )
      } else {
        request = new Request('http://localhost:6001/product/list/' + page, {
          method: 'GET',
          credentials: 'include',
        })
      }
      const response = await fetch(request)
      const data = await response.json()

      setMyproduct(data.rows)
      setTotalpage(data.totalPages)

      // console.log(data.rows)
    }
    getClassifiedDataFromServer(currentpage)
  }, [currentpage, vendor, price, orderBy, type])

  //每次mycart資料有變動就會3秒後關掉載入指示
  // useEffect(() => {
  //   setTimeout(() => {
  //     setDataLoading(false)
  //   }, 500)
  // }, [mycart])

  //換頁function
  const paginate = value => {
    setCurrentpage(value)
  }
  //切換Type
  function handletype(value) {
    setType(value)
    setCurrentpage(1)
  }
  // console.log('type=', type)
  // 利用內建的API來得到URLSearchParams物件
  // const searchParams = new URLSearchParams(props.location.search)
  // console.log(props)
  // let search = props.location.search
  // console.log('search= ', search)

  useEffect(() => {
    //一開始複製一份LoginUserData的Azen，set到Local的Azen值、setMbAzen_arr_state
    const CopyAzenListToLocal = () => {
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
    }
    CopyAzenListToLocal()
  }, [])

  if (dataLoading) {
    return (
      <>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    )
  }

  const display = (
    <>
      <div className="row row-cols-3">
        {myproduct.map((value, index) => {
          return (
            <div className="col-6 col-lg-4 col-sm-6" key={index}>
              <div className="s-cardwrap">
                <div
                  className="card my-2 s-productlist-card"
                  style={{ borderRadius: '0px' }}
                >
                  <img
                    src={`/images/shop/small_img/${value.itemImg}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <Link to={`/product/${value.itemId}`}>
                      <h5 className="cart-title" style={{ color: 'black' }}>
                        {value.itemName}
                      </h5>
                    </Link>
                    <div className="d-flex">
                      <p className="card-text col-8 p-0">
                        NT$ {value.itemPrice}
                      </p>
                      <Link
                        className="col-2"
                        onClick={() =>
                          updateCartToLocalStorage({
                            id: value.itemId,
                            name: value.itemName,
                            amount: 1,
                            price: value.itemPrice,
                            img: value.itemImg,
                          })
                        }
                      >
                        {/* <i class="fas fa-shopping-cart"></i> */}
                        <AiOutlineShoppingCart
                          style={{ color: '#79cee2', fontSize: '24px' }}
                        />
                      </Link>

                      {/* <i class="far fa-heart"></i> */}
                      {JSON.parse(localStorage.getItem('LoginUserData')) !==
                        null &&
                      mbAzen_arr_state.indexOf(`${value.itemId}`) !== -1 ? (
                        <Link
                          className="col-2"
                          onClick={() => {
                            if (
                              JSON.parse(
                                localStorage.getItem('LoginUserData')
                              ) !== null
                            ) {
                              updateAzenToLocalStorage(value.itemId)
                              setMbAzen_arr_state(prevazenlist =>
                                prevazenlist.filter(
                                  id => id !== `${value.itemId}`
                                )
                              )
                              cancelAzenToDatabase({
                                userId: JSON.parse(
                                  localStorage.getItem('LoginUserData')
                                ).mbId,
                                unlikeproductId: value.itemId,
                              })
                            } else {
                              Swal.fire('請先登入')
                            }
                          }}
                        >
                          <AiFillHeart
                            style={{ color: '#F9A451', fontSize: '24px' }}
                          />
                        </Link>
                      ) : (
                        <Link
                          className="col-2"
                          onClick={() => {
                            if (
                              JSON.parse(
                                localStorage.getItem('LoginUserData')
                              ) !== null
                            ) {
                              addAzenToDatabase({
                                userId: JSON.parse(
                                  localStorage.getItem('LoginUserData')
                                ).mbId,
                                likeproductId: value.itemId,
                              })
                              updateAzenToLocalStorage(value.itemId)
                              setMbAzen_arr_state(prevazenlist => [
                                ...prevazenlist,
                                `${value.itemId}`,
                              ])
                            } else {
                              Swal.fire('請先登入')
                            }
                          }}
                        >
                          <AiOutlineHeart
                            style={{ color: '#F9A451', fontSize: '24px' }}
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Pagination
        totalpage={totalpage}
        currentpage={currentpage}
        paginate={paginate}
      />
    </>
  )
  //每次total資料有變動就會500ms後關掉載入提示
  return (
    <>
      <Slider handletype={handletype} />

      <div className="container">
        <FilterDisplay
          type={type}
          vendor={vendor}
          price={price}
          orderBy={orderBy}
          setType={setType}
          setVendor={setVendor}
          setPrice={setPrice}
          setOrderBy={setOrderBy}
        />
        <Filterbar
          setMyproduct={setMyproduct}
          setTotalpage={setTotalpage}
          setVendor={setVendor}
          setPrice={setPrice}
          setOrderBy={setOrderBy}
        />
        {display}
      </div>
    </>
  )
}
export default withRouter(ProductList)

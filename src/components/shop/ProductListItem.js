import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiFillHeart,
} from 'react-icons/ai'
import Swal from 'sweetalert2'
import {
  updateAzenToLocalStorage,
  addAzenToDatabase,
  cancelAzenToDatabase,
  updateCartToLocalStorage,
} from '../../components/shop/Functions/Function'
import {
  addAzenIdToRedux,
  removeAzenIdFromRedux,
} from '../../actions/SazenActions'
import { increaseCartCount } from '../../actions/ScartActions'

export default function ProductListItem({ value, isLogin }) {
  const reduxAzenList = useSelector(state => state.SuserAzen.list)

  const dispatch = useDispatch()
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
  return (
    <div className="col-6 col-lg-4 col-sm-6">
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
              <p className="card-text col-8 p-0">NT$ {value.itemPrice}</p>
              <Link
                className="col-2"
                onClick={() => {
                  updateCartToLocalStorage({
                    id: value.itemId,
                    name: value.itemName,
                    amount: 1,
                    price: value.itemPrice,
                    img: value.itemImg,
                  })
                  dispatch(increaseCartCount(value.itemId))
                }}
                to="#"
              >
                {/* <i class="fas fa-shopping-cart"></i> */}
                <AiOutlineShoppingCart
                  style={{ color: '#79cee2', fontSize: '24px' }}
                />
              </Link>

              {/* decide which type of icon to show based on isLogin and if or not exist in reduxAzenList */}
              {isLogin && reduxAzenList.indexOf(`${value.itemId}`) > 0 ? (
                <Link
                  className="col-2"
                  onClick={() => handleCancelAzen(value.itemId)}
                  to="#"
                >
                  <AiFillHeart style={{ color: '#F9A451', fontSize: '24px' }} />
                </Link>
              ) : (
                <Link
                  className="col-2"
                  onClick={() => handleAzen(value.itemId)}
                  to="#"
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
}

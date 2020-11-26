import React from 'react'
import { Link } from 'react-router-dom'
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

export default function ProductListItem({
  value,
  isLogin,
  mbAzen_arr_state,
  setMemberAzenState,
}) {
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
                onClick={() =>
                  updateCartToLocalStorage({
                    id: value.itemId,
                    name: value.itemName,
                    amount: 1,
                    price: value.itemPrice,
                    img: value.itemImg,
                  })
                }
                to="#"
              >
                {/* <i class="fas fa-shopping-cart"></i> */}
                <AiOutlineShoppingCart
                  style={{ color: '#79cee2', fontSize: '24px' }}
                />
              </Link>

              {/* <i class="far fa-heart"></i> */}
              {isLogin && mbAzen_arr_state.indexOf(`${value.itemId}`) !== -1 ? (
                <Link
                  className="col-2"
                  onClick={() => {
                    if (isLogin) {
                      updateAzenToLocalStorage(value.itemId)
                      setMemberAzenState(prevazenlist =>
                        prevazenlist.filter(id => id !== `${value.itemId}`)
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
                  to="#"
                >
                  <AiFillHeart style={{ color: '#F9A451', fontSize: '24px' }} />
                </Link>
              ) : (
                <Link
                  className="col-2"
                  onClick={() => {
                    if (isLogin) {
                      addAzenToDatabase({
                        userId: JSON.parse(
                          localStorage.getItem('LoginUserData')
                        ).mbId,
                        likeproductId: value.itemId,
                      })
                      updateAzenToLocalStorage(value.itemId)
                      setMemberAzenState(prevazenlist => [
                        ...prevazenlist,
                        `${value.itemId}`,
                      ])
                    } else {
                      Swal.fire('請先登入')
                    }
                  }}
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

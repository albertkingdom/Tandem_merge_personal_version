import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2' //sweetalert2
import { AiOutlineDelete, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

import useLoginStatus from '../../components/shop/customHook/useLoginStatus'
//other functions
import {
  cancelAzenToDatabase,
  updateAzenToLocalStorage,
  addAzenToDatabase,
} from '../../components/shop/Functions/Function'
//action creators
import {
  addAzenIdToRedux,
  removeAzenIdFromRedux,
} from '../../actions/SazenActions'

export default function ShoppingCartItem({ value, delProductFromCart }) {
  const isLogin = useLoginStatus() //custom hook
  //redux
  const reduxAzenList = useSelector(state => state.SuserAzen.list)
  const dispatch = useDispatch()
  return (
    <tr key={value.id}>
      <td className="s-columnWidth1">
        <Link to={`/product/${value.id}`}>
          <img
            src={`/images/shop/small_img/${value.img}`}
            className="img-fluid"
            alt="..."
          />
        </Link>
      </td>
      <td className="h5">NT${value.price}</td>
      <td>
        {isLogin && reduxAzenList.indexOf(`${value.id}`) !== -1 ? (
          <button
            type="button"
            className="btn mx-2 my-2 s-btn-common-cart"
            onClick={() => {
              if (isLogin) {
                updateAzenToLocalStorage(value.id)
                cancelAzenToDatabase({
                  userId: JSON.parse(localStorage.getItem('LoginUserData'))
                    .mbId,
                  unlikeproductId: value.id,
                })

                dispatch(removeAzenIdFromRedux(value.id))
              } else {
                Swal.fire('請先登入!')
              }
            }}
          >
            <AiFillHeart style={{ color: '#F9A451', fontSize: '24px' }} />
          </button>
        ) : (
          <button
            type="button"
            className="btn mx-2 my-2 s-btn-common-cart"
            onClick={() => {
              if (isLogin) {
                addAzenToDatabase({
                  userId: JSON.parse(localStorage.getItem('LoginUserData'))
                    .mbId,
                  likeproductId: value.id,
                })
                updateAzenToLocalStorage(value.id)

                dispatch(addAzenIdToRedux(value.id))
              } else {
                Swal.fire('請先登入!')
              }
            }}
          >
            <AiOutlineHeart style={{ color: '#F9A451', fontSize: '24px' }} />
          </button>
        )}

        <button
          type="button"
          className="btn  mx-2 s-btn-common-cart"
          onClick={() =>
            delProductFromCart({
              id: value.id,
            })
          }
        >
          <AiOutlineDelete style={{ color: '#F9A451', fontSize: '24px' }} />
        </button>
      </td>
    </tr>
  )
}

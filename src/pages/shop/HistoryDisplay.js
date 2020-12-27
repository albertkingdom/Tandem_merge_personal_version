import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
//other functions
import { updateCartToLocalStorage } from '../../components/shop/Functions/Function'
import { increaseCartCount } from '../../actions/ScartActions'
import styles from './HistoryDisplay.module.scss'

function HistoryDisplay({ browsehistory, updateMyCartDisplay }) {
  const dispatch = useDispatch()

  if (!browsehistory) {
    return (
      <div className="s-couponList text-center">
        <h5>沒有紀錄</h5>
      </div>
    )
  }
  return (
    <div className="s-couponList p-4">
      <ul className={`d-flex ${styles.history}`}>
        {browsehistory.map(item => {
          return (
            <li key={item.itemId}>
              <img src={`/images/shop/small_img/${item.itemImg}`} alt="..." />
              <div>
                <Link className="d-flex justify-content-center" to="#">
                  <AiOutlineShoppingCart
                    className={styles.addToCartButton}
                    onClick={() => {
                      updateCartToLocalStorage({
                        id: item.itemId,
                        name: item.itemName,
                        amount: 1,
                        price: item.itemPrice,
                        img: item.itemImg,
                      })
                      updateMyCartDisplay()
                      dispatch(increaseCartCount(item.itemId))
                    }}
                  />
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default HistoryDisplay

import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
//other functions
import { updateCartToLocalStorage } from '../../components/shop/Functions/Function'
import { increaseCartCount } from '../../actions/ScartActions'

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
      {browsehistory.map(item => {
        return (
          <div
            style={{
              margin: '25px',
              width: '200px',
            }}
            key={item.itemId}
          >
            <img src={`/images/shop/small_img/${item.itemImg}`} alt="..." />
            <div
              style={{
                width: '200px',
                backgroundColor: 'lightgray',
              }}
            >
              <Link className="d-flex justify-content-center" to="#">
                <AiOutlineShoppingCart
                  style={{
                    color: '#F9A451',
                    fontSize: '24px',
                    zIndex: 10,
                    opacity: 1,
                  }}
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
          </div>
        )
      })}
    </div>
  )
}
export default HistoryDisplay

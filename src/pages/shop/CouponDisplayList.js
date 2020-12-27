import React from 'react'
import CouponDisplay from './CouponDisplay'
import useLoginStatus from '../../components/shop/customHook/useLoginStatus'
import styles from './ShoppingCart.module.scss'

function CouponDisplayList({
  coupon,
  isSelectCoupon,

  handleCouponSelect,
}) {
  const { isLogin } = useLoginStatus()
  return (
    <div className={`${styles['s-couponList']} p-4 text-center`}>
      {isLogin ? (
        <>
          <h5>
            你有{coupon.length}張折價券可使用，已選{' '}
            {isSelectCoupon === true ? '1' : '0'}張
          </h5>
        </>
      ) : (
        <>
          <h5>請先登入以使用折價券</h5>
        </>
      )}
      {/* <select
        className="col-12 s-coupon"
        onChange={e => couponselectfunc(e.target.value)}
      >
        <option>請選擇折價券</option>
        {coupon.map((item, index) => {
          return (
            <option key={index} value={item.sId}>
              {item.sTitle}
            </option>
          )
        })}
      </select> */}

      <div className="my-2 d-flex justify-content-center">
        {coupon.map(item => (
          <CouponDisplay
            key={item.sId}
            item={item}
            handleCouponSelect={handleCouponSelect}
          />
        ))}
      </div>
    </div>
  )
}
export default CouponDisplayList

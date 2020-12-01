import React from 'react'
import CouponDisplay from './CouponDisplay'
import useLoginStatus from '../../components/shop/customHook/useLoginStatus'

function CouponDisplayList({
  coupon,
  isSelectCoupon,
  couponNo,
  handleCouponSelect,
  cancelCouponSelect,
}) {
  const isLogin = useLoginStatus()
  return (
    <div className="s-couponList p-4">
      {isLogin ? (
        <>
          <h5>你有{coupon.length}張折價券可使用</h5>
          <h5>已選 {isSelectCoupon === true ? '1' : '0'}張</h5>
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

      <div className="my-2 s-coupon-pic">
        {coupon.map(item => (
          <CouponDisplay
            key={item.sId}
            item={item}
            handleCouponSelect={handleCouponSelect}
            // cancelCouponSelect={cancelCouponSelect}
          />
        ))}
      </div>
    </div>
  )
}
export default CouponDisplayList

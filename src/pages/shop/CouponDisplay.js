import React, { useState } from 'react'

export default function CouponDisplay({ item, handleCouponSelect }) {
  const [isSelect, setIsSelect] = useState(false)

  const selectclass = isSelect ? 's-coupon-used-show' : ''
  return (
    <div
      className="position-relative"
      data-discount={item.sMethod}
      onClick={() => {
        handleCouponSelect(item.sId, item.sMethod)
        setIsSelect(prev => !prev)
      }}
    >
      <img
        src={`data:image/png;base64,${item.sCoupon}`}
        value={item.sId}
        className="coupon img-fluid"
        alt="..."
      />

      <div
        className={`img-fluid s-coupon-used ${selectclass}`}
        // onClick={() => handleCouponSelect2()}
      >
        <p>已使用</p>
      </div>
      <p>{item.sTitle}</p>
    </div>
  )
}

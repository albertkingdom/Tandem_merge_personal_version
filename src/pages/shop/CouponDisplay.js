import React, { useState } from 'react'
import styles from './Coupon.module.scss'

export default function CouponDisplay({ item, handleCouponSelect, couponNo }) {
  const [isSelect, setIsSelect] = useState(false)

  return (
    <div
      className={`position-relative ${styles.coupon} `}
      data-discount={item.sMethod}
      onClick={() => {
        handleCouponSelect(item.sId, item.sMethod)
        setIsSelect(prev => !prev)
      }}
    >
      <img
        src={`data:image/png;base64,${item.sCoupon}`}
        value={item.sId}
        className="img-fluid"
        alt="..."
      />

      <div
        className={`img-fluid ${styles['s-coupon-used']} ${
          couponNo === item.sId ? styles['s-coupon-used-show'] : ''
        }`}
      >
        <p>已使用</p>
      </div>
      <p>{item.sTitle}</p>
    </div>
  )
}

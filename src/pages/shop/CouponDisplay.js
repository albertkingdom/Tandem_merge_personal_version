import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Coupon.module.scss'
import { addCoupon, removeCoupon } from '../../actions/ScouponActions'

export default function CouponDisplay({ item, handleCouponSelect, couponNo }) {
  const [isSelect, setIsSelect] = useState(false)
  const dispatch = useDispatch()
  const couponStatus = useSelector(state => state.Scart.discount)
  return (
    <div
      className={`position-relative ${styles.coupon} `}
      data-discount={item.sMethod}
      onClick={() => {
        handleCouponSelect(item.sId, item.sMethod)
        setIsSelect(prev => !prev)
        couponStatus === ''
          ? dispatch(addCoupon(item.sMethod))
          : dispatch(removeCoupon())
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

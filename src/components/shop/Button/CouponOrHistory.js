import React from 'react'
import styles from './CouponOrHistory.module.scss'

export default function CouponOrHistory({
  setCouponOrHistory,
  couponOrhistory,
}) {
  return (
    <div className="col-12 d-flex justify-content-center">
      <div className="col-6 position-relative">
        <button
          className={`col-6 ${styles.button} `}
          onClick={() => {
            setCouponOrHistory(0)
          }}
        >
          折價券
        </button>
        <button
          className={`col-6 ${styles.button} `}
          onClick={() => {
            setCouponOrHistory(1)
          }}
        >
          瀏覽紀錄
        </button>
        <button
          className={`${styles.background} col-6 ${
            couponOrhistory === 0 ? styles.left : styles.right
          }`}
        ></button>
      </div>
    </div>
  )
}

import React from 'react'
import { withRouter } from 'react-router-dom'
import styles from './PayProgressbar.module.scss'
function PayProgressbar(props) {
  console.log('payprogressbar', props)
  return (
    <>
      <ul className={`${styles.newprogressbar}`}>
        <li className={
          props.location.pathname == '/cart_new'?`${styles.active}`:''
        }>1<span>購物車</span></li>
        <li className={
          props.location.pathname == '/payment'?`${styles.active}`:''
        }>2<span>付款方式</span></li>
        <li className={
          props.location.pathname == '/order'?`${styles.active}`:''
        }>3<span>訂單成立</span></li>
      </ul>
    </>
  )
}

export default withRouter(PayProgressbar)

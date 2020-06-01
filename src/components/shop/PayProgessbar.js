import React from 'react'
import { withRouter } from 'react-router-dom'
function PayProgressbar(props) {
  console.log('payprogressbar', props)
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ paddingTop: '50px' }}
      >
        <div
          className={
            props.location.pathname == '/cart_new'
              ? 's-circleActive'
              : 's-circle'
          }
        >
          <h3>1</h3>
          {/* <h6>檢視購物車</h6> */}
        </div>
        <div className="s-line"></div>
        <div
          className={
            props.location.pathname == '/payment'
              ? 's-circleActive'
              : 's-circle'
          }
        >
          <h3>2</h3>
        </div>
        <div className="s-line"></div>
        <div
          className={
            props.location.pathname == '/order' ? 's-circleActive' : 's-circle'
          }
        >
          <h3>3</h3>
        </div>
      </div>
    </>
  )
}

export default withRouter(PayProgressbar)

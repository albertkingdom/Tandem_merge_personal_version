import React, { useState, useEffect } from 'react'
import { AiOutlineGift } from 'react-icons/ai'

function Mcuponleft() {
  const [cupondata, setCuponData] = useState([])

  useEffect(() => {
    getcuponinfo()
  }, [])

  const getcuponinfo = () => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }
    async function Findcuponinfo(mbId, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/findmycup',
        {
          method: 'POST',
          body: JSON.stringify(mbId),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const response = await fetch(request)
      // console.log('RE fetch完成')
      const payload = await response.json()
      // 資料給state
      payload.map((val, idx) => {
        val.sDate = val.sDate.split('T')[0]
      })
      setCuponData(payload)
      // console.log(payload)
    }
    //呼叫上方fetch送後端
    Findcuponinfo(input)
  }

  // const cuponlist = (
  //   <>
  //     {cupondata.map((val, idx) => {
  //       return (
  //         <>
  //           <h4 key={idx}>{val.sTitle}</h4>
  //           <p>{val.sDate}</p>
  //           <div className="M-mycupon">
  //             <img src={`data:image/png;base64,${val.sCoupon}`} alt="" />
  //           </div>
  //         </>
  //       )
  //     })}
  //   </>
  // )

  const mycuponlist = (
    <>
      {cupondata.map((val, idx) => {
        return (
          <>
            <div className="M-singlecupwrapper" key={idx}>
              <h5>{val.sTitle}</h5>
              <div className="M-singlecupphoto">
                <img src={`data:image/png;base64,${val.sCoupon}`} alt="" />
              </div>
            </div>
          </>
        )
      })}
    </>
  )

  return (
    <>
      <div className="M-mycuponlistwrapper">
        {/* ------------------------上部留白控制鈕---------------- */}
        <div className="M-mycupontop">
          <h5>我的折價券</h5>
        </div>
        {/* -------------------------------單張內容--------------------------- */}
        {mycuponlist}
        {/* <div className="M-singlecupwrapper">
            <h5>Title</h5>
            <p>日期</p>
            <div className="M-singlecupphoto"></div>
          </div> */}
        {/* ------------------------------------------- */}
      </div>
    </>
  )
}

export default Mcuponleft

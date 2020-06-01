import React, { useEffect, useState } from 'react'

function MmyCoupon() {
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
      console.log(payload)
    }
    //呼叫上方fetch送後端
    Findcuponinfo(input)
  }

  const cuponlist = (
    <>
      {cupondata.map((val, idx) => {
        return (
          <>
            <h4>{val.sTitle}</h4>
            <div className="M-mycupon">
              <img src={`data:image/png;base64,${val.sCoupon}`} alt="" />
            </div>
          </>
        )
      })}
    </>
  )

  return (
    <>
      <div className="M-myCPwrapper">
        <div className="M-myCPlistTop">
          <span>日期</span>
          <h6>會員登入折價券</h6>
          <div className="M-myCPlistswitch"></div>
        </div>
        <div className="M-myCPlistDown">{cuponlist}</div>
      </div>
    </>
  )
}

export default MmyCoupon

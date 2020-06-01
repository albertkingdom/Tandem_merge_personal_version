import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'
import { Callcard } from '../../actions/Maction'

function MMtestfetch() {
  const dispatch = useDispatch()
  const divOneRef = React.createRef()
  // 測試get

  const gosomewhere = () => {
    async function getmethod() {
      const response = await fetch(
        'http://localhost:6001/tandem/member/redirectpwdset',
        { method: 'GET' }
      )
      const payload = await response.json()
    }
    getmethod()
  }

  // 底下測試fetch
  const getfriendinfo = () => {
    // 需要利用點擊取得對方id
    const input = { mbId: 24 }
    async function Findfriendinfo(mbId, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/redirectpedset',
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
      console.log('RE fetch完成')
      const payload = await response.json()
      console.log(payload)
      //TODO

      // 轉址
      // window.location.href = 'http://localhost:3000/'
    }
    //呼叫上方fetch送後端
    Findfriendinfo(input)
  }

  return (
    <>
      <button
        onClick={() => {
          gosomewhere()
        }}
      >
        get
      </button>

      <button
        onClick={() => {
          getfriendinfo()
        }}
      >
        fetch it
      </button>

      <button onClick={() => {}}>move</button>

      <a href="http://localhost:6001/tandem/member/redirectpedset">
        take me there
      </a>

      <div
        ref={divOneRef}
        style={{ width: '3rem', height: '3rem', backgroundColor: 'teal' }}
      ></div>

      <button
        onClick={() => {
          dispatch(Callcard(true))
        }}
      >
        call card
      </button>
      {/* -------------------------------------------------------------------------- */}
      {/* 輪播測試 */}
    </>
  )
}

export default MMtestfetch

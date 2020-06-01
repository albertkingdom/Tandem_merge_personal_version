import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmfriend } from '../../actions/Maction'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function MdetectaddF(props) {
  // component形成前檢測加好友事件是否存在
  const dispatch = useDispatch()
  // 存在的話把所有資訊寄放在Redux state並拿出來使用製作邀請卡
  const inviteData = useSelector(state => state.Mconfirmfriend)
  const cardUseData = inviteData.invitefreindData

  useEffect(() => {
    becomegoodfriend()
  }, [])
  const becomegoodfriend = () => {
    // 當local存在登入資訊時才進行fetch
    if (localStorage.getItem('LoginUserData')) {
      const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
      // 加好友申請人資料
      // 假設24受到邀請，先去搜尋事件簿是否有邀請事件存在，有的話把資料拉出來設給redux state
      // opendetail
      const mbId = localUserData.mbId
      // console.log('偵測好友卡的' + localUserData.mbId)
      const input = { mbId }
      async function findfriendevent(input, callback) {
        const request = new Request(
          'http://localhost:6001/tandem/member/confirmfriend',
          {
            method: 'POST',
            body: JSON.stringify(input),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          }
        )

        const response = await fetch(request)
        // console.log('add friend fetch完成')
        const payload = await response.json()
        // if (payload) {
        //   // console.log(payload)
        //   dispatch(confirmfriend(JSON.parse(payload[0].inviteuserData)))
        // } else {
        //   console.log('沒有邀請事件')
        // }
        // 當搜尋結果為空[]時，回傳一個[]給redux，否則會產生缺值錯誤

        if (!payload.body.length) {
          dispatch(confirmfriend([], false))
        } else {
          dispatch(
            confirmfriend(JSON.parse(payload.body[0].inviteuserData), true)
          )
        }
      }
      findfriendevent(
        input
        // Swal.fire({
        //   icon: 'success',
        //   title: '加好友成功',
        //   showConfirmButton: false,
        //   timer: 1000,
        // }).then(r => {})
      )
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1000)
    } else {
      // 當local不存在登入資訊送空
      dispatch(confirmfriend([], false))
    }
  }

  // -----------------確認好友申請把自己ID寫入對方資料//取消申請事件-----------------
  const yesiamfriend = () => {
    const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
    // 加好友申請人資料
    // 假設24受到邀請，先去搜尋事件簿是否有邀請事件存在，有的話把資料拉出來設給redux state
    const mbId = localUserData.mbId
    const newfriendId = cardUseData.mbId
    const input = { mbId, newfriendId }
    async function createnewfriend(input, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/iamufriend',
        {
          method: 'POST',
          body: JSON.stringify(input),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const response = await fetch(request)
      // console.log('newfriend fetch完成')
      const payload = await response.json()
      if (payload.success) {
        // 如果加好友事件完成把訊號關掉卡片消失
        dispatch(confirmfriend([], false))
      }
    }
    createnewfriend(input)
  }

  // 當好友事件存在=>卡片存在  好友事件不存在卡片消失

  const comfirmfriendcard = (
    <>
      {/* <div className="position-relative"> */}
      <div className="M-addfriendCardWrapper">
        <div className=" M-addfriendcardcbtn">
          <AiOutlineCloseCircle className="M-cbtnmark" />
        </div>
        <div className="M-addfriendcardCricle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306 209">
            <defs></defs>
            <title></title>
            <path
              className="cls-1"
              d="M125.55,319.48v40a64,64,0,1,1,0,128v40h302v-208Z"
              transform="translate(-125.55 -319.48)"
            />
          </svg>
          <div className="M-cffriendBricktop"></div>
          <div className="M-cffriendBrickdwn"></div>
          {/* 取消鍵 */}
          {/* <div className=" M-addfriendcardcbtn">
            <AiOutlineCloseCircle className="M-cbtnmark" />
          </div> */}
          {/* <!-- 加好友訊息描述 --> */}
          <div className="M-addfriendDes">
            <div className="M-addfrienddesLeft">
              <h6
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.location.href = `/Communityprofile/${cardUseData.mbId}`
                }}
              >
                {cardUseData.mbNick}
              </h6>
              <p>{cardUseData.mbDes}</p>
              <div
                className="M-cffrienddesLeftbtn"
                onClick={() => {
                  // 暫時關掉功能，增加sweetalert
                  props.confrimtwo()
                  yesiamfriend()
                }}
              >
                成為好友
              </div>
              <span>來自國度 :{cardUseData.mbCountry}</span>
              {/* <h6></h6> */}
            </div>
            <div className="M-addfrienddesRight"></div>
          </div>
        </div>
        <div className="M-addfriendPhoto">
          <img src={cardUseData.mbAva} alt="" />
        </div>
      </div>
      {/* </div> */}
    </>
  )
  const shadowcard = <></>

  return <>{inviteData.addfriendsignal ? comfirmfriendcard : shadowcard}</>
}

export default MdetectaddF

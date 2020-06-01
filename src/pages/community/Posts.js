import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { addfriendcard } from '../../actions/Maction'
import Maddfriendcard from '../../components/member/Maddfriendcard'
export default function Posts() {
  const dispatch = useDispatch()

  const [posts, setPosts] = useState([])

  //連資料庫 fetch API
  async function fetchPost() {
    let res = await fetch('http://localhost:6001/items/posts')
    let response = await res.json()
    setPosts(response)
  }

  useEffect(() => {
    fetchPost()
  }, [])
  // console.log(posts)

  const [pop, setPop] = useState(false)
  const [popCancel, setPopCancel] = useState(false)

  const getaddfriendData = e => {
    setPop(!pop)
    const addmbID = e.target.getAttribute('addmbId')
    const addmbNICK = e.target.getAttribute('addmbNICK')
    const addmbDes = e.target.getAttribute('addmbDes')
    const addmbava = e.target.getAttribute('addmbava')
    const addmbcty = e.target.getAttribute('addmbcty')
    const inputaddfriendData = {
      addmbID,
      addmbNICK,
      addmbDes,
      addmbava,
      addmbcty,
    }
    console.log('addfriend:', inputaddfriendData)
    dispatch(addfriendcard(inputaddfriendData))
  }

  return (
    <div className="container">
      <div className={`M-popUpDiv ${pop ? 'active' : ''}`}></div>

      <div className="container my-4">
        <div
          className="d-flex align-items-center m-auto"
          style={{ width: '800px' }}
        >
          <figure
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'cover',
              overflow: 'hidden',
              margin: '0 40px',
            }}
          >
            <img
              // src={}
              style={{ display: 'block', width: '100%', height: '100%' }}
            />
          </figure>
          <div>
            <h3>{}</h3>
            <p>{}</p>
            <div className="d-flex ">
              <p className="font-weight-bold">貼文</p>
              <p className="mx-4 font-weight-bold"> 好友</p>
            </div>
            <div
              // className="C-profileaddbtn"
              // addmbID={postProfile.mbId}
              // addmbNICK={postProfile.mbNick}
              // addmbDes="要來加我好友嗎?"
              // addmbava={postProfile.mbAva}
              // addmbcty={postProfile.mbCountry}
              onClick={e => {
                getaddfriendData(e)
              }}
            >
              加入好友
            </div>
            {/* 加好友卡片彈跳視窗 */}
            <div className={`M-popupFriend ${pop ? 'active' : ''}`}>
              <div
                className={`position-relative ${!popCancel ? '' : 'nonActive'}`}
                onClick={() => {
                  setPopCancel(false)
                  setPop(!pop)
                }}
              >
                <AiOutlineCloseCircle
                  style={{
                    fontSize: '30px',
                    color: '#ec8824 ',
                    position: 'absolute',
                    top: '6px',
                    left: '89%',
                    zIndex: '30',
                  }}
                />
              </div>

              <div className={`${!popCancel ? '' : 'nonActive'}`}>
                <Maddfriendcard />
              </div>
              {/* ${!popCancel ? '' : 'active'} */}
            </div>
          </div>
        </div>
        <div
          style={{
            height: '2px',
            width: '1130px',
            background: '#79cee2',
            margin: '10px 0',
          }}
        ></div>
        <div className="d-flex m-3 ">
          <p className="mx-2">貼文列表</p>
          <p className="mx-2">我的收藏</p>
        </div>
      </div>
    </div>
  )
}

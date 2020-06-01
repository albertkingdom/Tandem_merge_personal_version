import React, { useEffect, useState } from 'react'

import { IoIosMore } from 'react-icons/io'

function MindexcomCard() {
  useEffect(() => {
    findmyfriendpost()
  }, [])
  //處理寄存fetch結果的state
  const [postfromfriends, setPostFromFriends] = useState([])
  const findmyfriendpost = () => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }
    async function Findmyfriendpostcollect(userId, callback) {
      const request = new Request(
        'http://localhost:6001/tandem/member/findmyFpost',
        {
          method: 'POST',
          body: JSON.stringify(userId),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const response = await fetch(request)
      // console.log('朋友貼文 fetch完成')
      const payload = await response.json()
      // console.log(payload)
      //TODO
      if (payload) {
        // 存在則寄存在本地state
        // 處理payload時間格式
        payload.map((val, idx) => {
          val.created_at = val.created_at.split('T')[0]
        })
        if (payload.length > 3) {
          // 直接在setstate前處理arr的限制
          const limitpost = []
          // 寫迴圈或CSS遮
          limitpost.push(payload[0], payload[1], payload[2])
          // console.log(limitpost)

          setPostFromFriends(limitpost)
        } else {
          setPostFromFriends(payload)
        }
      }
    }

    //呼叫上方fetch送後端
    Findmyfriendpostcollect(input)
  }

  //更新後的state用來render畫面
  const friendpostlist = (
    <>
      {postfromfriends.map((val, idx) => {
        return (
          <>
            <div className="M-comuWrapper" key={idx}>
              <div className="M-comuPost">
                <div className="M-comuBody">
                  <div className="M-comuHead">
                    <img
                      src={`http://localhost:6001/img/${val.postImg}`}
                      alt=""
                    />
                  </div>
                  <section className="M-comuHead_des">
                    {/* 發文標題 */}
                    <h5>{val.postTitle}</h5>
                    {/* 發文時間 */}
                    <h6>{val.created_at}</h6>
                    {/* 發文內容 */}
                    <p>{val.postContent}</p>
                    <div className="M-comuFootlink">
                      <a
                        href={`/postDetailProfile/${val.post_id}`}
                        style={{ color: 'black' }}
                      >
                        <IoIosMore />
                      </a>
                    </div>
                  </section>
                </div>
                <div className="M-comuFoot">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275 87">
                    <defs></defs>
                    <title />
                    <path
                      className="cls-1"
                      d="M224.16,355.42a43.87,43.87,0,0,1-87.74,0H118.81v86.71h329V355.42Z"
                      transform="translate(-118.81 -355.42)"
                    />
                  </svg>
                  <figure className="M-comuPoster">
                    {/* 貼文圖片 */}
                    <img src={val.mbAva} alt={val.mbNick} />
                  </figure>
                  <div className="M-comuDes">
                    <h5>{val.mbNick}</h5>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      })}
    </>
  )

  return (
    <>
      <div className="M-fcomlistWrapper">
        {friendpostlist}
        {/* ----------------------------------- */}

        {/* ----------------------------------- */}
      </div>
    </>
  )
}

export default MindexcomCard

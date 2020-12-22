import React, { useEffect, useState } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import {
  AiOutlinePlusCircle,
  AiOutlineCloseCircle,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillMail,
  AiFillYoutube,
  AiOutlineExclamationCircle,
  AiFillAppstore,
  AiOutlineStar,
  AiFillStar,
  AiOutlineAppstore,
} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { addfriendcard } from '../../actions/Maction'
import Maddfriendcard from '../../components/member/Maddfriendcard'
import PostCollectionProfile from '../../components/community/PostCollectionProfile'

function PostProfile(props) {
  const dispatch = useDispatch()

  const [posts, setPosts] = useState([])
  const [members, setMembers] = useState([])
  const [friendList, setFriendList] = useState([])
  const [loginUserFriend, setLoginUserFriend] = useState([])

  const [sideNav, setSideNav] = useState(false)
  const [addingFriend, setAddingFriend] = useState(false)
  const [addedFriend, setAddedFriend] = useState(false)

  // const [postMember, setPostMember] = useState([])
  const [loginUserId, setLoginUserId] = useState('')
  // console.log('friendList', friendList)
  //連資料庫 fetch API
  async function fetchPost() {
    let res = await fetch('http://localhost:6001/items/posts')
    let response = await res.json()
    setPosts(response)
  }
  //連資料庫 fetch API 會員資料
  async function fetchPostmember() {
    let res = await fetch('http://localhost:6001/items/postsmember')
    let response = await res.json()
    setMembers(response)
  }
  useEffect(() => {
    fetchPost()
    fetchPostmember()
  }, [])

  useEffect(() => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }

    // const jsonInput = JSON.stringify(input)

    setLoginUserId(input.mbId)

    // console.log(input.mbId)
  }, [])

  const [pop, setPop] = useState(false)
  const [popCancel, setPopCancel] = useState(false)

  const getaddfriendData = e => {
    setPop(!pop)
    const addmbID = e.target.getAttribute('addmbid')
    const addmbNICK = e.target.getAttribute('addmbnick')
    const addmbDes = e.target.getAttribute('addmbdes')
    const addmbava = e.target.getAttribute('addmbava')
    const addmbcty = e.target.getAttribute('addmbcty')
    const inputaddfriendData = {
      addmbID,
      addmbNICK,
      addmbDes,
      addmbava,
      addmbcty,
    }
    dispatch(addfriendcard(inputaddfriendData))
  }

  //addfriend fetch data
  let memberId = { loginUserId }
  // console.log('loginUserId:', memberId)

  async function applyfriend() {
    const request = new Request('http://localhost:6001/community/addfriend', {
      method: 'POST',
      body: JSON.stringify(memberId),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()

    setFriendList(data)
  }

  useEffect(() => {
    applyfriend(loginUserId)
  }, [loginUserId])
  // console.log('friend', friendList)

  const checkaddfriend = () => {
    let addFriendId = null
    let invateFriendId = null

    if (friendList.length >= 1) {
      for (let i = 0; i < friendList.length; i++) {
        addFriendId = friendList[i].addmbId
        // invateFriendId = friendList[i].invitedmbId
      }
      if (addFriendId == props.match.params.id) {
        // console.log(addFriendId === props.match.params.id)
        // console.log('prop', props.match.params.id)
        setAddingFriend(true)
      }
    }
  }
  // console.log(loginUserFriend)

  useEffect(() => {
    checkaddfriend()
  })

  async function beFriend() {
    const request = new Request(
      'http://localhost:6001/tandem/member/findfriend',
      {
        method: 'POST',
        body: JSON.stringify(memberId),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()

    // console.log(JSON.stringify(arr))
    // console.log('arr', typeof arr[0].mbFd)
    setLoginUserFriend(data)
  }
  // console.log('1', loginUserFriend)

  useEffect(() => {
    beFriend(loginUserId)
  }, [loginUserId])
  // console.log(loginUserFriend)
  const addedfriend = () => {
    let addedFriendId = null
    // console.log(loginUserFriend)
    if (loginUserFriend.length >= 1) {
      for (let i = 0; i < loginUserFriend.length; i++) {
        addedFriendId = loginUserFriend[i].mbId
        // console.log('loginuser', loginUserId)
        if (addedFriendId == props.match.params.id) {
          setAddedFriend(true)
          if (addedFriendId == loginUserId) {
            return setAddedFriend(false)
          }
        }
      }
    }
  }
  useEffect(() => {
    addedfriend(loginUserFriend)
  }, [loginUserFriend])

  // ----------------------
  //文章判斷會員文章首頁
  let postProfile = null
  let arr = []

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].mbId === +props.match.params.id) {
      postProfile = posts[i]
      arr.push(postProfile)
    }
  }

  if (postProfile === null) {
    for (let i = 0; i < members.length; i++) {
      if (members[i].mbId === +props.match.params.id) {
        let member = members[i]
        return (
          <>
            {/* 彈跳視窗背景 */}
            <div className={`M-popUpDiv ${pop ? 'active' : ''}`}></div>
            <div className="container my-5">
              <div className="row">
                <div className="col-md-8">
                  <div
                    className="d-flex align-items-center"
                    style={{
                      height: '40ox',
                      padding: '10px 0',
                      margin: '20px 0',
                      borderTop: '1px solid #79cee2',
                      borderBottom: '1px solid #79cee2',
                    }}
                  >
                    <p
                      className="mx-2 my-0"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setSideNav(false)
                        console.log('false', sideNav)
                      }}
                    >
                      {sideNav ? (
                        <AiOutlineAppstore
                          style={{
                            fontSize: '30px',
                            padding: '5px 0',
                            color: '#79cee2',
                          }}
                        />
                      ) : (
                        <AiFillAppstore
                          style={{
                            fontSize: '30px',
                            padding: '5px 0',
                            color: '#79cee2',
                          }}
                        />
                      )}
                      貼文列表
                    </p>
                    {loginUserId === +props.match.params.id ? (
                      <p
                        className="mx-2 my-0 "
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSideNav(true)
                        }}
                      >
                        {' '}
                        {sideNav ? (
                          <AiOutlineStar
                            style={{
                              fontSize: '30px',
                              padding: '5px 0',
                              color: '#79cee2',
                            }}
                          />
                        ) : (
                          <AiFillStar
                            style={{
                              fontSize: '30px',
                              padding: '5px 0',
                              color: '#79cee2',
                            }}
                          />
                        )}
                        收藏列表
                      </p>
                    ) : (
                      ''
                    )}
                  </div>

                  {sideNav ? (
                    <div
                      style={{ position: 'absolute', top: '18.5%' }}
                      // className="nonActive"
                    >
                      <PostCollectionProfile
                        postId={postProfile.post_id}
                        postMemberId={postProfile.mbId}
                        loginMemberId={loginUserId}
                      />
                      <div>button</div>
                    </div>
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: '300px' }}
                    >
                      <h2 style={{ color: '#79cee2' }}>
                        <h1
                          className="mx-auto my-2"
                          style={{
                            width: '40px',
                            color: '#79cee2',
                            fontSize: '50px',
                          }}
                        >
                          <AiOutlineExclamationCircle />
                        </h1>
                        目前沒有任何文章
                      </h2>
                    </div>
                  )}
                </div>
                <div className="col-md-4">
                  <div
                    style={{
                      height: '1px',
                      width: '250px',
                      background: '#79cee2',
                      margin: '20px 0',
                      position: 'relative',
                      left: '15%',
                    }}
                  ></div>
                  <h6
                    style={{
                      width: '220px',
                      margin: '0 auto',
                      background: 'white',
                      letterSpacing: '1.5px',
                    }}
                  >
                    {member.mbNick}
                  </h6>
                  <figure
                    style={{
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      overflow: 'hidden',
                      margin: '30px auto',
                      border: '1px solid #79cee2',
                      padding: '4px',
                      // boxShadow: '0px 0px 10px #adb6bd',
                    }}
                  >
                    <img
                      src={member.mbAva}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </figure>
                  <div className="m-auto text-center">
                    {/* <h6>{member.mbNick}</h6> */}
                    <p>{member.mbDes}</p>
                    <div
                      className="d-flex justify-content-center"
                      style={{ letterSpacing: '1px' }}
                    >
                      <p className=" mx-1 font-weight-bold text-center">
                        {' '}
                        0 貼文
                      </p>
                      <p className="mx-1 font-weight-bold text-center">
                        {' '}
                        {loginUserFriend.length} 好友
                      </p>
                    </div>
                    {member.mbId !== loginUserId ? (
                      <button
                        className={`C-profileaddbtn 
                    ${!addingFriend ? '' : 'active'}
                    `}
                        // disabled={`${!addingFriend ? 'false' : 'true'}`}

                        addmbid={member.mbId}
                        addmbnick={member.mbNick}
                        addmbdes="要來加我好友嗎?"
                        addmbava={member.mbAva}
                        addmbcty={member.mbCountry}
                        onClick={e => {
                          getaddfriendData(e)
                        }}
                        disabled={`${!addingFriend ? '' : 'disabled'}`}
                      >
                        {!addingFriend ? '加入好友' : '等待確認好友'}
                      </button>
                    ) : (
                      ''
                    )}
                    {/* 加好友卡片彈跳視窗 */}
                    <button
                      className={`addedfriend ${!addedFriend ? '' : 'active'}`}
                      disabled
                    >
                      已成為好友
                    </button>
                    <div className={`M-popupFriend ${pop ? 'active' : ''}`}>
                      <div
                        className={`position-relative ${
                          !popCancel ? '' : 'nonActive'
                        }`}
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
                            top: '-40px',
                            right: '20px',
                            zIndex: '60',
                            cursor: 'pointer',
                          }}
                        />
                      </div>

                      <div className={`${!popCancel ? '' : 'nonActive'}`}>
                        <Maddfriendcard />
                      </div>
                    </div>

                    {/* ------------------------------------------------------ */}
                    <div
                      style={{
                        height: '1px',
                        width: '250px',
                        background: '#79cee2',
                        margin: '20px 0',
                        position: 'relative',
                        left: '15%',
                      }}
                    >
                      <p
                        style={{
                          position: 'absolute',
                          top: '-15px',
                          left: '35%',
                          background: 'white',
                          padding: '5px',
                          letterSpacing: '1.5px',
                        }}
                      >
                        其他社群
                      </p>
                    </div>
                    <ul
                      className="footer_icon mx-auto"
                      style={{
                        color: '#F9A451',
                        width: '180px',
                        fontSize: '20px',
                      }}
                    >
                      <li>
                        <AiFillFacebook />
                      </li>

                      <li>
                        <AiFillTwitterCircle />
                      </li>
                      <li>
                        <AiFillMail />
                      </li>
                      <li>
                        <AiFillYoutube />
                      </li>
                    </ul>
                    <div
                      style={{
                        height: '1px',
                        width: '250px',
                        background: '#79cee2',
                        margin: '20px 0',
                        position: 'relative',
                        left: '15%',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
            {loginUserId === +props.match.params.id ? (
              <NavLink
                to={`/addpost`}
                className="d-flex justify-content-end"
                style={{
                  fontSize: '45px',
                  color: '#F9A451',
                  position: 'fixed',
                  zIndex: '10',
                  right: '18%',
                  top: '50%',
                }}
              >
                <AiOutlinePlusCircle />
              </NavLink>
            ) : (
              ''
            )}
          </>
        )
      }
    }

    return (
      <>
        {/* <div className="container">          <h1>null</h1>        </div> */}
      </>
    )
  } else {
    // console.log(arr)

    return (
      <>
        {/* 彈跳視窗背景 */}
        <div className={`M-popUpDiv ${pop ? 'active' : ''}`}></div>
        {/* 新增貼文 */}
        {loginUserId === +props.match.params.id ? (
          <NavLink
            to={`/addpost`}
            className="d-flex justify-content-end"
            style={{
              fontSize: '45px',
              color: '#F9A451',
              position: 'fixed',
              zIndex: '40',
              top: '50%',
              right: '16%',
            }}
          >
            <AiOutlinePlusCircle />
          </NavLink>
        ) : (
          ''
        )}
        {/* </div> */}
        <div className="container my-5">
          <div className="row">
            <div className="col-md-9 position-relative">
              <div
                className="d-flex align-items-center"
                style={{
                  height: '40ox',
                  padding: '10px 0',
                  margin: '20px 0',
                  borderTop: '1px solid #79cee2',
                  borderBottom: '1px solid #79cee2',
                  // color: '#79cee2',
                }}
              >
                <p
                  className="mx-2 my-0"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSideNav(false)
                    console.log('false', sideNav)
                  }}
                >
                  {sideNav ? (
                    <AiOutlineAppstore
                      style={{
                        fontSize: '30px',
                        padding: '5px 0',
                        color: '#79cee2',
                      }}
                    />
                  ) : (
                    <AiFillAppstore
                      style={{
                        fontSize: '30px',
                        padding: '5px 0',
                        color: '#79cee2',
                      }}
                    />
                  )}
                  貼文列表
                </p>
                {loginUserId === +props.match.params.id ? (
                  <p
                    className="mx-2 my-0 "
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setSideNav(true)
                    }}
                  >
                    {' '}
                    {sideNav ? (
                      <AiFillStar
                        style={{
                          fontSize: '30px',
                          padding: '5px 0',
                          color: '#79cee2',
                        }}
                      />
                    ) : (
                      <AiOutlineStar
                        style={{
                          fontSize: '30px',
                          padding: '5px 0',
                          color: '#79cee2',
                        }}
                      />
                    )}
                    收藏列表
                  </p>
                ) : (
                  ''
                )}
              </div>
              {sideNav ? (
                <div
                  style={{ position: 'absolute', top: '18.5%' }}
                  // className="nonActive"
                >
                  <PostCollectionProfile
                    postId={postProfile.post_id}
                    postMemberId={postProfile.mbId}
                    loginMemberId={loginUserId}
                  />
                </div>
              ) : (
                <div className="d-flex flex-wrap">
                  {arr.map((v, i) => (
                    <div className="" key={i}>
                      <figure
                        className="C-profilePostFigure"
                        onClick={() => {
                          window.location.href = `/postDetailProfile/${v.post_id}`
                        }}
                      >
                        <>
                          <img
                            src={`http://localhost:6001/img/${v.postImg}`}
                            style={{ width: '100%' }}
                          />
                        </>
                      </figure>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-3">
              <div
                style={{
                  height: '1px',
                  width: '200px',
                  background: '#79cee2',
                  margin: '20px 0',
                  position: 'relative',
                  left: '15%',
                }}
              ></div>
              <h6
                style={{
                  background: 'white',
                  width: '200px',
                  textAlign: 'center',
                  margin: '0 auto',
                  letterSpacing: '1.5px',
                }}
              >
                {postProfile.mbNick}
              </h6>

              <figure
                style={{
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  overflow: 'hidden',
                  margin: '30px auto',
                  border: '1px solid #79cee2',
                  padding: '4px',
                  // boxShadow: '0px 0px 10px #adb6bd',
                }}
              >
                <img
                  src={postProfile.mbAva}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </figure>
              {/* </div> */}
              <div className="m-auto text-center">
                {/* <h6>{member.mbNick}</h6> */}
                <p>{postProfile.mbDes}</p>
                <div
                  className="d-flex justify-content-center"
                  style={{ letterSpacing: '1px' }}
                >
                  <p className=" mx-1 font-weight-bold text-center">
                    {' '}
                    {arr.length} 貼文
                  </p>
                  <p className="mx-1 font-weight-bold text-center">
                    {' '}
                    {loginUserFriend.length} 好友
                  </p>
                </div>
                {postProfile.mbId !== loginUserId ? (
                  <button
                    className={`C-profileaddbtn 
                    ${!addingFriend ? '' : 'active'}
                    `}
                    // disabled={`${!addingFriend ? 'false' : 'true'}`}

                    addmbid={postProfile.mbId}
                    addmbnick={postProfile.mbNick}
                    addmbdes="要來加我好友嗎?"
                    addmbava={postProfile.mbAva}
                    addmbcty={postProfile.mbCountry}
                    onClick={e => {
                      getaddfriendData(e)
                    }}
                    disabled={`${!addingFriend ? '' : 'disabled'}`}
                  >
                    {!addingFriend ? '加入好友' : '等待確認好友'}
                  </button>
                ) : (
                  ''
                )}
                <button
                  className={`addedfriendPost ${!addedFriend ? '' : 'active'}`}
                  disabled
                >
                  已成為好友
                </button>
                {/* 加好友卡片彈跳視窗 */}
                <div className={`M-popupFriend ${pop ? 'active' : ''}`}>
                  <div
                    className={`position-relative ${
                      !popCancel ? '' : 'nonActive'
                    }`}
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
                        top: '-20px',
                        right: '12%',
                        zIndex: '30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>

                  <div className={`${!popCancel ? '' : 'nonActive'}`}>
                    <Maddfriendcard />
                  </div>
                </div>

                {/* ------------------------------------------------------ */}
                <div
                  style={{
                    height: '1px',
                    width: '200px',
                    background: '#79cee2',
                    margin: '20px 0',
                    position: 'relative',
                    left: '15%',
                  }}
                >
                  <p
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '35%',
                      background: 'white',
                      padding: '5px',
                      letterSpacing: '1.5px',
                    }}
                  >
                    其他社群
                  </p>
                </div>
                <ul
                  className="footer_icon mx-auto"
                  style={{
                    color: '#F9A451',
                    width: '150px',
                    fontSize: '20px',
                  }}
                >
                  <li>
                    <AiFillFacebook />
                  </li>

                  <li>
                    <AiFillTwitterCircle />
                  </li>
                  <li>
                    <AiFillMail />
                  </li>
                  <li>
                    <AiFillYoutube />
                  </li>
                </ul>
                <div
                  style={{
                    height: '1px',
                    width: '200px',
                    background: '#79cee2',
                    margin: '20px 0',
                    position: 'relative',
                    left: '15%',
                  }}
                ></div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>

        {/*---------新增貼文------- */}
      </>
    )
  }
}
export default withRouter(PostProfile)

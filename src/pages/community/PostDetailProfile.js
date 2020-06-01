import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import InfiniteScroll from '../../components/community/InfiniteScroll'
import { useSelector, useDispatch } from 'react-redux'
import { LikeToggle } from '../../actions/index'
import PostComment from '../../components/community/PostComment'
import PostDetailMore from '../../components/community/PostDetailMore'
// import { NavLink } from 'react-router-dom'
import PostCollection from '../../components/community/PostCollection'

import {
  AiOutlineStar,
  AiOutlineHeart,
  AiFillEnvironment,
  AiFillHeart,
} from 'react-icons/ai'
import '../../css/community.css'

function PostDetail(props) {
  const [posts, setPosts] = useState([])

  const [dataHasLoaded, setDataHasLoaded] = useState(false)
  // let postid = props.match.params.id
  const [likeHeart, setLikeHeart] = useState(false)
  const like = useSelector(state => state.communityLike)
  const [loginUserId, setLoginUserId] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }

    // const jsonInput = JSON.stringify(input)

    setLoginUserId(input.mbId)

    // console.log(input.mbId)
  }, [])
  ////////
  //連資料庫 fetch API
  async function fetchPost() {
    let res = await fetch('http://localhost:6001/items/posts')
    let response = await res.json()
    setPosts(response)

    for (let i = 0; i < response.length; i++) {
      // console.log('response', response[i])
      // console.log('response', props.match.params.id)
      if (response[i].post_id === +props.match.params.id) {
        let likes = response[i].postLikes
        dispatch(LikeToggle(1, likes))
      }
    }
  }
  useEffect(() => {
    fetchPost()
  }, [])

  // 避免畫面閃爍(postprofile===null)
  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">網頁載入中...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <div style={{ height: '500px' }}>
      <h1 className="my-5">找不到相關資訊</h1>
      <button
        style={{
          color: '#79cee2',
          background: 'none',
          border: '1px solid #79cee2',
          padding: '5px 10px',
          fontSize: '20px',
        }}
        onClick={() => props.history.push('/community')}
      >
        {' '}
        回到首頁
      </button>
    </div>
  )

  //貼文詳細頁判斷

  let postDetail = null
  // console.log(posts)

  for (let i = 0; i < posts.length; i++) {
    if (posts[i].post_id === +props.match.params.id) {
      postDetail = posts[i]
    }
  }
  if (postDetail === null) {
    return (
      <>
        <div className="container">{!dataHasLoaded ? loading : display}</div>
      </>
    )
  } else {
    return (
      <>
        <div className="container my-5">
          <div className="row C-postdetailDiv">
            {/* 貼文圖片 */}

            <div className="col-md-8 " style={{ paddingTop: '10px' }}>
              {/* RWD 手機版本 */}
              <div
                className="d-flex C-postDetailXS"
                onClick={() => {
                  window.location.href = `/Communityprofile/${postDetail.mbId}`
                }}
              >
                <figure>
                  <img
                    src={postDetail.mbAva}
                    style={{ width: '100%', height: '100%' }}
                  />
                </figure>
                <div style={{ fontSize: '14px', marginTop: '10px' }}>
                  {' '}
                  <span>{postDetail.mbNick}</span>
                  <p
                    style={{
                      color: '#F9A451',
                      fontWeight: 'bold',
                      letterSpacing: '2px',
                    }}
                  >
                    <AiFillEnvironment />{' '}
                    <span style={{ fontSize: '12px', paddingLeft: '10px' }}>
                      {postDetail.mbCountry}
                    </span>
                  </p>
                </div>
              </div>
              {/* RWD 手機版本 */}
              {/* -------------------------------------------------------------------- */}
              <figure className="C-detailPic">
                <img
                  src={`http://localhost:6001/img/${postDetail.postImg}`}
                  style={{ display: 'block', width: '100%', height: '100%' }}
                />
              </figure>
              {/* RWD 手機版本 */}
              {/* -------------------------------------------------------------------- */}
              <div className="C-postContentXS">
                <p>
                  <span
                    style={{
                      fontWeight: 'bold',
                      paddingRight: '10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      window.location.href = `/Communityprofile/${postDetail.mbId}`
                    }}
                  >
                    {postDetail.mbNick}
                  </span>{' '}
                  {postDetail.postContent}
                </p>
              </div>
              {/* 收藏按讚留言 */}
              <div className="d-flex justify-content-between C-posticon C-postLikeCollectionXS ">
                <div
                  className="mx-2 d-flex C-postlikeXS"
                  onClick={() => {
                    setLikeHeart(!likeHeart)
                  }}
                >
                  <div className="C-postlikeXS">
                    {likeHeart ? <AiFillHeart /> : <AiOutlineHeart />}
                    {/* 按讚人數 */}
                  </div>

                  <p
                    className="C-postlikeXS"
                    style={{
                      fontSize: '14px',
                      margin: '8px 10px',
                      color: 'black',
                      opacity: '0.7',
                    }}
                  >
                    <span style={{ fontWeight: 'bold', paddingRight: ' 4px' }}>
                      {likeHeart ? `${like.payload + 1}` : `${like.payload}`}
                    </span>
                    人都說讚
                  </p>
                </div>

                <div className="C-postlikeXS">
                  <PostCollection
                    postId={postDetail.post_id}
                    postMemberId={postDetail.mbId}
                    loginMemberId={loginUserId}
                  />
                </div>
              </div>
            </div>
            <div className="C-postcommentXS">
              <PostComment postId={props.match.params.id} />
            </div>

            {/* ---------------------------------------------------------------------------- */}

            {/* 貼文內容 */}
            <div className="col-md-4 C-postdetailright">
              <PostDetailMore
                postId={props.match.params.id}
                postImg={postDetail.postImg}
                memberID={postDetail.mbId}
                postContent={postDetail.postContent}
              />

              <div
                className="d-flex"
                style={{
                  borderBottom: '1px solid #79cee2',
                  margin: '5px',
                  justifyContent: 'space-between',
                }}
              >
                {/* 貼文用戶資料（頭像，名字，國家，加好友） */}
                <div
                  className="d-flex"
                  style={{
                    padding: '5px 0',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.location.href = `/Communityprofile/${postDetail.mbId}`
                  }}
                >
                  {/* 貼文用戶大頭貼 */}
                  <figure
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      border: '1px solid black',
                      overflow: 'hidden',
                      margin: '5px 10px',
                    }}
                  >
                    <img
                      src={postDetail.mbAva}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </figure>
                  <div style={{ fontSize: '18px', marginTop: '8px' }}>
                    {' '}
                    <span style={{ display: 'block' }}>
                      {postDetail.mbNick}
                    </span>
                    <p
                      style={{
                        color: '#F9A451',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                      }}
                    >
                      <AiFillEnvironment />{' '}
                      <span style={{ fontSize: '14px', paddingLeft: '5px' }}>
                        {postDetail.mbCountry}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="C-postContent">
                <span
                  style={{
                    fontWeight: 'bold',
                    paddingRight: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    window.location.href = `/Communityprofile/${postDetail.mbId}`
                  }}
                >
                  {postDetail.mbNick}
                </span>{' '}
                {postDetail.postContent}
              </p>
              <p style={{ fontSize: '12px', color: 'grey', margin: '0 10px' }}>
                {postDetail.updated_at}
              </p>
              {/* 收藏按讚留言 */}
              <div className="d-flex justify-content-between C-posticon  ">
                <div
                  className="mx-2 d-flex"
                  onClick={() => {
                    setLikeHeart(!likeHeart)
                  }}
                >
                  <div>
                    {likeHeart ? <AiFillHeart /> : <AiOutlineHeart />}
                    {/* 按讚人數 */}
                  </div>

                  <p
                    style={{
                      fontSize: '14px',
                      margin: '8px 10px',
                      color: 'black',
                      opacity: '0.7',
                    }}
                  >
                    <span style={{ fontWeight: 'bold', paddingRight: ' 4px' }}>
                      {likeHeart ? `${like.payload + 1}` : `${like.payload}`}
                    </span>
                    人都說讚
                  </p>
                </div>

                <div className="m-2">
                  <PostCollection
                    postId={postDetail.post_id}
                    postMemberId={postDetail.mbId}
                    loginMemberId={loginUserId}
                  />
                </div>
              </div>

              <PostComment postId={props.match.params.id} />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(PostDetail)

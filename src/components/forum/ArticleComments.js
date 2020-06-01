import React, { useState, useEffect } from 'react'
import { withRouter, Switch, Route, useHistory } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getArticleData } from '../../actions/articleActions'
// import { NavLink } from 'react-bootstrap'
import {
  AiOutlineGithub,
  AiOutlineHighlight,
  AiOutlineSolution,
  AiOutlineUser,
  AiOutlineFile,
  AiOutlineMessage,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineGoogle,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai'
import ArticleTag from '../../components/forum/ArticleTag'
import '../../css/forum.scss'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import { Result } from 'antd'

function ArticleComments(props) {
  const history = useHistory()
  const [comment, setComment] = useState([])
  const [addcomment, setAddComment] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)
  const [mbId, setmbId] = useState('')

  const articleId = props.match.params.articleId
    ? props.match.params.articleId
    : ''
  // console.log('留言ID', articleId)
  function post() {
    Swal.fire({
      icon: 'success',
      title: '留言成功',
    })
  }

  // 進入即判斷localStorage裡面的登入Data(沒有表示尚未登入或已經登出)
  // 為避免被使用者以輸入網址的方式跳轉過來
  useEffect(() => {
    if (localStorage.getItem('LoginUserData')) {
      const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
      setmbId(localUserData.mbId)
      // console.log('ID', mbId)

      // setMinDate(rightNow)
      setLoginStatus(true)
      // console.log('OK')
    } else {
      setLoginStatus(false)
      // console.log('NO')
      Swal.fire({ title: '請先登入喲！', icon: 'warning' }).then(function(r) {
        history.push('/forum')
      })
    }
  }, [])

  //取得留言資訊
  // 讀取資料庫留言內容
  async function getCommentData() {
    let data = await fetch(
      `http://localhost:6001/articles/article_comments/${articleId}`
    )
    let getCommentInfo = await data.json()
    if (getCommentInfo) {
      setComment(getCommentInfo)
    }
  }
  // async function getCommentData(articleId) {
  //   const request = new Request(
  //     'http://localhost:6001/articles/article_comments/' + articleId,
  //     {
  //       method: 'GET',
  //       credentials: 'include',
  //     }
  //   )
  //   const response = await fetch(request)
  //   const data = await response.json()
  //   console.log('留言data', data)
  //   setComment(data[0])
  // }

  useEffect(() => {
    // console.log('dddd', props)
    getCommentData(articleId)
  }, [])

  //發表留言
  const commentInfo = {
    content: '',
    articleId: articleId,
    mbId: mbId,
  }
  // console.log('info', commentInfo)

  //寫入文章資訊
  function commentFormInfo(e, info) {
    switch (info) {
      case 'content':
        commentInfo.content = e.currentTarget.value
        break
      // case 'articleContent':
      //   articleInfo.articleContent = e.currentTarget.value
      //   break
      default:
        break
    }
  }

  //建立留言
  async function postComment() {
    const req = new Request('http://localhost:6001/articles/article_comments', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(commentInfo),
    })

    const res = await fetch(req)
    const order = await res.json()
    // console.log('order', order)
    // if (order.result.affectedRows == 1) {
    Swal.fire({
      // icon: 'success',
      title: '留言成功',
      timer: 1500,
    })
    // }
  }

  // const handleSubmit = () => {
  //   const commentData = { addcomment }
  //   console.log('commentData', commentData)
  //   sendCommentDataToServer(commentData, () => post('成功發文'))
  // }

  // async function sendCommentDataToServer(commentData, callback) {
  //   // 注意資料格式要設定，伺服器才知道是json格式
  //   const request = new Request(
  //     'http://localhost:6001/articles/article_comments/',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify(commentData),
  //       headers: new Headers({
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       }),
  //     }
  //   )

  //   console.log(JSON.stringify(commentData))

  //   const response = await fetch(request)
  //   const data = await response.json()
  //   console.log('sendData', data)
  //   callback()
  // }

  //   useEffect(() => {
  //     console.log('comment', props)
  //     props.getCommentData()
  //   }, [])
  // console.log('comment', props)
  return (
    <>
      {/* 留言內容 */}
      <div class="f-gap-3"></div>
      <div id="comments"></div>
      <h3 class="f-latest-title">
        <span>
          <span class="f-category-text-1"></span> 評論
        </span>
      </h3>

      <div class="f-gap"></div>
      <div class="f-comments">
        {comment.map((value, ind) => (
          <div class="f-comment" key={ind}>
            <div class="f-comment-meta">
              <img
                src={value.mbAva}
                alt="Witch Murder"
                class="rounded-circle"
                width="35"
              />{' '}
              by <a href="#">{value.mbNick}</a> in {value.created_at}
            </div>
            <div class="f-comment-text">
              <p>{value.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 留言回應 */}
      <div class="f-gap-3"></div>
      <h3 class="f-latest-title">
        <span>
          <span class="f-category-text-1">留言</span> 回覆
        </span>
      </h3>

      <div class="f-gap"></div>
      <div class="f-reply">
        <form action="#" class="f-form" novalidate="novalidate">
          <div class="f-gap-1"></div>
          <textarea
            class="form-control required"
            name="message"
            rows="5"
            placeholder="Message *"
            aria-required="true"
            onChange={e => commentFormInfo(e, 'content')}
            // onChange={e => setAddComment(e.target.value)}
          ></textarea>

          <div class="f-gap-1"></div>
          <div class="f-form-response-success"></div>
          <div class="f-form-response-error"></div>
          <button
            onClick={postComment}
            class="f-index-btn f-index-btn-rounded f-index-btn-color"
            id="post"
          >
            留言
          </button>
        </form>
      </div>
    </>
  )
}

export default withRouter(ArticleComments)

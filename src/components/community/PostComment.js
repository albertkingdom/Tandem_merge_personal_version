import React, { useState, useEffect, useCallback } from 'react'
import { AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai'
import Swal from 'sweetalert2'

import EditableLabel from 'react-inline-editing'

export default function PostComment(props) {
  const [comment, setComment] = useState('')

  const [loginUserId, setLoginUserId] = useState('')
  const [allComments, setAllComments] = useState([])

  // 連資料庫 fetch API
  async function fetchPostComment() {
    let res = await fetch('http://localhost:6001/postComment/comments')
    let response = await res.json()
    setAllComments(response)
  }

  useEffect(() => {
    fetchPostComment()
  }, [])

  useEffect(() => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }
    // const jsonInput = JSON.stringify(input)

    setLoginUserId(input.mbId)
    // console.log(input.mbId)
  }, [])

  //update fetch API 新增留言

  const handlecommentsubmit = () => {
    let postId = props.postId
    let commentdata = { comment, postId, loginUserId }

    sendCommentDataToServer(
      commentdata,
      Swal.fire({
        icon: 'success',
        title: '新增留言成功',
        showConfirmButton: false,
        timer: 2000,
      }).then(r => {
        if (r.value) {
          window.location.reload()
        }
        // window.location.href = `/Communityprofile/${loginUserId}`
      })
    )
    async function sendCommentDataToServer() {
      // 注意資料格式要設定，伺服器才知道是json格式
      const request = new Request(
        'http://localhost:6001/postComment/addNewComment',
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(commentdata),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      console.log(JSON.stringify(commentdata))
      const response = await fetch(request)
      const data = await response.json()
      // setNewComment(data)
      console.log(data)
    }
  }

  let delCommentId
  // let commentId = { delCommentId }

  const deleteComment = () => {
    Swal.fire({
      title: '確定删除留言嗎？',
      text: '你無法恢復它！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#79cee2',
      cancelButtonColor: '#F9A451',
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
    }).then(willDelete => {
      if (willDelete.value) {
        // console.log('delCommentId', delCommentId)
        Swal.fire('刪除成功!', '留言已經刪除', 'success')
        let commentId = { delCommentId }
        delCommentDataFromServer(
          commentId,
          () => (window.location.href = `/postdetail/${props.postId}`)
        )
        async function delCommentDataFromServer() {
          // 注意資料格式要設定，伺服器才知道是json格式
          const request = new Request(
            'http://localhost:6001/postComment/delpostComment',
            {
              method: 'POST',
              body: JSON.stringify(commentId),
              headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }),
            }
          )
          // console.log(JSON.stringify(commentId))
          const response = await fetch(request)
          const data = await response.json()
        }
        setTimeout(() => window.location.reload(), 1300)
      } else if (willDelete.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('取消', '你成功保留此貼文', 'error')
      }
    })
  }

  //edit comment
  let editComment
  let editCommentId
  console.log(editComment)
  const handlecommentedit = () => {
    console.log(editComment, editCommentId)
    let editcomment = { editCommentId, editComment }
    // let postcomment_id = commentId.delCommentId
    // console.log(delComment)
    // console.log(editcomment)

    editCommentDataFromServer(
      editcomment,
      Swal.fire({
        icon: 'success',
        title: '留言編輯成功',
        showConfirmButton: false,
        timer: 2000,
      }).then(r => {
        // window.location.href = `/Communityprofile/${loginUserId}`
        window.location.reload()
      })
    )
    async function editCommentDataFromServer() {
      // 注意資料格式要設定，伺服器才知道是json格式
      const request = new Request(
        'http://localhost:6001/postComment/editpostComment',
        {
          method: 'POST',
          body: JSON.stringify(editcomment),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      // console.log(JSON.stringify(commentId))
      const response = await fetch(request)
      const data = await response.json()
      // setTimeout(() => {
      //   window.location.reload()
      // }, 500)
    }
  }

  //細節頁分析
  let commentDetail = []

  for (let i = 0; i < allComments.length; i++) {
    if (allComments[i].post_id == props.postId) {
      // commentDetail = allComments[i]
      commentDetail.push(allComments[i])
      // console.log(commentDetail)
    }
  }

  return (
    <>
      {/* 留言 */}
      {commentDetail.length >= 3 ? (
        <p
          style={{
            fontSize: '14px',
            color: '#ADB6BD',
            margin: '12px 8px',
          }}
        >
          查看更多留言
        </p>
      ) : (
        ''
      )}

      <div className="C-commentbar">
        {commentDetail.map((v, i) => {
          return (
            <>
              <div className="d-flex" style={{ width: '320px' }} key={i}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    window.location.href = `/Communityprofile/${v.mbId}`
                  }}
                >
                  <figure
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      border: '1px solid black',
                      padding: '1px',
                      overflow: 'hidden',
                      margin: '5px 10px',
                    }}
                  >
                    <img
                      src={v.mbAva}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </figure>
                </div>

                <div style={{ fontSize: '15px', width: '85%' }}>
                  <span
                    style={{
                      fontWeight: 'bold',
                      // paddingRight: '10px',
                      marginBottom: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      window.location.href = `/Communityprofile/${v.mbId}`
                    }}
                  >
                    {v.mbNick}
                  </span>

                  {v.mbId === loginUserId ? (
                    <EditableLabel
                      text={v.postComment_content}
                      inputMaxLength="50"
                      // onFocus={text => console.log(text)}
                      onFocusOut={text => {
                        editComment = text
                      }}
                    />
                  ) : (
                    <p style={{ fontSize: '14px' }}>{v.postComment_content}</p>
                  )}

                  {/* 貼文發布時間和刪除按鈕 */}
                  <div
                    className="d-flex justify-content-between"
                    style={{ minHeight: '30px' }}
                  >
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#ADB6BD',
                        lineHeight: '8px',
                      }}
                    >
                      {v.updated_at}
                    </span>
                    {/* 刪除留言 */}
                    {v.mbId === loginUserId ? (
                      <div className="d-flex">
                        <div
                          className=" C-postComment mx-2"
                          onClick={() => {
                            editCommentId = v.postComment_id
                            console.log(editCommentId)
                            handlecommentedit()
                          }}
                        >
                          <p className="C-commentEdittext">編輯留言</p>
                          <AiOutlineEdit
                            className="C-commentEditBtn"
                            style={{
                              color: '#F9A451',
                              fontSize: '18px',
                              margin: '0',
                            }}
                          />
                        </div>
                        <div
                          className=" C-postComment mx-2"
                          onClick={e => {
                            // delCommentId.push(v.postComment_id)
                            delCommentId = v.postComment_id
                            // console.log(delCommentId)
                            // e.preventDefault()
                            deleteComment()
                          }}
                        >
                          <p className="C-commentdeltext">刪除留言</p>
                          <AiOutlineCloseCircle
                            className="C-commentdelBtn"
                            style={{
                              color: '#F9A451',
                              fontSize: '16px',
                              margin: '0',
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </>
          )
        })}

        {/* ----- */}
      </div>
      {/* <p>{comment}</p> */}

      <form
        onSubmit={() => {
          handlecommentsubmit()
        }}
        className="d-flex justify-content-between my-2"
        style={{ borderTop: '1px solid #79cee2' }}
      >
        <input
          placeholder="留言...."
          style={{
            padding: '2px 10px',
            border: 'none',
            fontSize: '12px',
            width: '300px',
          }}
          value={comment}
          onChange={e => {
            setComment(e.target.value)
          }}
        />
        <button
          className="C-postbtn"
          style={{
            background: 'white',
            border: 'none',
            borderLeft: '2px solid #ADB6BD',
            padding: '0 20px',
            margin: '10px 0',
            color: '#ADB6BD',
          }}
        >
          發布
        </button>
      </form>
    </>
  )
}

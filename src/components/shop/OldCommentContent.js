import React, { useState } from 'react'
import {
  AiOutlineStar,
  AiTwotoneStar,
  AiOutlineMore,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai'
import ReplyComment from './ReplyComment'
import InnerOldComment from './InnerOldComment'

function OldCommentContent({
  handleEditMsg,
  handleDelMsg,
  msg,
  handleSubmit,
  toSetCommentContent,
  oldCommentContent,
}) {
  const [showReply, setShowReply] = useState(false)

  const toggleShowReply = () => {
    setShowReply(!showReply)
  }

  const oldReply = oldCommentContent
    .filter(item => item.parentId === msg.id)
    .map(comment => (
      <InnerOldComment
        key={comment.id}
        handleDelMsg={handleDelMsg}
        handleEditMsg={handleEditMsg}
        innermsg={comment}
      />
    ))

  return (
    <>
      {msg.parentId === 0 ? (
        <div className="s-card my-2">
          <div className="card-body position-relative">
            {/* 編輯 刪除按鈕，留言者本人才能回覆 */}
            {msg.mbId ===
            JSON.parse(localStorage.getItem('LoginUserData')).mbId ? (
              <>
                <button
                  className="s-comment-del-btn"
                  onClick={() => handleDelMsg(msg.id)}
                >
                  <AiOutlineDelete />
                </button>
                <button
                  className="s-comment-edit-btn"
                  onClick={() => handleEditMsg(msg.id)}
                >
                  <AiOutlineEdit />
                </button>
              </>
            ) : null}
            <div className="row">
              <div className="col-5 col-md-2">
                <img
                  src={msg.mbAva}
                  className="img img-rounded img-fluid"
                  alt="avator"
                />
                <p className="text-secondary text-center">{msg.created_at}</p>
              </div>
              <div className="col-7 col-md-10">
                <p className="row">
                  <a className="float-left col-md-8 py-2" href="/member">
                    <strong>{msg.name}</strong>
                  </a>

                  <span className="float-right col-md-3 row mx-2 py-2">
                    {msg.rating}
                    <AiTwotoneStar
                      className="text-warning"
                      style={{ fontSize: '20px' }}
                    />
                  </span>
                </p>
                <div className="clearfix"></div>
                <form>
                  <textarea
                    className="col-md-10"
                    rows="5"
                    style={{ border: '0px' }}
                    value={msg.content}
                    readOnly
                  ></textarea>
                </form>
                <p>
                  <button
                    className="float-right btn btn-outline-primary ml-2 s-btn-common"
                    onClick={() => setShowReply(!showReply)}
                  >
                    <i className="fa fa-reply"></i>Reply
                  </button>
                </p>
              </div>
            </div>
            {oldReply}
            {showReply ? (
              <ReplyComment
                handleSubmit={handleSubmit}
                toggleShowReply={toggleShowReply}
                msg={msg}
                toSetCommentContent={toSetCommentContent}
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default OldCommentContent

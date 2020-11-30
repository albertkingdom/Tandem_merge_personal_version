import React, { useState } from 'react'
import useLoginStatus from './customHook/useLoginStatus'

function ReplyComment({ handleSubmit, toggleShowReply, parentId }) {
  const isLogin = useLoginStatus() //custom hook

  const [commentContent, setCommentContent] = useState('')

  return (
    <>
      <div
        className="s-card my-2 s-newreply-active"
        // style={{ maxHeight: '0', overflow: 'hidden', border: '0' }}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-5 col-md-2">
              {JSON.parse(localStorage.getItem('LoginUserData')) ? (
                <img
                  src={JSON.parse(localStorage.getItem('LoginUserData')).mbAva}
                  alt="avator"
                  className="img img-rounded img-fluid"
                />
              ) : (
                <img src={`/images/shop/avator_empty.jpg`} alt="..." />
              )}

              <p className="text-secondary text-center"></p>
            </div>
            <div className="col-7 col-md-10">
              <p className="row">
                <strong className="col-md-8 py-2">
                  <input
                    className="form-control-plaintext col-5"
                    type="text"
                    // placeholder="請輸入暱稱"
                    // onChange={e => setUsername(e.target.value)}
                    defaultValue={
                      isLogin
                        ? JSON.parse(localStorage.getItem('LoginUserData'))
                            .mbNick
                        : ''
                    }
                  ></input>
                </strong>
              </p>
              <div className="clearfix"></div>
              <form>
                <textarea
                  className="col-md-10 p mt-2 form-control"
                  placeholder="請留言..."
                  onChange={e => setCommentContent(e.target.value)}
                ></textarea>
              </form>
              <p>
                <button
                  className="float-right btn btn-outline-primary ml-2 s-btn-common"
                  onClick={e => {
                    handleSubmit(parentId, commentContent)
                    toggleShowReply() //關掉回覆留言視窗
                  }}
                >
                  <i className="fa fa-reply"></i>發表留言
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReplyComment

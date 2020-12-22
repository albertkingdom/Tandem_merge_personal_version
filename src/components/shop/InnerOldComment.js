import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import useLoginStatus from '../../components/shop/customHook/useLoginStatus'

function InnerOldComment({ handleDelMsg, handleEditMsg, innermsg }) {
  const { isLogin, loginId } = useLoginStatus()

  return (
    <div className="s-card card-inner">
      <div className="card-body position-relative">
        {/* 有登入且是留言主人才能看到按鈕 */}
        {isLogin && loginId === innermsg.mbId ? (
          <>
            <button
              className="s-comment-del-btn"
              onClick={() => handleDelMsg(innermsg.id)}
            >
              <AiOutlineDelete />
            </button>
            <button
              className="s-comment-edit-btn"
              onClick={() => handleEditMsg(innermsg.id)}
            >
              <AiOutlineEdit />
            </button>
          </>
        ) : null}
        <div className="row">
          <div className="col-5 col-md-2">
            <img
              src={innermsg.mbAva}
              className="img img-rounded img-fluid"
              alt="avator"
            />

            <p className="text-secondary text-center">{innermsg.created_at}</p>
          </div>
          <div className="col-7 col-md-10">
            <>
              <p className="row">
                <a href="#">
                  <strong className="col-10 py-2">{innermsg.name}</strong>
                </a>
              </p>

              <p>{innermsg.content}</p>
              <p></p>
            </>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InnerOldComment

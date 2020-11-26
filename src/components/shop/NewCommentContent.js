import React, { useState } from 'react'
import { AiTwotoneStar } from 'react-icons/ai'
import useLoginStatus from './customHook/useLoginStatus'

const NewCommentContent = ({ handleSubmit, avatorImgSrc }) => {
  const isLogin = useLoginStatus() //custom hook
  const [commentContent, setCommentContent] = useState('')
  const [rating, setRating] = useState(0)
  return (
    <div className="s-card my-2">
      <div className="card-body">
        <div className="row">
          <div className="col-5 col-md-2">
            {isLogin ? (
              <img
                src={avatorImgSrc}
                className="img img-rounded img-fluid"
                alt="avator"
              />
            ) : (
              <img src={`/images/shop/avator_empty.jpg`} alt="..." />
            )}
            {/* <p className="text-secondary text-center">{msgCreatedAt}</p> */}
          </div>
          <div className="col-7 col-md-10">
            <p className="row">
              <strong className="col-md-8 py-2">
                <input
                  className="form-control-plaintext col-5"
                  type="text"
                  // placeholder="請輸入暱稱"
                  defaultValue={
                    isLogin
                      ? JSON.parse(localStorage.getItem('LoginUserData')).mbNick
                      : ''
                  }
                ></input>
              </strong>
              <span className="float-right col-md-3 row mx-2 py-2">
                <span>請給評分: </span>
                <input
                  className="form-control"
                  type="number"
                  style={{ width: '60px' }}
                  min="0"
                  max="5"
                  onChange={e => setRating(e.target.value)}
                  value={rating}
                ></input>
                <AiTwotoneStar
                  className="text-warning"
                  style={{ fontSize: '20px' }}
                />
              </span>
            </p>
            <div className="clearfix"></div>
            <form>
              <textarea
                className="form-control col-md-10 p mt-2"
                placeholder="請留言..."
                onChange={e => setCommentContent(e.target.value)}
                value={commentContent}
              ></textarea>
            </form>
            <p>
              <button
                className="float-right btn btn-outline-primary ml-2 s-btn-common"
                onClick={() => {
                  handleSubmit(0, commentContent, rating)
                  setRating(0)
                  setCommentContent('')
                }}
              >
                <i className="fa fa-reply"></i>發表留言
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCommentContent

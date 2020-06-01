import React, { useState, useEffect } from 'react'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import '../../css/shop.scss'
import {
  AiOutlineStar,
  AiTwotoneStar,
  AiOutlineMore,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userCommentAsync } from '../../actions/s-commentaction'
import Swal from 'sweetalert2' //sweetalert2
import getMemberInfo from './getMemberInfo'
import { Background } from 'react-parallax'

function Comment2(props) {
  console.log(props.leaveComment)
  const [starLength, setStarLength] = useState(0)
  //發表留言
  const [commentContent, setCommentContent] = useState('')
  const [username, setUsername] = useState('')
  const [rating, setRating] = useState(5)
  const [oldCommentContent, setOldCommentContent] = useState([])
  //   const [parentId,setParentId] = useState(0)//留言父層id
  const [avator, setAvator] = useState({}) //留言大頭照
  const dispatch = useDispatch() //使用dispatch

  const handleSubmit = (parentId = 0) => {
    if (JSON.parse(localStorage.getItem('LoginUserData')) == null) {
      //需登入才能留言
      Swal.fire({ html: '請先登入!' })
      return
    }
    console.log('click')
    const userCommentContent = {
      name: JSON.parse(localStorage.getItem('LoginUserData')).mbNick,
      content: commentContent,
      rating: rating,
      itemId: props.match.params.type,
      parentId: parentId,
      memberId: JSON.parse(localStorage.getItem('LoginUserData')).mbId,
    }
    console.log(userCommentContent)
    // props.userCommentAsync(userCommentContent, () => {
    //   Swal.fire({
    //     text: '成功留言',
    //     showCancelButton: false,
    //     confirmButtonText: 'ok!',
    //   }).then(result => {
    //     if (result.value) {
    //       window.location.reload()
    //     }
    //   })
    // })

    //usedispatch
    dispatch(
      userCommentAsync(userCommentContent, () => {
        Swal.fire({
          text: '成功留言',
          showCancelButton: false,
          confirmButtonText: 'ok!',
        }).then(result => {
          if (result.value) {
            // window.location.reload()
            getOldCommentAsync(productId) //重新抓舊留言
            setCommentContent('')
          }
        })
      })
    )
  }

  //抓舊留言的function, set到OldCommentContent
  async function getOldCommentAsync(productId) {
    const request = new Request(
      // 'http://localhost:5555/comments/?itemId='+productId,
      'http://localhost:6001/product/comment/' + productId,
      {
        method: 'GET',

        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    console.log('res data', data)
    setOldCommentContent(data.result)
  }
  const productId = props.match.params.type //取得商品id，當作參數
  useEffect(() => {
    getOldCommentAsync(productId)
  }, [])

  function handleShowReply(element) {
    console.log('element=>')
    console.log(element)
    // console.log('card-body',element.closest('.card-body').querySelector('.s-newreply').style.visibility = 'visible')
    // element.closest('.card-body').querySelector('.s-newreply').style.maxHeight =
    //   '300px'
    // element.closest('.card-body').querySelector('.s-newreply').style.border =
    //   '1px solid grey'

    //click reply按鈕切換顯示回覆新留言
    element
      .closest('.card-body')
      .querySelector('.s-newreply')
      .classList.toggle('s-newreply-active')
  }

  //刪除留言功能
  function handleDelMsg(msgID) {
    console.log(msgID)
    Swal.fire({
      title: '確定要刪除此留言?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      //選confirm就做fetch
      if (result.value) {
        fetch('http://localhost:6001/product/delcomment/' + msgID, {
          method: 'POST',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.result.affectedRows == 1) {
              Swal.fire('成功刪除!').then(result => {
                getOldCommentAsync(productId)
              })
            }
          })
      }
    })
  }

  // 用sweetalert編輯留言
  async function handleEditMsg(msgID) {
    console.log(msgID)
    let comment = oldCommentContent.filter((msg, index) => msg.id == msgID)
    console.log(comment[0].content)
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputPlaceholder: 'Type your message here...',
      inputValue: comment[0].content,

      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
    })
    if (text) {
      // Swal.fire(text)
      const userCommentContentUpdate = {
        content: text,
      }
      fetch('http://localhost:6001/product/editcomment/' + msgID, {
        method: 'POST',
        body: JSON.stringify(userCommentContentUpdate),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.result.affectedRows == 1) {
            //成功編輯留言後重抓留言
            getOldCommentAsync(productId)
          }
        })
    }
  }
  // //要怎麼抓到大頭照圖片?
  // async function getMemberInfo(value){

  //   console.log(value)
  //   const request = new Request('http://localhost:3300/product/getmemberinfo', {
  //     method: 'POST',
  //     body:JSON.stringify(value),
  //     credentials: 'include',
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //   })

  //   const response = await fetch(request)
  //   const data = await response.json()

  //   console.log('大頭照',JSON.stringify(data.r[0].mbAva))
  //   // console.log(JSON.parse(data))
  //   let avator2 = JSON.stringify(data.r[0].mbAva)
  //   // return avator2
  //   setAvator({'26':avator2})
  //   // return avator2

  // }

  const comment = (
    <>
      <div className="">
        <div className="container">
          {/* 以下是完整的1則留言 */}

          <div className="s-card my-2">
            <div className="card-body">
              <div className="row">
                <div className="col-5 col-md-2">
                  {JSON.parse(localStorage.getItem('LoginUserData')) ? (
                    <img
                      src={
                        JSON.parse(localStorage.getItem('LoginUserData')).mbAva
                      }
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
                        value={
                          JSON.parse(localStorage.getItem('LoginUserData')) !==
                          null
                            ? JSON.parse(localStorage.getItem('LoginUserData'))
                                .mbNick
                            : ''
                        }
                        // onChange={e => setUsername(e.target.value)}
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
                    ></textarea>
                  </form>
                  <p>
                    <button
                      className="float-right btn btn-outline-primary ml-2 s-btn-common"
                      onClick={() => {
                        handleSubmit()
                      }}
                    >
                      {' '}
                      <i className="fa fa-reply"></i>發表留言
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 以上是完整的1則留言 */}

          {/* <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-2">
                  <img
                    src="https://image.ibb.co/jw55Ex/def_face.jpg"
                    className="img img-rounded img-fluid"
                  />
                  <p className="text-secondary text-center">15 Minutes Ago</p>
                </div>
                <div className="col-md-10">
                  <p>
                    <a className="float-left" href="#">
                      <strong>小明</strong>
                    </a>
                    <span className="float-right">
                      <AiTwotoneStar
                        className="text-warning"
                        style={{ fontSize: '20px' }}
                      />
                    </span>
                  </p>
                  <div className="clearfix"></div>
                  <p>
                    Lorem Ipsum is simply dummy text of the pr make but also the
                    leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release
                    of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                  </p>
                  <p>
                    <a className="float-right btn btn-outline-primary ml-2">
                      {' '}
                      <i className="fa fa-reply"></i> Reply
                    </a>
                    <a className="float-right btn text-white btn-danger">
                      {' '}
                      <i className="fa fa-heart"></i> Like
                    </a>
                  </p>
                </div>
              </div> */}
          {/* <div className="card card-inner">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-2">
                      <img
                        src="https://image.ibb.co/jw55Ex/def_face.jpg"
                        className="img img-rounded img-fluid"
                      />
                      <p className="text-secondary text-center">
                        15 Minutes Ago
                      </p>
                    </div>
                    <div className="col-md-10">
                      <p>
                        <a href="#">
                          <strong>Maniruzzaman Akash</strong>
                        </a>
                      </p>
                      <p>
                        Lorem Ipsum is simply dummy text of the pr make but also
                        the leap into electronic typesetting, remaining
                        essentially unchanged. It was popularised in the 1960s
                        with the release of Letraset sheets containing Lorem
                        Ipsum passages, and more recently with desktop
                        publishing software like Aldus PageMaker including
                        versions of Lorem Ipsum.
                      </p>
                      <p>
                        <a className="float-right btn btn-outline-primary ml-2">
                          {' '}
                          <i className="fa fa-reply"></i> Reply
                        </a>
                        <a className="float-right btn text-white btn-danger">
                          {' '}
                          <i className="fa fa-heart"></i> Like
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
          {/* </div>
          </div> */}
        </div>
      </div>
    </>
  )

  const old_comment = (
    <>
      <div className="container">
        {/* 以下是完整的1則舊留言 */}

        {oldCommentContent.map((msg, value) => {
          return msg.parentId == 0 ? (
            <div className="s-card my-2" key={value}>
              <div className="card-body position-relative">
                {/* 編輯按鈕 */}
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
                <div className="row">
                  <div className="col-5 col-md-2">
                    <img
                      // src="https://image.ibb.co/jw55Ex/def_face.jpg"
                      src={msg.mbAva}
                      className="img img-rounded img-fluid"
                    />
                    <p className="text-secondary text-center">
                      {msg.created_at}
                    </p>
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
                        onClick={e => handleShowReply(e.target)}
                      >
                        {' '}
                        <i className="fa fa-reply"></i>Reply
                      </button>
                    </p>
                  </div>
                </div>

                {/* 每則留言內的inner留言，重新map找parentId ==上層id */}
                {oldCommentContent.map((innermsg, index) => {
                  return innermsg.parentId == msg.id ? (
                    <div className="s-card card-inner" key={index}>
                      <div className="card-body position-relative">
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
                        <div className="row">
                          <div className="col-5 col-md-2">
                            <img
                              // src="https://image.ibb.co/jw55Ex/def_face.jpg"
                              src={innermsg.mbAva}
                              className="img img-rounded img-fluid"
                            />

                            <p className="text-secondary text-center">
                              {innermsg.created_at}
                            </p>
                          </div>
                          <div className="col-7 col-md-10">
                            <>
                              <p className="row">
                                <a href="#">
                                  <strong className="col-10 py-2">
                                    {innermsg.name}
                                  </strong>
                                </a>
                              </p>

                              <p>{innermsg.content}</p>
                              <p></p>
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ''
                  )
                })}

                {}
                {/* 回覆別人Reply */}
                {
                  <div
                    className="s-card my-2 s-newreply"
                    // style={{ maxHeight: '0', overflow: 'hidden', border: '0' }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-5 col-md-2">
                          {JSON.parse(localStorage.getItem('LoginUserData')) ? (
                            <img
                              src={
                                JSON.parse(
                                  localStorage.getItem('LoginUserData')
                                ).mbAva
                              }
                              className="img img-rounded img-fluid"
                            />
                          ) : (
                            <img
                              src={`/images/shop/avator_empty.jpg`}
                              alt="..."
                            />
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
                                value={
                                  JSON.parse(
                                    localStorage.getItem('LoginUserData')
                                  ) !== null
                                    ? JSON.parse(
                                        localStorage.getItem('LoginUserData')
                                      ).mbNick
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
                                handleSubmit(msg.id)
                                handleShowReply(e.target.closest('.s-card')) //關掉回覆留言視窗
                              }}
                            >
                              {' '}
                              <i className="fa fa-reply"></i>發表留言
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          ) : (
            ''
          )
        })}
        {/* 以上是完整的1則留言 */}
      </div>
    </>
  )
  return (
    <>
      {comment}
      {old_comment}
    </>
  )
}
// 取得Redux中isAuth的值
// const mapStateToProps = store => {
//   return { leaveComment: store.Sleavecomment.messageIsLeft }
// }
// // 指示dispatch要綁定哪些action creators
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ userCommentAsync }, dispatch)
// }

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(Comment2)
// )
//利用dispatch
export default withRouter(Comment2)

import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import '../../css/shop.scss'

import { useDispatch } from 'react-redux'
import { userCommentAsync } from '../../actions/s-commentaction'
import Swal from 'sweetalert2' //sweetalert2

import NewCommentContent from '../../components/shop/NewCommentContent'
import OldCommentContent from '../../components/shop/OldCommentContent'
import useLoginStatus from '../../components/shop/customHook/useLoginStatus'

function CommentList(props) {
  // console.log(props.leaveComment)
  const isLogin = useLoginStatus() //custom hook

  //發表留言
  // const [commentContent, setCommentContent] = useState('')
  // const [rating, setRating] = useState(0)
  const [oldCommentContent, setOldCommentContent] = useState([])

  const dispatch = useDispatch() //使用useDispatch hook

  const handleSubmit = (parentId = 0, commentContent, rating = 0) => {
    if (!isLogin) {
      //需登入才能留言
      Swal.fire({ html: '請先登入!' })
      return
    }

    const userCommentContent = {
      name: JSON.parse(localStorage.getItem('LoginUserData')).mbNick,
      content: commentContent,
      rating: rating,
      itemId: props.match.params.id,
      parentId: parentId,
      memberId: JSON.parse(localStorage.getItem('LoginUserData')).mbId,
    }

    //usedispatch
    dispatch(
      userCommentAsync(userCommentContent, () => {
        Swal.fire({
          text: '成功留言',
          showCancelButton: false,
          confirmButtonText: 'ok!',
        }).then(result => {
          if (result.value) {
            getOldCommentAsync(productId) //重新抓舊留言
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
    // console.log('res data', data)
    setOldCommentContent(data.result)
  }
  const productId = props.productId //取得商品id，當作參數
  useEffect(() => {
    getOldCommentAsync(productId)
  }, [productId])

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
            if (data.result.affectedRows === 1) {
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
    let comment = oldCommentContent.filter((msg, index) => msg.id === msgID)
    // console.log(comment[0].content)
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
          if (data.result.affectedRows === 1) {
            //成功編輯留言後重抓留言
            getOldCommentAsync(productId)
          }
        })
    }
  }
  // const toSetRating = value => {
  //   setRating(value)
  // }
  // const toSetCommentContent = value => {
  //   setCommentContent(value)
  // }
  const comment = (
    <>
      <div className="container">
        <NewCommentContent
          // toSetRating={toSetRating}
          // rating={rating}
          // toSetCommentContent={toSetCommentContent}
          // commentContent={commentContent}
          handleSubmit={handleSubmit}
          avatorImgSrc={JSON.parse(localStorage.getItem('LoginUserData')).mbAva}
          // msgCreatedAt={null}
          isOldComment={false}
        />
        {oldCommentContent.map(msg => (
          <OldCommentContent
            key={msg.id}
            handleEditMsg={handleEditMsg}
            handleDelMsg={handleDelMsg}
            msg={msg}
            handleSubmit={handleSubmit}
            // toSetCommentContent={toSetCommentContent}
            oldCommentContent={oldCommentContent}
          />
        ))}
      </div>
    </>
  )

  return <>{comment}</>
}

export default withRouter(CommentList)

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
  const { isLogin } = useLoginStatus() //custom hook

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
    try {
      const response = await fetch(
        `http://localhost:6001/product/comment/${productId}`
      )
      const data = await response.json()

      setOldCommentContent(data.result)
    } catch (error) {
      console.log(error)
    }
  }
  const productId = props.productId //取得商品id，當作參數
  useEffect(() => {
    getOldCommentAsync(productId)
  }, [productId])

  //刪除留言功能
  async function handleDelMsg(msgID) {
    // console.log(msgID)
    const confirm = await Swal.fire({
      title: '確定要刪除此留言?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })

    if (confirm.value) {
      try {
        const response = await fetch(
          `http://localhost:6001/product/delcomment/${msgID}`,
          {
            method: 'POST',
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          }
        )

        const data = await response.json()
        if (data.result.affectedRows === 1) {
          await Swal.fire('成功刪除!')
          getOldCommentAsync(productId) //???????
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  // 用sweetalert編輯留言
  async function handleEditMsg(msgID) {
    let comment = oldCommentContent.filter(msg => msg.id === msgID)
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
      try {
        const userCommentContentUpdate = {
          content: text,
        }
        const response = await fetch(
          `http://localhost:6001/product/editcomment/${msgID}`,
          {
            method: 'POST',
            body: JSON.stringify(userCommentContentUpdate),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          }
        )
        const data = await response.json()
        if (data.result.affectedRows === 1) {
          getOldCommentAsync(productId) //???????
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const comment = (
    <>
      <div className="container">
        <NewCommentContent
          handleSubmit={handleSubmit}
          avatorImgSrc={
            isLogin
              ? JSON.parse(localStorage.getItem('LoginUserData')).mbAva
              : null
          }
          isOldComment={false}
        />
        {oldCommentContent.map(msg => (
          <OldCommentContent
            key={msg.id}
            handleEditMsg={handleEditMsg}
            handleDelMsg={handleDelMsg}
            msg={msg}
            handleSubmit={handleSubmit}
            oldCommentContent={oldCommentContent}
            isLogin={isLogin}
          />
        ))}
      </div>
    </>
  )

  return <>{comment}</>
}

export default withRouter(CommentList)

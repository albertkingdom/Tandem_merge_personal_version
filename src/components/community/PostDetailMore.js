import React, { useEffect, useState } from 'react'
import { AiOutlineEllipsis, AiFillEdit, AiFillDelete } from 'react-icons/ai'
import Swal from 'sweetalert2'

export default function PostDetailMore(props) {
  const [loginUserId, setLoginUserId] = useState('')

  useEffect(() => {
    const getDatafromlocal = JSON.parse(localStorage.getItem('LoginUserData'))
    const input = { mbId: getDatafromlocal.mbId }
    // const jsonInput = JSON.stringify(input)

    setLoginUserId(input.mbId)
    // console.log(input.mbId)
  }, [])
  console.log('props', props.postContent)
  const deletePost = () => {
    Swal.fire({
      title: '確定删除貼文嗎？',
      text: '你將無法恢復它！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#79cee2',
      cancelButtonColor: '#F9A451',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then(willDelete => {
      if (willDelete.value) {
        Swal.fire('刪除成功!', '留言已經刪除', 'success')
        let propData = props
        delCommentDataFromServer(
          propData,
          () =>
            (window.location.href = `/Communityprofile/${propData.memberID}`)
        )

        console.log('propsId:', props.memberID)
        async function delCommentDataFromServer() {
          // 注意資料格式要設定，伺服器才知道是json格式
          const request = new Request('http://localhost:6001/items/delpost', {
            method: 'POST',
            body: JSON.stringify(propData),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
          // console.log(JSON.stringify(commentId))
          const response = await fetch(request)
          const data = await response.json()
          setTimeout(() => {
            window.location.href = `/Communityprofile/${props.memberID}`
          }, 1000)
        }
      } else if (willDelete.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('取消', '你成功保留此貼文', 'error')
      }
    })
  }

  // edit post
  const editPost = () => {
    Swal.fire({
      input: 'textarea',
      inputValue: props.postContent,
      showCancelButton: true,
      confirmButtonColor: '#79cee2',
      cancelButtonColor: '#F9A451',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then(text => {
      if (text.value) {
        Swal.fire('編輯成功!', '留言已成功編輯', 'success')
        let postId = props.postId
        let postContent = text.value
        let postData = { postId, postContent }

        console.log(postData)
        editCommentDataFromServer(postData, () => {})

        async function editCommentDataFromServer() {
          // 注意資料格式要設定，伺服器才知道是json格式
          const request = new Request('http://localhost:6001/items/editpost', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: new Headers({
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }),
          })
          const response = await fetch(request)
          const data = await response.json()
        }
        setTimeout(() => {
          window.location.href = `/postDetailProfile/${postData.postId}`
        }, 500)
      } else if (text.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('取消', '你成功保留此貼文', 'error')
      }
    })
  }

  return (
    <>
      {props.memberID === loginUserId ? (
        <div className="d-flex justify-content-end C-morebutton position-relative">
          <AiOutlineEllipsis
            style={{ fontSize: '30px', marginTop: '8px', display: 'block' }}
          />
          <ul className="C-morebuttonList">
            <li style={{ fontSize: '14px' }}>
              <span
                style={{ padding: '5px 0' }}
                onClick={() => {
                  editPost()
                }}
              >
                <AiFillEdit style={{ fontSize: '18px' }} />
                編輯貼文
              </span>
            </li>
            <li style={{ fontSize: '14px' }}>
              <span
                style={{ padding: '5px 0' }}
                onClick={() => {
                  deletePost()
                }}
              >
                <AiFillDelete style={{ fontSize: '16px' }} />
                刪除貼文
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <div className="my-4"></div>
      )}
    </>
  )
}

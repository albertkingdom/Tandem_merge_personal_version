import React, { useState, useEffect } from 'react'
// import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import Swal from 'sweetalert2'

export default function PostCollectionProfile(props) {
  const [collection, setCollection] = useState([])
  //   const [collected, setCollected] = useState(false)
  // console.log(props)
  const getCollection = () => {
    // console.log('collection', props)
    // 注意資料格式要設定，伺服器才知道是json格式
    postCollection(props)
    async function postCollection() {
      // 注意資料格式要設定，伺服器才知道是json格式
      const request = new Request(
        'http://localhost:6001/posts/getpostcollection',
        {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(props),
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )
      const response = await fetch(request)
      const data = await response.json()
      console.log(data)
      setCollection(data)
    }
  }
  useEffect(() => {
    getCollection()
  }, [])
  console.log('collection', collection)

  let postCommentId
  const deletePost = () => {
    let postCollectionId = { postCommentId }
    console.log(postCommentId)

    Swal.fire({
      title: '確定移除收藏嗎？',
      text: '你將無法恢復它！',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#79cee2',
      cancelButtonColor: '#F9A451',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then(willDelete => {
      if (willDelete.value) {
        Swal.fire('刪除移除!', '成功移除收藏', 'success')

        delCommentDataFromServer(postCollectionId)

        // console.log('propsId:', props.memberID)
        async function delCommentDataFromServer() {
          // 注意資料格式要設定，伺服器才知道是json格式
          const request = new Request(
            'http://localhost:6001/posts/delpostCollection',
            {
              method: 'POST',
              body: JSON.stringify(postCollectionId),
              headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }),
            }
          )
          // console.log(JSON.stringify(commentId))
          const response = await fetch(request)
          const data = await response.json()
          setTimeout(() => {
            window.location.reload()
          }, 1000)
          // window.location.href = `/Communityprofile/${props.memberID}`
        }
      } else if (willDelete.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('取消', '你成功保留此貼文', 'error')
      }
    })
  }
  return (
    <div className="d-flex flex-wrap">
      {collection.map((v, i) => {
        console.log('post', i.postCollection_id)
        return (
          <div className="" key={i}>
            <figure
              className="C-profilePostFigure"
              onClick={() => {
                window.location.href = `/postDetailProfile/${v.post_id}`
              }}
            >
              <>
                <img
                  src={`http://localhost:6001/img/${v.postImg}`}
                  style={{ width: '100%' }}
                />
              </>
            </figure>
            <div
              style={{
                fontSize: '16px',
                cursor: 'pointer',
              }}
              onClick={() => {
                postCommentId = v.postCollection_id

                deletePost()
              }}
            >
              <AiFillStar
                style={{
                  width: '40px',
                  fontSize: '26px',
                  color: '#f9a451',

                  marginLeft: '280px',
                }}
              />
              移除收藏
            </div>
          </div>
        )
      })}
    </div>
  )
}

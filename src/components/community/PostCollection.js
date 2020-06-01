import React, { useState, useEffect } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export default function PostCollection(props) {
  // console.log('props', props)
  const [collection, setCollection] = useState(false)
  const [collected, setCollected] = useState(false)

  const getpostCollection = () => {
    // console.log(props)
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

      // callback()
      if (data) {
        for (let i = 0; i < data.length; i++) {
          console.log('1', props)
          console.log('2', data[i].member_id, data[i].post_id)
          if (
            data[i].member_id == props.loginMemberId &&
            data[i].post_id == props.postId
          ) {
            setCollected(true)
          }
        }
      }
    }
  }

  useEffect(() => {
    getpostCollection()
  }, [])

  const handlepostCollection = () => {
    console.log(props)
    // 注意資料格式要設定，伺服器才知道是json格式
    postCollection(props, setCollection(true))
    async function postCollection() {
      // 注意資料格式要設定，伺服器才知道是json格式
      const request = new Request(
        'http://localhost:6001/posts/postCollection',
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
      console.log('from collection :', data)
      // callback()
    }
  }
  return (
    <div
      style={{ position: 'relative' }}
      onClick={() => {
        handlepostCollection()
      }}
    >
      {collection ? (
        <AiFillStar style={{ fontSize: '28px', marginRight: '10px' }} />
      ) : (
        <AiOutlineStar style={{ fontSize: '28px', marginRight: '10px' }} />
      )}
      <AiFillStar
        className={`C-postCollectionStar ${collected ? 'active' : ''}`}
      />
    </div>
  )
}

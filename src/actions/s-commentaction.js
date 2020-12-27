export const userLeftMessage = userData => ({
  type: 'LEAVE_MESSAGE',
  data: userData,
})

//發表留言function
export const userCommentAsync = (userCommentContent, callback) => {
  return async dispatch => {
    const request = new Request(
      `http://localhost:6001/product/comment/${userCommentContent.itemId}`,
      {
        method: 'POST',
        body: JSON.stringify(userCommentContent),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )

    // console.log(JSON.stringify(userCommentContent))

    const response = await fetch(request)
    const data = await response.json()
    // console.log('res data', data)

    dispatch(userLeftMessage(data))
    callback()
  }
}

export const getOldComment = commentData => ({
  type: 'GET_COMMENT',
  data: commentData,
})
//getOldCommentAsync2()沒用到
export const getOldCommentAsync2 = (productId, callback) => {
  return async dispatch => {
    const request = new Request(
      'http://localhost:5555/comments/?itemId=' + productId,
      {
        method: 'GET',

        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )

    //   console.log(JSON.stringify(userData))

    const response = await fetch(request)
    const data = await response.json()
    console.log('res data', data)

    //   dispatch(getOldComment(data))
    //   callback()
    //   if (data.length > 0) {
    //     console.log('data')
    //   }
  }
}
export async function getOldCommentAsync(productId) {
  const request = new Request(
    'http://localhost:5555/comments/?itemId=' + productId,
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
  return data
  //   setCommentData(data)
}

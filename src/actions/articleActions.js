//文章
export const showArticle = data => {
  return { type: 'SHOW_ARTICLE', data }
}

//留言
export const showComment = data => {
  return { type: 'SHOW_COMMENT', data }
}

//講座
//   export const showPartner = data => {
//     return { type: 'SHOW_Partner', data }
//   }

//要資料--文章
export const getArticleData = () => {
  return async dispatch => {
    const req = new Request('http://localhost:6001/articles', {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('文章列表', data)
    dispatch(showArticle(data))
  }
}

//表單資訊
// const articleInfo = {
//   mbId: mbId,
//   articleName: '',
//   articleCategoryId: '',
//   articleClassId: '',
//   articleContent: '',
// }

//寫入文章資訊

//要資料--留言
export const getCommentData = () => {
  return async dispatch => {
    const req = new Request('http://localhost:6001/article_comments', {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('文章列表', data)
    dispatch(showComment(data))
  }
}

//跟server要文章種類
// export const getArticleCategory = aCategory => {
//   console.log(aCategory)
//   return async dispatch => {
//     const req = new Request(
//       `http://localhost:6001/articles/articleCategoryId?aCategory=${aCategory}}`,
//       {
//         method: 'GET',
//         credentials: 'include',
//       }
//     )
//     const res = await fetch(req)
//     const data = await res.json()
//     dispatch(showArticle(data))
//   }
// }

//跟server要文章細節
// export const showArticleDetail = data => {
//   return { type: 'SHOW_ARTICLE_DETAIL', data }
// }
// export const getArticleDetail = articleId => {
//   return async dispatch => {
//     const req = new Request(`http://localhost:6001/articles/${articleId}`, {
//       method: 'GET',
//       credentials: 'include',
//     })
//     const res = await fetch(req)
//     const data = await res.json()
//     console.log('detail', data)
//     dispatch(showArticleDetail(data))
//   }
// }

//要資料--留言
//   export const getCommentData = () => {
//     return async dispatch => {
//       const req = new Request('http://localhost:6001/forum/article', {
//         method: 'GET',
//         credentials: 'include',
//       })
//       const res = await fetch(req)
//       const data = await res.json()
//       dispatch(showComment(data.article))
//     }
//   }

//要資料--Partner
//   export const getPartnerData = () => {
//     return async dispatch => {
//       const req = new Request('http://localhost:6001/partner', {
//         method: 'GET',
//         credentials: 'include',
//       })
//       const res = await fetch(req)
//       const data = await res.json()
//       dispatch(showPartner(data.partner))
//     }
//   }

// export const fileState = value =>({ type: 'FILE_STATE', value: value })

// export const inlineEditorState = value => ({ type: 'INLINE_EDITOR_STATE', value: value})
// export const blockEditorState = value => ({ type: 'BLOCK_EDITOR_STATE', value: value })
// export const mediaEditorState = value => ({ type: 'MEDIA_EDITOR_STATE', value: value })

// export const uploadImg = value =>{
//     return async dispatch =>{
//         const formdata = new FormData(imgFormRef.current)
//         formdata.append('foldername', foldername)

//         const response = await fetch('http://localhost:5500/stories/api/editor-imgs',{
//             method: 'POST',
//             body: formdata,
//         })

//         const data = await response.json()
//         console.log(data);

//         for(let i = 0 ; i < data.url.length ; i++){
//             await console.log(data.url[i])
//             await renderMedia(data.url[i])
//         }

//         dispatch(fileState(data.foldername))
//     }
// }

// export const renderMedia = value =>{

// }

// export const submitStory = value =>{
//     return async dispatch =>{
//         const contentState = await editorState.getCurrentContent()

//         const response = await fetch('http://localhost:5500/stories/submit-editor', {
//             method: 'post',
//             body: JSON.stringify({
//                 content: convertToRaw(contentState)
//             }),
//             headers: new Headers({
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             })
//         })
//         const data = await response.json()
//         await console.log(data)
//     }
// }

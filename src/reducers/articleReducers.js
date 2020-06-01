import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { combineReducers } from 'redux'

export const getArticleData = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_ARTICLE':
      console.log('reducer', action.data)
      return action.data
    default:
      return state
  }
}

//文章細節
export const getArticleDetail = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_ARTICLE_DETAIL':
      console.log('reducer', action.data)
      return action.data
    default:
      return state
  }
}

//全部留言
export const getCommentData = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_COMMENT':
      console.log('reducer', action.data)
      return action.data
    default:
      return state
  }
}

// const getBlogArticle = (state = [], action) => {
//   switch (action.type) {
//     case 'SHOW_BLOG_ARTICLE':
//       return action.data
//     default:
//       return state
//   }
// }

// export const editor = (state = { editorState: EditorState.createEmpty()} , action) =>{
//     switch(action.type){
//         case 'INLINE_EDITOR_STATE':
//             return { ...state, editorState : RichUtils.toggleInlineStyle(action.editorState, action.style) }
//         case 'BLOCK_EDITOR_STATE':
//             return { ...state, editorState : RichUtils.toggleBlockType(editorState, block) }
//         case 'MEDIA_EDITOR_STATE':
//             const contentState = editorState.getCurrentContent()
//             const contentStateWithEntity = contentState.createEntity(
//                 'image',
//                 'IMMUTABLE',
//                 {src: urlValue} //entity data
//             )
//             const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
//             const newEditorState = EditorState.set(
//                 editorState,
//                 {currentContent: contentStateWithEntity}
//             )
//             return { editorState :  AtomicBlockUtils.insertAtomicBlock(
//                 newEditorState,
//                 entityKey,
//                 ' '
//             )}
//     }
// }

// const editorFile = (state = '', action)=>{
//     switch(action.type){
//         case 'FILE_ON_CHANGE':
//             return action.value
//     }
// }

// const articleReducers = combineReducers({
//   getArticleData,
// })

export default getArticleData
// getArticleDetail,

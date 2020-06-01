import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'

import {
  Container,
  Row,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Form,
} from 'react-bootstrap'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
//檔案上傳套件
import { useDropzone } from 'react-dropzone'
import { AiOutlinePicture } from 'react-icons/ai'

import Swal from 'sweetalert2'
import '../../css/forum.scss'

//表單資訊

//圖檔上傳設定
// const thumbsContainer = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   top: 0,
//   left: '40px',
// }
// const thumb = {
//   display: 'inline-flex',
//   borderRadius: 2,
//   border: '1px solid #eaeaea',
//   marginBottom: 8,
//   marginRight: 8,
//   width: 600,
//   height: 400,
//   padding: 4,
//   boxSizing: 'border-box',
// }
// const thumbInner = {
//   display: 'flex',
//   minWidth: 0,
//   overflow: 'hidden',
// }
// const img = {
//   display: 'block',
//   width: 'auto',
//   height: '100%',
// }

function ArticlePost(props) {
  const history = useHistory()
  const [loginStatus, setLoginStatus] = useState(false)
  const [mbId, setmbId] = useState('')

  // console.log('ID', mbId)

  // 進入即判斷localStorage裡面的登入Data(沒有表示尚未登入或已經登出)
  // 為避免被使用者以輸入網址的方式跳轉過來
  useEffect(() => {
    if (localStorage.getItem('LoginUserData')) {
      const localUserData = JSON.parse(localStorage.getItem('LoginUserData'))
      setmbId(localUserData.mbId)
      // console.log('ID', mbId)

      // setMinDate(rightNow)
      setLoginStatus(true)
      // console.log('OK')
    } else {
      setLoginStatus(false)
      // console.log('NO')
      Swal.fire({ title: '請先登入喲！', icon: 'warning' }).then(function(r) {
        history.push('/forum')
      })
    }
  }, [])

  // const test = () => {
  //   const localdata = JSON.parse(localStorage.getItem('LoginUserData'))
  //   const mbId = localdata.mbId
  //   setcopymbid(mbId)
  // }
  // console.log('copymbid的值' + copymbid)

  const articleInfo = {
    mbId: mbId,
    articleName: '',
    articleCategoryId: '',
    articleClassId: '',
    articleContent: '',
  }
  // console.log('info', articleInfo)

  //寫入文章資訊
  function articleFormInfo(e, info) {
    switch (info) {
      case 'articleName':
        articleInfo.articleName = e.currentTarget.value
        break
      case 'articleCategoryId':
        articleInfo.articleCategoryId = e.currentTarget.value
        break
      case 'articleClassId':
        articleInfo.articleClassId = e.currentTarget.value
        break
      // case 'articleContent':
      //   articleInfo.articleContent = e.currentTarget.value
      //   break
      default:
        break
    }
  }

  //建立文章
  async function postArticle() {
    const req = new Request('http://localhost:6001/articles/articlepost', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(articleInfo),
    })

    const res = await fetch(req)
    const order = await res.json()
    // console.log('order', order)
    if (order.result.affectedRows == 1) {
      Swal.fire({
        // icon: 'success',
        title: '留言成功',
        timer: 1500,
      })
    }
  }

  //文章類型, 主題類型, 文章標題, 文章內容, 文章圖檔
  // const [articleCategory, setArticleCategory] = useState('')
  // const [articleClass, setArticleClass] = useState('')
  // const [articleName, setArticleName] = useState('')
  // const [articleContent, setArticleContent] = useState('')
  // const [articleImage, setArticleImage] = useState('')
  // const [files, setFiles] = useState([])

  //圖檔上傳設定
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: 'image/*',
  //   onDrop: acceptedFiles => {
  //     setFiles()
  //     acceptedFiles.map(file =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     )
  //   },
  // })
  // const thumbs = files.map(file => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <img src={file.preview} style={img} alt="uploadpic" />
  //     </div>
  //   </div>
  // ))

  // useEffect(
  //   () => () => {
  //     files.forEach(file => URL.revokeObjectURL(file.preview))
  //   },
  //   [files]
  // )

  // const addNewArticle = () => {
  //   const addNewPost = {
  //     articleCategory,
  //     articleClass,
  //     articleName,
  //     articleContent,
  //     articleImage,
  //   }
  //   sendNewArticleDataToServer(addNewPost, redirect)
  // }

  // async function sendNewArticleDataToServer(addNewPost, callback) {
  //   const request = new Request(`http://localhost:6001/articles`, {
  //     method: 'POST',
  //     body: JSON.stringify(addNewPost),
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  //   console.log('addNewPost', JSON.stringify(addNewPost))

  //   const response = await fetch(request)
  //   const data = await response.json()
  //   console.log(data)
  //   callback()
  // }

  // function redirect() {
  //   history.goBack()
  // }

  const show = (
    <>
      {' '}
      {/* <h1>這裡的值是{copymbid}</h1> */}
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="f-gap-2"></div>
            <div class="forum-form">
              <Form action="">
                <div class="row">
                  <div class="col-12">
                    <div class="d-flex f-post-category">
                      <label>文章類型：</label>
                      <Form.Control
                        as="select"
                        className="f-post-dropdown"
                        // title="選擇文章類型"
                        // placeholder="選擇文章類型"
                        name="articleCategoryId"
                        // id="articleCategory"
                        required
                        onChange={e => articleFormInfo(e, 'articleCategoryId')}
                      >
                        <option>選擇文章類型</option>
                        <option value="1">技術研討</option>
                        <option value="2">原畫創作</option>
                        <option value="3">廠商徵才</option>
                      </Form.Control>
                    </div>

                    <div class="f-gap"></div>
                    <div class="d-flex f-post-category">
                      <label>主題類型：</label>
                      <Form.Group>
                        <Form.Control
                          as="select"
                          className="f-post-dropdown"
                          // title="選擇主題類型"
                          name="articleClassId"
                          // id="articleClass"
                          required
                          onChange={e => articleFormInfo(e, 'articleClassId')}
                        >
                          <option value="">選擇主題類型</option>
                          <option value="1">技術分享</option>
                          <option value="2">問題求解</option>
                          <option value="3">聯合創作</option>
                          <option value="4">情報分享</option>
                          <option value="5">輕鬆閒聊</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                    <div class="f-gap"></div>
                  </div>

                  <div class="f-gap-3"></div>
                  <div class="col-12">
                    <div class="single-input mb-50 mb-sm-30 mb-xs-20">
                      <label>標題：</label>
                      <input
                        type="text"
                        placeholder="Enter topic title here"
                        name="articleName"
                        id="articleName"
                        required
                        onChange={e => articleFormInfo(e, 'articleName')}
                      />
                    </div>
                  </div>

                  <div class="f-gap-2"></div>
                  <div class="col-12">
                    <div class="single-input mb-50 mb-sm-30 mb-xs-20">
                      <label>文章內容：</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onInit={editor => {
                          // You can store the "editor" and use when it is needed.
                          // console.log('Editor is ready to use!', editor)
                        }}
                        name="articleContent"
                        id="articleContent"
                        required
                        // onChange={e => setArticleContent(e.target.value)}
                        onChange={(e, editor) => {
                          const data = editor.getData()
                          articleInfo.articleContent = editor.getData()
                          // onChange={(event, editor) => {
                          //   const data = editor.getData()
                          // console.log({ event, editor, data })
                        }}
                        onBlur={(event, editor) => {
                          // console.log('Blur.', editor)
                        }}
                        onFocus={(event, editor) => {
                          // console.log('Focus.', editor)
                        }}
                      />
                    </div>
                  </div>

                  {/* <Col md={8} className="text-center f-post-image-zone">
                    <section
                      className="aUplodePic position-relative"
                      name="aKV"
                    >
                      <div
                        style={{ width: '500px' }}
                        {...getRootProps({ className: 'dropzone' })}
                      >
                        <input
                          style={{}}
                          {...getInputProps()}
                          placeholder="Username"
                          required
                        />
                        <p>
                          <AiOutlinePicture
                            style={{
                              display: 'flex',
                              margin: 'auto',
                              fontSize: '50px',
                            }}
                          />
                          －－新增圖片檔案，點擊或拖曳圖片至此－－
                        </p>
                        <aside
                          className="position-absolute"
                          style={thumbsContainer}
                        >
                          {thumbs}
                        </aside>
                      </div>
                    </section>
                  </Col> */}

                  <div class="f-gap-3"></div>
                  <div class="col-12 f-article-post-btn ">
                    <button
                      class="f-index-btn f-index-btn-rounded f-index-btn-color"
                      onClick={postArticle}
                      // onSubmit={postArticle}
                    >
                      發文
                    </button>
                    {/* <button class="f-index-btn f-index-btn-rounded f-index-btn-color">留言</button> */}
                  </div>
                  <div class="f-gap-3"></div>

                  {/* <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                        <i className="fas fa-pencil-alt prefix"></i>
                                        </span>
                                    </div>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                                </div> */}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  // const plslogin = (
  //   <article className="content container">
  //     <Row className="justify-content-center">
  //       <h1>！！！不要走後門！！！</h1>
  //     </Row>
  //   </article>
  // )

  return <>{loginStatus ? show : ''}</>
}

export default ArticlePost

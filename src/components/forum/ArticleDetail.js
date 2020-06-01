import React, { useState, useEffect } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getArticleData } from '../../actions/articleActions'
// import { NavLink } from 'react-bootstrap'
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineGoogle,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ArticleTag from '../../components/forum/ArticleTag'
import '../../css/forum.scss'

function ArticleDetail(props) {
  // console.log('細節2', props.location.pathname)
  // console.log('component內容', props.data)

  const [article, setArticle] = useState([])
  const [comment, setComment] = useState([])
  const [tagName, setTagname] = useState('')
  // const articleId = props.match.params.articleId
  //   ? props.match.params.articleId
  //   : ''

  async function getDetailFromServer() {
    const request = await fetch(
      'http://localhost:6001/articles' + props.location.pathname
    )
    const data = await request.json()
    // console.log('文章細節data', data.articleId)

    setArticle(data)
  }

  // console.log('article', article)
  useEffect(() => {
    // console.log('文章2')
    getDetailFromServer()
  }, [])

  // var oldDiv = '<div id="articleContent></div>'
  // var htmlObject = document.createElement('div')
  // document.getElementById('articleContent').innerHTML = articleContent
  // htmlObject.innerHTML = oldDiv
  // document.body.appendChild(htmlObject)

  // console.log('props', props)
  return (
    <>
      <div class="f-hot-post-text mt-0">
        <div class="f-single-post-img">
          <a>
            <img
              src={`../../images/forum/article${article.articleId}.jpg`}
              alt=""
            />
          </a>
        </div>

        <div class="f-gap-1"></div>
        <h1 class="f-hot-post-title h4 f-detail-name">{article.articleName}</h1>
        <div class="f-gap"></div>
        <div class="f-hot-post-by">
          <img src={article.mbAva} alt="" class="rounded-circle" width="35" />{' '}
          by <a href="#">{article.mbNick}</a> in {article.updated_at}
          <span class=" f-hot-post-category">
            {/* {props.article &&
              props.article.map((value, index) => {
                  if (props.articleId.articleCategoryId === tagName) {
                    return (
                      <ArticleTag
                        key={index}
                        data={props.articleId}
                        tagName={tagName}
                      />
                    )
                  }
                }
              }   */}
            {/* <span class="f-index-bg-5">程式設計</span>
            <span class="f-index-bg-6">原畫創作</span> */}
            <span className="f-detail-tag">
              <ArticleTag tagName={article.articleCategoryId} />
            </span>
            <span>
              <AiOutlineEdit />
            </span>
            <span>
              <AiOutlineDelete />
            </span>
          </span>
        </div>

        <div class="f-gap-1"></div>
        <div
          class="f-single-article-content"
          id="articleContent"
          dangerouslySetInnerHTML={{ __html: article.articleContent }}
        >
          {/* {props.article &&
  props.article.map((value, index) => {
    return <div key={index} data={props.data.articleContent} />
  })} */}
        </div>
        <img
          class="float-left mt-0"
          src={`./images/forum/article${article.articleId}.jpg`}
          // src="./images/forum/post-inner-img.jpg"
          alt=""
        />

        <div class="f-gap-1"></div>
        <div class="f-post-share justify-content-between">
          <span class="">Share Article:</span>
          <div class="d-flex f-post-share-icon">
            <AiOutlineGoogle />
            <AiOutlineFacebook />
            <AiOutlineTwitter />
            <AiOutlineLinkedin />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ArticleDetail)

import React, { useState, useEffect } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getArticleData } from '../../actions/articleActions'
// import { NavLink } from 'react-bootstrap'

import ArticleTag from '../../components/forum/ArticleTag'
import '../../css/forum.scss'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

function ArticleRelative(props) {
  // console.log('component內容', props)

  const [article, setArticle] = useState([])
  const [tagName, setTagname] = useState('')
  const articleId = props.match.params.articleId
    ? props.match.params.articleId
    : ''
  // console.log('相關文章ID', articleId)

  async function getDetailFromServer(articleId) {
    const request = new Request(
      'http://localhost:6001/articles/article/' + articleId,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const response = await fetch(request)
    const data = await response.json()
    // console.log('相關文章1', data)
    setArticle(data)
  }

  useEffect(() => {
    // console.log('文章2', props)
    getDetailFromServer(articleId)
  }, [])

  //   const relativeId = articleId + 1
  //   const relativeArticle = article.relativeId

  // console.log('內容2', article)
  return (
    <>
      {/* 相關文章 */}
      <div class="f-gap-3"></div>
      <h3 class="f-latest-title">
        <span>
          <span class="f-category-text-1">相關</span> 文章
        </span>
      </h3>

      <div class="f-gap"></div>
      <div class="row">
        <div class="col-md-4">
          <div class="f-hot-post">
            <a href="#" class="f-hot-post-img">
              <img
                src={`../../images/forum/article${article.articleId - 30}.jpg`}
                // src="./images/forum/post-3-mid.jpg"
                alt="We found a witch! May we burn her?"
              />
              <span class="f-hot-post-comments-count">7</span>
              <ArticleTag tagName={article.tagName} />
              {/* <span class="f-hot-post-category">
                <span class="f-index-bg-5">程式設計</span>
              </span> */}
            </a>

            <div class="f-gap"></div>
            <h2 class="f-relative-post-title h4">
              <p>【教學】PhotoShop－放射狀的速度感效果教學</p>
              {/* <a href="#">{article.articleName}</a> */}
              {/* <a href="#">We found a witch! May we burn her?</a> */}
            </h2>
          </div>
        </div>

        <div class="col-md-4">
          <div class="f-hot-post">
            <a href="#" class="f-hot-post-img">
              <img
                src={`../../images/forum/article${article.articleId - 40}.jpg`}
                // src="./images/forum/post-4-mid.jpg"
                alt="For good, too though, in consequence"
              />
              <span class="f-hot-post-comments-count">23</span>
              <ArticleTag tagName={article.tagName} />
              {/* <span class="f-hot-post-category">
                <span class="f-index-bg-6">原畫創作</span>
              </span> */}
            </a>

            <div class="f-gap"></div>
            <h2 class="f-relative-post-title h4">
              <a href="">問題】關於用Input.GetAxis做角色移動的奇妙問題</a>
              {/* <a href="#">{article.articleName}</a> */}
              {/* <a href="#">For good, too though, in consequence</a> */}
            </h2>
          </div>
        </div>

        <div class="col-md-4">
          <div class="f-hot-post">
            <a href="#" class="f-hot-post-img">
              <img
                src={`../../images/forum/article${article.articleId - 50}.jpg`}
                // src="./images/forum/post-3-mid.jpg"
                alt="We found a witch! May we burn her?"
              />
              <span class="f-hot-post-comments-count">13</span>
              <ArticleTag tagName={article.tagName} />
              {/* <span class="">
                <span class="f-index-bg-5">程式設計</span>
              </span> */}
            </a>

            <div class="f-gap"></div>
            <h2 class="f-relative-post-title h4">
              <a href="">【問題】Opencv c++庫 轉 so檔案置入問題</a>
              {/* <a href="#">{article.articleName}</a> */}
              {/* <a href="#">We found a witch! May we burn her?</a> */}
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ArticleRelative)

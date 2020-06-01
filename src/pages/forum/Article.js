import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getArticleDetail } from '../../actions/articleActions'
import ArticleDetail from '../../components/forum/ArticleDetail'
import ArticleComments from '../../components/forum/ArticleComments'
import ArticleRelative from '../../components/forum/ArticleRelative'
import { AiOutlineRight } from 'react-icons/ai'
import ArticleTag from '../../components/forum/ArticleTag'
import '../../css/forum.scss'
import $ from 'jquery'
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

function Article(props) {
  // console.log('細節1', props)

  const [article, setArticle] = useState([])
  const [tagName, setTagname] = useState('')
  const [comment, setComment] = useState([])
  const articleId = props.match.params.articleId
    ? props.match.params.articleId
    : ''
  let showCategory = ''
  if (article.articleCategoryId === '1') {
    showCategory = '程式設計'
  } else if (article.articleCategoryId === '2') {
    showCategory = '原畫創作'
  } else {
    showCategory = '廠商徵才'
  }
  // console.log('AC', article.articleCategoryId)
  // console.log('SC', showCategory)
  // console.log('ID', articleId)
  const Swal = require('sweetalert2')

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

  //留言
  // async function getCommentData() {
  //   const request = new Request('http://localhost:6001/article_comments/', {
  //     method: 'GET',
  //     credentials: 'include',
  //   })
  //   const response = await fetch(request)
  //   const data = await response.json()
  //   console.log('留言', data)
  //   setComment(data[0])
  // }

  // useEffect(() => {
  //   console.log('dddd', props)
  //   getCommentData()
  // }, [])

  // useEffect(() => {
  //   console.log('dddd', props)
  //   props.getCommentData()
  // }, [])

  // console.log('內容2', article)

  function post() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>',
    })
  }

  function changeTagName(newTagName) {
    setTagname(newTagName)
  }

  // async function getArticleData() {
  //   const request = new Request('http://localhost:3000/article/', {
  //     method: 'GET',
  //     credentials: 'include',
  //   })
  //   const response = await fetch(request)
  //   const data = await response.json()

  //   console.log(data)
  //   setArticle(data)
  // }

  return (
    <>
      <div class="container">
        <div class="f-gap-2"></div>
        <ul class="f-breadcrumbs">
          <li>
            <a href="/home">首頁</a>
          </li>
          <li>
            <AiOutlineRight />
          </li>
          <li>
            <a href="/forum">開發論壇</a>
          </li>
          <li>
            <AiOutlineRight />
          </li>
          <li>
            <a href="#">{showCategory}</a>
          </li>
          <li>
            <AiOutlineRight />
          </li>
          <li>
            <span>{article ? article.articleName : ''}</span>
          </li>
        </ul>

        <div class="f-gap-2"></div>

        {/* 文章內容 */}
        <div class="row f-vertical-gap">
          <div class="col-lg-12 f-article-detail-content">
            <div class="">
              <ArticleDetail />

              {/* {props.article &&
                props.article.map((value, index) => {
                  if (tagName) {
                    if (props.article[index].articleCategoryId === tagName) {
                      return (
                        <ArticleDetail
                          key={index}
                          data={props.article[index]}
                          tagName={tagName}
                        />
                      )
                    }
                  } else {
                    return (
                      <ArticleDetail
                        key={index}
                        data={props.article[index]}
                        tagName={props.article[index].articleCategoryId}
                      />
                    )
                  }
                })} */}

              {/* 留言內容 */}
              <ArticleComments />
              {/* <div class="f-gap-3"></div>
              <div id="comments"></div>
              <h3 class="f-latest-title">
                <span>
                  <span class="f-category-text">3則</span> 評論
                </span>
              </h3>

              <div class="f-gap"></div>
              <div class="f-comments">
                <div class="f-comment">
                  <div class="f-comment-meta">
                    <img
                      src="./images/forum/avatar-2.jpg"
                      alt="Witch Murder"
                      class="rounded-circle"
                      width="35"
                    />{' '}
                    by <a href="#">Witch Murder</a> in 20 September, 2018
                    <button
                      href="#"
                      class="f-index-btn f-index-btn-rounded f-index-btn-color float-right"
                    >
                      Reply
                    </button>
                  </div>
                  <div class="f-comment-text">
                    <p>
                      This sounded nonsense to Alice, so she said nothing, but
                      set off at once toward the Red Queen. To her surprise, she
                      lost sight of her in a moment, and found herself walking
                      in at the front-door again.
                    </p>
                  </div>

                  <div class="f-comment">
                    <div class="f-comment-meta">
                      <img
                        src="./images/forum/avatar-1.jpg"
                        alt="Hitman"
                        class="rounded-circle"
                        width="35"
                      />{' '}
                      by <a href="#">Hitman</a> in 20 September, 2018
                      <button
                        href="#"
                        class="f-index-btn f-index-btn-rounded f-index-btn-color float-right"
                      >
                        Reply
                      </button>
                    </div>
                    <div class="f-comment-text">
                      <p>
                        To her surprise, she lost sight of her in a moment, and
                        found herself walking in at the front-door again.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="f-comment">
                  <div class="f-comment-meta">
                    <img
                      src="./images/forum/avatar-3.jpg"
                      alt="Wolfenstein"
                      class="rounded-circle"
                      width="35"
                    />{' '}
                    by <a href="#">Wolfenstein</a> in 21 September, 2018
                    <button
                      href="#"
                      class="f-index-btn f-index-btn-rounded f-index-btn-color float-right"
                    >
                      Reply
                    </button>
                  </div>
                  <div class="f-comment-text">
                    <p>
                      The sight of the tumblers restored Bob Sawyer to a degree
                      of equanimity which he had not possessed since his
                      interview with his landlady. His face brightened up, and
                      he began to feel quite convivial.
                    </p>
                  </div>
                </div>
              </div> */}

              {/* 留言回應 */}
              {/* <div class="f-gap-3"></div>
              <h3 class="f-latest-title">
                <span>
                  <span class="f-category-text">留言</span> 回覆
                </span>
              </h3>

              <div class="f-gap"></div>
              <div class="f-reply">
                <form action="#" class="f-form" novalidate="novalidate">
                  <div class="row f-sm-gap f-vertical-gap">
                    <div class="col-md-4">
                      <input
                        type="email"
                        class="form-control required"
                        name="email"
                        placeholder="Email *"
                      />
                    </div>
                    <div class="col-md-4">
                      <input
                        type="text"
                        class="form-control required"
                        name="name"
                        placeholder="Name *"
                      />
                    </div>
                    <div class="col-md-4">
                      <input
                        type="text"
                        class="form-control"
                        name="name"
                        placeholder="Website"
                      />
                    </div>
                  </div>

                  <div class="f-gap-1"></div>
                  <textarea
                    class="form-control required"
                    name="message"
                    rows="5"
                    placeholder="Message *"
                    aria-required="true"
                  ></textarea>

                  <div class="f-gap-1"></div>
                  <div class="f-form-response-success"></div>
                  <div class="f-form-response-error"></div>
                  <button
                    onClick={() => post()}
                    class="f-index-btn f-index-btn-rounded f-index-btn-color"
                    id="post"
                  >
                    留言
                  </button>
                </form>
              </div> */}

              <ArticleRelative />
              {/* 相關文章
              <div class="f-gap-3"></div>
              <h3 class="f-latest-title">
                <span>
                  <span class="f-category-text">相關</span> 文章
                </span>
              </h3>

              <div class="f-gap"></div>
              <div class="row">
                <div class="col-md-4">
                  <div class="f-hot-post">
                    <a href="#" class="f-hot-post-img">
                      <img
                        src="./images/forum/post-3-mid.jpg"
                        alt="We found a witch! May we burn her?"
                      />
                      <span class="f-hot-post-comments-count">7</span>
                      <span class="f-hot-post-category">
                        <span class="f-index-bg-5">程式設計</span>
                      </span>
                    </a>

                    <div class="f-gap"></div>
                    <h2 class="f-hot-post-title h4">
                      <a href="#">We found a witch! May we burn her?</a>
                    </h2>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="f-hot-post">
                    <a href="#" class="f-hot-post-img">
                      <img
                        src="./images/forum/post-4-mid.jpg"
                        alt="For good, too though, in consequence"
                      />
                      <span class="f-hot-post-comments-count">23</span>
                      <span class="f-hot-post-category">
                        <span class="f-index-bg-6">原畫創作</span>
                      </span>
                    </a>

                    <div class="f-gap"></div>
                    <h2 class="f-hot-post-title h4">
                      <a href="#">For good, too though, in consequence</a>
                    </h2>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="f-hot-post">
                    <a href="#" class="f-hot-post-img">
                      <img
                        src="./images/forum/post-3-mid.jpg"
                        alt="We found a witch! May we burn her?"
                      />
                      <span class="f-hot-post-comments-count">13</span>
                      <span class="">
                        <span class="f-index-bg-5">程式設計</span>
                      </span>
                    </a>

                    <div class="f-gap"></div>
                    <h2 class="f-hot-post-title h4">
                      <a href="#">We found a witch! May we burn her?</a>
                    </h2>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const mapStateToProps = store => {
//   return { article: store.getArticleDetail }
// }
// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ getArticleDetail }, dispatch)
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article))

export default withRouter(Article)

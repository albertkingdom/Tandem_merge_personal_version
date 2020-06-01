import React, { useState, useEffect } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getArticleData } from '../../actions/articleActions'
// import { NavLink } from 'react-bootstrap'
import { AiOutlineUser, AiOutlineFile, AiOutlineMessage } from 'react-icons/ai'
import ArticleTag from '../../components/forum/ArticleTag'
import '../../css/forum.scss'

function ForumArticleListBox(props) {
  // const [articleData, setArticleData] = useState([])

  // const [search, setSearch] = useState('')
  // const [pageNum, setPagenum] = useState(1)
  // const [totalPages, setTotalPages] = useState(1)

  // function gotoPage(value) {
  //   setPagenum(value)
  // }

  // async function getArticleData() {
  //   let currentPage = pageNum
  //   const page = window.location.pathname.split('forum/')[1]
  //   if (page) {
  //     currentPage = page
  //   }
  //   const req = new Request(
  //     `http://localhost:6001/articles/${currentPage}?search=${search}`,
  //     {
  //       method: 'GET',
  //       headers: new Headers({
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       }),
  //     }
  //   )
  //   const res = await fetch(req)
  //   const data = await res.json()
  //   console.log(data)
  //   setArticleData(data.articles)
  //   setTotalPages(parseInt(data.totalPages))
  //   // setLatest(data.newBulletin)
  //   console.log(data.articles)
  // }
  // useEffect(() => {
  //   getArticleData()
  // }, [])
  // useEffect(() => {
  //   getArticleData()
  // }, [pageNum, search])

  // const arrPage = []
  // for (let i = 1; i <= totalPages; i++) {
  //   arrPage.push(i)
  // }
  // let page = arrPage.map((page, i) => (
  //   <Link onClick={() => gotoPage(page)} to={`/forum/${page}`}>
  //     <li>{page}</li>
  //   </Link>
  // ))
  return (
    <>
      <div class="f-hot-post">
        <div class="row f-vertical-gap">
          <div class="col-lg-3 col-md-5">
            <a href="" class="f-hot-post-img">
              <img
                src={`./images/forum/article${props.data.articleId}.jpg`}
                // src="./images/forum/post-7-mid-square.jpg"
                alt={props.data.articleName}
              />
              <ArticleTag tagName={props.tagName} />
            </a>
          </div>
          <div class="col-lg-9 col-md-7">
            <div>
              <div class="f-gap"></div>
              <h2 class="f-post-list-title h4">
                <Link to={'./article/' + props.data.articleId}>
                  {props.data.articleName}
                </Link>
              </h2>
              {/* <div class="f-gap"></div> */}
              <div class="f-hot-post-date mt-10 mb-10 d-flex">
                <AiOutlineUser />
                <a href="#">{props.data.mbNick}</a>
                <div class="f-gap-article-list"></div>
                <AiOutlineFile />
                <span>{props.data.created_at}</span>
                <div class="f-gap-article-list"></div>
                <AiOutlineMessage />
                <a href="#">12 comments</a>
              </div>
              <div class="f-gap"></div>
              <div class="f-hot-post-text">
                <p
                  dangerouslySetInnerHTML={{
                    __html: props.data.articleContent,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForumArticleListBox

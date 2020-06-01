import React, { useState, useEffect } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getArticleData } from '../../actions/articleActions'
// import { NavLink } from 'react-bootstrap'
import ForumLatestLeftBox from '../../components/forum/ForumLatestLeftBox'
import {
  AiOutlineGithub,
  AiOutlineHighlight,
  AiOutlineSolution,
  AiOutlineUser,
  AiOutlineFile,
  AiOutlineMessage,
  AiOutlineLeft,
  AiOutlineRight,
} from 'react-icons/ai'
import $ from 'jquery'
import '../../css/forum.scss'

function ForumLatestBox(props) {
  const [article, setArticle] = useState([])

  return (
    <>
      <div class="f-latest-left-box">
        <div class="f-latest-left-box-list">
          <div class="f-nano f-latest-scrollbar">
            <div class="f-nano-content" tabindex="0" style={{ right: '-17px' }}>
              {article &&
                article.map((value, index) => {
                  return (
                    <ForumLatestLeftBox key={index} data={article[index]} />
                  )
                })}
            </div>
            <div class="f-nano-pane">
              <div
                class="f-nano-slider"
                style={{ height: '272px', transform: 'translate(0px, 0px)' }}
              ></div>
            </div>
          </div>
        </div>

        {/* <div class="f-latest-left-box-list">
          <div class="f-nano f-latest-scrollbar">
            <div class="f-nano-content" tabindex="0" style={{ right: '-17px' }}>
              <div class="f-latest-left-box-article ">
                <div class="f-latest-left-box-article-img">
                  <img
                    src="./images/forum/post-1-sm.jpg"
                    alt="Smell magic in the air. Or maybe barbecue"
                  />
                </div>
                <img
                  src="./images/forum/post-1.jpg"
                  alt="Smell magic in the air. Or maybe barbecue"
                  class="f-latest-left-box-article-fullimg"
                />
                <h3 class="f-latest-left-box-article-title">
                  <span>{props.data.articleName}</span>
                </h3>
                <span class="f-latest-left-box-article-category">
                  <span class="f-index-bg-5">程式設計</span>
                </span>
                <div class="f-latest-left-box-article-text">
                  <p>{props.data.articleContent}</p>
                </div>
                <a href="#" class="f-latest-left-box-article-url">
                  Read More
                </a>
                <div class="d-flex f-latest-left-box-article-date">
                  <AiOutlineFile />
                  <p>{props.data.updated_at}</p>
                </div>
              </div>
            </div>
            <div class="f-nano-pane">
              <div
                class="f-nano-slider"
                style={{ height: '272px', transform: 'translate(0px, 0px)' }}
              ></div>
            </div>
          </div>
        </div> */}

        <div class=" f-latest-right-box-info">
          <div class="f-nano f-latest-scrollbar">
            <div class="f-nano-content" tabindex="0" style={{ right: '-17px' }}>
              <div class=" f-latest-left-box-article-image">
                <img
                  src="./images/forum/post-1.jpg"
                  alt="Smell magic in the air. Or maybe barbecue"
                />
                <span class=" f-latest-left-box-article-category">
                  <span class="f-index-bg-5">程式設計</span>
                </span>
              </div>
              <div class=" f-latest-right-box-article-title">
                <p>{props.data.articleName}</p>
              </div>
              <div class=" f-latest-right-box-article-text">
                <p>{props.data.articleContent}</p>
              </div>
              <div class="f-gap"></div>
              <div class="d-flex justify-content-between f-right-side">
                <Link
                  to={'./article/' + props.data.articleId}
                  class=" f-latest-left-box-article-more"
                >
                  Read More
                </Link>
                <div class="d-flex f-latest-right-box-article-date f-right-side-article">
                  <AiOutlineFile />
                  <span>{props.data.updated_at}</span>
                </div>
              </div>
            </div>
            <div class="f-nano-pane">
              <div
                class="f-nano-slider"
                style={{ height: '365px', transform: 'translate(0px, 0px)' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForumLatestBox

import React, { useState, useEffect } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getArticleData } from '../../actions/articleActions'
// import { NavLink } from 'react-bootstrap'
import { AiOutlineFile } from 'react-icons/ai'
import ArticleTag from '../../components/forum/ArticleTag'
import '../../css/forum.scss'

function ForumHotPostBox(props) {
  // console.log('ForumHotPostBox', props)
  return (
    <>
      <div class="col-md-6 col-lg-3">
        <div class="f-card">
          <div class="f-hot-post">
            <a href="#" class="f-hot-post-img">
              <img
                src={`../../images/forum/article${props.data.articleId}.jpg`}
                // src="./images/forum/post-5-mid.jpg"
                alt="He made his passenger captain of one"
              />
              <span class="f-hot-post-comments-count">
                {props.data.articleId}
              </span>
              <ArticleTag tagName={props.tagName} />
            </a>
            <div class="f-gap"></div>
            {/* <div class="f-hot-post-title f-index-h4"> */}
            <div class="f-hot-post-text f-index-h3">
              <p href="#">{props.data.articleName}</p>
            </div>
            {/* </div> */}
            <div class="f-hot-post-text">
              <p
                dangerouslySetInnerHTML={{
                  __html: props.data.articleContent,
                }}
              ></p>
              {/* <p>{props.data.articleContent}</p> */}
            </div>
            <div class="f-gap"></div>
            <div class="d-flex justify-content-between">
              <Link
                to={'./article/' + props.data.articleId}
                className="f-index-btn f-index-btn-rounded f-index-btn-color f-index-btn-hover"
              >
                Read More
              </Link>
              <div class="d-flex f-hot-post-date">
                <AiOutlineFile />
                {props.data.created_at}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ForumHotPostBox)

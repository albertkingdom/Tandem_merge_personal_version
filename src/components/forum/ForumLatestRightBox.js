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
import $ from 'jquery'
import '../../css/forum.scss'

function ForumLatestRightBox(props) {
  // console.log('right', props)

  $(function() {
    var len = 250 // 超過250個字以"..."取代
    $('.f-latest-right-box-article-text').each(function(i) {
      if ($(this).text().length > len) {
        $(this).attr('title', $(this).text())
        var text =
          $(this)
            .text()
            .substring(0, len - 1) + '...'
        $(this).text(text)
      }
    })
  })

  return (
    <>
      <div class=" f-latest-right-box-info">
        <div class="f-nano f-latest-scrollbar">
          <div class="f-nano-content" tabindex="0" style={{ right: '-17px' }}>
            <div class=" f-latest-left-box-article-image">
              <img
                src={`../../images/forum/article${props.data.articleId}.jpg`}
                // src="./images/forum/post-1.jpg"
                alt={props.data.articleName}
              />
              <ArticleTag tagName={props.data.articleCategoryId} />
              {/* <span class=" f-latest-left-box-article-category">
                <span class="f-index-bg-5">程式設計</span>
              </span> */}
            </div>
            <div class=" f-latest-right-box-article-title">
              <p>{props.data.articleName}</p>
            </div>
            <div
              class=" f-latest-right-box-article-text"
              dangerouslySetInnerHTML={{ __html: props.data.articleContent }}
            >
              {/* <p>{props.data.articleContent}</p> */}
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
                <span>{props.data.created_at}</span>
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
    </>
  )
}

export default withRouter(ForumLatestRightBox)

import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
// import { NavLink } from 'react-bootstrap'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  AiOutlineRight,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFile,
  AiOutlineGoogle,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
} from 'react-icons/ai'
import '../../css/forum.scss'

function ArticleTag(props) {
  return (
    <>
      {props.tagName === '1' && (
        <span class="f-latest-left-box-article-category">
          <span class="f-index-bg-5">程式設計</span>
        </span>
      )}

      {props.tagName === '2' && (
        <span class="f-latest-left-box-article-category">
          <span class="f-index-bg-6">原畫創作</span>
        </span>
      )}

      {props.tagName === '3' && (
        <span class="f-latest-left-box-article-category">
          <span class="f-index-bg-3">廠商徵才</span>
        </span>
      )}

      {props.articleCategoryId === '1' && (
        <span class="f-latest-left-box-article-category">
          <span class="f-index-bg-5">程式設計</span>
        </span>
      )}

      {props.articleCategoryId === '2' && (
        <span class="f-latest-left-box-article-category">
          <span class="f-index-bg-6">原畫創作</span>
        </span>
      )}

      {props.articleCategoryId === '3' && (
        <span class="f-latest-left-box-article-category">
          <span class="f-index-bg-3">廠商徵才</span>
        </span>
      )}
    </>
  )
}

export default withRouter(ArticleTag)

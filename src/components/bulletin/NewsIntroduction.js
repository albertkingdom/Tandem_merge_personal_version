import React from 'react'

import { NavLink } from 'react-router-dom'

import { AiOutlineClockCircle, AiOutlineFolderOpen } from 'react-icons/ai'
function NewsIntroduction(props) {
  console.log(props.ttt)
  let news = props.ttt ? props.ttt : ''
  let title = news.bTitle
  let content = news.bContent
  let img = news.bImg
  let date = news.bDate
  let vendor = news.vName
  let category = news.cName
  let url = news.sId === '' ? 'news/' + news.bId : 'sales/' + news.sId

  return (
    <>
      <div className="b_card_style news_introduction">
        <div className="intro_img">
          <img
            src={`data:image/png;base64,${img}`}
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="news card-body">
          <div className="news_index_title">
            <h3 className="card-title bh3">{title}</h3>
          </div>
          <div className="news_index_content">
            <p className="card-text ellipsis bp">{content}</p>
          </div>
          <div className="news_index_detail d-flex justify-content-between ">
            <div className="news_index_detail_icon_group d-flex justify-content-between">
              <NavLink to="#" className="vendor_name">
                {vendor}
              </NavLink>
              <div className="category_group d-flex">
                <AiOutlineFolderOpen className="icon" />
                <NavLink to="/bulletin/news">{category}</NavLink>
              </div>
              <div className="time_group d-flex">
                <AiOutlineClockCircle className="icon" />
                <p className=" d-flex bp">{date}</p>
              </div>
            </div>
            <NavLink to={`/${url}`} className="more_btn btn">
              詳細內容
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsIntroduction

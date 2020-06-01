import React from 'react'

import { NavLink } from 'react-router-dom'

import {
  AiOutlineClockCircle,
  AiOutlineFolderOpen,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineSearch,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
} from 'react-icons/ai'

function RelatedNews(props) {
  console.log(444, props.related)
  let news = props.related ? props.related : ''

  console.log(news)
  return (
    <>
      <NavLink to="/sales/S004" className="a">
        <li>
          <div className="related_img">
            <img
              src={`data:image/png;base64,${props.related.bImg}`}
              alt=""
              className="object-fit"
            />
          </div>
          <div className="related_content">
            <div className="related_time">
              <div className="time_group d-flex">
                <AiOutlineClockCircle className="icon" />
                <p>{props.related.bDate}</p>
              </div>
            </div>
            <div className="related_title">
              <h6 style={{ whiteSpace: 'pre-wrap' }} className="bh6">
                {props.related.bTitle}
              </h6>
            </div>
          </div>
        </li>
      </NavLink>
    </>
  )
}
export default RelatedNews

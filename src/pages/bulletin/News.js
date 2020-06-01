import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../../css/news.scss'
import RelatedNews from '../../components/bulletin/RelatedNews'
import { AiOutlineClockCircle, AiOutlineFolderOpen } from 'react-icons/ai'

function News(props) {
  const [bulletinDetailData, setBulletinDetailData] = useState([])
  const [relatedNews, setRelatedNews] = useState([])
  useEffect(() => {
    //fetch
    async function getBulletinData() {
      const req = new Request(
        `http://localhost:6001/bulletin${window.location.pathname}`,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }),
        }
      )

      const res = await fetch(req)
      const data = await res.json()
      console.log(data)
      setBulletinDetailData(data.newsContent)
      setRelatedNews(data.related)
    }

    getBulletinData()
  }, [])
  let news = bulletinDetailData[0] ? bulletinDetailData[0] : ''
  console.log(666, bulletinDetailData)

  return (
    <>
      <div className="wrapper">
        <div className="banner mb-4">
          <img
            className="object-fit"
            src={`data:image/png;base64,${
              news == '' ? '' : bulletinDetailData[0].bImg
            }`}
            alt=""
          />
        </div>
        <div className="container pagination_news">
          <div className="pagination_news_content position-relative">
            <h1 className=" py-3 pagination_news bh1">
              {news == '' ? '' : bulletinDetailData[0].bTitle}
            </h1>
            <div className="news_index_detail d-flex justify-content-between pt-2">
              <div className="news_index_detail_icon_group d-flex justify-content-between">
                <Link to="#" className="vendor_name">
                  {news == '' ? '' : bulletinDetailData[0].vName}
                </Link>
                <div className="category_group d-flex">
                  <AiOutlineFolderOpen className="icon" />
                  <Link to="/bulletin/news">新聞</Link>
                </div>
                <div className="time_group d-flex">
                  <AiOutlineClockCircle className="icon" />
                  <p>{news == '' ? '' : bulletinDetailData[0].bDate}</p>
                </div>
              </div>
            </div>
            <p className="py-5" style={{ whiteSpace: 'pre-wrap' }}>
              {news == '' ? '' : bulletinDetailData[0].bContent}
            </p>
            <Link to="/bulletin" className="position-absolute btn back_to_list">
              返回公告頁
            </Link>
          </div>
          <div className="related_news">
            <h2 className="bh2">相關新聞</h2>
            <ul className="d-flex justify-content-between">
              {relatedNews.map((v, i) => (
                <RelatedNews related={v} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default News

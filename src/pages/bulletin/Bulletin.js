import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import React, { useEffect, useState } from 'react'

import LatestNews from '../../components/bulletin/LatestNews'
import NewsIntroduction from '../../components/bulletin/NewsIntroduction'
import $ from 'jquery'
import Carousell from '../../components/bulletin/Carousell'

import '../../css/newsIndex.scss'

import {
  AiOutlineSearch,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
} from 'react-icons/ai'

function Bulletin(props) {
  const [bulletinData, setBulletinData] = useState([])

  const [search, setSearch] = useState('')
  const [pageNum, setPagenum] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [latest, setLatest] = useState([])

  function gotoPage(value) {
    setPagenum(value)
  }

  async function getBulletinData() {
    let currentPage = pageNum
    const page = window.location.pathname.split('bulletin/')[1]
    if (page) {
      currentPage = page
    }
    const req = new Request(
      `http://localhost:6001/bulletin/${currentPage}?search=${search}`,
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
    setBulletinData(data.bulletin)
    setTotalPages(parseInt(data.totalPages))
    setLatest(data.newBulletin)
    console.log(data.bulletin)
  }
  useEffect(() => {
    getBulletinData()
  }, [])
  useEffect(() => {
    getBulletinData()
  }, [pageNum, search])

  const arrPage = []
  for (let i = 1; i <= totalPages; i++) {
    arrPage.push(i)
  }
  let page = arrPage.map((page, i) => (
    <Link onClick={() => gotoPage(page)} to={`/bulletin/${page}`}>
      <li>{page}</li>
    </Link>
  ))

  function handleSearch(el) {
    if (el.charCode === 13) {
      setSearch(el.target.value)
    }
  }

  function handleSearchType(type) {
    setSearch(type)
  }

  return (
    <>
      <div className="container">
        <section className="carousell_wrapper d-flex justify-content-between">
          <Carousell />
        </section>
        <div className="category d-flex">
          <p className="category_title">分類:</p>
          <a onClick={() => handleSearchType('新聞')} className="btn ">
            新聞
          </a>
          <a onClick={() => handleSearchType('促銷')} className="btn ">
            促銷
          </a>
        </div>
        <div className="row d-flex justify-content-between ">
          <div className="col-md-7">
            <div
              className=" position-relative mobile_input"
              style={{ marginBottom: 80 + 'px' }}
            >
              <AiOutlineSearch className="icon_s position-absolute"></AiOutlineSearch>
              <input
                type="text"
                onKeyPress={handleSearch}
                placeholder="請輸入搜尋內容"
                className="form-control news_search"
              />
            </div>
            {bulletinData.map((v, i) => (
              <NewsIntroduction ttt={v} />
            ))}
          </div>
          <div className="col-md-5 ">
            <div className="input_icons position-relative">
              <AiOutlineSearch className="icon_s position-absolute"></AiOutlineSearch>
              <input
                type="text"
                onKeyPress={handleSearch}
                placeholder="請輸入搜尋內容"
                className="form-control news_search"
              />
            </div>
            <div className="latest_news">
              <h3 className="bh3">最新消息</h3>
              {latest.map((v, i) => (
                <LatestNews ttt={v} />
              ))}
            </div>
            <div className="category_section">
              <h3 className="bh3">分類</h3>
              <div className="news">
                <a onClick={() => handleSearchType('新聞')}>
                  <h5 className="bh5 ba">新聞公告(17)</h5>
                </a>
              </div>
              <div className="sales">
                <a onClick={() => handleSearchType('促銷')}>
                  <h5 className="bh5 ba">優惠公告(4)</h5>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="pagination">
          <ul className="d-flex">
            <li>
              <AiOutlineCaretLeft />
            </li>
            {page}
            <li>
              <AiOutlineCaretRight />
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Bulletin

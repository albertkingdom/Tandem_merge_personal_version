import React, { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import InfiniteScroll from '../../components/community/InfiniteScroll'

export default function IndexSearchBar(props) {
  const [categoryData, setCategoryData] = useState([])
  const [searchData, setSearchData] = useState('')
  let pCategory_id
  let categoryId
  const categorySearch = () => {
    // console.log(typeof pCategory_id)
    categoryId = { pCategory_id, searchData }
    console.log(categoryId)
    // console.log(typeof categoryId)

    getCategoryDataFromServer(categoryId)
    async function getCategoryDataFromServer() {
      // 注意資料格式要設定，伺服器才知道是json格式
      const request = new Request('http://localhost:6001/items/postCategory', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(categoryId),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const response = await fetch(request)
      const data = await response.json()
      // window.location.reload()
      // console.log(data)
      setCategoryData(data)
      // categoryData = data
    }
  }
  useEffect(() => {
    categorySearch(searchData)
  }, [searchData])

  // console.log('data', categoryData)
  // useEffect(() => props.getStateContentfromchild(categoryData), [categoryData])
  return (
    <>
      <div className="C-searchDiv position-relative">
        <figure>
          {/* <img src="/images/community/half.webm" /> */}
          <video width="100%" height="100%" loop autoPlay>
            <source
              src="https://steamcdn-a.akamaihd.net/steam/clusters/frontpage/a375be775725b50be0b15d5a/mp4_page_bg_tchinese.mp4?t=1585008340"
              type="video/mp4"
            />
          </video>
        </figure>
        <div className="C-searchButtonGroup">
          <div
            className="C-searchButton"
            // value="1"
            onClick={() => {
              pCategory_id = '1'
              categorySearch()
            }}
          >
            # 休閒
          </div>
          <div
            className="C-searchButton"
            onClick={() => {
              pCategory_id = '2'
              categorySearch()
            }}
          >
            # 冒險
          </div>
          <div
            className="C-searchButton"
            onClick={() => {
              pCategory_id = '3'
              categorySearch()
            }}
          >
            # 動作
          </div>
          <div
            className="C-searchButton"
            onClick={() => {
              pCategory_id = '4'
              categorySearch()
            }}
          >
            # 策略
          </div>
          <div
            className="C-searchButton"
            onClick={() => {
              pCategory_id = '5'
              categorySearch()
            }}
          >
            # 競速
          </div>
          <div
            className="C-searchButton"
            onClick={() => {
              pCategory_id = '6'
              categorySearch()
            }}
          >
            其他
          </div>
        </div>

        <div className="C-searchbarDiv">
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="C-searchBar"
              placeholder="搜尋"
              onChange={e => {
                setSearchData(e.target.value)
              }}
            />
            <AiOutlineSearch className="C-searchbarIcon" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {categoryData.length > 0 ? (
            categoryData.map(v => (
              <>
                <div
                  className="col-4 my-4"
                  key={v.post_id}
                  onClick={() =>
                    (window.location.href = `/postdetail/${v.post_id}`)
                  }
                >
                  <figure className="C-InfiniteLoadFigure" style={{}}>
                    <img
                      src={`http://localhost:6001/img/${v.postImg}`}
                      style={{
                        height: '100%',
                        width: '100%',
                        display: 'block',
                      }}
                    />
                  </figure>
                </div>
              </>
            ))
          ) : (
            <InfiniteScroll />
          )}
        </div>
      </div>
    </>
  )
}

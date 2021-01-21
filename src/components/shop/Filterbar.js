import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../../css/shop.scss'
import styles from './Filterbar.module.scss'
import { AiOutlineSearch } from 'react-icons/ai' //search_icon
import { FiFilter } from 'react-icons/fi'

function Filterbar({
  setMyproduct,
  setTotalpage,
  setVendor,
  setOrderBy,
  setPrice,
  sidebarListRWDshow,
  showSidebarListInRWD,
}) {
  const [search_query, setSearch_query] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      //如果和500ms前的Input內容一樣，表示使用者沒有再繼續打字，就送出request
      if (search_query === inputRef.current.value) {
        async function Search() {
          try {
            const request = new Request(
              'http://localhost:6001/product/?search=' + search_query,
              {
                method: 'GET',
                credentials: 'include',
              }
            )
            const response = await fetch(request)
            const data = await response.json()

            setMyproduct(data.rows)
            setTotalpage(data.totalPages)
          } catch (error) {
            console.log(error)
          }
        }
        Search()
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [search_query, inputRef])

  return (
    <>
      <div className="row d-flex justify-content-center my-2">
        <div className={`col-6 col-sm-6 col-lg-4 ${styles['s-filterbar']}`}>
          <input
            ref={inputRef}
            type="search"
            className={`form-control ${styles['s-filterbar-search']} pl-5`}
            aria-label="Text input with dropdown button"
            placeholder="search"
            name="search"
            value={search_query}
            onChange={event => setSearch_query(event.target.value)}
          />
          <Link className={styles['s-searchicon']} to="#">
            <AiOutlineSearch style={{ fontSize: '24px', marginTop: '10px' }} />
          </Link>
        </div>
        <div className="col-6 text-right d-sm-none">
          <button
            onClick={showSidebarListInRWD}
            className={styles.filterButton}
          >
            <FiFilter />
            篩選
          </button>
        </div>
        {/* <div className="col col-sm-6 col-lg-2 s-filterbar">
          <button
            className="btn btn-outline-secondary dropdown-toggle s-filterbar-btn"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            價格區間
          </button>
          <div
            className="dropdown-menu"
            onClick={e => {
              setPrice(e.target.value)
            }}
          >
            <option className="dropdown-item" value="<100">
              Under NT$100
            </option>
            <option className="dropdown-item" value="<500">
              Under NT$500
            </option>
            <option className="dropdown-item" value="<1000">
              Under NT$1000
            </option>
          </div>
        </div>
        <div className="col col-sm-6 col-lg-2 s-filterbar">
          <button
            className="btn btn-outline-secondary dropdown-toggle s-filterbar-btn"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            發行商
          </button>
          <div
            className="dropdown-menu"
            onClick={e => setVendor(e.target.value)}
          >
            <option className="dropdown-item" value="V001">
              美國藝電（ElectronicArts）
            </option>
            <option className="dropdown-item" value="V002">
              動視暴雪（Activision Blizzard）
            </option>
            <option className="dropdown-item" value="V003">
              2K Games
            </option>
            <option className="dropdown-item" value="V004">
              任天堂（NINTENDO）
            </option>
            <option className="dropdown-item" value="V005">
              索尼（SONY）
            </option>
            <option className="dropdown-item" value="V006">
              育碧（Ubisoft）
            </option>
            <option className="dropdown-item" value="V007">
              柯樂美（KONAMI）
            </option>
            <option className="dropdown-item" value="V008">
              卡普空（CAPCOM）
            </option>
            <option className="dropdown-item" value="V009">
              史克威爾艾尼克斯（SQUARE ENIX）
            </option>
            <option className="dropdown-item" value="V010">
              世嘉（SEGA）
            </option>
          </div>
        </div>

        <div className="col col-sm-6 col-lg-2 s-filterbar">
          <button
            className="btn btn-outline-secondary dropdown-toggle s-filterbar-btn"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            排序方式
          </button>
          <div
            className="dropdown-menu"
            onClick={e => setOrderBy(e.target.value)}
          >
            <option className="dropdown-item" value="itemName ASC">
              遊戲名稱
            </option>
            <option className="dropdown-item" value="itemPrice DESC">
              價錢高至低
            </option>
            <option className="dropdown-item" value="itemPrice ASC">
              價錢低至高
            </option>
            <option className="dropdown-item" value="itemDate ASC">
              推出時間最早
            </option>
            <option className="dropdown-item" value="itemDate DESC">
              推出時間最新
            </option>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default Filterbar

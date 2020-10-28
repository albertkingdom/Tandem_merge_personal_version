import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../../css/shop.scss'
import { AiOutlineSearch } from 'react-icons/ai' //search_icon

function Filterbar({
  setMyproduct,
  setTotalpage,
  setVendor,
  setOrderBy,
  setPrice,
}) {
  const [search_query, setSearch_query] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      //如果和500ms前的Input內容一樣，表示使用者沒有再繼續打字，就送出request
      if (search_query === inputRef.current.value) {
        async function Search() {
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
        <div className="col col-sm-6 col-lg-2 s-filterbar">
          <input
            ref={inputRef}
            type="search"
            className="form-control s-filterbar-search pl-4"
            aria-label="Text input with dropdown button"
            name="search"
            value={search_query}
            onChange={event => setSearch_query(event.target.value)}
          />
          <Link
            className="s-searchicon"
            to={`/productlist/?search=${search_query}`}
          >
            <AiOutlineSearch style={{ fontSize: '24px', marginTop: '10px' }} />
          </Link>
        </div>
        <div className="col col-sm-6 col-lg-2 s-filterbar">
          <button
            className="btn btn-outline-secondary dropdown-toggle s-filterbar-btn"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            價格區間
          </button>
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => {
                setPrice('<100')
              }}
            >
              Under NT$100
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => {
                setPrice('<500')
              }}
            >
              Under NT$500
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => {
                setPrice('<1000')
              }}
            >
              Under NT$1000
            </Link>
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
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V001')}
            >
              美國藝電（ElectronicArts）
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V002')}
            >
              動視暴雪（Activision Blizzard）
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V003')}
            >
              2K Games
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V004')}
            >
              任天堂（NINTENDO）
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V005')}
            >
              索尼（SONY）
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V006')}
            >
              育碧（Ubisoft）
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V007')}
            >
              柯樂美（KONAMI）
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V008')}
            >
              卡普空（CAPCOM）
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V009')}
            >
              史克威爾艾尼克斯（SQUARE ENIX）
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setVendor('V010')}
            >
              世嘉（SEGA）
            </Link>
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
          <div className="dropdown-menu">
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setOrderBy('itemName ASC')}
            >
              遊戲名稱
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setOrderBy('itemPrice DESC')}
            >
              價錢高至低
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setOrderBy('itemPrice ASC')}
            >
              價錢低至高
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setOrderBy('itemDate ASC')}
            >
              推出時間最早
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => setOrderBy('itemDate DESC')}
            >
              推出時間最新
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filterbar

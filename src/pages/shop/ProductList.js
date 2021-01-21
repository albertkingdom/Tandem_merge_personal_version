import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Slider from '../../components/shop/Slider/Slider'
import Filterbar from '../../components/shop/Filterbar'
import Pagination from '../../components/shop/Pagination'
import FilterDisplay from '../../components/shop/FilterDisplay'
import ProductListItem from '../../components/shop/ProductListItem'
// sidebar
import SidebarList from '../../components/shop/Sidebar/SidebarList'
import '../../css/shop.scss'
import useLoginStatus from '../../components/shop/customHook/useLoginStatus'
import { getAzenListfromStorage } from '../../actions/SazenActions'

function ProductList(props) {
  const { isLogin } = useLoginStatus() //custom hook
  const [productListArray, setProductListArray] = useState([])
  const [type, setType] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(1)
  const [vendor, setVendor] = useState('')
  const [price, setPrice] = useState('')
  const [orderBy, setOrderBy] = useState('')
  // const searchParams = new URLSearchParams(props.location.search)
  //sidebarList
  const [sidebarListRWDshow, setSidebarListRWDshow] = useState(false)

  const showSidebarListInRWD = () => {
    setSidebarListRWDshow(!sidebarListRWDshow)
  }
  useEffect(() => {
    //fetch database product撈所有資料(有分類)
    async function getClassifiedDataFromServer(page) {
      try {
        if (type !== 0 || vendor !== '' || price !== '' || orderBy !== '') {
          const response = await fetch('http://localhost:6001/product/search', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ type, vendor, price, orderBy, page }),
          })
          const data = await response.json()
          setProductListArray(data.rows)
          setTotalpage(data.totalPages)
        } else {
          const response = await fetch(
            `http://localhost:6001/product/list/${page}`
          )
          const data = await response.json()
          setProductListArray(data.rows)
          setTotalpage(data.totalPages)
        }
      } catch (error) {
        console.log(error)
      }

      // console.log(data.rows)
    }
    getClassifiedDataFromServer(currentpage)
  }, [currentpage, vendor, price, orderBy, type])

  //換頁function
  const paginate = value => {
    setCurrentpage(value)
  }
  //切換Type
  function handletype(value) {
    setType(value)
    setCurrentpage(1)
  }

  const reduxAzenStatus = useSelector(
    state => state.SuserAzen.isGetDataFromStorage
  )

  const dispatch = useDispatch()
  useEffect(() => {
    //確認redux內有無按讚清單
    if (isLogin && !reduxAzenStatus) {
      //if isGetDataFrom.. 是false，沒有從localstorage抓資料到redux
      dispatch(getAzenListfromStorage())
    }
  }, [dispatch, isLogin, reduxAzenStatus])
  const main = (
    <>
      <div className="row">
        {productListArray.map(value => (
          <ProductListItem key={value.itemId} value={value} isLogin={isLogin} />
        ))}
      </div>
    </>
  )

  return (
    <>
      <Slider handletype={handletype} />

      <div className="container-xl">
        {/* <FilterDisplay
          type={type}
          vendor={vendor}
          price={price}
          orderBy={orderBy}
          setType={setType}
          setVendor={setVendor}
          setPrice={setPrice}
          setOrderBy={setOrderBy}
        /> */}
        <Filterbar
          setMyproduct={setProductListArray}
          setTotalpage={setTotalpage}
          setVendor={setVendor}
          setPrice={setPrice}
          setOrderBy={setOrderBy}
          sidebarListRWDshow={sidebarListRWDshow}
          showSidebarListInRWD={showSidebarListInRWD}
        />
        <div className="d-flex flex-wrap">
          <div className="col-sm-3 col-12">
            <SidebarList
              vendor={vendor}
              price={price}
              orderBy={orderBy}
              setPrice={setPrice}
              setVendor={setVendor}
              setOrderBy={setOrderBy}
              showSidebarListInRWD={showSidebarListInRWD}
              sidebarListRWDshow={sidebarListRWDshow}
            />
          </div>
          <div className="col-sm-9 col-12">{main}</div>
        </div>
        <Pagination
          totalpage={totalpage}
          currentpage={currentpage}
          paginate={paginate}
        />
      </div>
    </>
  )
}
export default withRouter(ProductList)

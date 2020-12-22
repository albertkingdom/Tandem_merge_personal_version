import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Slider from '../../components/shop/Slider/Slider'
import Filterbar from '../../components/shop/Filterbar'
import Pagination from '../../components/shop/Pagination'
import FilterDisplay from '../../components/shop/FilterDisplay'
import ProductListItem from '../../components/shop/ProductListItem'
import '../../css/shop.scss'
import useLoginStatus from '../../components/shop/customHook/useLoginStatus'
import { getAzenListfromStorage } from '../../actions/SazenActions'

function ProductList(props) {
  const { isLogin } = useLoginStatus() //custom hook
  const [myproduct, setMyproduct] = useState([])
  const [type, setType] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(1)
  const [vendor, setVendor] = useState('V000')
  const [price, setPrice] = useState(9999)
  const [orderBy, setOrderBy] = useState('itemId')

  // const searchParams = new URLSearchParams(props.location.search)

  useEffect(() => {
    //fetch database product撈所有資料(有分類)
    async function getClassifiedDataFromServer(page) {
      let request = undefined
      try {
        if (type !== 0 || vendor !== 'V000' || price !== 9999) {
          request = new Request(
            'http://localhost:6001/product/search/' +
              type +
              '/' +
              vendor +
              '/' +
              price +
              '/' +
              orderBy +
              '/' +
              currentpage,
            {
              method: 'GET',
              credentials: 'include',
            }
          )
        } else {
          request = new Request('http://localhost:6001/product/list/' + page, {
            method: 'GET',
            credentials: 'include',
          })
        }
        const response = await fetch(request)
        const data = await response.json()

        setMyproduct(data.rows)
        setTotalpage(data.totalPages)
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
    if (isLogin) {
      if (!reduxAzenStatus) {
        //if isGetDataFrom.. 是false，沒有從localstorage抓資料到redux
        dispatch(getAzenListfromStorage())
      }
    }
  }, [dispatch, isLogin, reduxAzenStatus])
  const main = (
    <>
      <div className="row">
        {myproduct.map(value => (
          <ProductListItem key={value.itemId} value={value} isLogin={isLogin} />
        ))}
      </div>
    </>
  )

  return (
    <>
      <Slider handletype={handletype} />

      <div className="container">
        <FilterDisplay
          type={type}
          vendor={vendor}
          price={price}
          orderBy={orderBy}
          setType={setType}
          setVendor={setVendor}
          setPrice={setPrice}
          setOrderBy={setOrderBy}
        />
        <Filterbar
          setMyproduct={setMyproduct}
          setTotalpage={setTotalpage}
          setVendor={setVendor}
          setPrice={setPrice}
          setOrderBy={setOrderBy}
        />
        {main}
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

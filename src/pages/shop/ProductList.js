import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Slider from '../../components/shop/Slider/Slider'
import Filterbar from '../../components/shop/Filterbar'
import Pagination from '../../components/shop/Pagination'
import FilterDisplay from '../../components/shop/FilterDisplay'
import ProductListItem from '../../components/shop/ProductListItem'
import '../../css/shop.scss'
import useLoginStatus from '../../components/shop/customHook/useLoginStatus'

function ProductList(props) {
  const isLogin = useLoginStatus() //custom hook
  const [myproduct, setMyproduct] = useState([])
  const [type, setType] = useState(0)
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(1)
  const [vendor, setVendor] = useState('V000')
  const [price, setPrice] = useState(9999)
  const [orderBy, setOrderBy] = useState('itemId')
  const [mbAzen_arr_state, setMbAzen_arr_state] = useState([])

  // const searchParams = new URLSearchParams(props.location.search)

  useEffect(() => {
    //fetch database product撈所有資料(有分類)
    async function getClassifiedDataFromServer(page) {
      let request = undefined

      //新分頁方法
      if (type !== 0 || vendor !== 'V000' || price !== '') {
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

  useEffect(() => {
    //一開始複製一份LoginUserData的Azen，set到Local的Azen值、setMbAzen_arr_state
    const CopyAzenListToLocal = () => {
      if (isLogin) {
        if (localStorage.getItem('Azen') == null) {
          let mbAzen_str = JSON.parse(localStorage.getItem('LoginUserData'))
            .mbAzen
          mbAzen_str = mbAzen_str.replace('[', '').replace(']', '')
          let mbAzen_arr = mbAzen_str.split(',')
          // const currentLocalAzen = JSON.parse(localStorage.getItem('Azen')) || []
          localStorage.setItem('Azen', JSON.stringify(mbAzen_arr))
          setMbAzen_arr_state(mbAzen_arr)
        } else {
          const currentLocalAzen = JSON.parse(localStorage.getItem('Azen'))
          setMbAzen_arr_state(currentLocalAzen)
        }
      } else {
        localStorage.removeItem('Azen') //如果登出就刪掉localstorage Azen
      }
    }
    CopyAzenListToLocal()
  }, [isLogin])

  const setMemberAzenState = array => {
    setMbAzen_arr_state(array)
  }

  const main = (
    <>
      <div className="row">
        {myproduct.map(value => (
          <ProductListItem
            key={value.itemId}
            value={value}
            isLogin={isLogin}
            mbAzen_arr_state={mbAzen_arr_state}
            setMemberAzenState={setMemberAzenState}
          />
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

import React, { useState } from 'react'
import styles from './Sidebar.module.scss'
import Sidebar from './Sidebar'

const priceArray = [
  { name: '低於100', value: '<100' },
  { name: '低於500', value: '<500' },
  { name: '低於1000', value: '<1000' },
]
const vendorArray = [
  { name: '美國藝電(ElectronicArts)', value: 'V001' },
  { name: '動視暴雪(Activision Blizzard)', value: 'V002' },
  { name: '2K Games', value: 'V003' },
  { name: '任天堂(NINTENDO)', value: 'V004' },
  { name: '索尼(SONY)', value: 'V005' },
  { name: '育碧(Ubisoft)', value: 'V006' },
  { name: '柯樂美(KONAMI)', value: 'V007' },
  { name: '卡普空(CAPCOM)', value: 'V008' },
  { name: '史克威爾艾尼克斯(SQUARE ENIX)', value: 'V009' },
  { name: '世嘉(SEGA)', value: 'V010' },
]
const orderArray = [
  { name: '遊戲名稱', value: 'itemName ASC' },
  { name: '價錢高至低', value: 'itemPrice DESC' },
  { name: '價錢低至高', value: 'itemPrice ASC' },
  { name: '推出時間最早', value: 'itemDate ASC' },
  { name: '推出時間最新', value: 'itemDate DESC' },
]
const SidebarList = ({
  price,
  setPrice,
  vendor,
  setVendor,
  orderBy,
  setOrderBy,
  sidebarListRWDshow,
  showSidebarListInRWD,
}) => {
  // const [type, setType] = useState('')
  const selectPrice = value => {
    // setType(value)
    setPrice(value)
  }
  const selectVendor = value => {
    setVendor(value)
  }
  const selectOrderBy = value => {
    setOrderBy(value)
  }
  return (
    <>
      <div
        className={`${styles.SidebarList} ${
          sidebarListRWDshow ? styles.RWDshow : ''
        }`}
      >
        <Sidebar
          select={selectPrice}
          type={price}
          contentArray={priceArray}
          contentTitle="價格區間"
        />
        <Sidebar
          select={selectVendor}
          type={vendor}
          contentArray={vendorArray}
          contentTitle="發行商"
        />
        <Sidebar
          select={selectOrderBy}
          type={orderBy}
          contentArray={orderArray}
          contentTitle="排序方式"
        />
        {sidebarListRWDshow ? (
          <button
            className={styles.finishButton}
            onClick={showSidebarListInRWD}
          >
            完成
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
export default SidebarList

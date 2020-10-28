import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const FilterDisplay = ({
  price,
  vendor,
  type,
  orderBy,
  setPrice,
  setVendor,
  setType,
  setOrderBy,
}) => {
  //顯示排序方式
  let orderbydisplay
  switch (orderBy) {
    case 'itemName ASC':
      orderbydisplay = '遊戲名稱'
      break
    case 'itemPrice DESC':
      orderbydisplay = '價錢高至低'
      break
    case 'itemPrice ASC':
      orderbydisplay = '價錢低至高'
      break
    case 'itemDate ASC':
      orderbydisplay = '推出時間最早'
      break
    case 'itemDate DESC':
      orderbydisplay = '推出時間最新'
      break

    default:
  }
  //顯示發行商
  let vendordisplay
  switch (vendor) {
    case 'V001':
      vendordisplay = '美國藝電（ElectronicArts）'
      break
    case 'V002':
      vendordisplay = '動視暴雪（Activision Blizzard）'
      break
    case 'V003':
      vendordisplay = '2K Games'
      break
    case 'V004':
      vendordisplay = '任天堂（NINTENDO）'
      break
    case 'V005':
      vendordisplay = '索尼（SONY）'
      break
    case 'V006':
      vendordisplay = '育碧（Ubisoft）'
      break
    case 'V007':
      vendordisplay = '柯樂美（KONAMI）'
      break
    case 'V008':
      vendordisplay = '卡普空（CAPCOM）'
      break
    case 'V009':
      vendordisplay = '史克威爾艾尼克斯（SQUARE ENIX）'
      break
    case 'V010':
      vendordisplay = '世嘉（SEGA）'
      break
    default:
  }
  //顯示價格區間
  let pricedisplay
  switch (price) {
    case '<100':
      pricedisplay = '< NT$100'
      break
    case '<500':
      pricedisplay = '< NT$500'
      break
    case '<1000':
      pricedisplay = '< NT$1000'
      break

    default:
  }
  //顯示遊戲類型
  let typedisplay
  switch (type) {
    case 5:
      typedisplay = '運動'
      break
    case 1:
      typedisplay = '休閒'
      break
    case 3:
      typedisplay = '血腥'
      break
    case 4:
      typedisplay = '冒險'
      break
    case 2:
      typedisplay = '動作'
      break
    case 6:
      typedisplay = '競速'
      break

    default:
  }

  return (
    <>
      <div className="d-flex container">
        {type !== 0 ? (
          <div className="s-filterClearBtn">
            類型: {typedisplay}
            <button onClick={() => setType(0)}>
              <AiOutlineCloseCircle />
            </button>
          </div>
        ) : (
          ''
        )}
        {vendor !== 'V000' ? (
          <div className="s-filterClearBtn">
            發行商:{vendordisplay}
            <button onClick={() => setVendor('V000')}>
              <AiOutlineCloseCircle />
            </button>
          </div>
        ) : (
          ''
        )}
        {price !== 9999 ? (
          <div className="s-filterClearBtn">
            價格:{pricedisplay}
            <button onClick={() => setPrice(9999)}>
              <AiOutlineCloseCircle />
            </button>
          </div>
        ) : (
          ''
        )}
        {orderBy !== 'itemId' ? (
          <div className="s-filterClearBtn">
            排序:{orderbydisplay}
            <button onClick={() => setOrderBy('itemId')}>
              <AiOutlineCloseCircle />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default FilterDisplay

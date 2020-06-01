import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closemygamedetail } from '../../actions/Maction'

import { AiOutlineCloseCircle } from 'react-icons/ai'

// 此頁要進行整修，感應區處理

// TODO
// 點擊相片後取值丟store state寄存在細節頁的atg內，並turn on另一個state開啟細節卡fetch取得資料細節，關掉小卡走另外一個state

function McollectgameDetail(props) {
  const dispatch = useDispatch()
  const origetdetail = useSelector(state => state.Mmygamedetail)
  // 拿圖片相關訊息
  const digestdetail = origetdetail.fetchgameinfo
  // console.log(digestdetail)
  // const formattedDate = digestdetail.itemDate.split('T')[0]
  return (
    <>
      <div
        className="collectcarddetailWrapper"
        style={{ display: `${origetdetail.opendetail ? '' : 'none'}` }}
      >
        <div className="collectcarddetailLeft">
          <div className="collectcarddetailImg">
            <img
              src={`/images/shop/small_Img/${digestdetail.itemImg}`}
              alt=""
            />
          </div>
        </div>
        <div className="collectcarddetailRight">
          {/* 視窗取消按鈕 */}
          <div
            className="collectcarddetailCbtn"
            onClick={() => {
              dispatch(closemygamedetail())
              props.cancelbg()
            }}
          >
            <AiOutlineCloseCircle />
          </div>
          <h4>{digestdetail.itemName}</h4>
          <h6>發行日期 {digestdetail.itemDate}</h6>
          <p>{digestdetail.itemIntro}</p>
          <button className="M-collectcarddetailStart">開始遊玩</button>
        </div>
      </div>
    </>
  )
}

export default McollectgameDetail

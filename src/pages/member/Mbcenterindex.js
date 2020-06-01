import React from 'react'
//引入會員中心CSS樣式
import '../../css/Mb.css'
//會員中心左側介面
import MindexProfile from '../../components/member/MindexProfile'
//會員中心右側介面
//layer1
import MindexViewwall from '../../components/member/MindexViewwall'
import MindexcomCard from '../../components/member/MindexcomCard'
//layer2
import Mfriendlistcard from '../../components/member/Mfriendlistcard'
//layer3
import Mmygame from '../../components/member/Mmygame'

//layer4
import MazenpListcard from '../../components/member/MazenpListcard'
import MmyCoupon from '../../components/member/MmyCoupon'

//redux控制
// 引入store state
import { useSelector } from 'react-redux'

function Mbcenterindex() {
  // 控制顯示層
  const dispalyLayer = useSelector(state => state.MindexDisplaychange)
  // 正在處理的頁面
  // const dispalyLayer = 3
  return (
    <>
      <div className="M-indexWrapper">
        <div className="M-indexLeftContainer">
          <MindexProfile />
        </div>
        {/* 會員中心右側區域 */}
        <div className="M-indexRightContainer">
          {/* 第一層 首頁*/}
          <div
            className={`M-indexRightlayer1  ${
              dispalyLayer === 1 ? '' : 'layerDisappear'
            }`}
          >
            <h3 className="M-f-latest-title">
              <span>
                <span className="M-f-category-text">我的收藏</span>
              </span>
            </h3>
            {/* <h4>我的收藏</h4> */}
            <MindexViewwall />
            <h3 className="M-f-latest-title">
              <span>
                <span className="M-f-category-text">好友推文</span>
              </span>
            </h3>
            {/* <h4>好友推文</h4> */}
            <MindexcomCard />
          </div>
          {/* 第二層 好友管理*/}
          <div
            className={`M-indexRightlayer2  ${
              dispalyLayer === 2 ? '' : 'layerDisappear'
            }`}
          >
            <h3 className="M-f-latest-title">
              <span>
                <span className="M-f-category-text">好友管理</span>
              </span>
            </h3>
            {/* <h4>好友管理</h4> */}
            <Mfriendlistcard />
          </div>
          {/* 第三層 遊戲倉庫*/}
          <div
            className={`M-indexRightlayer3  ${
              dispalyLayer === 3 ? '' : 'layerDisappear'
            }`}
          >
            <h3 className="M-f-latest-title">
              <span>
                <span className="M-f-category-text">遊戲倉庫</span>
              </span>
            </h3>
            {/* <h4>遊戲倉庫</h4> */}
            <Mmygame />
          </div>
          {/* 第四層 購買管理*/}
          <div
            className={`M-indexRightlayer4  ${
              dispalyLayer === 4 ? '' : 'layerDisappear'
            }`}
          >
            <h3 className="M-f-latest-title">
              <span>
                <span className="M-f-category-text">關注遊戲列表</span>
              </span>
            </h3>
            {/* <h4>購買管理</h4> */}
            {/* <h5>關注商品列表</h5> */}
            <MazenpListcard />
            {/* <h5>我的折價券</h5>
            <MmyCoupon /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Mbcenterindex

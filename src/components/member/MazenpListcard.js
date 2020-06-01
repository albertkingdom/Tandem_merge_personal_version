import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// 按鈕轉頁後改變state，啟動fetch取值
// TODO  增加連結至商品細節頁

function MazenpListcard() {
  // 由reduxstate取得資料
  const myazenlist = useSelector(state => state.Mbazenproduct)
  // map模板
  // const zendisplaylist = (
  //   <>
  //     {myazenlist.map((val, idx) => {
  //       return <></>
  //     })}
  //   </>
  // )

  const zendisplaylist = (
    <>
      {myazenlist.map((val, idx) => {
        return (
          <>
            <div className="M-azenproductCard" key={idx}>
              <div className="M-azenproductImg">
                <img src={`/images/shop/small_Img/${val.itemImg}`} alt="" />
              </div>
              <div className="M-azenproductDes">
                <p>{val.itemIntro}</p>
                <div className="M-azenproductDesbtn">
                  <a href={`http://localhost:3000/product/${val.itemId}`}>
                    <h5>more</h5>
                  </a>
                </div>
              </div>
              <div className="M-azenproductName">
                <span>{val.itemName}</span>
              </div>
            </div>
          </>
        )
      })}
    </>
  )

  return (
    <>
      {/* 關注商品總表小卡 */}
      <div className="M-azenproductWrapper">
        {/* --------一個關注商品小卡-------- */}
        {zendisplaylist}
        {/* --------一個關注商品小卡-------- */}
        {/* <div className="M-azenproductCard">
          <div className="M-azenproductImg"></div>
          <div className="M-azenproductDes">
            <p>
              在開放式的中世紀奇幻世界裡冒險與戰鬥！培養能力各異的英雄角色，遊歷於星羅棋佈的村莊，城塞，亦或危機四伏的地下城。經典硬核的回合制小隊戰鬥和角色培養系統：視野，戰霧，衝鋒，夾擊，法術，戰技，你可以在“踢門團”式的競技場模式中自由體驗更多有趣的遊戲元素。
            </p>
            <div className="M-azenproductDesbtn">more</div>
          </div>
          <div className="M-azenproductName">
            <span>Dark Souls 3</span>
          </div>
        </div> */}
        {/* --------一個關注商品小卡-------- */}
        {/* <div className="M-azenproductCard">
          <div className="M-azenproductImg" />
          <div className="M-azenproductDes">
            <p>
              在開放式的中世紀奇幻世界裡冒險與戰鬥！培養能力各異的英雄角色，遊歷於星羅棋佈的村莊，城塞，亦或危機四伏的地下城。經典硬核的回合制小隊戰鬥和角色培養系統：視野，戰霧，衝鋒，夾擊，法術，戰技，你可以在“踢門團”式的競技場模式中自由體驗更多有趣的遊戲元素。
            </p>
            <div className="M-azenproductDesbtn">more</div>
          </div>
          <div className="M-azenproductName">
            <span>Dark Souls 3</span>
          </div>
        </div> */}
      </div>
    </>
  )
}
export default MazenpListcard

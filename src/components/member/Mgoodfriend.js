import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addfriendcard } from '../../actions/Maction'
import Maddfriendcard from '../../components/member/Maddfriendcard'

function Mgoodfriend() {
  const dispatch = useDispatch()
  useEffect(() => {}, [])

  const getaddfriendData = e => {
    const addmbID = e.target.getAttribute('addmbId')
    const addmbNICK = e.target.getAttribute('addmbNICK')
    const addmbDes = e.target.getAttribute('addmbDes')
    const addmbava = e.target.getAttribute('addmbava')
    const addmbcty = e.target.getAttribute('addmbcty')
    const inputaddfriendData = {
      addmbID,
      addmbNICK,
      addmbDes,
      addmbava,
      addmbcty,
    }
    console.log(inputaddfriendData)
    dispatch(addfriendcard(inputaddfriendData))
  }

  return (
    <>
      <div
        //假裝一個好友
        addmbID={24}
        addmbNICK="爆裂魔法師"
        addmbDes="要來加我好友嗎?"
        addmbava=""
        addmbcty="USA"
        style={{ width: '3rem', height: '3rem', backgroundColor: 'red' }}
        onClick={e => {
          getaddfriendData(e)
        }}
      ></div>
      <Maddfriendcard />
    </>
  )
}

export default Mgoodfriend

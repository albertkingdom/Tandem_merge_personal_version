import React from 'react'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { mlogcontroll } from '../../actions/Maction'

function MlogoutButton() {
  const dispatch = useDispatch()
  const UserAuth = useSelector(state => state.MlogAuth)

  //  發出一個function之後，清除local記憶之後，讓自己消失
  const userlogoff = () => {
    localStorage.removeItem('LoginUserData')
    localStorage.removeItem('LoginAut')
    dispatch(mlogcontroll(false))
  }

  return (
    <>
      <div
        className="M-logOutbtn"
        style={{ display: `${UserAuth ? '' : 'none'}` }}
        onClick={() => {
          userlogoff()
        }}
      >
        <AiOutlinePoweroff />
      </div>
    </>
  )
}
export default MlogoutButton

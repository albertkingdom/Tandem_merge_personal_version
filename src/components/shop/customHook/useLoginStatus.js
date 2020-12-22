import { useState, useEffect } from 'react'

export default function useLoginStatus() {
  const [isLogin, setIsLogin] = useState(false)
  const [loginId, setLoginId] = useState() //登入Id
  //mount後確認登入狀態
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('LoginUserData')) !== null) {
      setIsLogin(true)
      setLoginId(JSON.parse(localStorage.getItem('LoginUserData')).mbId)
    }
  }, [])

  return { isLogin: isLogin, loginId: loginId }
}

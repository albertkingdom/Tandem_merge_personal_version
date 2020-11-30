import { useState, useEffect } from 'react'

export default function useLoginStatus() {
  const [isLogin, setIsLogin] = useState(null)
  //mount後確認登入狀態
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('LoginUserData')) !== null) {
      setIsLogin(true)
    }
  }, [])

  return isLogin
}

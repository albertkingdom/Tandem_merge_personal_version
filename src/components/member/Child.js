import React, { useState, useEffect } from 'react'

function Child(props) {
  console.log(props)
  const [childstate, setChildstate] = useState('')

  const sendparent = val => {
    setChildstate(val)
  }
  useEffect(() => {
    props.getStatefromChild(childstate)
  }, [childstate])

  return (
    <>
      <label>在child的input:</label>
      <input type="text" onChange={e => sendparent(e.target.value)} />
      <h1>childstate:{childstate}</h1>
    </>
  )
}
export default Child

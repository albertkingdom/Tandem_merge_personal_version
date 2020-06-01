import React, { useState } from 'react'
import Child from './Child.js'

function Parent() {
  const [parentstate, setPaentstate] = useState('')

  return (
    <>
      <h1>parentstate:{parentstate}</h1>
      <Child
        getStatefromChild={StatefromChild => setPaentstate(StatefromChild)}
      />
    </>
  )
}

export default Parent

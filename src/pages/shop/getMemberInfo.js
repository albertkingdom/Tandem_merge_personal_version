import { useState } from "react"

export default async function getMemberInfo(value){
    
    console.log(value)
    const request = new Request('http://localhost:3300/product/getmemberinfo', {
      method: 'POST',
      body:JSON.stringify(value),
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    
    const response = await fetch(request)
    const data = await response.json()
    
    console.log('大頭照',JSON.stringify(data.r[0].mbAva))
    // console.log(JSON.parse(data))
    let avator2 = JSON.stringify(data.r[0].mbAva)
    return avator2

    
  }
  



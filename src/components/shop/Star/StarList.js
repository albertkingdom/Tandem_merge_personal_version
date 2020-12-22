import React from 'react'
import Star from './Star'

export default function StarList({ fullCount }) {
  const starArray = Array.from({ length: fullCount }, (v, i) => i)
  const starEmptyArray = Array.from({ length: 5 - fullCount }, (v, i) => i)

  return (
    <span>
      {starArray.map(item => (
        <Star key={item} />
      ))}
      {starEmptyArray.map(item => (
        <Star key={item} empty="true" />
      ))}
    </span>
  )
}

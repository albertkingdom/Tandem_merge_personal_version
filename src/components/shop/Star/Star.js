import React from 'react'
import {
  AiOutlineStar,
  AiTwotoneStar,
  AiOutlineMore,
  AiOutlineDelete,
  AiOutlineEdit,
} from 'react-icons/ai'

export default function Star({ empty }) {
  return !empty ? (
    <span>
      <AiTwotoneStar style={{ color: '#ffc107' }} />
    </span>
  ) : (
    <span>
      <AiOutlineStar />
    </span>
  )
}

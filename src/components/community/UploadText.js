import React, { useState, useEffect } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import 'antd/dist/antd.css'
import { Select } from 'antd'
const { Option } = Select

export default function UploadText(props) {
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadContent, setUploadContent] = useState('')
  const [uploadCategory, setUploadCategory] = useState('')

  let handleChangeContent = e => {
    setUploadContent(e.target.value)
  }
  let handleChangeTitle = e => {
    setUploadTitle(e.target.value)
  }
  useEffect(() => props.getStateContentfromchild(uploadContent), [
    uploadContent,
  ])
  useEffect(() => props.getStateTitlefromchild(uploadTitle), [uploadTitle])

  //selected onchange value
  useEffect(() => props.getStateCategoryfromchild(uploadCategory), [
    uploadCategory,
  ])
  // console.log(uploadCategory)

  return (
    <>
      <div
        style={{ height: '500px', width: '360px', margin: '0 40px' }}
        className="my-4"
      >
        <input
          type="text"
          value={uploadTitle}
          placeholder="請輸入貼文標題"
          onChange={handleChangeTitle}
          name="ptitle"
          // value={props.uploadTitle}
          style={{
            border: 'none',
            borderBottom: '1px solid #79cee2',
            margin: '40px 0 20px 0',
            width: '300px',
            padding: '5px 0',
            fontSize: '16px',
          }}
        />
        <textarea
          rows="10"
          cols="36"
          name="pcontent"
          value={uploadContent}
          onChange={handleChangeContent}
          style={{ border: '2px dotted #79cee2' }}
        ></textarea>

        <Select
          style={{ width: 280, margin: '10px 0', fontSize: '16px' }}
          placeholder="主題標籤 #"
          optionFilterProp="children"
          onChange={value => setUploadCategory(value)}
          name="category"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="1"># 休閒</Option>
          <Option value="2"># 冒險</Option>
          <Option value="3"># 動作</Option>
          <Option value="4"># 策略</Option>
          <Option value="5"># 競速</Option>
          <Option value="6">其他</Option>
        </Select>

        {/* ,<span className="d-block">主題標籤 #</span>{' '}
          <AiOutlineRight
            className="d-block"
            onClick={() => console.log(' hi ok')}
          /> */}
        {/* </div> */}
      </div>
    </>
  )
}

import React, { useState } from 'react'
import styles from './Sidebar.module.scss'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

const Sidebar = ({ select, type, contentArray, contentTitle }) => {
  const [open, setOpen] = useState(true)

  const onChange = e => {
    // console.log(e.target.checked);
    //type是篩選項目的目前選項e.g. vendor中的"EA"
    //if click的與已選擇的相同就取消選擇
    if (type !== e.target.value) {
      select(e.target.value)
    } else {
      select('')
    }
  }

  return (
    <>
      <section className={`${styles.Sidebar} ${open ? '' : styles.closed}`}>
        <h5 className={styles.title}>
          {contentTitle}
          <span onClick={() => setOpen(!open)}>
            {!open ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </h5>
        <div>
          <ul>
            {contentArray.map(item => {
              return (
                <li key={item.name}>
                  <input
                    type="checkbox"
                    // className={styles.hidden}
                    value={item.value}
                    checked={type === item.value}
                    onChange={onChange}
                  />
                  {/* <span className={styles.checkbox}></span> */}
                  <label>{item.name}</label>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Sidebar

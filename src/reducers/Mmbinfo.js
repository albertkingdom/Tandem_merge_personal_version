// 將會員的個人資料綁成一個obj，讓所有的地方都可以套用到
//要有一個發動fetch的action，並打包成最後的action回傳

const testObj = {
  name: 'kotake',
  age: '22',
}

const Mmbinfo = (state = testObj, action) => {
  switch (action.type) {
    case 'NAME_CHANGE':
      return { ...testObj, name: action.name }
    default:
      return state
  }
}

export default Mmbinfo

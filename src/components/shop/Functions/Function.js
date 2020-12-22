import Swal from 'sweetalert2'

//處理按讚顯示，點按讚愛心變色，但重新整理會失效，除非更新LOCALSTORAGE的登入資訊
export function updateAzenToLocalStorage(ID) {
  // let mbAzen_arr = mbAzen_str.split(',')
  const currentLocalAzen = JSON.parse(localStorage.getItem('Azen')) || []
  let newMbAzen_arr = [...currentLocalAzen]
  if (newMbAzen_arr.indexOf(`${ID}`) !== -1) {
    //有在按讚清單內
    let remove_arr = newMbAzen_arr.filter(id => id !== `${ID}`)
    // setMbAzen_arr_state(remove_arr)
    localStorage.setItem('Azen', JSON.stringify(remove_arr))
  } else {
    //不在按讚清單內

    newMbAzen_arr.push(`${ID}`)
    // setMbAzen_arr_state(newMbAzen_arr)
    localStorage.setItem('Azen', JSON.stringify(newMbAzen_arr))
  }
  // console.log('mbAzen_arr', mbAzen_arr)
}

//將按讚清單新增至database
export async function addAzenToDatabase(value) {
  const request = new Request('http://localhost:6001/product/addtolike', {
    method: 'POST',
    body: JSON.stringify(value),
    credentials: 'include',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  try {
    const response = await fetch(request)
    const data = await response.json()

    // console.log('加入收藏', data)
    if (data.r.affectedRows === 1) {
      Swal.fire('商品成功加入收藏!')
    }
  } catch (error) {
    console.log(error)
  }
}

//移除database中的按讚
export async function cancelAzenToDatabase(value) {
  const request = new Request('http://localhost:6001/product/unAzen', {
    method: 'POST',
    body: JSON.stringify(value),
    credentials: 'include',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  try {
    const response = await fetch(request)
    const data = await response.json()

    // console.log('移除收藏', data)
    if (data.r.affectedRows === 1) {
      Swal.fire('商品成功移出收藏!')
    }
  } catch (error) {
    console.log(error)
  }
}

//  加入購物車
export async function updateCartToLocalStorage(value) {
  // setDataLoading(true)
  // Swal.fire({ html: `商品名稱:${value.name}加入購物車` })
  const currentCart = JSON.parse(localStorage.getItem('cart')) || []
  let arr = []
  currentCart.forEach(element => {
    arr.push(element.id === value.id)
  })
  if (arr.indexOf(true) === -1) {
    const newCart = [...currentCart, value]
    localStorage.setItem('cart', JSON.stringify(newCart))
    // setMycart(newCart)
  }
  Swal.fire({
    html: `商品名稱:${value.name}成功加入購物車`,
    timer: 1500,
  }).then(r => {
    // window.location.reload()
  })
}

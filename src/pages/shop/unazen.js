import Swal from 'sweetalert2'
//加入收藏清單function
async function unazen(value) {
  const request = new Request('http://localhost:6001/product/unAzen', {
    method: 'POST',
    body: JSON.stringify(value),
    credentials: 'include',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  })
  const response = await fetch(request)
  const data = await response.json()

  console.log('移除收藏', data)
  if (data.r.affectedRows == 1) {
    Swal.fire('商品成功移出收藏!')
  }
}

export default unazen

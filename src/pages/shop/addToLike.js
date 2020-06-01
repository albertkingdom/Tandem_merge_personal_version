import Swal from 'sweetalert2'
//加入收藏清單function
async function addToLike(value) {
  const request = new Request('http://localhost:6001/product/addtolike', {
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

  console.log('加入收藏', data)
  if (data.r.affectedRows == 1) {
    Swal.fire('商品成功加入收藏!')
  }
}

export default addToLike

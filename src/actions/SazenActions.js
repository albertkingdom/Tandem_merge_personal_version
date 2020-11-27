export const getAzenListfromStorage = () => {
  let mbAzen_str = JSON.parse(localStorage.getItem('LoginUserData')).mbAzen
  mbAzen_str = mbAzen_str.replace('[', '').replace(']', '')
  let mbAzen_arr = mbAzen_str.split(',')

  return { type: 'ADD_FROM_STORAGE', payload: { idList: mbAzen_arr } }
}

export const addAzenIdToRedux = newId => {
  return { type: 'ADD', payload: { newId } }
}

export const removeAzenIdFromRedux = oldId => {
  return { type: 'REMOVE', payload: { oldId } }
}

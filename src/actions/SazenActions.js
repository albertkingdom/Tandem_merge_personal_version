import * as actionTypes from './SactionTypes'

export const getAzenListfromStorage = () => {
  let mbAzen_str = JSON.parse(localStorage.getItem('LoginUserData')).mbAzen
  mbAzen_str = mbAzen_str.replace('[', '').replace(']', '')
  let mbAzen_arr = mbAzen_str.split(',')

  return {
    type: actionTypes.getAzenListfromStorage,
    payload: { idList: mbAzen_arr },
  }
}

export const addAzenIdToRedux = newId => {
  return { type: actionTypes.addAzenId, payload: { newId } }
}

export const removeAzenIdFromRedux = oldId => {
  return { type: actionTypes.removeAzenId, payload: { oldId } }
}

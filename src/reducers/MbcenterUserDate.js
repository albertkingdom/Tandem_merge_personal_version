const MbcenterUserDate = (state = {}, action) => {
  switch (action.type) {
    case 'LOCAL_USER_DATA':
      return action.Userdata
    default:
      return state
  }
}

export default MbcenterUserDate

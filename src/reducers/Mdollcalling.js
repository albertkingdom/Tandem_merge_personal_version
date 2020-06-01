const Mdollcalling = (state = false, action) => {
  switch (action.type) {
    case 'CALL_DOLL':
      return action.call
    default:
      return state
  }
}

export default Mdollcalling

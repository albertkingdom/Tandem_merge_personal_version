const MindexDisplaychange = (state = 1, action) => {
  switch (action.type) {
    case 'DISPLAY_CHANGE':
      return action.layer
    default:
      return state
  }
}

export default MindexDisplaychange

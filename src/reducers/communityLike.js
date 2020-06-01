const initlike = {
  // likeCount: 26,
  // clicked: 1,
  payload: 0,
}

const communityLike = (state = initlike, action) => {
  switch (action.type) {
    case 'LIKE_TOGGLE':
      return {
        ...state,
        // likeCount: (state.likeCount += action.num),
        // clicked: action.clicked,
        payload: action.payload,
      }

    default:
      return state
  }
}
export default communityLike

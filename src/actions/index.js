// ----------------------------------------community---------------------------------------------------

// export const LikeToggle = (state, numbers) => {
//   if (state) {
//     return {
//       type: 'LIKE_TOGGLE',
//       num: 1,
//       clicked: state,
//       payload: numbers,
//     }
//   } else {
//     return {
//       type: 'LIKE_TOGGLE',
//       num: -1,
//       clicked: state,
//       payload: numbers,
//     }
//   }
// }

export const LikeToggle = (state, numbers) => {
  switch (state) {
    case 1:
      return {
        type: 'LIKE_TOGGLE',
        num: 0,
        clicked: 1,
        payload: numbers,
      }
    case 2:
      return {
        type: 'LIKE_TOGGLE',
        num: 1,
        clicked: 2,
        payload: numbers,
      }
    case 3:
      return {
        type: 'LIKE_TOGGLE',
        num: -1,
        clicked: 3,
        payload: numbers,
      }
    default:
      return state
  }
}

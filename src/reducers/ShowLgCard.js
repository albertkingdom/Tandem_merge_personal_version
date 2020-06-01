const ShowLgCard = (state = true, action) => {
    switch (action.type) {
        case 'LET_LOGINSHOW':
            return {
                state,
            }
        default:
            return state
    }
}
export default ShowLgCard

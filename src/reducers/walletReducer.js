const INITIAL_STATE = {
}

const walletReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'FETCH_HYDRO_REPORTS':
            return action.payload;
        default:
            return state;
    }
}

export default walletReducer
export default function(state = null, action) {
    switch(action.type){
        case 'FETCH_WATCHLIST':
        return action.payload.data;
         default:
            return state;
    }
}
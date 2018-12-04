
export default function(state = [], action) {
    switch(action.type){
        case 'FETCH_SHOW_WATCHLIST':
        return [...state,action.payload.data];
        case 'CLEAR':
        return []
         default:
            return state;
    }
}
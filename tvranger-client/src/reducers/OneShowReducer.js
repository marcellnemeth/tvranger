
export default function(state = null, action) {
    switch(action.type){
        case 'FETCH_SHOW_WITH_ID':
        return action.payload.data;
         default:
            return state;
    }
}
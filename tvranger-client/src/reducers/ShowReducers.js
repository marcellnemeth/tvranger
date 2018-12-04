
export default function(state = null, action) {
    switch(action.type){
        case 'FETCH_SHOW':
         return action.payload.data;
         case 'FETCH_POPULAR_SHOW':
         return action.payload.data;
         default:
            return state;
    }
}
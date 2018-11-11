
export default function(state = [], action) {
    switch(action.type){
        case 'FETCH_SHOW':
         return [action.payload.data];
         default:
            return state;
    }
}
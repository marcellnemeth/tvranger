export default function(state = null, action) {
    switch(action.type){
        case 'FETCH_SHOW_CREDITS':
        return action.payload.data;
         default:
            return state;
    }
}
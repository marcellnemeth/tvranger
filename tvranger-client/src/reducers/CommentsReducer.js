export default function(state = [], action) {
    switch(action.type){
        case 'FETCH_COMMENTS':
        return action.payload.data;
         default:
            return state;
    }
}
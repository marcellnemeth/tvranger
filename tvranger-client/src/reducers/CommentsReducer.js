export default function(state = [], action) {
    switch(action.type){
        case 'FETCH_COMMENTS':
        return [...state, action.payload.data];
         default:
            return state;
    }
}
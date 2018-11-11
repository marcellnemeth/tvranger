
export default function(state = null, action) {
    switch(action.type){
        case 'FETCH_CURRENTUSER':
        return action.payload.data;
         default:
            return state;
    }
}
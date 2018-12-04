export default function(state = [], action) {
  if (action.error) {
    return [];
  }
  switch (action.type) {
    case 'FETCH_COMMENTS':
      return action.payload.data;
    default:
      return state;
  }
}

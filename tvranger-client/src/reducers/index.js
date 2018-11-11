import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ShowReducers from './ShowReducers';
import CreditsReducer from './CreditsReducer';
import OneShowReducer from './OneShowReducer';
import CommentsReducer from './CommentsReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  show: ShowReducers,
  oneShow: OneShowReducer,
  currentUser: UserReducer,
  credits:CreditsReducer,
  comments:CommentsReducer,
  form: formReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ShowReducers from './ShowReducers';
import CreditsReducer from './CreditsReducer';
import OneShowReducer from './OneShowReducer';
import CommentsReducer from './CommentsReducer';
import UserReducer from './UserReducer';
import WatchListReducer from './WatchListReducer';
import WatchListShowReducer from './WatchListShowReducer';

const rootReducer = combineReducers({
  show: ShowReducers,
  oneShow: OneShowReducer,
  watchlist: WatchListReducer,
  watchlistShow: WatchListShowReducer,
  currentUser: UserReducer,
  credits:CreditsReducer,
  comments:CommentsReducer,
  form: formReducer
});

export default rootReducer;

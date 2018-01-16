import {combineReducers} from 'redux';
import UserReducer from './users';
import PollReducer from './polls';

const reducers = combineReducers({
	users: UserReducer,
	polls: PollReducer
});

export default reducers;
import {combineReducers} from 'redux';
import UserReducer from './users';
import PollsReducer from './polls';
import ActivePollReducer from './activePoll'
import FormReducer from './form';
import TokenReducer from './token';
//import LoginReducer from './polls';


const reducers = combineReducers({
	user: UserReducer,
	polls: PollsReducer,
	activePoll: ActivePollReducer,
	form: FormReducer,
	token: TokenReducer
});

export default reducers;
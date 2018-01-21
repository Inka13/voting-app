import {combineReducers} from 'redux';
import UserReducer from './users';
import PollsReducer from './polls';
import ActivePollReducer from './activePoll'
import FormReducer from './form';
import TokenReducer from './token';
import OptionsReducer from './options';
import IpReducer from './ip';

const reducers = combineReducers({
	ip: IpReducer,
	user: UserReducer,
	polls: PollsReducer,
	activePoll: ActivePollReducer,
	form: FormReducer,
	token: TokenReducer,
	options: OptionsReducer
});

export default reducers;
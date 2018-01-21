function activePoll(state={}, action) {
	switch(action.type) {
		case 'GOT_ONE_POLL':
			return action.poll;
		case 'GOT_POLLS':
			return {};
		case 'USER_VOTED':
			return {};
		default:
		 	return state;	
	}
}
export default activePoll;
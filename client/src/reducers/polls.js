function polls(state=[], action) {
	switch(action.type) {
		case 'GOT_POLLS':
			return action.polls;
		case 'GOT_ONE_POLL':
			return [];
		 default:
		 	return state;
		}
}
export default polls;
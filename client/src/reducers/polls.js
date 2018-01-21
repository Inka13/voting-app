function polls(state=[], action) {
	switch(action.type) {
		case 'GOT_POLLS':
			return action.polls;
		case 'USER_VOTED':
			return [];
		 default:
		 	return state;
		}
}
export default polls;
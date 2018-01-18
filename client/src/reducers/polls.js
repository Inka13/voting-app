function polls(state=[], action) {
	switch(action.type) {
		case 'GOT_POLLS':
			return action.polls;
		 default:
		 	return state;
		}
}
export default polls;
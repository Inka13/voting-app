function ip(state={}, action) {
	switch(action.type) {
		case 'GOT_IP':
			return action.ip;
		 default:
		 	return state;	
		}
		
}
export default ip;
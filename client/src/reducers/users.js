function user(state={}, action) {
	switch(action.type) {
		case 'USER_LOGGED_OUT':
			return {};
		 case 'USER_LOGGED_IN':
			console.log(action.user);
			return action.user;
		 default:
		 	return state;	
		}
		
}
export default user;
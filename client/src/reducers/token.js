function token(state='', action) {
	switch(action.type) {
		case 'USER_LOGGED_OUT':
			return '';
		 case 'USER_LOGGED_IN':
			//console.log(action.token);
			return action.token;
		 default:
		 	return state;	
		}
}
export default token;
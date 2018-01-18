function form(state='', action) {
	switch(action.type) {
		case 'SHOW_FORM':
			console.log(state);
			return action.form; 	
		case 'USER_LOGGED_IN':
			console.log(state);
			return action.form; 
		case 'USER_LOGGED_OUT':
			return '';
		 default:
		 	return state;	
		}
}
export default form;
function messages(state=[], action) {
	switch(action.type) {
		case 'SHOW_MESSAGES':
			console.log(state);
			return action.messages; 	
		case 'DELETED_POLL':
			console.log(action.form);
			return action.message;
		case 'CREATED_NEW_POLL':
			console.log(action.message);
			return action.message;
		case 'UPDATED_POLL':
			console.log(action.message);
			return action.message;
		 default:
		 	return state;
		}
}
export default messages;
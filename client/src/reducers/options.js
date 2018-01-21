function options(state='', action) {
	switch(action.type) {
		case 'GOT_POLLS':
			return 2;
		case 'ADD_OPTION':
			return state+1; 	
		case 'DELETE_OPTION':
			return state-1; 	
		 default:
		 	return state;	
		}
}
export default options;
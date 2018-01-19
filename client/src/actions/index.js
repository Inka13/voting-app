import axios from 'axios';

export const getAllPolls = () => {
	return(dispatch) => {
		return axios.get("http://localhost:3000/polls")
			.then((response) => {
				dispatch(gotPolls(response.data.polls))
			})
	}
};
export const showSignupForm = () => {
	return {
		type: "SHOW_FORM",
		form: 'signup'
	};
};
export const showLoginForm = () => {
	return {
		type: "SHOW_FORM",
		form: 'login'
	};
};
export const hideForm = () => {
	return {
		type: "HIDE_FORM"
	};
};
export const showcreateNewPollForm = () => {
	return {
		type: "SHOW_FORM",
		form: 'create'
	};
};
export const submitSignup = (name, email, password) => {
	return(dispatch) => {
		return axios.post("http://localhost:3000/users/signup", {
        		name,
        		email,
        		password
      		})
			.then((response) => {
				if(response.data.createdUser){
					dispatch(submitLogin(name, password));
				}
			})
	}
};
export const submitLogin = (name, password) => {
	console.log(name, password);
	return(dispatch) => {
		return axios.post("http://localhost:3000/users/login", {
    				name: name,
        			password: password
        		}
        )
		.then((response) => {
			console.log(response.data);
			if(response.data.token) dispatch(userLogin(response.data));
		}).catch(function (error) {
    		console.log('bla');
  		});
	}
};
export const getMyPolls = (id) => {
	return(dispatch) => {
		return axios.get("http://localhost:3000/polls/my/" + id)
		.then((response) => {
			dispatch(gotPolls(response.data.polls))
		});
	}
};
export const getOnePoll = (id) => {
	return(dispatch) => {
		return axios.get("http://localhost:3000/polls/" + id)
			.then((response) => {
				dispatch(gotOnePoll(response.data.poll))
			}).catch(err => {
				console.log(err);
			})
	}
};
export const updatePoll = (userId, pollId, options) => {
	return(dispatch) => {
		console.log(userId, pollId, options);
		return axios.patch("http://localhost:3000/polls/" + pollId, { 
        		id: userId,
        		options
      		})
			.then((response) => {
				if(response.data.error) dispatch(alertMe(response.data.error));
				else dispatch(getOnePoll(pollId))
			})
	}
};
export const alertMe = (message) => {
	alert(message);
}
export const createNewPoll = () => {
	return(dispatch) => {
		return axios.post("http://localhost:3000/polls", { 
			method: 'POST',
      		headers: {
        		'Accept': 'application/json',
        		'Content-Type': 'application/json'
      		},
      		body: JSON.stringify({
      			question: this.props.newPoll.question,
      			options: this.props.newPoll.options,
        		id: this.props.userId,
      		})
      	})
			.then((response) => {
				dispatch(createdNewPoll(response.data.poll))
			})
	}
};
export const vote = (userId, pollId, options) => {
	return(dispatch) => {
		console.log(userId, pollId, options);
		return axios.patch("http://localhost:3000/polls/vote/" + pollId, { 
        		id: userId,
        		options
      		})
			.then((response) => {
				dispatch(getOnePoll(pollId))
			})
	}
};
export const deletePoll = (poll, i) => {
	return(dispatch) => {
		return axios.delete("http://localhost:3000/polls" + poll._id)
			.then((response) => {
				if(response.data.poll) {
					dispatch(getAllPolls());
				}
			})
	}
};
export const gotPolls = (polls) => {
	return {
		type: "GOT_POLLS",
		polls
	};
};
export const userLogin = (data) => {
	console.log(data)
	return {
		type: "USER_LOGGED_IN",
		user: data.user,
		token: data.token,
		form: ''
	};
};
export const gotOnePoll = (poll) => {
	console.log(poll);
	return {
		type: "GOT_ONE_POLL",
		poll
	};
};
export const createdNewPoll = (poll) => {
	console.log(poll)
	return {
		type: "GOT_ONE_POLL",
		poll: poll
	};
};
export const updatedPoll = (poll) => {
	console.log(poll)
	return {
		type: "GOT_ONE_POLL",
		poll: poll
	};
};
export const userLogout = () => {
	return {
		type: "USER_LOGGED_OUT"
	};
};
import axios from 'axios';

export const getAllPolls = () => {
	return(dispatch) => {
		return axios.get("http://localhost:3000/polls")
			.then((response) => {
				dispatch(gotPolls(response.data.polls))
			})
	}
};
export const gotPolls = (polls) => {
	return {
		type: "GOT_POLLS",
		polls
	};
};
export const getIP = () => {
	return(dispatch) => {
		return axios.get("http://localhost:3000/users/ip")
			.then((response) => {
				dispatch(gotIP(response.data.ip))
			})
	}
};
export const gotIP = (ip) => {
	return {
		type: "GOT_IP",
		ip: ip
	};
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
	//console.log(name, password);
	return(dispatch) => {
		return axios.post("http://localhost:3000/users/login", {
    				name: name,
        			password: password
        		}
        )
		.then((response) => {
			if(response.data.token) dispatch(userLogin(response.data));
		}).catch(function (error) {
    		console.log(error);
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
export const gotOnePoll = (poll) => {
	console.log(poll);
	return {
		type: "GOT_ONE_POLL",
		poll,
		form: ''
	};
};
export const updatePoll = (userId, pollId, options) => {
	return(dispatch) => {
		console.log(userId , pollId, options);
		return axios.patch("http://localhost:3000/polls/" + pollId, { 
        		id: userId,
        		options
      		})
			.then((response) => {
				console.log(pollId);
				if(response.data.error) dispatch(alertMe(response.data.error));
				dispatch(userVoted());
				dispatch(getOnePoll(pollId))
			})
	}
};
export const userVoted = () => {
	return {
		type: "USER_VOTED"
	};
}
export const alertMe = () => {
	return {
		type: "ALREADY_VOTED",
		form: 'alert'
	};
}
export const addOption = () => {
	return {
		type: "ADD_OPTION",
		
	};
}
export const deleteOption = () => {
	return {
		type: "DELETE_OPTION",
		
	};
}
export const createNewPoll = (question, options, id) => {
	return(dispatch) => {
		return axios.post("http://localhost:3000/polls", {
      			question,
      			options,
      			id
      		})
			.then((response) => {
				console.log(response.data);
				dispatch(getAllPolls())
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

export const userLogin = (data) => {
	return {
		type: "USER_LOGGED_IN",
		user: data.user,
		token: data.token,
		form: ''
	};
};



export const userLogout = () => {
	return {
		type: "USER_LOGGED_OUT"
	};
};
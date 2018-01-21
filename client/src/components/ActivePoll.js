import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updatePoll} from '../actions/index';
import Graph from './Graph';
import Menu from './Menu';
class ActivePoll extends React.Component {
    constructor() {
        super();
        this.selected = '';
    }
    
   submit = (e) => {
        e.preventDefault();
        if((!this.selected || this.selected==="") && this.refs.other.value==="") return;
        let options = this.props.activePoll.options;
        
        if(this.selected!=="") {
           options.map(option => {
                return {
                    opt: option.opt,
                    votes: this.selected===option.opt ? option.votes++ : option.votes
                }
            }) 
           this.props.updatePoll(this.props.user._id ? this.props.user._id : this.props.ip, this.props.activePoll.id, options);
        } else {
            options = [...options, {opt: this.refs.other.value, votes: 1}];
            this.props.updatePoll(this.props.user._id , this.props.activePoll.id, options);
        }
    }
    select = (i) => {
        this.props.activePoll.options.forEach((option, idx) => {
            this.refs["opt"+idx].style.background = "white";
        });
        if(i!==-1) {
            this.selected = this.refs["opt"+i].innerText;
            this.refs["opt"+i].style.background = "rgb(181, 230, 29)";
            if(this.refs.other) this.refs.other.value = "";
        }  
        else this.selected = '';
    }

    render() {
        
        let options=[];
        this.props.activePoll.options.forEach((option, i) => {
            
            options.push(<div ref={"opt"+i} 
                className="votingopts" 
                key={i} 
                onClick={this.props.activePoll.voters.indexOf(this.props.user._id)!==-1 ? 
                    () => {} : 
                    () => this.select(i)}>
                {option.opt}
                </div>);
        })
        return (
                <div>
                <Menu/>
                <div id="active">
                    <div id="votelist">
                        <h1>{this.props.activePoll.question}</h1>
                        {this.props.activePoll.voters.indexOf(this.props.user._id)!==-1 ? 
                            <div>{options} <div id="message">Voted.</div></div>
                         : <form onSubmit={this.submit} id="activeform" >
                            {options}
                            ¸{this.props.user.name ? 
                            <input ref="other" onClick={() => this.select(-1)} 
                            type="text" className="votingopts" placeholder="Other"/> : <span/>}
                            <div className="submit">
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                        }
                    </div>
                    <Graph />
                    <div id="clear"></div>
                </div>
                </div>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        
        updatePoll
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        activePoll: state.activePoll,
        token: state.token,
        user: state.user,
        ip: state.ip
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(ActivePoll);

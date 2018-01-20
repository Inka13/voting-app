import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {vote, updatePoll} from '../actions/index';
import * as d3 from "d3";
class ActivePoll extends React.Component {
    constructor() {
        super();
        this.selected = '';
    }
    componentDidMount = () => {
        this.drawChart();
    }
    drawChart = () => {
       const dataset = [];
        const minDate=0;
        const maxDate=10;
        const w = window.innerWidth;
        const h = window.innerHeight-50;
        const padding = 60;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const xScale = d3.scaleTime()
                     .domain([minDate, maxDate])
                     .range([padding, w - padding]);
        const yScale = d3.scaleLinear()
                     .domain([0, d3.max(dataset, (d) => d[2])])
                     .range([h-padding, padding]);
        const svg = d3.select("div")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
        svg.selectAll("rect")
           .data(dataset)
           .enter()
          .append("rect")
          .attr("x", (d, i) => padding + Math.round((w-padding-padding)/dataset.length*i), 2)
          .attr("y", (d, i) =>  yScale(d[2]))
          .attr("width", Math.round((w-2*padding)/dataset.length), 2)
          .attr("height", (d, i) => h-padding-yScale(d[2]))
          .attr("fill", "steelblue")
          .attr("class", "bar")
          .append("title")
          .text((d) => "GDP: $" + d[2] + " billion - " + d[0] + ", " + months[Number(d[1])-1]);
        const xAxis = d3.axisBottom(xScale);
        svg.append("g")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);
        const yAxis = d3.axisLeft(yScale);
        svg.append("g")
          .attr("transform", "translate(0" + padding + ")")
          .call(yAxis);
     };
   submit = (e) => {
        e.preventDefault();
        if(!this.selected) return;
        let options = this.props.activePoll.options;
        if(this.selected==='' && this.refs.other.value!=="") {
            options = [...options, {opt: this.refs.other.value, votes: 1}];
            this.props.updatePoll(this.props.user._id , this.props.activePoll.id, options);
            
        }

        if(this.selected!=='') {
           options.map(option => {
                return {
                    opt: option.opt,
                    votes: this.selected===option.opt ? option.votes++ : option.votes
                }
            }) 
           this.props.updatePoll(this.props.user._id ? this.props.user._id : this.props.user.ip, this.props.activePoll.id, options);
           
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
                    <div id="chart"></div>
                    <div id="clear"></div>
                </div>
        );
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        vote,
        updatePoll
    }, dispatch);
}
function mapStateToProps(state) {
    return {
        activePoll: state.activePoll,
        token: state.token,
        user: state.user
    };
}
export default connect(mapStateToProps, matchDispatchToProps)(ActivePoll);

import React from 'react';
import Chart from 'chart.js';
import {connect} from 'react-redux';

class Graph extends React.Component {
   componentDidMount = () => {
        this.drawChart();
    }
    drawChart = () => {
       const dataset = [];
       const labels = [];
       const colors = ["rgb(181, 230, 29)","rgb(112, 146, 190)","rgb(255, 201, 14)", "rgb(163, 73, 164)"]; 

       this.props.activePoll.options.forEach((option, i) => {
        dataset.push(option.votes);
        labels.push(option.opt);
       });
       var pollCanvas = document.getElementById("graph");

var pollData = {
    labels: labels,
    datasets: [
        {
            data: dataset,
            backgroundColor: colors
        }]
};

var pieChart = new Chart(pollCanvas, {
  type: 'doughnut',
  data: pollData
});
    }
    render (){
        return (
            <div id="chart">
            <canvas id="graph" height="180"></canvas>
            </div>
            );
    }
}
function mapStateToProps(state) {
    return {
        activePoll: state.activePoll
    };
}
export default connect(mapStateToProps)(Graph);
